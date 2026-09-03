/* ==========================================================================
   PAPIER STORIES CO. — NAVIGATION
   Header scroll state + hide-on-scroll-down, and the full-screen
   editorial mobile menu.
   ========================================================================== */

(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (!header) return;

  /* ---- scrolled / hide-on-scroll header state ---- */
  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);

    // Only hide-on-scroll-down once we're past the hero, and never while
    // the mobile menu is open.
    const menuOpen = mobileMenu && mobileMenu.classList.contains("is-open");
    if (!menuOpen) {
      if (y > lastY && y > header.offsetHeight * 2) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---- full-screen mobile menu ---- */
  if (toggle && mobileMenu) {
    const focusableSelector = "a[href], button:not([disabled])";

    function openMenu() {
      mobileMenu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      const first = mobileMenu.querySelector(focusableSelector);
      if (first) first.focus({ preventScroll: true });
    }

    function closeMenu() {
      mobileMenu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      toggle.focus({ preventScroll: true });
    }

    toggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", closeMenu)
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        closeMenu();
      }
      // basic focus trap
      if (e.key === "Tab" && mobileMenu.classList.contains("is-open")) {
        const focusables = Array.from(
          mobileMenu.querySelectorAll(focusableSelector)
        );
        if (!focusables.length) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    });
  }

  /* ---- mark current page in nav ---- */
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-nav a, .mobile-menu__list a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href.split("/").pop() === current) {
      a.setAttribute("aria-current", "page");
    }
  });
})();
