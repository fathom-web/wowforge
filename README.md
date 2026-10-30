# WoW Forge — NOVYX FORGE

**Website:** https://wow.novyxforge.com/  
**GitHub repository:** https://github.com/fathom-web/wowforge  
**Purpose:** Standalone showcase for original World of Warcraft addon projects, with LifeForge first.

**Design boundary:** The Warcraft-inspired fantasy panorama and website style belong **only** to `wow.novyxforge.com` and this `wowforge` repository. No changes to `novyxforge.com`, other subdomains or the main six-sphere universe are involved. No Blizzard artwork or logos are copied.

**Design v6 (30 October 2026):** Original custom WoW Forge crest used in the hero, with a matching hand-drawn heraldic SVG shield in the header and favicon. `assets/wowforge-logo.webp` is a transparency-preserving crop of original generated fantasy artwork, locally optimized for speed. The identity CSS is appended to the existing `cinematic-hero.css` and is limited to this separate repository. LifeForge status, download policy, cinematic scenery, navigation and project sections remain intact.

**Historical design v5 (30 October 2026):** The hero now uses the exact user-approved cinematic fantasy artwork, stored locally as `assets/azeroth-cinematic.webp` (original generated image, optimized at native 1672×941 WebP). The separate `cinematic-hero.css` loads after both existing stylesheets, centers text and buttons over the painting, and hides the older rune-gate overlay so it does not compete with the scene. This affects this website only; lower sections and addon release claims remain intact.

**Historical design v4 (30 October 2026):** The travel-photo look was replaced by an original, locally hosted vector landscape in `assets/azeroth-expanse.svg`: silver human citadel, enchanted forest, dragon silhouette, airship, rusty red cliffs, and an orcish frontier. This is a fantasy homage, not an official Blizzard image, and no official artwork or game logo is bundled. No tracking or external imagery is needed. The previous Unsplash photography has been removed.

## Deployment with MijnHost / DirectAdmin

This is a **standalone static website**: no PHP, database, hosting backend, build command or paid API is needed.

### 1. Create the Git mirror
In DirectAdmin **Advanced Features → Git**, choose **Create Repository** under the account's main domain `novyxforge.com`:

| Setting | Value |
| --- | --- |
| Name | `wowforge` |
| Remote | `https://github.com/fathom-web/wowforge.git` |
| Keyfile | blank; this is a public repository |

DirectAdmin uses a bare Git repository for syncing. This is separate from the NOVYX FORGE main website's Git repository.

### 2. Choose the correct deployment directory

Open the new `wowforge` entry, choose **Modify** and set:

- Deploy branch: `main`.
- Deploy directory: the **existing document root of `wow.novyxforge.com`**, **relative to the DirectAdmin account home directory**.

The actual document root must be confirmed in the hosting file manager before entering a path. Depending on the setup, it could be `domains/novyxforge.com/public_html/wow` or `domains/wow.novyxforge.com/public_html`; do not assume either is correct.

**Never deploy this repository into the root of `novyxforge.com`.** That would overwrite the main site's `index.html`.

### 3. Fetch & Deploy

Fetch the `main` branch, then click **Deploy** in DirectAdmin. Verify these files exist side by side in the **subdomain document root**:

- `index.html`
- `site.css`
- `site.js`
- `favicon.svg`
- `robots.txt`
- `sitemap.xml`

Check `https://wow.novyxforge.com/`, mobile navigation, links, and SSL/HTTPS.

Future changes: sync `main` and deploy. Automatic webhooks can be enabled later, but keep the webhook URL private because it is a credential-like deploy trigger.

## Separation of responsibilities

- **WoW Forge** (`fathom-web/wowforge`): the website, addon showcases and development updates.
- **LifeForge** (`fathom-web/WoW-LifeForge`): actual in-game addon Lua code, its tests and history.
- **CurseForge**: the only future public addon download and update channel, after an approved release.
- **NOVYX FORGE** (`fathom-web/novyxforge`): central universe linking to this site.

**Never** offer addon ZIP downloads from this website, invent a CurseForge download link, or claim a project is released without verification.

## LifeForge as of 30 October 2026

- Build 7: `0.8.0-alpha`.
- 67 passing headless Lua tests according to the source repository.
- In-client testing for World of Warcraft: Forever remains **unverified**.
- No public CurseForge release or public addon download yet.
- Visual website preview is explicitly **illustrative**, not an actual screenshot.
- SavedVariables are local to the WoW installation; the website does not collect character data.

Check https://github.com/fathom-web/WoW-LifeForge for accurate up-to-date development details.

## Local validation

Run `node tests/site-check.mjs` for site structure and source claims. GitHub Actions runs the same check on pushes and pull requests.

This is an independent, unofficial fan project, not endorsed by Blizzard Entertainment. No Blizzard-owned artwork or screenshots are bundled. Respect `prefers-reduced-motion`; avoid adding tracking scripts or external runtime APIs.
