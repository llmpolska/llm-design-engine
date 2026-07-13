# Providers

Providers are replaceable adapters behind stable interfaces. The default path is local and deterministic.

## ReasoningProvider

```ts
interface ReasoningProvider {
  analyzeBrief(input: ProjectBrief): Promise<ProductInterpretation>;
  generateDirections(interpretation: ProductInterpretation): Promise<CreativeDirection[]>;
  generateDesign(direction: CreativeDirection): Promise<DesignDocument>;
  refineDesign(design: DesignDocument, feedback: string): Promise<DesignDocument>;
}
```

`MockReasoningProvider` derives distinct material/composition families from the brief. `OpenAIReasoningProvider` sends a structured task to an OpenAI-compatible `/chat/completions` endpoint and parses JSON content. Configure it with `LDE_REASONING_ENDPOINT`, `LDE_REASONING_MODEL`, and `LDE_REASONING_API_KEY`.

The system prompt forbids imitation of named companies, living designers, and existing websites. The provider must return domain-specific reasoning, not a theme name.

## ImageProvider

`ImageProvider.generate` and `refine` return asset provenance: role, prompt, negative constraints, aspect ratio, placement, file, provider, model, and timestamp. `DisabledImageProvider` returns intentional local SVG placeholders. `MockImageProvider` returns deterministic SVG content. `OpenAIImageProvider` uses an OpenAI-compatible `/images/generations` endpoint when configured.

## Failure behavior

Missing credentials never block `init`, `brief`, `directions`, `generate`, `preview`, `brandkit`, `lint`, or `export`. Network or provider errors are explicit; no silent fallback is performed unless mock/disabled mode is selected.
