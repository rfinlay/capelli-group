// Accessibility and content audit for the preview pages. Run: node scripts/audit.mjs [page.html ...]
// Measures, on the rendered page: text contrast against the resolved background, tap-target sizes for
// links and buttons, readability with JavaScript disabled, print page count, and prose rules
// (no em dashes, no retired crisis number, no AI-tell verbs).
import { chromium } from '/opt/homebrew/lib/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['index.html', 'findings.html'];
const browser = await chromium.launch();
let failures = 0;

for (const page of pages) {
  const file = 'file://' + path.join(root, page);
  console.log(`\n=== ${page}`);

  // ---- prose rules on the source (covers attributes and hidden text too)
  const src = fs.readFileSync(path.join(root, page), 'utf8');
  const tells = src.match(/\b(leverage|spearhead|utilize|robust|seamless|delve|tapestry|testament)\w*/gi) || [];
  const retired = (src.match(/273[\s.-]?8255/g) || []).length;
  // A page that documents the retirement of the old crisis number has to print it. It declares that with
  // an "audit: allow-retired-number" comment; the count is still reported, it just does not fail the run.
  const retiredAllowed = /<!--\s*audit:\s*allow-retired-number\b/.test(src);
  const emDash = (src.match(/—/g) || []).length;
  console.log(`prose: em dashes=${emDash}  retired number=${retired}${retired && retiredAllowed ? ' (allowed by page marker)' : ''}  AI-tell verbs=${tells.length}${tells.length ? ' (' + tells.join(', ') + ')' : ''}`);
  if (emDash || (retired && !retiredAllowed) || tells.length) failures++;

  for (const w of [375, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    await p.goto(file, { waitUntil: 'networkidle' });
    await p.waitForTimeout(300);
    // Force any scroll-reveal content visible so geometry is measured, and render content-visibility sections.
    await p.evaluate(async () => { document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); window.scrollTo(0, document.body.scrollHeight); await new Promise(r => setTimeout(r, 300)); window.scrollTo(0, 0); });

    const r = await p.evaluate(() => {
      const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
      const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); };
      const parse = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(',').map(Number); return { rgb: v.slice(0, 3), a: v.length > 3 ? v[3] : 1 }; };
      const blend = (top, under) => top.rgb.map((c, i) => Math.round(c * top.a + under[i] * (1 - top.a)));
      // Resolve the background under an element by walking up, compositing alpha layers, and
      // approximating gradients with the darkest and lightest stop (report both).
      const bgOf = el => {
        let node = el; const layers = [];
        while (node && node !== document.documentElement) {
          const cs = getComputedStyle(node);
          const img = cs.backgroundImage;
          if (img && img !== 'none') {
            const stops = [...img.matchAll(/rgba?\([^)]+\)/g)].map(m => parse(m[0])).filter(s => s && s.a > 0.5);
            if (stops.length) { layers.push({ gradient: stops.map(s => s.rgb) }); }
          }
          const bg = parse(cs.backgroundColor);
          if (bg && bg.a > 0) { layers.push(bg); if (bg.a >= 1) break; }
          node = node.parentElement;
        }
        let base = [255, 255, 255];
        let variants = [base];
        for (const l of layers.reverse()) {
          if (l.gradient) variants = l.gradient.map(g => g);
          else if (l.a >= 1) variants = [l.rgb];
          else variants = variants.map(v => blend(l, v));
        }
        return variants;
      };
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const seen = new Map(); let n;
      while ((n = walker.nextNode())) {
        const t = n.textContent.trim(); if (!t) continue;
        const el = n.parentElement; if (!el) continue;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
        const rect = el.getBoundingClientRect(); if (!rect.width || !rect.height) continue;
        const fg = parse(cs.color); if (!fg) continue;
        const size = parseFloat(cs.fontSize), weight = parseInt(cs.fontWeight, 10);
        const large = size >= 24 || (size >= 18.66 && weight >= 700);
        const bgs = bgOf(el);
        const ratios = bgs.map(b => ratio(fg.rgb, b));
        const worst = Math.min(...ratios);
        const key = [cs.color, bgs.map(b => b.join('/')).join('|'), large].join(' ');
        const sel = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '');
        if (!seen.has(key) || seen.get(key).worst > worst) seen.set(key, { sel, text: t.slice(0, 40), fg: cs.color, bg: bgs.map(b => `rgb(${b.join(',')})`).join(' | '), size, weight, large, worst: +worst.toFixed(2), need: large ? 3 : 4.5 });
      }
      const contrast = [...seen.values()].sort((a, b) => a.worst - b.worst);
      // Tap targets: every link and button that is visible. Inline links inside running text are flagged separately.
      const targets = [...document.querySelectorAll('a[href], button')].map(el => {
        const cs = getComputedStyle(el); const rect = el.getBoundingClientRect();
        if (cs.display === 'none' || !rect.width || !rect.height) return null;
        const inline = cs.display === 'inline';
        return { sel: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).trim().split(/\s+/).join('.') : ''), text: (el.textContent || '').trim().slice(0, 30), w: Math.round(rect.width), h: Math.round(rect.height), inline };
      }).filter(Boolean);
      const small = targets.filter(t => t.h < 44 || t.w < 44);
      return { contrast, targets: targets.length, small };
    });

    const fails = r.contrast.filter(c => c.worst < c.need);
    console.log(`@${w}px contrast: ${r.contrast.length} distinct text/background pairs, lowest ${r.contrast[0].worst}:1 (${r.contrast[0].sel} "${r.contrast[0].text}" ${r.contrast[0].fg} on ${r.contrast[0].bg}), ${fails.length} below WCAG AA`);
    for (const c of r.contrast.slice(0, 6)) console.log(`   ${c.worst.toFixed(2)}:1 need ${c.need}  ${c.sel} ${c.size}px/${c.weight} "${c.text}"  ${c.fg} on ${c.bg}`);
    for (const c of fails) console.log(`   FAIL ${c.worst}:1 need ${c.need}  ${c.sel} "${c.text}" ${c.fg} on ${c.bg}`);
    if (fails.length) failures++;
    const smallBlock = r.small.filter(t => !t.inline);
    console.log(`@${w}px tap targets: ${r.targets} links/buttons, ${smallBlock.length} block-level under 44px, ${r.small.length - smallBlock.length} inline text links under 44px`);
    for (const t of smallBlock) console.log(`   small: ${t.sel} "${t.text}" ${t.w}x${t.h}`);
    for (const t of r.small.filter(t => t.inline)) console.log(`   inline: ${t.sel} "${t.text}" ${t.w}x${t.h}`);
    await ctx.close();
  }

  // ---- JavaScript disabled: nav visible, menu button hidden, no section hidden or transparent
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 800 }, javaScriptEnabled: false });
    const p = await ctx.newPage();
    await p.goto(file, { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => {
      const vis = el => { const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > .99 && b.height > 0; };
      const sections = [...document.querySelectorAll('main > section, header, footer')];
      const nav = document.querySelector('nav');
      const menuBtn = document.querySelector('.menu-btn');
      return { js: document.documentElement.classList.contains('js'), navVisible: nav ? vis(nav) : null, menuBtnVisible: menuBtn ? vis(menuBtn) : null, sections: sections.length, hidden: sections.filter(s => !vis(s)).length, tel: document.querySelectorAll('a[href^="tel:"]').length, hiddenReveal: [...document.querySelectorAll('.reveal')].filter(e => !vis(e)).length };
    });
    const ok = !r.js && r.hidden === 0 && (r.navVisible !== false) && (r.menuBtnVisible !== true) && r.hiddenReveal === 0;
    console.log(`JS disabled: js class=${r.js} navVisible=${r.navVisible} menuBtnVisible=${r.menuBtnVisible} sectionsHidden=${r.hidden}/${r.sections} telLinks=${r.tel} ${ok ? 'OK' : 'FAIL'}`);
    if (!ok) failures++;
    await ctx.close();
  }

  // ---- print: page count on US Letter, and whether the phone and provider number appear in the printed text
  {
    const ctx = await browser.newContext();
    const p = await ctx.newPage();
    await p.goto(file, { waitUntil: 'networkidle' });
    await p.emulateMedia({ media: 'print' });
    const printed = await p.evaluate(() => document.body.innerText);
    const pdf = await p.pdf({ format: 'Letter', printBackground: false });
    const pagesN = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log(`print: ${pagesN} Letter pages, phone in printed text=${/915-799-0614/.test(printed)}, provider number=${/071-021/.test(printed)}, 988=${/988/.test(printed)}`);
    fs.writeFileSync(path.join(root, 'scripts', 'shots', page.replace('.html', '') + '-print.pdf'), pdf);
    await ctx.close();
  }
}
await browser.close();
console.log(failures ? `\n${failures} FAILURE(S)` : '\nALL AUDIT CHECKS PASSED');
process.exit(failures ? 1 : 0);
