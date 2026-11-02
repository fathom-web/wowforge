# WoW Forge / The Road to Azeroth — redesign

**Target:** https://wow.novyxforge.com — repository `fathom-web/wowforge`.

## Included

- An immersive homepage hero with a faction switch: Crossroads / Alliance / Horde.
- Original creator-provided logo assets retained and consistently scaled. Source assets are `assets/wowforge-logo-2026.webp`, `assets/life-forge-logo-2026.webp`, and `assets/forge-afk-logo-2026.webp`.
- Two original illustrated realm cards; prominent LifeForge and Forge AFK sections; a fantasy Addon Armory; Quest Log; and a cozy Inn linking to actual source repositories.
- Existing story, Dad Mode interactive demonstration, feature sections, FAQ and unverified-build disclaimers retained.
- Accessible focus states, reduced-motion support, local preference for the faction theme, mobile layouts, lazy loading and fallback artwork.
- No fictitious addon download URLs or unverifiable CurseForge badges.

## The artwork

The **seven supplied illustrations** are optimized WebP assets stored in the repository's `assets/` folder:

```
assets/azeroth-foundry-hero.webp
assets/addon-armory.webp
assets/elwynn-dad.webp
assets/durotar-dad.webp
assets/life-forge-chronicle.webp
assets/forge-afk-dadmode.webp
assets/forge-gateway.webp
```

The existing correct three logo files are already in the GitHub repository, so no rebranding/renaming is required.

The code uses every image by its final repository path. The homepage and faction cards retain local fallbacks, and the feature images fall back to existing art if a browser cannot load the new files.

## Validation

Run `node tests/azeroth-foundry.test.mjs` and check the GitHub Actions pipeline.

After adding the artwork and deploying, test Chrome, Firefox and Safari on desktop, tablet and smartphone; review typography, loading, correct original logo sizes, no cropped crests, the faction switch, mobile navigation, AFK demo and all source links. Accessibility: keyboard focus, Escape menu, reduced motion, buttons aria-pressed. Measure any performance change with Lighthouse. Preserve the previous production version until QA is approved.

## Updating

All new styling is contained in `azeroth-foundry.css` and behavior in `azeroth-foundry.js`. This avoids editing twelve older style sheets and makes rollback straightforward.
