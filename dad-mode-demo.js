/* WoW Forge / Forge AFK — illustrative mini-preview.
 * Not a game integration. Messages shown here match the source addon descriptions.
 * No live WoW API, outbound requests, accounts, downloads, or tracking. */
(() => {
  "use strict";
  const root = document.getElementById("dadmode");
  if (!root) return;
  const choices = [...root.querySelectorAll("[data-dadmode-id]")];
  const reply = root.querySelector("#dadmode-reply");
  const group = root.querySelector("#dadmode-group");
  const back = root.querySelector("#dadmode-back");
  const title = root.querySelector("#dadmode-preview-title");
  const silentToggle = root.querySelector("#dadmode-silent");
  if (!choices.length || !reply || !group || !back || !title || !silentToggle) return;

  let active = choices.find(button => button.getAttribute("aria-pressed") === "true") || choices[0];
  const render = () => {
    choices.forEach(button => {
      button.setAttribute("aria-pressed", String(button === active));
    });
    const silent = silentToggle.getAttribute("aria-pressed") === "true";
    title.textContent = active.dataset.dadmodeLabel || "DAD MODE";
    reply.textContent = active.dataset.dadmodeReply || "";
    group.textContent = silent
      ? "Silent Mode active — group announcement skipped."
      : active.dataset.dadmodeGroup || "";
    back.textContent = silent
      ? "I'M BACK — quiet return (no group comeback)."
      : (active.dataset.dadmodeBack || "") + " Back after 06:42!";
    silentToggle.textContent = silent ? "SILENT MODE / ON" : "SILENT MODE / OFF";
  };
  choices.forEach(button => {
    button.addEventListener("click", () => {
      active = button;
      render();
    });
  });
  silentToggle.addEventListener("click", () => {
    const enabled = silentToggle.getAttribute("aria-pressed") !== "true";
    silentToggle.setAttribute("aria-pressed", String(enabled));
    render();
  });
  render();
})();
