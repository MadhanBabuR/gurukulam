const SLIDE_DURATION_MS = 6000;
const DRAG_THRESHOLD_PX = 40;

function initHeroCarousel() {
  const hero = document.getElementById('hero');
  const slides = document.querySelectorAll('.hero__slide');
  const prevBtn = document.querySelector('.hero__arrow--prev');
  const nextBtn = document.querySelector('.hero__arrow--next');
  const dots = document.querySelectorAll('.hero__dot');
  if (!hero || slides.length < 2) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = Array.from(slides).findIndex((slide) => slide.classList.contains('is-active'));
  if (index < 0) index = 0;
  let timerId = null;

  function showSlide(newIndex) {
    slides[index].classList.remove('is-active');
    dots[index]?.classList.remove('is-active');
    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add('is-active');
    dots[index]?.classList.add('is-active');
  }

  function goToNext() {
    showSlide(index + 1);
  }

  function goToPrev() {
    showSlide(index - 1);
  }

  function start() {
    if (reduceMotion || timerId) return;
    timerId = window.setInterval(goToNext, SLIDE_DURATION_MS);
  }

  function stop() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function restart() {
    stop();
    start();
  }

  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', start);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToPrev();
      restart();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToNext();
      restart();
    });
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      showSlide(dotIndex);
      restart();
    });
  });

  // Mouse drag / touch swipe support (Pointer Events cover both).
  let dragStartX = null;
  let dragging = false;

  hero.addEventListener('pointerdown', (event) => {
    dragStartX = event.clientX;
    dragging = true;
    hero.classList.add('is-dragging');
  });

  window.addEventListener('pointerup', (event) => {
    if (!dragging || dragStartX === null) return;
    const delta = event.clientX - dragStartX;
    dragging = false;
    dragStartX = null;
    hero.classList.remove('is-dragging');

    if (delta > DRAG_THRESHOLD_PX) {
      goToPrev();
      restart();
    } else if (delta < -DRAG_THRESHOLD_PX) {
      goToNext();
      restart();
    }
  });

  hero.addEventListener('pointercancel', () => {
    dragging = false;
    dragStartX = null;
    hero.classList.remove('is-dragging');
  });

  start();
}

document.addEventListener('DOMContentLoaded', initHeroCarousel);
