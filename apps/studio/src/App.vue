<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  approveDirection,
  createStudioState,
  requiredViews,
  setActiveView,
  type StudioDirection,
  type StudioState,
  type StudioView,
} from './studio';

const state = ref<StudioState>(createStudioState());
const copied = ref(false);
const previewMode = ref<'desktop' | 'mobile'>('desktop');

const activeView = computed(() => requiredViews.find((view) => view.id === state.value.activeView) ?? requiredViews[0]);
const selectedDirection = computed(() => state.value.project.directions.find((direction) => direction.id === state.value.project.selectedDirectionId) ?? state.value.project.directions[0]);

function navigate(view: StudioView) {
  state.value = setActiveView(state.value, view);
}

function chooseDirection(direction: StudioDirection) {
  state.value = {
    ...state.value,
    project: { ...state.value.project, selectedDirectionId: direction.id },
  };
}

function approveSelected() {
  state.value = approveDirection(state.value, state.value.project.selectedDirectionId);
}

function copyExport() {
  copied.value = true;
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    void navigator.clipboard.writeText(state.value.project.exportMarkdown);
  }
  window.setTimeout(() => (copied.value = false), 1800);
}
</script>

<template>
  <div class="studio-shell">
    <aside class="sidebar" aria-label="Studio navigation">
      <div class="brand-lockup" aria-label="LLM Design Engine studio">
        <span class="registration-mark" aria-hidden="true"><i></i></span>
        <span class="brand-name">LLM Design<br /><em>Engine</em></span>
      </div>
      <div class="project-stamp">
        <span class="mono">PROJECT / 001</span>
        <strong>{{ state.project.name }}</strong>
        <span class="status-dot"><i></i>{{ state.provider.label }}</span>
      </div>
      <nav class="view-nav" aria-label="Project views">
        <button
          v-for="view in requiredViews"
          :key="view.id"
          class="view-link"
          :class="{ active: state.activeView === view.id }"
          type="button"
          :aria-current="state.activeView === view.id ? 'page' : undefined"
          @click="navigate(view.id)"
        >
          <span class="mono">{{ view.eyebrow }}</span>
          <span>{{ view.label }}</span>
        </button>
      </nav>
      <div class="sidebar-foot mono">LOCAL MODE / STABLE FIXTURE<br />API ADAPTER READY</div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div>
          <span class="mono breadcrumb">STUDIO / {{ activeView?.eyebrow }} / {{ activeView?.label.toUpperCase() }}</span>
          <h1>{{ activeView?.label }}</h1>
        </div>
        <div class="topbar-actions">
          <span class="save-state"><i></i>Saved locally</span>
          <button class="button button-dark" type="button" @click="navigate('export')">Export package <span aria-hidden="true">↗</span></button>
        </div>
      </header>

      <section v-if="state.activeView === 'overview'" class="view overview-view" aria-labelledby="overview-title">
        <div class="hero-intro">
          <span class="kicker">A clear place to make the thing</span>
          <h2 id="overview-title">Turn a rough brief into a <em>working direction.</em></h2>
          <p>{{ state.project.brief.summary }} The studio keeps the reasoning visible from first note to export.</p>
          <div class="hero-actions">
            <button class="button button-coral" type="button" @click="navigate('brief')">Open brief <span aria-hidden="true">→</span></button>
            <button class="text-button" type="button" @click="navigate('directions')">Review directions <span aria-hidden="true">↗</span></button>
          </div>
        </div>
        <div class="overview-grid">
          <article class="index-panel">
            <span class="mono panel-index">A / BRIEF SIGNAL</span>
            <h3>{{ state.project.brief.tension }}</h3>
            <dl class="signal-list">
              <div><dt class="mono">DOMAIN</dt><dd>{{ state.project.brief.domain }}</dd></div>
              <div><dt class="mono">USERS</dt><dd>{{ state.project.brief.users }}</dd></div>
              <div><dt class="mono">JOBS TO BE DONE</dt><dd>{{ state.project.brief.jobs }}</dd></div>
            </dl>
          </article>
          <article class="direction-panel">
            <span class="mono panel-index">B / CURRENT DIRECTION</span>
            <div class="direction-badge"><i></i>{{ selectedDirection?.status }}</div>
            <h3>{{ selectedDirection?.name }}</h3>
            <p>{{ selectedDirection?.metaphor }}</p>
            <button class="text-button" type="button" @click="navigate('comparison')">Compare all directions <span aria-hidden="true">→</span></button>
          </article>
          <article class="progress-panel">
            <span class="mono panel-index">C / PROJECT PATH</span>
            <ol class="path-list">
              <li class="done"><span>01</span><strong>Brief captured</strong><i>✓</i></li>
              <li class="done"><span>02</span><strong>Directions generated</strong><i>✓</i></li>
              <li :class="{ active: !state.project.approved, done: state.project.approved }"><span>03</span><strong>Direction approval</strong><i>{{ state.project.approved ? '✓' : 'now' }}</i></li>
              <li><span>04</span><strong>Specification + preview</strong><i>next</i></li>
            </ol>
          </article>
        </div>
      </section>

      <section v-else-if="state.activeView === 'brief'" class="view brief-view" aria-labelledby="brief-title">
        <div class="section-intro"><span class="kicker">Start with what is true</span><h2 id="brief-title">Brief editor</h2><p>Keep the source material plain. The engine will make interpretations explicit later.</p></div>
        <form class="brief-form" @submit.prevent="navigate('directions')">
          <label class="field field-wide"><span class="mono">PROJECT NAME</span><input v-model="state.project.brief.name" type="text" required /></label>
          <label class="field field-wide"><span class="mono">ONE-LINE SUMMARY</span><textarea v-model="state.project.brief.summary" rows="2" required></textarea></label>
          <label class="field"><span class="mono">DOMAIN</span><input v-model="state.project.brief.domain" type="text" /></label>
          <label class="field"><span class="mono">WHO IS THIS FOR?</span><textarea v-model="state.project.brief.users" rows="3"></textarea></label>
          <label class="field"><span class="mono">JOBS TO BE DONE</span><textarea v-model="state.project.brief.jobs" rows="3"></textarea></label>
          <label class="field"><span class="mono">THE TENSION</span><textarea v-model="state.project.brief.tension" rows="3"></textarea></label>
          <label class="field field-wide"><span class="mono">CONSTRAINTS</span><textarea v-model="state.project.brief.constraints" rows="2"></textarea></label>
          <label class="field field-wide"><span class="mono">REFERENCES / MATERIALS</span><textarea v-model="state.project.brief.references" rows="2"></textarea></label>
          <div class="form-actions field-wide"><span class="mono">LOCAL DRAFT · updates stay in this browser</span><button class="button button-dark" type="submit">Save and shape directions <span aria-hidden="true">→</span></button></div>
        </form>
      </section>

      <section v-else-if="state.activeView === 'directions'" class="view directions-view" aria-labelledby="directions-title">
        <div class="section-intro split-intro"><div><span class="kicker">Three ways in</span><h2 id="directions-title">Creative directions</h2></div><p>Select one to make it precise. Nothing is hidden behind an API call; this local fixture is deterministic.</p></div>
        <div class="directions-list">
          <button v-for="(direction, index) in state.project.directions" :key="direction.id" class="direction-row" :class="{ selected: direction.id === state.project.selectedDirectionId }" type="button" @click="chooseDirection(direction)">
            <span class="mono direction-number">0{{ index + 1 }}</span><span class="direction-copy"><strong>{{ direction.name }}</strong><span>{{ direction.metaphor }}</span></span><span class="direction-status">{{ direction.status }} <i aria-hidden="true">→</i></span>
          </button>
        </div>
        <div class="direction-detail" v-if="selectedDirection">
          <div><span class="mono">SELECTED DIRECTION / {{ selectedDirection.name.toUpperCase() }}</span><h3>{{ selectedDirection.visualNarrative }}</h3><p>{{ selectedDirection.rationale }}</p></div>
          <dl class="detail-grid"><div><dt class="mono">COMPOSITION</dt><dd>{{ selectedDirection.composition }}</dd></div><div><dt class="mono">TYPE CHARACTER</dt><dd>{{ selectedDirection.type }}</dd></div><div><dt class="mono">MATERIAL LANGUAGE</dt><dd>{{ selectedDirection.material }}</dd></div><div><dt class="mono">COLOR STRATEGY</dt><dd>{{ selectedDirection.color }}</dd></div></dl>
          <div class="refine-box"><label class="field"><span class="mono">REFINE THIS DIRECTION</span><textarea v-model="state.project.refineNote" rows="2" placeholder="e.g. Make the annotation layer more generous on mobile"></textarea></label><button class="button button-coral" type="button" @click="approveSelected">Approve direction <span aria-hidden="true">↗</span></button></div>
        </div>
      </section>

      <section v-else-if="state.activeView === 'comparison'" class="view comparison-view" aria-labelledby="comparison-title">
        <div class="section-intro"><span class="kicker">Lay the options beside one another</span><h2 id="comparison-title">Direction comparison</h2><p>Different energy, same brief. Select a direction to carry into the specification.</p></div>
        <div class="comparison-table" role="table" aria-label="Creative direction comparison"><div class="comparison-head" role="row"><span>CRITERION</span><span v-for="direction in state.project.directions" :key="direction.id">{{ direction.name }}</span></div><div v-for="criterion in ['Metaphor', 'Composition', 'Type', 'Material', 'Color']" :key="criterion" class="comparison-row" role="row"><strong>{{ criterion }}</strong><span v-for="direction in state.project.directions" :key="direction.id">{{ criterion === 'Metaphor' ? direction.metaphor : criterion === 'Composition' ? direction.composition : criterion === 'Type' ? direction.type : criterion === 'Material' ? direction.material : direction.color }}</span></div></div>
      </section>

      <section v-else-if="state.activeView === 'specification'" class="view specification-view" aria-labelledby="specification-title">
        <div class="section-intro split-intro"><div><span class="kicker">Make the rules executable</span><h2 id="specification-title">Design specification</h2></div><p>One compact source of truth for the route, hierarchy, and behavior the implementation needs.</p></div>
        <div class="spec-grid"><article><span class="mono">01 / NARRATIVE</span><h3>{{ selectedDirection?.visualNarrative }}</h3><p>{{ selectedDirection?.rationale }}</p></article><article><span class="mono">02 / RESPONSIVE RULES</span><ul><li>Rail becomes a horizontal scroll at 760px.</li><li>Preview maintains a 4:3 ratio on small screens.</li><li>Annotations remain mono and never become placeholder prose.</li></ul></article><article><span class="mono">03 / FORBIDDEN PATTERNS</span><ul class="forbidden-list"><li v-for="item in selectedDirection?.forbidden" :key="item">{{ item }}</li></ul></article><article><span class="mono">04 / MOTION</span><p>Quiet 180ms reveals; no bounce or elastic easing. With reduced motion, state changes remain immediate and explicit.</p></article></div>
      </section>

      <section v-else-if="state.activeView === 'preview'" class="view preview-view" aria-labelledby="preview-title">
        <div class="section-intro preview-intro"><div><span class="kicker">No model call, no mystery</span><h2 id="preview-title">Deterministic preview</h2><p>Rendered from the selected direction and local scene fixture.</p></div><div class="segmented" role="group" aria-label="Preview viewport"><button type="button" :class="{ active: previewMode === 'desktop' }" @click="previewMode = 'desktop'">Desktop</button><button type="button" :class="{ active: previewMode === 'mobile' }" @click="previewMode = 'mobile'">Mobile</button></div></div>
        <div class="preview-stage"><div class="preview-frame" :class="previewMode"><div class="preview-chrome"><span class="registration-mark small"><i></i></span><span class="mono">SIGNAL KITCHEN / STATION 04</span><span class="mono">09:42</span></div><div class="preview-body"><span class="mono">SERVICE / TUESDAY 14 MAY</span><h3>Keep the pass<br /><em>in view.</em></h3><p>Prep, handoff, and close — one calm field note at a time.</p><div class="preview-rule"></div><div class="preview-note"><span class="registration-mark tiny"><i></i></span><span>Next handoff / cold station / <strong>ready</strong></span></div></div></div></div>
      </section>

      <section v-else-if="state.activeView === 'brandkit'" class="view brandkit-view" aria-labelledby="brandkit-title">
        <div class="section-intro"><span class="kicker">A small system with a point of view</span><h2 id="brandkit-title">Brandkit</h2><p>{{ state.project.brandkit.narrative }}</p></div>
        <div class="brandkit-grid"><article class="logo-spec"><span class="mono">LOGO DIRECTION</span><div class="logo-lockup"><span class="registration-mark large"><i></i></span><span>SIGNAL<br /><em>KITCHEN</em></span></div><p>{{ state.project.brandkit.logoDirection }}</p></article><article class="palette-spec"><span class="mono">PALETTE</span><div class="swatches"><div v-for="color in state.project.brandkit.colors" :key="color.hex" class="swatch"><span :style="{ backgroundColor: color.hex }"></span><strong>{{ color.name }}</strong><small>{{ color.hex }} · {{ color.role }}</small></div></div></article><article class="type-spec"><span class="mono">TYPE SYSTEM</span><div v-for="type in state.project.brandkit.typography" :key="type.role" class="type-line"><strong>{{ type.role }}</strong><span>{{ type.family }}</span><small>{{ type.usage }}</small></div></article><article class="rules-spec"><span class="mono">USAGE RULES</span><ul><li v-for="rule in state.project.brandkit.usageRules" :key="rule">{{ rule }}</li></ul></article></div>
      </section>

      <section v-else-if="state.activeView === 'assets'" class="view assets-view" aria-labelledby="assets-title">
        <div class="section-intro split-intro"><div><span class="kicker">Useful placeholders, explicit provenance</span><h2 id="assets-title">Generated assets</h2></div><p>Fixture assets are intentional SVG placeholders, ready to be replaced by a provider adapter later.</p></div>
        <div class="asset-list"><article v-for="asset in state.project.assets" :key="asset.id" class="asset-row"><div class="asset-thumb"><span class="registration-mark"><i></i></span><span class="mono">SVG</span></div><div class="asset-meta"><span class="mono">{{ asset.role }}</span><h3>{{ asset.file }}</h3><p>{{ asset.prompt }}</p></div><span class="asset-status"><i></i>{{ asset.status }}</span></article></div>
      </section>

      <section v-else-if="state.activeView === 'lint'" class="view lint-view" aria-labelledby="lint-title">
        <div class="section-intro split-intro"><div><span class="kicker">A second read before handoff</span><h2 id="lint-title">Anti-slop report</h2></div><div class="lint-score"><strong>{{ state.project.lint[0]?.score }}</strong><span class="mono">/ 100<br />QUALITY SIGNAL</span></div></div>
        <div class="lint-list"><article v-for="warning in state.project.lint" :key="warning.rule" class="lint-row"><span class="severity" :class="warning.severity">{{ warning.severity }}</span><div><span class="mono">{{ warning.rule }}</span><p>{{ warning.message }}</p></div><span class="mono">{{ warning.score }}</span></article></div>
      </section>

      <section v-else-if="state.activeView === 'export'" class="view export-view" aria-labelledby="export-title">
        <div class="section-intro"><span class="kicker">Make it portable</span><h2 id="export-title">Export package</h2><p>Copy the design source now, or hand the same JSON-safe package to a Hono adapter later.</p></div>
        <div class="export-layout"><div class="export-copy"><label class="mono" for="export-markdown">DESIGN.MD</label><textarea id="export-markdown" v-model="state.project.exportMarkdown" rows="16"></textarea><button class="button button-coral" type="button" @click="copyExport">{{ copied ? 'Copied to clipboard ✓' : 'Copy export' }}</button></div><aside class="export-manifest"><span class="mono">PACKAGE CONTENTS</span><ul><li>brief.json <i>ready</i></li><li>direction-field-notes.json <i>ready</i></li><li>design.md <i>ready</i></li><li>brandkit.json <i>ready</i></li><li>assets/ <i>3 fixture SVGs</i></li></ul><p class="mono">PROVIDER / LOCAL FIXTURE<br />CREDENTIALS / NONE REQUIRED</p></aside></div>
      </section>
    </main>
  </div>
</template>
