/* WoW Forge — progressive enhancement for the standalone fantasy realm.
   Content and navigation remain functional without JavaScript. */
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

  const hero = document.querySelector(".hero");
  if (hero) {
    const choices = document.createElement("div");
    choices.className = "realm-choice";
    choices.setAttribute("role", "group");
    choices.setAttribute("aria-label", "Choose a fantasy landscape");
    const landscapes = [
      {id:"forest", name:"Emerald Forest"},
      {id:"durotar", name:"Ember Frontier"}
    ];
    const setRealm = realm => {
      document.body.classList.toggle("realm-durotar", realm === "durotar");
      choices.querySelectorAll("button").forEach(el => {
        el.setAttribute("aria-pressed", String(el.dataset.realm === realm));
      });
    };
    landscapes.forEach(({id,name}) => {
      const control = document.createElement("button");
      control.type = "button";
      control.dataset.realm = id;
      control.textContent = name;
      control.setAttribute("aria-pressed", String(id === "forest"));
      control.addEventListener("click", () => setRealm(id));
      choices.appendChild(control);
    });
    hero.appendChild(choices);
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
