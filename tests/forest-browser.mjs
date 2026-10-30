import assert from "node:assert/strict";
import {chromium} from "playwright";
import {mkdirSync} from "node:fs";
import {resolve} from "node:path";

const base="http://127.0.0.1:8777";
const browser=await chromium.launch({headless:true});
mkdirSync(resolve("qa-screenshots"),{recursive:true});
const scenarios=[
  {name:"desktop-1440",width:1440,height:900},
  {name:"tablet-834",width:834,height:1112},
  {name:"mobile-390",width:390,height:844}
];
let errors=0;
try {
 for(const scenario of scenarios){
  const context=await browser.newContext({viewport:{width:scenario.width,height:scenario.height},reducedMotion:"reduce"});
  const page=await context.newPage();
  const logs=[];
  page.on("pageerror",e=>logs.push(String(e)));
  const response=await page.goto(base+"/",{waitUntil:"domcontentloaded"});
  assert.equal(response.status(),200,scenario.name+" homepage");
  await page.locator("#hero-title").waitFor();
  await page.locator("#questions").waitFor();
  const results=await page.evaluate(()=>{
   const im=document.querySelector(".portal-illustration");
   const hero=document.querySelector(".hero");
   const css=getComputedStyle(hero).backgroundImage;
   const vp=document.documentElement.clientWidth;
   const portalBox=im.getBoundingClientRect();
   return {
    scrollWidth:document.documentElement.scrollWidth,viewport:vp,
    forestBackground:css.includes("forest-frontier.svg"),
    stonePortal:im.complete&&im.naturalWidth>0,
    artInside:portalBox.width>0&&portalBox.left>=-2&&portalBox.right<=vp+2,
    reducedAnimation:getComputedStyle(im).animationDuration,
    faq:document.querySelectorAll(".faq-list details").length,
    features:document.querySelectorAll(".feature").length,
    material:getComputedStyle(document.querySelector(".registry-item")).borderTopWidth,
    font:getComputedStyle(document.querySelector("h1")).fontFamily
   };
  });
  assert.ok(results.scrollWidth<=results.viewport+2,scenario.name+" horizontal overflow "+JSON.stringify(results));
  assert.ok(results.forestBackground,scenario.name+" missing landscape");
  assert.ok(results.stonePortal,scenario.name+" missing original rune gate asset");
  assert.ok(results.artInside,scenario.name+" portal clips "+JSON.stringify(results));
  assert.equal(results.faq,4);
  assert.equal(results.features,6);
  assert.ok(parseFloat(results.reducedAnimation)<=0.01,scenario.name+" reduced motion animation should be disabled: "+results.reducedAnimation);
  // Existing main-branch Realm Chooser must remain interactive after full visual reskin.
  const ember=page.locator('button[data-realm="durotar"]');
  const emerald=page.locator('button[data-realm="forest"]');
  assert.equal(await ember.count(),1,scenario.name+" missing Ember Frontier control");
  await ember.click();
  assert.ok(await page.locator("body").evaluate(el=>el.classList.contains("realm-durotar")));
  assert.equal(await ember.getAttribute("aria-pressed"),"true");
  await page.screenshot({path:resolve("qa-screenshots",scenario.name+"-ember.png"),fullPage:true,animations:"disabled"});
  await emerald.click();
  assert.ok(!(await page.locator("body").evaluate(el=>el.classList.contains("realm-durotar"))));
  assert.equal(await emerald.getAttribute("aria-pressed"),"true");
  if(scenario.width<880){
   const toggle=page.locator(".menu-toggle");
   await toggle.click();
   assert.equal(await toggle.getAttribute("aria-expanded"),"true");
   await page.locator('#navigation a[href="#systems"]').click();
   assert.equal(await toggle.getAttribute("aria-expanded"),"false");
   await page.locator(".faq-list details").first().locator("summary").click();
   assert.ok(await page.locator(".faq-list details").first().evaluate(e=>e.open));
  }
  await page.screenshot({path:resolve("qa-screenshots",scenario.name+".png"),fullPage:true,animations:"disabled"});
  assert.deepEqual(logs,[],scenario.name+" JavaScript errors");
  console.log("PASS "+scenario.name,results);
  await context.close();
 }
} catch(e){errors++;throw e;} finally {await browser.close();}
if(errors)process.exitCode=1;
