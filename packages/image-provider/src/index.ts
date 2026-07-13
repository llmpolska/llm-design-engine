import type { AssetRequirement, GeneratedAsset } from '@llm-design-engine/core';
import { nowIso } from '@llm-design-engine/shared';

export interface ImageGenerationRequest extends AssetRequirement {
  model?: string;
}

export interface ImageRefinementRequest extends ImageGenerationRequest {
  sourceAsset: GeneratedAsset;
  feedback: string;
}

export interface DirectionImageRequest {
  id: string;
  directionId: string;
  visualMetaphor: string;
  composition: string;
  typographyBehavior: string;
  materialLanguage: string[];
  colorStrategy: string;
  domainElements: string[];
  aspectRatio?: string;
  intendedPlacement?: string;
  model?: string;
}

export interface ImageProvider {
  generate(request: ImageGenerationRequest): Promise<GeneratedAsset>;
  refine(request: ImageRefinementRequest): Promise<GeneratedAsset>;
  generateDirection(request: DirectionImageRequest): Promise<GeneratedAsset>;
}

export function visualDirectionPrompt(request: DirectionImageRequest): string {
  return [
    'Sparse visual direction plate — not a final page layout.',
    `Visual metaphor: ${request.visualMetaphor}.`,
    `Composition: ${request.composition}.`,
    `Typography character: ${request.typographyBehavior}.`,
    `Material language: ${request.materialLanguage.join(', ')}.`,
    `Color behavior: ${request.colorStrategy}.`,
    `Domain-specific elements: ${request.domainElements.join(', ')}.`,
    'Show one dominant composition, one or two signature interface motifs, material/texture samples, and intentional negative space.',
    'Do not invent product copy or page architecture. Do not render navigation, feature grids, pricing, testimonials, browser chrome, or a complete landing page.',
  ].join(' ');
}

function directionAsAsset(request: DirectionImageRequest): ImageGenerationRequest {
  const asset: ImageGenerationRequest = {
    id: request.id,
    role: 'visual-direction',
    prompt: visualDirectionPrompt(request),
    negativeConstraints: [
      'finished website mockup',
      'full landing page',
      'invented copy',
      'feature grid',
      'browser chrome',
      'stock imagery',
      'named style imitation',
    ],
    aspectRatio: request.aspectRatio ?? '3:2',
    intendedPlacement:
      request.intendedPlacement ?? `.design/directions/${request.directionId}/visual-direction.svg`,
  };
  return request.model ? { ...asset, model: request.model } : asset;
}

function placeholderSvg(
  request: ImageGenerationRequest,
  background = '#f3efe7',
  accent = '#d06b4b',
): string {
  const label = request.role.replace(/[^a-z0-9 ]/gi, '').slice(0, 28);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600"><rect width="960" height="600" fill="${background}"/><path d="M80 120h220M80 150h140M80 480h800" stroke="#171716" stroke-width="8"/><path d="M580 90v420M580 90h220M580 510h220" fill="none" stroke="${accent}" stroke-width="8"/><circle cx="580" cy="300" r="36" fill="${accent}"/><text x="80" y="390" font-family="monospace" font-size="28" fill="#171716">${label}</text></svg>`;
}

function assetFromRequest(
  request: ImageGenerationRequest,
  provider: string,
  model: string,
  clock: () => Date,
  content: string,
): GeneratedAsset {
  const generatedAt = nowIso(clock);
  return {
    id: request.id,
    role: request.role,
    file: `assets/${request.id}.svg`,
    prompt: request.prompt,
    negativeConstraints: request.negativeConstraints,
    aspectRatio: request.aspectRatio,
    intendedPlacement: request.intendedPlacement,
    provider,
    model,
    generatedAt,
    content,
  };
}

export class MockImageProvider implements ImageProvider {
  private readonly clock: () => Date;
  constructor(clock: () => Date = () => new Date()) {
    this.clock = clock;
  }

  async generate(request: ImageGenerationRequest): Promise<GeneratedAsset> {
    return assetFromRequest(
      request,
      'mock',
      'deterministic-svg',
      this.clock,
      placeholderSvg(request),
    );
  }

  async refine(request: ImageRefinementRequest): Promise<GeneratedAsset> {
    return assetFromRequest(
      { ...request, prompt: `${request.prompt}. Refinement: ${request.feedback}` },
      'mock',
      'deterministic-svg',
      this.clock,
      placeholderSvg(request, '#e5ece8', '#2f7770'),
    );
  }

  async generateDirection(request: DirectionImageRequest): Promise<GeneratedAsset> {
    const asset = directionAsAsset(request);
    return assetFromRequest(
      asset,
      'mock',
      'deterministic-direction-svg',
      this.clock,
      placeholderSvg(asset, '#f3efe7', '#8b5e3c'),
    );
  }
}

export class DisabledImageProvider implements ImageProvider {
  async generate(request: ImageGenerationRequest): Promise<GeneratedAsset> {
    const asset = assetFromRequest(
      request,
      'disabled',
      'placeholder',
      () => new Date(),
      placeholderSvg(request, '#e8e1d6', '#8a7a67'),
    );
    return { ...asset, file: `assets/placeholder-${request.id}.svg` };
  }

  async refine(request: ImageRefinementRequest): Promise<GeneratedAsset> {
    return this.generate({
      ...request,
      prompt: `${request.prompt}. Refinement: ${request.feedback}`,
    });
  }

  async generateDirection(request: DirectionImageRequest): Promise<GeneratedAsset> {
    const asset = await this.generate(directionAsAsset(request));
    return {
      ...asset,
      role: 'visual-direction',
      file: `assets/placeholder-direction-${request.id}.svg`,
    };
  }
}

export interface OpenAIImageConfig {
  endpoint: string;
  model: string;
  apiKey?: string;
  fetcher?: typeof fetch;
}

export class OpenAIImageProvider implements ImageProvider {
  private readonly config: OpenAIImageConfig;

  constructor(config: OpenAIImageConfig) {
    this.config = config;
  }

  private async request(request: ImageGenerationRequest): Promise<GeneratedAsset> {
    const fetcher = this.config.fetcher ?? fetch;
    const response = await fetcher(
      `${this.config.endpoint.replace(/\/$/, '')}/images/generations`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(this.config.apiKey ? { authorization: `Bearer ${this.config.apiKey}` } : {}),
        },
        body: JSON.stringify({
          model: request.model ?? this.config.model,
          prompt: `${request.prompt}\nNegative constraints: ${request.negativeConstraints.join(', ')}`,
          size: request.aspectRatio === '1:1' ? '1024x1024' : '1536x1024',
          response_format: 'url',
        }),
      },
    );
    if (!response.ok) throw new Error(`Image provider returned ${response.status}`);
    const payload = (await response.json()) as { data?: Array<{ url?: string }> };
    const url = payload.data?.[0]?.url;
    if (!url) throw new Error('Image provider returned no asset URL');
    return assetFromRequest(
      { ...request, model: request.model ?? this.config.model },
      'openai-compatible',
      request.model ?? this.config.model,
      () => new Date(),
      url,
    );
  }

  generate(request: ImageGenerationRequest): Promise<GeneratedAsset> {
    return this.request(request);
  }

  refine(request: ImageRefinementRequest): Promise<GeneratedAsset> {
    return this.request({
      ...request,
      prompt: `${request.prompt}. Preserve the approved identity. ${request.feedback}`,
    });
  }

  generateDirection(request: DirectionImageRequest): Promise<GeneratedAsset> {
    return this.request(directionAsAsset(request));
  }
}
