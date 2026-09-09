// Render-verification for the preview pages. Run: node scripts/verify.mjs
import { chromium } from '/opt/homebrew/lib/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['index.html', 'findings.html'];
const widths = [375, 1440];
const shots = path.join(root, 'scripts', 'shots');
fs.mkdirSync(shots, { recursive: true });

const browser = await chromium.launch();
let failures = 0;
const report = [];

for (const page of pages) {
  const file = path.join(root, page);
  if (!fs.existsSync(file)) { report.push(`${page}: MISSING`); failures++; continue; }
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.goto('file://' + file, { waitUntil: 'load' });
    await p.waitForTimeout(400);
    const r = await p.evaluate(() => {
      const de = document.documentElement;
      const links = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'));
      const imgs = [...document.querySelectorAll('img')];
      return {
        innerWidth: window.innerWidth,
        scrollWidth: de.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        h1: document.querySelectorAll('h1').length,
        h2: document.querySelectorAll('h2').length,
        h3: document.querySelectorAll('h3').length,
        imgs: imgs.length,
        imgsMissingAlt: imgs.filter(i => !(i.getAttribute('alt') || '').trim()).length,
        robots: document.querySelector('meta[name="robots"]')?.content || null,
        viewport: document.querySelector('meta[name="viewport"]')?.content || null,
        lang: de.lang,
        links: links.length,
        externalCapelli: links.filter(h => /thecapelligroup\.com/i.test(h)),
        httpLinks: links.filter(h => /^https?:/i.test(h)),
        anchorsMissing: links.filter(h => h.startsWith('#') && h.length > 1 && !document.getElementById(h.slice(1))),
        tel: links.filter(h => h.startsWith('tel:')).length,
        mailto: links.filter(h => h.startsWith('mailto:')).length,
        emDash: (document.body.innerText.match(/—/g) || []).length,
        landmarks: ['header', 'nav', 'main', 'footer'].map(t => `${t}:${document.querySelectorAll(t).length}`).join(' '),
        skip: !!document.querySelector('a.skip[href="#main"]'),
        title: document.title,
      };
    });
    const overflow = r.scrollWidth > r.innerWidth || r.bodyScrollWidth > r.innerWidth;
    const bad = [];
    if (overflow) bad.push(`HORIZONTAL SCROLL scrollWidth=${r.scrollWidth} inner=${r.innerWidth}`);
    if (r.h1 !== 1) bad.push(`h1 count ${r.h1}`);
    if (r.imgsMissingAlt) bad.push(`imgs missing alt ${r.imgsMissingAlt}`);
    if (!/noindex/.test(r.robots || '')) bad.push(`robots=${r.robots}`);
    if (!/width=device-width/.test(r.viewport || '')) bad.push(`viewport=${r.viewport}`);
    if (r.externalCapelli.length) bad.push(`links to thecapelligroup.com: ${r.externalCapelli.join(',')}`);
    if (r.anchorsMissing.length) bad.push(`dangling anchors: ${r.anchorsMissing.join(',')}`);
    if (r.emDash) bad.push(`em dashes in text: ${r.emDash}`);
    if (bad.length) failures++;
    report.push(`${page} @${w}px  scrollWidth=${r.scrollWidth}/${r.innerWidth}  h1=${r.h1} h2=${r.h2} h3=${r.h3}  img=${r.imgs} noAlt=${r.imgsMissingAlt}  robots="${r.robots}"  viewport="${r.viewport}"  links=${r.links} tel=${r.tel} mailto=${r.mailto} http=${r.httpLinks.length} capelli=${r.externalCapelli.length}  ${r.landmarks} skip=${r.skip}  ${bad.length ? 'FAIL: ' + bad.join(' | ') : 'OK'}`);
    if (r.httpLinks.length) report.push(`   http links: ${r.httpLinks.join(', ')}`);
    await p.screenshot({ path: path.join(shots, `${page.replace('.html', '')}-${w}.png`), fullPage: true });
    await ctx.close();
  }
}
await browser.close();
console.log(report.join('\n'));
console.log(failures ? `\n${failures} FAILURE(S)` : '\nALL CHECKS PASSED');
process.exit(failures ? 1 : 0);
