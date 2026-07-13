---
id: gastroops-direction-1-design
route: /
concept: professional-kitchen-control-room
status: approved
---

# Narrative

Steel worktops, kitchen tickets, station markings, and pass lighting keep the next handoff visible when service accelerates.

# Composition

## Hero

- id: hero
- height: 76svh
- layout: low command rail with station columns and a lit pass horizon
- focal-point: the pass surface where the next handoff becomes undeniable
- alignment: bottom-left
- signal
- working surface
- evidence
- handoff

## Evidence

- id: evidence
- height: auto
- layout: annotated field notes with one dominant specimen
- focal-point: domain-specific evidence
- alignment: left
- never repeat identical cards
- keep the visual route visible

## Handoff

- id: handoff
- height: 68svh
- layout: quiet instruction rail
- focal-point: the next executable move
- alignment: right
- end with an instruction, not a decoration

# Visual language

- blackened steel
- printed kitchen tickets
- warm pass lighting
- scratched stainless worktops
- keyword: a kitchen control room at the pass
- keyword: station markers move like tickets through a live pass without losing their origin
- keyword: blackened steel field with warm pass amber and one coral exception

# Avoid

- generic split hero
- purple gradients
- glassmorphism
- dashboard mockups
- unrelated abstract blobs

<!-- lde-data
{
  "id": "gastroops-direction-1-design",
  "route": "/",
  "concept": "professional-kitchen-control-room",
  "status": "approved",
  "directionId": "gastroops-direction-1",
  "narrative": "Steel worktops, kitchen tickets, station markings, and pass lighting keep the next handoff visible when service accelerates.",
  "composition": {
    "sections": [
      {
        "id": "hero",
        "title": "Hero",
        "height": "76svh",
        "layout": "low command rail with station columns and a lit pass horizon",
        "focalPoint": "the pass surface where the next handoff becomes undeniable",
        "alignment": "bottom-left",
        "rules": [
          "signal",
          "working surface",
          "evidence",
          "handoff"
        ]
      },
      {
        "id": "evidence",
        "title": "Evidence",
        "height": "auto",
        "layout": "annotated field notes with one dominant specimen",
        "focalPoint": "domain-specific evidence",
        "alignment": "left",
        "rules": [
          "never repeat identical cards",
          "keep the visual route visible"
        ]
      },
      {
        "id": "handoff",
        "title": "Handoff",
        "height": "68svh",
        "layout": "quiet instruction rail",
        "focalPoint": "the next executable move",
        "alignment": "right",
        "rules": [
          "end with an instruction, not a decoration"
        ]
      }
    ]
  },
  "visualLanguage": {
    "materials": [
      "blackened steel",
      "printed kitchen tickets",
      "warm pass lighting",
      "scratched stainless worktops"
    ],
    "keywords": [
      "a kitchen control room at the pass",
      "station markers move like tickets through a live pass without losing their origin",
      "blackened steel field with warm pass amber and one coral exception"
    ]
  },
  "typography": {
    "display": "condensed shift-board numerals with stamped ticket annotations",
    "body": "humanist sans for explanations",
    "mono": "compact mono for measurements and labels"
  },
  "colors": {
    "background": "#f3efe7",
    "foreground": "#171716",
    "accent": "#d06b4b",
    "muted": "#d9d0c2",
    "secondary": "#2f7770"
  },
  "responsive": {
    "mobile": [
      "stack the working surface",
      "move annotations below their anchors",
      "preserve route markers as a vertical spine"
    ],
    "tablet": [
      "reduce scene overlap",
      "keep the focal surface at 100% width"
    ]
  },
  "scene": {
    "width": 1440,
    "height": 980,
    "nodes": [
      {
        "id": "hero-frame",
        "kind": "frame",
        "x": 48,
        "y": 72,
        "width": 1344,
        "height": 640,
        "fill": "#171716",
        "stroke": "#d9d0c2",
        "radius": 8,
        "children": [
          "hero-kicker",
          "hero-title",
          "hero-route"
        ]
      },
      {
        "id": "hero-kicker",
        "kind": "text",
        "x": 96,
        "y": 112,
        "width": 420,
        "height": 32,
        "text": "PROFESSIONAL KITCHEN CONTROL ROOM",
        "fontRole": "mono",
        "size": 14,
        "weight": 600,
        "color": "#d06b4b",
        "align": "start"
      },
      {
        "id": "hero-title",
        "kind": "text",
        "x": 96,
        "y": 184,
        "width": 720,
        "height": 170,
        "text": "a kitchen control room at the pass",
        "fontRole": "display",
        "size": 72,
        "weight": 700,
        "color": "#f3efe7",
        "align": "start"
      },
      {
        "id": "hero-route",
        "kind": "line",
        "x": 96,
        "y": 570,
        "width": 1140,
        "height": 0,
        "x2": 1224,
        "y2": 570,
        "stroke": "#d06b4b",
        "strokeWidth": 3,
        "dash": "12 12"
      },
      {
        "id": "note",
        "kind": "annotation",
        "x": 940,
        "y": 180,
        "width": 330,
        "height": 120,
        "text": "Steel worktops, kitchen tickets, station markings, and pass lighting keep the next handoff visible when service accelerates.",
        "anchor": "hero-title"
      }
    ]
  },
  "motion": {
    "principles": [
      "marks draw on like a plotter",
      "annotations arrive after their anchor",
      "handoff moves with measured weight"
    ],
    "reducedMotion": [
      "remove drawing motion and retain the final marks"
    ]
  },
  "assets": [
    {
      "id": "hero-material",
      "role": "hero material study",
      "prompt": "A tactile study of blackened steel, printed kitchen tickets, warm pass lighting, scratched stainless worktops arranged around a kitchen control room at the pass; no UI, no text",
      "negativeConstraints": [
        "stock photography",
        "glowing gradients",
        "generic technology imagery"
      ],
      "aspectRatio": "4:3",
      "intendedPlacement": "hero working surface"
    }
  ],
  "forbiddenPatterns": [
    "generic split hero",
    "purple gradients",
    "glassmorphism",
    "dashboard mockups",
    "unrelated abstract blobs"
  ],
  "agentInstructions": [
    "Build the page from the a kitchen control room at the pass metaphor, not from a generic SaaS layout.",
    "Use low command rail with station columns and a lit pass horizon.",
    "Make kitchen pass, station marking, temperature log visible as domain evidence.",
    "Keep rounded containers rare and functional.",
    "Preserve the route from meaning to handoff in responsive layouts."
  ],
  "generatedAt": "2026-07-13T10:42:29.297Z"
}
-->
