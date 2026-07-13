<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { transformationStages } from './site';
import studioOverviewUrl from '../../../docs/assets/screenshots/studio-overview.png';
import studioDirectionsUrl from '../../../docs/assets/screenshots/studio-directions.png';
import studioSpecificationUrl from '../../../docs/assets/screenshots/studio-specification.png';
import studioPreviewUrl from '../../../docs/assets/screenshots/studio-preview-desktop.png';
import studioLintUrl from '../../../docs/assets/screenshots/studio-lint.png';
import studioMobileUrl from '../../../docs/assets/screenshots/studio-preview-mobile.png';

const workflowEvidence = [
  {
    title: 'Project overview',
    detail: 'Brief, provider mode, artifact state, and the current creative direction.',
    image: studioOverviewUrl,
  },
  {
    title: 'Direction comparison',
    detail: 'Three source-derived directions can be compared before one is selected.',
    image: studioDirectionsUrl,
  },
  {
    title: 'Inspectable specification',
    detail: 'The selected direction resolves into a scene graph and executable rules.',
    image: studioSpecificationUrl,
  },
  {
    title: 'Deterministic preview',
    detail: 'The rendered scene is available at desktop and mobile capture sizes.',
    image: studioPreviewUrl,
  },
  {
    title: 'Anti-slop report',
    detail: 'Concept-linked warnings remain visible beside the authored direction.',
    image: studioLintUrl,
  },
  {
    title: 'Mobile workflow',
    detail: 'The local Studio keeps the brief-to-preview path usable at 390px.',
    image: studioMobileUrl,
  },
];

const activeStage = ref(0);
const currentStage = computed(
  () => transformationStages[activeStage.value] ?? transformationStages[0]!,
);
const isBrandRoute = ref(false);

function syncBrandRoute() {
  isBrandRoute.value = window.location.hash === '#brand' || window.location.hash === '#brandkit';
}

function selectStage(index: number) {
  activeStage.value = index;
}

function navigateBrandRoute() {
  window.location.hash = '#brand';
}

function closeBrandRoute() {
  window.location.hash = '#hero';
}

onMounted(() => {
  syncBrandRoute();
  window.addEventListener('hashchange', syncBrandRoute);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', syncBrandRoute);
});
</script>

<template>
  <div class="site-shell" :class="{ 'brand-route': isBrandRoute }">
    <header class="site-header" aria-label="Primary navigation">
      <a class="wordmark" href="#hero" aria-label="LLM Design Engine home">
        <span class="wordmark-mark" aria-hidden="true"></span>
        <span>LLM Design Engine</span>
      </a>
      <nav class="nav-links">
        <a href="#transformation">Compiler</a>
        <a href="#design-spec">Spec</a>
        <a href="#evidence">Evidence</a>
        <a href="#open-source">Project status</a>
      </nav>
      <button class="header-cta" type="button" @click="navigateBrandRoute">View brandkit</button>
    </header>

    <main v-if="isBrandRoute" class="brand-route-page">
      <section
        id="brandkit"
        class="brand-section section-frame"
        aria-labelledby="brand-route-title"
      >
        <div class="brand-copy">
          <p class="kicker">Brand showcase / route</p>
          <h1 id="brand-route-title">A system that makes <em>decisions visible.</em></h1>
          <p>
            The LLM Design Engine identity is a working specimen: warm paper for context, oxidized
            coral for intervention, and mineral teal for a reliable path through the system.
          </p>
          <p class="route-note">
            The mark is a registration frame, not a sparkle. It holds meaning in place long enough
            for an agent to execute it.
          </p>
          <a class="button button-primary" href="#hero" @click="closeBrandRoute"
            >Return to compiler <span aria-hidden="true">↗</span></a
          >
        </div>
        <div class="brand-board">
          <img
            src="/static/brandkit.svg"
            alt="LLM Design Engine brandkit board with paper, coral and mineral teal swatches"
          />
          <div class="swatch-labels">
            <span><i class="swatch swatch-paper"></i>Warm paper / 01</span
            ><span><i class="swatch swatch-coral"></i>Oxidized coral / 02</span
            ><span><i class="swatch swatch-teal"></i>Mineral teal / 03</span>
          </div>
        </div>
      </section>
    </main>

    <main v-else>
      <section id="hero" class="hero section-frame reveal">
        <div class="hero-copy">
          <p class="kicker">
            <span class="registration-dot" aria-hidden="true"></span> Design compiler / 01
          </p>
          <h1>Turn a rough brief into a <em>buildable</em> world.</h1>
          <p class="hero-intro">
            LLM Design Engine gives coding agents a creative director: interpret the brief, set the
            visual system, and compile a design document before a single component is written.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" href="#transformation"
              >See the transformation <span aria-hidden="true">↓</span></a
            >
            <a class="text-link" href="#cli">Read the CLI <span aria-hidden="true">↗</span></a>
          </div>
          <div class="hero-proof" aria-label="Project status">
            <span><strong>MIT</strong> licensed</span
            ><span class="proof-rule" aria-hidden="true"></span
            ><span>Deterministic by default</span>
          </div>
        </div>
        <div class="hero-art blueprint-panel">
          <img
            src="/static/hero-foundry.svg"
            alt="Abstract foundry mark with registration lines and kiln-black forms"
          />
          <div class="blueprint-note note-a">BRIEF / 001</div>
          <div class="blueprint-note note-b">MATERIAL STUDY: PAPER + OXIDE</div>
          <div class="blueprint-stamp">LDE<br /><span>READY TO CAST</span></div>
        </div>
      </section>

      <section id="transformation" class="section-frame transformation-section reveal">
        <div class="section-intro split-intro">
          <div>
            <p class="kicker">The transformation</p>
            <h2>Four passes.<br /><em>One inspectable artifact.</em></h2>
          </div>
          <p>
            Most agents jump from prompt to pixels. LDE records the interpretation, direction,
            document, and preview so a team can steer the work before implementation calcifies.
          </p>
        </div>
        <div class="stage-tabs" role="tablist" aria-label="Transformation stages">
          <button
            v-for="(stage, index) in transformationStages"
            :key="stage.label"
            class="stage-tab"
            :class="{ active: activeStage === index }"
            type="button"
            role="tab"
            :aria-selected="activeStage === index"
            @click="selectStage(index)"
          >
            <span>{{ stage.label }}</span
            ><strong>{{ stage.eyebrow }}</strong>
          </button>
        </div>
        <div class="transformation-panel" role="tabpanel">
          <div class="panel-index">0{{ activeStage + 1 }}</div>
          <div class="panel-copy">
            <p class="eyebrow">{{ currentStage.eyebrow }}</p>
            <h3>{{ currentStage.title }}</h3>
            <p>{{ currentStage.body }}</p>
          </div>
          <code class="panel-code">{{ currentStage.code }}</code>
          <div class="panel-arrow" aria-hidden="true">↗</div>
        </div>
      </section>

      <section id="comparison" class="section-frame comparison-section reveal">
        <div class="section-intro">
          <p class="kicker">A useful refusal</p>
          <h2>Generic is a <em>process</em> problem.</h2>
          <p>
            When every decision is implicit, every output drifts toward the average. LDE makes taste
            explicit and keeps it testable.
          </p>
        </div>
        <div
          class="comparison-table"
          role="table"
          aria-label="Generic workflow compared with LLM Design Engine"
        >
          <div class="comparison-row comparison-head" role="row">
            <span role="columnheader">Without a design compiler</span
            ><span role="columnheader">With LLM Design Engine</span>
          </div>
          <div class="comparison-row" role="row">
            <span role="cell"
              ><b>Prompt → component</b
              ><small>Visual choices appear too late to challenge.</small></span
            ><span role="cell"
              ><b>Brief → direction → spec</b
              ><small>Interpretation is a shared, editable artifact.</small></span
            >
          </div>
          <div class="comparison-row" role="row">
            <span role="cell"
              ><b>“Make it modern”</b><small>Familiar defaults fill the gaps.</small></span
            ><span role="cell"
              ><b>Named materials + constraints</b
              ><small>Paper grain, type scale, motion and refusal list.</small></span
            >
          </div>
          <div class="comparison-row" role="row">
            <span role="cell"
              ><b>Pretty once</b><small>Every new screen resets the visual language.</small></span
            ><span role="cell"
              ><b>Tokens that travel</b
              ><small>One system across scenes, assets and states.</small></span
            >
          </div>
        </div>
      </section>

      <section id="design-spec" class="section-frame spec-section reveal">
        <div class="spec-art blueprint-panel">
          <img
            src="/static/blueprint.svg"
            alt="Blueprint sheet showing annotated scene nodes"
          /><span class="blueprint-note spec-note">SCENE NODE / HERO</span>
        </div>
        <div class="spec-copy">
          <p class="kicker">Design document</p>
          <h2>From taste to <em>coordinates.</em></h2>
          <p>
            The output is JSON-safe, markdown-readable, and specific enough to remove guesswork
            without removing judgement.
          </p>
          <div class="spec-list">
            <div>
              <span>01</span><strong>Creative direction</strong
              ><small>Voice, palette, material, type and motion rules.</small>
            </div>
            <div>
              <span>02</span><strong>Scene graph</strong
              ><small>Semantic nodes with intent, hierarchy and responsive behavior.</small>
            </div>
            <div>
              <span>03</span><strong>Lint report</strong
              ><small>Flags generic patterns and missing domain specificity.</small>
            </div>
          </div>
        </div>
      </section>

      <section id="deterministic-preview" class="section-frame preview-section reveal">
        <div class="section-intro split-intro">
          <div>
            <p class="kicker">Deterministic preview</p>
            <h2>Same seed.<br /><em>Same signal.</em></h2>
          </div>
          <p>
            Mock providers make the default path useful offline. Swap in a provider when you are
            ready; the document shape stays stable.
          </p>
        </div>
        <div class="preview-grid">
          <div class="preview-window">
            <div class="window-bar">
              <span class="window-led"></span><span>preview / seed 0042</span><span>100%</span>
            </div>
            <div class="preview-canvas">
              <div class="mini-label">GASTROOPS / SERVICE LOG</div>
              <h3>Make the next shift<br /><em>feel lighter.</em></h3>
              <div class="mini-rule"></div>
              <div class="mini-stats">
                <span><b>08</b> open checks</span><span><b>02</b> handoffs</span>
              </div>
            </div>
          </div>
          <div class="preview-notes">
            <div class="margin-note">
              <span class="note-line"></span>
              <p>
                <b>01 / Stable output</b>Visual regression tests can trust what the mock provider
                returns.
              </p>
            </div>
            <div class="margin-note">
              <span class="note-line"></span>
              <p>
                <b>02 / Provider-ready</b>Use your model for interpretation, not for inventing a new
                system each run.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="evidence"
        class="section-frame evidence-section reveal"
        aria-labelledby="evidence-title"
      >
        <div class="section-intro split-intro">
          <div>
            <p class="kicker">Reproducible evidence</p>
            <h2 id="evidence-title">The workflow,<br /><em>not a mockup.</em></h2>
          </div>
          <p>
            These are actual local Studio captures generated with <code>pnpm screenshots</code>.
            They show the fixture-backed path from brief to report at the same capture sizes used in
            browser checks.
          </p>
        </div>
        <div class="evidence-grid">
          <figure v-for="frame in workflowEvidence" :key="frame.title" class="evidence-frame">
            <img :src="frame.image" :alt="`${frame.title} Studio screenshot`" loading="lazy" />
            <figcaption>
              <strong>{{ frame.title }}</strong
              ><span>{{ frame.detail }}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="anti-slop" class="section-frame anti-section reveal">
        <div>
          <p class="kicker">Anti-slop protocol</p>
          <h2>Refuse the <em>easy answer.</em></h2>
          <p>
            Good direction is partly a list of things we will not do. The compiler carries those
            constraints into every generated scene.
          </p>
        </div>
        <div class="refusal-list">
          <div>
            <span>×</span>
            <p>
              <b>No gradient wallpaper</b
              ><small>Depth comes from paper, linework and contrast.</small>
            </p>
          </div>
          <div>
            <span>×</span>
            <p><b>No card farms</b><small>Hierarchy follows the story, not a template.</small></p>
          </div>
          <div>
            <span>×</span>
            <p>
              <b>No decorative metrics</b
              ><small>Numbers earn their place by changing a decision.</small>
            </p>
          </div>
        </div>
      </section>

      <section id="brandkit" class="section-frame brand-section reveal">
        <div class="brand-copy">
          <p class="kicker">Brandkit / the foundry</p>
          <h2>Warm paper.<br /><em>Sharp thinking.</em></h2>
          <p>
            A visual language for tools that shape tools. Oxidized coral marks the intervention;
            mineral teal marks a reliable path through the system.
          </p>
          <button class="button button-secondary" type="button" @click="navigateBrandRoute">
            Open brand route
          </button>
        </div>
        <div class="brand-board">
          <img
            src="/static/brandkit.svg"
            alt="LLM Design Engine brandkit board with paper, coral and mineral teal swatches"
          />
          <div class="swatch-labels">
            <span><i class="swatch swatch-paper"></i>Warm paper / 01</span
            ><span><i class="swatch swatch-coral"></i>Oxidized coral / 02</span
            ><span><i class="swatch swatch-teal"></i>Mineral teal / 03</span>
          </div>
        </div>
      </section>

      <section id="gastroops" class="section-frame case-section reveal">
        <div class="case-image">
          <img
            src="/static/gastroops.svg"
            alt="Conceptual GastroOps visual direction: a calm operations board with annotated handoffs"
          /><span class="case-caption">CONCEPTUAL DIRECTION / 002</span>
        </div>
        <div class="case-copy">
          <p class="kicker">Case study / GastroOps</p>
          <h2>Less dashboard.<br /><em>More handoff.</em></h2>
          <p>
            The included GastroOps fixture treats restaurant operations as control under pressure:
            steel worktops, printed kitchen tickets, station markings, and pass lighting make the
            next handoff visible.
          </p>
          <blockquote>
            “Control during the pressure of service without hiding the next handoff.”<cite
              >— GastroOps brief, <code>.design/BRIEF.md</code></cite
            >
          </blockquote>
          <a class="text-link" href="#evidence"
            >See the reproducible Studio evidence <span aria-hidden="true">↓</span></a
          >
        </div>
      </section>

      <section id="cli" class="section-frame cli-section reveal">
        <div class="section-intro">
          <p class="kicker">Command line</p>
          <h2>Cast a system<br /><em>from the command line.</em></h2>
          <p>
            Start with a brief, choose or keep the local provider, then produce a reviewable design
            document. No API key is required for the local path.
          </p>
        </div>
        <div class="terminal">
          <div class="terminal-bar">
            <span></span><span></span><span></span><b>lde / terminal</b>
          </div>
          <pre><code><span class="prompt">$</span> lde init
<span class="prompt">$</span> lde brief --name GastroOps --domain "restaurant operations"
<span class="prompt">$</span> lde directions && lde generate

<span class="terminal-muted">reading</span>  context / audience / constraints
<span class="terminal-coral">forming</span>  creative direction / mineral-teal
<span class="terminal-teal">ready</span>    .design/pages/landing.design.md

<span class="prompt">$</span> lde lint
<span class="terminal-teal">pass</span>     deterministic report / no key required</code></pre>
        </div>
      </section>

      <section id="architecture" class="section-frame architecture-section reveal">
        <div class="architecture-copy">
          <p class="kicker">Under the hood</p>
          <h2>A small core.<br /><em>Clear seams.</em></h2>
          <p>
            Provider adapters are replaceable. The contracts are not. Every stage can be inspected,
            tested, or swapped without losing the design thread.
          </p>
        </div>
        <div class="architecture-map" aria-label="Architecture flow diagram">
          <div class="arch-node"><span>01</span><b>Brief</b><small>human intent</small></div>
          <i>→</i>
          <div class="arch-node arch-accent">
            <span>02</span><b>Interpret</b><small>creative direction</small>
          </div>
          <i>→</i>
          <div class="arch-node"><span>03</span><b>Compile</b><small>design document</small></div>
          <i>→</i>
          <div class="arch-node arch-teal">
            <span>04</span><b>Build</b><small>agent output</small>
          </div>
        </div>
      </section>

      <section id="roadmap" class="section-frame roadmap-section reveal">
        <div class="section-intro split-intro">
          <div>
            <p class="kicker">Roadmap</p>
            <h2>Ship the <em>judgement.</em></h2>
          </div>
          <p>
            We are building the connective tissue between a good creative review and a reliable
            generated interface.
          </p>
        </div>
        <div class="roadmap-track">
          <div class="roadmap-item is-live">
            <span>Now</span><b>Core contracts</b
            ><small>Briefs, directions, documents, deterministic mocks, and local evidence.</small>
          </div>
          <div class="roadmap-item">
            <span>Next</span><b>Team review loops</b
            ><small>Comment, compare, and approve a direction together.</small>
          </div>
          <div class="roadmap-item">
            <span>Later</span><b>Visual verification</b
            ><small>Compare a coded interface with its approved design scene.</small>
          </div>
        </div>
      </section>

      <section id="open-source" class="section-frame open-section reveal">
        <div class="open-mark" aria-hidden="true"></div>
        <p class="kicker">Open source / MIT</p>
        <h2>Make the invisible<br /><em>decisions visible.</em></h2>
        <p>
          The v0.1 working tree is being hardened for release. Contracts, fixtures, and reproducible
          browser evidence are available locally; the public repository link will be published with
          the release.
        </p>
        <a class="button button-primary" href="#evidence"
          >Inspect the local evidence <span aria-hidden="true">↑</span></a
        >
      </section>
    </main>

    <footer class="site-footer">
      <div>
        <a class="wordmark" href="#hero"
          ><span class="wordmark-mark" aria-hidden="true"></span><span>LLM Design Engine</span></a
        >
        <p>Creative direction for coding agents.</p>
      </div>
      <div class="footer-links">
        <a href="#brandkit">Brandkit</a><a href="#gastroops">Field notes</a
        ><a href="#evidence">Evidence</a>
      </div>
      <small>LLMPolska / MIT licensed / built with intent, not defaults.</small>
    </footer>
  </div>
</template>
