---
id: restaurant-operations-direction-2-design
route: /
concept: food as a ledger of coordinate
status: draft
---

# Narrative

Service enters as context, concentrates around coordinate, then resolves through an explicit next action. This direction gives coordinate the first move and food the proof.

# Composition

## Service entry

- id: restaurant-operations-entry-1
- height: min(82svh, 760px)
- layout: vertical field
- focal-point: service
- alignment: start
- Start with Keep control when service accelerates
- Anchor the first read to service

## Service lane

- id: restaurant-operations-action-1
- height: min(82svh, 760px)
- layout: sequential action track
- focal-point: service
- alignment: start
- Make service the dominant transition
- Keep adjacent context visible

## Coordinate context

- id: restaurant-operations-context-1
- height: min(82svh, 760px)
- layout: layered record
- focal-point: coordinate
- alignment: start
- Show relationships around coordinate
- Use detail as evidence, not decoration

# Visual language

- indexed food sheets
- service marks
- coordinate surfaces
- coordinate traces
- keyword: food as a ledger of coordinate
- keyword: document
- keyword: a layered record with indexed evidence
- keyword: coordinate
- keyword: tasks

# Avoid

- unrelated decorative gradients
- generic dashboard mockups
- feature-card grids
- floating glass panels
- abstract blobs

<!-- lde-data
{
  "id": "restaurant-operations-direction-2-design",
  "route": "/",
  "concept": "food as a ledger of coordinate",
  "status": "draft",
  "directionId": "restaurant-operations-direction-2",
  "narrative": "Service enters as context, concentrates around coordinate, then resolves through an explicit next action. This direction gives coordinate the first move and food the proof.",
  "composition": {
    "sections": [
      {
        "id": "restaurant-operations-entry-1",
        "title": "Service entry",
        "height": "min(82svh, 760px)",
        "layout": "vertical field",
        "focalPoint": "service",
        "alignment": "start",
        "rules": [
          "Start with Keep control when service accelerates",
          "Anchor the first read to service"
        ]
      },
      {
        "id": "restaurant-operations-action-1",
        "title": "Service lane",
        "height": "min(82svh, 760px)",
        "layout": "sequential action track",
        "focalPoint": "service",
        "alignment": "start",
        "rules": [
          "Make service the dominant transition",
          "Keep adjacent context visible"
        ]
      },
      {
        "id": "restaurant-operations-context-1",
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
      "indexed food sheets",
      "service marks",
      "coordinate surfaces",
      "coordinate traces"
    ],
    "keywords": [
      "food as a ledger of coordinate",
      "document",
      "a layered record with indexed evidence",
      "coordinate",
      "tasks"
    ]
  },
  "typography": {
    "display": "compressed editorial display",
    "body": "plain operational sans",
    "mono": "legible technical mono"
  },
  "colors": {
    "background": "hsl(346 28% 12%)",
    "foreground": "hsl(347 28% 92%)",
    "accent": "hsl(27 28% 92%)",
    "muted": "hsl(348 28% 12%)",
    "secondary": "hsl(69 28% 92%)"
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
        "id": "restaurant-operations-direction-2-field",
        "kind": "frame",
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 760,
        "fill": "hsl(346 28% 12%)",
        "children": []
      },
      {
        "id": "restaurant-operations-direction-2-title",
        "kind": "text",
        "x": 72,
        "y": 76,
        "width": 630,
        "height": 104,
        "role": "hero-title",
        "text": "Coordinate / Food 2",
        "fontRole": "display",
        "size": 56,
        "weight": 600,
        "color": "hsl(347 28% 92%)"
      },
      {
        "id": "restaurant-operations-direction-2-metaphor",
        "kind": "text",
        "x": 72,
        "y": 210,
        "width": 480,
        "height": 72,
        "role": "metaphor",
        "text": "food as a ledger of coordinate",
        "fontRole": "body",
        "size": 22,
        "weight": 400,
        "color": "hsl(347 28% 92%)"
      },
      {
        "id": "restaurant-operations-direction-2-trace",
        "kind": "line",
        "x": 72,
        "y": 342,
        "width": 760,
        "height": 0,
        "role": "reading-path",
        "x2": 932,
        "y2": 342,
        "stroke": "hsl(347 28% 92%)",
        "strokeWidth": 3
      },
      {
        "id": "restaurant-operations-entry-1",
        "kind": "frame",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "role": "vertical field",
        "fill": "hsl(347 28% 92%)",
        "stroke": "hsl(347 28% 92%)",
        "radius": 3,
        "children": []
      },
      {
        "id": "restaurant-operations-entry-1-label",
        "kind": "text",
        "x": 96,
        "y": 412,
        "width": 560,
        "height": 30,
        "role": "section-label",
        "text": "Service entry · service",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(346 28% 12%)"
      },
      {
        "id": "restaurant-operations-action-1",
        "kind": "frame",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "role": "sequential action track",
        "fill": "hsl(346 28% 12%)",
        "stroke": "hsl(347 28% 92%)",
        "radius": 0,
        "children": []
      },
      {
        "id": "restaurant-operations-action-1-label",
        "kind": "text",
        "x": 134,
        "y": 518,
        "width": 560,
        "height": 30,
        "role": "section-label",
        "text": "Service lane · service",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(347 28% 92%)"
      },
      {
        "id": "restaurant-operations-context-1",
        "kind": "frame",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "role": "layered record",
        "fill": "hsl(347 28% 92%)",
        "stroke": "hsl(347 28% 92%)",
        "radius": 3,
        "children": []
      },
      {
        "id": "restaurant-operations-context-1-label",
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
        "color": "hsl(346 28% 12%)"
      }
    ]
  },
  "motion": {
    "principles": [
      "service changes the reading path",
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
    "Keep the food as a ledger of coordinate identity intact.",
    "Build the document opening before adding supporting details.",
    "Use coordinate, food, tasks as domain-specific evidence.",
    "Do not introduce generic SaaS cards, unrelated gradients, or invented imagery."
  ],
  "generatedAt": "2026-07-13T00:00:00.000Z",
  "meaning": {
    "briefId": "restaurant-operations",
    "productDomain": "restaurant operations",
    "userTension": "Keep control when service accelerates",
    "emotionalTarget": "calm agency while coordinate accelerates",
    "domainObjects": [
      "coordinate",
      "tasks",
      "food",
      "safety",
      "inventory",
      "ledger",
      "restaurant"
    ],
    "domainMaterials": [
      "service marks",
      "coordinate surfaces",
      "coordinate traces"
    ],
    "centralMetaphor": "service as a readable field where coordinate moves through a sequence",
    "visualNarrative": "Service enters as context, concentrates around coordinate, then resolves through an explicit next action.",
    "visualKeywords": [
      "service",
      "coordinate",
      "confirm",
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
    "businessObjective": "Coordinate tasks, food safety, inventory, documentation, and shift handoffs during service.",
    "operationalVerbs": [
      "coordinate",
      "service",
      "confirm",
      "safety",
      "control",
      "when",
      "accelerates"
    ],
    "userJourney": [
      "orient",
      "coordinate",
      "service",
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
      "tasks",
      "next action",
      "recovery state"
    ],
    "entityRelationships": [
      "coordinate relates to tasks",
      "tasks relates to food",
      "food relates to safety",
      "safety relates to inventory"
    ],
    "evidence": [
      {
        "source": "domain",
        "input": "restaurant operations",
        "conclusion": "The product operates in restaurant operations.",
        "consequence": "The interface must expose service as an active context."
      },
      {
        "source": "summary",
        "input": "Coordinate tasks, food safety, inventory, documentation, and shift handoffs during service.",
        "conclusion": "The work centers on coordinate, tasks, food.",
        "consequence": "The visual system must privilege those objects over generic interface chrome."
      },
      {
        "source": "tension",
        "input": "Keep control when service accelerates",
        "conclusion": "The user tension is Keep control when service accelerates.",
        "consequence": "The first read must make the critical decision legible before secondary detail."
      },
      {
        "source": "jobs",
        "input": "coordinate service, confirm safety",
        "conclusion": "Users repeatedly coordinate, service, confirm.",
        "consequence": "Composition should read as a sequence of actions, not a feature inventory."
      }
    ]
  },
  "hypothesis": {
    "id": "restaurant-operations-hypothesis-2",
    "statement": "Coordinate becomes the visual behavior for Keep control when service accelerates; food proves each transition.",
    "visualMetaphor": "food as a ledger of coordinate",
    "emotionalBehavior": "The interface moves from calm agency while coordinate accelerates to a clear safety.",
    "spatialStrategy": "a layered record with indexed evidence",
    "focalStrategy": "Keep coordinate dominant; use food as evidence rather than ornament.",
    "materialBehavior": "indexed food sheets",
    "typographyBehavior": "Use typographic contrast to mark safety and let coordinate set the reading pace.",
    "interactionBehavior": "safety changes emphasis in place while preserving the original route.",
    "visualDirectionPrompt": "Sparse art-direction plate for restaurant operations: food as a ledger of coordinate. Show indexed food sheets, a layered record with indexed evidence, one focal interface trace, and negative space. No finished website, no invented copy, no feature grid, no stock imagery, no named style references.",
    "evidence": [
      {
        "source": "domain",
        "input": "restaurant operations",
        "conclusion": "The product operates in restaurant operations.",
        "consequence": "The interface must expose service as an active context."
      },
      {
        "source": "summary",
        "input": "Coordinate tasks, food safety, inventory, documentation, and shift handoffs during service.",
        "conclusion": "The work centers on coordinate, tasks, food.",
        "consequence": "The visual system must privilege those objects over generic interface chrome."
      },
      {
        "source": "tension",
        "input": "Keep control when service accelerates",
        "conclusion": "The user tension is Keep control when service accelerates.",
        "consequence": "The first read must make the critical decision legible before secondary detail."
      },
      {
        "source": "jobs",
        "input": "coordinate service, confirm safety",
        "conclusion": "Users repeatedly coordinate, service, confirm.",
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
      "service context",
      "service decision",
      "coordinate evidence",
      "confirmation"
    ],
    "focalHierarchy": [
      "service",
      "service",
      "coordinate",
      "recovery"
    ],
    "informationDensity": "balanced",
    "sectionRelationships": [
      "restaurant-operations-entry-1 leads to restaurant-operations-action-1",
      "restaurant-operations-action-1 supports restaurant-operations-context-1"
    ],
    "overlapRules": [
      "reading path remains continuous across sections",
      "secondary detail recedes without disappearing"
    ],
    "compositionalRhythm": [
      "wide pause before service",
      "short interval around coordinate",
      "clear closure after confirmation"
    ],
    "typographyBehavior": [
      "use a compressed display voice for service",
      "keep operational labels terse",
      "let coordinate carry the longest measure"
    ],
    "materialBehavior": [
      "surface service as a visible trace",
      "differentiate coordinate by texture or rule",
      "avoid decorative material without a domain role"
    ],
    "interactionBehavior": [
      "service changes the reading path",
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
        "id": "restaurant-operations-entry-1",
        "title": "Service entry",
        "height": "min(82svh, 760px)",
        "layout": "vertical field",
        "focalPoint": "service",
        "alignment": "start",
        "rules": [
          "Start with Keep control when service accelerates",
          "Anchor the first read to service"
        ]
      },
      {
        "id": "restaurant-operations-action-1",
        "title": "Service lane",
        "height": "min(82svh, 760px)",
        "layout": "sequential action track",
        "focalPoint": "service",
        "alignment": "start",
        "rules": [
          "Make service the dominant transition",
          "Keep adjacent context visible"
        ]
      },
      {
        "id": "restaurant-operations-context-1",
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
        "input": "restaurant operations",
        "conclusion": "The product operates in restaurant operations.",
        "consequence": "The interface must expose service as an active context."
      },
      {
        "source": "summary",
        "input": "Coordinate tasks, food safety, inventory, documentation, and shift handoffs during service.",
        "conclusion": "The work centers on coordinate, tasks, food.",
        "consequence": "The visual system must privilege those objects over generic interface chrome."
      },
      {
        "source": "tension",
        "input": "Keep control when service accelerates",
        "conclusion": "The user tension is Keep control when service accelerates.",
        "consequence": "The first read must make the critical decision legible before secondary detail."
      },
      {
        "source": "jobs",
        "input": "coordinate service, confirm safety",
        "conclusion": "Users repeatedly coordinate, service, confirm.",
        "consequence": "Composition should read as a sequence of actions, not a feature inventory."
      }
    ]
  },
  "sceneGraph": {
    "width": 1200,
    "height": 760,
    "opening": "document",
    "readingPath": [
      "service context",
      "service decision",
      "coordinate evidence",
      "confirmation"
    ],
    "regions": [
      {
        "id": "restaurant-operations-entry-1",
        "role": "service",
        "layout": "track",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "layerIds": [
          "restaurant-operations-entry-1-layer",
          "restaurant-operations-entry-1-label"
        ],
        "emphasis": 1,
        "responsive": {
          "mobile": "stack after previous region",
          "tablet": "preserve reading order"
        }
      },
      {
        "id": "restaurant-operations-action-1",
        "role": "service",
        "layout": "overlay",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "layerIds": [
          "restaurant-operations-action-1-layer",
          "restaurant-operations-action-1-label"
        ],
        "emphasis": 0.84,
        "responsive": {
          "mobile": "stack after previous region",
          "tablet": "preserve reading order"
        }
      },
      {
        "id": "restaurant-operations-context-1",
        "role": "coordinate",
        "layout": "track",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "layerIds": [
          "restaurant-operations-context-1-layer",
          "restaurant-operations-context-1-label"
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
        "id": "restaurant-operations-entry-1-restaurant-operations-entry-1-layer-layer",
        "nodeId": "restaurant-operations-entry-1-layer",
        "regionId": "restaurant-operations-entry-1",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "restaurant-operations-entry-1"
      },
      {
        "id": "restaurant-operations-entry-1-restaurant-operations-entry-1-label-layer",
        "nodeId": "restaurant-operations-entry-1-label",
        "regionId": "restaurant-operations-entry-1",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "restaurant-operations-entry-1"
      },
      {
        "id": "restaurant-operations-action-1-restaurant-operations-action-1-layer-layer",
        "nodeId": "restaurant-operations-action-1-layer",
        "regionId": "restaurant-operations-action-1",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "restaurant-operations-action-1"
      },
      {
        "id": "restaurant-operations-action-1-restaurant-operations-action-1-label-layer",
        "nodeId": "restaurant-operations-action-1-label",
        "regionId": "restaurant-operations-action-1",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "restaurant-operations-action-1"
      },
      {
        "id": "restaurant-operations-context-1-restaurant-operations-context-1-layer-layer",
        "nodeId": "restaurant-operations-context-1-layer",
        "regionId": "restaurant-operations-context-1",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "restaurant-operations-context-1"
      },
      {
        "id": "restaurant-operations-context-1-restaurant-operations-context-1-label-layer",
        "nodeId": "restaurant-operations-context-1-label",
        "regionId": "restaurant-operations-context-1",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "restaurant-operations-context-1"
      }
    ],
    "relationships": [
      {
        "from": "restaurant-operations-entry-1",
        "to": "restaurant-operations-action-1",
        "kind": "leads-to",
        "rationale": "restaurant-operations-entry-1 leads to restaurant-operations-action-1"
      },
      {
        "from": "restaurant-operations-action-1",
        "to": "restaurant-operations-context-1",
        "kind": "leads-to",
        "rationale": "restaurant-operations-action-1 supports restaurant-operations-context-1"
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
        "id": "restaurant-operations-direction-2-field",
        "kind": "frame",
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 760,
        "fill": "hsl(346 28% 12%)",
        "children": []
      },
      {
        "id": "restaurant-operations-direction-2-title",
        "kind": "text",
        "x": 72,
        "y": 76,
        "width": 630,
        "height": 104,
        "text": "Coordinate / Food 2",
        "fontRole": "display",
        "size": 56,
        "weight": 600,
        "color": "hsl(347 28% 92%)",
        "role": "hero-title"
      },
      {
        "id": "restaurant-operations-direction-2-metaphor",
        "kind": "text",
        "x": 72,
        "y": 210,
        "width": 480,
        "height": 72,
        "text": "food as a ledger of coordinate",
        "fontRole": "body",
        "size": 22,
        "weight": 400,
        "color": "hsl(347 28% 92%)",
        "role": "metaphor"
      },
      {
        "id": "restaurant-operations-direction-2-trace",
        "kind": "line",
        "x": 72,
        "y": 342,
        "width": 760,
        "height": 0,
        "x2": 932,
        "y2": 342,
        "stroke": "hsl(347 28% 92%)",
        "strokeWidth": 3,
        "role": "reading-path"
      },
      {
        "id": "restaurant-operations-entry-1",
        "kind": "frame",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "fill": "hsl(347 28% 92%)",
        "stroke": "hsl(347 28% 92%)",
        "radius": 3,
        "children": [],
        "role": "vertical field"
      },
      {
        "id": "restaurant-operations-entry-1-label",
        "kind": "text",
        "x": 96,
        "y": 412,
        "width": 560,
        "height": 30,
        "text": "Service entry · service",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(346 28% 12%)",
        "role": "section-label"
      },
      {
        "id": "restaurant-operations-action-1",
        "kind": "frame",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "fill": "hsl(346 28% 12%)",
        "stroke": "hsl(347 28% 92%)",
        "radius": 0,
        "children": [],
        "role": "sequential action track"
      },
      {
        "id": "restaurant-operations-action-1-label",
        "kind": "text",
        "x": 134,
        "y": 518,
        "width": 560,
        "height": 30,
        "text": "Service lane · service",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(347 28% 92%)",
        "role": "section-label"
      },
      {
        "id": "restaurant-operations-context-1",
        "kind": "frame",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "fill": "hsl(347 28% 92%)",
        "stroke": "hsl(347 28% 92%)",
        "radius": 3,
        "children": [],
        "role": "layered record"
      },
      {
        "id": "restaurant-operations-context-1-label",
        "kind": "text",
        "x": 96,
        "y": 624,
        "width": 560,
        "height": 30,
        "text": "Coordinate context · coordinate",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(346 28% 12%)",
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
