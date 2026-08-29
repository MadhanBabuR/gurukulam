const INTEREST_WHATSAPP_NUMBER = '918637632916';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initInterestForm() {
  const form = document.getElementById('interest-form');
  const errorEl = document.getElementById('interest-form-error');
  if (!form || !errorEl) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameEl = form.querySelector('#interest-name');
    const emailEl = form.querySelector('#interest-email');
    const phoneEl = form.querySelector('#interest-phone');
    const messageEl = form.querySelector('#interest-message');
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const phone = phoneEl.value.trim();
    const message = messageEl.value.trim();

    if (!name || !email) {
      errorEl.textContent = 'Please fill in your name and email.';
      errorEl.hidden = false;
      if (!name) {
        nameEl.focus();
      } else {
        emailEl.focus();
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

    const lines = [`Name: ${name}`, `Email: ${email}`];
    if (phone) lines.push(`Phone: ${phone}`);
    if (message) lines.push(`Message: ${message}`);

    const text = lines.join('\n');
    const url = `https://wa.me/${INTEREST_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  });
}

document.addEventListener('DOMContentLoaded', initInterestForm);
