---
id: restaurant-operations-direction-1-design
route: /
concept: service as a route through tasks
status: draft
---

# Narrative

Service enters as context, concentrates around coordinate, then resolves through an explicit next action. This direction gives service the first move and tasks the proof.

# Composition

## Service entry

- id: restaurant-operations-entry-0
- height: min(82svh, 760px)
- layout: horizontal reading path
- focal-point: service
- alignment: start
- Start with Keep control when service accelerates
- Anchor the first read to service

## Coordinate lane

- id: restaurant-operations-action-0
- height: min(82svh, 760px)
- layout: anchored action surface
- focal-point: coordinate
- alignment: start
- Make coordinate the dominant transition
- Keep adjacent context visible

## Coordinate context

- id: restaurant-operations-context-0
- height: min(82svh, 760px)
- layout: evidence shelf
- focal-point: coordinate
- alignment: start
- Show relationships around coordinate
- Use detail as evidence, not decoration

# Visual language

- marked service surfaces
- service marks
- coordinate surfaces
- coordinate traces
- keyword: service as a route through tasks
- keyword: route
- keyword: a lateral route with one dominant turn
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
  "id": "restaurant-operations-direction-1-design",
  "route": "/",
  "concept": "service as a route through tasks",
  "status": "draft",
  "directionId": "restaurant-operations-direction-1",
  "narrative": "Service enters as context, concentrates around coordinate, then resolves through an explicit next action. This direction gives service the first move and tasks the proof.",
  "composition": {
    "sections": [
      {
        "id": "restaurant-operations-entry-0",
        "title": "Service entry",
        "height": "min(82svh, 760px)",
        "layout": "horizontal reading path",
        "focalPoint": "service",
        "alignment": "start",
        "rules": [
          "Start with Keep control when service accelerates",
          "Anchor the first read to service"
        ]
      },
      {
        "id": "restaurant-operations-action-0",
        "title": "Coordinate lane",
        "height": "min(82svh, 760px)",
        "layout": "anchored action surface",
        "focalPoint": "coordinate",
        "alignment": "start",
        "rules": [
          "Make coordinate the dominant transition",
          "Keep adjacent context visible"
        ]
      },
      {
        "id": "restaurant-operations-context-0",
        "title": "Coordinate context",
        "height": "min(82svh, 760px)",
        "layout": "evidence shelf",
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
      "marked service surfaces",
      "service marks",
      "coordinate surfaces",
      "coordinate traces"
    ],
    "keywords": [
      "service as a route through tasks",
      "route",
      "a lateral route with one dominant turn",
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
    "background": "hsl(345 28% 12%)",
    "foreground": "hsl(346 28% 92%)",
    "accent": "hsl(26 28% 92%)",
    "muted": "hsl(347 28% 12%)",
    "secondary": "hsl(68 28% 92%)"
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
        "id": "restaurant-operations-direction-1-field",
        "kind": "frame",
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 760,
        "fill": "hsl(345 28% 12%)",
        "children": []
      },
      {
        "id": "restaurant-operations-direction-1-title",
        "kind": "text",
        "x": 72,
        "y": 76,
        "width": 630,
        "height": 104,
        "role": "hero-title",
        "text": "Service / Tasks 1",
        "fontRole": "display",
        "size": 56,
        "weight": 600,
        "color": "hsl(346 28% 92%)"
      },
      {
        "id": "restaurant-operations-direction-1-metaphor",
        "kind": "text",
        "x": 72,
        "y": 210,
        "width": 480,
        "height": 72,
        "role": "metaphor",
        "text": "service as a route through tasks",
        "fontRole": "body",
        "size": 22,
        "weight": 400,
        "color": "hsl(346 28% 92%)"
      },
      {
        "id": "restaurant-operations-direction-1-trace",
        "kind": "line",
        "x": 72,
        "y": 342,
        "width": 760,
        "height": 0,
        "role": "reading-path",
        "x2": 932,
        "y2": 342,
        "stroke": "hsl(346 28% 92%)",
        "strokeWidth": 3
      },
      {
        "id": "restaurant-operations-entry-0",
        "kind": "frame",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "role": "horizontal reading path",
        "fill": "hsl(346 28% 92%)",
        "stroke": "hsl(346 28% 92%)",
        "radius": 3,
        "children": []
      },
      {
        "id": "restaurant-operations-entry-0-label",
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
        "color": "hsl(345 28% 12%)"
      },
      {
        "id": "restaurant-operations-action-0",
        "kind": "frame",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "role": "anchored action surface",
        "fill": "hsl(345 28% 12%)",
        "stroke": "hsl(346 28% 92%)",
        "radius": 0,
        "children": []
      },
      {
        "id": "restaurant-operations-action-0-label",
        "kind": "text",
        "x": 134,
        "y": 518,
        "width": 560,
        "height": 30,
        "role": "section-label",
        "text": "Coordinate lane · coordinate",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(346 28% 92%)"
      },
      {
        "id": "restaurant-operations-context-0",
        "kind": "frame",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "role": "evidence shelf",
        "fill": "hsl(346 28% 92%)",
        "stroke": "hsl(346 28% 92%)",
        "radius": 3,
        "children": []
      },
      {
        "id": "restaurant-operations-context-0-label",
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
        "color": "hsl(345 28% 12%)"
      }
    ]
  },
  "motion": {
    "principles": [
      "coordinate changes the reading path",
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
    "Keep the service as a route through tasks identity intact.",
    "Build the route opening before adding supporting details.",
    "Use service, tasks, coordinate, food as domain-specific evidence.",
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
    "id": "restaurant-operations-hypothesis-1",
    "statement": "Service becomes the visual behavior for Keep control when service accelerates; tasks proves each transition.",
    "visualMetaphor": "service as a route through tasks",
    "emotionalBehavior": "The interface moves from calm agency while coordinate accelerates to a clear confirm.",
    "spatialStrategy": "a lateral route with one dominant turn",
    "focalStrategy": "Keep service dominant; use tasks as evidence rather than ornament.",
    "materialBehavior": "marked service surfaces",
    "typographyBehavior": "Use typographic contrast to mark confirm and let service set the reading pace.",
    "interactionBehavior": "confirm changes emphasis in place while preserving the original route.",
    "visualDirectionPrompt": "Sparse art-direction plate for restaurant operations: service as a route through tasks. Show marked service surfaces, a lateral route with one dominant turn, one focal interface trace, and negative space. No finished website, no invented copy, no feature grid, no stock imagery, no named style references.",
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
    "opening": "route",
    "readingPath": [
      "service context",
      "coordinate decision",
      "coordinate evidence",
      "confirmation"
    ],
    "focalHierarchy": [
      "service",
      "coordinate",
      "coordinate",
      "recovery"
    ],
    "informationDensity": "sparse",
    "sectionRelationships": [
      "restaurant-operations-entry-0 leads to restaurant-operations-action-0",
      "restaurant-operations-action-0 supports restaurant-operations-context-0"
    ],
    "overlapRules": [
      "action surface crosses the section boundary",
      "evidence stays optically attached to its source"
    ],
    "compositionalRhythm": [
      "wide pause before coordinate",
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
      "coordinate changes the reading path",
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
        "id": "restaurant-operations-entry-0",
        "title": "Service entry",
        "height": "min(82svh, 760px)",
        "layout": "horizontal reading path",
        "focalPoint": "service",
        "alignment": "start",
        "rules": [
          "Start with Keep control when service accelerates",
          "Anchor the first read to service"
        ]
      },
      {
        "id": "restaurant-operations-action-0",
        "title": "Coordinate lane",
        "height": "min(82svh, 760px)",
        "layout": "anchored action surface",
        "focalPoint": "coordinate",
        "alignment": "start",
        "rules": [
          "Make coordinate the dominant transition",
          "Keep adjacent context visible"
        ]
      },
      {
        "id": "restaurant-operations-context-0",
        "title": "Coordinate context",
        "height": "min(82svh, 760px)",
        "layout": "evidence shelf",
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
    "opening": "route",
    "readingPath": [
      "service context",
      "coordinate decision",
      "coordinate evidence",
      "confirmation"
    ],
    "regions": [
      {
        "id": "restaurant-operations-entry-0",
        "role": "service",
        "layout": "track",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "layerIds": [
          "restaurant-operations-entry-0-layer",
          "restaurant-operations-entry-0-label"
        ],
        "emphasis": 1,
        "responsive": {
          "mobile": "stack after previous region",
          "tablet": "preserve reading order"
        }
      },
      {
        "id": "restaurant-operations-action-0",
        "role": "coordinate",
        "layout": "overlay",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "layerIds": [
          "restaurant-operations-action-0-layer",
          "restaurant-operations-action-0-label"
        ],
        "emphasis": 0.84,
        "responsive": {
          "mobile": "stack after previous region",
          "tablet": "preserve reading order"
        }
      },
      {
        "id": "restaurant-operations-context-0",
        "role": "coordinate",
        "layout": "track",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "layerIds": [
          "restaurant-operations-context-0-layer",
          "restaurant-operations-context-0-label"
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
        "id": "restaurant-operations-entry-0-restaurant-operations-entry-0-layer-layer",
        "nodeId": "restaurant-operations-entry-0-layer",
        "regionId": "restaurant-operations-entry-0",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "restaurant-operations-entry-0"
      },
      {
        "id": "restaurant-operations-entry-0-restaurant-operations-entry-0-label-layer",
        "nodeId": "restaurant-operations-entry-0-label",
        "regionId": "restaurant-operations-entry-0",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "restaurant-operations-entry-0"
      },
      {
        "id": "restaurant-operations-action-0-restaurant-operations-action-0-layer-layer",
        "nodeId": "restaurant-operations-action-0-layer",
        "regionId": "restaurant-operations-action-0",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "restaurant-operations-action-0"
      },
      {
        "id": "restaurant-operations-action-0-restaurant-operations-action-0-label-layer",
        "nodeId": "restaurant-operations-action-0-label",
        "regionId": "restaurant-operations-action-0",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "restaurant-operations-action-0"
      },
      {
        "id": "restaurant-operations-context-0-restaurant-operations-context-0-layer-layer",
        "nodeId": "restaurant-operations-context-0-layer",
        "regionId": "restaurant-operations-context-0",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "restaurant-operations-context-0"
      },
      {
        "id": "restaurant-operations-context-0-restaurant-operations-context-0-label-layer",
        "nodeId": "restaurant-operations-context-0-label",
        "regionId": "restaurant-operations-context-0",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "restaurant-operations-context-0"
      }
    ],
    "relationships": [
      {
        "from": "restaurant-operations-entry-0",
        "to": "restaurant-operations-action-0",
        "kind": "leads-to",
        "rationale": "restaurant-operations-entry-0 leads to restaurant-operations-action-0"
      },
      {
        "from": "restaurant-operations-action-0",
        "to": "restaurant-operations-context-0",
        "kind": "leads-to",
        "rationale": "restaurant-operations-action-0 supports restaurant-operations-context-0"
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
        "id": "restaurant-operations-direction-1-field",
        "kind": "frame",
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 760,
        "fill": "hsl(345 28% 12%)",
        "children": []
      },
      {
        "id": "restaurant-operations-direction-1-title",
        "kind": "text",
        "x": 72,
        "y": 76,
        "width": 630,
        "height": 104,
        "text": "Service / Tasks 1",
        "fontRole": "display",
        "size": 56,
        "weight": 600,
        "color": "hsl(346 28% 92%)",
        "role": "hero-title"
      },
      {
        "id": "restaurant-operations-direction-1-metaphor",
        "kind": "text",
        "x": 72,
        "y": 210,
        "width": 480,
        "height": 72,
        "text": "service as a route through tasks",
        "fontRole": "body",
        "size": 22,
        "weight": 400,
        "color": "hsl(346 28% 92%)",
        "role": "metaphor"
      },
      {
        "id": "restaurant-operations-direction-1-trace",
        "kind": "line",
        "x": 72,
        "y": 342,
        "width": 760,
        "height": 0,
        "x2": 932,
        "y2": 342,
        "stroke": "hsl(346 28% 92%)",
        "strokeWidth": 3,
        "role": "reading-path"
      },
      {
        "id": "restaurant-operations-entry-0",
        "kind": "frame",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "fill": "hsl(346 28% 92%)",
        "stroke": "hsl(346 28% 92%)",
        "radius": 3,
        "children": [],
        "role": "horizontal reading path"
      },
      {
        "id": "restaurant-operations-entry-0-label",
        "kind": "text",
        "x": 96,
        "y": 412,
        "width": 560,
        "height": 30,
        "text": "Service entry · service",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(345 28% 12%)",
        "role": "section-label"
      },
      {
        "id": "restaurant-operations-action-0",
        "kind": "frame",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "fill": "hsl(345 28% 12%)",
        "stroke": "hsl(346 28% 92%)",
        "radius": 0,
        "children": [],
        "role": "anchored action surface"
      },
      {
        "id": "restaurant-operations-action-0-label",
        "kind": "text",
        "x": 134,
        "y": 518,
        "width": 560,
        "height": 30,
        "text": "Coordinate lane · coordinate",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(346 28% 92%)",
        "role": "section-label"
      },
      {
        "id": "restaurant-operations-context-0",
        "kind": "frame",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "fill": "hsl(346 28% 92%)",
        "stroke": "hsl(346 28% 92%)",
        "radius": 3,
        "children": [],
        "role": "evidence shelf"
      },
      {
        "id": "restaurant-operations-context-0-label",
        "kind": "text",
        "x": 96,
        "y": 624,
        "width": 560,
        "height": 30,
        "text": "Coordinate context · coordinate",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(345 28% 12%)",
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
