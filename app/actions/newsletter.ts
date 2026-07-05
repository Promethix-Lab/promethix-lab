"use server";

export async function subscribeToNewsletter(email: string) {
  const apiKey = process.env.LOOPS_API_KEY;

  if (!apiKey) {
    return { success: false, error: "Newsletter credentials are not configured." };
  }

  try {
    const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        email: email,
        subscribed: true,
        userGroup: "Website Subscribers"
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.message || "Failed to subscribe." };
    }

    return { success: true };
  } catch (error) {
    console.error("Loops subscription error:", error);
    return { success: false, error: "Connection error. Please try again." };
  }
}
