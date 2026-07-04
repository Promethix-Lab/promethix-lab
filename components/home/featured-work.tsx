import { SpotlightCard } from "@/components/spotlight-card";

import { DashboardMockup, InvoiceMockup, StoreMockup, WaveformMockup } from "./mockups";

export function FeaturedWork() {
  return (
    <section id="work" className="band-dark">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">From the catalogue</span>
          <h2>A few things we shipped recently</h2>
          <p>Apps and websites, built the same way every time — fast, focused, and handed over ready to use.</p>
        </div>

        <div className="bento-grid">
          <SpotlightCard className="bento-card col-2 row-2">
            <div className="bento-glow-teal" />
            <div className="bento-layout-horizontal">
              <div className="bento-details">
                <div className="bento-text">
                  <span className="bento-kicker">WEB APP</span>
                  <h3 className="bento-title">Pocket Ledger</h3>
                  <p className="bento-desc">
                    A one-screen budgeting app for people who quit the last five budgeting apps. Designed to make manual
                    entry painless and dashboard statistics instant.
                  </p>
                </div>
                <div className="bento-meta">
                  <span>Day 212</span>
                  <span>Built in 7h</span>
                </div>
              </div>
              <div className="bento-mockup-wrapper">
                <DashboardMockup />
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bento-card row-2">
            <div className="bento-glow-indigo" />
            <div className="bento-details bento-details-start">
              <span className="bento-kicker">WEB APP</span>
              <h3 className="bento-title">Fieldnote</h3>
              <p className="bento-desc">
                Voice memos in, clean written docs and action lists out. Built for designers and engineers who think
                better out loud.
              </p>
            </div>
            <WaveformMockup />
            <div className="bento-meta" style={{ marginTop: 24 }}>
              <span>Day 210</span>
              <span>Built in 8h</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bento-card">
            <div className="bento-glow-amber" />
            <div className="bento-details">
              <div className="bento-text">
                <span className="bento-kicker">WEBSITE</span>
                <h3 className="bento-title">Kettlecorn Co.</h3>
                <p className="bento-desc bento-desc-sm">
                  A storefront for a two-person popcorn business, live before their weekend market.
                </p>
              </div>
              <StoreMockup />
              <div className="bento-meta bento-meta-tight">
                <span>Day 211</span>
                <span>Built in 5h</span>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="bento-card col-2">
            <div className="bento-glow-coral" />
            <div className="bento-layout-horizontal">
              <div className="bento-details" style={{ flex: 1.2 }}>
                <div className="bento-text">
                  <span className="bento-kicker">WEB APP</span>
                  <h3 className="bento-title">Tallyframe</h3>
                  <p className="bento-desc">
                    A minimal invoice tracker for freelancers. See what you&apos;re owed, who&apos;s late, and get paid
                    with single-click email reminders.
                  </p>
                </div>
                <div className="bento-meta">
                  <span>Day 214</span>
                  <span>Built in 6h</span>
                </div>
              </div>
              <div className="bento-mockup-wrapper">
                <InvoiceMockup />
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
