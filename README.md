# WoW Forge — NOVYX FORGE

**Website:** https://wow.novyxforge.com/  
**GitHub repository:** https://github.com/fathom-web/wowforge  
**Purpose:** Standalone showcase for original World of Warcraft addon projects, with LifeForge first.

**Design boundary:** The original forest-and-ember frontier fantasy theme, animated rune crest and optional landscape switcher belong **only** to `wow.novyxforge.com` and this `wowforge` repository. No changes to `novyxforge.com`, other subdomains or the main six-sphere universe are involved. The SVG landscape in `assets/azeroth-landscape.svg` is an original illustration, not Blizzard artwork.

## Forest Frontier 2.0 — original illustrated fantasy world

WoW Forge now combines **emerald woodland and ochre wilderness** without copying Blizzard images or user data.

- Original panorama: `assets/forest-frontier.svg` (forest, light beams, outpost, red-rock frontier).
- Original carved rune portal: `assets/ancient-runegate.svg` and crest `favicon.svg`.
- Full story-led reskin in `forest-theme.css` layered over the existing `site.css`.
- Quest-board archive, carved wooden top navigation, original fantasy codex UI, six magical relic panels, release path marked with waystones, and forest/firelit outro.
- The current v3 navigation and accessibility script remain unchanged. The new design naturally combines woodland and ochre frontier scenery; optional realm-specific CSS is future-ready without adding an unwanted toggle.
- `forest-effects.js` only adds optional scroll reveal, keeping navigation and theme controls independent.
- `prefers-reduced-motion`, keyboard focus, original source links and client alpha warnings remain respected.
- Source-level and desktop/tablet/mobile browser checks are in GitHub Actions. Screenshots can be viewed in workflow artifacts.

The entire site is an **independent fan project**. All landscape and portal artwork is original; no game textures or official WoW logos are bundled. A LifeForge alpha is **not** a validated or publicly released CurseForge addon.

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
