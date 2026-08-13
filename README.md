# GVS Ayurveda Gurukulam Website

Single-page static site for GVS Ayurveda Gurukulam (Calicut, Kerala), built by Kalarigram:
the story, project status, gallery, and donations (Razorpay + PayPal).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # serve the production build locally to double-check before deploying
```

Output goes to `dist/` — a plain static bundle, deployable anywhere.

## Deploy

- **Netlify:** connect this repo; `netlify.toml` already sets the build command (`npm run build`)
  and publish directory (`dist`). No further config needed.
- **Vercel:** import this repo; Vercel auto-detects the Vite framework preset with zero
  additional configuration.
- A custom domain can be pointed at either host once one is chosen — not required to deploy.

## Open items before public launch

These are placeholder values baked into the code during development. Replace all of them before
sharing the live URL publicly:

| What | Where | Placeholder value |
|---|---|---|
| Razorpay payment button ID | `index.html`, Donate section, `data-payment_button_id` attribute | `pl_PLACEHOLDER_RAZORPAY_ID` |
| PayPal hosted button ID | `index.html`, Donate section, `hosted_button_id` input value | `PLACEHOLDER_PAYPAL_BUTTON_ID` |
| Formspree form endpoint | `index.html`, Contact section, form `action` attribute | `https://formspree.io/f/PLACEHOLDER_FORM_ID` |
| Fundraising totals | `src/js/progressBar.js`, `FUNDRAISE_RAISED` / `FUNDRAISE_GOAL` | `0` / `10000000` |
| Real photos | `index.html`, Gallery section — replace the four `.gallery__placeholder` divs with `<img>` tags once photos exist | 4 placeholder tiles |
| Favicon | `index.html` `<head>` | still an emoji data-URI placeholder — the real logo (`public/logo.jpeg`) is used in the nav brand as of this commit, but not yet as the favicon; a cropped/square version of the logo should replace the emoji before launch |
| Final copy review | Hero, Vision, Progress, Donate, Contact sections | placeholder copy drawn from prior project research |
| Custom domain | DNS / host settings | none configured — site is reachable only at the Netlify/Vercel-issued URL until this is done |
| Placeholder disclosure text (3 elements) | index.html, elements with class `placeholder-notice` | remove all three once real credentials/content are in place |
| robots.txt | public/robots.txt | currently blocks all crawlers (site isn't ready for public search indexing yet) — update or remove this file when the site is ready to go live and be indexed |
| Open Graph / Twitter image (`og:image`) | index.html `<head>` | no image tag added yet since no real photos exist — add `<meta property="og:image">` once a real hero/share image is ready |
| Donate section suggested contribution tiers | index.html Donate section | spec called for "suggested contribution framing" — no suggested amounts/tiers exist yet; add once decided |
| Contact section address + social links | index.html Contact section | spec called for a full address and social links — currently only "Kalarigram · Calicut, Kerala, India" and the kalarigram.org link exist; add real street address (if to be published) and social media links once available |
| Footer trust/registration info + social links | index.html Footer | spec called for trust/registration info and social links — currently only a copyright line and one website link exist; the Donate section already states "Kalarigram is a registered Trust" with no registration number to back it, which matters for donors claiming 80G tax deductions in India — add the actual registration number and any social links once available |
| Razorpay merchant policy pages | N/A — not yet built | Razorpay's live-payment-button activation typically requires the site to link Terms & Conditions, a Privacy Policy, and a Refund/Cancellation Policy; this site currently has none. This conflicts with the project's single-page-only scope decision and needs a decision (e.g. link to externally-hosted policy documents, or add anchored sections) before Razorpay can go live — flag to the project owner, don't build a fix without a decision. |

## Manual QA checklist

Run this before launch and after any significant change (see Task 10 of the implementation plan
for the full walkthrough): cross-browser check, responsive check at 375/768/1440px, anchor-nav
scroll behavior, a real Formspree test submission, a Razorpay/PayPal sandbox test if credentials
are available, and a Lighthouse pass (performance, accessibility, color contrast).
