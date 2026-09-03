/* ==========================================================================
   PAPIER STORIES CO. — TESTIMONIALS CAROUSEL
   Renders slides from the testimonials array in config.js.
   Touch/swipe, keyboard arrows, autoplay (paused on hover/focus/reduced
   motion), and dot navigation.
   ========================================================================== */

(function () {
  const root = document.querySelector(".testimonial-carousel");
  if (!root || typeof testimonials === "undefined" || !testimonials.length) return;

  const track = root.querySelector(".testimonial-slides");
  const dotsWrap = root.querySelector(".testimonial-dots");
  const prevBtn = root.querySelector(".testimonial-prev");
  const nextBtn = root.querySelector(".testimonial-next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  track.innerHTML = testimonials
    .map(
      (t) => `
      <div class="testimonial-slide" role="group" aria-roledescription="slide">
        <blockquote>&ldquo;${t.quote}&rdquo;</blockquote>
        <cite>${t.couple} &nbsp;&middot;&nbsp; ${t.date}</cite>
      </div>`
    )
    .join("");

  dotsWrap.innerHTML = testimonials
    .map((_, i) => `<button type="button" aria-label="Go to testimonial ${i + 1}" aria-current="${i === 0}"></button>`)
    .join("");

  let index = 0;
  let timer = null;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll("button").forEach((d, i) => d.setAttribute("aria-current", String(i === index)));
  }

  function goTo(i) {
    index = (i + testimonials.length) % testimonials.length;
    update();
  }

  function autoplay() {
    if (reduceMotion) return;
    stop();
    timer = setInterval(() => goTo(index + 1), 6500);
  }
  function stop() {
    if (timer) clearInterval(timer);
  }

  prevBtn.addEventListener("click", () => { goTo(index - 1); autoplay(); });
  nextBtn.addEventListener("click", () => { goTo(index + 1); autoplay(); });
  dotsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    goTo(Array.from(dotsWrap.children).indexOf(btn));
    autoplay();
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", autoplay);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", autoplay);

  // swipe
  let startX = null;
  track.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
  track.addEventListener(
    "touchend",
    (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) goTo(dx > 0 ? index - 1 : index + 1);
      startX = null;
      autoplay();
    },
    { passive: true }
  );

  root.setAttribute("role", "region");
  root.setAttribute("aria-label", "Couple testimonials");
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft") goTo(index - 1);
  });

  update();
  autoplay();
})();
