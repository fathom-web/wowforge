# WoW Forge — NOVYX FORGE

**Website:** https://wow.novyxforge.com/  
**GitHub repository:** https://github.com/fathom-web/wowforge  
**Purpose:** Standalone showcase for original World of Warcraft addon projects, with LifeForge first.

**Two Factions / One Dadbod (30 October 2026):** Full-page integration of a weathered human-and-orc veteran guild aesthetic. A substantial hammered gold/blue gem WF shield `assets/wf-shield-dadbods.webp` replaces the too-modern circular WF lettering, with a separate shield icon for favicon/navbar/story. Original generated human/orc dadbod artworks appear directly after the hero in `#veterans`; two new custom azure-gold and ember-black cloth banners appear in repeated visual transitions and throughout the page in `faction-dads.css`, loaded last. Alliance/Horde names describe the fan art only; the pennants are original custom heraldry, NOT copies of Blizzard official faction insignia. Original cinematic scenery, LF project logo, release disclaimer and independent fan-project status are preserved. Only `wow.novyxforge.com` changes.

**Previous WoW Forge arcane identity (30 October 2026):** The original site-wide WF relic has been updated to a standalone user-directed antique gold and electric blue *WF* identity emblem at `assets/wowforge-arcane-wf.webp`, matching the look of the LifeForge LF graphic while keeping the initials correctly WF. All primary WoW Forge placements (navigation, hero, story) now use this asset. Responsive presentation is isolated to `wowforge-arcane.css`. The LifeForge LF emblem, cinematic landscape, addon claims and copyright/non-affiliation notices are unchanged.

**LifeForge visual identity (30 October 2026):** The user-provided Arcane LF Bronze Emblem has been optimized to `assets/lifeforge-arcane-emblem.webp` and featured in the LifeForge project card, LifeForge spotlight and the illustrative addon UI preview. A dedicated responsive `lifeforge-brand.css` supplies tasteful arcane blue-gold integration, while keeping the parent WoW Forge logo and hero unchanged. The artwork is presented as an independent LifeForge project emblem, not a game publisher mark.

**Veteran Forge redesign v9 (30 October 2026):** A complete sitewide war-camp direction is implemented in `forge-grit.css`, loaded after all legacy stylesheets. The dark, battle-worn brass-and-iron treatment unifies the hero transition, veteran dads story, archive, bridge, LifeForge preview, relic cards, release route, FAQ and footer. The original cinematic landscape remains. A distinctive hammered WF/blacksmith emblem is introduced at `assets/novyx-wf-relic.svg`, with subtle original grain at `assets/forge-grain.svg`. Only `wow.novyxforge.com` is affected. No official publisher artwork or logo is used.

**Our Story (30 October 2026):** Added the personal `#story` section directly beneath the cinematic hero, with a dedicated `forge-story.css` parchment-and-guild-journal presentation and an accessible navigation link. The narrative is about veteran WoW players, now fathers, after twenty years in Azeroth. It explains why we are building practical, time-saving addons for World of Warcraft: Forever. No claim is made that unreleased features already work.

**Brand and trademark safety review (30 October 2026):** The site uses an original NOVYX WF blacksmith SVG mark (`assets/novyx-wf-crest.svg`) and a newly generated fantasy landscape (`assets/novyx-realm-hero.webp`) featuring generic original heraldry instead of Alliance/Horde imagery. Official-style logo imitations and the older original fantasy background were removed from the active page and should be deleted from the current branch. Blizzard and World of Warcraft are identified only in descriptive text with an explicit non-affiliation disclaimer. This is a risk reduction, not a legal guarantee. The visible `WoW Forge` product name and `wow.novyxforge.com` subdomain may still warrant specialist trademark review.

**Design boundary:** The Warcraft-inspired fantasy panorama and website style belong **only** to `wow.novyxforge.com` and this `wowforge` repository. No changes to `novyxforge.com`, other subdomains or the main six-sphere universe are involved. No Blizzard artwork or logos are copied.

**Design v7 (30 October 2026):** Corrected the v6 logo mismatch by extracting the **exact crest from the first design impression**, retaining the crossed weapons, blue and red hanging banners and luminous medallion. Assets: `assets/wowforge-crest-original.webp` and matching `assets/wowforge-header-first.webp` for the round W navigation emblem/fav icon. Restored the first impression's single "THE NOVYX REALMS PRESENT" subtitle. This is a pixel-derived asset extraction from the previously generated original design, not a substituted AI remix. Only `wow.novyxforge.com` is modified.

**Historical design v6 (30 October 2026):** Original custom WoW Forge crest used in the hero, with a matching hand-drawn heraldic SVG shield in the header and favicon. `assets/wowforge-logo.webp` is a transparency-preserving crop of original generated fantasy artwork, locally optimized for speed. The identity CSS is appended to the existing `cinematic-hero.css` and is limited to this separate repository. LifeForge status, download policy, cinematic scenery, navigation and project sections remain intact.

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
