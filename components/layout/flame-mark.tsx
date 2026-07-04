import Link from "next/link";
import type { CSSProperties } from "react";

type FlameMarkProps = {
  href?: string;
  footer?: boolean;
};

export function FlameIcon() {
  return (
    <svg viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        className="flame-primary"
        d="M22 2C22 20 8 24 8 42C8 56 18 66 30 66C42 66 52 56 52 42C52 30 42 26 42 14C42 26 34 30 34 42C34 50 28 56 28 56C28 56 20 50 20 40C20 26 30 22 22 2Z"
      />
      <path
        className="flame-secondary"
        d="M42 14C42 26 52 30 52 42C52 56 42 66 30 66C36 63 40 54 40 44C40 32 32 28 32 16C32 10 36 4 36 4C36 4 42 8 42 14Z"
      />
      <rect className="flame-cutout" x="24.5" y="56.5" width="11" height="11" strokeWidth="1" />
    </svg>
  );
}

export function FlameMark({ href = "/", footer = false }: FlameMarkProps) {
  return (
    <Link
      href={href}
      className="mark"
      style={
        footer
          ? {
              "--logo-primary": "var(--on-dark)",
              "--logo-secondary": "var(--on-dark-soft)",
              "--logo-cutout": "var(--surface-dark)"
            } as CSSProperties
          : undefined
      }
    >
      <FlameIcon />
      <span className="word">
        PROMETHIX<span className="lab">LAB</span>
      </span>
    </Link>
  );
}
