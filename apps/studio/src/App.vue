<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  approveDirection,
  compileStudioProject,
  createStudioState,
  refineStudioProject,
  requiredViews,
  selectStudioDirection,
  setActiveView,
  type StudioDirection,
  type StudioState,
  type StudioView,
} from './studio';

const state = ref<StudioState>(createStudioState());
const copied = ref(false);
const previewMode = ref<'desktop' | 'mobile'>('desktop');
const compiling = ref(false);
const applyingRefinement = ref(false);
const selectingDirection = ref(false);
const compileError = ref('');

const activeView = computed(
  () => requiredViews.find((view) => view.id === state.value.activeView) ?? requiredViews[0],
);
const selectedDirection = computed(
  () =>
    state.value.project.directions.find(
      (direction) => direction.id === state.value.project.selectedDirectionId,
    ) ?? state.value.project.directions[0],
);

function formatPatchValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return '—';
  return JSON.stringify(value);
}

function navigate(view: StudioView) {
  state.value = setActiveView(state.value, view);
}

async function chooseDirection(direction: StudioDirection) {
  if (direction.id === state.value.project.selectedDirectionId) return;
  selectingDirection.value = true;
  compileError.value = '';
  try {
    state.value = await selectStudioDirection(state.value, direction.id);
  } catch (error) {
    compileError.value = error instanceof Error ? error.message : 'Direction selection failed';
  } finally {
    selectingDirection.value = false;
  }
}

async function saveAndShape() {
  compiling.value = true;
  compileError.value = '';
  try {
    const compiled = await compileStudioProject(state.value);
    state.value = compiled;
    const operation = compiled.operations.find((item) => item.id === 'meaning');
    if (operation?.status === 'error') {
      compileError.value = operation.detail;
      return;
    }
    navigate('directions');
  } catch (error) {
    compileError.value = error instanceof Error ? error.message : 'Compiler failed';
  } finally {
    compiling.value = false;
  }
}

async function applyRefinement() {
  applyingRefinement.value = true;
  compileError.value = '';
  try {
    const refined = await refineStudioProject(state.value, state.value.project.refineNote);
    state.value = refined;
    if (refined.refinementHistory.at(-1)?.status === 'error') {
      compileError.value = 'Refinement needs a compiled direction and scene graph.';
    }
  } catch (error) {
    compileError.value = error instanceof Error ? error.message : 'Refinement failed';
  } finally {
    applyingRefinement.value = false;
  }
}

function renderPreview() {
  state.value = {
    ...state.value,
    activeView: 'preview',
    phase: 'preview',
    operations: state.value.operations.map((operation) =>
      operation.id === 'preview'
        ? {
            ...operation,
            status: 'ready',
            detail: state.value.design
              ? 'Rendered from the current scene graph.'
              : 'Showing the deterministic fixture preview.',
            updatedAt: new Date().toISOString(),
          }
        : operation,
    ),
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
      <div class="sidebar-foot mono">
        LOCAL MODE / {{ state.phase.toUpperCase() }}<br />{{ state.provider.label.toUpperCase() }}
      </div>
    </aside>

    <main class="main-content">
      <header class="topbar">
        <div>
          <span class="mono breadcrumb"
            >STUDIO / {{ activeView?.eyebrow }} / {{ activeView?.label.toUpperCase() }}</span
          >
          <h1>{{ activeView?.label }}</h1>
        </div>
        <div class="topbar-actions">
          <span class="save-state"
            ><i></i>{{ state.provider.label }} ·
            {{
              state.operations.find((operation) => operation.id === state.phase)?.status ?? 'ready'
            }}</span
          >
          <button class="button button-dark" type="button" @click="navigate('export')">
            Export package <span aria-hidden="true">↗</span>
          </button>
        </div>
      </header>

      <section
        v-if="state.activeView === 'overview'"
        class="view overview-view"
        aria-labelledby="overview-title"
      >
        <div class="hero-intro">
          <span class="kicker">A clear place to make the thing</span>
          <h2 id="overview-title">Turn a rough brief into a <em>working direction.</em></h2>
          <p>
            {{ state.project.brief.summary }} The studio keeps the reasoning visible from first note
            to export.
          </p>
          <div class="hero-actions">
            <button class="button button-coral" type="button" @click="navigate('brief')">
              Open brief <span aria-hidden="true">→</span>
            </button>
            <button class="text-button" type="button" @click="navigate('directions')">
              Review directions <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        <div class="overview-grid">
          <article class="index-panel">
            <span class="mono panel-index">A / BRIEF SIGNAL</span>
            <h3>{{ state.project.brief.tension }}</h3>
            <dl class="signal-list">
              <div>
                <dt class="mono">DOMAIN</dt>
                <dd>{{ state.project.brief.domain }}</dd>
              </div>
              <div>
                <dt class="mono">USERS</dt>
                <dd>{{ state.project.brief.users }}</dd>
              </div>
              <div>
                <dt class="mono">JOBS TO BE DONE</dt>
                <dd>{{ state.project.brief.jobs }}</dd>
              </div>
            </dl>
          </article>
          <article class="direction-panel">
            <span class="mono panel-index">B / CURRENT DIRECTION</span>
            <div class="direction-badge"><i></i>{{ selectedDirection?.status }}</div>
            <h3>{{ selectedDirection?.name }}</h3>
            <p>{{ selectedDirection?.metaphor }}</p>
            <button class="text-button" type="button" @click="navigate('comparison')">
              Compare all directions <span aria-hidden="true">→</span>
            </button>
          </article>
          <article class="progress-panel">
            <span class="mono panel-index">C / PROJECT PATH</span>
            <ol class="path-list">
              <li class="done"><span>01</span><strong>Brief captured</strong><i>✓</i></li>
              <li class="done"><span>02</span><strong>Directions generated</strong><i>✓</i></li>
              <li :class="{ active: !state.project.approved, done: state.project.approved }">
                <span>03</span><strong>Direction approval</strong
                ><i>{{ state.project.approved ? '✓' : 'now' }}</i>
              </li>
              <li><span>04</span><strong>Specification + preview</strong><i>next</i></li>
            </ol>
          </article>
        </div>
      </section>

      <section
        v-else-if="state.activeView === 'brief'"
        class="view brief-view"
        aria-labelledby="brief-title"
      >
        <div class="section-intro">
          <span class="kicker">Start with what is true</span>
          <h2 id="brief-title">Brief editor</h2>
          <p>
            Keep the source material plain. The engine will make interpretations explicit later.
          </p>
        </div>
        <form class="brief-form" @submit.prevent="saveAndShape">
          <label class="field field-wide"
            ><span class="mono">PROJECT NAME</span
            ><input v-model="state.project.brief.name" type="text" required
          /></label>
          <label class="field field-wide"
            ><span class="mono">ONE-LINE SUMMARY</span
            ><textarea v-model="state.project.brief.summary" rows="2" required></textarea>
          </label>
          <label class="field"
            ><span class="mono">DOMAIN</span
            ><input v-model="state.project.brief.domain" type="text"
          /></label>
          <label class="field"
            ><span class="mono">WHO IS THIS FOR?</span
            ><textarea v-model="state.project.brief.users" rows="3"></textarea>
          </label>
          <label class="field"
            ><span class="mono">JOBS TO BE DONE</span
            ><textarea v-model="state.project.brief.jobs" rows="3"></textarea>
          </label>
          <label class="field"
            ><span class="mono">THE TENSION</span
            ><textarea v-model="state.project.brief.tension" rows="3"></textarea>
          </label>
          <label class="field field-wide"
            ><span class="mono">CONSTRAINTS</span
            ><textarea v-model="state.project.brief.constraints" rows="2"></textarea>
          </label>
          <label class="field field-wide"
            ><span class="mono">REFERENCES / MATERIALS</span
            ><textarea v-model="state.project.brief.references" rows="2"></textarea>
          </label>
          <div class="form-actions field-wide">
            <span class="mono"
              >LOCAL DRAFT · {{ compiling ? 'COMPILING MEANING…' : 'NO API KEY REQUIRED' }}</span
            ><button class="button button-dark" type="submit" :disabled="compiling">
              {{ compiling ? 'Compiling…' : 'Save and shape directions' }}
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <p v-if="compileError" class="error-note" role="alert">{{ compileError }}</p>
        </form>
      </section>

      <section
        v-else-if="state.activeView === 'directions'"
        class="view directions-view"
        aria-labelledby="directions-title"
      >
        <div class="section-intro split-intro">
          <div>
            <span class="kicker">Meaning into options</span>
            <h2 id="directions-title">Creative directions</h2>
          </div>
          <p>
            {{
              state.interpretation
                ? `${state.interpretation.evidence.length} meaning links are visible in this run.`
                : 'Fixture directions are available locally; compile the brief to replace them with source-derived output.'
            }}
          </p>
        </div>
        <article v-if="state.interpretation" class="meaning-panel" aria-labelledby="meaning-title">
          <div>
            <span class="mono">COMPILER OUTPUT / TRACEABLE</span>
            <h3 id="meaning-title">Product interpretation</h3>
            <p>{{ state.interpretation.visualNarrative }}</p>
          </div>
          <dl class="meaning-signals">
            <div>
              <dt class="mono">DOMAIN</dt>
              <dd>{{ state.interpretation.productDomain }}</dd>
            </div>
            <div>
              <dt class="mono">TENSION</dt>
              <dd>{{ state.interpretation.userTension }}</dd>
            </div>
            <div>
              <dt class="mono">METAPHOR</dt>
              <dd>{{ state.interpretation.centralMetaphor }}</dd>
            </div>
            <div>
              <dt class="mono">MATERIALS</dt>
              <dd>{{ state.interpretation.domainMaterials.join(', ') }}</dd>
            </div>
          </dl>
          <ol class="meaning-evidence">
            <li
              v-for="evidence in state.interpretation.evidence"
              :key="`${evidence.source}-${evidence.conclusion}`"
            >
              <span class="mono">{{ evidence.source }}</span>
              <p>
                <strong>{{ evidence.conclusion }}</strong
                ><br />{{ evidence.consequence }}
              </p>
            </li>
          </ol>
        </article>
        <div class="directions-list">
          <button
            v-for="(direction, index) in state.project.directions"
            :key="direction.id"
            class="direction-row"
            :class="{ selected: direction.id === state.project.selectedDirectionId }"
            type="button"
            :disabled="selectingDirection"
            @click="chooseDirection(direction)"
          >
            <span class="mono direction-number">0{{ index + 1 }}</span
            ><span class="direction-copy"
              ><strong>{{ direction.name }}</strong
              ><span>{{ direction.metaphor }}</span></span
            ><span class="direction-status"
              >{{ direction.status }} <i aria-hidden="true">→</i></span
            >
          </button>
        </div>
        <div class="direction-detail" v-if="selectedDirection">
          <div>
            <span class="mono"
              >SELECTED DIRECTION / {{ selectedDirection.name.toUpperCase() }}</span
            >
            <h3>{{ selectedDirection.visualNarrative }}</h3>
            <p>{{ selectedDirection.rationale }}</p>
          </div>
          <dl class="detail-grid">
            <div>
              <dt class="mono">COMPOSITION</dt>
              <dd>{{ selectedDirection.composition }}</dd>
            </div>
            <div>
              <dt class="mono">TYPE CHARACTER</dt>
              <dd>{{ selectedDirection.type }}</dd>
            </div>
            <div>
              <dt class="mono">MATERIAL LANGUAGE</dt>
              <dd>{{ selectedDirection.material }}</dd>
            </div>
            <div>
              <dt class="mono">COLOR STRATEGY</dt>
              <dd>{{ selectedDirection.color }}</dd>
            </div>
          </dl>
          <div class="refine-box">
            <label class="field"
              ><span class="mono">REFINE THIS DIRECTION</span
              ><textarea
                v-model="state.project.refineNote"
                rows="2"
                placeholder="e.g. Make the annotation layer more generous on mobile"
              ></textarea>
            </label>
            <div class="refine-actions">
              <button
                class="button button-dark"
                type="button"
                :disabled="applyingRefinement"
                @click="applyRefinement"
              >
                {{ applyingRefinement ? 'Applying…' : 'Apply semantic refinement' }}
              </button>
              <button class="button button-coral" type="button" @click="approveSelected">
                Approve direction <span aria-hidden="true">↗</span>
              </button>
            </div>
            <p v-if="state.refinementHistory.length" class="mono refinement-status">
              {{ state.refinementHistory.at(-1)?.status }} ·
              {{ state.refinementHistory.at(-1)?.patchCount }} patches
            </p>
          </div>
        </div>
        <section
          v-if="state.design?.semanticPatches?.length"
          class="semantic-log"
          aria-labelledby="semantic-log-title"
        >
          <div class="semantic-log-heading">
            <span class="mono">REFINEMENT / SEMANTIC DIFF</span>
            <h3 id="semantic-log-title">Semantic patch log</h3>
          </div>
          <ol>
            <li
              v-for="patch in state.design.semanticPatches"
              :key="`${patch.target}-${patch.reason}`"
            >
              <div>
                <span class="mono">{{ patch.operation }} / {{ patch.target }}</span>
                <p>{{ patch.reason }}</p>
                <small>{{ patch.sourceFeedback }}</small>
              </div>
              <dl>
                <div>
                  <dt class="mono">BEFORE</dt>
                  <dd>{{ formatPatchValue(patch.before) }}</dd>
                </div>
                <div>
                  <dt class="mono">AFTER</dt>
                  <dd>{{ formatPatchValue(patch.after) }}</dd>
                </div>
              </dl>
            </li>
          </ol>
        </section>
      </section>

      <section
        v-else-if="state.activeView === 'comparison'"
        class="view comparison-view"
        aria-labelledby="comparison-title"
      >
        <div class="section-intro">
          <span class="kicker">Lay the options beside one another</span>
          <h2 id="comparison-title">Direction comparison</h2>
          <p>Different energy, same brief. Select a direction to carry into the specification.</p>
        </div>
        <div class="comparison-table" role="table" aria-label="Creative direction comparison">
          <div class="comparison-head" role="row">
            <span>CRITERION</span
            ><span v-for="direction in state.project.directions" :key="direction.id">{{
              direction.name
            }}</span>
          </div>
          <div
            v-for="criterion in ['Metaphor', 'Composition', 'Type', 'Material', 'Color']"
            :key="criterion"
            class="comparison-row"
            role="row"
          >
            <strong>{{ criterion }}</strong
            ><span v-for="direction in state.project.directions" :key="direction.id">{{
              criterion === 'Metaphor'
                ? direction.metaphor
                : criterion === 'Composition'
                  ? direction.composition
                  : criterion === 'Type'
                    ? direction.type
                    : criterion === 'Material'
                      ? direction.material
                      : direction.color
            }}</span>
          </div>
        </div>
      </section>

      <section
        v-else-if="state.activeView === 'specification'"
        class="view specification-view"
        aria-labelledby="specification-title"
      >
        <div class="section-intro split-intro">
          <div>
            <span class="kicker">Make the rules executable</span>
            <h2 id="specification-title">Design specification</h2>
          </div>
          <p>
            One compact source of truth for the route, hierarchy, and behavior the implementation
            needs.
          </p>
        </div>
        <div class="spec-grid">
          <article>
            <span class="mono">01 / NARRATIVE</span>
            <h3>{{ state.design?.narrative ?? selectedDirection?.visualNarrative }}</h3>
            <p>{{ selectedDirection?.rationale }}</p>
          </article>
          <article>
            <span class="mono">02 / RESPONSIVE RULES</span>
            <ul>
              <li v-for="rule in state.design?.responsive.mobile ?? []" :key="rule">{{ rule }}</li>
              <li v-if="!state.design">
                Compile the brief to inspect source-derived responsive rules.
              </li>
            </ul>
          </article>
          <article>
            <span class="mono">03 / FORBIDDEN PATTERNS</span>
            <ul class="forbidden-list">
              <li
                v-for="item in state.design?.forbiddenPatterns ??
                selectedDirection?.forbidden ??
                []"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </article>
          <article>
            <span class="mono">04 / MOTION</span>
            <ul>
              <li v-for="principle in state.design?.motion.principles ?? []" :key="principle">
                {{ principle }}
              </li>
              <li v-if="!state.design">No fixture motion is presented as generated output.</li>
            </ul>
          </article>
        </div>
        <p class="scene-summary">
          <span class="mono">SCENE GRAPH:</span>
          {{
            state.design?.sceneGraph
              ? `${state.design.sceneGraph.opening} opening · ${state.design.sceneGraph.regions.length} regions · ${state.design.sceneGraph.nodes.length} nodes`
              : 'fixture only — compile the brief to inspect graph metadata.'
          }}
        </p>
        <div class="spec-actions">
          <button class="button button-coral" type="button" @click="renderPreview">
            Open deterministic preview <span aria-hidden="true">→</span></button
          ><span class="mono">{{
            state.operations.find((operation) => operation.id === 'specification')?.detail
          }}</span>
        </div>
      </section>

      <section
        v-else-if="state.activeView === 'preview'"
        class="view preview-view"
        aria-labelledby="preview-title"
      >
        <div class="section-intro preview-intro">
          <div>
            <span class="kicker">No model call, no mystery</span>
            <h2 id="preview-title">Deterministic preview</h2>
            <p>
              {{
                state.design
                  ? 'Rendered from the current typed scene graph.'
                  : 'Showing the local deterministic fixture; compile a brief to replace it.'
              }}
            </p>
          </div>
          <div class="segmented" role="group" aria-label="Preview viewport">
            <button
              type="button"
              :class="{ active: previewMode === 'desktop' }"
              @click="previewMode = 'desktop'"
            >
              Desktop</button
            ><button
              type="button"
              :class="{ active: previewMode === 'mobile' }"
              @click="previewMode = 'mobile'"
            >
              Mobile
            </button>
          </div>
        </div>
        <div class="preview-stage">
          <div class="preview-frame" :class="previewMode">
            <div class="preview-chrome">
              <span class="registration-mark small"><i></i></span
              ><span class="mono">{{ state.design?.route ?? 'SIGNAL KITCHEN / STATION 04' }}</span
              ><span class="mono">{{ state.design ? 'SCENE GRAPH' : 'FIXTURE' }}</span>
            </div>
            <div class="preview-body">
              <span class="mono">{{ state.design?.concept ?? 'SERVICE / TUESDAY 14 MAY' }}</span>
              <h3>{{ selectedDirection?.name ?? 'Keep the pass' }}<br /><em>in view.</em></h3>
              <p>{{ state.design?.narrative ?? selectedDirection?.visualNarrative }}</p>
              <div class="preview-rule"></div>
              <div class="preview-note">
                <span class="registration-mark tiny"><i></i></span
                ><span>{{
                  state.design
                    ? `${state.design.sceneGraph?.regions.length ?? 0} semantic regions · deterministic`
                    : 'Next handoff / cold station / ready'
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        v-else-if="state.activeView === 'brandkit'"
        class="view brandkit-view"
        aria-labelledby="brandkit-title"
      >
        <div class="section-intro">
          <span class="kicker">A small system with a point of view</span>
          <h2 id="brandkit-title">Brandkit</h2>
          <p>{{ state.project.brandkit.narrative }}</p>
        </div>
        <div class="brandkit-grid">
          <article class="logo-spec">
            <span class="mono">LOGO DIRECTION</span>
            <div class="logo-lockup">
              <span class="registration-mark large"><i></i></span
              ><span>SIGNAL<br /><em>KITCHEN</em></span>
            </div>
            <p>{{ state.project.brandkit.logoDirection }}</p>
          </article>
          <article class="palette-spec">
            <span class="mono">PALETTE</span>
            <div class="swatches">
              <div v-for="color in state.project.brandkit.colors" :key="color.hex" class="swatch">
                <span :style="{ backgroundColor: color.hex }"></span
                ><strong>{{ color.name }}</strong
                ><small>{{ color.hex }} · {{ color.role }}</small>
              </div>
            </div>
          </article>
          <article class="type-spec">
            <span class="mono">TYPE SYSTEM</span>
            <div
              v-for="type in state.project.brandkit.typography"
              :key="type.role"
              class="type-line"
            >
              <strong>{{ type.role }}</strong
              ><span>{{ type.family }}</span
              ><small>{{ type.usage }}</small>
            </div>
          </article>
          <article class="rules-spec">
            <span class="mono">USAGE RULES</span>
            <ul>
              <li v-for="rule in state.project.brandkit.usageRules" :key="rule">{{ rule }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section
        v-else-if="state.activeView === 'assets'"
        class="view assets-view"
        aria-labelledby="assets-title"
      >
        <div class="section-intro split-intro">
          <div>
            <span class="kicker">Useful placeholders, explicit provenance</span>
            <h2 id="assets-title">Generated assets</h2>
          </div>
          <p>
            <strong>Visual direction — not final page layout.</strong>
            {{
              state.provider.mode === 'fixture'
                ? 'These are intentional local SVG fixtures; a configured image provider can replace them.'
                : 'Provider-generated assets retain their prompt and placement metadata.'
            }}
          </p>
        </div>
        <div class="asset-list">
          <article v-for="asset in state.project.assets" :key="asset.id" class="asset-row">
            <div class="asset-thumb">
              <span class="registration-mark"><i></i></span><span class="mono">SVG</span>
            </div>
            <div class="asset-meta">
              <span class="mono">{{ asset.role }}</span>
              <h3>{{ asset.file }}</h3>
              <p>{{ asset.prompt }}</p>
            </div>
            <span class="asset-status"><i></i>{{ asset.status }}</span>
          </article>
        </div>
      </section>

      <section
        v-else-if="state.activeView === 'lint'"
        class="view lint-view"
        aria-labelledby="lint-title"
      >
        <div class="section-intro split-intro">
          <div>
            <span class="kicker">A second read before handoff</span>
            <h2 id="lint-title">Anti-slop report</h2>
          </div>
          <div class="lint-score">
            <strong>{{ state.project.lint[0]?.score }}</strong
            ><span class="mono">/ 100<br />QUALITY SIGNAL</span>
          </div>
        </div>
        <div class="lint-list">
          <article v-for="warning in state.project.lint" :key="warning.rule" class="lint-row">
            <span class="severity" :class="warning.severity">{{ warning.severity }}</span>
            <div>
              <span class="mono">{{ warning.rule }}</span>
              <p>{{ warning.message }}</p>
            </div>
            <span class="mono">{{ warning.score }}</span>
          </article>
        </div>
      </section>

      <section
        v-else-if="state.activeView === 'export'"
        class="view export-view"
        aria-labelledby="export-title"
      >
        <div class="section-intro">
          <span class="kicker">Make it portable</span>
          <h2 id="export-title">Export package</h2>
          <p>
            Copy the design source now, or hand the same JSON-safe package to a Hono adapter later.
          </p>
        </div>
        <div class="export-layout">
          <div class="export-copy">
            <label class="mono" for="export-markdown">DESIGN.MD</label
            ><textarea
              id="export-markdown"
              v-model="state.project.exportMarkdown"
              rows="16"
            ></textarea
            ><button class="button button-coral" type="button" @click="copyExport">
              {{ copied ? 'Copied to clipboard ✓' : 'Copy export' }}
            </button>
          </div>
          <aside class="export-manifest">
            <span class="mono">PACKAGE CONTENTS</span>
            <ul>
              <li>brief.json <i>ready</i></li>
              <li>direction-field-notes.json <i>ready</i></li>
              <li>design.md <i>ready</i></li>
              <li>brandkit.json <i>ready</i></li>
              <li>assets/ <i>3 fixture SVGs</i></li>
            </ul>
            <p class="mono">PROVIDER / LOCAL FIXTURE<br />CREDENTIALS / NONE REQUIRED</p>
          </aside>
        </div>
      </section>
    </main>
  </div>
</template>
