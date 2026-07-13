# Brandkit

Every project receives a brandkit, even when image generation is disabled. The point is to give implementation agents a coherent identity instead of a loose palette.

## Required sections

`BRAND.md` and `brandkit.json` cover brand narrative, personality, tone of voice, naming rationale, logo/wordmark/symbol directions, color roles, typography roles, spacing, shape language, iconography, illustration, photography, motion, favicon, social preview, image prompts, usage rules, and misuse rules.

## Local assets

The deterministic generator writes:

- `assets/press-mark.svg` — project mark concept.
- `assets/tokens.css` — CSS custom properties for color, type, radius, and spacing.
- `assets/manifest.json` — generated asset provenance.
- `assets/*.svg` — intentional mock/disabled image placeholders.

## Identity rules

A brandkit must explain why its mark, materials, and typography belong to the project. LLM Design Engine itself uses a press mark: offset registration brackets enclosing a cut line. It communicates transformation and precision without a sparkle, wand, robot, brain, or gradient infinity symbol.

## Image prompts

Prompts are derived from the approved direction. Each prompt states its role, intended placement, aspect ratio, and negative constraints. “Beautiful modern SaaS website” is not an acceptable prompt.
