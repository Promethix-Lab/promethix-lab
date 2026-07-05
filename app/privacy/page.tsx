import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Promethix Lab",
  description: "Read the Promethix Lab Privacy Policy."
};

export default function PrivacyPage() {
  return (
    <section className="privacy-page-section">
      <div className="privacy-page-container">
        {/* Header */}
        <div className="border-b border-[rgba(255,255,255,0.08)] pb-8 mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#ffb020] uppercase font-mono">Legal</span>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-white mt-2">Privacy Policy</h1>
          <br />
          <p className="text-sm text-gray-500 font-mono mt-4">Effective Date: July 5, 2026</p>
        </div>

        {/* Body Content */}
        <div className="space-y-10 text-[#a1a1a6] leading-relaxed text-base">
          <section style={{ padding: 0 }}>
            <p>
              Welcome to Promethix Lab (&ldquo;Promethix Lab&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit{" "}
              <a href="https://www.promethixlab.com" className="text-white underline hover:text-[#ffb020] transition-colors">
                https://www.promethixlab.com
              </a>.
            </p>
            <p className="mt-4">
              By using our website, you agree to the practices described in this Privacy Policy.
            </p>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">1. Information We Collect</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white mb-2">Information You Provide</h3>
                <p className="mb-3">We may collect information that you voluntarily provide, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Company name (if applicable)</li>
                  <li>Project details or messages submitted through our contact form</li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Information Collected Automatically</h3>
                <p className="mb-3">When you visit our website, we may automatically collect certain technical information, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Operating system</li>
                  <li>Pages visited</li>
                  <li>Date and time of your visit</li>
                  <li>Referring website</li>
                  <li>General usage analytics</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries</li>
              <li>Provide requested services</li>
              <li>Improve our website and user experience</li>
              <li>Analyze website performance</li>
              <li>Communicate about projects or collaborations</li>
              <li>Send newsletters or product updates if you have opted in</li>
              <li>Maintain website security and prevent abuse</li>
            </ul>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">3. Cookies and Analytics</h2>
            <p>
              Our website may use cookies and similar technologies to improve functionality and understand how visitors use the site.
            </p>
            <p className="mt-3">
              We may use trusted analytics providers to measure website performance and improve our services.
            </p>
            <p className="mt-3">
              You can control or disable cookies through your browser settings, although some features of the website may not function properly.
            </p>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">4. Third-Party Services</h2>
            <p className="mb-3">We may use trusted third-party providers to operate and improve our website, including services for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Website hosting</li>
              <li>Contact forms</li>
              <li>Email delivery</li>
              <li>Analytics</li>
              <li>Performance monitoring</li>
            </ul>
            <p className="mt-3">
              These providers may process information only as necessary to provide their services.
            </p>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">5. Data Retention</h2>
            <p className="mb-3">We retain personal information only for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to inquiries</li>
              <li>Provide requested services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Maintain business records</li>
            </ul>
            <p className="mt-3">
              When information is no longer needed, we take reasonable steps to securely delete or anonymize it.
            </p>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">6. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and organizational measures to protect your information. However, no method of transmitting or storing data over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">7. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have rights regarding your personal information, including the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent where applicable</li>
              <li>Object to certain processing activities</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">8. Children&rsquo;s Privacy</h2>
            <p>
              Our website is not directed to children under the age of 13, and we do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">9. External Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of external sites.
            </p>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated Effective Date.
            </p>
          </section>

          <section className="border-t border-[rgba(255,255,255,0.06)] pt-8 font-sans" style={{ padding: "32px 0 0 0" }}>
            <h2 className="text-xl font-display font-medium text-white mb-4 font-serif">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us through our Contact page:
            </p>
            <p className="mt-3">
              Website:{" "}
              <Link href="/contact" className="text-white underline hover:text-[#ffb020] transition-colors">
                https://www.promethixlab.com/contact
              </Link>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
