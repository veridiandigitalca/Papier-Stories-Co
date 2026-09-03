/* ==========================================================================
   PAPIER STORIES CO. — CONTACT FORM
   Three logical groups (About You / Your Celebration / Your Vision),
   inline validation, and a configurable submission layer.
   The endpoint lives in js/config.js (formConfig.endpoint) — until it is
   set, the form still validates fully but shows a clear setup notice
   instead of silently pretending to send.
   ========================================================================== */

(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const steps = Array.from(form.querySelectorAll("[data-step]"));
  const metaSteps = Array.from(document.querySelectorAll(".form-steps__meta span"));
  const nextBtns = form.querySelectorAll("[data-step-next]");
  const prevBtns = form.querySelectorAll("[data-step-prev]");
  const statusBox = document.getElementById("formStatus");
  let current = 0;

  function showStep(i) {
    steps.forEach((s, idx) => s.toggleAttribute("hidden", idx !== i));
    metaSteps.forEach((m, idx) => m.classList.toggle("is-active", idx === i));
    const first = steps[i].querySelector("input, select, textarea");
    if (first) first.focus({ preventScroll: false });
    // steps[i].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep(i) {
    const fields = steps[i].querySelectorAll("input[required], select[required], textarea[required]");
    let valid = true;
    fields.forEach((field) => {
      const wrap = field.closest(".field");
      const ok = field.checkValidity();
      if (wrap) wrap.classList.toggle("has-error", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      const firstInvalid = steps[i].querySelector(".field.has-error input, .field.has-error select, .field.has-error textarea");
      if (firstInvalid) firstInvalid.focus();
    }
    return valid;
  }

  nextBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (!validateStep(current)) return;
      current = Math.min(current + 1, steps.length - 1);
      showStep(current);
    })
  );
  prevBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      current = Math.max(current - 1, 0);
      showStep(current);
    })
  );

  // clear error state as the person fixes a field
  form.addEventListener("input", (e) => {
    const wrap = e.target.closest(".field");
    if (wrap && e.target.checkValidity()) wrap.classList.remove("has-error");
  });

  if (steps.length) showStep(0);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateStep(current)) return;

    const endpoint = typeof formConfig !== "undefined" ? formConfig.endpoint : "";
    const submitBtn = form.querySelector('[type="submit"]');
    const data = Object.fromEntries(new FormData(form).entries());

    statusBox.className = "form-status is-visible";
    statusBox.textContent = "Sending your message…";

    if (!endpoint) {
      // No backend configured yet — tell the site owner plainly, and keep
      // the visitor's details visible so nothing is lost.
      statusBox.className = "form-status is-visible";
      statusBox.innerHTML =
        "This form isn't connected to an inbox yet. Add a submission endpoint in <code>js/config.js</code> (see the README), or reach us directly at " +
        `<a class="text-link" href="mailto:${formConfig ? formConfig.destinationEmail : "info@papierstories.ca"}">${formConfig ? formConfig.destinationEmail : "info@papierstories.ca"}</a>.`;
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      statusBox.className = "form-status is-visible is-success";
      statusBox.textContent = "Thank you — your message has been sent. We'll be in touch soon.";
      form.reset();
      current = 0;
      showStep(0);
    } catch (err) {
      statusBox.className = "form-status is-visible";
      statusBox.innerHTML =
        `Something went wrong sending this. Please email us directly at <a class="text-link" href="mailto:${formConfig.destinationEmail}">${formConfig.destinationEmail}</a>.`;
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
})();
