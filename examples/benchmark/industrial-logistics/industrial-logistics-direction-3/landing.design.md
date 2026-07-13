---
id: industrial-logistics-direction-3-design
route: /
concept: route as a field of changing sequence
status: draft
---

# Narrative

Freight enters as context, concentrates around synchronize, then resolves through an explicit next action. This direction gives sequence the first move and dock the proof.

# Composition

## Freight entry

- id: industrial-logistics-entry-2
- height: min(82svh, 760px)
- layout: horizontal reading path
- focal-point: freight
- alignment: start
- Start with Keep the route trustworthy when timing slips
- Anchor the first read to freight

## Resolve lane

- id: industrial-logistics-action-2
- height: min(82svh, 760px)
- layout: sequential action track
- focal-point: resolve
- alignment: start
- Make resolve the dominant transition
- Keep adjacent context visible

## Synchronize context

- id: industrial-logistics-context-2
- height: min(82svh, 760px)
- layout: evidence shelf
- focal-point: synchronize
- alignment: start
- Show relationships around synchronize
- Use detail as evidence, not decoration

# Visual language

- calibrated sequence traces
- freight marks
- synchronize surfaces
- sequence traces
- keyword: route as a field of changing sequence
- keyword: interface
- keyword: a broad field with a measured focal island
- keyword: synchronize
- keyword: loads

# Avoid

- unrelated decorative gradients
- generic dashboard mockups
- feature-card grids
- floating glass panels
- abstract blobs

<!-- lde-data
{
  "id": "industrial-logistics-direction-3-design",
  "route": "/",
  "concept": "route as a field of changing sequence",
  "status": "draft",
  "directionId": "industrial-logistics-direction-3",
  "narrative": "Freight enters as context, concentrates around synchronize, then resolves through an explicit next action. This direction gives sequence the first move and dock the proof.",
  "composition": {
    "sections": [
      {
        "id": "industrial-logistics-entry-2",
        "title": "Freight entry",
        "height": "min(82svh, 760px)",
        "layout": "horizontal reading path",
        "focalPoint": "freight",
        "alignment": "start",
        "rules": [
          "Start with Keep the route trustworthy when timing slips",
          "Anchor the first read to freight"
        ]
      },
      {
        "id": "industrial-logistics-action-2",
        "title": "Resolve lane",
        "height": "min(82svh, 760px)",
        "layout": "sequential action track",
        "focalPoint": "resolve",
        "alignment": "start",
        "rules": [
          "Make resolve the dominant transition",
          "Keep adjacent context visible"
        ]
      },
      {
        "id": "industrial-logistics-context-2",
        "title": "Synchronize context",
        "height": "min(82svh, 760px)",
        "layout": "evidence shelf",
        "focalPoint": "synchronize",
        "alignment": "start",
        "rules": [
          "Show relationships around synchronize",
          "Use detail as evidence, not decoration"
        ]
      }
    ]
  },
  "visualLanguage": {
    "materials": [
      "calibrated sequence traces",
      "freight marks",
      "synchronize surfaces",
      "sequence traces"
    ],
    "keywords": [
      "route as a field of changing sequence",
      "interface",
      "a broad field with a measured focal island",
      "synchronize",
      "loads"
    ]
  },
  "typography": {
    "display": "compressed editorial display",
    "body": "plain operational sans",
    "mono": "legible technical mono"
  },
  "colors": {
    "background": "hsl(80 28% 12%)",
    "foreground": "hsl(81 28% 92%)",
    "accent": "hsl(121 28% 92%)",
    "muted": "hsl(82 28% 12%)",
    "secondary": "hsl(163 28% 92%)"
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
        "id": "industrial-logistics-direction-3-field",
        "kind": "frame",
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 760,
        "fill": "hsl(80 28% 12%)",
        "children": []
      },
      {
        "id": "industrial-logistics-direction-3-title",
        "kind": "text",
        "x": 72,
        "y": 76,
        "width": 630,
        "height": 104,
        "role": "hero-title",
        "text": "Sequence / Dock 3",
        "fontRole": "display",
        "size": 56,
        "weight": 600,
        "color": "hsl(81 28% 92%)"
      },
      {
        "id": "industrial-logistics-direction-3-metaphor",
        "kind": "text",
        "x": 72,
        "y": 210,
        "width": 480,
        "height": 72,
        "role": "metaphor",
        "text": "route as a field of changing sequence",
        "fontRole": "body",
        "size": 22,
        "weight": 400,
        "color": "hsl(81 28% 92%)"
      },
      {
        "id": "industrial-logistics-direction-3-trace",
        "kind": "line",
        "x": 72,
        "y": 342,
        "width": 760,
        "height": 0,
        "role": "reading-path",
        "x2": 932,
        "y2": 342,
        "stroke": "hsl(81 28% 92%)",
        "strokeWidth": 3
      },
      {
        "id": "industrial-logistics-entry-2",
        "kind": "frame",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "role": "horizontal reading path",
        "fill": "hsl(81 28% 92%)",
        "stroke": "hsl(81 28% 92%)",
        "radius": 3,
        "children": []
      },
      {
        "id": "industrial-logistics-entry-2-label",
        "kind": "text",
        "x": 96,
        "y": 412,
        "width": 560,
        "height": 30,
        "role": "section-label",
        "text": "Freight entry · freight",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(80 28% 12%)"
      },
      {
        "id": "industrial-logistics-action-2",
        "kind": "frame",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "role": "sequential action track",
        "fill": "hsl(80 28% 12%)",
        "stroke": "hsl(81 28% 92%)",
        "radius": 0,
        "children": []
      },
      {
        "id": "industrial-logistics-action-2-label",
        "kind": "text",
        "x": 134,
        "y": 518,
        "width": 560,
        "height": 30,
        "role": "section-label",
        "text": "Resolve lane · resolve",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(81 28% 92%)"
      },
      {
        "id": "industrial-logistics-context-2",
        "kind": "frame",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "role": "evidence shelf",
        "fill": "hsl(81 28% 92%)",
        "stroke": "hsl(81 28% 92%)",
        "radius": 3,
        "children": []
      },
      {
        "id": "industrial-logistics-context-2-label",
        "kind": "text",
        "x": 96,
        "y": 624,
        "width": 560,
        "height": 30,
        "role": "section-label",
        "text": "Synchronize context · synchronize",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(80 28% 12%)"
      }
    ]
  },
  "motion": {
    "principles": [
      "resolve changes the reading path",
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
    "Keep the route as a field of changing sequence identity intact.",
    "Build the interface opening before adding supporting details.",
    "Use sequence, dock, synchronize, loads, routes as domain-specific evidence.",
    "Do not introduce generic SaaS cards, unrelated gradients, or invented imagery."
  ],
  "generatedAt": "2026-07-13T00:00:00.000Z",
  "meaning": {
    "briefId": "industrial-logistics",
    "productDomain": "industrial logistics",
    "userTension": "Keep the route trustworthy when timing slips",
    "emotionalTarget": "calm agency while sequence accelerates",
    "domainObjects": [
      "synchronize",
      "loads",
      "routes",
      "dock",
      "timing",
      "signal",
      "industrial"
    ],
    "domainMaterials": [
      "freight marks",
      "synchronize surfaces",
      "sequence traces"
    ],
    "centralMetaphor": "freight as a readable field where synchronize moves through a sequence",
    "visualNarrative": "Freight enters as context, concentrates around synchronize, then resolves through an explicit next action.",
    "visualKeywords": [
      "freight",
      "synchronize",
      "sequence",
      "loads",
      "resolve",
      "signal"
    ],
    "patternsToAvoid": [
      "unrelated decorative gradients",
      "generic dashboard mockups",
      "feature-card grids",
      "floating glass panels",
      "abstract blobs"
    ],
    "businessObjective": "Synchronize loads, routes, dock timing, and exception handling across a distributed operation.",
    "operationalVerbs": [
      "sequence",
      "loads",
      "resolve",
      "exceptions",
      "route",
      "trustworthy",
      "when",
      "timing",
      "slips"
    ],
    "userJourney": [
      "orient",
      "sequence",
      "loads",
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
      "synchronize",
      "loads",
      "next action",
      "recovery state"
    ],
    "entityRelationships": [
      "synchronize relates to loads",
      "loads relates to routes",
      "routes relates to dock",
      "dock relates to timing"
    ],
    "evidence": [
      {
        "source": "domain",
        "input": "industrial logistics",
        "conclusion": "The product operates in industrial logistics.",
        "consequence": "The interface must expose freight as an active context."
      },
      {
        "source": "summary",
        "input": "Synchronize loads, routes, dock timing, and exception handling across a distributed operation.",
        "conclusion": "The work centers on synchronize, loads, routes.",
        "consequence": "The visual system must privilege those objects over generic interface chrome."
      },
      {
        "source": "tension",
        "input": "Keep the route trustworthy when timing slips",
        "conclusion": "The user tension is Keep the route trustworthy when timing slips.",
        "consequence": "The first read must make the critical decision legible before secondary detail."
      },
      {
        "source": "jobs",
        "input": "sequence loads, resolve exceptions",
        "conclusion": "Users repeatedly sequence, loads, resolve.",
        "consequence": "Composition should read as a sequence of actions, not a feature inventory."
      }
    ]
  },
  "hypothesis": {
    "id": "industrial-logistics-hypothesis-3",
    "statement": "Sequence becomes the visual behavior for Keep the route trustworthy when timing slips; dock proves each transition.",
    "visualMetaphor": "route as a field of changing sequence",
    "emotionalBehavior": "The interface moves from calm agency while sequence accelerates to a clear route.",
    "spatialStrategy": "a broad field with a measured focal island",
    "focalStrategy": "Keep sequence dominant; use dock as evidence rather than ornament.",
    "materialBehavior": "calibrated sequence traces",
    "typographyBehavior": "Use typographic contrast to mark route and let sequence set the reading pace.",
    "interactionBehavior": "route changes emphasis in place while preserving the original route.",
    "visualDirectionPrompt": "Sparse art-direction plate for industrial logistics: route as a field of changing sequence. Show calibrated sequence traces, a broad field with a measured focal island, one focal interface trace, and negative space. No finished website, no invented copy, no feature grid, no stock imagery, no named style references.",
    "evidence": [
      {
        "source": "domain",
        "input": "industrial logistics",
        "conclusion": "The product operates in industrial logistics.",
        "consequence": "The interface must expose freight as an active context."
      },
      {
        "source": "summary",
        "input": "Synchronize loads, routes, dock timing, and exception handling across a distributed operation.",
        "conclusion": "The work centers on synchronize, loads, routes.",
        "consequence": "The visual system must privilege those objects over generic interface chrome."
      },
      {
        "source": "tension",
        "input": "Keep the route trustworthy when timing slips",
        "conclusion": "The user tension is Keep the route trustworthy when timing slips.",
        "consequence": "The first read must make the critical decision legible before secondary detail."
      },
      {
        "source": "jobs",
        "input": "sequence loads, resolve exceptions",
        "conclusion": "Users repeatedly sequence, loads, resolve.",
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
    "opening": "interface",
    "readingPath": [
      "freight context",
      "resolve decision",
      "synchronize evidence",
      "confirmation"
    ],
    "focalHierarchy": [
      "freight",
      "resolve",
      "synchronize",
      "recovery"
    ],
    "informationDensity": "dense",
    "sectionRelationships": [
      "industrial-logistics-entry-2 leads to industrial-logistics-action-2",
      "industrial-logistics-action-2 supports industrial-logistics-context-2"
    ],
    "overlapRules": [
      "action surface crosses the section boundary",
      "evidence stays optically attached to its source"
    ],
    "compositionalRhythm": [
      "wide pause before resolve",
      "short interval around synchronize",
      "clear closure after confirmation"
    ],
    "typographyBehavior": [
      "use a compressed display voice for freight",
      "keep operational labels terse",
      "let synchronize carry the longest measure"
    ],
    "materialBehavior": [
      "surface freight as a visible trace",
      "differentiate synchronize by texture or rule",
      "avoid decorative material without a domain role"
    ],
    "interactionBehavior": [
      "resolve changes the reading path",
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
        "id": "industrial-logistics-entry-2",
        "title": "Freight entry",
        "height": "min(82svh, 760px)",
        "layout": "horizontal reading path",
        "focalPoint": "freight",
        "alignment": "start",
        "rules": [
          "Start with Keep the route trustworthy when timing slips",
          "Anchor the first read to freight"
        ]
      },
      {
        "id": "industrial-logistics-action-2",
        "title": "Resolve lane",
        "height": "min(82svh, 760px)",
        "layout": "sequential action track",
        "focalPoint": "resolve",
        "alignment": "start",
        "rules": [
          "Make resolve the dominant transition",
          "Keep adjacent context visible"
        ]
      },
      {
        "id": "industrial-logistics-context-2",
        "title": "Synchronize context",
        "height": "min(82svh, 760px)",
        "layout": "evidence shelf",
        "focalPoint": "synchronize",
        "alignment": "start",
        "rules": [
          "Show relationships around synchronize",
          "Use detail as evidence, not decoration"
        ]
      }
    ],
    "reasoning": [
      {
        "source": "domain",
        "input": "industrial logistics",
        "conclusion": "The product operates in industrial logistics.",
        "consequence": "The interface must expose freight as an active context."
      },
      {
        "source": "summary",
        "input": "Synchronize loads, routes, dock timing, and exception handling across a distributed operation.",
        "conclusion": "The work centers on synchronize, loads, routes.",
        "consequence": "The visual system must privilege those objects over generic interface chrome."
      },
      {
        "source": "tension",
        "input": "Keep the route trustworthy when timing slips",
        "conclusion": "The user tension is Keep the route trustworthy when timing slips.",
        "consequence": "The first read must make the critical decision legible before secondary detail."
      },
      {
        "source": "jobs",
        "input": "sequence loads, resolve exceptions",
        "conclusion": "Users repeatedly sequence, loads, resolve.",
        "consequence": "Composition should read as a sequence of actions, not a feature inventory."
      }
    ]
  },
  "sceneGraph": {
    "width": 1200,
    "height": 760,
    "opening": "interface",
    "readingPath": [
      "freight context",
      "resolve decision",
      "synchronize evidence",
      "confirmation"
    ],
    "regions": [
      {
        "id": "industrial-logistics-entry-2",
        "role": "freight",
        "layout": "track",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "layerIds": [
          "industrial-logistics-entry-2-layer",
          "industrial-logistics-entry-2-label"
        ],
        "emphasis": 1,
        "responsive": {
          "mobile": "stack after previous region",
          "tablet": "preserve reading order"
        }
      },
      {
        "id": "industrial-logistics-action-2",
        "role": "resolve",
        "layout": "overlay",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "layerIds": [
          "industrial-logistics-action-2-layer",
          "industrial-logistics-action-2-label"
        ],
        "emphasis": 0.84,
        "responsive": {
          "mobile": "stack after previous region",
          "tablet": "preserve reading order"
        }
      },
      {
        "id": "industrial-logistics-context-2",
        "role": "synchronize",
        "layout": "track",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "layerIds": [
          "industrial-logistics-context-2-layer",
          "industrial-logistics-context-2-label"
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
        "id": "industrial-logistics-entry-2-industrial-logistics-entry-2-layer-layer",
        "nodeId": "industrial-logistics-entry-2-layer",
        "regionId": "industrial-logistics-entry-2",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "industrial-logistics-entry-2"
      },
      {
        "id": "industrial-logistics-entry-2-industrial-logistics-entry-2-label-layer",
        "nodeId": "industrial-logistics-entry-2-label",
        "regionId": "industrial-logistics-entry-2",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "industrial-logistics-entry-2"
      },
      {
        "id": "industrial-logistics-action-2-industrial-logistics-action-2-layer-layer",
        "nodeId": "industrial-logistics-action-2-layer",
        "regionId": "industrial-logistics-action-2",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "industrial-logistics-action-2"
      },
      {
        "id": "industrial-logistics-action-2-industrial-logistics-action-2-label-layer",
        "nodeId": "industrial-logistics-action-2-label",
        "regionId": "industrial-logistics-action-2",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "industrial-logistics-action-2"
      },
      {
        "id": "industrial-logistics-context-2-industrial-logistics-context-2-layer-layer",
        "nodeId": "industrial-logistics-context-2-layer",
        "regionId": "industrial-logistics-context-2",
        "zIndex": 0,
        "semanticRole": "surface",
        "anchor": "industrial-logistics-context-2"
      },
      {
        "id": "industrial-logistics-context-2-industrial-logistics-context-2-label-layer",
        "nodeId": "industrial-logistics-context-2-label",
        "regionId": "industrial-logistics-context-2",
        "zIndex": 1,
        "semanticRole": "label",
        "anchor": "industrial-logistics-context-2"
      }
    ],
    "relationships": [
      {
        "from": "industrial-logistics-entry-2",
        "to": "industrial-logistics-action-2",
        "kind": "leads-to",
        "rationale": "industrial-logistics-entry-2 leads to industrial-logistics-action-2"
      },
      {
        "from": "industrial-logistics-action-2",
        "to": "industrial-logistics-context-2",
        "kind": "leads-to",
        "rationale": "industrial-logistics-action-2 supports industrial-logistics-context-2"
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
        "id": "industrial-logistics-direction-3-field",
        "kind": "frame",
        "x": 0,
        "y": 0,
        "width": 1200,
        "height": 760,
        "fill": "hsl(80 28% 12%)",
        "children": []
      },
      {
        "id": "industrial-logistics-direction-3-title",
        "kind": "text",
        "x": 72,
        "y": 76,
        "width": 630,
        "height": 104,
        "text": "Sequence / Dock 3",
        "fontRole": "display",
        "size": 56,
        "weight": 600,
        "color": "hsl(81 28% 92%)",
        "role": "hero-title"
      },
      {
        "id": "industrial-logistics-direction-3-metaphor",
        "kind": "text",
        "x": 72,
        "y": 210,
        "width": 480,
        "height": 72,
        "text": "route as a field of changing sequence",
        "fontRole": "body",
        "size": 22,
        "weight": 400,
        "color": "hsl(81 28% 92%)",
        "role": "metaphor"
      },
      {
        "id": "industrial-logistics-direction-3-trace",
        "kind": "line",
        "x": 72,
        "y": 342,
        "width": 760,
        "height": 0,
        "x2": 932,
        "y2": 342,
        "stroke": "hsl(81 28% 92%)",
        "strokeWidth": 3,
        "role": "reading-path"
      },
      {
        "id": "industrial-logistics-entry-2",
        "kind": "frame",
        "x": 72,
        "y": 390,
        "width": 960,
        "height": 76,
        "fill": "hsl(81 28% 92%)",
        "stroke": "hsl(81 28% 92%)",
        "radius": 3,
        "children": [],
        "role": "horizontal reading path"
      },
      {
        "id": "industrial-logistics-entry-2-label",
        "kind": "text",
        "x": 96,
        "y": 412,
        "width": 560,
        "height": 30,
        "text": "Freight entry · freight",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(80 28% 12%)",
        "role": "section-label"
      },
      {
        "id": "industrial-logistics-action-2",
        "kind": "frame",
        "x": 110,
        "y": 496,
        "width": 884,
        "height": 76,
        "fill": "hsl(80 28% 12%)",
        "stroke": "hsl(81 28% 92%)",
        "radius": 0,
        "children": [],
        "role": "sequential action track"
      },
      {
        "id": "industrial-logistics-action-2-label",
        "kind": "text",
        "x": 134,
        "y": 518,
        "width": 560,
        "height": 30,
        "text": "Resolve lane · resolve",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(81 28% 92%)",
        "role": "section-label"
      },
      {
        "id": "industrial-logistics-context-2",
        "kind": "frame",
        "x": 72,
        "y": 602,
        "width": 960,
        "height": 76,
        "fill": "hsl(81 28% 92%)",
        "stroke": "hsl(81 28% 92%)",
        "radius": 3,
        "children": [],
        "role": "evidence shelf"
      },
      {
        "id": "industrial-logistics-context-2-label",
        "kind": "text",
        "x": 96,
        "y": 624,
        "width": 560,
        "height": 30,
        "text": "Synchronize context · synchronize",
        "fontRole": "mono",
        "size": 15,
        "weight": 500,
        "color": "hsl(80 28% 12%)",
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
