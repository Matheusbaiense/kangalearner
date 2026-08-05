import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description: "KangaLearner terms of use for the WA learner test practice platform."
};

export default function TermsPage() {
  return (
    <main className="legal-page container section-pad">
      <h1>Terms of Use</h1>
      <p className="legal-updated">Last updated: May 2026</p>

      <h2>1. About KangaLearner</h2>
      <p>
        KangaLearner (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is an educational platform to
        help learner drivers in Western Australia prepare for the Department of Transport (DoT)
        learner licence theory test. We are not affiliated with or endorsed by the Western
        Australian government or the Department of Transport.
      </p>

      <h2>2. Acceptance of Terms</h2>
      <p>
        By accessing or using KangaLearner you agree to these Terms of Use. If you do not agree,
        please do not use the service.
      </p>

      <h2>3. Educational Purpose Only</h2>
      <p>
        KangaLearner is a study and practice tool only. We do not guarantee that using our service
        will result in passing the official learner test. Always refer to the official{" "}
        <a
          href="https://www.transport.wa.gov.au/licensing/learner-driver-guide.asp"
          target="_blank"
          rel="noopener noreferrer"
        >
          WA Learner Driver Guide
        </a>{" "}
        and official DoT materials as your primary study resource.
      </p>

      <h2>4. Accuracy of Content</h2>
      <p>
        We make reasonable efforts to keep content aligned with current WA road rules. However, road
        rules change and we cannot guarantee all content is current. Do not rely solely on
        KangaLearner for legal advice about road rules.
      </p>

      <h2>5. Free Service</h2>
      <p>
        The core practice and mock test features are provided free of charge. We may introduce
        optional premium features in the future. Any paid features will be clearly communicated
        before purchase.
      </p>

      <h2>6. User Accounts</h2>
      <p>
        You may create an account using your email or Google account. You are responsible for
        keeping your credentials secure. We may suspend accounts that violate these terms or engage
        in abusive behaviour.
      </p>

      <h2>7. Acceptable Use</h2>
      <p>
        You agree not to: attempt to access other users&apos; data; reverse-engineer or scrape the
        platform; use automated tools to bulk-request content; or use the platform for any unlawful
        purpose.
      </p>

      <h2>8. Intellectual Property</h2>
      <p>
        The KangaLearner brand, design, and original content are our intellectual property. Question
        content is derived from the publicly available WA Learner Driver Guide (DoT). We do not
        claim ownership of official DoT materials.
      </p>

      <h2>9. Disclaimer of Warranties</h2>
      <p>
        KangaLearner is provided &quot;as is&quot; without warranties of any kind. We do not warrant
        that the service will be uninterrupted or error-free.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        To the extent permitted by Australian law, we are not liable for any indirect, incidental,
        or consequential damages arising from your use of the service.
      </p>

      <h2>11. Termination</h2>
      <p>
        You may delete your account at any time via Account Settings. We may also suspend or
        terminate accounts that violate these terms.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These terms are governed by the laws of Western Australia, Australia. Any disputes will be
        subject to the exclusive jurisdiction of the courts of Western Australia.
      </p>

      <h2>13. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the service after changes
        constitutes acceptance of the new terms.
      </p>

      <h2>14. Contact</h2>
      <p>
        For questions about these terms, contact us at:{" "}
        <a href="mailto:hello@kangalearner.com.au">hello@kangalearner.com.au</a>
      </p>

      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </main>
  );
}
