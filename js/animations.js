/* ==========================================================================
   PAPIER STORIES CO. — MOTION
   One orchestrated hero entrance + restrained reveal-on-scroll.
   Every effect here checks prefers-reduced-motion first.
   ========================================================================== */

(function () {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---- reveal-on-scroll ---- */
  window.initReveals = function (elements) {
    if (!elements || !elements.length) return;

    // Respect reduced-motion preference
    if (reduceMotion) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // Fallback for browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    elements.forEach((el, i) => {
      el.style.setProperty("--i", i % 6);
      io.observe(el);
    });
  };

  /* ---- hero entrance ---- */
  const hero = document.querySelector(".hero");

  if (hero) {
    if (reduceMotion) {
      hero.classList.add("is-ready");
    } else {
      requestAnimationFrame(() => {
        hero.classList.add("is-ready");
      });
    }
  }


  /* ---- mask reveal (figures) ---- */
  const maskEls = document.querySelectorAll(".mask-reveal");

  if (
    !reduceMotion &&
    maskEls.length &&
    "IntersectionObserver" in window
  ) {
    const mio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            mio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    maskEls.forEach((el) => mio.observe(el));
  }

  /* ---- word-by-word reveal for "Every Detail Counts" ---- */
  document.querySelectorAll(".word-reveal").forEach((block) => {
    const text = block.textContent.trim();

    block.textContent = "";

    text.split(" ").forEach((word, i) => {
      const span = document.createElement("span");

      span.textContent = word + " ";
      span.style.setProperty("--w", i);

      block.appendChild(span);
    });

    if (reduceMotion) {
      block
        .querySelectorAll("span")
        .forEach((span) => span.classList.add("is-lit"));

      return;
    }

    if ("IntersectionObserver" in window) {
      const wio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target
                .querySelectorAll("span")
                .forEach((span) => span.classList.add("is-lit"));

              wio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      wio.observe(block);
    }
  });

  /* ---- desktop-only custom cursor tag over portfolio imagery ---- */
  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  const taggedZones = document.querySelectorAll("[data-cursor-tag]");

  if (!reduceMotion && canHover && taggedZones.length) {
    const tag = document.createElement("div");

    tag.className = "cursor-tag";
    tag.setAttribute("aria-hidden", "true");

    document.body.appendChild(tag);

    let active = null;

    document.addEventListener("mousemove", (e) => {
      tag.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;

      if (active) {
        tag.style.transform += " scale(1)";
      }
    });

    taggedZones.forEach((zone) => {
      zone.addEventListener("mouseenter", () => {
        tag.textContent = zone.dataset.cursorTag || "View";
        tag.classList.add("is-visible");
        active = zone;
      });

      zone.addEventListener("mouseleave", () => {
        tag.classList.remove("is-visible");
        active = null;
      });
    });
  }
})();