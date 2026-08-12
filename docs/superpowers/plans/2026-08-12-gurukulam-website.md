# Kalarigram Gurukulam Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page static website for the Kalarigram Gurukulam project — story, project status, gallery, and live donations (Razorpay + PayPal) — deployable to Vercel or Netlify.

**Architecture:** A Vite-built static site (plain HTML/CSS/JS output, no framework, no backend, no database). Donations use Razorpay's and PayPal's hosted payment-button embeds directly; the contact form posts to Formspree. Each page section is a self-contained HTML block + its own CSS file; a handful of small vanilla-JS modules handle the mobile nav, the fundraising bar, and contact-form validation.

**Tech Stack:** Vite (build tool), plain HTML/CSS/JS (no UI framework), Google Fonts (Fraunces + Inter), Razorpay Payment Button embed, PayPal Hosted Donate Button embed, Formspree (contact form backend).

## Global Constraints

(Copied from `docs/superpowers/specs/2026-08-12-gurukulam-website-design.md`; every task below implicitly includes these.)

- Single scrolling page with a sticky anchor nav — not multi-page. (Spec §3, §5)
- No CMS for v1 — content changes go through code. (Spec §3)
- Placeholder content only for v1 (no real photos/logo/final copy yet) — every placeholder must be clearly, visibly marked as a placeholder. (Spec §3)
- No domain/hosting configured yet — site must build to a static bundle deployable to Vercel or Netlify's free tier. (Spec §3, §6)
- Donations are live from day one via Razorpay (domestic) and PayPal (international/NRI) hosted payment buttons — no custom backend or order-management code. (Spec §3, §6)
- No backend, no database of any kind. (Spec §6)
- Build tool is Vite; the shipped output must be plain static HTML/CSS/JS. (Spec §6)
- Contact form is wired to Formspree's free tier — no backend. (Spec §6)
- Visual direction is "Fusion: Heritage Meets Clarity" — warm terracotta/ink palette with a navy+gold Donate section, Fraunces for headlines, Inter for body text. (Spec §4)
- Mobile-first CSS throughout. (Spec §9)
- **No automated test suite** — the spec explicitly rules this out as disproportionate for a static marketing/donation page (Spec §10). Every task below replaces the usual "write failing test / make it pass" cycle with a concrete **manual verification step** in the Vite dev server instead. Task 10 runs the full manual QA checklist from Spec §10 end-to-end.
- Out of scope for v1: CMS, multi-page routing, user accounts/login, custom payment backend, real photography/logo/copy, domain purchase/DNS. (Spec §11)

---

## Task 1: Project Scaffolding & Design Tokens

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.js`
- Create: `src/styles/variables.css`
- Create: `src/styles/base.css`
- Create: `src/styles/main.css`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: CSS custom properties `--color-cream`, `--color-cream-alt`, `--color-ink`, `--color-terracotta`, `--color-terracotta-dark`, `--color-navy`, `--color-gold`, `--color-text-muted`, `--font-display`, `--font-body`, `--max-width`, `--space-1..5` (defined in `variables.css`, used by every later CSS file). Utility classes `.container`, `.section`, `.section__title`, `.section__intro`, `.btn`, `.btn-primary`, `.btn-outline` (defined in `base.css`, used by every later section). HTML marker comments in `index.html` — `<!-- NAV -->`, `<!-- HERO -->`, `<!-- VISION -->`, `<!-- PROGRESS -->`, `<!-- GALLERY -->`, `<!-- DONATE -->`, `<!-- CONTACT -->`, `<!-- FOOTER -->` — each later task replaces exactly one marker with real markup. `src/main.js` as the single JS entry point later tasks add `import` lines to. `src/styles/main.css` as the single CSS entry point later tasks add `@import` lines to.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "kalarigram-gurukulam-website",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: `node_modules/` is created, `vite` installs with no errors.

- [ ] **Step 3: Create `src/styles/variables.css`**

```css
:root {
  --color-cream: #fdf8ef;
  --color-cream-alt: #f5f1e6;
  --color-ink: #3a2418;
  --color-terracotta: #8a3a1e;
  --color-terracotta-dark: #6b2c16;
  --color-navy: #0f2a3d;
  --color-gold: #c9a13b;
  --color-text-muted: #6b5644;

  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  --max-width: 1100px;

  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 40px;
  --space-5: 64px;
}
```

- [ ] **Step 4: Create `src/styles/base.css`**

```css
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body, h1, h2, h3, p, figure, ul {
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  color: var(--color-ink);
  background: var(--color-cream);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-display);
  line-height: 1.2;
  font-weight: 600;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-3);
}

.section {
  padding: var(--space-5) 0;
}

.section__title {
  font-size: 28px;
  color: var(--color-ink);
  margin-bottom: var(--space-2);
}

.section__intro {
  color: var(--color-text-muted);
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: var(--space-3);
  max-width: 600px;
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  border-radius: 4px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.02em;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn-primary {
  background: var(--color-terracotta);
  color: var(--color-cream);
}

.btn-primary:hover {
  background: var(--color-terracotta-dark);
}

.btn-outline {
  background: transparent;
  color: var(--color-ink);
  border-color: var(--color-ink);
}
```

- [ ] **Step 5: Create `src/styles/main.css`**

```css
@import './variables.css';
@import './base.css';
```

- [ ] **Step 6: Create `index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kalarigram Gurukulam — Kalari, Ayurveda &amp; the Gurukula Tradition</title>
  <meta name="description" content="Kalarigram is building a Gurukulam in Calicut, Kerala — combining Kalaripayattu training, an Ayurveda college, and an attached hospital. Support the vision." />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%97%A1%EF%B8%8F%3C/text%3E%3C/svg%3E" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/src/styles/main.css" />
</head>
<body>
  <!-- NAV -->
  <!-- HERO -->
  <!-- VISION -->
  <!-- PROGRESS -->
  <!-- GALLERY -->
  <!-- DONATE -->
  <!-- CONTACT -->
  <!-- FOOTER -->
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

- [ ] **Step 7: Create `src/main.js`**

```js
import './styles/main.css';
```

- [ ] **Step 8: Verify in browser**

Run: `npm run dev`
Open the printed local URL (e.g. `http://localhost:5173`).
Expected: a blank cream-colored (`#fdf8ef`) page loads with no console errors. View page source / devtools to confirm the Fraunces and Inter fonts are being requested from Google Fonts.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json index.html src/main.js src/styles/variables.css src/styles/base.css src/styles/main.css
git commit -m "Scaffold Vite project with design tokens and page skeleton"
```

---

## Task 2: Hero Section

**Files:**
- Create: `src/styles/hero.css`
- Modify: `src/styles/main.css`
- Modify: `index.html` (replace `<!-- HERO -->` marker)

**Interfaces:**
- Consumes: `.container`, `.btn`, `.btn-primary`, `.btn-outline` from Task 1's `base.css`; `--color-*`, `--font-*`, `--space-*` from `variables.css`
- Produces: `#hero` section, anchor targets `#donate` and `#vision` are referenced here (targets are created in Task 6 and Task 3 respectively — links will resolve once those tasks land)

- [ ] **Step 1: Create `src/styles/hero.css`**

```css
.hero {
  padding: var(--space-5) 0 var(--space-4);
  background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-alt) 100%);
}

.hero__inner {
  max-width: 720px;
}

.eyebrow {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-terracotta);
  margin-bottom: var(--space-2);
}

.hero__headline {
  font-size: clamp(32px, 5vw, 52px);
  color: var(--color-ink);
  margin-bottom: var(--space-3);
}

.hero__sub {
  font-size: 17px;
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
  max-width: 600px;
}

.hero__actions {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}
```

- [ ] **Step 2: Add the import to `src/styles/main.css`**

```css
@import './variables.css';
@import './base.css';
@import './hero.css';
```

- [ ] **Step 3: Replace the `<!-- HERO -->` marker in `index.html`**

```html
<header class="hero" id="hero">
  <div class="container hero__inner">
    <p class="eyebrow">Kalarigram Gurukulam &middot; Calicut, Kerala</p>
    <h1 class="hero__headline">A Gurukulam for Kalaripayattu, Ayurveda &amp; the next generation of healers.</h1>
    <p class="hero__sub">Kalarigram is building a residential Gurukulam in Calicut — combining traditional Kalaripayattu training with an NCISM-track Ayurveda college and an attached hospital. We're currently acquiring the land and raising the funds to make it real.</p>
    <div class="hero__actions">
      <a href="#donate" class="btn btn-primary">Support the Land</a>
      <a href="#vision" class="btn btn-outline">Read Our Story</a>
    </div>
  </div>
</header>
```

- [ ] **Step 4: Verify in browser**

With `npm run dev` running, reload the page.
Expected: a hero section renders with the eyebrow label, large serif headline, muted sub-text, and two buttons ("Support the Land" filled terracotta, "Read Our Story" outlined). Clicking either button does nothing yet (targets don't exist until later tasks) — that's expected at this point.

- [ ] **Step 5: Commit**

```bash
git add src/styles/hero.css src/styles/main.css index.html
git commit -m "Add hero section"
```

---

## Task 3: Vision / Our Story Section

**Files:**
- Create: `src/styles/vision.css`
- Modify: `src/styles/main.css`
- Modify: `index.html` (replace `<!-- VISION -->` marker)

**Interfaces:**
- Consumes: `.container`, `.section`, `.section__title` from `base.css`
- Produces: `#vision` section (anchor target for the Hero's "Read Our Story" link and the future Nav's "Vision" link)

- [ ] **Step 1: Create `src/styles/vision.css`**

```css
.vision__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
  margin: var(--space-4) 0;
}

.vision__block h3 {
  font-size: 18px;
  color: var(--color-terracotta);
  margin-bottom: var(--space-1);
}

.vision__block p {
  color: var(--color-text-muted);
  font-size: 15px;
}

.vision__why {
  font-size: 16px;
  color: var(--color-ink);
  max-width: 720px;
  border-left: 3px solid var(--color-terracotta);
  padding-left: var(--space-3);
}
```

- [ ] **Step 2: Add the import to `src/styles/main.css`**

```css
@import './variables.css';
@import './base.css';
@import './hero.css';
@import './vision.css';
```

- [ ] **Step 3: Replace the `<!-- VISION -->` marker in `index.html`**

```html
<section class="section vision" id="vision">
  <div class="container">
    <h2 class="section__title">Our Story</h2>
    <div class="vision__grid">
      <div class="vision__block">
        <h3>1952 — Hindustan Kalari Sangam</h3>
        <p>Founded in Calicut by Veerasree Sami Gurukkal, preserving the discipline of Kalaripayattu for a new generation.</p>
      </div>
      <div class="vision__block">
        <h3>2010 — Kalarigram</h3>
        <p>Lakshman Gurukkal founds Kalarigram as an offshoot of Hindustan Kalari Sangam, carrying the tradition forward through training, Kalari Marma Chikitsa treatment, yoga, and meditation.</p>
      </div>
      <div class="vision__block">
        <h3>Today — The Gurukulam</h3>
        <p>We're building a residential Gurukulam in Calicut that unites three things under one roof: Kalaripayattu training, an Ayurveda medical college on the NCISM Gurukulam pathway, and an attached teaching hospital — reviving the classical model where tradition and healing were taught together.</p>
      </div>
    </div>
    <p class="vision__why">Why now? The Government of India's push to revive Gurukula-style Ayurveda education gives this model a real academic pathway for the first time in decades. Why Calicut? It's where this tradition has lived for over 70 years — and where Kerala's own history of Ayurveda institution-building runs deepest.</p>
  </div>
</section>
```

- [ ] **Step 4: Verify in browser**

Reload the dev server page.
Expected: clicking "Read Our Story" in the Hero now smooth-scrolls down to the Vision section. The Vision section shows a 3-column grid (1952 / 2010 / Today) collapsing to a single column on narrow viewports, followed by the "Why now / why Calicut" callout with a left terracotta border.

- [ ] **Step 5: Commit**

```bash
git add src/styles/vision.css src/styles/main.css index.html
git commit -m "Add vision/our story section"
```

---

## Task 4: Progress / Project Status Section + Fundraising Bar

**Files:**
- Create: `src/styles/progress.css`
- Create: `src/js/progressBar.js`
- Modify: `src/styles/main.css`
- Modify: `src/main.js`
- Modify: `index.html` (replace `<!-- PROGRESS -->` marker)

**Interfaces:**
- Consumes: `.container`, `.section`, `.section__title` from `base.css`
- Produces: `#progress` section (anchor target for the future Nav's "Progress" link). `initFundraiseBar()` — self-invoking on `DOMContentLoaded`, reads/writes DOM elements `#fundraise-bar-fill`, `#fundraise-raised-label`, `#fundraise-goal-label`. No other file calls into this module directly; it is imported into `main.js` for its side effect only.

- [ ] **Step 1: Create `src/styles/progress.css`**

```css
.progress {
  background: var(--color-cream-alt);
}

.progress__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-3);
  margin: var(--space-4) 0;
}

.status-card {
  background: var(--color-cream);
  border: 1px solid rgba(58, 36, 24, 0.1);
  border-radius: 6px;
  padding: var(--space-3);
}

.status-card__label {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-terracotta);
  margin-bottom: var(--space-1);
}

.status-card__body {
  font-size: 14px;
  color: var(--color-text-muted);
}

.fundraise__labels {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-ink);
  margin-bottom: 6px;
  font-weight: 600;
}

.fundraise__bar {
  height: 12px;
  background: #e0d9c8;
  border-radius: 8px;
  overflow: hidden;
}

.fundraise__bar-fill {
  height: 100%;
  background: var(--color-terracotta);
  width: 0%;
  transition: width 0.6s ease;
}

.fundraise__note {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 6px;
}
```

- [ ] **Step 2: Add the import to `src/styles/main.css`**

```css
@import './variables.css';
@import './base.css';
@import './hero.css';
@import './vision.css';
@import './progress.css';
```

- [ ] **Step 3: Replace the `<!-- PROGRESS -->` marker in `index.html`**

```html
<section class="section progress" id="progress">
  <div class="container">
    <h2 class="section__title">Project Status</h2>
    <div class="progress__cards">
      <div class="status-card">
        <p class="status-card__label">Land Acquisition</p>
        <p class="status-card__body">Currently finalizing purchase of land in Calicut, which includes an existing, Kerala-licensed Ayurvedic hospital.</p>
      </div>
      <div class="status-card">
        <p class="status-card__label">Existing Hospital</p>
        <p class="status-card__body">The site already has an operating Ayurvedic hospital with a good bed count — under review for NCISM teaching-hospital compatibility.</p>
      </div>
      <div class="status-card">
        <p class="status-card__label">Regulatory Journey</p>
        <p class="status-card__body">Working toward NCISM recognition and KUHS affiliation for the Ayurveda college, following the Pre-Ayurveda "Gurukulam" pathway.</p>
      </div>
    </div>
    <div class="fundraise">
      <div class="fundraise__labels">
        <span id="fundraise-raised-label">Raised so far</span>
        <span id="fundraise-goal-label">Goal</span>
      </div>
      <div class="fundraise__bar">
        <div class="fundraise__bar-fill" id="fundraise-bar-fill"></div>
      </div>
      <p class="fundraise__note">Placeholder figures — update with real fundraising totals before launch.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create `src/js/progressBar.js`**

```js
const FUNDRAISE_RAISED = 0; // PLACEHOLDER VALUE — replace with real amount (INR) before launch
const FUNDRAISE_GOAL = 10000000; // PLACEHOLDER VALUE — replace with real goal (INR) before launch

function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function initFundraiseBar() {
  const fill = document.getElementById('fundraise-bar-fill');
  const raisedLabel = document.getElementById('fundraise-raised-label');
  const goalLabel = document.getElementById('fundraise-goal-label');
  if (!fill || !raisedLabel || !goalLabel) return;

  const percent = FUNDRAISE_GOAL > 0
    ? Math.min(100, Math.round((FUNDRAISE_RAISED / FUNDRAISE_GOAL) * 100))
    : 0;

  raisedLabel.textContent = `Raised: ${formatINR(FUNDRAISE_RAISED)}`;
  goalLabel.textContent = `Goal: ${formatINR(FUNDRAISE_GOAL)}`;
  fill.style.width = `${percent}%`;
}

document.addEventListener('DOMContentLoaded', initFundraiseBar);
```

- [ ] **Step 5: Add the import to `src/main.js`**

```js
import './styles/main.css';
import './js/progressBar.js';
```

- [ ] **Step 6: Verify in browser**

Reload the dev server page.
Expected: the Progress section shows three status cards on a cream-alt background, followed by a fundraising bar. The labels read "Raised: ₹0" and "Goal: ₹1,00,00,000" and the bar fill is at 0% width. Temporarily edit `FUNDRAISE_RAISED` to `5000000` in the browser devtools or file, save, and confirm the bar animates to 50% width and the label updates — then revert the value back to `0` before committing.

- [ ] **Step 7: Commit**

```bash
git add src/styles/progress.css src/styles/main.css src/js/progressBar.js src/main.js index.html
git commit -m "Add project status section with fundraising progress bar"
```

---

## Task 5: Gallery Section

**Files:**
- Create: `src/styles/gallery.css`
- Modify: `src/styles/main.css`
- Modify: `index.html` (replace `<!-- GALLERY -->` marker)

**Interfaces:**
- Consumes: `.container`, `.section`, `.section__title`, `.section__intro` from `base.css`
- Produces: `#gallery` section (anchor target for the future Nav's "Gallery" link)

- [ ] **Step 1: Create `src/styles/gallery.css`**

```css
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-2);
}

.gallery__placeholder {
  aspect-ratio: 4 / 3;
  background: repeating-linear-gradient(135deg, var(--color-cream-alt), var(--color-cream-alt) 10px, #ece4d0 10px, #ece4d0 20px);
  border: 1px dashed var(--color-terracotta);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-2);
  font-size: 12px;
  color: var(--color-text-muted);
}
```

- [ ] **Step 2: Add the import to `src/styles/main.css`**

```css
@import './variables.css';
@import './base.css';
@import './hero.css';
@import './vision.css';
@import './progress.css';
@import './gallery.css';
```

- [ ] **Step 3: Replace the `<!-- GALLERY -->` marker in `index.html`**

```html
<section class="section gallery" id="gallery">
  <div class="container">
    <h2 class="section__title">Gallery</h2>
    <p class="section__intro">Photos are placeholders for now — real images of training, the land, and the hospital go here before launch.</p>
    <div class="gallery__grid">
      <div class="gallery__placeholder">Training at Kalarigram</div>
      <div class="gallery__placeholder">The land in Calicut</div>
      <div class="gallery__placeholder">The existing hospital</div>
      <div class="gallery__placeholder">Gurukkal &amp; students</div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Verify in browser**

Reload the dev server page.
Expected: a 4-tile grid of diagonally-striped placeholder boxes, each with a dashed terracotta border and a caption describing what real photo belongs there. Grid reflows to fewer columns as the viewport narrows.

- [ ] **Step 5: Commit**

```bash
git add src/styles/gallery.css src/styles/main.css index.html
git commit -m "Add gallery section with labeled placeholders"
```

---

## Task 6: Donate Section (Razorpay + PayPal)

**Files:**
- Create: `src/styles/donate.css`
- Modify: `src/styles/main.css`
- Modify: `index.html` (replace `<!-- DONATE -->` marker)

**Interfaces:**
- Consumes: `.container`, `.section`, `.section__title`, `.btn`, `.btn-primary` from `base.css`
- Produces: `#donate` section (anchor target for the Hero's "Support the Land" link and the future Nav's "Donate" link). Contains two placeholder identifiers later replaced with real credentials: the Razorpay `data-payment_button_id` attribute and the PayPal `hosted_button_id` input value — both are listed again in Task 11's launch checklist.

- [ ] **Step 1: Create `src/styles/donate.css`**

```css
.donate {
  background: var(--color-navy);
  color: #fff;
}

.donate .section__title {
  color: #fff;
}

.donate__intro {
  color: #cbd6de;
  max-width: 600px;
  margin-bottom: var(--space-4);
}

.donate__options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-3);
}

.donate__option {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: var(--space-3);
}

.donate__option h3 {
  color: var(--color-gold);
  font-size: 16px;
  margin-bottom: 6px;
}

.donate__option p {
  color: #cbd6de;
  font-size: 14px;
  margin-bottom: var(--space-2);
}

.donate__note {
  font-size: 12px;
  color: #9fb0bb;
  margin-top: var(--space-3);
}

.donate .btn-primary {
  background: var(--color-gold);
  color: var(--color-navy);
  font-weight: 700;
  border: none;
  cursor: pointer;
}
```

- [ ] **Step 2: Add the import to `src/styles/main.css`**

```css
@import './variables.css';
@import './base.css';
@import './hero.css';
@import './vision.css';
@import './progress.css';
@import './gallery.css';
@import './donate.css';
```

- [ ] **Step 3: Replace the `<!-- DONATE -->` marker in `index.html`**

```html
<section class="section donate" id="donate">
  <div class="container">
    <h2 class="section__title">Support the Gurukulam</h2>
    <p class="donate__intro">Every contribution goes toward the land, the hospital upgrade, and building the college. Choose whichever option works for you.</p>
    <div class="donate__options">
      <div class="donate__option">
        <h3>India</h3>
        <p>Donate via Razorpay — UPI, cards, netbanking.</p>
        <form>
          <script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_PLACEHOLDER_RAZORPAY_ID" async></script>
        </form>
      </div>
      <div class="donate__option">
        <h3>International / NRI</h3>
        <p>Donate via PayPal from anywhere in the world.</p>
        <form action="https://www.paypal.com/donate" method="post" target="_top">
          <input type="hidden" name="hosted_button_id" value="PLACEHOLDER_PAYPAL_BUTTON_ID" />
          <input class="btn btn-primary" type="submit" value="Donate with PayPal" />
        </form>
      </div>
    </div>
    <p class="donate__note">Kalarigram is a registered Trust. Payment IDs above are placeholders — replace with live Razorpay and PayPal button IDs before launch.</p>
  </div>
</section>
```

- [ ] **Step 4: Verify in browser**

Reload the dev server page.
Expected: clicking "Support the Land" in the Hero now smooth-scrolls to a dark navy Donate section with two side-by-side cards. The India card attempts to load the Razorpay button script (it will show nothing usable since `pl_PLACEHOLDER_RAZORPAY_ID` is not a real button ID — that's expected until Task 11's real-credential swap). The International/NRI card shows a working-looking "Donate with PayPal" button (it will error only if actually clicked, since the button ID is a placeholder — do not click submit during this check).

- [ ] **Step 5: Commit**

```bash
git add src/styles/donate.css src/styles/main.css index.html
git commit -m "Add donate section with Razorpay and PayPal placeholders"
```

---

## Task 7: Contact Section (Form + Formspree + Validation)

**Files:**
- Create: `src/styles/contact.css`
- Create: `src/js/contactForm.js`
- Modify: `src/styles/main.css`
- Modify: `src/main.js`
- Modify: `index.html` (replace `<!-- CONTACT -->` marker)

**Interfaces:**
- Consumes: `.container`, `.section`, `.section__title`, `.section__intro`, `.btn`, `.btn-primary` from `base.css`
- Produces: `#contact` section (anchor target for the future Nav's "Contact" link). `initContactForm()` — self-invoking on `DOMContentLoaded`, attaches a `submit` listener to `#contact-form` that reads `#contact-name`, `#contact-email`, `#contact-message` and shows/hides `#contact-form-error`. Contains one placeholder identifier replaced later: the Formspree endpoint in the form's `action` attribute (listed again in Task 11's launch checklist).

- [ ] **Step 1: Create `src/styles/contact.css`**

```css
.contact__form {
  max-width: 480px;
  margin: var(--space-4) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-row label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.form-row input,
.form-row textarea {
  font-family: var(--font-body);
  font-size: 14px;
  padding: 10px 12px;
  border: 1px solid rgba(58, 36, 24, 0.25);
  border-radius: 4px;
  background: #fff;
  color: var(--color-ink);
}

.form-row input:focus,
.form-row textarea:focus {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 1px;
}

.contact__error {
  color: #b91c1c;
  font-size: 13px;
}

.contact__meta {
  font-size: 14px;
  color: var(--color-text-muted);
}

.contact__meta a {
  color: var(--color-terracotta);
}
```

- [ ] **Step 2: Add the import to `src/styles/main.css`**

```css
@import './variables.css';
@import './base.css';
@import './hero.css';
@import './vision.css';
@import './progress.css';
@import './gallery.css';
@import './donate.css';
@import './contact.css';
```

- [ ] **Step 3: Replace the `<!-- CONTACT -->` marker in `index.html`**

```html
<section class="section contact" id="contact">
  <div class="container">
    <h2 class="section__title">Get Involved</h2>
    <p class="section__intro">Questions, partnership ideas, or want to volunteer? Send us a message.</p>
    <form id="contact-form" class="contact__form" action="https://formspree.io/f/PLACEHOLDER_FORM_ID" method="POST">
      <div class="form-row">
        <label for="contact-name">Name</label>
        <input type="text" id="contact-name" name="name" required />
      </div>
      <div class="form-row">
        <label for="contact-email">Email</label>
        <input type="email" id="contact-email" name="email" required />
      </div>
      <div class="form-row">
        <label for="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="4" required></textarea>
      </div>
      <p id="contact-form-error" class="contact__error" hidden></p>
      <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
    <div class="contact__meta">
      <p>Kalarigram &middot; Calicut, Kerala, India</p>
      <p><a href="https://www.kalarigram.org" target="_blank" rel="noopener">kalarigram.org</a></p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create `src/js/contactForm.js`**

```js
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const errorEl = document.getElementById('contact-form-error');
  if (!form || !errorEl) return;

  form.addEventListener('submit', (event) => {
    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      event.preventDefault();
      errorEl.textContent = 'Please fill in your name, email, and message.';
      errorEl.hidden = false;
      return;
    }

    if (!isValidEmail(email)) {
      event.preventDefault();
      errorEl.textContent = 'Please enter a valid email address.';
      errorEl.hidden = false;
      return;
    }

    errorEl.hidden = true;
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
```

- [ ] **Step 5: Add the import to `src/main.js`**

```js
import './styles/main.css';
import './js/progressBar.js';
import './js/contactForm.js';
```

- [ ] **Step 6: Verify in browser**

Reload the dev server page. Scroll to Contact.
Expected behaviors to check by hand:
1. Click "Send Message" with all fields empty → submission is blocked, red text "Please fill in your name, email, and message." appears, page does not navigate away.
2. Fill Name and Message, put `not-an-email` in Email, submit → blocked, red text "Please enter a valid email address." appears.
3. Fill all three fields with valid data, submit → the browser attempts to navigate to the Formspree placeholder URL (it will show a Formspree error page since the form ID is fake — that's expected until Task 11's real-credential swap; confirm the validation itself let the submission through by seeing the navigation attempt).

- [ ] **Step 7: Commit**

```bash
git add src/styles/contact.css src/styles/main.css src/js/contactForm.js src/main.js index.html
git commit -m "Add contact section with client-side validation and Formspree wiring"
```

---

## Task 8: Footer Section

**Files:**
- Create: `src/styles/footer.css`
- Create: `src/js/footer.js`
- Modify: `src/styles/main.css`
- Modify: `src/main.js`
- Modify: `index.html` (replace `<!-- FOOTER -->` marker)

**Interfaces:**
- Consumes: `.container` from `base.css`
- Produces: `initFooterYear()` — self-invoking on `DOMContentLoaded`, writes the current year into `#footer-year`.

- [ ] **Step 1: Create `src/styles/footer.css`**

```css
.footer {
  background: var(--color-ink);
  color: #d9cfc2;
  padding: var(--space-3) 0;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: 13px;
}

.footer__links a {
  color: #d9cfc2;
}
```

- [ ] **Step 2: Add the import to `src/styles/main.css`**

```css
@import './variables.css';
@import './base.css';
@import './hero.css';
@import './vision.css';
@import './progress.css';
@import './gallery.css';
@import './donate.css';
@import './contact.css';
@import './footer.css';
```

- [ ] **Step 3: Replace the `<!-- FOOTER -->` marker in `index.html`**

```html
<footer class="footer">
  <div class="container footer__inner">
    <p>&copy; <span id="footer-year"></span> Kalarigram Trust. All rights reserved.</p>
    <div class="footer__links">
      <a href="https://www.kalarigram.org" target="_blank" rel="noopener">kalarigram.org</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Create `src/js/footer.js`**

```js
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', initFooterYear);
```

- [ ] **Step 5: Add the import to `src/main.js`**

```js
import './styles/main.css';
import './js/progressBar.js';
import './js/contactForm.js';
import './js/footer.js';
```

- [ ] **Step 6: Verify in browser**

Reload the dev server page and scroll to the bottom.
Expected: a dark-ink footer with "© 2026 Kalarigram Trust. All rights reserved." (current year, computed live) on the left and a "kalarigram.org" link on the right, stacking vertically on narrow viewports.

- [ ] **Step 7: Commit**

```bash
git add src/styles/footer.css src/styles/main.css src/js/footer.js src/main.js index.html
git commit -m "Add footer section"
```

---

## Task 9: Nav Section (Sticky Header, Mobile Menu)

**Files:**
- Create: `src/styles/nav.css`
- Create: `src/js/nav.js`
- Modify: `src/styles/main.css`
- Modify: `src/main.js`
- Modify: `index.html` (replace `<!-- NAV -->` marker)

**Interfaces:**
- Consumes: `.container` from `base.css`; anchor targets `#hero`, `#vision`, `#progress`, `#gallery`, `#donate`, `#contact` produced by Tasks 2–8
- Produces: `initNav()` — self-invoking on `DOMContentLoaded`, toggles the `.is-open` class on `#nav-links` when `#nav-toggle` is clicked, and closes the menu when any nav link is clicked.

- [ ] **Step 1: Create `src/styles/nav.css`**

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-cream);
  border-bottom: 1px solid rgba(58, 36, 24, 0.1);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
}

.nav__brand {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--color-ink);
  text-decoration: none;
}

.nav__links {
  display: flex;
  gap: var(--space-3);
  list-style: none;
}

.nav__links a {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink);
  text-decoration: none;
}

.nav__links a:hover {
  color: var(--color-terracotta);
}

.nav__toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav__toggle span {
  width: 22px;
  height: 2px;
  background: var(--color-ink);
}

@media (max-width: 720px) {
  .nav__toggle {
    display: flex;
  }

  .nav__links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--color-cream);
    border-bottom: 1px solid rgba(58, 36, 24, 0.1);
    padding: var(--space-2) var(--space-3);
    display: none;
  }

  .nav__links.is-open {
    display: flex;
  }
}
```

- [ ] **Step 2: Add the import to `src/styles/main.css`** (add `nav.css` right after `base.css` so nav rules load before section-specific overrides)

```css
@import './variables.css';
@import './base.css';
@import './nav.css';
@import './hero.css';
@import './vision.css';
@import './progress.css';
@import './gallery.css';
@import './donate.css';
@import './contact.css';
@import './footer.css';
```

- [ ] **Step 3: Replace the `<!-- NAV -->` marker in `index.html`**

```html
<nav class="nav" id="nav">
  <div class="container nav__inner">
    <a href="#hero" class="nav__brand">Kalarigram Gurukulam</a>
    <button class="nav__toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav__links" id="nav-links">
      <li><a href="#vision">Vision</a></li>
      <li><a href="#progress">Progress</a></li>
      <li><a href="#gallery">Gallery</a></li>
      <li><a href="#donate">Donate</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>
```

- [ ] **Step 4: Create `src/js/nav.js`**

```js
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', initNav);
```

- [ ] **Step 5: Add the import to `src/main.js`**

```js
import './styles/main.css';
import './js/progressBar.js';
import './js/contactForm.js';
import './js/footer.js';
import './js/nav.js';
```

- [ ] **Step 6: Verify in browser**

Reload the dev server page.
Desktop width: confirm the nav bar sticks to the top of the viewport while scrolling, and clicking each of Vision/Progress/Gallery/Donate/Contact smooth-scrolls to the matching section.
Narrow the browser to under 720px width: confirm the link list disappears and a 3-line hamburger button appears; click it to confirm the menu drops open below the nav bar; click any link to confirm the menu closes and the page scrolls to that section.

- [ ] **Step 7: Commit**

```bash
git add src/styles/nav.css src/styles/main.css src/js/nav.js src/main.js index.html
git commit -m "Add sticky nav with mobile menu and anchor links"
```

---

## Task 10: Responsive & Accessibility QA Pass

**Files:**
- Modify: any of the CSS files from Tasks 1–9, as issues are found during this pass (exact files depend on what the checklist below turns up)

**Interfaces:**
- Consumes: the complete page assembled by Tasks 1–9
- Produces: no new interfaces — this task only fixes issues found while running the full manual QA checklist from spec §10

This task has no predetermined code changes — it is the manual QA checklist from the spec, executed end-to-end now that every section exists. Work through each item; if an item fails, fix it in the relevant CSS/JS file (following the same patterns established in Tasks 1–9) before moving to the next item.

- [ ] **Step 1: Cross-browser check**

Open the dev server page in Chrome, Firefox, and Safari (or Edge if Safari isn't available on this machine). Expected: layout, fonts, colors, and button styles look consistent across all three; no console errors in any of them.

- [ ] **Step 2: Responsive check at common breakpoints**

Using browser devtools' device toolbar, check the page at 375px (mobile), 768px (tablet), and 1440px (desktop) widths. Expected: no horizontal scrollbars at any width, the nav collapses to the hamburger menu below 720px, all grids (Vision, Progress, Gallery, Donate) reflow to fewer columns as width decreases, and text never overflows its container.

- [ ] **Step 3: Anchor-nav scroll behavior**

At desktop width, click through every nav link (Vision, Progress, Gallery, Donate, Contact) plus the Hero's two buttons. Expected: every link scrolls smoothly to the correct section with no dead links and no layout jump.

- [ ] **Step 4: Formspree test submission**

Fill out the Contact form with real (or realistic test) values and submit. If a real Formspree form ID has been configured, expected: Formspree's default "thank you" confirmation appears (or the page redirects per Formspree config) and a test email arrives at the connected Formspree account. If still using the placeholder ID from Task 7, expected: Formspree returns an error page confirming the request reached Formspree — record that this must be re-tested once Task 11's real endpoint is wired in.

- [ ] **Step 5: Razorpay/PayPal sandbox test**

If Razorpay test-mode credentials are available, swap the placeholder `data-payment_button_id` temporarily and confirm the Razorpay checkout modal opens correctly, then revert to the placeholder. Same for PayPal sandbox `hosted_button_id` if available. If no test credentials are available yet, note this as an open item for Task 11 and do not click the live placeholder buttons (they point at non-existent IDs).

- [ ] **Step 6: Lighthouse pass**

In Chrome devtools, run a Lighthouse audit (Performance, Accessibility, Best Practices) against the dev build (or `npm run build && npm run preview` for a production-accurate result). Pay particular attention to any color-contrast warnings on the terracotta-on-cream button text and the gold-on-navy Donate button text — adjust the specific CSS color value (not the overall palette) if a contrast failure is flagged, keeping the fix as close to the original Fusion palette as possible.

- [ ] **Step 7: Commit any fixes found during this pass**

```bash
git add -A
git commit -m "Fix issues found during responsive/accessibility QA pass"
```

If no issues were found, skip this commit — there's nothing to commit.

---

## Task 11: Deployment Setup & Launch Checklist

**Files:**
- Create: `netlify.toml`
- Create: `README.md`

**Interfaces:**
- Consumes: the complete site from Tasks 1–10
- Produces: nothing consumed by other tasks — this is the final task

- [ ] **Step 1: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 2: Create `README.md`**

```markdown
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
```

- [ ] **Step 3: Verify the production build**

Run: `npm run build`
Expected: a `dist/` directory is created containing `index.html` and hashed asset files, with no build errors printed.

Run: `npm run preview`
Open the printed local URL and click through the whole page once more.
Expected: identical behavior to the dev server — this confirms the production bundle works, not just the dev server.

- [ ] **Step 4: Commit**

```bash
git add netlify.toml README.md
git commit -m "Add deployment config, README, and pre-launch checklist"
```

---

## Self-Review Notes

- **Spec coverage:** §3 scope (single page, no CMS, placeholders, no domain yet, live donations) → Tasks 1–9 and 11. §4 visual direction → Task 1 (`variables.css`) and every section's CSS. §5 page structure/order → Tasks 2–9 build sections in exactly the approved wireframe order. §6 architecture (Vite, no backend, hosted payment buttons, Formspree, Vercel/Netlify) → Tasks 1, 6, 7, 11. §9 error handling (client-side form validation, mobile-first, obvious placeholders) → Tasks 5, 7. §10 testing → Task 10 runs the full checklist verbatim; every other task's "no automated test" verification step is called out explicitly in the Global Constraints section. §12 open items before launch → captured verbatim in Task 11's README table.
- **Placeholder scan:** no "TBD"/"implement later" steps exist; the only placeholder-style text in the plan is inside actual shipped source code (Razorpay/PayPal/Formspree IDs, fundraising numbers), which the spec explicitly requires to be clearly marked — each is tracked in Task 11's launch-checklist table so nothing gets lost.
- **Type/name consistency:** `#fundraise-bar-fill` / `#fundraise-raised-label` / `#fundraise-goal-label` (Task 4) match between the HTML and `progressBar.js`. `#contact-form` / `#contact-name` / `#contact-email` / `#contact-message` / `#contact-form-error` (Task 7) match between the HTML and `contactForm.js`. `#nav-toggle` / `#nav-links` (Task 9) match between the HTML and `nav.js`. `#footer-year` (Task 8) matches between the HTML and `footer.js`. CSS `@import` order in `main.css` is additive and consistent across every task's Step 2. `src/main.js` import list is additive and consistent across Tasks 4, 7, 8, 9.
- **Scope check:** single cohesive deliverable (one static site), no independent subsystems requiring separate plans.
