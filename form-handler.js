document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const messageBox = document.getElementById('formMessage');

  if (!form || !submitBtn) return;

  form.reset();

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    submitBtn.disabled = true;
    const span = submitBtn.querySelector('span');
    if (span) span.textContent = 'Sending...';

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        if (messageBox) {
          messageBox.textContent = '✅ Thank you! Your message has been sent.';
        } else {
          alert('Thank you! Your message has been sent.');
        }
      } else {
        response.json().then(data => {
          const errorMsg = data.error || 'Oops! There was a problem submitting your form.';
          alert(errorMsg);
        }).catch(() => {
          alert('Oops! There was a problem submitting your form.');
        });
      }
    })
    .catch(() => {
      alert('Oops! There was a problem submitting your form.');
    })
    .finally(() => {
      submitBtn.disabled = false;
      if (span) span.textContent = 'Send Message';
    });
  });
});
