/* WoW Forge — tiny progressive enhancement.
   Navigation and all content remain usable without JavaScript. */
(() => {
  "use strict";
  const button = document.querySelector(".menu-toggle");
  const menu = document.getElementById("navigation");
  if (button && menu) {
    const close = () => {
      menu.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation");
    };
    button.addEventListener("click", () => {
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    menu.addEventListener("click", event => {
      if (event.target.closest('a[href^="#"]')) close();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        const wasOpen = menu.classList.contains("open");
        close();
        if (wasOpen) button.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 880) close();
    }, {passive: true});
  }
  // The forest unveils itself as visitors travel down the page. Decorative only:
  // content stays visible if IntersectionObserver is unavailable or motion is reduced.
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (!reducedMotion && "IntersectionObserver" in window) {
    const reveals = [...document.querySelectorAll(
      ".section-heading, .spotlight-heading, .registry-item, .realm-marker, .feature, .rail-step, .outro"
    )];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    }, {rootMargin: "0px 0px -35px 0px", threshold: 0.01});
    for (const el of reveals) {
      el.setAttribute("data-forest-reveal", "");
      observer.observe(el);
    }
    document.body.classList.add("forest-ready");
  }
    const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
