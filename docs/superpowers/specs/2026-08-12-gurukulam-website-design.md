# Kalarigram Gurukulam Website — Design Spec

**Date:** 2026-08-12
**Status:** Approved by user, proceeding to implementation plan

## 1. Purpose

Build a public website for the Kalarigram Gurukulam project — a single integrated site that
tells the Gurukulam story (Kalari training + Ayurveda college + attached hospital, in Calicut),
builds credibility with donors/press/regulators, and drives donations, with room to grow into a
student/community hub later. It replaces no existing site; this is greenfield.

Background context (from prior research, see `notebooklm-sources/` and
`storm-reports/gurukulam-ayurveda-college-hospital-india-briefing.html` in this project): Kalarigram
is a Trust founded 2010, an offshoot of Hindustan Kalari Sangam (Calicut, 1952), currently
purchasing land in Calicut that includes an existing licensed Ayurvedic hospital, and raising
funds toward the full Gurukulam build-out.

## 2. Audience

Everyone equally: NRI/diaspora donors, domestic Indian donors and local community, prospective
Kalari/Ayurveda students, and press. No single group is prioritized over the others in tone or
structure.

## 3. Scope for v1

- **Single scrolling page** with a sticky anchor nav (not a multi-page site).
- **No CMS.** Content changes go through code/a developer for v1; a CMS can be added later if
  the update cadence demands it.
- **Placeholder content.** Real photos, logo, and finalized copy are not yet available — v1 ships
  with realistic placeholder text (drawn from existing research) and clearly-labeled placeholder
  image blocks that are trivial to swap for real assets later.
- **No domain/hosting yet.** Build as a static site deployable to a free/low-cost modern host
  (Vercel or Netlify); a custom domain gets pointed at it later.
- **Donations are live from day one.** Razorpay (domestic) and PayPal (international/NRI) are
  already set up on Kalarigram's side. The site embeds both as hosted payment buttons — no
  custom backend or order-management code needed for v1.

## 4. Visual Direction — "Fusion: Heritage Meets Clarity"

Selected after reviewing 4 mockup directions in the visual brainstorming companion (Traditional
Kerala Heritage, Ayurvedic Calm & Wellness, Modern Institutional/NGO, and Fusion).

- **Palette:** warm terracotta/earth tones (deep red-brown `#8a3a1e`, dark ink-brown `#3a2418`) as
  accent colors, on a clean warm-cream/white base (`#fdf8ef`), with a navy+gold treatment
  (`#0f2a3d` / `#c9a13b`) reserved for the Donate section to signal trust/credibility at the
  conversion point.
- **Typography:** Fraunces (serif display, Google Font) for headlines to carry the
  heritage/ceremonial feel, paired with Inter (sans-serif) for body text and UI so the site reads
  as credible and current, not purely traditional. Final pairing can be revisited during frontend
  implementation if it doesn't hold up in practice.
- **Overall feel:** rooted in Kalari/Kerala identity, but structured and typeset like a credible
  modern institution — needs to reassure donors and regulators, not just evoke tradition.

## 5. Page Structure (approved wireframe order)

Single scrolling page, sticky nav with anchor links to each section:

1. **Nav** — logo/wordmark + anchor links (Vision · Progress · Gallery · Donate · Contact) +
   mobile hamburger menu
2. **Hero** — one-line vision statement, two CTAs: "Support the Land" (scrolls to Donate) and
   "Read Our Story" (scrolls to Vision)
3. **Vision / Our Story** — Hindustan Kalari Sangam (1952) → Kalarigram (2010) → the Gurukulam
   concept (Kalari training + NCISM-track Ayurveda college + attached hospital), why Calicut, why
   now
4. **Progress / Project Status** — three status cards (land acquisition, the existing Ayurvedic
   hospital on-site, regulatory milestones/NCISM-KUHS journey) + a fundraising progress bar
   (₹ raised / goal, manually updated in code for v1)
5. **Gallery** — placeholder image grid (training, the land, the hospital, Gurukkal & students),
   clearly marked as placeholders pending real photos
6. **Donate / Contribute** — Razorpay payment button (domestic) + PayPal donate button
   (international/NRI) side by side, suggested contribution framing, brief transparency note on
   fund use
7. **Get Involved / Contact** — contact form (name, email, message) + address + social links
8. **Footer** — trust/registration info (as available), social links, copyright

## 6. Architecture

- **No backend, no database.** Static site only.
- **Build tool:** Vite, for a clean dev workflow, asset bundling/optimization, and easy future
  extension — output is plain static HTML/CSS/JS, portable to any static host.
- **Donations:** Razorpay's hosted Payment Button and PayPal's Hosted Donate Button, both
  embedded via their standard script snippets. Both handle the actual payment flow and security
  on their own infrastructure — no custom order-creation or webhook code needed for v1.
- **Contact form:** wired to Formspree (free tier) — emails form submissions to Kalarigram, no
  backend required.
- **Hosting/deploy target:** Vercel or Netlify free tier for v1; custom domain added later when
  finalized.

## 7. Components

Each section listed in §5 is built as an independent, self-contained block (its own markup +
scoped styles), so sections can be reordered, edited, or replaced without entangling others.

## 8. Data Flow

Effectively none. The only outbound integrations are: (a) Razorpay's hosted checkout, (b)
PayPal's hosted checkout, (c) Formspree for the contact form. No data is stored or processed by
the site itself.

## 9. Error Handling

- Payment failures/edge cases are handled entirely within Razorpay's and PayPal's own checkout
  UIs — outside this site's responsibility.
- Contact form: client-side validation (required fields, email format) before Formspree
  submission; Formspree itself handles spam filtering and delivery.
- Placeholder images/content are visually and unambiguously marked as placeholders, so it's
  obvious what must be replaced before public launch.
- Mobile-first CSS throughout, since a meaningful share of donors (especially NRI/diaspora) will
  view the site on phones.

## 10. Testing

No automated test suite (disproportionate for a static marketing/donation page). Manual QA
checklist instead, to run before launch and after significant changes:

- Cross-browser check (Chrome, Safari, Firefox)
- Responsive check at common breakpoints (mobile/tablet/desktop)
- Anchor-nav scroll behavior on all sections
- A real Formspree test submission end-to-end
- Razorpay/PayPal sandbox test transactions, if test credentials are available
- Lighthouse pass for performance, accessibility, and color contrast (the terracotta-on-cream and
  gold-on-navy combinations need an explicit contrast check on button/CTA text)

## 11. Explicitly Out of Scope for v1

- CMS / self-service content editing
- Multi-page navigation/routing
- User accounts, login, or any personalization
- Custom backend for payments (relying on Razorpay/PayPal hosted buttons instead)
- Real photography, finalized logo, and finalized copy (placeholders only, swapped in later)
- Custom domain purchase/DNS configuration (site will be deployable and previewable without one)

## 12. Open Items to Resolve Before Public Launch (not blockers for building v1)

- Real Razorpay/PayPal account credentials (public key/button IDs) to swap in for placeholder
  IDs used during development
- Formspree account + form endpoint ID
- Real photos, logo, and any brand guidelines
- Final copy review by Kalarigram (placeholder copy is drawn from prior research and should be
  reviewed for accuracy/tone before going live)
- Domain name and DNS once chosen
