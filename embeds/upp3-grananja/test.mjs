import assert from 'node:assert/strict';
import { chromium } from '../../script-patcher/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless:true});
try {
 const page = await browser.newPage({viewport:{width:1000,height:950}});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(new URL('./index.html',import.meta.url).href);
 const mode=name=>page.locator(`[data-mode="${name}"]`).click();
 const join=name=>page.locator(`[data-join="${name}"]`).click();
 const start=()=>page.locator('#start').click();
 const finish=i=>page.locator(`[data-finish="${i}"]`).click();
 const status=()=>page.locator('#status').innerText();
 const output=()=>page.locator('#status').evaluate(el=>el.classList.contains('complete'));
 for(const split of ['XOR','AND','OR']){
  for(const merge of ['XOR','AND','OR']){
   const masks=split==='XOR'?[1,2,4]:split==='AND'?[7]:[1,2,3,4,5,6,7];
   for(const mask of masks){
    await mode(split);await join(merge);
    const selected=[0,1,2].filter(i=>mask&(1<<i));
    if(split==='XOR') await page.locator(`input[value="${selected[0]}"]`).check();
    if(split==='OR') for(let i=0;i<3;i++) await page.locator(`input[value="${i}"]`).setChecked(selected.includes(i));
    await start();assert.equal(await output(),false);
    assert.equal(await page.locator('[data-finish]:enabled').count(),selected.length);
    for(const [step,i] of [...selected].reverse().entries()){
     await finish(i);
     const expected=merge==='XOR'||(merge==='AND'?step===2:step===selected.length-1);
     assert.equal(await output(),expected,`${split} → ${merge}, mask ${mask}, step ${step}`);
     if(merge==='XOR') assert.match(await status(),new RegExp(`Izlazni tok aktiviran: ${step+1} puta`));
    }
    if(merge==='AND'&&mask!==7) assert.match(await status(),/Zastoj/);
    await start();assert.equal(await output(),false);
   }
  }
 }
 await mode('OR');await page.locator('input[value="0"]').uncheck();await start();
 assert.match(await status(),/Odaberi barem jedan/);
 assert.equal(await page.locator('[data-finish]:enabled').count(),0);
 await page.locator('#reset').focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('input:enabled').count(),3);
 assert.equal(await page.locator('[data-join="OR"]').getAttribute('aria-pressed'),'true');
 assert.equal(await page.locator('footer,.eyebrow,.hint').count(),0);
 assert.equal(await page.locator('#reset svg').count(),1);
 assert.equal(await page.locator('#join-symbol circle').count(),1);
 const boxes=await page.locator('.diagram').evaluate(svg=>({labels:[...svg.querySelectorAll('.caption')].map(el=>{const b=el.getBBox();return {top:b.y,bottom:b.y+b.height};}),branches:[...svg.querySelectorAll('[id^="branch-"]')].map(el=>{const b=el.getBBox();return b.y+b.height;})}));
 for(const label of boxes.labels) assert.ok(label.top>Math.max(...boxes.branches),'Labels must be below all branches');
 await mode('AND');await join('XOR');await start();await finish(0);
 const fill=selector=>page.locator(selector).evaluate(el=>getComputedStyle(el).fill);
 const green='rgb(169, 223, 181)', yellow='rgb(255, 227, 138)';
 assert.equal(await fill('#begin'),green);
 assert.equal(await fill('#split-gateway'),green);
 assert.equal(await fill('#branch-0 .task'),green);
 assert.equal(await fill('#branch-1 .task'),yellow);
 assert.equal(await fill('#end'),green);
 await join('AND');await start();await finish(0);
 assert.equal(await fill('#join-gateway'),yellow);
 assert.equal(await fill('#end'),yellow);
 await finish(1);await finish(2);
 assert.equal(await fill('#join-gateway'),green);
 assert.equal(await fill('#end'),green);
 await page.locator('#reset').click();
 assert.equal(await fill('#begin'),'rgb(255, 255, 255)');
 assert.equal(await fill('#end'),'rgb(255, 255, 255)');
 await mode('XOR');await join('AND');await start();await finish(0);
 assert.equal(await fill('#branch-1 .task'),'rgb(245, 247, 249)');
 assert.equal(await fill('#join-gateway'),yellow);
 await mode('AND');await start();await finish(0);
 await page.screenshot({path:'/tmp/upp3-desktop.png',fullPage:true});
 for(const width of [320,375,768]){
  await page.setViewportSize({width,height:900});
  for(const name of ['XOR','AND','OR']){
   await mode(name);await join(name);await start();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${name} overflow at ${width}`);
  }
 }
 await page.setViewportSize({width:375,height:900});
 await page.screenshot({path:'/tmp/upp3-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);
 console.log('PASS: all nine gateway pairs, all branch subsets, XOR outputs, AND deadlocks, OR joins, reset/restart, keyboard, SVG labels, task/event state colors, mobile widths and browser errors.');
} finally {await browser.close();}
