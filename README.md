# Lumière Wellness Studio

A modern, luxury static website for a salon and wellness spa — built with plain HTML5, CSS3 and vanilla ES6+ JavaScript (no build step, no frameworks).

## ✦ Live Preview

Open `index.html` in any modern browser, or serve the folder locally:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## ✦ Project Structure

```
lumiere-wellness/
├── index.html          Home — hero, about, service previews, packages, experts, testimonials, membership
├── services.html        Hair Services & Beauty Services with category filtering
├── spa.html              Spa treatments + interactive before/after slider
├── experts.html          Full team grid
├── gallery.html          Image gallery with lightbox
├── contact.html          Appointment booking form, contact info, map, FAQ accordion
├── css/
│   └── style.css        Design tokens, layout, components, animations
├── js/
│   └── main.js           Navigation, scroll reveal, filters, before/after slider,
│                          lightbox, testimonial slider, FAQ accordion, form validation
├── assets/                Reserved for local image/icon assets
└── README.md
```

## ✦ Design System

| Token | Value | Use |
|---|---|---|
| `--ivory` | `#FBF7F1` | Primary background |
| `--beige` / `--ivory-deep` | `#EAE0CC` / `#F4EEE3` | Section alternation |
| `--sage` / `--sage-deep` | `#7C8C6E` / `#5F6E52` | Primary accent, buttons |
| `--rose` / `--rose-deep` | `#D9B4A8` / `#C0917F` | Secondary accent |
| `--bronze` | `#A9825A` | Eyebrow labels, dividers, icons |
| `--charcoal` | `#2B2620` | Primary text |

**Typography:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (display serif) paired with [Manrope](https://fonts.google.com/specimen/Manrope) (body/UI sans).

**Signature element:** an organic, softly-morphing "blob" image frame (inspired by water ripples and botanical forms) used throughout the hero, about section and expert portraits — reinforcing the calm, spa-like identity.

**Icons:** [Lucide](https://lucide.dev) via CDN.

## ✦ Interactive Features

- Sticky, blur-on-scroll navigation with animated mobile drawer
- Scroll-triggered reveal animations (`IntersectionObserver`, respects `prefers-reduced-motion`)
- Service category filtering (All / Hair / Beauty)
- Draggable, touch- and keyboard-accessible before/after comparison slider
- Gallery lightbox with keyboard navigation (Esc / ← / →)
- Auto-advancing testimonial carousel with dot navigation
- FAQ accordion
- Appointment booking form with front-end validation and a success state
- Footer newsletter micro-interaction

## ✦ Accessibility & SEO

- Semantic landmarks (`header`, `main`, `nav`, `footer`), skip-to-content link, visible focus states
- Descriptive `alt` text on all imagery, labelled form fields, `aria-*` attributes on interactive widgets
- Meta descriptions, Open Graph tags and a favicon on every page
- Fully responsive from 360px mobile through large desktop

## ✦ Notes on Imagery

Photography in this build uses placeholder image URLs (`picsum.photos`) so the template renders immediately without any binary assets to manage. For production, replace each `<img src="https://picsum.photos/seed/...">` with licensed studio photography of matching dimensions — image dimensions and `alt` text are already written for the intended subject (hair color, facials, massage, portraits, etc.), so swapping sources is a drop-in replacement.

## ✦ Business Information Used

- **Name:** Lumière Wellness Studio
- **Address:** 42 Meridian Avenue, Beverly Hills, CA 90210
- **Phone:** +1 (310) 555-0148
- **Email:** hello@lumierewellness.studio
- **Hours:** Tue–Sat 9am–7pm · Sun 10am–4pm · Mon Closed

---
Built as a static, dependency-free front-end template — ready to deploy to any static host (Netlify, Vercel, GitHub Pages, S3, etc.).
