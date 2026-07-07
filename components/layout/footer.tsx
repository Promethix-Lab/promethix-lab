import Link from "next/link";

import { FlameMark } from "@/components/layout/flame-mark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <FlameMark footer />
            <p>Creating software products that solve real problems, generate revenue, and keep shipping.</p>
          </div>
          <div className="footer-col">
            <h4>Studio</h4>
            <Link href="/#work">Latest Launches</Link>
            <Link href="/products">Products</Link>
            <Link href="/#process">Process</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <div className="footer-col">
            <h4>Work with us</h4>
            <Link href="/contact">Start a project</Link>
            <Link href="/contact#contact-form">Email us</Link>
          </div>
          <div className="footer-col">
            <h4>Elsewhere</h4>
            <a href="https://x.com/promethixlab" target="_blank" rel="noreferrer">
              Twitter / X
            </a>
            <a href="https://www.instagram.com/promethixlab/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://github.com/Promethix-Lab" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Promethix Lab. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
