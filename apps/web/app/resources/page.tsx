export default function ResourcesPage() {
  return (
    <main className="container section-pad">
      <h1>Official Resources</h1>
      <p>Always study from the official government handbook for your state.</p>
      <ul className="resources-list">
        <li>
          <strong>Western Australia</strong> —{" "}
          <a
            href="https://www.transport.wa.gov.au/licensing/get-a-drivers-licence.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            transport.wa.gov.au
          </a>
        </li>
        <li>
          <strong>NSW</strong> — <em>Coming soon</em>
        </li>
        <li>
          <strong>Victoria</strong> — <em>Coming soon</em>
        </li>
        <li>
          <strong>Queensland</strong> — <em>Coming soon</em>
        </li>
      </ul>
      <p className="disclaimer">
        KangaLearner is a study aid and is not affiliated with or endorsed by any government
        authority. Always verify information with official sources.
      </p>
    </main>
  );
}

