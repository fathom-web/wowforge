import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {dirname,resolve} from "node:path";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const get=f=>readFileSync(resolve(root,f),"utf8");
const html=get("index.html"),css=get("site.css"),js=get("site.js");
const count=(text,regex)=>[...text.matchAll(regex)].length;
for(const href of ["./site.css?v=4","./site.js?v=4","./assets/wowforge-header-first.webp"])
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
assert.ok(css.includes("./assets/azeroth-landscape.svg"), "Fantasy landscape must be used");
assert.ok(html.includes('class="hero-seal wowforge-identity"'), "Distinct WoW Forge crest must replace generic hero type");
assert.ok(html.includes("THE NOVYX REALMS PRESENT"),"Original first mockup subtitle must appear");
assert.ok(html.includes("WORLD OF WARCRAFT ADDONS"), "Header subtitle matches first mockup");
assert.ok(html.includes('id="story"'), "Our Story section must exist");
assert.ok(html.includes('href="#story">Our Story</a>'), "Our Story accessible from top navigation");
assert.ok(html.includes('./forge-story.css?v=1'), "Story stylesheet must load");
assert.ok(html.includes("Older heroes.") && html.includes("Same world."), "Veteran gamer story heading");
assert.ok(html.includes("We became fathers.") && html.includes("Twenty years ago, we had all night."), "Story must be about veteran dads");
assert.ok(html.includes("We're building addons for World of Warcraft: Forever"), "Story connects to the addon mission");
assert.ok(html.includes("less time fighting menus"), "Time-saving addon promise");
assert.ok(html.indexOf('id="story"')<html.indexOf('id="addons"'), "Story should lead into the addon archive");
const storyCss=get("forge-story.css");
assert.equal(count(storyCss,/\\{/g),count(storyCss,/\\}/g),"Story CSS braces must balance");
assert.ok(storyCss.includes("@media(max-width:620px)") && storyCss.includes("prefers-reduced-motion:reduce"),"Story mobile and motion access");
assert.ok(!html.includes("AN ADVENTURE THROUGH AZEROTH"),"Remove duplicate hero eyebrow");
assert.ok(html.includes('class="brand wow-brand"'), "Dedicated WoW header brand required");
assert.ok(html.includes('./assets/wowforge-crest-original.webp'), "Dedicated crest image required");
assert.ok(html.includes('./assets/wowforge-header-first.webp'), "Dedicated header crest required");
const navCrest=readFileSync(resolve(root,"assets/wowforge-header-first.webp"));
assert.ok(navCrest.length>4000 && navCrest.toString("ascii",0,4)==="RIFF" && navCrest.toString("ascii",8,12)==="WEBP","A valid header W emblem is required");
const crest=readFileSync(resolve(root,"assets/wowforge-crest-original.webp"));
assert.ok(crest.length>30000 && crest.toString("ascii",0,4)==="RIFF" && crest.toString("ascii",8,12)==="WEBP","Optimized original WoW Forge logo must be a real WebP");

assert.ok(html.includes('./cinematic-hero.css?v=3'), "Cinematic hero stylesheet must load last");
assert.ok(html.includes('./assets/azeroth-cinematic.webp'), "Cinematic image must be preloaded");
const cinematic=get("cinematic-hero.css");
assert.ok(cinematic.includes('url("./assets/azeroth-cinematic.webp")'), "Use approved cinematic fantasy image");
const webp=readFileSync(resolve(root,"assets/azeroth-cinematic.webp"));
assert.ok(webp.length>100000 && webp.toString("ascii",0,4)==="RIFF" && webp.toString("ascii",8,12)==="WEBP","Valid optimized original artwork");
assert.ok(css.includes("./assets/azeroth-expanse.svg"), "Original Azeroth-inspired scene should support the hero");
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
console.log("PASS WoW Forge v7: landscape, UI, links, addon status, mobile, accessibility and distribution.");
