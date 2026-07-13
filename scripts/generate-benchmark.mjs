import { mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const load = async (packageName) =>
  import(pathToFileURL(join(root, 'packages', packageName, 'dist', 'index.js')).href);
const { MockReasoningProvider } = await load('creative-director');
const { serializeDesignMarkdown } = await load('design-format');
const { renderDesignToHtml, renderDesignToSvg } = await load('renderer');
const { lintDesign } = await load('anti-slop');

const briefs = [
  {
    slug: 'restaurant-operations',
    name: 'Service Ledger',
    domain: 'restaurant operations',
    summary:
      'Coordinate tasks, food safety, inventory, documentation, and shift handoffs during service.',
    users: ['kitchen leads', 'shift managers'],
    jobs: ['coordinate service', 'confirm safety'],
    tension: 'Keep control when service accelerates',
  },
  {
    slug: 'developer-infrastructure',
    name: 'Deploy Field',
    domain: 'developer infrastructure',
    summary:
      'Make deploy health, ownership, and rollback evidence legible across a changing infrastructure.',
    users: ['platform engineers', 'on-call developers'],
    jobs: ['trace deploys', 'recover incidents'],
    tension: 'Decide what is safe to change under pressure',
  },
  {
    slug: 'boutique-hotel',
    name: 'House Rhythm',
    domain: 'boutique hotel operations',
    summary:
      'Coordinate rooms, guest requests, maintenance, and arrivals without losing the character of the house.',
    users: ['front desk leads', 'house managers'],
    jobs: ['orchestrate arrivals', 'resolve requests'],
    tension: 'Stay attentive while many small promises move at once',
  },
  {
    slug: 'educational-research',
    name: 'Study Index',
    domain: 'educational research',
    summary:
      'Organize sources, hypotheses, field notes, and review decisions into a traceable research practice.',
    users: ['researchers', 'review coordinators'],
    jobs: ['compare evidence', 'record decisions'],
    tension: 'Preserve uncertainty without losing forward motion',
  },
  {
    slug: 'industrial-logistics',
    name: 'Freight Signal',
    domain: 'industrial logistics',
    summary:
      'Synchronize loads, routes, dock timing, and exception handling across a distributed operation.',
    users: ['dispatchers', 'yard supervisors'],
    jobs: ['sequence loads', 'resolve exceptions'],
    tension: 'Keep the route trustworthy when timing slips',
  },
];

function markdownList(values) {
  return values.map((value) => `- ${value}`).join('\n');
}

function briefMarkdown(brief) {
  return [
    '# Product brief',
    brief.summary,
    '',
    '## Domain',
    brief.domain,
    '',
    '## Users',
    markdownList(brief.users),
    '',
    '## Jobs',
    markdownList(brief.jobs),
    '',
    '## Tension',
    brief.tension,
    '',
  ].join('\n');
}

function meaningMarkdown(meaning) {
  return [
    '# Product meaning',
    `- domain: ${meaning.productDomain}`,
    `- tension: ${meaning.userTension}`,
    `- emotional target: ${meaning.emotionalTarget}`,
    `- central metaphor: ${meaning.centralMetaphor}`,
    '',
    '## Evidence',
    ...meaning.evidence.map((item) => `- ${item.source}: ${item.conclusion} → ${item.consequence}`),
    '',
    '## Objects',
    markdownList(meaning.domainObjects),
    '',
    '## Materials',
    markdownList(meaning.domainMaterials),
    '',
  ].join('\n');
}

function directionMarkdown(direction) {
  return [
    '# Creative direction',
    `- id: ${direction.id}`,
    `- name: ${direction.name}`,
    `- metaphor: ${direction.metaphor}`,
    `- visual narrative: ${direction.visualNarrative}`,
    `- composition: ${direction.composition.layout}`,
    `- typography: ${direction.typographyCharacter}`,
    `- materials: ${direction.materialLanguage.join(', ')}`,
    `- interaction: ${direction.interactionConcept}`,
    '',
    '## Domain elements',
    markdownList(direction.domainElements),
    '',
    '## Avoid',
    markdownList(direction.forbiddenPatterns),
    '',
  ].join('\n');
}

function compositionMarkdown(direction) {
  const plan = direction.compositionPlan;
  return [
    '# Composition plan',
    `- opening: ${plan.opening}`,
    `- density: ${plan.informationDensity}`,
    '',
    '## Reading path',
    markdownList(plan.readingPath),
    '',
    '## Focal hierarchy',
    markdownList(plan.focalHierarchy),
    '',
    '## Sections',
    ...plan.sections.map(
      (section) =>
        `## ${section.title}\n- layout: ${section.layout}\n- focal point: ${section.focalPoint}\n${markdownList(section.rules)}`,
    ),
    '',
    '## Responsive transformations',
    markdownList(plan.responsiveTransformations),
    '',
  ].join('\n');
}

await rm(join(root, 'examples', 'benchmark'), { recursive: true, force: true });
const provider = new MockReasoningProvider(() => new Date('2026-07-13T00:00:00.000Z'));
for (const briefInput of briefs) {
  const brief = {
    ...briefInput,
    id: briefInput.slug,
    slug: briefInput.slug,
    constraints: [],
    references: [],
    createdAt: '2026-07-13T00:00:00.000Z',
    updatedAt: '2026-07-13T00:00:00.000Z',
  };
  const meaning = await provider.analyzeBrief(brief);
  const directions = (await provider.generateDirections(meaning)).slice(0, 3);
  for (const direction of directions) {
    const design = await provider.generateDesign(direction);
    const directory = join(root, 'examples', 'benchmark', briefInput.slug, direction.id);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'BRIEF.md'), briefMarkdown(brief));
    await writeFile(join(directory, 'MEANING.md'), meaningMarkdown(meaning));
    await writeFile(join(directory, 'DIRECTION.md'), directionMarkdown(direction));
    await writeFile(join(directory, 'COMPOSITION.md'), compositionMarkdown(direction));
    await writeFile(join(directory, 'landing.design.md'), serializeDesignMarkdown(design));
    await writeFile(join(directory, 'design.json'), JSON.stringify(design, null, 2));
    await writeFile(join(directory, 'preview.html'), renderDesignToHtml(design));
    await writeFile(join(directory, 'preview.svg'), renderDesignToSvg(design));
    await writeFile(join(directory, 'lint.json'), JSON.stringify(lintDesign(design), null, 2));
  }
}
console.log(`Generated ${briefs.length * 3} benchmark directions across ${briefs.length} domains.`);
