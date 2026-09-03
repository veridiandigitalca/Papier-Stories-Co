/* ==========================================================================
   PAPIER STORIES CO. — PORTFOLIO
   Renders the masonry grid (and the homepage's smaller "Featured Work"
   strip) from portfolioItems in config.js, wires up category filters,
   and runs a keyboard-accessible lightbox.
   ========================================================================== */

(function () {
  if (typeof portfolioItems === "undefined") return;

  function cardMarkup(item, index) {
    return `
      <figure class="masonry__item" data-category="${item.category}" data-index="${index}"
              tabindex="0" role="button"
              aria-label="View ${item.title}, ${item.category}"
              data-cursor-tag="View story">
        <img src="${item.image}" alt="${item.title} — ${item.category}" loading="lazy" width="1000" height="1300">
        <figcaption class="masonry__caption">
          <span class="label">${item.category}</span>
          <span class="title">${item.title}</span>
        </figcaption>
      </figure>`;
  }

  function renderGrid(container, items) {
    container.innerHTML = items.map((item, i) => cardMarkup(item, i)).join("");
  }

  /* ---- full portfolio page: grid + filters ---- */
  const fullGrid = document.getElementById("portfolioGrid");
  if (fullGrid) {
    renderGrid(fullGrid, portfolioItems);

    const filterBar = document.getElementById("portfolioFilters");
    if (filterBar) {
      const categories = ["All", ...new Set(portfolioItems.map((i) => i.category))];
      filterBar.innerHTML = categories
        .map(
          (cat, i) =>
            `<button type="button" aria-pressed="${i === 0}" data-filter="${cat}">${cat}</button>`
        )
        .join("");

      filterBar.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-filter]");
        if (!btn) return;
        filterBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        const filter = btn.dataset.filter;
        fullGrid.querySelectorAll(".masonry__item").forEach((item) => {
          const show = filter === "All" || item.dataset.category === filter;
          item.classList.toggle("is-hidden", !show);
        });
      });
    }
    initLightbox(fullGrid, portfolioItems);
  }

  /* ---- homepage featured strip (first 6 items, no filters) ---- */
  const featuredGrid = document.getElementById("featuredWorkGrid");
  if (featuredGrid) {
    const featured = portfolioItems.slice(0, 6);
    renderGrid(featuredGrid, featured);
    initLightbox(featuredGrid, featured);
  }

  /* ---- lightbox ---- */
  function initLightbox(grid, items) {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    const imgEl = lightbox.querySelector(".lightbox__frame img");
    const labelEl = lightbox.querySelector(".lightbox__meta .label");
    const titleEl = lightbox.querySelector(".lightbox__meta .lb-title");
    let visibleItems = items;
    let current = 0;
    let lastFocused = null;

    function refreshVisible() {
      const cards = Array.from(grid.querySelectorAll(".masonry__item:not(.is-hidden)"));
      visibleItems = cards.map((c) => items[Number(c.dataset.index)]);
      return cards;
    }

    function open(index) {
      lastFocused = document.activeElement;
      refreshVisible();
      current = index;
      show();
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      lightbox.querySelector(".lightbox__close").focus();
    }

    function show() {
      const item = visibleItems[current];
      if (!item) return;
      imgEl.src = item.image;
      imgEl.alt = `${item.title} — ${item.category}`;
      labelEl.textContent = item.category;
      titleEl.textContent = item.title;
    }

    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    function next() {
      current = (current + 1) % visibleItems.length;
      show();
    }
    function prev() {
      current = (current - 1 + visibleItems.length) % visibleItems.length;
      show();
    }

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".masonry__item");
      if (!card || card.classList.contains("is-hidden")) return;
      const cards = refreshVisible();
      const visIndex = Array.from(grid.querySelectorAll(".masonry__item:not(.is-hidden)")).indexOf(card);
      open(visIndex);
    });
    grid.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("masonry__item")) {
        e.preventDefault();
        e.target.click();
      }
    });

    lightbox.querySelector(".lightbox__close").addEventListener("click", close);
    lightbox.querySelector(".lightbox__next").addEventListener("click", next);
    lightbox.querySelector(".lightbox__prev").addEventListener("click", prev);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });
  }
})();
