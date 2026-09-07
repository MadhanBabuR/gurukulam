// Custom event tracking on top of GA4's Enhanced Measurement (which already
// covers generic scroll depth and outbound-domain clicks like WhatsApp/Milaap
// links). This file adds the two things Enhanced Measurement can't give us:
// 1) which NAMED section of the page people actually see, and
// 2) tel: link clicks (not covered by outbound-click tracking).

const TRACKED_SECTIONS = [
  ['#hero', 'hero'],
  ['#story', 'story'],
  ['#vision', 'vision'],
  ['#progress', 'progress'],
  ['#gallery', 'gallery'],
  ['#donate', 'donate'],
  ['#contact', 'contact'],
  ['#origin', 'lineage_origin'],
  ['#sami-gurukkal', 'lineage_sami_gurukkal'],
  ['#streams', 'lineage_streams'],
  ['#today', 'lineage_today'],
  ['#auroville', 'lineage_auroville'],
  ['#building', 'lineage_building'],
  ['.programme-hero', 'programme_hero'],
  ['.programme-legal', 'programme_legal'],
  ['.programme-stages', 'programme_stages'],
  ['.programme-streams', 'programme_streams'],
  ['.programme-practice', 'programme_practice'],
  ['#interest', 'programme_interest'],
];

function initSectionTracking() {
  if (typeof window.gtag !== 'function' || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        window.gtag('event', 'section_view', { section_name: entry.target.dataset.trackLabel });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  TRACKED_SECTIONS.forEach(([selector, label]) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.dataset.trackLabel = label;
    observer.observe(el);
  });
}

function initCallLinkTracking() {
  if (typeof window.gtag !== 'function') return;

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener('click', () => {
      window.gtag('event', 'call_click', { phone: link.getAttribute('href').replace('tel:', '') });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSectionTracking();
  initCallLinkTracking();
});
