# Boss D Hair Studio

A premium luxury hair salon website built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

## ✨ Features

- **Luxury Dark + Gold Design** — Refined aesthetic with shimmer-gradient gold text, noise textures, and meticulous spacing
- **Full Responsive** — Mobile-first with a hamburger menu, collapsible sections, and adaptive layouts
- **Scroll Reveal Animations** — Intersection Observer–powered fade/slide/scale reveals with stagger support
- **Hero Load Sequence** — Staggered entrance animations with reduced-motion support
- **Services Menu** — Signature cut, styling, treatments, and premium experiences
- **Gallery** — Hover-overlay portfolio grid
- **Client Testimonials** — Star-rated review cards with luxury hover effects
- **Floating WhatsApp Button** — One-tap booking via WhatsApp (wa.me)
- **Scroll-to-Top Button** — Appears after scroll, smooth returns
- **SEO Optimized** — Open Graph, Twitter cards, JSON-LD structured data (HairSalon schema), robots.txt, sitemap.xml
- **Custom 404 Page** — Branded "Lost your style?" not-found experience
- **Loading State** — Shimmer-based suspense fallback
- **Error Boundary** — Graceful error handling with retry
- **Live Navigation** — Scroll-spy active section highlighting on desktop nav
- **Map Embed** — Google Maps iframe with dark-themed styling

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## 📁 Project Structure

```
app/
├── components/
│   ├── ScrollReveal.tsx           # Intersection Observer reveal wrapper
│   ├── FloatingActions.tsx        # WhatsApp + scroll-top buttons
│   ├── icons.tsx                  # Custom SVG icons (Instagram, Facebook)
│   └── sections/
│       ├── Header.tsx             # Fixed nav, top bar, scroll-spy, mobile menu
│       ├── Hero.tsx               # Full-screen hero with entrance animations
│       ├── About.tsx              # Brand story + process
│       ├── Services.tsx           # Service price & duration list
│       ├── Gallery.tsx            # Hover-overlay portfolio grid
│       ├── Shop.tsx               # Product collection teaser
│       ├── Testimonials.tsx       # Client review cards
│       ├── Booking.tsx            # CTA with phone/WhatsApp actions
│       └── Footer.tsx             # Brand, nav, contact, map embed
├── globals.css                    # Design system, animations, utilities
├── layout.tsx                     # Root layout, fonts, metadata, JSON-LD
├── page.tsx                       # Home page composition
├── loading.tsx                    # Suspense fallback
├── error.tsx                      # Error boundary UI
├── not-found.tsx                  # 404 page
├── robots.ts                      # robots.txt
└── sitemap.ts                     # sitemap.xml
```

## 🎨 Design System

| Token | Value |
|---|---|
| `--metallic-gold` | `#C9A24D` |
| `--champagne-gold` | `#E5C77A` |
| `--dark-gold` | `#8F6B28` |
| `--luxury-black` | `#0A0A0A` |
| Fonts | Cormorant Garamond (serif) + Inter (sans) |

## 🌍 Deployment

Ready for **Vercel**, **Netlify**, or any Node.js host.

```bash
vercel          # Deploy to Vercel
```

Update the phone number / social URLs in:
- `app/components/sections/Header.tsx`
- `app/components/sections/Footer.tsx`
- `app/components/sections/Booking.tsx`
- `app/components/FloatingActions.tsx`
- `app/layout.tsx` (metadata + JSON-LD)
