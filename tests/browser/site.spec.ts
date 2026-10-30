import { test, expect } from '@playwright/test';
test('language selection, persistence and localized metadata', async ({ browser }) => {
 const context = await browser.newContext({locale:'pt-BR'}); const page = await context.newPage();
 await page.goto('/'); await expect(page.locator('html')).toHaveAttribute('lang','pt');
 await expect(page.locator('h1')).toContainText('Realçando');
 await page.getByRole('button',{name:'Español',exact:true}).first().click();
 await expect(page.locator('h1')).toContainText('Realzando'); await page.reload();
 await expect(page.locator('html')).toHaveAttribute('lang','es');
 await expect(page).toHaveTitle(/Estética Avanzada/);
 const url = await page.locator('.hero .button-primary').getAttribute('href');
 expect(new URL(url!).searchParams.get('text')).toContain('Hola'); await context.close();
});
test('unsupported language and unavailable storage remain usable', async ({ browser }) => {
 const context = await browser.newContext({locale:'fr-FR'});
 await context.addInitScript(() => {Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}})});
 const page=await context.newPage(); await page.goto('/'); await expect(page.locator('html')).toHaveAttribute('lang','es');
 await page.getByRole('button',{name:'Português',exact:true}).first().click(); await expect(page.locator('html')).toHaveAttribute('lang','pt');await context.close();
});
test('gallery supports modal, Escape and focus return; FAQ is operable', async ({ page }) => {
 await page.goto('/'); const open=page.locator('.gallery-card').nth(1); await open.click();
 await expect(page.getByRole('dialog')).toBeVisible(); await page.keyboard.press('Tab');
 await expect(page.getByRole('dialog').locator(':focus')).toHaveCount(1);
 await page.keyboard.press('Escape'); await expect(page.getByRole('dialog')).not.toBeVisible();await expect(open).toBeFocused();
 await page.locator('summary').first().click(); await expect(page.locator('details').first()).toHaveAttribute('open','');
});
for (const width of [360,390,768,1440]) test(`responsive layout at ${width}`,async ({page})=>{
 await page.setViewportSize({width,height:900});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await page.locator('footer').scrollIntoViewIfNeeded();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);expect(errors).toEqual([]);
 await page.locator('#resultados').scrollIntoViewIfNeeded(); await page.locator('.gallery-card img').first().evaluate((img:HTMLImageElement)=>img.decode()); await page.emulateMedia({reducedMotion:'reduce'}); await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'})); await page.screenshot({path:`.qa/page-${width}.png`,fullPage:true});
});
test('mobile menu keyboard and reduced motion',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 const menu=page.locator('.menu-toggle');await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(menu).toHaveAttribute('aria-expanded','false');
 expect(await page.locator('h1').evaluate(e=>getComputedStyle(e).animationName)).toBe('none');
});

test('videos have real media, play one at a time and do not autoplay',async({page})=>{
 await page.goto('/');const videos=page.locator('video');await expect(videos).toHaveCount(3);
 for(let i=0;i<3;i++){await expect(videos.nth(i)).not.toHaveAttribute('autoplay','');await expect(videos.nth(i)).toHaveAttribute('poster',/webp/)}
 await videos.nth(0).evaluate(async(v:HTMLVideoElement)=>{v.muted=true;await v.play()});
 await videos.nth(1).evaluate(async(v:HTMLVideoElement)=>{v.muted=true;await v.play()});
 await expect.poll(()=>videos.nth(0).evaluate((v:HTMLVideoElement)=>v.paused)).toBe(true);
 await expect.poll(()=>videos.nth(1).evaluate((v:HTMLVideoElement)=>v.paused)).toBe(false);
});


test('treatments expand with localized explanations and keyboard controls',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Português',exact:true}).first().click();
 const treatment=page.getByRole('button',{name:'Botox Full Face',exact:true});await treatment.click();
 await expect(treatment).toHaveAttribute('aria-expanded','true');
 await expect(page.locator('.treatment-description:visible')).toContainText('toxina botulínica');
 await treatment.press('Enter');await expect(treatment).toHaveAttribute('aria-expanded','false');
 await treatment.click();await page.getByRole('button',{name:'Español',exact:true}).first().click();
 await expect(page.locator('.treatment-description:visible')).toContainText('toxina botulínica');
 await page.getByRole('tab',{name:/Corporal/}).click();
 await page.getByRole('button',{name:'Relleno de glúteos',exact:true}).click();
 await expect(page.locator('.treatment-description:visible')).toContainText('volumen');
});
test('particles appear in hero and contact; scroll motion respects reduced preference',async({page})=>{
 await page.goto('/');await expect(page.locator('.hero .particles')).toHaveCount(1);await expect(page.locator('.contact .particles')).toHaveCount(1);
 const heading=page.locator('#tratamientos .section-heading');await heading.scrollIntoViewIfNeeded();
 await expect.poll(()=>heading.evaluate(el=>getComputedStyle(el).animationName)).toContain('section-flow');
 await page.emulateMedia({reducedMotion:'reduce'});
 expect(await heading.evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 expect(await page.locator('.contact .particles').evaluate(el=>getComputedStyle(el).display)).toBe('none');
});

test('missing IntersectionObserver keeps page and treatments usable',async({page})=>{
 await page.addInitScript(()=>{delete (window as any).IntersectionObserver});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('h1')).toBeVisible();
 await page.getByRole('button',{name:'Botox Full Face',exact:true}).click();await expect(page.locator('.treatment-item.expanded')).toHaveCount(1);expect(errors).toEqual([]);
});
