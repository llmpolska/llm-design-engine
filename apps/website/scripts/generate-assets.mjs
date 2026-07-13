import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const output = join(root, '..', 'public', 'static');
const colors = { paper: '#f3efe7', paperDeep: '#e7dfd3', ink: '#171716', coral: '#d06b4b', teal: '#2f7770', muted: '#c9bfb1' };
const mark = (label, width = 900, height = 620) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${colors.paperDeep}"/><path d="M70 90h220M70 90v170M${width - 70} ${height - 90}H${width - 290}M${width - 70} ${height - 90}V${height - 260}" fill="none" stroke="${colors.ink}" stroke-width="3"/><path d="M110 ${height - 150}h${width - 220}" stroke="${colors.coral}" stroke-width="8"/><text x="110" y="${Math.round(height / 2)}" font-family="Arial Narrow, sans-serif" font-size="58" font-weight="700" fill="${colors.ink}" letter-spacing="-3">${label}</text><text x="110" y="${height - 78}" font-family="monospace" font-size="14" fill="${colors.teal}" letter-spacing="4">MEANING / METAPHOR / SPECIFICATION</text></svg>`;
const assets = {
  'hero-foundry.svg': mark('RAW MEANING / READY TO CAST'),
  'blueprint.svg': mark('SCENE GRAPH / HERO'),
  'brandkit.svg': mark('PRESS MARK / SYSTEM'),
  'gastroops.svg': mark('LESS DASHBOARD. MORE HANDOFF.'),
  'open-graph.svg': mark('LLM DESIGN ENGINE', 1200, 630),
  'repository-banner.svg': mark('LLM DESIGN ENGINE', 1600, 460),
  'favicon.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#f3efe7"/><path d="M12 20V12h12M52 20V12H40M12 44v8h12M52 44v8H40" fill="none" stroke="#171716" stroke-width="5"/><path d="M20 32h24" stroke="#d06b4b" stroke-width="5"/><circle cx="32" cy="32" r="4" fill="#2f7770"/></svg>',
  'app-icon.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="32" fill="#171716"/><path d="M96 172V96h76M416 172V96h-76M96 340v76h76M416 340v76h-76" fill="none" stroke="#f3efe7" stroke-width="24"/><path d="M160 256h192" stroke="#d06b4b" stroke-width="24"/><circle cx="256" cy="256" r="18" fill="#2f7770"/></svg>',
};
await mkdir(output, { recursive: true });
for (const [name, content] of Object.entries(assets)) await writeFile(join(output, name), `${content}\n`);
console.log(`Generated ${Object.keys(assets).length} deterministic SVG assets in ${output}`);
