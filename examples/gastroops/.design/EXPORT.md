# LLM Design Engine export

Project: gastroops-direction-1-design

## Agent implementation instructions

- Build the page from the a kitchen control room at the pass metaphor, not from a generic SaaS layout.
- Use low command rail with station columns and a lit pass horizon.
- Make kitchen pass, station marking, temperature log visible as domain evidence.
- Keep rounded containers rare and functional.
- Preserve the route from meaning to handoff in responsive layouts.

## Approved design document

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

## Source artifacts

### BRIEF.md

---

id: gastroops
name: GastroOps
domain: restaurant operations
---

# Product brief

Operational system for restaurants covering tasks, food safety, inventory, documentation, staff operations, and synchronization status.

## Users

## Jobs

## Tension

Keep control during the pressure of service without hiding the next handoff.

## Constraints

- None recorded.

<!-- lde-brief-data
{
  "id": "gastroops",
  "slug": "gastroops",
  "name": "GastroOps",
  "summary": "Operational system for restaurants covering tasks, food safety, inventory, documentation, staff operations, and synchronization status.",
  "domain": "restaurant operations",
  "users": [],
  "jobs": [],
  "tension": "Keep control during the pressure of service without hiding the next handoff.",
  "constraints": [],
  "references": [],
  "createdAt": "2026-07-13T10:41:46.904Z",
  "updatedAt": "2026-07-13T10:41:46.904Z"
}
-->

### DIRECTIONS.md

---

project: gastroops
count: 4
---

# Creative directions

Each direction is a different metaphor, material, composition, and interaction concept. Mode changes are not counted as direction changes.

## 1. Professional Kitchen Control Room

- id: gastroops-direction-1
- metaphor: a kitchen control room at the pass
- narrative: Steel worktops, kitchen tickets, station markings, and pass lighting keep the next handoff visible when service accelerates.
- composition: low command rail with station columns and a lit pass horizon
- typography: condensed shift-board numerals with stamped ticket annotations
- materials: blackened steel, printed kitchen tickets, warm pass lighting, scratched stainless worktops
- interaction: station markers move like tickets through a live pass without losing their origin
- domain-elements: restaurant, operations, operational, system, restaurants
- avoid: generic split hero without a domain narrative; purple gradients or decorative glow; glassmorphism and floating dashboard mockups; repetitive three-column feature grids; visual elements that could replace the restaurant operations context unchanged; a generic device mockup as the primary focal point

## 2. Field Ledger

- id: gastroops-direction-2
- metaphor: a field ledger with folded working pages
- narrative: The product becomes a sequence of observations that can be marked, folded, and handed forward. Domain cues: restaurant, operations, operational.
- composition: editorial page stack with a diagonal reading path
- typography: expressive grotesk headlines with ledger mono captions
- materials: uncoated paper, graphite rubbings, linen tabs
- interaction: sections pin and fold as the reader moves through the story
- domain-elements: restaurant, operations, operational, system, restaurants
- avoid: generic split hero without a domain narrative; purple gradients or decorative glow; glassmorphism and floating dashboard mockups; repetitive three-column feature grids; visual elements that could replace the restaurant operations context unchanged; a generic device mockup as the primary focal point

## 3. Signal Map

- id: gastroops-direction-3
- metaphor: a signal map finding a clear route through noise
- narrative: A web of domain signals converges on the one route that deserves attention now. Domain cues: restaurant, operations, operational.
- composition: wide map with one bold route and off-axis callouts
- typography: wide grotesk for route names with compact mono metadata
- materials: vellum overlays, plotter ink, brushed aluminum
- interaction: hovering a domain object brightens the route it influences
- domain-elements: restaurant, operations, operational, system, restaurants
- avoid: generic split hero without a domain narrative; purple gradients or decorative glow; glassmorphism and floating dashboard mockups; repetitive three-column feature grids; visual elements that could replace the restaurant operations context unchanged; a generic device mockup as the primary focal point

## 4. Material Archive

- id: gastroops-direction-4
- metaphor: a material archive cataloguing what matters
- narrative: The interface feels like a living collection where every object earns its label and place. Domain cues: restaurant, operations, operational.
- composition: museum rail with one oversized specimen and indexed shelves
- typography: quiet display serif-like grotesk contrast with archival mono
- materials: vellum, rubber stamps, raw wood, ink wash
- interaction: specimens slide into view and retain their catalog number
- domain-elements: restaurant, operations, operational, system, restaurants
- avoid: generic split hero without a domain narrative; purple gradients or decorative glow; glassmorphism and floating dashboard mockups; repetitive three-column feature grids; visual elements that could replace the restaurant operations context unchanged; a generic device mockup as the primary focal point

<!-- lde-directions-data
{
  "interpretation": {
    "briefId": "gastroops",
    "productDomain": "restaurant operations",
    "userTension": "Keep control during the pressure of service without hiding the next handoff.",
    "emotionalTarget": "grounded confidence with a sense of earned momentum",
    "domainObjects": [
      "restaurant",
      "operations",
      "operational",
      "system",
      "restaurants",
      "covering",
      "tasks",
      "food"
    ],
    "domainMaterials": [
      "working paper",
      "calibrated metal",
      "registration ink"
    ],
    "centralMetaphor": "a foundry turning restaurant operations pressure into a working instrument",
    "visualNarrative": "Keep control during the pressure of service without hiding the next handoff.. The page moves from raw evidence to one executable next move.",
    "visualKeywords": [
      "material",
      "annotated",
      "precise",
      "domain-specific",
      "unmistakable"
    ],
    "patternsToAvoid": [
      "generic split hero without a domain narrative",
      "purple gradients or decorative glow",
      "glassmorphism and floating dashboard mockups",
      "repetitive three-column feature grids",
      "visual elements that could replace the restaurant operations context unchanged"
    ]
  },
  "directions": [
    {
      "id": "gastroops-direction-1",
      "name": "Professional Kitchen Control Room",
      "status": "selected",
      "metaphor": "a kitchen control room at the pass",
      "visualNarrative": "Steel worktops, kitchen tickets, station markings, and pass lighting keep the next handoff visible when service accelerates.",
      "composition": {
        "layout": "low command rail with station columns and a lit pass horizon",
        "focalPoint": "the pass surface where the next handoff becomes undeniable",
        "rhythm": "short annotations followed by wide quiet intervals",
        "sections": [
          "signal",
          "working surface",
          "evidence",
          "handoff"
        ]
      },
      "typographyCharacter": "condensed shift-board numerals with stamped ticket annotations",
      "materialLanguage": [
        "blackened steel",
        "printed kitchen tickets",
        "warm pass lighting",
        "scratched stainless worktops"
      ],
      "interactionConcept": "station markers move like tickets through a live pass without losing their origin",
      "domainElements": [
        "kitchen pass",
        "station marking",
        "temperature log",
        "handoff ticket",
        "service shift"
      ],
      "colorStrategy": "blackened steel field with warm pass amber and one coral exception",
      "rationale": "A restaurant service room becomes the composition: pressure is organized at the pass, not hidden in generic cards.",
      "forbiddenPatterns": [
        "generic split hero",
        "purple gradients",
        "glassmorphism",
        "dashboard mockups",
        "unrelated abstract blobs"
      ]
    },
    {
      "id": "gastroops-direction-2",
      "name": "Field Ledger",
      "status": "candidate",
      "metaphor": "a field ledger with folded working pages",
      "visualNarrative": "The product becomes a sequence of observations that can be marked, folded, and handed forward. Domain cues: restaurant, operations, operational.",
      "composition": {
        "layout": "editorial page stack with a diagonal reading path",
        "focalPoint": "a large annotated ledger page that holds the first decision",
        "rhythm": "dense notes at the edge, generous paper between decisions",
        "sections": [
          "signal",
          "working surface",
          "evidence",
          "handoff"
        ]
      },
      "typographyCharacter": "expressive grotesk headlines with ledger mono captions",
      "materialLanguage": [
        "uncoated paper",
        "graphite rubbings",
        "linen tabs"
      ],
      "interactionConcept": "sections pin and fold as the reader moves through the story",
      "domainElements": [
        "restaurant",
        "operations",
        "operational",
        "system",
        "restaurants"
      ],
      "colorStrategy": "warm paper field with mineral teal registration marks",
      "rationale": "This direction gives restaurant operations a visual behavior that cannot be swapped into an unrelated product without losing its meaning.",
      "forbiddenPatterns": [
        "generic split hero without a domain narrative",
        "purple gradients or decorative glow",
        "glassmorphism and floating dashboard mockups",
        "repetitive three-column feature grids",
        "visual elements that could replace the restaurant operations context unchanged",
        "a generic device mockup as the primary focal point"
      ]
    },
    {
      "id": "gastroops-direction-3",
      "name": "Signal Map",
      "status": "candidate",
      "metaphor": "a signal map finding a clear route through noise",
      "visualNarrative": "A web of domain signals converges on the one route that deserves attention now. Domain cues: restaurant, operations, operational.",
      "composition": {
        "layout": "wide map with one bold route and off-axis callouts",
        "focalPoint": "a route line connecting domain objects into a next action",
        "rhythm": "thin lines, isolated labels, one dense convergence point",
        "sections": [
          "signal",
          "working surface",
          "evidence",
          "handoff"
        ]
      },
      "typographyCharacter": "wide grotesk for route names with compact mono metadata",
      "materialLanguage": [
        "vellum overlays",
        "plotter ink",
        "brushed aluminum"
      ],
      "interactionConcept": "hovering a domain object brightens the route it influences",
      "domainElements": [
        "restaurant",
        "operations",
        "operational",
        "system",
        "restaurants"
      ],
      "colorStrategy": "pale mineral base with ink-black route and coral signal",
      "rationale": "This direction gives restaurant operations a visual behavior that cannot be swapped into an unrelated product without losing its meaning.",
      "forbiddenPatterns": [
        "generic split hero without a domain narrative",
        "purple gradients or decorative glow",
        "glassmorphism and floating dashboard mockups",
        "repetitive three-column feature grids",
        "visual elements that could replace the restaurant operations context unchanged",
        "a generic device mockup as the primary focal point"
      ]
    },
    {
      "id": "gastroops-direction-4",
      "name": "Material Archive",
      "status": "candidate",
      "metaphor": "a material archive cataloguing what matters",
      "visualNarrative": "The interface feels like a living collection where every object earns its label and place. Domain cues: restaurant, operations, operational.",
      "composition": {
        "layout": "museum rail with one oversized specimen and indexed shelves",
        "focalPoint": "a tangible domain specimen with a precise caption",
        "rhythm": "large specimen, small index, repeat with changing scale",
        "sections": [
          "signal",
          "working surface",
          "evidence",
          "handoff"
        ]
      },
      "typographyCharacter": "quiet display serif-like grotesk contrast with archival mono",
      "materialLanguage": [
        "vellum",
        "rubber stamps",
        "raw wood",
        "ink wash"
      ],
      "interactionConcept": "specimens slide into view and retain their catalog number",
      "domainElements": [
        "restaurant",
        "operations",
        "operational",
        "system",
        "restaurants"
      ],
      "colorStrategy": "stone and ink with a restrained rust marker",
      "rationale": "This direction gives restaurant operations a visual behavior that cannot be swapped into an unrelated product without losing its meaning.",
      "forbiddenPatterns": [
        "generic split hero without a domain narrative",
        "purple gradients or decorative glow",
        "glassmorphism and floating dashboard mockups",
        "repetitive three-column feature grids",
        "visual elements that could replace the restaurant operations context unchanged",
        "a generic device mockup as the primary focal point"
      ]
    }
  ]
}
-->

### BRAND.md

---

project: gastroops
generated-at: 2026-07-13T10:42:29.663Z
---

# Brand narrative

gastroops speaks through a kitchen control room at the pass. The identity turns blackened steel, printed kitchen tickets, warm pass lighting, scratched stainless worktops into a readable system of marks and handoffs.

# Personality

- observant
- precise
- warm under pressure
- resourceful

# Tone of voice

- concrete over clever
- calm when the room accelerates
- specific about next actions
- never inflated

# Naming rationale

gastroops keeps the domain signal visible and pairs it with a name that sounds useful in a real handoff.

# Logo direction

A press mark: two registration brackets clamp a single cut line, suggesting meaning becoming executable form.

# Wordmark direction

Compact uppercase wordmark with a deliberate gap between the domain name and its instrument suffix.

# Symbol direction

Offset brackets and a cut line; no sparkle, wand, robot, brain, or infinity symbol.

# Color system

- paper: #f3efe7 — quiet base and generous negative space
- kiln: #171716 — ink, headings, structural anchor
- carbon: #2b2b27 — long-form text and working surfaces
- accent: #d06b4b — one signal, action, or route marker
- mineral: #2f7770 — secondary registration and supportive context
- muted: #d9d0c2 — rules, paper folds, disabled context

# Typography roles

- display: Arial Narrow / Trebuchet MS — short high-contrast headlines and route names
- body: Trebuchet MS / system sans-serif — explanations, labels, and instructions
- mono: ui-monospace — metadata, measurements, command output, annotations

# Spacing and shape

- Use wide margins as a creative pause.
- Align annotations to a visible route or fold.
- Keep one working surface dominant per section.
- Use 8px as a unit but break the grid when meaning requires it.
- registration brackets
- short rules
- paper tabs
- square corners with rare functional rounding
- offset underlines

# Iconography and illustration

Thin-line operational marks drawn from domain tools, never decorative emoji or stock icon sets.
Editorial diagrams, plotter lines, material crops, and annotated artifacts with one focal action.

# Photography and motion

Honest close textures and domain objects, directional light, no staged startup desks or generic devices.

- marks draw in like a plotter
- annotations follow their anchor
- transitions feel measured rather than bouncy
- reduced motion leaves a clear final state

# Favicon and social preview

The compact press mark: two brackets around one cut line in kiln ink and coral.
A paper title plate with a single route line crossing the mark and project name.

# Usage and misuse

- Use: Keep one accent color dominant.
- Use: Pair every visual decision with a domain reason.
- Use: Use the mark as a registration device, not a decoration.
- Use: Let text and material share the same compositional route.
- Avoid: Do not add purple gradients or neon glows.
- Avoid: Do not turn every section into a rounded card.
- Avoid: Do not center every heading by default.
- Avoid: Do not use stock photos, generic dashboard mockups, or abstract blobs.
- Avoid: Do not recreate the mark as a sparkle, wand, robot, brain, or infinity loop.

# Image-generation prompts

- hero artwork: Tactile editorial material study for a kitchen control room at the pass; blackened steel, printed kitchen tickets, warm pass lighting, scratched stainless worktops; one clear focal object; photographed like a working artifact (negative: stock photo, generic SaaS UI, purple gradient, robot, floating glass)
- meaning to blueprint illustration: A sequence of annotated marks compressing Steel worktops, kitchen tickets, station markings, and pass lighting keep the next handoff visible when service accelerates. into an executable blueprint; paper, plotter ink, registration brackets (negative: abstract blob, neon circuit board, unrelated stock imagery)
- material study: Close crop of blackened steel, printed kitchen tickets, warm pass lighting, scratched stainless worktops arranged as domain evidence for Professional Kitchen Control Room; high contrast, honest texture (negative: 3D render, generic device mockup, glow)
- social preview: Editorial title plate for gastroops using the a kitchen control room at the pass visual language; readable mark, paper and ink, no UI screenshot (negative: stock image, generic AI imagery, purple cloud)
