import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {dirname,resolve} from "node:path";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const get=f=>readFileSync(resolve(root,f),"utf8");
const html=get("index.html"),css=get("site.css"),js=get("site.js");
const count=(text,regex)=>[...text.matchAll(regex)].length;
for(const href of ["./site.css?v=4","./site.js?v=4","./assets/wowforge-arcane-wf.webp"])
 assert.ok(html.includes(href),"Missing root-relative asset: "+href);
assert.ok(html.includes('rel="canonical" href="https://wow.novyxforge.com/"'));
assert.ok(html.includes("<title>WoW Forge — NOVYX FORGE</title>"));
assert.ok(html.includes("0.8.0-alpha"));
assert.ok(html.includes("67 passing headless Lua tests"));
assert.ok(html.includes("No public CurseForge download"));
assert.ok(html.includes("ILLUSTRATIVE CONCEPT · NOT A CLIENT SCREENSHOT"));
for(const id of ["main","addons","lifeforge","systems","development","questions"]){
 assert.equal(count(html,new RegExp('id="'+id+'"','g')),1,"Missing or duplicate anchor: "+id);
}
assert.equal(count(html,/class="feature"/g),6,"Six LifeForge feature panels");
assert.equal(count(html,/class="rail-step /g),4,"Four release stages");
assert.ok(html.includes('href="https://github.com/fathom-web/WoW-LifeForge"'));
assert.ok(html.includes('href="https://novyxforge.com/"'));
assert.equal(count(css,/\{/g),count(css,/\}/g),"CSS braces must balance");
assert.ok(css.includes("@media(max-width:620px)"));
assert.ok(css.includes("prefers-reduced-motion:reduce"));
assert.ok(css.includes("./assets/azeroth-landscape.svg"), "Non-trademark fantasy fallback retained");
assert.ok(html.includes('class="hero-seal wowforge-identity"'),"Independent hero emblem should exist");
assert.ok(html.includes('class="brand wow-brand"'),"Independent brand");
assert.ok(html.includes("INDEPENDENT GAME ADDONS"),"Independent publisher branding");
assert.ok(html.includes("AN INDEPENDENT NOVYX FORGE PROJECT"),"No claim of official endorsement");
for(const oldAsset of ["wowforge-crest-original.webp","wowforge-header-first.webp","wowforge-logo.webp","azeroth-cinematic.webp"]){
 assert.ok(!html.includes(oldAsset),"Legacy brand imagery must not appear in HTML: "+oldAsset);
}
assert.ok(html.includes("./assets/wowforge-arcane-wf.webp"),"Matching WF arcane-gold emblem must load");
assert.equal(count(html,/src="\.\/assets\/wowforge-arcane-wf\.webp"/g),3,"WF logo used in header, hero and story");
assert.ok(html.includes('rel="icon" href="./assets/wowforge-arcane-wf.webp" type="image/webp"'),"WF favicon should use matching artwork");
const wfLogo=readFileSync(resolve(root,"assets/wowforge-arcane-wf.webp"));
assert.ok(wfLogo.length>100000&&wfLogo.toString("ascii",0,4)==="RIFF"&&wfLogo.toString("ascii",8,12)==="WEBP","WF logo must be a valid original optimized WebP");
assert.ok(html.includes("wowforge-arcane.css?v=1")&&html.indexOf("wowforge-arcane.css?v=1")>html.indexOf("lifeforge-brand.css?v=1"),"WF style overrides must load last");
const wfCss=get("wowforge-arcane.css");
assert.ok(wfCss.includes(".hero .wowforge-crest")&&wfCss.includes(".topbar")&&wfCss.includes(".story-keepsake"),"All three WF logo placements must be styled");
assert.equal(wfCss.split("{").length,wfCss.split("}").length,"Arcane WF stylesheet balanced");
assert.ok(html.includes("./assets/novyx-realm-hero.webp"),"Original fantasy image preloaded");
assert.ok(html.includes("./brand-original.css?v=1"),"Brand-safe base styles retained");
assert.ok(html.includes("./forge-grit.css?v=9"),"War-camp design patch must be present");
assert.ok(html.includes("./lifeforge-brand.css?v=1"),"LifeForge identity stylesheet required");
assert.ok(html.indexOf("lifeforge-brand.css?v=1")>html.indexOf("forge-grit.css?v=9"),"LifeForge styling must load after veteran visual theme");
assert.ok(html.includes('class="lifeforge-relic-art"') && html.includes('class="lifeforge-registry-icon"') && html.includes('class="preview-logo lifeforge-preview-mark"'),"LifeForge emblem should appear in project card, project section and interface mockup");
assert.equal(count(html,/src="\.\/assets\/lifeforge-arcane-emblem\.webp"/g),3,"Exactly three LifeForge logo placements");
const lifeLogo=readFileSync(resolve(root,"assets/lifeforge-arcane-emblem.webp"));
assert.ok(lifeLogo.length>100000&&lifeLogo.toString("ascii",0,4)==="RIFF"&&lifeLogo.toString("ascii",8,12)==="WEBP","User-provided LifeForge emblem must be a valid optimized WebP");
const lifeCss=get("lifeforge-brand.css");
assert.equal(lifeCss.split("{").length,lifeCss.split("}").length,"LifeForge CSS balanced");
assert.ok(lifeCss.includes("@media(max-width:620px)")&&lifeCss.includes("prefers-reduced-motion:reduce"),"Mobile and reduced-motion support for LifeForge emblem");

assert.ok(html.indexOf("forge-grit.css?v=9")>html.indexOf("brand-original.css?v=1"),"War-camp patch must override legacy CSS");
const grit=get("forge-grit.css");
assert.equal(grit.split("{").length,grit.split("}").length,"Grunge CSS brace balance");
for(const key of [".story-frame",".section.spotlight",".preview-shell",".systems .feature",".release-rail",".faq-list",".outro"]){assert.ok(grit.includes(key),"Missing styling for "+key)}
assert.ok(grit.includes("@media(max-width:620px)")&&grit.includes("prefers-reduced-motion:reduce"),"Mobile accessibility");
assert.ok(html.indexOf("brand-original.css?v=1")>html.indexOf("forge-story.css?v=1"),"Legal-safe overrides must be last");
const brandSvg=get("assets/wowforge-arcane-wf.webp");
assert.ok(brandSvg.includes("<svg") && brandSvg.includes("smithing anvil") && !brandSvg.includes("Blizzard"),"Our logo must be original");
const legalHero=readFileSync(resolve(root,"assets/novyx-realm-hero.webp"));
assert.ok(legalHero.length>100000&&legalHero.toString("ascii",0,4)==="RIFF"&&legalHero.toString("ascii",8,12)==="WEBP","Original hero art must be valid");
const brandCss=get("brand-original.css");
assert.ok(brandCss.includes("novyx-realm-hero.webp"),"Original image used in outro");
assert.equal(brandCss.split("{").length,brandCss.split("}").length,"Brand CSS balanced");
assert.ok(!html.includes("AN ADVENTURE THROUGH AZEROTH"),"Remove duplicate hero eyebrow");
assert.ok(html.includes('class="brand wow-brand"'), "Dedicated WoW header brand required");
assert.ok(html.includes('./cinematic-hero.css?v=4'), "Cinematic hero stylesheet must load last");
assert.ok(html.includes('./assets/novyx-realm-hero.webp'), "Cinematic image must be preloaded");
const cinematic=get("cinematic-hero.css");
assert.ok(cinematic.includes('url("./assets/novyx-realm-hero.webp")'), "Use approved cinematic fantasy image");
const webp=readFileSync(resolve(root,"assets/novyx-realm-hero.webp"));
assert.ok(webp.length>100000 && webp.toString("ascii",0,4)==="RIFF" && webp.toString("ascii",8,12)==="WEBP","Valid optimized original artwork");
assert.ok(css.includes("./assets/novyx-realm-hero.webp"),"Original hero used in fallback");
assert.ok(!css.includes("images.unsplash.com"), "No borrowed ordinary landscape photography");
const panorama=get("assets/azeroth-expanse.svg");
for(const iconic of ["citadel", "airship", "orcish frontier", "dragon"]){
 assert.ok(panorama.toLowerCase().includes(iconic), "Hero panorama must show high-fantasy identity: "+iconic);
}
assert.ok(!js.includes("realm-durotar"), "Previous dark fantasy switcher should be removed");
assert.ok(get("assets/azeroth-landscape.svg").includes("<svg"), "Original fantasy illustration must exist");
assert.ok(js.includes('event.key === "Escape"') && js.includes('aria-expanded'));
assert.ok(!html.includes("download.zip")&&!html.includes('href="./download'),"No fake website downloads");
assert.ok(!html.includes('href="https://www.curseforge.com/wow/addons/lifeforge"'),"No fabricated release link");
for(const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)){
 assert.ok(tag[0].includes('rel="noopener noreferrer"'),"Unprotected external tab");
}
execFileSync(process.execPath,["--check",resolve(root,"site.js")]);
console.log("PASS WoW Forge v9: landscape, UI, links, addon status, mobile, accessibility and distribution.");
