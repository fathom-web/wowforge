import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
import {dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {execFileSync} from "node:child_process";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const file=path=>readFileSync(resolve(root,path),"utf8");
const html=file("index.html"),theme=file("forest-theme.css"),js=file("site.js"),original=file("site.css");
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
assert.ok(html.indexOf("site.css?v=1")<html.indexOf("forest-theme.css?v=2"));
assert.ok(html.includes('src="./assets/ancient-runegate.svg"'));
assert.ok(html.includes('class="forest-canopy"'));
assert.ok(html.includes('class="forest-fireflies"'));
assert.ok(html.includes('class="realm-bridge"'));
assert.ok(!html.includes('class="reactor"'),"Old tech reactor shouldn't be in the forest");
for(const text of ["THE WILDS AWAIT","THE GUILD ARCHIVE","THE GREENWOOD","THE RED FRONTIER","THE TRAVELER","THE QUESTLINE"]){
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
assert.ok(js.includes('classList.add("forest-ready")'));
assert.ok(js.includes("IntersectionObserver"));
assert.ok(js.includes('prefers-reduced-motion: reduce'));
for(const id of ["main","addons","lifeforge","systems","development","questions"])assert.ok(html.includes('id="'+id+'"'));
assert.equal(occurrences(html,/class="feature"/g),6);
assert.equal(occurrences(html,/class="rail-step /g),4);
assert.ok(html.includes("0.8.0-alpha")&&html.includes("67 passing headless Lua tests"));
assert.ok(html.includes("No public CurseForge download"));
assert.ok(html.includes("ILLUSTRATIVE CONCEPT · NOT A CLIENT SCREENSHOT"));
assert.ok(!html.includes("www.curseforge.com/wow/addons/lifeforge"),"Never invent release URLs");
assert.ok(!html.includes("download.zip")&&!html.includes("<iframe"),"No standalone addon downloads or embedded third-party data");
execFileSync(process.execPath,["--check",resolve(root,"site.js")],{stdio:"pipe"});
console.log("PASS Forest Frontier 2.0: original fantasy art, existing functionality, responsive and honest addon claims.");
