import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "KangaLearner privacy policy, what data we collect and how we use it."
};

export default function PrivacyPage() {
  return (
    <main className="legal-page container section-pad">
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: May 2026</p>

      <p>
        KangaLearner is committed to protecting your privacy in accordance with the{" "}
        <em>Privacy Act 1988</em> (Australia) and the Australian Privacy Principles (APPs).
      </p>

      <h2>1. What Information We Collect</h2>
      <ul>
        <li>
          <strong>Account data:</strong> email address, name (optional), avatar image (optional).
        </li>
        <li>
          <strong>Usage data:</strong> quiz answers, practice session results, mock test scores,
          study progress, preferred language and state.
        </li>
        <li>
          <strong>Technical data:</strong> browser type, device type, IP address (via our hosting
          provider, Vercel), access timestamps.
        </li>
        <li>
          <strong>Newsletter:</strong> email address only, if you subscribe.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and improve the learning platform.</li>
        <li>To save your study progress across devices (when signed in).</li>
        <li>To send you study tips and updates (newsletter subscribers only, with consent).</li>
        <li>To process payments for premium features (via Stripe, see below).</li>
        <li>We do not sell your personal information to third parties.</li>
      </ul>

      <h2>3. Third-Party Services</h2>
      <p>We use the following third-party services to operate KangaLearner:</p>
      <ul>
        <li>
          <strong>Supabase</strong> (database and authentication), servers located in AWS Sydney
          (ap-southeast-2).
        </li>
        <li>
          <strong>Vercel</strong> (hosting and edge functions), global CDN with Australian edge
          nodes.
        </li>
        <li>
          <strong>Stripe</strong> (payments, if applicable), Stripe&apos;s privacy policy:{" "}
          <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer">
            stripe.com/au/privacy
          </a>
          .
        </li>
        <li>
          <strong>Upstash</strong> (rate limiting via Redis), temporary request counters only, no
          personal data stored.
        </li>
        <li>
          <strong>Google AdMob & Ad Manager</strong> (mobile app ads), to serve relevant ads in the
          mobile app. Google uses device identifiers for personalized advertising.
        </li>
      </ul>

      <h2>4. Cookies, Local Storage, and Device Identifiers</h2>
      <p>
        <strong>Web:</strong> We use cookies and browser localStorage for session authentication,
        language preference, state preference, and anonymous practice progress (before sign-in). We
        do not use advertising cookies on the web.
      </p>
      <p>
        <strong>Mobile App:</strong> The mobile app uses device identifiers (like Apple&apos;s
        Identifier for Advertisers or Google Advertising ID) to serve ads. Users in the
        EEA/UK/Switzerland will be prompted for consent via Google&apos;s User Messaging Platform
        (UMP), and iOS users will be asked via App Tracking Transparency (ATT). You can manage or
        opt-out of personalized ads in your device settings.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        Account data is kept until you delete your account. Practice data is deleted with your
        account. Newsletter subscriptions are kept until you unsubscribe. Anonymised, aggregated
        usage data may be retained indefinitely for product improvement.
      </p>

      <h2>6. Your Rights</h2>
      <ul>
        <li>
          <strong>Access:</strong> You can view your account data in Account Settings.
        </li>
        <li>
          <strong>Deletion:</strong> You can permanently delete your account and all associated data
          in Account Settings → Delete Account.
        </li>
        <li>
          <strong>Correction:</strong> You can update your name, language, and state in Account
          Settings.
        </li>
        <li>
          <strong>Newsletter opt-out:</strong> Use the unsubscribe link in any email we send.
        </li>
      </ul>

      <h2>7. Data Security</h2>
      <p>
        We use industry-standard security practices including encrypted connections (HTTPS/TLS),
        row-level security on all database tables, and rate limiting to prevent abuse. However, no
        system is 100% secure, we recommend using a strong, unique password.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        KangaLearner is not directed at children under 13. We do not knowingly collect data from
        children under 13. If you believe a child has provided us data, contact us to have it
        removed.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. We will notify registered users of significant
        changes via email. Continued use of the service after changes constitutes acceptance.
      </p>

      <h2>10. Contact</h2>
      <p>
        For privacy questions or to exercise your rights, contact:{" "}
        <a href="mailto:privacy@kangalearner.com.au">privacy@kangalearner.com.au</a>
      </p>
      <p>We will respond to requests within 30 days as required by the Australian Privacy Act.</p>

      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </main>
  );
}
