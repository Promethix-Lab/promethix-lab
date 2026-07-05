"use server";

import { Resend } from "resend";

export async function sendContactEmail(data: {
  fullName: string;
  email: string;
  company?: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  // Fallback mode for local development if Resend API key is not configured
  if (!apiKey) {
    console.warn("--- [DEVELOPMENT MODE] RESEND_API_KEY is not set ---");
    console.log("Contact Submission details:");
    console.log(`- From Name: ${data.fullName}`);
    console.log(`- From Email: ${data.email}`);
    console.log(`- Company: ${data.company || "N/A"}`);
    console.log(`- Message:\n${data.message}`);
    console.log("-----------------------------------------------------");

    // Return success to simulate successful submission locally
    return { success: true };
  }

  try {
    const resend = new Resend(apiKey);

    // 1. Send notification email to the admin team
    const adminEmailPromise = resend.emails.send({
      from: "Promethix Lab Contact <contact@promethixlab.com>",
      to: ["contact@promethixlab.com"],
      subject: `New Message from ${data.fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #111; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Contact Message</h2>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Company:</strong> ${data.company || "N/A"}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${data.message}</p>
        </div>
      `,
    });

    // 2. Send confirmation email directly to the user
    // Note: If you are using Resend's free tier sandbox (onboarding@resend.dev),
    // you can only send emails to your verified account email address.
    const userConfirmationPromise = resend.emails.send({
      from: "Promethix Lab <hello@promethixlab.com>",
      to: [data.email],
      subject: "We received your message! - Promethix Lab",
      template: {
        id: "contact-request-received",
        variables: {
          fullName: data.fullName,
          message: data.message,
        },
      },
    });

    // Wait for both emails to be sent concurrently
    const [adminResult, userResult] = await Promise.all([
      adminEmailPromise,
      userConfirmationPromise,
    ]);

    if (adminResult.error) {
      console.error("Resend Admin Email Error:", adminResult.error);
      return {
        success: false,
        error: adminResult.error.message || "Failed to send email.",
      };
    }

    if (userResult.error) {
      // We log the error but don't fail the submission in case the user entered a non-sandbox email
      // on the free tier of Resend.
      console.warn("Resend User Confirmation Warning:", userResult.error);
    }

    return { success: true };
  } catch (error) {
    const err = error as Error;
    console.error("Resend contact email error:", err);
    return {
      success: false,
      error: err.message || "Connection error. Please try again.",
    };
  }
}
