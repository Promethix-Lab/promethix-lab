# Promethix Lab Architecture

I actually think you should keep this much simpler than most SaaS architectures.

Based on what you've told me about Promethix Lab over the last few months, this is **not a SaaS**. It is a **public studio website + product showcase + newsletter**. That means you don't need databases, authentication, servers, APIs, or Kubernetes just to display products.

Your design also confirms this direction—it is essentially a marketing website with:

- Landing page
- Product catalogue
- Individual product pages
- Newsletter
- Contact
- Public shipping log

No backend is required for 90% of it.

I would build it like this.

---

# Recommended Stack

| Layer | Technology | Why |
|--------|------------|-----|
| Framework | Next.js 15 App Router | SEO + SSG + React |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Fast iteration |
| Components | shadcn/ui | Production quality |
| Animations | Framer Motion | Smooth interactions |
| Icons | Lucide React | Consistent icons |
| Deployment | Vercel | Zero-config deployment |
| Source Control | GitHub | Collaboration |
| CMS | Content Collections (Markdown/MDX) | No database needed |
| Images | Cloudinary | Optimized assets |
| Analytics | PostHog | Better product analytics than Google Analytics |
| Newsletter | Beehiiv | Newsletter platform built for creators and startups |
| Contact Form | Resend + React Email | Reliable email delivery |
| Domain & DNS | Cloudflare | Fast DNS, SSL & CDN |
| Monitoring | Better Stack | Uptime monitoring |
| Forms Spam Protection | Cloudflare Turnstile | Better than reCAPTCHA |

---

# Folder Structure

```text
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
│     ├── newsletter/
│     └── contact/
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
```

---

# Product Flow

```text
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
```

No database.

No admin panel.

Just GitHub.

Exactly how many open-source documentation websites work.

---

# Deployment Flow

```text
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
```

Deployment typically takes around **20–40 seconds**.

---

# Collaboration

```text
Pawan
      │
      │ Push
      ▼

GitHub Repository

      ▲
      │ Pull

Friend
```

Both developers work directly with Git.

- No FTP
- No manual uploads
- Every deployment is version controlled

---

# Newsletter Architecture

I would **not** build a newsletter system yourself.

Use **Beehiiv**.

It is designed specifically for creators, indie hackers and startup founders.

### Flow

```text
Visitor

      │

Enter Email

      │

Next.js Server Action

      │

Beehiiv API

      │

Subscriber Added

      │

Welcome Email

      │

Newsletter List
```

### Advantages

- API
- Automations
- Double opt-in
- Audience Segments
- Broadcast Emails
- Analytics
- Referral Program
- Built for creators

---

# Contact Form

```text
Visitor

      │

Contact Form

      │

Server Action

      │

Resend

      │

hello@promethixlab.com
```

No backend required.

---

# Product Architecture

Each product should simply be an MDX file.

Example:

```md
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

## Features

## Images

## Tech Stack

## Lessons Learned
```

The website automatically generates:

- Homepage cards
- Product page
- SEO metadata
- Sitemap
- RSS feed
- OpenGraph images

---

# Overall Architecture

```text
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
   (MDX)      (Beehiiv API)    (Resend)
      │
      ▼
 GitHub Repository
      ▲
 Git Push
      ▲
 You + Friend
```

---

# Third-party Services

| Purpose | Service |
|---------|----------|
| Hosting | Vercel |
| DNS | Cloudflare |
| Git | GitHub |
| Newsletter | Beehiiv |
| Email Sending | Resend |
| Analytics | PostHog |
| Error Monitoring | Sentry |
| Uptime | Better Stack |
| Images | Cloudinary |
| Captcha | Cloudflare Turnstile |
| Fonts | next/font |
| SEO | next-seo (optional) |

---

# CI/CD

```text
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
```

---

# Future Scaling

If Promethix Lab grows, you can add services incrementally without changing the overall architecture.

```text
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

PostgreSQL + Prisma

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
```

---

# Conclusion

The key point is **not to over-engineer early**.

Your current design is **content-driven rather than user-driven**, so **GitHub + MDX + Next.js + Vercel** gives you an extremely clean workflow.

You and your friend simply:

1. Create or edit Markdown files.
2. Push to GitHub.
3. Vercel automatically builds the project.
4. The live website updates within seconds.

When Promethix Lab eventually needs richer functionality—such as search, comments, user accounts, dashboards, or an admin panel—you can introduce a database and backend services without rewriting the existing architecture.