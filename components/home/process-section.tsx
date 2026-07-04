const steps = [
  {
    number: "1",
    title: "Morning brief",
    body: "You tell us the problem in plain terms. We scope it to something shippable by end of day."
  },
  {
    number: "2",
    title: "Build",
    body: "Design and code happen together, not in sequence — so nothing waits on a handoff."
  },
  {
    number: "3",
    title: "Ship",
    body: "It goes live the same day, on your domain or ours, with nothing left half-finished."
  },
  {
    number: "4",
    title: "Log it",
    body: "It's added to the daily log, dated and public, so the next brief starts from a working example."
  }
];

export function ProcessSection() {
  return (
    <section id="process">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">The daily cycle</span>
          <h2>What &quot;every day&quot; actually looks like</h2>
          <p>The same four steps, on repeat — which is exactly why it&apos;s fast.</p>
        </div>
        <div className="process">
          {steps.map((step) => (
            <div className="step" key={step.number}>
              <div className="step-num">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
