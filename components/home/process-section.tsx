"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Discover",
    body: "Find real problems worth solving through research, feedback, and curiosity."
  },
  {
    number: "2",
    title: "Build",
    body: "Design, code, test, and refine. Move fast without sacrificing quality."
  },
  {
    number: "3",
    title: "Ship",
    body: "Launch products, features, or updates. Real users beat perfect plans."
  },
  {
    number: "4",
    title: "Learn",
    body: "Measure usage, gather feedback, improve the product, and repeat tomorrow."
  }
];

export function ProcessSection() {
  return (
    <section id="process">
      <div className="wrap">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">The daily cycle</span>
          <h2>How we ship, every single day.</h2>
          <p>Every day starts with an idea and ends with a product, feature, update, or experiment shipped into the world.</p>
        </motion.div>
        <div className="process">
          {steps.map((step, index) => (
            <motion.div
              className="step"
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
            >
              <div className="step-num">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

