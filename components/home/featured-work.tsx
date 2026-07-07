"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/spotlight-card";

import { DashboardMockup, InvoiceMockup, StoreMockup, WaveformMockup } from "./mockups";

export function FeaturedWork() {
  return (
    <section id="work" className="band-dark">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">From the catalogue</span>
          <h2>A few things we launched recently</h2>
          <p>Every release starts as an idea and ships as a real product. Here’s what we’ve launched recently.</p>
        </motion.div>

        <div className="bento-grid">
          {/* Pocket Ledger */}
          <SpotlightCard
            className="bento-card col-2 row-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.0 }}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
          >
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

          {/* Fieldnote */}
          <SpotlightCard
            className="bento-card row-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
          >
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

          {/* Kettlecorn Co. */}
          <SpotlightCard
            className="bento-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
          >
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

          {/* Tallyframe */}
          <SpotlightCard
            className="bento-card col-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
          >
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
