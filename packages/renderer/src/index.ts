import type { DesignDocument, SceneNode } from '@llm-design-engine/core';

export interface PreviewBundle {
  html: string;
  css: string;
  svg: string;
  width: number;
  height: number;
}

export interface ScreenshotRequest {
  html: string;
  outputFile: string;
  width?: number;
  height?: number;
}

export type ScreenshotRunner = (request: ScreenshotRequest) => Promise<void>;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);
}

function nodeStyle(node: SceneNode): string {
  return `left:${node.x}px;top:${node.y}px;width:${node.width}px;height:${node.height}px;`;
}

function renderHtmlNode(node: SceneNode): string {
  const style = nodeStyle(node);
  if (node.kind === 'text') {
    return `<div class="scene-node scene-text" data-node="${escapeHtml(node.id)}" style="${style}font-family:var(--font-${node.fontRole});font-size:${node.size}px;font-weight:${node.weight};color:${node.color};text-align:${node.align ?? 'start'}">${escapeHtml(node.text)}</div>`;
  }
  if (node.kind === 'frame') {
    return `<div class="scene-node scene-frame" data-node="${escapeHtml(node.id)}" style="${style}background:${node.fill};${node.stroke ? `border:1px solid ${node.stroke};` : ''}${node.radius ? `border-radius:${node.radius}px;` : ''}"></div>`;
  }
  if (node.kind === 'shape') {
    return `<div class="scene-node scene-shape ${node.shape}" data-node="${escapeHtml(node.id)}" style="${style}background:${node.fill};${node.stroke ? `border:${node.strokeWidth ?? 1}px solid ${node.stroke};` : ''}${node.radius ? `border-radius:${node.radius}px;` : ''}"></div>`;
  }
  if (node.kind === 'line') {
    return `<div class="scene-node scene-line" data-node="${escapeHtml(node.id)}" style="left:${node.x}px;top:${node.y}px;width:${node.x2 - node.x}px;border-top:${node.strokeWidth}px ${node.dash ? 'dashed' : 'solid'} ${node.stroke};"></div>`;
  }
  if (node.kind === 'metric') {
    return `<div class="scene-node scene-metric" data-node="${escapeHtml(node.id)}" style="${style}"><strong>${escapeHtml(node.value)}</strong><span>${escapeHtml(node.caption)}</span>${node.trend ? `<em>${escapeHtml(node.trend)}</em>` : ''}</div>`;
  }
  if (node.kind === 'annotation') {
    return `<div class="scene-node scene-annotation" data-node="${escapeHtml(node.id)}" style="${style}">${escapeHtml(node.text)}</div>`;
  }
  return `<div class="scene-node scene-image" data-node="${escapeHtml(node.id)}" style="${style}" role="img" aria-label="${escapeHtml(node.alt)}">${escapeHtml(node.assetId)}</div>`;
}

function renderSvgNode(node: SceneNode): string {
  if (node.kind === 'text') {
    const anchor = node.align === 'center' ? 'middle' : node.align === 'end' ? 'end' : 'start';
    const x = node.align === 'center' ? node.x + node.width / 2 : node.align === 'end' ? node.x + node.width : node.x;
    return `<text x="${x}" y="${node.y + node.size}" fill="${node.color}" font-family="${escapeHtml(node.fontRole)}" font-size="${node.size}" font-weight="${node.weight}" text-anchor="${anchor}">${escapeHtml(node.text)}</text>`;
  }
  if (node.kind === 'frame') return `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" fill="${node.fill}"${node.stroke ? ` stroke="${node.stroke}"` : ''}${node.radius ? ` rx="${node.radius}"` : ''}/>`;
  if (node.kind === 'shape') {
    if (node.shape === 'circle') return `<circle cx="${node.x + node.width / 2}" cy="${node.y + node.height / 2}" r="${Math.min(node.width, node.height) / 2}" fill="${node.fill}"${node.stroke ? ` stroke="${node.stroke}" stroke-width="${node.strokeWidth ?? 1}"` : ''}/>`;
    return `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" fill="${node.fill}"${node.stroke ? ` stroke="${node.stroke}" stroke-width="${node.strokeWidth ?? 1}"` : ''}${node.radius ? ` rx="${node.radius}"` : ''}/>`;
  }
  if (node.kind === 'line') return `<line x1="${node.x}" y1="${node.y}" x2="${node.x2}" y2="${node.y2}" stroke="${node.stroke}" stroke-width="${node.strokeWidth}"${node.dash ? ` stroke-dasharray="${node.dash}"` : ''}/>`;
  if (node.kind === 'metric') return `<text x="${node.x}" y="${node.y + 24}" fill="currentColor" font-family="mono" font-size="24">${escapeHtml(node.value)} ${escapeHtml(node.caption)}</text>`;
  if (node.kind === 'annotation') return `<text x="${node.x}" y="${node.y + 18}" fill="currentColor" font-family="mono" font-size="14">${escapeHtml(node.text)}</text>`;
  return `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}" fill="none" stroke="currentColor" stroke-dasharray="6 6" aria-label="${escapeHtml(node.alt)}"/>`;
}

export function renderDesignToSvg(design: DesignDocument): string {
  const nodes = design.scene.nodes.map(renderSvgNode).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${design.scene.width} ${design.scene.height}" role="img" aria-label="${escapeHtml(design.narrative)}"><rect width="100%" height="100%" fill="${design.colors.background}"/>${nodes}</svg>`;
}

export function renderDesignToCss(design: DesignDocument): string {
  return `:root{--surface:${design.colors.background};--ink:${design.colors.foreground};--accent:${design.colors.accent};--muted:${design.colors.muted};--font-display:${JSON.stringify(design.typography.display)};--font-body:${JSON.stringify(design.typography.body)};--font-mono:${JSON.stringify(design.typography.mono)}}*{box-sizing:border-box}body{margin:0;background:var(--surface);color:var(--ink);font-family:var(--font-body);-webkit-font-smoothing:antialiased}.preview-shell{min-height:100vh;padding:24px}.scene{position:relative;max-width:1440px;margin:0 auto;overflow:hidden;background:var(--surface);aspect-ratio:${design.scene.width}/${design.scene.height}}.scene-node{position:absolute}.scene-frame{overflow:hidden}.scene-line{height:0}.scene-metric{display:flex;flex-direction:column;gap:8px;font-family:var(--font-mono)}.scene-metric strong{font-size:32px}.scene-metric span,.scene-metric em{font-size:12px}.scene-annotation{font-family:var(--font-mono);font-size:14px;line-height:1.45;padding:12px;border-left:2px solid var(--accent)}.scene-image{display:grid;place-items:center;color:var(--accent);font-family:var(--font-mono);border:1px dashed var(--accent)}@media(max-width:720px){.preview-shell{padding:12px}.scene{min-height:600px;aspect-ratio:auto;transform-origin:top left;scale:.7;margin-bottom:-180px}.scene-node{max-width:90%}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}`;
}

export function renderDesignToHtml(design: DesignDocument): string {
  const nodes = design.scene.nodes.map(renderHtmlNode).join('\n');
  const css = renderDesignToCss(design);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(design.concept)} preview</title><style>${css}</style></head><body><main class="preview-shell"><section class="scene" data-design="${escapeHtml(design.id)}" aria-label="${escapeHtml(design.narrative)}">${nodes}</section></main></body></html>`;
}

export function renderPreviewBundle(design: DesignDocument): PreviewBundle {
  return { html: renderDesignToHtml(design), css: renderDesignToCss(design), svg: renderDesignToSvg(design), width: design.scene.width, height: design.scene.height };
}

export async function runScreenshot(request: ScreenshotRequest, runner: ScreenshotRunner): Promise<void> {
  await runner(request);
}
