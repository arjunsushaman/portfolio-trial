# Alex Morgan — Portfolio

A world-class personal portfolio for a senior freelance frontend developer, built with Next.js 14, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Zero-config deploy (Next.js auto-detected)

## Customize Content

All personal data lives in `/data/`:

| File | What to edit |
|------|-------------|
| `data/personal.ts` | Name, tagline, email, stats, socials, Formspree endpoint |
| `data/projects.ts` | Your real project entries |
| `data/skills.ts` | Your actual skills and levels |
| `data/testimonials.ts` | Real client testimonials |

### Contact Form Setup

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID
3. Replace `YOUR_FORM_ID` in `data/personal.ts`:
   ```ts
   formspreeEndpoint: 'https://formspree.io/f/YOUR_REAL_FORM_ID',
   ```

## Tech Stack

- **Next.js 14** — App Router, TypeScript
- **Tailwind CSS v3** — Styling
- **Framer Motion 11** — Animations
- **React Three Fiber + Drei** — Hero 3D mesh
- **Lenis** — Smooth scrolling
- **Lucide React** — Icons
