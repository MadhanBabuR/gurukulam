# Kalarigram Gurukulam Website

Single-page static site for the Kalarigram Gurukulam project (Calicut, Kerala): the story,
project status, gallery, and donations (Razorpay + PayPal).

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
| Logo / wordmark | `index.html`, Nav brand (`.nav__brand`) currently plain text | text-only "Kalarigram Gurukulam" |
| Final copy review | Hero, Vision, Progress, Donate, Contact sections | placeholder copy drawn from prior project research |
| Custom domain | DNS / host settings | none configured — site is reachable only at the Netlify/Vercel-issued URL until this is done |

## Manual QA checklist

Run this before launch and after any significant change (see Task 10 of the implementation plan
for the full walkthrough): cross-browser check, responsive check at 375/768/1440px, anchor-nav
scroll behavior, a real Formspree test submission, a Razorpay/PayPal sandbox test if credentials
are available, and a Lighthouse pass (performance, accessibility, color contrast).
