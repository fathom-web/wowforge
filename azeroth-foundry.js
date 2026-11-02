/* Azeroth Foundry 2.0: functional faction atmosphere, no tracking or external dependencies. */
(() => {
  "use strict";
  const body = document.body;
  const buttons = Array.from(document.querySelectorAll("[data-faction]"));
  const note = document.getElementById("wf-faction-note");
  const motion = document.getElementById("wf-motion-toggle");
  const scenes = document.querySelectorAll(".wf-realm-card[data-realm-select]");
  const descriptions = {
    crossroads: "<strong>The Crossroads</strong> — two banners, one forge. Welcome, adventurer.",
    elwynn: "<strong>Elwynn Forest</strong> — sunlight, oakwood and the old road to adventure.",
    durotar: "<strong>Durotar</strong> — red earth, embers and legends tempered in fire."
  };
  const store = (key, value) => { try { localStorage.setItem(key,value); } catch {} };
  const load = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const select = faction => {
    if (!Object.prototype.hasOwnProperty.call(descriptions, faction)) faction = "crossroads";
    body.classList.remove("realm-crossroads","realm-elwynn","realm-durotar");
    body.classList.add("realm-" + faction);
    buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.faction === faction)));
    scenes.forEach(scene => scene.setAttribute("aria-current",String(scene.dataset.realmSelect === faction)));
    if (note) note.innerHTML = descriptions[faction];
    store("wowforge-realm-v2", faction);
  };
  buttons.forEach(button => button.addEventListener("click",()=>select(button.dataset.faction)));
  scenes.forEach(scene => scene.addEventListener("click",event => {
    event.preventDefault();
    select(scene.dataset.realmSelect);
    document.querySelector(".wf-faction-switch")?.scrollIntoView({block:"center",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant":"smooth"});
  }));
  select(load("wowforge-realm-v2") || "crossroads");
  const savedMotion = load("wowforge-ambient-v2");
  const reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  let motionOff = savedMotion === "off" || (savedMotion === null && reduce);
  const setMotion = off => {
    motionOff = off;
    body.classList.toggle("wf-motion-off",off);
    if (motion){ motion.setAttribute("aria-pressed",String(off)); motion.textContent = off ? "✦ Enable ambient motion" : "✦ Pause ambient motion"; }
    store("wowforge-ambient-v2",off?"off":"on");
  };
  motion?.addEventListener("click",()=>setMotion(!motionOff));
  setMotion(motionOff);
})();
