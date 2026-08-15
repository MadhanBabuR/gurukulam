function initGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery__tab');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.gallery__panel').forEach((panel) => {
        panel.hidden = panel.id !== tab.getAttribute('aria-controls');
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const imageEl = document.getElementById('lightbox-image');
  const videoEl = document.getElementById('lightbox-video');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn = lightbox?.querySelector('.lightbox__close');
  const prevBtn = lightbox?.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox?.querySelector('.lightbox__nav--next');
  if (!lightbox || !imageEl || !videoEl || !captionEl) return;

  let currentTiles = [];
  let currentIndex = -1;
  let lastFocused = null;

  function showTile(tile) {
    const type = tile.getAttribute('data-type');
    const src = tile.getAttribute('data-src');
    const caption = tile.getAttribute('data-caption') || '';

    if (type === 'video') {
      imageEl.hidden = true;
      imageEl.removeAttribute('src');
      videoEl.hidden = false;
      videoEl.src = src;
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
      videoEl.hidden = true;
      videoEl.removeAttribute('src');
      imageEl.hidden = false;
      imageEl.src = src;
      imageEl.alt = caption;
    }
    captionEl.textContent = caption;
  }

  function open(tile) {
    const panel = tile.closest('.gallery__panel');
    currentTiles = panel ? Array.from(panel.querySelectorAll('.gallery__tile')) : [tile];
    currentIndex = currentTiles.indexOf(tile);
    lastFocused = document.activeElement;

    showTile(tile);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    videoEl.pause();
    videoEl.removeAttribute('src');
    imageEl.removeAttribute('src');
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  }

  function step(delta) {
    if (!currentTiles.length) return;
    currentIndex = (currentIndex + delta + currentTiles.length) % currentTiles.length;
    showTile(currentTiles[currentIndex]);
  }

  document.querySelectorAll('.gallery__tile').forEach((tile) => {
    tile.addEventListener('click', () => open(tile));
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'Tab') {
      const focusable = [prevBtn, nextBtn, closeBtn].filter(Boolean);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGalleryTabs();
  initLightbox();
});
