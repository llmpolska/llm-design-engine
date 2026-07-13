import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const benchmarkRoot = join(root, 'examples', 'benchmark');
const required = [
  'BRIEF.md',
  'MEANING.md',
  'DIRECTION.md',
  'COMPOSITION.md',
  'landing.design.md',
  'design.json',
  'preview.html',
  'preview.svg',
  'lint.json',
];
const domains = await readdir(benchmarkRoot, { withFileTypes: true });
const rows = [];
for (const domain of domains.filter((entry) => entry.isDirectory())) {
  const directions = await readdir(join(benchmarkRoot, domain.name), { withFileTypes: true });
  if (directions.filter((entry) => entry.isDirectory()).length !== 3)
    throw new Error(`${domain.name} must contain exactly three directions`);
  for (const direction of directions.filter((entry) => entry.isDirectory())) {
    const directory = join(benchmarkRoot, domain.name, direction.name);
    for (const file of required) await readFile(join(directory, file));
    const design = JSON.parse(await readFile(join(directory, 'design.json'), 'utf8'));
    rows.push({
      domain: domain.name,
      direction: direction.name,
      design,
      signature: {
        sections: design.composition.sections.map((section) => section.layout).join('|'),
        focal: design.composition.sections.map((section) => section.focalPoint).join('|'),
        metaphor: design.concept,
        materials: design.visualLanguage.materials.join('|'),
        typography: JSON.stringify(design.typography),
        responsive: design.responsive.mobile.join('|'),
        opening: design.sceneGraph?.opening ?? design.composition.sections[0]?.layout ?? '',
      },
    });
  }
}

const fields = [
  'sections',
  'focal',
  'metaphor',
  'materials',
  'typography',
  'responsive',
  'opening',
];
const comparisons = [];
for (const domain of domains.filter((entry) => entry.isDirectory()).map((entry) => entry.name)) {
  const group = rows.filter((row) => row.domain === domain);
  for (let left = 0; left < group.length; left += 1) {
    for (let right = left + 1; right < group.length; right += 1) {
      const differing = fields.filter(
        (field) => group[left].signature[field] !== group[right].signature[field],
      );
      if (differing.length < 4)
        throw new Error(
          `${domain}: ${group[left].direction} and ${group[right].direction} differ in only ${differing.length} structural dimensions (${differing.join(', ')})`,
        );
      comparisons.push({
        domain,
        left: group[left].direction,
        right: group[right].direction,
        differing,
      });
    }
  }
}
console.log(
  `Benchmark valid: ${rows.length} directions, ${comparisons.length} pairwise comparisons.`,
);
console.log(`Dimensions checked: ${fields.join(', ')}.`);
