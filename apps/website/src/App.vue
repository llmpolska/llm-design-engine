<script setup lang="ts">
import { computed, ref } from 'vue';
import { transformationStages } from './site';

const activeStage = ref(0);
const currentStage = computed(() => transformationStages[activeStage.value] ?? transformationStages[0]!);
const isBrandRoute = ref(false);

function selectStage(index: number) {
  activeStage.value = index;
}

function showBrandkit() {
  isBrandRoute.value = true;
  requestAnimationFrame(() => document.querySelector('#brandkit')?.scrollIntoView({ behavior: 'smooth' }));
}
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
        <a href="#gastroops">Field notes</a>
        <a href="#open-source">GitHub ↗</a>
      </nav>
      <button class="header-cta" type="button" @click="showBrandkit">View brandkit</button>
    </header>

    <main>
      <section id="hero" class="hero section-frame reveal">
        <div class="hero-copy">
          <p class="kicker"><span class="registration-dot" aria-hidden="true"></span> Design compiler / 01</p>
          <h1>Turn a rough brief into a <em>buildable</em> world.</h1>
          <p class="hero-intro">LLM Design Engine gives coding agents a creative director: interpret the brief, set the visual system, and compile a design document before a single component is written.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#transformation">See the transformation <span aria-hidden="true">↓</span></a>
            <a class="text-link" href="#cli">Read the CLI <span aria-hidden="true">↗</span></a>
          </div>
          <div class="hero-proof" aria-label="Project status">
            <span><strong>MIT</strong> licensed</span><span class="proof-rule" aria-hidden="true"></span><span>Deterministic by default</span>
          </div>
        </div>
        <div class="hero-art blueprint-panel">
          <img src="/static/hero-foundry.svg" alt="Abstract foundry mark with registration lines and kiln-black forms" />
          <div class="blueprint-note note-a">BRIEF / 001</div>
          <div class="blueprint-note note-b">MATERIAL STUDY: PAPER + OXIDE</div>
          <div class="blueprint-stamp">LDE<br /><span>READY TO CAST</span></div>
        </div>
      </section>

      <section id="transformation" class="section-frame transformation-section reveal">
        <div class="section-intro split-intro">
          <div><p class="kicker">The transformation</p><h2>Three passes.<br /><em>One coherent artifact.</em></h2></div>
          <p>Most agents jump from prompt to pixels. LDE keeps the interpretation visible, so a team can steer the work before implementation calcifies.</p>
        </div>
        <div class="stage-tabs" role="tablist" aria-label="Transformation stages">
          <button v-for="(stage, index) in transformationStages" :key="stage.label" class="stage-tab" :class="{ active: activeStage === index }" type="button" role="tab" :aria-selected="activeStage === index" @click="selectStage(index)">
            <span>{{ stage.label }}</span><strong>{{ stage.eyebrow }}</strong>
          </button>
        </div>
        <div class="transformation-panel" role="tabpanel">
          <div class="panel-index">0{{ activeStage + 1 }}</div>
          <div class="panel-copy"><p class="eyebrow">{{ currentStage.eyebrow }}</p><h3>{{ currentStage.title }}</h3><p>{{ currentStage.body }}</p></div>
          <code class="panel-code">{{ currentStage.code }}</code>
          <div class="panel-arrow" aria-hidden="true">↗</div>
        </div>
      </section>

      <section id="comparison" class="section-frame comparison-section reveal">
        <div class="section-intro"><p class="kicker">A useful refusal</p><h2>Generic is a <em>process</em> problem.</h2><p>When every decision is implicit, every output drifts toward the average. LDE makes taste explicit and keeps it testable.</p></div>
        <div class="comparison-table" role="table" aria-label="Generic workflow compared with LLM Design Engine">
          <div class="comparison-row comparison-head" role="row"><span role="columnheader">Without a design compiler</span><span role="columnheader">With LLM Design Engine</span></div>
          <div class="comparison-row" role="row"><span role="cell"><b>Prompt → component</b><small>Visual choices appear too late to challenge.</small></span><span role="cell"><b>Brief → direction → spec</b><small>Interpretation is a shared, editable artifact.</small></span></div>
          <div class="comparison-row" role="row"><span role="cell"><b>“Make it modern”</b><small>Familiar defaults fill the gaps.</small></span><span role="cell"><b>Named materials + constraints</b><small>Paper grain, type scale, motion and refusal list.</small></span></div>
          <div class="comparison-row" role="row"><span role="cell"><b>Pretty once</b><small>Every new screen resets the visual language.</small></span><span role="cell"><b>Tokens that travel</b><small>One system across scenes, assets and states.</small></span></div>
        </div>
      </section>

      <section id="design-spec" class="section-frame spec-section reveal">
        <div class="spec-art blueprint-panel"><img src="/static/blueprint.svg" alt="Blueprint sheet showing annotated scene nodes" /><span class="blueprint-note spec-note">SCENE NODE / HERO</span></div>
        <div class="spec-copy"><p class="kicker">Design document</p><h2>From taste to <em>coordinates.</em></h2><p>The output is JSON-safe, markdown-readable, and specific enough to remove guesswork without removing judgement.</p>
          <div class="spec-list"><div><span>01</span><strong>Creative direction</strong><small>Voice, palette, material, type and motion rules.</small></div><div><span>02</span><strong>Scene graph</strong><small>Semantic nodes with intent, hierarchy and states.</small></div><div><span>03</span><strong>Lint report</strong><small>Checks for contrast, missing states and generic drift.</small></div></div>
        </div>
      </section>

      <section id="deterministic-preview" class="section-frame preview-section reveal">
        <div class="section-intro split-intro"><div><p class="kicker">Deterministic preview</p><h2>Same seed.<br /><em>Same signal.</em></h2></div><p>Mock providers make the default path useful offline. Swap in a provider when you are ready; the document shape stays stable.</p></div>
        <div class="preview-grid"><div class="preview-window"><div class="window-bar"><span class="window-led"></span><span>preview / seed 0042</span><span>100%</span></div><div class="preview-canvas"><div class="mini-label">GASTROOPS / SERVICE LOG</div><h3>Make the next shift<br /><em>feel lighter.</em></h3><div class="mini-rule"></div><div class="mini-stats"><span><b>08</b> open checks</span><span><b>02</b> handoffs</span></div></div></div><div class="preview-notes"><div class="margin-note"><span class="note-line"></span><p><b>01 / Stable output</b>Visual regression tests can trust what the mock provider returns.</p></div><div class="margin-note"><span class="note-line"></span><p><b>02 / Provider-ready</b>Use your model for interpretation, not for inventing a new system each run.</p></div></div></div>
      </section>

      <section id="anti-slop" class="section-frame anti-section reveal">
        <div><p class="kicker">Anti-slop protocol</p><h2>Refuse the <em>easy answer.</em></h2><p>Good direction is partly a list of things we will not do. The compiler carries those constraints into every generated scene.</p></div>
        <div class="refusal-list"><div><span>×</span><p><b>No gradient wallpaper</b><small>Depth comes from paper, linework and contrast.</small></p></div><div><span>×</span><p><b>No card farms</b><small>Hierarchy follows the story, not a template.</small></p></div><div><span>×</span><p><b>No decorative metrics</b><small>Numbers earn their place by changing a decision.</small></p></div></div>
      </section>

      <section id="brandkit" class="section-frame brand-section reveal">
        <div class="brand-copy"><p class="kicker">Brandkit / the foundry</p><h2>Warm paper.<br /><em>Sharp thinking.</em></h2><p>A visual language for tools that shape tools. Oxidized coral marks the intervention; mineral teal marks a reliable path through the system.</p><button class="button button-secondary" type="button" @click="isBrandRoute = !isBrandRoute">{{ isBrandRoute ? 'Close brand route' : 'Open brand route' }}</button></div>
        <div class="brand-board"><img src="/static/brandkit.svg" alt="LLM Design Engine brandkit board with paper, coral and mineral teal swatches" /><div class="swatch-labels"><span><i class="swatch swatch-paper"></i>Warm paper / 01</span><span><i class="swatch swatch-coral"></i>Oxidized coral / 02</span><span><i class="swatch swatch-teal"></i>Mineral teal / 03</span></div></div>
      </section>

      <section id="gastroops" class="section-frame case-section reveal">
        <div class="case-image"><img src="/static/gastroops.svg" alt="GastroOps case study scene: a calm operations board with annotated handoffs" /><span class="case-caption">FIELD NOTE / 002</span></div>
        <div class="case-copy"><p class="kicker">Case study / GastroOps</p><h2>Less dashboard.<br /><em>More handoff.</em></h2><p>For a restaurant operations team, the brief was not “make a dashboard.” It was “make the next shift feel lighter.” LDE turned that tension into an operational canvas with fewer, better signals.</p><blockquote>“The spec gave us a language for the work before it gave us a layout.”<cite>— Product design, GastroOps</cite></blockquote><a class="text-link" href="#architecture">Read the architecture <span aria-hidden="true">↗</span></a></div>
      </section>

      <section id="cli" class="section-frame cli-section reveal">
        <div class="section-intro"><p class="kicker">Command line</p><h2>Cast a system<br /><em>in one command.</em></h2><p>Pipe in a brief, choose a provider, and get a reviewable design document. No API key required for the local path.</p></div>
        <div class="terminal"><div class="terminal-bar"><span></span><span></span><span></span><b>lde / terminal</b></div><pre><code><span class="prompt">$</span> lde init
<span class="prompt">$</span> lde brief --name GastroOps --domain "restaurant operations"
<span class="prompt">$</span> lde directions && lde generate

<span class="terminal-muted">reading</span>  context / audience / constraints
<span class="terminal-coral">forming</span>  creative direction / mineral-teal
<span class="terminal-teal">ready</span>    .design/pages/landing.design.md

<span class="prompt">$</span> lde lint
<span class="terminal-teal">pass</span>     deterministic report / no key required</code></pre></div>
      </section>

      <section id="architecture" class="section-frame architecture-section reveal">
        <div class="architecture-copy"><p class="kicker">Under the hood</p><h2>A small core.<br /><em>Clear seams.</em></h2><p>Provider adapters are replaceable. The contracts are not. Every stage can be inspected, tested, or swapped without losing the design thread.</p></div>
        <div class="architecture-map" aria-label="Architecture flow diagram"><div class="arch-node"><span>01</span><b>Brief</b><small>human intent</small></div><i>→</i><div class="arch-node arch-accent"><span>02</span><b>Interpret</b><small>creative direction</small></div><i>→</i><div class="arch-node"><span>03</span><b>Compile</b><small>design document</small></div><i>→</i><div class="arch-node arch-teal"><span>04</span><b>Build</b><small>agent output</small></div></div>
      </section>

      <section id="roadmap" class="section-frame roadmap-section reveal">
        <div class="section-intro split-intro"><div><p class="kicker">Roadmap</p><h2>Ship the <em>judgement.</em></h2></div><p>We are building the connective tissue between a good creative review and a reliable generated interface.</p></div>
        <div class="roadmap-track"><div class="roadmap-item is-live"><span>Now</span><b>Core contracts</b><small>Briefs, directions, documents and deterministic mocks.</small></div><div class="roadmap-item"><span>Next</span><b>Provider adapters</b><small>Bring your model without changing your design system.</small></div><div class="roadmap-item"><span>Later</span><b>Team review loops</b><small>Comment, compare and approve a direction together.</small></div></div>
      </section>

      <section id="open-source" class="section-frame open-section reveal"><div class="open-mark" aria-hidden="true"></div><p class="kicker">Open source / MIT</p><h2>Make the invisible<br /><em>decisions visible.</em></h2><p>Read the contracts, inspect the fixtures, and help us make generated interfaces feel less inevitable.</p><a class="button button-primary" href="https://github.com/llmpolska/llm-design-engine" target="_blank" rel="noreferrer">Explore the repository <span aria-hidden="true">↗</span></a></section>
    </main>

    <footer class="site-footer"><div><a class="wordmark" href="#hero"><span class="wordmark-mark" aria-hidden="true"></span><span>LLM Design Engine</span></a><p>Creative direction for coding agents.</p></div><div class="footer-links"><a href="#brandkit">Brandkit</a><a href="#gastroops">Field notes</a><a href="#open-source">GitHub ↗</a></div><small>LLMPolska / MIT licensed / built with intent, not defaults.</small></footer>
  </div>
</template>
