import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {dirname,resolve} from "node:path";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const get=f=>readFileSync(resolve(root,f),"utf8");
const html=get("index.html"),css=get("site.css"),js=get("site.js");
const count=(text,regex)=>[...text.matchAll(regex)].length;
for(const href of ["./site.css?v=3","./site.js?v=3","./favicon.svg"])
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
assert.ok(html.includes('class="hero-seal"'), "New World of Warcraft-inspired title treatment must exist");
assert.ok(css.includes("photo-1646404464819-523c6fef3707"), "Scenic photography should support the hero");
assert.ok(!js.includes("realm-durotar"), "Previous dark fantasy switcher should be removed");
assert.ok(get("assets/azeroth-landscape.svg").includes("<svg"), "Original fantasy illustration must exist");
assert.ok(js.includes('event.key === "Escape"') && js.includes('aria-expanded'));
assert.ok(!html.includes("download.zip")&&!html.includes('href="./download'),"No fake website downloads");
assert.ok(!html.includes('href="https://www.curseforge.com/wow/addons/lifeforge"'),"No fabricated release link");
for(const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)){
 assert.ok(tag[0].includes('rel="noopener noreferrer"'),"Unprotected external tab");
}
execFileSync(process.execPath,["--check",resolve(root,"site.js")]);
console.log("PASS WoW Forge v3: landscape, UI, links, addon status, mobile, accessibility and distribution.");
