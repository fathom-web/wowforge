import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {execFileSync} from "node:child_process";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const file=path=>readFileSync(resolve(root,path),"utf8");
const html=file("index.html"),theme=file("forest-theme.css"),js=file("site.js"),effects=file("forest-effects.js"),original=file("site.css");
const occurrences=(s,regex)=>[...s.matchAll(regex)].length;
for(const path of ["assets/forest-frontier.svg","assets/ancient-runegate.svg","forest-theme.css"]){
 assert.ok(existsSync(resolve(root,path)),"Missing original fantasy asset: "+path);
}
for(const name of ["assets/forest-frontier.svg","assets/ancient-runegate.svg"]){
 const svg=file(name);
 assert.ok(svg.includes("<svg")&&svg.includes("</svg>"),"Not an SVG: "+name);
 assert.ok(!/<script\b|onload=|href=["']https?:/i.test(svg),"Original artwork must not load third parties or execute scripts");
}
assert.equal(occurrences(html,/forest-theme\.css\?v=2/g),1);
assert.ok(html.indexOf("site.css?v=4")<html.indexOf("forest-theme.css?v=2") && html.indexOf("forest-theme.css?v=2")<html.indexOf("cinematic-hero.css?v=3"), "Stylesheet cascade must put cinematic overrides last");
assert.ok(html.includes('src="./assets/ancient-runegate.svg"'));
assert.ok(html.includes('class="forest-canopy"'));
assert.ok(html.includes('class="forest-fireflies"'));
assert.ok(html.includes('class="realm-bridge"'));
assert.ok(!html.includes('class="reactor"'),"Old tech reactor shouldn't be in the forest");
for(const text of ["THE NOVYX REALMS PRESENT","THE GUILD ARCHIVE","THE GREENWOOD","THE RED FRONTIER","THE TRAVELER","THE QUESTLINE"]){
 assert.ok(html.includes(text),"Missing fantasy storytelling: "+text);
}
for(const selector of [".hero",".forest-portal",".portal-illustration",".registry-item",".preview-shell",".feature-grid",".release-rail",".faq-list",".outro",".realm-bridge",
"@media(max-width:880px)","@media(max-width:620px)","@media(prefers-reduced-motion:reduce)"]){
 assert.ok(theme.includes(selector),"Missing fantasy style: "+selector);
}
assert.ok(theme.includes("forest-frontier.svg"));
assert.ok(theme.includes("ancient-runegate.svg")===false,"Runegate asset loads through <img>, not a duplicate CSS background");
assert.equal(occurrences(theme,/\{/g),occurrences(theme,/\}/g),"Fantasy style braces must balance");
assert.equal(occurrences(original,/\{/g),occurrences(original,/\}/g),"Legacy style braces must remain balanced");
assert.ok(effects.includes('classList.add("forest-ready")'));
assert.ok(effects.includes("IntersectionObserver"));
assert.ok(effects.includes('prefers-reduced-motion: reduce'));
assert.ok(js.includes("aria-expanded"),"Preserve original accessible navigation");
assert.ok(theme.includes('.realm-durotar .hero'),"Durotar realm theme must respond to toggle");
assert.ok(html.includes('./forest-effects.js?v=1'),"Missing separate effects script");
assert.ok(html.includes('./cinematic-hero.css?v=3'),"Missing approved cinematic hero styling");
assert.ok(html.includes('src="./assets/wowforge-crest-original.webp"'),"Must use exact first impression emblem");
assert.ok(html.includes('src="./assets/wowforge-header-first.webp"'),"Must use matching circular W emblem");
assert.ok(file("cinematic-hero.css").includes('azeroth-cinematic.webp'),"Cinematic background must reference approved image");
assert.ok(html.includes('./site.css?v=4')&&html.includes('./site.js?v=4'),"Keep latest v3 base asset versions");
for(const id of ["main","addons","lifeforge","systems","development","questions"])assert.ok(html.includes('id="'+id+'"'));
assert.equal(occurrences(html,/class="feature"/g),6);
assert.equal(occurrences(html,/class="rail-step /g),4);
assert.ok(html.includes("0.8.0-alpha")&&html.includes("67 passing headless Lua tests"));
assert.ok(html.includes("No public CurseForge download"));
assert.ok(html.includes("ILLUSTRATIVE CONCEPT · NOT A CLIENT SCREENSHOT"));
assert.ok(!html.includes("www.curseforge.com/wow/addons/lifeforge"),"Never invent release URLs");
assert.ok(!html.includes("download.zip")&&!html.includes("<iframe"),"No standalone addon downloads or embedded third-party data");
execFileSync(process.execPath,["--check",resolve(root,"site.js")],{stdio:"pipe"});
execFileSync(process.execPath,["--check",resolve(root,"forest-effects.js")],{stdio:"pipe"});
console.log("PASS Forest Frontier 2.0: original fantasy art, existing functionality, responsive and honest addon claims.");
