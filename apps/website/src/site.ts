export interface TransformationStage {
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  code: string;
}

export const transformationStages: TransformationStage[] = [
  { label: '01 / brief', eyebrow: 'raw material', title: '“Make a calmer operations dashboard.”', body: 'A human brief with intent, constraints, and the parts that still need interpretation.', code: 'brief → context + audience + tension' },
  { label: '02 / direction', eyebrow: 'creative direction', title: 'Operational calm, held in a grid.', body: 'The engine names the visual temperature, type rhythm, material cues, and what to refuse.', code: 'direction → palette + type + motion' },
  { label: '03 / document', eyebrow: 'design document', title: 'A spec an agent can actually build.', body: 'Every decision becomes structured, lintable output with selectors, states, and assets.', code: 'document → tokens + scenes + checks' },
  { label: '04 / preview', eyebrow: 'deterministic preview', title: 'The same direction, rendered on demand.', body: 'HTML, CSS, and SVG make the approved concept visible without requiring an image model.', code: 'preview → stable screenshot + agent handoff' },
];
