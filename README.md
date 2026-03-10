# AKT Construction — Website

Production-ready contractor website built with **Vite + React + Tailwind CSS + Supabase**.

## Tech Stack

- **Frontend:** React 18, Vite 5, Tailwind CSS 3
- **Backend/DB:** Supabase (PostgreSQL + Storage)
- **Icons:** Lucide React
- **Fonts:** Playfair Display + Outfit (Google Fonts)
- **Theme:** Charcoal & Emerald

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
3. Copy your project URL and anon key from **Settings > API**

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=AKT2026
```

### 4. Run development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy to Vercel, Netlify, Cloudflare Pages, etc.

---

## Admin Panel

Access via the **"Admin"** link in the footer.

- **Password:** `AKT2026` (configurable via `VITE_ADMIN_PASSWORD`)
- Add images by **pasting a URL** or **uploading a file** (requires Supabase Storage bucket)
- All images are stored in Supabase and persist permanently
- Delete individual images or clear all at once
- Changes appear instantly on the live portfolio

### Supabase Storage (for file uploads)

If you want the file upload feature:

1. Go to Supabase Dashboard > **Storage**
2. Create a new bucket named `portfolio`
3. Set it as **Public**
4. The admin panel will handle the rest

---

## Project Structure

```
akt-construction/
├── index.html              # Root HTML with SEO meta & JSON-LD
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.example            # Environment template
├── supabase-setup.sql      # Database setup script
├── README.md
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # Root component
    ├── index.css           # Global styles + Tailwind
    ├── lib/
    │   ├── constants.js    # Company info, services, reviews data
    │   ├── supabase.js     # Supabase client + CRUD operations
    │   └── useScrollReveal.js  # Scroll animation hook
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Services.jsx
        ├── WhyAKT.jsx
        ├── Portfolio.jsx
        ├── Testimonials.jsx
        ├── About.jsx
        ├── ContactForm.jsx
        ├── FinalCTA.jsx
        ├── Footer.jsx
        ├── FloatingCallButton.jsx
        └── AdminPanel.jsx
```

---

## Color Theme

| Role       | Color     | Hex       |
|-----------|-----------|-----------|
| Primary   | Charcoal  | `#1F2937` |
| Accent    | Emerald   | `#10B981` |
| Secondary | Cream     | `#F8F1E3` |
| Neutral   | Warm Gray | `#E5E7EB` |

---

## Deployment

Works with any static hosting. Recommended:

- **Vercel:** `vercel` or connect GitHub repo
- **Netlify:** `netlify deploy --prod --dir=dist`
- **Cloudflare Pages:** connect GitHub, build command `npm run build`, output `dist`

Set your environment variables in the hosting platform's dashboard.

---

## License

Private — AKT Construction. All rights reserved.
