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
