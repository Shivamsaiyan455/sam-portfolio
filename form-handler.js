// js/form-handler.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const messageBox = document.getElementById("formMessage");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // ⛔ stop redirect

    // Disable button while sending
    submitBtn.disabled = true;
    const span = submitBtn.querySelector("span");
    if (span) span.textContent = "Sending...";
    messageBox.textContent = "";
    messageBox.className = "";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        messageBox.textContent = "✅ Thank you! Your message has been sent.";
        messageBox.className = "success";
      } else {
        messageBox.textContent = "❌ Oops! Something went wrong.";
        messageBox.className = "error";
      }
    } catch (error) {
      messageBox.textContent = "⚠️ Network error. Please try again.";
      messageBox.className = "error";
    } finally {
      submitBtn.disabled = false;
      if (span) span.textContent = "Send Message";
    }
  });
});
