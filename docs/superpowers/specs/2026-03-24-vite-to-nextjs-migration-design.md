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
- `src/main.jsx`

### Add
- `next.config.mjs` — minimal config, external image domains (`.mjs` extension required because `package.json` has `"type": "module"`)
- `src/app/layout.jsx` — root layout with SEO metadata, `next/font`, JSON-LD schema, global CSS import
- `src/app/page.jsx` — server component; imports all section components
- `src/components/AdminController.jsx` — thin `"use client"` wrapper holding `adminOpen` state, renders `Footer` + `AdminPanel` (see Server/Client section below)

### Keep (path unchanged)
- `src/components/` — all existing components stay in place
- `src/lib/constants.js`, `src/lib/supabase.js`, `src/lib/useScrollReveal.jsx`
- `tailwind.config.js` — remove `"./index.html"` from content paths (the existing `"./src/**/*.{js,ts,jsx,tsx}"` already covers `src/app/` — no new path needed); stays in ESM (`export default`) format
- `postcss.config.js` — unchanged

### Delete build artefacts
- `dist/` directory — run `git rm -r dist/` to untrack it from git and delete it from disk
- Add `.next` to `.gitignore` (Next.js build output)

---

## Component Strategy: Server vs Client

### Critical: `"use client"` on `src/lib/useScrollReveal.jsx`

`useScrollReveal.jsx` lives in `src/lib/`, not `src/components/`. It **must** receive the `"use client"` directive at the top of that file. Every component that imports `RevealDiv` from it is transitively marked as a client component.

### `adminOpen` state — extract a client wrapper

`App.jsx` has `useState` managing `adminOpen`, which is passed as props to `Footer` and `AdminPanel`. A Server Component (`page.jsx`) cannot hold state. Solution: create `src/components/AdminController.jsx`:

```jsx
'use client'
import { useState } from 'react'
import Footer from './Footer'
import AdminPanel from './AdminPanel'

export default function AdminController() {
  const [adminOpen, setAdminOpen] = useState(false)
  return (
    <>
      <Footer onAdminClick={() => setAdminOpen(true)} />
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  )
}
```

`page.jsx` renders `<AdminController />` in place of `<Footer>` + `<AdminPanel>`.

### All components needing `"use client"`

Add `'use client'` directive to the top of each of these files:

- `src/lib/useScrollReveal.jsx` — `useEffect` + `IntersectionObserver`
- `src/components/Navbar.jsx` — mobile menu state + scroll listener (`useEffect` + `window.addEventListener`)
- `src/components/Hero.jsx` — uses `RevealDiv`
- `src/components/Services.jsx` — uses `RevealDiv`
- `src/components/ServiceAreas.jsx` — uses `RevealDiv`
- `src/components/WhyAKT.jsx` — uses `RevealDiv`
- `src/components/Portfolio.jsx` — Supabase fetch, `useState`/`useEffect`
- `src/components/Testimonials.jsx` — uses `RevealDiv`
- `src/components/About.jsx` — uses `RevealDiv`
- `src/components/ContactForm.jsx` — form state, EmailJS
- `src/components/FinalCTA.jsx` — uses `RevealDiv`
- `src/components/Footer.jsx` — uses `RevealDiv`
- `src/components/FloatingCallButton.jsx` — uses JSX with event handlers
- `src/components/AdminPanel.jsx` — Supabase auth, state
- `src/components/AdminController.jsx` — new wrapper (see above)

### Server Component
- `src/app/page.jsx` — no hooks/state; imports all section components and `AdminController`

---

## Environment Variables: `import.meta.env` → `process.env`

Two changes are required for every env var:

1. Rename the key: `VITE_*` → `NEXT_PUBLIC_*` in `.env` and `.env.example`
2. Update the read syntax in source files: `import.meta.env.VITE_X` → `process.env.NEXT_PUBLIC_X`

`import.meta.env` is Vite-specific. In Next.js it will be `undefined`, silently breaking Supabase and EmailJS.

### Files that must be updated

| File | Variables |
|------|-----------|
| `src/lib/supabase.js` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |
| `src/components/ContactForm.jsx` | `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` |
| `src/components/AdminPanel.jsx` | UI warning strings at lines 276-277 — replace `VITE_SUPABASE_URL` → `NEXT_PUBLIC_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` → `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

### Key rename table

| Old `.env` key | New `.env` key |
|----------------|----------------|
| `VITE_SUPABASE_URL` | `NEXT_PUBLIC_SUPABASE_URL` |
| `VITE_SUPABASE_ANON_KEY` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `VITE_EMAILJS_SERVICE_ID` | `NEXT_PUBLIC_EMAILJS_SERVICE_ID` |
| `VITE_EMAILJS_TEMPLATE_ID` | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` |
| `VITE_EMAILJS_PUBLIC_KEY` | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` |

Note: `VITE_ADMIN_PASSWORD` does not exist in the codebase (auth uses Supabase `signInWithPassword`) — do not add a `NEXT_PUBLIC_ADMIN_PASSWORD` variable.

---

## `src/app/layout.jsx`

This replaces `index.html`. It must:

1. Import global CSS: `import '../index.css'`
2. Set up fonts with `next/font/google`
3. Apply `scroll-smooth` to `<html>` (required for anchor nav links)
4. Export `metadata` object
5. Render JSON-LD schema via `<script dangerouslySetInnerHTML>`

### Font setup (`next/font/google`)

```jsx
import { Playfair_Display, Outfit } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})
```

Apply to `<html>`: `className={\`scroll-smooth \${playfair.variable} \${outfit.variable}\`}`

### `tailwind.config.js` font update

Replace the string font names with CSS variable references:

```js
fontFamily: {
  display: ['var(--font-playfair)', 'Georgia', 'serif'],
  body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
}
```

`tailwind.config.js` stays in its current ESM format (`export default { ... }`). Do not convert it to CommonJS.

### `src/index.css` font update

`src/index.css` contains two hardcoded `font-family` string references that must be updated to use the CSS variables — otherwise these rules will silently fall back to Georgia/system-ui once the Google Fonts `<link>` tag in `index.html` is removed:

- Line ~10: `font-family: 'Outfit', system-ui, sans-serif;` → `font-family: var(--font-outfit), system-ui, sans-serif;`
- Line ~76: `font-family: 'Playfair Display', Georgia, serif;` → `font-family: var(--font-playfair), Georgia, serif;`

### Metadata

```js
export const metadata = {
  title: 'AKT Construction | Luxury Construction & Remodeling Los Angeles | Lic #1107017',
  description: 'Full-service general contractor in Los Angeles — kitchens, bathrooms, additions, ADUs, and full-home renovations in Beverly Hills, Bel Air, Pacific Palisades, Brentwood, Malibu, and across the Westside.',
  keywords: ['Los Angeles contractor', 'luxury remodeling LA', 'kitchen remodel Beverly Hills', ...],
  openGraph: {
    title: 'AKT Construction | Luxury Construction & Remodeling',
    description: '...',
    // NOTE: the current index.html canonical uses aktconstruction.com — the PDF branding
    // document uses aktconstructioncorp.com. Using aktconstructioncorp.com here as the
    // canonical domain. Verify with client before going live.
    url: 'https://aktconstructioncorp.com',
    siteName: 'AKT Construction',
    // og:image — add a real project photo URL here once photos are available
    images: [{ url: 'https://aktconstructioncorp.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
}
```

---

## `next.config.mjs`

Uses `.mjs` extension (or `export default` syntax) because `package.json` has `"type": "module"`.

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

export default nextConfig
```

---

## `next/image` — Replace `<img>` tags

Replace `<img>` with `<Image>` from `next/image` in all components. Key notes:
- Hero image: add `priority` prop (it's the LCP element — should not be lazy-loaded)
- All other images: default lazy loading applies
- Provide explicit `width` and `height` (or use `fill` with a sized container) to prevent CLS

---

## Package Changes

### Remove
- `vite`
- `@vitejs/plugin-react`
- `react-router-dom` (unused in the codebase)

### Add
- `next`

### Keep (unchanged)
- `react`, `react-dom` (React 18)
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

## SEO Improvements Summary

| Area | Vite (before) | Next.js (after) |
|------|--------------|-----------------|
| Rendering | Client-side only (empty HTML shell) | SSR — full HTML to crawlers |
| Metadata | Static tags in `index.html` | Metadata API in `layout.jsx` |
| Images | `<img>` tags | `next/image` — WebP, size hints, no CLS |
| Fonts | Render-blocking Google Fonts `<link>` | `next/font` — self-hosted, no layout shift |

---

## Success Criteria

1. `next build` completes with no errors
2. `next dev` serves the site identically to the Vite version
3. `curl http://localhost:3000` returns complete HTML content (not an empty `<div id="root">`)
4. All existing functionality works: contact form submissions, portfolio admin panel, scroll animations, anchor navigation
5. No `import.meta.env` references remain in source files
