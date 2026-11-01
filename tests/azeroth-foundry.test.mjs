import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = path => fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=read('index.html'),css=read('azeroth-foundry.css'),js=read('azeroth-foundry.js');
for(const name of ['worlds','armory','quest-log','inn','wf-faction-note','wf-motion-toggle']) assert.ok(html.includes('id="'+name+'"'),name);
for(const name of ['elwynn','crossroads','durotar']) assert.ok(html.includes('data-faction="'+name+'"'),name);
for(const name of ['wowforge-logo-2026.webp','life-forge-logo-2026.webp','forge-afk-logo-2026.webp']) {
 assert.ok(html.includes(name),'approved logo not used: '+name);
 assert.ok(fs.existsSync(new URL('../assets/'+name,import.meta.url)),'logo missing: '+name);
}
for(const file of ['azeroth-foundry-hero.webp','addon-armory.webp','life-forge-chronicle.webp','forge-afk-dadmode.webp','elwynn-dad.webp','durotar-dad.webp']) {
 assert.ok(html.includes(file)||css.includes(file),'new illustration not referenced: '+file);
}
for(const href of ['#lifeforge','#dadmode','#armory','#worlds','#development']) assert.ok(html.includes('href="'+href+'"'));
assert.ok(html.includes('onerror="this.onerror=null;this.src='),'image fallbacks should be provided');
assert.ok(css.includes('prefers-reduced-motion'));
assert.ok(css.includes('.realm-durotar'));
assert.ok(css.includes('.realm-elwynn'));
assert.ok(js.includes('localStorage'));
assert.ok(js.includes('aria-pressed'));
assert.equal((html.match(/id="wf-faction-note"/g)||[]).length,1);
assert.equal((html.match(/id="armory"/g)||[]).length,1);
assert.equal((html.match(/id="worlds"/g)||[]).length,1);
console.log('WoW Forge Azeroth redesign DOM/branding/faction checks passed.');
