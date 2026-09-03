/* ==========================================================================
   PAPIER STORIES CO. — MAIN
   Site-wide bootstrapping: fills in config-driven text/links, renders the
   services explorer and Instagram grid, and small page utilities.
   ========================================================================== */

(function () {
  /* ---- inject siteConfig into any [data-config] element ---- */
  if (typeof siteConfig !== "undefined") {
    document.querySelectorAll("[data-config]").forEach((el) => {
      const key = el.dataset.config;
      if (siteConfig[key] === undefined) return;
      if (el.tagName === "A" && el.dataset.configHref) {
        el.setAttribute("href", siteConfig[el.dataset.configHref]);
      }
      el.textContent = siteConfig[key];
    });
    document.querySelectorAll("[data-config-href]").forEach((el) => {
      const key = el.dataset.configHref;
      if (siteConfig[key]) el.setAttribute("href", siteConfig[key]);
    });
  }

  /* ---- footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- services explorer (homepage + services page) ---- */
  const explorer = document.querySelector(".services-explorer");
  if (explorer && typeof servicesData !== "undefined") {
    const list = explorer.querySelector(".services-list");
    const visual = explorer.querySelector(".services-visual");

    list.innerHTML = servicesData
  .map(
    (s, i) => `
      <div class="service-row ${i === 0 ? "is-active" : ""}" tabindex="0" role="button"
          aria-expanded="${i === 0}" data-index="${i}" data-reveal>
          <span class="service-row__index">0${i + 1}</span>
          <span class="service-row__title">${s.title}</span>
          <span class="service-row__arrow" aria-hidden="true">&#8594;</span>
          <p class="service-row__desc">${s.short} <a class="text-link" href="${s.link}">Learn more</a></p>
          <div class="service-row__thumb"><img src="${s.image}" alt="${s.title}" loading="lazy"></div>
        </div>`
      )
      .join("");
      if (typeof window.initReveals === "function") {
  window.initReveals(list.querySelectorAll("[data-reveal]"));
}

    if (visual) {

      visual.innerHTML = servicesData
        .map((s, i) => `<img src="${s.image}" alt="${s.title}" class="${i === 0 ? "is-active" : ""}">`)
        .join("");
    }

    function activate(index) {
      list.querySelectorAll(".service-row").forEach((row, i) => {
        const active = i === index;
        row.classList.toggle("is-active", active);
        row.setAttribute("aria-expanded", String(active));
      });
      if (visual) {
        visual.querySelectorAll("img").forEach((img, i) => img.classList.toggle("is-active", i === index));
      }
    }

    list.addEventListener("click", (e) => {
      const row = e.target.closest(".service-row");
      if (!row || e.target.tagName === "A") return;
      activate(Number(row.dataset.index));
    });
    list.addEventListener("keydown", (e) => {
      const row = e.target.closest(".service-row");
      if (!row) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate(Number(row.dataset.index));
      }
    });
    // reveal on hover for desktop pointer users, without stealing keyboard focus state
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      list.querySelectorAll(".service-row").forEach((row) => {
        row.addEventListener("mouseenter", () => activate(Number(row.dataset.index)));
      });
    }
  }

  /* ---- Instagram fallback grid ---- */
  const igGrid = document.querySelector(".instagram-grid");
  if (igGrid && typeof instagramImages !== "undefined" && typeof siteConfig !== "undefined") {
    igGrid.innerHTML = instagramImages
      .map(
        (src) => `
        <a href="${siteConfig.instagramUrl}" target="_blank" rel="noopener">
          <img src="${src}" alt="Papier Stories on Instagram" loading="lazy">
        </a>`
      )
      .join("");
  }
})();
