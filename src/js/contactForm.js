function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const errorEl = document.getElementById('contact-form-error');
  const successEl = document.getElementById('contact-form-success');
  const submitBtn = form?.querySelector('button[type="submit"]');
  if (!form || !errorEl || !successEl || !submitBtn) return;

  form.addEventListener('submit', async (event) => {
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
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Formspree submission failed');

      form.querySelectorAll('.form-row, button[type="submit"], .contact__form-note').forEach((el) => {
        el.hidden = true;
      });
      successEl.hidden = false;
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'form_submit_success', { form_name: 'contact' });
      }
    } catch (err) {
      errorEl.textContent = 'Something went wrong sending your message. Please try again, or email us directly at info@gvsgurukulam.com.';
      errorEl.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
