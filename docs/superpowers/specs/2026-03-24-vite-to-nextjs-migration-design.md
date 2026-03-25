# AKT Construction — Vite to Next.js Migration Design

**Date:** 2026-03-24
**Scope:** Convert existing Vite + React SPA to Next.js 14 App Router, in-place, preserving all functionality

---

## Goal

Replace Vite with Next.js 14 to gain SSR (server-side rendering), Next.js Metadata API, and `next/image` optimisation — all of which directly improve SEO for the AKT Construction site.

---

## Current Stack

| Item | Current |
|------|---------|
| Bundler | Vite 5 |
| Framework | React 18 SPA |
| Styling | Tailwind CSS 3 |
| Backend | Supabase (auth, portfolio images, contact leads) |
| Email | EmailJS |
| Routing | None (single page) |

---

## Target Stack

| Item | Target |
|------|--------|
| Framework | Next.js 14 (App Router) |
| Rendering | SSR by default |
| Styling | Tailwind CSS 3 (unchanged) |
| Backend | Supabase (unchanged) |
| Email | EmailJS (unchanged) |
| Routing | Single route `/` |

---

## File Structure Changes

### Remove
- `vite.config.js`
- `index.html`

### Add
- `next.config.js` — minimal config, external image domains
- `src/app/layout.jsx` — root layout with SEO metadata, fonts, JSON-LD schema
- `src/app/page.jsx` — replaces `App.jsx` as the single page entry point

### Keep (unchanged structure)
- `src/components/` — all components stay in place
- `src/lib/` — constants, supabase, useScrollReveal unchanged
- `tailwind.config.js` — content paths updated to include `./src/app/**`
- `postcss.config.js` — unchanged

---

## Component Strategy: Server vs Client

Next.js App Router defaults to Server Components. Components that use browser APIs, React hooks (`useState`, `useEffect`, `useRef`), or event handlers need `"use client"`.

### Needs `"use client"`
- `useScrollReveal.jsx` — uses `useEffect` + `IntersectionObserver`
- `Navbar.jsx` — mobile menu state (`useState`)
- `Hero.jsx` — uses `RevealDiv` from useScrollReveal
- `Services.jsx` — uses `RevealDiv`
- `ServiceAreas.jsx` — uses `RevealDiv`
- `WhyAKT.jsx` — uses `RevealDiv`
- `Portfolio.jsx` — Supabase fetch, state (`useState`, `useEffect`)
- `Testimonials.jsx` — uses `RevealDiv`
- `About.jsx` — uses `RevealDiv`
- `ContactForm.jsx` — form state, EmailJS submission
- `FinalCTA.jsx` — uses `RevealDiv`
- `Footer.jsx` — uses `RevealDiv`
- `FloatingCallButton.jsx` — scroll listener
- `AdminPanel.jsx` — Supabase auth, state

### Server Component
- `src/app/page.jsx` — imports all section components, no hooks/state

---

## SEO Improvements

### Metadata API (`src/app/layout.jsx`)
Replaces static `<meta>` tags in `index.html`:

```js
export const metadata = {
  title: 'AKT Construction | Luxury Construction & Remodeling Los Angeles | Lic #1107017',
  description: '...',
  keywords: [...],
  openGraph: { ... },
}
```

### SSR
Next.js pre-renders the full page HTML on the server. Crawlers receive complete content immediately — not a JS shell that requires execution.

### next/image
Replace all `<img>` tags with `<Image>` from `next/image`:
- Automatic WebP conversion
- Lazy loading with `loading="lazy"` by default
- `priority` prop on Hero image (LCP element)
- Explicit `width`/`height` to prevent CLS

---

## Environment Variables

`VITE_` prefix → `NEXT_PUBLIC_` prefix. All `.env` keys updated:

| Old | New |
|-----|-----|
| `VITE_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` |
| `VITE_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `VITE_EMAILJS_SERVICE_ID` | `NEXT_PUBLIC_EMAILJS_SERVICE_ID` |
| `VITE_EMAILJS_TEMPLATE_ID` | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` |
| `VITE_EMAILJS_PUBLIC_KEY` | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` |
| `VITE_ADMIN_PASSWORD` | `NEXT_PUBLIC_ADMIN_PASSWORD` |

---

## Package Changes

### Remove
- `vite`
- `@vitejs/plugin-react`

### Add
- `next`

### Keep
- `react`, `react-dom` (version stays 18)
- `@supabase/supabase-js`
- `@emailjs/browser`
- `lucide-react`
- `tailwindcss`, `postcss`, `autoprefixer`

### Scripts (`package.json`)
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}
module.exports = nextConfig
```

---

## Tailwind Config Update

Add `./src/app/**/*.{js,jsx}` to the `content` array alongside existing paths.

---

## JSON-LD Schema

Move from `index.html` inline script into a `<script type="application/ld+json">` tag rendered inside `src/app/layout.jsx` using `dangerouslySetInnerHTML`.

---

## What Does NOT Change

- All component logic and JSX
- All copy and content (already updated)
- Supabase schema and integration
- EmailJS integration
- Tailwind theme (charcoal/emerald/cream)
- AdminPanel functionality
- Fonts (Playfair Display, Outfit via Google Fonts — moved to `next/font`)

---

## Success Criteria

1. `next build` completes with no errors
2. `next dev` serves the site identically to the Vite version
3. `curl` of the root page returns full HTML content (not an empty `<div id="root">`)
4. All existing functionality works: contact form, portfolio admin, scroll animations
