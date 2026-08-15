const CONTACT_WHATSAPP_NUMBER = '918637632916';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const errorEl = document.getElementById('contact-form-error');
  if (!form || !errorEl) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameEl = form.querySelector('#contact-name');
    const emailEl = form.querySelector('#contact-email');
    const messageEl = form.querySelector('#contact-message');
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    if (!name || !email || !message) {
      errorEl.textContent = 'Please fill in your name, email, and message.';
      errorEl.hidden = false;
      if (!name) {
        nameEl.focus();
      } else if (!email) {
        emailEl.focus();
      } else {
        messageEl.focus();
      }
      return;
    }

    if (!isValidEmail(email)) {
      errorEl.textContent = 'Please enter a valid email address.';
      errorEl.hidden = false;
      emailEl.focus();
      return;
    }

    errorEl.hidden = true;

    const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const url = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
