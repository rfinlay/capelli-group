// Performance measurement for the preview pages. Run: node scripts/perf.mjs [page.html ...]
// Reports, per page and viewport width: HTML bytes on disk, request count, encoded transfer bytes
// (from the CDP Network domain, so compressed sizes), cumulative layout shift, and time to network idle.
// Each configuration is loaded RUNS times and the median is reported.
import { chromium } from '/opt/homebrew/lib/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['index.html', 'findings.html'];
const widths = [375, 1440];
const RUNS = 3;
// THROTTLE=1 emulates Fast 3G (1.6 Mbps down, 750 kbps up, 150 ms RTT) so the web fonts always
// arrive after first paint. That makes CLS from the font swap deterministic instead of a race.
const THROTTLE = process.env.THROTTLE === '1';
const median = a => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

const browser = await chromium.launch();
const rows = [];
for (const page of pages) {
  const file = path.join(root, page);
  const htmlBytes = fs.statSync(file).size;
  for (const w of widths) {
    const samples = [];
    for (let i = 0; i < RUNS; i++) {
      // Fresh context every run so nothing is served from cache.
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
      const p = await ctx.newPage();
      const cdp = await ctx.newCDPSession(p);
      await cdp.send('Network.enable');
      if (THROTTLE) await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
      const reqs = new Map();
      let transfer = 0;
      cdp.on('Network.requestWillBeSent', e => reqs.set(e.requestId, e.request.url));
      // Only count network responses; the file:// document itself is added from its size on disk.
      cdp.on('Network.loadingFinished', e => { if (!(reqs.get(e.requestId) || '').startsWith('file:')) transfer += e.encodedDataLength || 0; });
      await p.addInitScript(() => {
        window.__cls = 0; window.__shifts = [];
        new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) {
          window.__cls += e.value;
          const desc = n => n && n.nodeType === 1 ? n.tagName.toLowerCase() + (n.className && typeof n.className === 'string' ? '.' + n.className.trim().split(/\s+/).slice(0, 2).join('.') : '') : String(n);
          window.__shifts.push({ value: +e.value.toFixed(4), t: Math.round(e.startTime), nodes: (e.sources || []).slice(0, 3).map(s => desc(s.node)) });
        } }).observe({ type: 'layout-shift', buffered: true });
      });
      const t0 = Date.now();
      await p.goto('file://' + file, { waitUntil: 'networkidle' });
      const idle = Date.now() - t0;
      await p.waitForTimeout(500);
      const cls = await p.evaluate(() => window.__cls);
      const shifts = await p.evaluate(() => window.__shifts.sort((a, b) => b.value - a.value).slice(0, 3));
      const fcp = await p.evaluate(() => Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? -1));
      const fontsLoaded = await p.evaluate(() => document.fonts.status === 'loaded' && [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight} ${f.style}`).join(', '));
      const urls = [...reqs.values()].filter(u => !u.startsWith('file:'));
      samples.push({ requests: urls.length + 1, transfer: transfer + htmlBytes, cls, idle, fcp, urls, fontsLoaded, shifts });
      await ctx.close();
    }
    const r = {
      page, width: w, htmlBytes,
      requests: median(samples.map(s => s.requests)),
      transferBytes: median(samples.map(s => s.transfer)),
      cls: +median(samples.map(s => s.cls)).toFixed(4),
      fcpMs: median(samples.map(s => s.fcp)),
      networkIdleMs: median(samples.map(s => s.idle)),
    };
    rows.push(r);
    console.log(`${page} @${w}px${THROTTLE ? ' [Fast 3G]' : ''}  html=${htmlBytes}B  requests=${r.requests}  transfer=${r.transferBytes}B  CLS=${r.cls}  FCP=${r.fcpMs}ms  networkIdle=${r.networkIdleMs}ms  (median of ${RUNS})`);
    console.log(`   external: ${samples[0].urls.map(u => u.replace(/^https:\/\//, '').slice(0, 90)).join('\n             ')}`);
    console.log(`   fonts loaded: ${samples[0].fontsLoaded || 'none'}`);
    const worst = samples.reduce((a, b) => (b.cls > a.cls ? b : a));
    if (worst.shifts.length) console.log(`   largest shifts (worst run): ${worst.shifts.map(s => `${s.value} @${s.t}ms [${s.nodes.join(', ')}]`).join('; ')}`);
  }
}
await browser.close();
