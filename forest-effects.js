/* Forest Frontier 2.0 — optional decorative scroll reveal.
   The actual realm switcher and navigation live in the pre-existing site.js.
   No content is hidden without IntersectionObserver and motion preference checks. */
(() => {
  "use strict";
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  const sections = [...document.querySelectorAll(
    ".section-heading, .spotlight-heading, .registry-item, .realm-marker, .feature, .rail-step, .outro"
  )];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    }
  }, {threshold:0.01,rootMargin:"0px 0px -35px 0px"});
  for (const item of sections) {
    item.setAttribute("data-forest-reveal", "");
    observer.observe(item);
  }
  document.body.classList.add("forest-ready");
})();
