/* Rail docking, gradient cross-fade, scroll reveals, education timeline,
   theme toggle. Nothing here needs configuring. */

(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- 1. Clone the profile card into the rail ------------------------- */
  var body = document.getElementById("profileBody");
  var slot = document.getElementById("railSlot");
  if (body && slot) slot.appendChild(body.cloneNode(true));

  /* --- 2. Dock the rail once the hero has scrolled away ---------------- */
  var hero = document.querySelector(".about-intro");
  var rail = document.getElementById("rail");
  if (hero && rail && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      rail.classList.toggle("is-docked", !entries[0].isIntersecting);
    }, { rootMargin: "-45% 0px 0px 0px" }).observe(hero);
  }

  /* --- 3. Cross-fade the background per section ------------------------ */
  var layers = document.querySelectorAll(".bg-layer");
  var sections = document.querySelectorAll("[data-bg]");
  if (sections.length && "IntersectionObserver" in window) {
    var bgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var want = e.target.getAttribute("data-bg");
        layers.forEach(function (l) {
          l.classList.toggle("is-on", l.getAttribute("data-layer") === want);
        });
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    sections.forEach(function (s) { bgObserver.observe(s); });
  }

  /* --- 4. Reveal on scroll -------------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if (!reduced && "IntersectionObserver" in window) {
    var revObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = (i * 0.07) + "s";
        e.target.classList.add("is-in");
        revObserver.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    reveals.forEach(function (el) { revObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* --- 5. Education timeline ------------------------------------------ */
  var tl = document.getElementById("timeline");
  var panels = document.getElementById("eduPanels");
  if (tl && panels) {
    tl.addEventListener("click", function (ev) {
      var btn = ev.target.closest(".tl-item");
      if (!btn) return;
      var i = btn.getAttribute("data-i");
      tl.querySelectorAll(".tl-item").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      panels.querySelectorAll(".edu-panel").forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-panel") === i);
      });
    });
  }

  /* --- 6. Theme toggle ------------------------------------------------- */
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
    });
  }
})();
