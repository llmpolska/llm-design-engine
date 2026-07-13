---
id: boutique-hotel-direction-2-design
route: /
concept: guest as a ledger of coordinate
status: draft
---

# Narrative

House enters as context, concentrates around coordinate, then resolves through an explicit next action. This direction gives coordinate the first move and guest the proof.

# Composition

## House entry

- id: boutique-hotel-entry-1
- height: min(82svh, 760px)
- layout: vertical field
- focal-point: house
- alignment: start
- Start with Stay attentive while many small promises move at once
- Anchor the first read to house

## Arrivals lane

- id: boutique-hotel-action-1
- height: min(82svh, 760px)
- layout: sequential action track
- focal-point: arrivals
- alignment: start
- Make arrivals the dominant transition
- Keep adjacent context visible

## Coordinate context

- id: boutique-hotel-context-1
- height: min(82svh, 760px)
- layout: layered record
- focal-point: coordinate
- alignment: start
- Show relationships around coordinate
- Use detail as evidence, not decoration

# Visual language

- indexed guest sheets
- house marks
- coordinate surfaces
- orchestrate traces
- keyword: guest as a ledger of coordinate
- keyword: document
- keyword: a layered record with indexed evidence
- keyword: coordinate
- keyword: rooms

# Avoid

- unrelated decorative gradients
- generic dashboard mockups
- feature-card grids
- floating glass panels
- abstract blobs

<!-- lde-data
{
  "id": "boutique-hotel-direction-2-design",
  "route": "/",
  "concept": "guest as a ledger of coordinate",
  "status": "draft",
  "directionId": "boutique-hotel-direction-2",
  "narrative": "House enters as context, concentrates around coordinate, then resolves through an explicit next action. This direction gives coordinate the first move and guest the proof.",
  "composition": {
    "sections": [
      {
        "id": "boutique-hotel-entry-1",
        "title": "House entry",
        "height": "min(82svh, 760px)",
        "layout": "vertical field",
        "focalPoint": "house",
        "alignment": "start",
        "rules": [
          "Start with Stay attentive while many small promises move at once",
          "Anchor the first read to house"
        ]
      },
      {
        "id": "boutique-hotel-action-1",
        "title": "Arrivals lane",
        "height": "min(82svh, 760px)",
        "layout": "sequential action track",
        "focalPoint": "arrivals",
        "alignment": "start",
        "rules": [
          "Make arrivals the dominant transition",
          "Keep adjacent context visible"
        ]
      },
      {
        "id": "boutique-hotel-context-1",
        "title": "Coordinate context",
        "height": "min(82svh, 760px)",
        "layout": "layered record",
        "focalPoint": "coordinate",
        "alignment": "start",
        "rules": [
          "Show relationships around coordinate",
          "Use detail as evidence, not decoration"
        ]
      }
    ]
  },
  "visualLanguage": {
    "materials": [
      "indexed guest sheets",
      "house marks",
      "coordinate surfaces",
      "orchestrate traces"
    ],
    "keywords": [
      "guest as a ledger of coordinate",
      "document",
      "a layered record with indexed evidence",
      "coordinate",
      "rooms"
    ]
  },
  "typography": {
    "display": "compressed editorial display",
    "body": "plain operational sans",
    "mono": "legible technical mono"
  },
  "colors": {
    "background": "hsl(347 28% 12%)",
    "foreground": "hsl(348 28% 92%)",
    "accent": "hsl(28 28% 92%)",
    "muted": "hsl(349 28% 12%)",
    "secondary": "hsl(70 28% 92%)"
  },
  "responsive": {
    "mobile": [
      "desktop keeps the reading path lateral",
      "tablet reduces overlap before reducing type",
      "mobile stacks by action order and preserves source labels"
    ],
    "tablet": [
      "desktop keeps the reading path lateral",
      "tablet reduces overlap before reducing type",
      "mobile stacks by action order and preserves source labels"
    ],
    "desktop": [
      "desktop keeps the reading path lateral",
      "tablet reduces overlap before reducing type",
      "mobile stacks by action order and preserves source labels"
    ]
  },
  "scene": {
    "width": 1200,
    "height": 760,
    "nodes": [
      {
        "id": "boutique-hotel-direction-2-field",
        "kind": "frame",
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 760,
        "fill": "hsl(347 28% 12%)",
        "children": []
      },
      {
        "id": "boutique-hotel-direction-2-title",
        "kind": "text",
        "x": 72,
        "y": 76,
        "width": 630,
        "height": 104,
        "role": "hero-title",
        "text": "Coordinate / Guest 2",
        "fontRole": "display",
        "size": 56,
        "weight": 600,
        "color": "hsl(348 28% 92%)"
      },
      {
        "id": "boutique-hotel-direction-2-metaphor",
        "kind": "text",
        "x": 72,
        "y": 210,
        "width": 480,
        "height": 72,
        "role": "metaphor",
        "text": "guest as a ledger of coordinate",
        "fontRole": "body",
        "size": 22,
        "weight": 400,
        "color": "hsl(348 28% 92%)"
      },
      {
        "id": "boutique-hotel-direction-2-trace",
        "kind": "line",
        "x": 72,
        "y": 342,
        "width": 760,
        "height": 0,
        "role": "reading-path",
        "x2": 932,
        "y2": 342,
        "stroke": "hsl(348 28% 92%)",
        "strokeWidth": 3
      },
      {
        "id": "boutique-hotel-entry-1",
        "kind": "frame",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "role": "vertical field",
        "fill": "hsl(348 28% 92%)",
        "stroke": "hsl(348 28% 92%)",
        "radius": 3,
        "children": []
      },
      {
        "id": "boutique-hotel-entry-1-label",
        "kind": "text",
        "x": 96,
        "y": 412,
        "width": 560,
        "height": 30,
        "role": "section-label",
        "text": "House entry · house",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(347 28% 12%)"
      },
      {
        "id": "boutique-hotel-action-1",
        "kind": "frame",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "role": "sequential action track",
        "fill": "hsl(347 28% 12%)",
        "stroke": "hsl(348 28% 92%)",
        "radius": 0,
        "children": []
      },
      {
        "id": "boutique-hotel-action-1-label",
        "kind": "text",
        "x": 134,
        "y": 518,
        "width": 560,
        "height": 30,
        "role": "section-label",
        "text": "Arrivals lane · arrivals",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(348 28% 92%)"
      },
      {
        "id": "boutique-hotel-context-1",
        "kind": "frame",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "role": "layered record",
        "fill": "hsl(348 28% 92%)",
        "stroke": "hsl(348 28% 92%)",
        "radius": 3,
        "children": []
      },
      {
        "id": "boutique-hotel-context-1-label",
        "kind": "text",
        "x": 96,
        "y": 624,
        "width": 560,
        "height": 30,
        "role": "section-label",
        "text": "Coordinate context · coordinate",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(347 28% 12%)"
      }
    ]
  },
  "motion": {
    "principles": [
      "arrivals changes the reading path",
      "hover/focus reveals evidence in place",
      "reduced motion preserves the same hierarchy"
    ],
    "reducedMotion": [
      "preserve order and emphasis without movement"
    ]
  },
  "assets": [],
  "forbiddenPatterns": [
    "unrelated decorative gradients",
    "generic dashboard mockups",
    "feature-card grids",
    "floating glass panels",
    "abstract blobs"
  ],
  "agentInstructions": [
    "Keep the guest as a ledger of coordinate identity intact.",
    "Build the document opening before adding supporting details.",
    "Use coordinate, guest, rooms as domain-specific evidence.",
    "Do not introduce generic SaaS cards, unrelated gradients, or invented imagery."
  ],
  "generatedAt": "2026-07-13T00:00:00.000Z",
  "meaning": {
    "briefId": "boutique-hotel",
    "productDomain": "boutique hotel operations",
    "userTension": "Stay attentive while many small promises move at once",
    "emotionalTarget": "calm agency while orchestrate accelerates",
    "domainObjects": [
      "coordinate",
      "rooms",
      "guest",
      "requests",
      "maintenance",
      "rhythm",
      "boutique"
    ],
    "domainMaterials": [
      "house marks",
      "coordinate surfaces",
      "orchestrate traces"
    ],
    "centralMetaphor": "house as a readable field where coordinate moves through a sequence",
    "visualNarrative": "House enters as context, concentrates around coordinate, then resolves through an explicit next action.",
    "visualKeywords": [
      "house",
      "coordinate",
      "orchestrate",
      "arrivals",
      "resolve",
      "sequence",
      "signal"
    ],
    "patternsToAvoid": [
      "unrelated decorative gradients",
      "generic dashboard mockups",
      "feature-card grids",
      "floating glass panels",
      "abstract blobs"
    ],
    "businessObjective": "Coordinate rooms, guest requests, maintenance, and arrivals without losing the character of the house.",
    "operationalVerbs": [
      "orchestrate",
      "arrivals",
      "resolve",
      "requests",
      "stay",
      "attentive",
      "while",
      "many",
      "small",
      "promises",
      "move",
      "once"
    ],
    "userJourney": [
      "orient",
      "orchestrate",
      "arrivals",
      "resolve",
      "confirm",
      "recover"
    ],
    "temporalBehavior": [
      "orient before action",
      "surface change as a trace",
      "close the loop with confirmation"
    ],
    "informationHierarchy": [
      "coordinate",
      "rooms",
      "next action",
      "recovery state"
    ],
    "entityRelationships": [
      "coordinate relates to rooms",
      "rooms relates to guest",
      "guest relates to requests",
      "requests relates to maintenance"
    ],
    "evidence": [
      {
        "source": "domain",
        "input": "boutique hotel operations",
        "conclusion": "The product operates in boutique hotel operations.",
        "consequence": "The interface must expose house as an active context."
      },
      {
        "source": "summary",
        "input": "Coordinate rooms, guest requests, maintenance, and arrivals without losing the character of the house.",
        "conclusion": "The work centers on coordinate, rooms, guest.",
        "consequence": "The visual system must privilege those objects over generic interface chrome."
      },
      {
        "source": "tension",
        "input": "Stay attentive while many small promises move at once",
        "conclusion": "The user tension is Stay attentive while many small promises move at once.",
        "consequence": "The first read must make the critical decision legible before secondary detail."
      },
      {
        "source": "jobs",
        "input": "orchestrate arrivals, resolve requests",
        "conclusion": "Users repeatedly orchestrate, arrivals, resolve.",
        "consequence": "Composition should read as a sequence of actions, not a feature inventory."
      }
    ]
  },
  "hypothesis": {
    "id": "boutique-hotel-hypothesis-2",
    "statement": "Coordinate becomes the visual behavior for Stay attentive while many small promises move at once; guest proves each transition.",
    "visualMetaphor": "guest as a ledger of coordinate",
    "emotionalBehavior": "The interface moves from calm agency while orchestrate accelerates to a clear requests.",
    "spatialStrategy": "a layered record with indexed evidence",
    "focalStrategy": "Keep coordinate dominant; use guest as evidence rather than ornament.",
    "materialBehavior": "indexed guest sheets",
    "typographyBehavior": "Use typographic contrast to mark requests and let coordinate set the reading pace.",
    "interactionBehavior": "requests changes emphasis in place while preserving the original route.",
    "visualDirectionPrompt": "Sparse art-direction plate for boutique hotel operations: guest as a ledger of coordinate. Show indexed guest sheets, a layered record with indexed evidence, one focal interface trace, and negative space. No finished website, no invented copy, no feature grid, no stock imagery, no named style references.",
    "evidence": [
      {
        "source": "domain",
        "input": "boutique hotel operations",
        "conclusion": "The product operates in boutique hotel operations.",
        "consequence": "The interface must expose house as an active context."
      },
      {
        "source": "summary",
        "input": "Coordinate rooms, guest requests, maintenance, and arrivals without losing the character of the house.",
        "conclusion": "The work centers on coordinate, rooms, guest.",
        "consequence": "The visual system must privilege those objects over generic interface chrome."
      },
      {
        "source": "tension",
        "input": "Stay attentive while many small promises move at once",
        "conclusion": "The user tension is Stay attentive while many small promises move at once.",
        "consequence": "The first read must make the critical decision legible before secondary detail."
      },
      {
        "source": "jobs",
        "input": "orchestrate arrivals, resolve requests",
        "conclusion": "Users repeatedly orchestrate, arrivals, resolve.",
        "consequence": "Composition should read as a sequence of actions, not a feature inventory."
      }
    ],
    "forbiddenPatterns": [
      "unrelated decorative gradients",
      "generic dashboard mockups",
      "feature-card grids",
      "floating glass panels",
      "abstract blobs"
    ]
  },
  "compositionPlan": {
    "opening": "document",
    "readingPath": [
      "house context",
      "arrivals decision",
      "coordinate evidence",
      "confirmation"
    ],
    "focalHierarchy": [
      "house",
      "arrivals",
      "coordinate",
      "recovery"
    ],
    "informationDensity": "balanced",
    "sectionRelationships": [
      "boutique-hotel-entry-1 leads to boutique-hotel-action-1",
      "boutique-hotel-action-1 supports boutique-hotel-context-1"
    ],
    "overlapRules": [
      "reading path remains continuous across sections",
      "secondary detail recedes without disappearing"
    ],
    "compositionalRhythm": [
      "wide pause before arrivals",
      "short interval around coordinate",
      "clear closure after confirmation"
    ],
    "typographyBehavior": [
      "use a compressed display voice for house",
      "keep operational labels terse",
      "let coordinate carry the longest measure"
    ],
    "materialBehavior": [
      "surface house as a visible trace",
      "differentiate coordinate by texture or rule",
      "avoid decorative material without a domain role"
    ],
    "interactionBehavior": [
      "arrivals changes the reading path",
      "hover/focus reveals evidence in place",
      "reduced motion preserves the same hierarchy"
    ],
    "responsiveTransformations": [
      "desktop keeps the reading path lateral",
      "tablet reduces overlap before reducing type",
      "mobile stacks by action order and preserves source labels"
    ],
    "sections": [
      {
        "id": "boutique-hotel-entry-1",
        "title": "House entry",
        "height": "min(82svh, 760px)",
        "layout": "vertical field",
        "focalPoint": "house",
        "alignment": "start",
        "rules": [
          "Start with Stay attentive while many small promises move at once",
          "Anchor the first read to house"
        ]
      },
      {
        "id": "boutique-hotel-action-1",
        "title": "Arrivals lane",
        "height": "min(82svh, 760px)",
        "layout": "sequential action track",
        "focalPoint": "arrivals",
        "alignment": "start",
        "rules": [
          "Make arrivals the dominant transition",
          "Keep adjacent context visible"
        ]
      },
      {
        "id": "boutique-hotel-context-1",
        "title": "Coordinate context",
        "height": "min(82svh, 760px)",
        "layout": "layered record",
        "focalPoint": "coordinate",
        "alignment": "start",
        "rules": [
          "Show relationships around coordinate",
          "Use detail as evidence, not decoration"
        ]
      }
    ],
    "reasoning": [
      {
        "source": "domain",
        "input": "boutique hotel operations",
        "conclusion": "The product operates in boutique hotel operations.",
        "consequence": "The interface must expose house as an active context."
      },
      {
        "source": "summary",
        "input": "Coordinate rooms, guest requests, maintenance, and arrivals without losing the character of the house.",
        "conclusion": "The work centers on coordinate, rooms, guest.",
        "consequence": "The visual system must privilege those objects over generic interface chrome."
      },
      {
        "source": "tension",
        "input": "Stay attentive while many small promises move at once",
        "conclusion": "The user tension is Stay attentive while many small promises move at once.",
        "consequence": "The first read must make the critical decision legible before secondary detail."
      },
      {
        "source": "jobs",
        "input": "orchestrate arrivals, resolve requests",
        "conclusion": "Users repeatedly orchestrate, arrivals, resolve.",
        "consequence": "Composition should read as a sequence of actions, not a feature inventory."
      }
    ]
  },
  "sceneGraph": {
    "width": 1200,
    "height": 760,
    "opening": "document",
    "readingPath": [
      "house context",
      "arrivals decision",
      "coordinate evidence",
      "confirmation"
    ],
    "regions": [
      {
        "id": "boutique-hotel-entry-1",
        "role": "house",
        "layout": "track",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "layerIds": [
          "boutique-hotel-entry-1-layer",
          "boutique-hotel-entry-1-label"
        ],
        "emphasis": 1,
        "responsive": {
          "mobile": "stack after previous region",
          "tablet": "preserve reading order"
        }
      },
      {
        "id": "boutique-hotel-action-1",
        "role": "arrivals",
        "layout": "overlay",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "layerIds": [
          "boutique-hotel-action-1-layer",
          "boutique-hotel-action-1-label"
        ],
        "emphasis": 0.84,
        "responsive": {
          "mobile": "stack after previous region",
          "tablet": "preserve reading order"
        }
      },
      {
        "id": "boutique-hotel-context-1",
        "role": "coordinate",
        "layout": "track",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "layerIds": [
          "boutique-hotel-context-1-layer",
          "boutique-hotel-context-1-label"
        ],
        "emphasis": 0.6799999999999999,
        "responsive": {
          "mobile": "stack after previous region",
          "tablet": "preserve reading order"
        }
      }
    ],
    "layers": [
      {
        "id": "boutique-hotel-entry-1-boutique-hotel-entry-1-layer-layer",
        "nodeId": "boutique-hotel-entry-1-layer",
        "regionId": "boutique-hotel-entry-1",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "boutique-hotel-entry-1"
      },
      {
        "id": "boutique-hotel-entry-1-boutique-hotel-entry-1-label-layer",
        "nodeId": "boutique-hotel-entry-1-label",
        "regionId": "boutique-hotel-entry-1",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "boutique-hotel-entry-1"
      },
      {
        "id": "boutique-hotel-action-1-boutique-hotel-action-1-layer-layer",
        "nodeId": "boutique-hotel-action-1-layer",
        "regionId": "boutique-hotel-action-1",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "boutique-hotel-action-1"
      },
      {
        "id": "boutique-hotel-action-1-boutique-hotel-action-1-label-layer",
        "nodeId": "boutique-hotel-action-1-label",
        "regionId": "boutique-hotel-action-1",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "boutique-hotel-action-1"
      },
      {
        "id": "boutique-hotel-context-1-boutique-hotel-context-1-layer-layer",
        "nodeId": "boutique-hotel-context-1-layer",
        "regionId": "boutique-hotel-context-1",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "boutique-hotel-context-1"
      },
      {
        "id": "boutique-hotel-context-1-boutique-hotel-context-1-label-layer",
        "nodeId": "boutique-hotel-context-1-label",
        "regionId": "boutique-hotel-context-1",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "boutique-hotel-context-1"
      }
    ],
    "relationships": [
      {
        "from": "boutique-hotel-entry-1",
        "to": "boutique-hotel-action-1",
        "kind": "leads-to",
        "rationale": "boutique-hotel-entry-1 leads to boutique-hotel-action-1"
      },
      {
        "from": "boutique-hotel-action-1",
        "to": "boutique-hotel-context-1",
        "kind": "leads-to",
        "rationale": "boutique-hotel-action-1 supports boutique-hotel-context-1"
      }
    ],
    "responsive": [
      {
        "breakpoint": "desktop",
        "target": "reading-path",
        "operation": "preserve",
        "before": "lateral route",
        "after": "lateral route",
        "rationale": "retain the chosen opening"
      },
      {
        "breakpoint": "tablet",
        "target": "reading-path",
        "operation": "reflow",
        "before": "lateral route",
        "after": "compressed route",
        "rationale": "reduce overlap before reducing hierarchy"
      },
      {
        "breakpoint": "mobile",
        "target": "regions",
        "operation": "stack",
        "before": "overlapping regions",
        "after": "action-ordered stack",
        "rationale": "keep the operational sequence legible"
      }
    ],
    "motionRelationships": [
      {
        "target": "reading-path",
        "trigger": "focus or scroll",
        "relationship": "reveal the next evidence region",
        "reducedMotion": "show all regions in the same order"
      }
    ],
    "nodes": [
      {
        "id": "boutique-hotel-direction-2-field",
        "kind": "frame",
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 760,
        "fill": "hsl(347 28% 12%)",
        "children": []
      },
      {
        "id": "boutique-hotel-direction-2-title",
        "kind": "text",
        "x": 72,
        "y": 76,
        "width": 630,
        "height": 104,
        "text": "Coordinate / Guest 2",
        "fontRole": "display",
        "size": 56,
        "weight": 600,
        "color": "hsl(348 28% 92%)",
        "role": "hero-title"
      },
      {
        "id": "boutique-hotel-direction-2-metaphor",
        "kind": "text",
        "x": 72,
        "y": 210,
        "width": 480,
        "height": 72,
        "text": "guest as a ledger of coordinate",
        "fontRole": "body",
        "size": 22,
        "weight": 400,
        "color": "hsl(348 28% 92%)",
        "role": "metaphor"
      },
      {
        "id": "boutique-hotel-direction-2-trace",
        "kind": "line",
        "x": 72,
        "y": 342,
        "width": 760,
        "height": 0,
        "x2": 932,
        "y2": 342,
        "stroke": "hsl(348 28% 92%)",
        "strokeWidth": 3,
        "role": "reading-path"
      },
      {
        "id": "boutique-hotel-entry-1",
        "kind": "frame",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "fill": "hsl(348 28% 92%)",
        "stroke": "hsl(348 28% 92%)",
        "radius": 3,
        "children": [],
        "role": "vertical field"
      },
      {
        "id": "boutique-hotel-entry-1-label",
        "kind": "text",
        "x": 96,
        "y": 412,
        "width": 560,
        "height": 30,
        "text": "House entry · house",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(347 28% 12%)",
        "role": "section-label"
      },
      {
        "id": "boutique-hotel-action-1",
        "kind": "frame",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "fill": "hsl(347 28% 12%)",
        "stroke": "hsl(348 28% 92%)",
        "radius": 0,
        "children": [],
        "role": "sequential action track"
      },
      {
        "id": "boutique-hotel-action-1-label",
        "kind": "text",
        "x": 134,
        "y": 518,
        "width": 560,
        "height": 30,
        "text": "Arrivals lane · arrivals",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(348 28% 92%)",
        "role": "section-label"
      },
      {
        "id": "boutique-hotel-context-1",
        "kind": "frame",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "fill": "hsl(348 28% 92%)",
        "stroke": "hsl(348 28% 92%)",
        "radius": 3,
        "children": [],
        "role": "layered record"
      },
      {
        "id": "boutique-hotel-context-1-label",
        "kind": "text",
        "x": 96,
        "y": 624,
        "width": 560,
        "height": 30,
        "text": "Coordinate context · coordinate",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(347 28% 12%)",
        "role": "section-label"
      }
    ]
  },
  "semanticPatches": [],
  "providerMetadata": {
    "provider": "mock",
    "model": "deterministic",
    "generatedAt": "2026-07-13T00:00:00.000Z"
  }
}
-->
