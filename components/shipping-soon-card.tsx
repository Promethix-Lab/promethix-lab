"use client";

import { useRef, useState, useEffect } from "react";
import type { MouseEvent } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const phrases = [
  "git checkout -b next-ship",
  "writing clean, reliable code...",
  "designing the next experience...",
  "git push origin main",
];

export function ShippingSoonCard({ className }: { className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const phrase = phrases[currentPhraseIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(phrase.substring(0, displayedText.length - 1));
        setTypingSpeed(30);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(phrase.substring(0, displayedText.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    if (!isDeleting && displayedText === phrase) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentPhraseIdx, typingSpeed]);

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    rectRef.current = event.currentTarget.getBoundingClientRect();
  };

  const handleMouseMoveCard = (event: MouseEvent<HTMLElement>) => {
    if (!rectRef.current) {
      rectRef.current = event.currentTarget.getBoundingClientRect();
    }
    const rect = rectRef.current;
    event.currentTarget.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <article
      ref={cardRef}
      className={cn(
        "card interactive-product-card shipping-soon-card",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMoveCard}
    >
      <div className="glow-amber" />

      {/* Card Header */}
      <header className="product-card-header">
        <div className="product-card-info-link">
          <div className="product-card-meta-wrap">
            <div className="product-card-icon-box glow-amber">
              <Terminal
                className="text-amber-500 animate-pulse"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="product-card-title">Promethix Lab</h3>
              <span className="product-card-kicker">SHIPPING SOON</span>
            </div>
          </div>
        </div>
        <div className="metrics-badge">
          <div className="progress-badge" title="Work in Progress">
            <span className="progress-dot"></span>
            <span className="progress-text">In Progress</span>
          </div>
        </div>
      </header>

      {/* Description */}
      <p className="product-card-desc">
        Currently building our next product. Stay tuned.
      </p>

      {/* Animated Typing Area */}
      <div className="shipping-soon-animation-container">
        <div className="terminal-header">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
          <span className="terminal-title">zsh</span>
        </div>
        <div className="terminal-body font-mono text-xs gap-x-1">
          <span className="text-emerald-500">$ </span>
          <span className="text-slate-100">{displayedText}</span>
          <span className="blink-cursor"></span>
        </div>
      </div>

      {/* Subtle footer */}
      {/* <div className="product-card-chart-footer text-center select-none pt-4 opacity-40 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
        {"// EST. SHIPMENT DAYS 215-220"}
      </div> */}
    </article>
  );
}
