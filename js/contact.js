(() => {
  const form = document.getElementById("rentora-enquiry");
  if (!form) return;

  // Handle URL params from property-detail page
  const urlParams = new URLSearchParams(window.location.search);
  const propertyParam = urlParams.get('property');
  const ownerParam = urlParams.get('owner');
  const actionParam = urlParams.get('action');
  const visitorParam = urlParams.get('visitor');
  const typeParam = urlParams.get('type');
  const dateParam = urlParams.get('date');

  const topicSelect = document.getElementById("topic");
  const messageArea = document.getElementById("message");
  const nameInput = document.getElementById("fullName");

  if (propertyParam) {
    if (topicSelect) {
      topicSelect.value = "Finding a rental property";
    }
    if (visitorParam && nameInput) {
      nameInput.value = visitorParam;
    }
    if (messageArea) {
      if (actionParam === 'scheduled') {
        messageArea.value = `Hello, I would like to confirm my guided visit for "${propertyParam}".\nMode: ${typeParam || 'In-Person Visit'}\nPreferred Date: ${dateParam || 'Flexible'}\nPlease share the gate entry pass details.`;
      } else {
        messageArea.value = `Hello ${ownerParam ? ownerParam : 'Owner'}, I am interested in renting "${propertyParam}". Please share further details regarding the availability and tenancy process.`;
      }
    }
  }

  const feedback = document.getElementById("form-feedback");
  const fields = [
    { input: document.getElementById("fullName"), message: "Please enter your name." },
    { input: document.getElementById("email"), message: "Enter a valid email address.", validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
    { input: document.getElementById("topic"), message: "Please choose an enquiry topic." },
    { input: document.getElementById("message"), message: "Please add a short message." }
  ];

  function validateField(field) {
    if (!field.input) return true;
    const wrapper = field.input.closest(".form-field");
    if (!wrapper) return true;
    const error = wrapper.querySelector(".field-error");
    const value = field.input.value.trim();
    const valid = value !== "" && (!field.validate || field.validate(value));
    wrapper.classList.toggle("invalid", !valid);
    if (error) error.textContent = valid ? "" : field.message;
    return valid;
  }

  fields.forEach(field => {
    if (!field.input) return;
    field.input.addEventListener("blur", () => validateField(field));
    field.input.addEventListener("input", () => {
      const wrapper = field.input.closest(".form-field");
      if (wrapper && wrapper.classList.contains("invalid")) validateField(field);
    });
    field.input.addEventListener("change", () => {
      const wrapper = field.input.closest(".form-field");
      if (wrapper && wrapper.classList.contains("invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    feedback.className = "form-feedback";
    feedback.innerHTML = "";

    const validFields = fields.map(validateField).every(Boolean);
    const consent = document.getElementById("consent");
    
    if (!validFields || (consent && !consent.checked)) {
      feedback.className = "form-feedback error";
      const errorMsg = (!consent || !consent.checked)
        ? "Please acknowledge and accept the privacy notice before submitting."
        : "Please verify the highlighted fields above and try again.";
      
      feedback.innerHTML = `
        <div class="feedback-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="feedback-text">
          <strong>Validation Incomplete</strong>
          <div>${errorMsg}</div>
        </div>
      `;
      
      if (!validFields) {
        const firstInvalid = form.querySelector(".form-field.invalid input, .form-field.invalid select, .form-field.invalid textarea");
        if (firstInvalid) firstInvalid.focus();
      } else if (consent) {
        consent.focus();
      }
      return;
    }

    // Success generation with reference ticket ID
    const name = (document.getElementById("fullName")?.value || "there").trim();
    const ticketId = "ENQ-" + Math.floor(100000 + Math.random() * 900000);
    
    feedback.className = "form-feedback success";
    feedback.innerHTML = `
      <div class="feedback-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div class="feedback-text">
        <strong>Thank you, ${name}! Your enquiry has been sent.</strong>
        <div>Your enquiry has been routed directly to our concierge team. Our property advisor will reach out to you within 15 minutes.</div>
        <div class="feedback-ticket">Reference Ticket: ${ticketId}</div>
      </div>
    `;

    // Smooth scroll down to feedback if needed
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Reset fields cleanly
    form.reset();
    form.querySelectorAll(".form-field.invalid").forEach(node => node.classList.remove("invalid"));
    form.querySelectorAll(".field-error").forEach(node => node.textContent = "");
  });
})();
