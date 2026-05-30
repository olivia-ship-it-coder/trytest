import { chromium } from 'playwright-core';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

await page.goto('http://localhost:5173/concepts', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

// Click "图谱" button
await page.getByRole('button', { name: '图谱' }).click();
await page.waitForTimeout(3000);

const svgInfo = await page.evaluate(() => {
  const svg = document.querySelector('svg');
  if (!svg) return { error: 'NO SVG' };
  const allG = svg.querySelectorAll('g');
  const circles = svg.querySelectorAll('circle');
  const texts = svg.querySelectorAll('text');
  const lines = svg.querySelectorAll('line');
  return {
    svgW: svg.clientWidth,
    svgH: svg.clientHeight,
    gCount: allG.length,
    circles: circles.length,
    texts: texts.length,
    lines: lines.length,
    // Check first few circles for position
    sampleCircles: Array.from(circles).slice(0, 3).map(c => ({ cx: c.getAttribute('cx'), cy: c.getAttribute('cy'), r: c.getAttribute('r') })),
    sampleTexts: Array.from(texts).slice(0, 3).map(t => ({ content: t.textContent, x: t.getAttribute('x'), y: t.getAttribute('y') })),
  };
});
console.log(JSON.stringify(svgInfo, null, 2));

await page.screenshot({ path: '/workspace/debug-graph.png', fullPage: false });
console.log('Screenshot saved');

await browser.close();