temp

I actually think you should keep this much simpler than most SaaS architectures.

Based on what you’ve told me about Promethix Lab over the last few months, this is not a SaaS. It is a public studio website + product showcase + newsletter. That means you don’t need databases, authentication, servers, APIs, or Kubernetes just to display products.

Your uploaded design also confirms this direction—it is essentially a marketing site with:

* Landing page
* Product catalogue
* Individual products
* Newsletter
* Contact
* Public shipping log

No backend is required for 90% of it.  

I would build it like this.

⸻

Recommended Stack

Layer	Technology	Why
Framework	Next.js 15 App Router	SEO + SSG + React
Language	TypeScript	Type safety
Styling	Tailwind CSS	Fast iteration
Components	shadcn/ui	Production quality
Animations	Framer Motion	Smooth interactions
Icons	Lucide React	Consistent icons
Deployment	Vercel	Zero-config deployment
Source Control	GitHub	Collaboration
CMS	Content Collections (Markdown/MDX)	No database needed
Images	Vercel Blob / Cloudinary	Optimized assets
Analytics	PostHog	Much better than GA
Newsletter	Beehive	Best developer experience
Contact Form	Resend + React Email	Reliable emails
Domain	Cloudflare DNS	Fast + free
Monitoring	Better Stack	Uptime monitoring
Forms Spam	Cloudflare Turnstile	Better than reCAPTCHA

⸻

Folder Structure

promethixlab/
app/
│
├── page.tsx
├── products/
│     ├── page.tsx
│     └── [slug]/
│            page.tsx
│
├── shiplog/
│
├── about/
│
├── api/
│     newsletter/
│
components/
content/
│
├── products/
│      pocket-ledger.mdx
│      fieldnote.mdx
│      ...
│
├── shiplog/
│      day-001.mdx
│      day-002.mdx
public/
lib/
emails/
styles/

⸻

Product Flow

You
        │
        ▼
Create new markdown file
content/products/new-product.mdx
        │
Push to GitHub
        │
GitHub
        │
Webhook
        │
Vercel
        │
Build Project
        │
Static Pages Generated
        │
Website Updated

No database.

No admin panel.

Just GitHub.

Exactly how many open-source documentation sites work.

⸻

Deployment Flow

You
        │
git push origin main
        │
GitHub Repository
        │
Webhook
        │
Vercel
        │
npm install
        │
next build
        │
Deploy
        │
https://promethixlab.com

Deployment takes roughly 20–40 seconds.

⸻

Collaboration

Pawan
      │
      │ Push
      ▼
GitHub
      ▲
      │ Pull
Friend

Both work normally with Git.

No FTP.

No manual uploads.

⸻

Newsletter Architecture

I would not build this yourself.

Use Beehive.

It is built exactly for indie makers.

Flow:

Visitor
      │
Enter Email
      │
Next.js Server Action
      │
Beehive API
      │
Subscriber Added
      │
Welcome Email
      │
Newsletter List

Advantages

* API
* Automations
* Double opt-in
* Segments
* Broadcast emails
* Analytics
* Very developer friendly

⸻

Contact Form

Visitor
      │
Contact Form
      │
Server Action
      │
Resend
      │
hello@promethixlab.com

No backend needed.

⸻

Product Architecture

Each product should simply be an MDX file.

Example

---
title: Pocket Ledger
slug: pocket-ledger
category: Finance
status: Live
date: 2026-07-03
website: https://...
github: https://...
featured: true
---
# Pocket Ledger
Long description...
Features
Images
Tech Stack
Lessons learned

The site automatically generates

* Homepage cards
* Product page
* SEO
* Sitemap
* RSS
* OpenGraph

⸻

Overall Architecture

                 Users
                    │
                    ▼
           Cloudflare DNS
                    │
                    ▼
                Vercel CDN
                    │
                    ▼
            Next.js Application
                    │
      ┌─────────────┼─────────────┐
      │             │             │
      ▼             ▼             ▼
 Products      Newsletter      Contact
 (MDX)         (Beehive API)     (Resend)
      │
      ▼
 GitHub Repository
      ▲
 Git Push
      ▲
 You + Friend

⸻

Third-party Services

Purpose	Service
Hosting	Vercel
DNS	Cloudflare
Git	GitHub
Newsletter	Beehive
Email Sending	Resend
Analytics	PostHog
Error Monitoring	Sentry
Uptime	Better Stack
Images	Cloudinary (or Vercel Blob)
Captcha	Cloudflare Turnstile
Fonts	next/font
SEO	next-seo (optional)

⸻

CI/CD

Push
↓
GitHub
↓
GitHub Actions
    │
    ├── ESLint
    ├── Type Check
    ├── Build
    └── Tests (optional)
↓
Vercel Deploy
↓
Production

⸻

Future Scaling

If Promethix Lab grows, you can add services incrementally without changing the overall architecture:

Today
GitHub
↓
Vercel
↓
Static MDX
──────────────
100 Products
↓
Content Collections
──────────────
1000 Products
↓
Postgres + Prisma
──────────────
10,000 Users
↓
Redis
Queue
Background Jobs
──────────────
100,000 Users
↓
Edge Cache
CDN
Search Engine
Workers

The key point is not to over-engineer early. Your current design is content-driven rather than user-driven, so GitHub + MDX + Vercel gives you an extremely clean workflow: you and your friend edit content, push to GitHub, Vercel rebuilds automatically, and the live site updates within seconds. When you eventually need richer features (search, comments, user accounts, analytics dashboards, etc.), you can introduce a database and backend without rewriting the foundation.