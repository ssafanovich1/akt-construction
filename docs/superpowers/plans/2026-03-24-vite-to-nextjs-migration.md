# Vite → Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the AKT Construction site from Vite + React SPA to Next.js 14 App Router for SSR, Metadata API, and `next/image` SEO improvements.

**Architecture:** Replace Vite's `index.html` / `src/main.jsx` entry point with Next.js's `src/app/layout.jsx` + `src/app/page.jsx`. All existing components stay in `src/components/`. Components that use browser APIs or React hooks get `'use client'` directives. The `adminOpen` state is extracted into a thin `AdminController` client wrapper so `page.jsx` can remain a Server Component.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS 3, Supabase, EmailJS, `next/font/google`, `next/image`

**Spec:** `docs/superpowers/specs/2026-03-24-vite-to-nextjs-migration-design.md`

---

## File Map

| Action | File |
|--------|------|
| Delete | `vite.config.js` |
| Delete | `index.html` |
| Delete | `src/main.jsx` |
| Delete | `src/App.jsx` |
| Delete | `dist/` (git rm) |
| Create | `next.config.mjs` |
| Create | `src/app/layout.jsx` |
| Create | `src/app/page.jsx` |
| Create | `src/components/AdminController.jsx` |
| Modify | `package.json` — deps + scripts |
| Modify | `.gitignore` — add `.next` |
| Modify | `.env.example` — rename VITE_ keys |
| Modify | `tailwind.config.js` — content + fontFamily |
| Modify | `src/index.css` — font-family CSS vars |
| Modify | `src/lib/useScrollReveal.jsx` — `'use client'` |
| Modify | `src/lib/supabase.js` — `import.meta.env` → `process.env` |
| Modify | `src/components/Navbar.jsx` — `'use client'` |
| Modify | `src/components/Hero.jsx` — `'use client'` + `next/image` |
| Modify | `src/components/Services.jsx` — `'use client'` |
| Modify | `src/components/ServiceAreas.jsx` — `'use client'` |
| Modify | `src/components/WhyAKT.jsx` — `'use client'` |
| Modify | `src/components/Portfolio.jsx` — `'use client'` + `next/image` |
| Modify | `src/components/Testimonials.jsx` — `'use client'` |
| Modify | `src/components/About.jsx` — `'use client'` + `next/image` |
| Modify | `src/components/ContactForm.jsx` — `'use client'` + `import.meta.env` → `process.env` |
| Modify | `src/components/FinalCTA.jsx` — `'use client'` |
| Modify | `src/components/Footer.jsx` — `'use client'` |
| Modify | `src/components/FloatingCallButton.jsx` — `'use client'` |
| Modify | `src/components/AdminPanel.jsx` — `'use client'` + `import.meta.env` → `process.env` + UI strings |

---

## Task 1: Install Next.js and update package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Next.js and remove Vite packages**

```bash
npm install next
npm uninstall vite @vitejs/plugin-react react-router-dom
```

Expected: `node_modules/next/` appears, no errors.

- [ ] **Step 2: Update package.json scripts**

Open `package.json` and replace the `scripts` block:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
},
```

Keep `@types/react` and `@types/react-dom` in `devDependencies` — Next.js does not bundle React type definitions; removing them breaks IDE completions and type inference.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install next.js, remove vite and unused deps"
```

---

## Task 2: Config files and .gitignore

**Files:**
- Create: `next.config.mjs`
- Modify: `.gitignore`

- [ ] **Step 1: Create `next.config.mjs`**

Create the file at the project root:

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

Note: `.mjs` extension is required because `package.json` has `"type": "module"`.

- [ ] **Step 2: Add `.next` to .gitignore**

Open `.gitignore` and add `.next` on a new line after `dist`:

```
node_modules
dist
.next
.env
.env.local
*.local
.DS_Store
.vercel
```

- [ ] **Step 3: Commit**

```bash
git add next.config.mjs .gitignore
git commit -m "chore: add next.config.mjs and update .gitignore"
```

---

## Task 3: Update Tailwind config

**Files:**
- Modify: `tailwind.config.js`

The current file has two things to fix: remove `"./index.html"` from content (that file is being deleted), and update `fontFamily` to use CSS variables that `next/font` will inject.

- [ ] **Step 1: Update `tailwind.config.js`**

Replace the entire file:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1F2937',
          deep: '#111827',
          light: '#374151',
        },
        emerald: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        cream: {
          DEFAULT: '#F8F1E3',
          dark: '#EDE4D3',
        },
        warm: {
          gray: '#E5E7EB',
          dark: '#D1D5DB',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

Changes: removed `"./index.html"` from content; changed font values from string names to CSS variable references.

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.js
git commit -m "chore: update tailwind config for next.js (remove index.html, use font css vars)"
```

---

## Task 4: Update `src/index.css` font references

**Files:**
- Modify: `src/index.css`

The CSS file has two hardcoded `font-family` strings that reference Google Fonts by name. Once `index.html` is removed, those fonts are no longer loaded by a `<link>` tag — they're loaded by `next/font` via CSS variables. These two lines must be updated or those rules will silently fall back.

- [ ] **Step 1: Update the two font-family declarations**

In `src/index.css`, locate by string content (line numbers may shift if earlier edits changed the file):

Find `font-family: 'Outfit', system-ui, sans-serif;` and change to:
```css
font-family: var(--font-outfit), system-ui, sans-serif;
```

Find `font-family: 'Playfair Display', Georgia, serif;` and change to:
```css
font-family: var(--font-playfair), Georgia, serif;
```

Note: `src/index.css` also has `scroll-behavior: smooth;` on the `html` selector (line ~11). Leave this in place — it is intentionally redundant with the `scroll-smooth` Tailwind class on `<html>` in `layout.jsx`. Both achieve the same result; having both ensures smooth scrolling regardless of CSS load order.

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "chore: use css variable font references in index.css"
```

---

## Task 5: Update environment variable references in source files

**Files:**
- Modify: `src/lib/supabase.js`
- Modify: `src/components/ContactForm.jsx`
- Modify: `src/components/AdminPanel.jsx`
- Modify: `.env.example`

`import.meta.env` is Vite-specific. In Next.js it is `undefined`. Every reference must become `process.env.NEXT_PUBLIC_*`.

- [ ] **Step 1: Update `src/lib/supabase.js` lines 3–4**

Replace:
```js
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```
With:
```js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
```

- [ ] **Step 2: Update `src/components/ContactForm.jsx` lines 8–10**

Replace:
```js
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
```
With:
```js
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

- [ ] **Step 3: Update `src/components/AdminPanel.jsx` lines 276–277**

Replace the UI warning string:
```jsx
Set <code className="bg-amber-100 px-1 rounded text-xs">VITE_SUPABASE_URL</code> and{' '}
<code className="bg-amber-100 px-1 rounded text-xs">VITE_SUPABASE_ANON_KEY</code> in your environment variables.
```
With:
```jsx
Set <code className="bg-amber-100 px-1 rounded text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{' '}
<code className="bg-amber-100 px-1 rounded text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in your environment variables.
```

- [ ] **Step 4: Update `.env.example`**

Replace the entire file:
```
# Supabase Configuration
# Get these from your Supabase project dashboard: https://supabase.com/dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# EmailJS Configuration (for contact form email notifications)
# Get these from https://emailjs.com after creating a free account
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key-here
```

- [ ] **Step 5: Update the live `.env` file (if it exists)**

If `.env` exists locally, rename the same keys. Example:
```bash
# Replace VITE_ prefix with NEXT_PUBLIC_ in .env
# Do this manually in your editor — do NOT commit .env
```

- [ ] **Step 6: Verify no import.meta.env references remain**

```bash
grep -r "import.meta.env" src/
```

Expected output: nothing (empty).

- [ ] **Step 7: Commit**

```bash
git add src/lib/supabase.js src/components/ContactForm.jsx src/components/AdminPanel.jsx .env.example
git commit -m "chore: rename VITE_ env vars to NEXT_PUBLIC_ and replace import.meta.env with process.env"
```

---

## Task 6: Add `'use client'` to `useScrollReveal.jsx` and all components

**Files:**
- Modify: `src/lib/useScrollReveal.jsx`
- Modify: all 14 components listed below

This is the largest batch change. Every file gets a single line inserted at the very top (line 1): `'use client'`. This is required because they use `useEffect`, `useState`, `IntersectionObserver`, or browser event listeners.

- [ ] **Step 1: Add `'use client'` to `src/lib/useScrollReveal.jsx`**

Insert `'use client'\n` as the very first line of the file. The result should be:

```js
'use client'
import { useEffect, useRef } from 'react'
// ... rest of file unchanged
```

- [ ] **Step 2: Add `'use client'` to all components**

Add `'use client'\n` as the very first line to each of these files:

- `src/components/Navbar.jsx`
- `src/components/Hero.jsx`
- `src/components/Services.jsx`
- `src/components/ServiceAreas.jsx`
- `src/components/WhyAKT.jsx`
- `src/components/Portfolio.jsx`
- `src/components/Testimonials.jsx`
- `src/components/About.jsx`
- `src/components/ContactForm.jsx`
- `src/components/FinalCTA.jsx`
- `src/components/Footer.jsx`
- `src/components/FloatingCallButton.jsx`
- `src/components/AdminPanel.jsx`

Each file's first line should be exactly: `'use client'`

- [ ] **Step 3: Commit**

```bash
git add src/lib/useScrollReveal.jsx src/components/
git commit -m "chore: add 'use client' to all browser-dependent components"
```

---

## Task 7: Replace `<img>` tags with `next/image`

**Files:**
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/About.jsx`
- Modify: `src/components/Portfolio.jsx`

- [ ] **Step 1: Update `src/components/Hero.jsx`**

Add import at the top (after `'use client'`):
```js
import Image from 'next/image'
```

Replace the `<img>` tag inside the `<div className="absolute inset-0">` block:
```jsx
{/* Remove this: */}
<img
  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
  alt="Beautiful modern kitchen remodel in Los Angeles home"
  className="w-full h-full object-cover"
  loading="eager"
/>

{/* Replace with: */}
<Image
  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
  alt="Beautiful modern kitchen remodel in Los Angeles home"
  fill
  priority
  className="object-cover"
/>
```

Note: `fill` positions the image to cover its nearest positioned ancestor (`div.absolute.inset-0` has `position: absolute`, which is a valid positioned context). `priority` disables lazy-loading on the LCP element.

- [ ] **Step 2: Update `src/components/About.jsx`**

Add import at the top (after `'use client'`):
```js
import Image from 'next/image'
```

Replace the `<img>` tag:
```jsx
{/* Remove this: */}
<img
  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
  alt="Beautiful kitchen remodel by AKT Construction"
  className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
  loading="lazy"
/>

{/* Replace with: */}
<Image
  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
  alt="Beautiful kitchen remodel by AKT Construction"
  width={800}
  height={800}
  className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
/>
```

- [ ] **Step 3: Update `src/components/Portfolio.jsx`**

Add import at the top (after `'use client'`):
```js
import Image from 'next/image'
```

The portfolio images render inside `<div className="group relative rounded-xl overflow-hidden bg-charcoal-light aspect-[4/3]">` which already has `relative`. Replace the `<img>` inside the conditional:

```jsx
{/* Remove this: */}
<img
  src={img.url}
  alt={img.caption || 'AKT Construction project'}
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  loading="lazy"
  onError={() => setFailedImages(prev => new Set([...prev, `${img.url}-${i}`]))}
/>

{/* Replace with: */}
<Image
  src={img.url}
  alt={img.caption || 'AKT Construction project'}
  fill
  className="object-cover transition-transform duration-500 group-hover:scale-105"
  onError={() => setFailedImages(prev => new Set([...prev, `${img.url}-${i}`]))}
/>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx src/components/About.jsx src/components/Portfolio.jsx
git commit -m "chore: replace img tags with next/image in Hero, About, Portfolio"
```

---

## Task 8: Create `src/components/AdminController.jsx`

**Files:**
- Create: `src/components/AdminController.jsx`

`page.jsx` is a Server Component and cannot hold state. The `adminOpen` state from `App.jsx` (which controls the admin modal) must live in a thin client wrapper. This wrapper renders `Footer` and `AdminPanel` together.

- [ ] **Step 1: Create `src/components/AdminController.jsx`**

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

- [ ] **Step 2: Commit**

```bash
git add src/components/AdminController.jsx
git commit -m "feat: add AdminController client wrapper for admin modal state"
```

---

## Task 9: Create `src/app/layout.jsx`

**Files:**
- Create: `src/app/layout.jsx`

This is the Next.js root layout — it replaces `index.html`. It handles: global CSS import, `next/font` setup, `<html>` attributes, metadata export, and JSON-LD schema.

**Important:** The JSON-LD URL uses `aktconstructioncorp.com` (per PDF branding). The existing `index.html` used `aktconstruction.com` — this is intentional. Confirm the correct production domain with the client before going live.

- [ ] **Step 1: Create `src/app/` directory and `layout.jsx`**

```jsx
import { Playfair_Display, Outfit } from 'next/font/google'
import '../index.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = {
  title: 'AKT Construction | Luxury Construction & Remodeling Los Angeles | Lic #1107017',
  description: 'Full-service general contractor in Los Angeles — kitchens, bathrooms, additions, ADUs, and full-home renovations in Beverly Hills, Bel Air, Pacific Palisades, Brentwood, Malibu, and across the Westside.',
  keywords: [
    'Los Angeles contractor',
    'luxury remodeling Los Angeles',
    'kitchen remodel Beverly Hills',
    'bathroom remodel Bel Air',
    'home addition Los Angeles',
    'ADU builder LA',
    'AKT Construction',
    'Anton Karpenko contractor',
    'licensed contractor Los Angeles',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'AKT Construction | Luxury Construction & Remodeling Los Angeles',
    description: 'Full-service general contractor serving Beverly Hills, Bel Air, Pacific Palisades, Brentwood, Malibu, and across the Westside. Call (310) 497-5948.',
    url: 'https://aktconstructioncorp.com',
    siteName: 'AKT Construction',
    images: [
      {
        url: 'https://aktconstructioncorp.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AKT Construction — Luxury Remodeling in Los Angeles',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aktconstructioncorp.com',
  },
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'Los Angeles',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'AKT Construction',
  url: 'https://aktconstructioncorp.com',
  telephone: '+1-310-497-5948',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Los Angeles' },
    { '@type': 'State', name: 'California' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction & Remodeling Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen Remodeling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bathroom Remodeling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Additions' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Accessory Dwelling Units' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Siding Installation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flooring Installation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Window & Door Replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Foundation Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Painting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plumbing & Electrical' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Garage Conversions' } },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${outfit.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.jsx
git commit -m "feat: add next.js root layout with metadata, next/font, and json-ld schema"
```

---

## Task 10: Create `src/app/page.jsx`

**Files:**
- Create: `src/app/page.jsx`

This is the single page Server Component. It imports all section components. `AdminController` replaces the old `<Footer>` + `<AdminPanel>` pair (it holds the `adminOpen` state internally).

- [ ] **Step 1: Create `src/app/page.jsx`**

```jsx
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import ServiceAreas from '../components/ServiceAreas'
import WhyAKT from '../components/WhyAKT'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import About from '../components/About'
import ContactForm from '../components/ContactForm'
import FinalCTA from '../components/FinalCTA'
import AdminController from '../components/AdminController'
import FloatingCallButton from '../components/FloatingCallButton'

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-charcoal font-body">
      <Navbar />
      <Hero />
      <Services />
      <ServiceAreas />
      <WhyAKT />
      <Portfolio />
      <Testimonials />
      <About />
      <ContactForm />
      <FinalCTA />
      <AdminController />
      <FloatingCallButton />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.jsx
git commit -m "feat: add next.js app router page (replaces App.jsx)"
```

---

## Task 11: Delete old Vite files

**Files:**
- Delete: `vite.config.js`
- Delete: `index.html`
- Delete: `src/main.jsx`
- Delete (git rm): `dist/`

- [ ] **Step 1: Remove old files**

```bash
rm vite.config.js index.html src/main.jsx src/App.jsx
git rm -r dist/ 2>/dev/null || true
```

`src/App.jsx` must be deleted. If left on disk, Next.js will attempt to compile it, fail because it uses `useState` without a `'use client'` directive, and break the build.

The `|| true` on the `git rm` prevents an error if `dist/` is not tracked by git.

- [ ] **Step 2: Stage deletions and commit**

```bash
git add -u
git commit -m "chore: remove vite.config.js, index.html, src/main.jsx, src/App.jsx, dist/"
```

---

## Task 12: Verify the build

This is the acceptance test for the entire migration.

- [ ] **Step 1: Confirm no `import.meta.env` remains**

```bash
grep -r "import.meta.env" src/
```

Expected: no output (empty).

- [ ] **Step 2: Run `next build`**

```bash
npm run build
```

Expected:
```
✓ Compiled successfully
✓ Linting and checking validity of types
Route (app)    Size
┌ ○ /          [some size]
```

If build fails with an error about a missing module or directive, read the error carefully — it will point to the exact file and line. Common issues:
- `"use client"` missing on a file that uses hooks → add the directive
- Image `src` domain not in `remotePatterns` → add it to `next.config.mjs`
- A component uses `window` at module level (not inside `useEffect`) → wrap in `useEffect` or move to client component

- [ ] **Step 3: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Check:
- Page loads and looks identical to the Vite version
- Scroll animations work (reveal on scroll)
- Navbar mobile menu opens/closes
- Contact form can be submitted
- Admin panel opens from footer link
- All 12 service cards display with full copy
- Service areas grid renders
- Portfolio gallery loads

- [ ] **Step 4: Verify SSR (the core SEO win)**

```bash
curl http://localhost:3000 | grep -c "One call — no headaches"
```

Expected: `1` — this string only exists in the Hero component's rendered JSX body, not in any `<meta>` tag. A result greater than 0 proves the page is server-rendered (not a blank JS shell).

Note: do NOT grep for "Beverly Hills" — that string appears in `layout.jsx`'s `metadata.description` which is emitted as a `<meta>` tag regardless of SSR.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete vite to next.js migration — SSR, metadata API, next/image, next/font"
```
