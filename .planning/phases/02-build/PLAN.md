# Phase 2: Build — Slide Deck & Simulations

**Wave 1:** Slide Deck Creation (Spectacle.js + React content)  
**Wave 2:** Simulations & Integration (Three.js + Matter.js + deployment)  
**Goal:** Create the complete interactive slide deck with 3D atomic structure visualizations and 2D particle interaction simulations, then deploy to GitHub Pages.

## Frontmatter

| Field | Value |
|-------|-------|
| `wave` | 1 of 2 (Wave 1: Slide Deck Creation currently active) |
| `depends_on` | `.planning/phases/01-research/PLAN.md` (Phase 1 research must be complete first) |
| `files_modified` | `.planning/phases/02-build/PLAN.md`, slide components, App.jsx, index.js, package.json, gh-pages branch |
| `autonomous` | false |

## Phase Requirement IDs

Every ID below MUST appear in a plan's `requirements` field:

| ID | Requirement |
|-----|-------------|
| SLD-01 | Criar página inicial com título do detector de fumaça e tema do núcleo atômico |
| SLD-02 | Apresentar identificação química do íon He²⁺ (Z=2, carga +2, cátion) |
| SLD-03 | Explicar estrutura subatômica: prótons, elétrons, formação do íon |
| SLD-04 | Incluir imagem representativa do íon He²⁺ |
| SLD-05 | Seção de autoria (nome + turma) — contexto acadêmico |
| SLD-06 | Seção de referências — fontes acknowledgement |
| SLD-07 | Integrar simulação 3D (Three.js) de estrutura atômica do He²⁺ |
| SLD-08 | Integrar simulação 2D (Matter.js) de interações de partículas |
| SLD-09 | Deploy para GitHub Pages — produto live e shareable |

## Research Findings Integration (from `.planning/research/`)

### Stack Recommendations (from STACK.md)

- **React 18.3.x** — stable LTS, required by Spectacle.js and react-three-fiber
- **Three.js r155** — latest stable, integrates via react-three-fiber for 3D atomic visualizations
- **Spectacle.js 4.5.0** — React presentation framework for the slide deck
- **Matter.js 0.19.0** — 2D physics engine for particle interactions simulations
- **Vite 5.x** — build tool

### Key Technologies & Versions

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.x | Core UI library for building the interactive slide deck and simulations |
| Three.js | r155 | 3D library for atomic structure visualizations (He²⁺ ion, nucleus discovery) |
| Spectacle.js | 4.5.0 | React-based presentation framework for the slide deck |
| Matter.js | 0.19.0 | 2D physics engine for particle interactions simulations |
| @react-three/fiber | r8.0.0 | React renderer for Three.js |
| @react-three/drei | r9.0.0 | useful helpers for react-three-fiber |
| @vitejs/plugin-react | 3.1.0 | Vite plugin for React |

### Installation Commands

```bash
# Core
npm install react react-dom @vitejs/plugin-react three spectacle

# Three.js ecosystem
npm install @react-three/fiber @react-three/drei three-stdlib

# Matter.js
npm install matter-js

# Dev dependencies
npm install -D vite

# Run development server
npx vite
```

### Version Compatibility Matrix

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| react@18.3.0 | three@r155, react-three-fiber@r8, @react-three/drei@r9 | Tested and stable combo as of 2025-2026 |
| spectacle@4.5.0 | react@18.3, vite@5 | Official Spectacle peer dependencies |
| matter-js@0.19.0 | react@18.3, vite@5 | No conflicts with React 18 |
| @vitejs/plugin-react@3.1.0 | vite@5, react@18 | Latest plugin version |

## Architecture Decisions (from ARCHITECTURE.md)

### Recommended Architecture: Container/Presentational Pattern

- **Slide components** follow a container/presentational pattern where container components manage simulation state and presentational components render UI
- **Separation of concerns**: Spectacle.js routing concern separate from simulation logic
- **Custom hooks** encapsulate Three.js and Matter.js initialization, lifecycle, and cleanup

### Project Structure

```
src/
├── components/
│   ├── Slide.jsx                  # Spectacle.js wrapper
│   ├── AtomicStructure3D.jsx      # Three.js / react-three-fiber
│   ├── ParticleSimulation2D.jsx   # Matter.js physics
│   ├── ChemicalInfo.jsx           # Chemical data display
│   └── References.jsx             # Bibliography component
├── utils/
│   ├── constants.jsx              # Ion properties, Z values, atomic data
│   └── helpers.jsx                # Formatting, calculations, utilities
├── styles/
│   └── slide-styles.css           # Spectacle.js slide styling
├── App.jsx                        # Root component, Spectacle.js setup
└── index.js                       # Entry point
```

### Key Anti-Patterns to Avoid

1. **Plain Three.js with useEffect only** — causes performance issues (animation loop fights React's virtual DOM diffing)
2. **Driving simulations with useState** — forces React to re-render 60 times per second, making the entire UI sluggish
3. **Shared Matter.js engine across all slides** — physics state accumulates across slides, causing unexpected behavior

### Data Flow

```
User navigates slides → Spectacle.js router → Slide components mount → Simulation initializes on mount
→ User interacts with simulations → State updates → Re-render → Three.js useFrame renders next frame
→ Matter.js Engine.update() called via requestAnimationFrame → WebGL/2D renderer updates
```

### Scalability Considerations

- **0-1k users (academic project)**: Monolith structure is fine — all simulations run in-browser
- **1k-10k users (classroom deployment)**: Consider code splitting per slide; lazy-load simulations only when slide is active
- **10k+ users (public deployment)**: Static serve via GitHub Pages; simulations are read-only, no server needed

### First Two Bottlenecks

1. **Initial slide load time** — simulations should lazy-initialize (only load when the slide is actively visible)
2. **Memory leaks from improper Three.js/Matter.js cleanup on slide navigation** — ensure useEffect cleanup and object disposal

## Critical Pitfalls & Prevention (from PITFALLS.md Integration)

### Phase 2 Pitfalls (addressed in this phase)

| Pitfall | Prevention |
|---------|------------|
| **#2: Matter.js canvas conflicts with Three.js** | Always use Matter.js with `render: { visible: false }` to suppress its built-in renderer; use Three.js's WebGLRenderer as the sole rendering context; sync Matter.js body positions to Three.js mesh positions manually in the animation loop |
| **#4: Ion data inconsistency across slides** | Centralize constants in `src/utils/constants.jsx` (Z=2, mass number, electron configuration, etc.); use this constant across all slides; have chemistry expert review |
| **#6: Spectacle.js + Three.js resize mismatches** | Add a shared resize handler that calls `renderer.setSize(width, height)` for Three.js and updates Matter.js `Render.bounds`; use `window.addEventListener('resize', handler)` with debouncing; clean up event listeners on slide unmount |
| **#7: User interaction conflicts** | Use `pointerEvents: 'none'` on simulation canvases that should not intercept click events; distinguish click intentions: short clicks advance slides, drag interactions engage physics |
| **#10: Memory leaks from simulation accumulation** | Dispose Three.js objects on slide unmount (`scene.traverse(object => { if (object.geometry) object.geometry.dispose(); if (object.material) object.material.dispose(); })`); reset Matter.js bodies between slides |

### Integration Gotchas

- **Three.js and Matter.js both create canvas elements**: Always use Matter.js with `render: { visible: false }` to suppress its built-in renderer; use Three.js's WebGLRenderer as the sole rendering context; sync Matter.js body positions to Three.js mesh positions manually in the animation loop
- **Resize handling**: Add a shared resize handler that calls `renderer.setSize(width, height)` for Three.js and updates Matter.js `Render.bounds`; use `window.addEventListener('resize', handler)` with debouncing; clean up event listeners on slide unmount
- **User interaction conflicts**: Use `pointerEvents: 'none'` on simulation canvases that should not intercept click events; distinguish click intentions: short clicks advance slides, drag interactions engage physics

## MVP Definition (from FEATURES.md) — Implementation Targets

### Launch With (v1) — Minimum Viable Product

- [x] Slide title with theme name — presentation starts with clear topic identification
- [x] Chemical identification of He²⁺ — core content is visible and accurate (Z=2, charge +2, Cation)
- [x] Subatomic explanation — students understand protons/electrons forming the ion
- [x] Representative image of the ion — visual reference present
- [x] Authorship section (name + turma) — academic context established
- [x] References section — sources acknowledged
- [x] Deploy to GitHub Pages — product is live and shareable
- [ ] 3D simulation (Three.js) of atomic structure — enhances conceptual understanding
- [ ] 2D simulation (Matter.js) of interactions — adds exploratory dimension
- [ ] Interactivity features — camera controls, view toggles

### Add After Validation (v1.x)

- [ ] 3D simulation (Three.js) of atomic structure — enhances conceptual understanding
- [ ] 2D simulation (Matter.js) of interactions — adds exploratory dimension
- [ ] Interactivity features — camera controls, view toggles

### Defer to v2+

- [ ] Mobile app — web-first; responsive design sufficient for v1
- [ ] Bilingual support (PT/EN) — expand audience later
- [ ] Quiz or interaction extra — gamification after core validated

### Feature Prioritization Matrix (from FEATURES.md)

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Slide title with theme name | HIGH | LOW | P1 |
| Chemical identification of He²⁺ | HIGH | LOW | P1 |
| Subatomic explanation | HIGH | LOW | P1 |
| Representative image of the ion | MEDIUM | MEDIUM | P1 |
| Authorship section | LOW | LOW | P1 |
| References section | MEDIUM | LOW | P1 |
| Deploy to GitHub Pages | HIGH | MEDIUM | P1 |
| 3D simulation (Three.js) | HIGH | HIGH | P2 |
| 2D simulation (Matter.js) | MEDIUM | MEDIUM | P2 |
| Interactivity (user exploration) | MEDIUM | MEDIUM | P2 |

### Priority Key

- **P1**: Must have for launch (v1)
- **P2**: Should have, add when possible (v1.x)
- **P3**: Nice to have, future consideration (v2+)

## Execution Strategy

### Wave 1: Slide Deck Creation (Active)

**Objective:** Create the Spectacle.js-based slide deck with all core educational content, including static imagery, text, and references. This wave focuses on getting the presentation structure and content in place before adding interactive simulations.

**Tasks:**

- [ ] Create `src/components/Slide.jsx` — Spectacle.js wrapper component that provides slide routing and navigation
- [ ] Create `src/utils/constants.jsx` — Centralized constants file with He²⁺ ion properties (Z=2, 2 protons, 2 electrons removed, mass number 4, electron configuration 1s², Cation)
- [ ] Create slide content pages covering:
  - [ ] Slide 1: Title — "Detectores de Fumaça e a Descoberta do Núcleo Atômico"
  - [ ] Slide 2: Chemical identification of He²⁺ (Z=2, charge +2, Cation)
  - [ ] Slide 3: Subatomic explanation — prótons, elétrons, formação do íon
  - [ ] Slide 4: Representative image of the He²⁺ ion
  - [ ] Slide 5: Authorship section (name + turma)
  - [ ] Slide 6: References section with citations
- [ ] Create `src/components/ChemicalInfo.jsx` — Display chemical data (ion properties, Z value, etc.)
- [ ] Create `src/components/References.jsx` — Bibliography component with sources for Rutherford's experiment, He²⁺ properties, and smoke detector technology
- [ ] Create `src/styles/slide-styles.css` — Spectacle.js slide styling adapted for the educational content
- [ ] Set up App.jsx with Spectacle.js configuration (theme, transitions, vertical slides, speaker notes)
- [ ] Implement basic navigation and routing between slides
- [ ] Test slide deck runs locally with `npx vite dev`

**Deliverables (Wave 1):**

- Functional slide deck with all core content pages
- Centralized constants file (`src/utils/constants.jsx`) with He²⁺ ion properties
- Slide styling adapted for educational content
- Basic navigation between slides
- Local development server working (`npx vite dev`)

### Wave 2: Simulations & Integration

**Objective:** Add the Three.js 3D atomic structure simulation and Matter.js 2D particle interaction simulation, integrate them with the slide deck, implement proper cleanup, and deploy to GitHub Pages.

**Tasks:**

- [ ] Create `src/components/AtomicStructure3D.jsx` — Three.js / react-three-fiber component visualizing He²⁺ atomic structure:
  - [ ] Nucleus component (protons and neutrons representation)
  - [ ] Electron orbits (2 electrons in 1s orbital)
  - [ ] He²⁺ ion label with Z=2
  - [ ] Camera controls (orbit controls)
  - [ ] WebGL fallback for browsers without WebGL2
- [ ] Create `src/components/ParticleSimulation2D.jsx` — Matter.js physics simulation:
  - [ ] `render: { visible: false }` configuration to avoid canvas conflicts with Three.js
  - [ ] Particle bodies representing He²⁺ context (protons, electrons)
  - [ ] Physics interactions (attraction/repulsion)
  - [ ] Manual position sync with Three.js mesh positions in animation loop
  - [ ] Click interaction: short clicks advance slides, drag engages physics
- [ ] Integrate simulations with Slide components:
  - [ ] Lazy-initialize simulations only when their slide is actively visible
  - [ ] Proper cleanup on slide unmount (Three.js object disposal, Matter.js body reset)
  - [ ] Resize handler for both Three.js renderer and Matter.js Render.bounds
- [ ] Implement interaction handling:
  - [ ] `pointerEvents: 'none'` on simulation canvases that should not intercept click events
  - [ ] Distinguish click intentions: short clicks advance slides, drag interactions engage physics
- [ ] Add WebGL feature detection (`!!window.WebGLRenderingContext`) and provide static fallback for non-WebGL browsers
- [ ] Prepare deployment to GitHub Pages:
  - [ ] Add `homepage` field to package.json
  - [ ] Configure Vite for GitHub Pages base path
  - [ ] Add deploy script (`vite build && npx gh-pages -d dist`)
- [ ] Final testing: complete slide deck with simulations, navigate all slides, verify interactions

**Deliverables (Wave 2):**

- Three.js 3D atomic structure simulation of He²⁺ ion
- Matter.js 2D particle interaction simulation
- Simulations integrated with slide deck with proper lazy-loading and cleanup
- WebGL fallback for non-WebGL browsers
- GitHub Pages deployment configured and working
- Complete interactive slide deck operational

## Verification Criteria

### Phase 2 Success Criteria

- [ ] Slide deck created with all 6 core content slides (title, He²⁺ identification, subatomic explanation, image, authorship, references)
- [ ] `.planning/phases/02-build/PLAN.md` exists and contains all SLD-requirement IDs mapped
- [ ] `src/utils/constants.jsx` exists and centralizes He²⁺ ion properties (Z=2, mass number, electron configuration)
- [ ] Three.js 3D atomic structure simulation visualizes He²⁺ with nucleus and electron orbits
- [ ] Matter.js 2D particle simulation integrates with `render: { visible: false }` and no canvas conflicts
- [ ] Simulations lazy-initialize only when their slide is actively visible
- [ ] Proper cleanup on slide unmount (Three.js object disposal, Matter.js body reset)
- [ ] Resize handler works for both Three.js renderer and Matter.js Render.bounds
- [ ] WebGL fallback logic in place for non-WebGL browsers
- [ ] Package.json has `homepage` field and deploy script configured
- [ ] GitHub Pages deployment successful (`vite build && npx gh-pages -d dist`)
- [ ] All SLD-IDs (SLD-01 through SLD-09) are accounted for in the implemented slide deck

### Exit Conditions

Phase 2 is complete when:

- [ ] All slide content pages are created and navigable via Spectacle.js router
- [ ] `src/utils/constants.jsx` centralizes all He²⁺ ion property data in one location
- [ ] Three.js simulation renders He²⁺ atomic structure with nucleus and electron orbits
- [ ] Matter.js simulation uses `render: { visible: false }` and syncs positions to Three.js manually
- [ ] Simulations lazy-initialize on slide mount and clean up on unmount
- [ ] Resize handler properly updates both Three.js and Matter.js dimensions
- [ ] WebGL fallback provides readable content even without WebGL support
- [ ] Package.json has `homepage` field configured for GitHub Pages
- [ ] GitHub Pages deployment completes successfully
- [ ] All SLD-IDs (SLD-01 through SLD-09) are implemented in the slide deck
- [ ] No critical pitfalls from PITFALLS.md are present (or have documented mitigations)

### Wave Transition

When Wave 1 (Slide Deck Creation) objectives are met, transition to **Wave 2: Simulations & Integration** (add Three.js and Matter.js simulations, integrate with slide deck, deploy to GitHub Pages). Both waves must complete before Phase 2 is considered done.

## Dependencies

- **Depends on**: `.planning/phases/01-research/PLAN.md` (Phase 1 research must be complete first — all research output files exist and are substantive)
- **Blocks**: Phase 3 (Review — testing, code quality, final review) depends on Phase 2 build being complete and deployable

## Research Flags

- **Needs deeper research during Phase 2 planning**: 
  - Exact Spectacle.js + Three.js integration pattern for this specific project (vertical slides with embedded 3D canvases)
  - Optimal Matter.js particle count for He²⁺ interaction simulation without performance degradation
  - Detailed browser support matrix for target student devices (Chrome, Safari, Edge version requirements for WebGL2)
  - Exact bibliography sources and citation format for Brazilian high school chemistry curriculum
- **Phases with standard patterns (skip deeper research)**: Phase 2 stack setup (well-documented from Phase 1); GitHub Pages deployment (standard gh CLI workflow); Spectacle.js basic slide routing (built-in handlers)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommended versions have HIGH confidence from Phase 1 research |
| Features | MEDIUM | Feature priorities well-defined but implementation approach may need adjustment |
| Architecture | HIGH | Container/presentational pattern, custom hooks, and data flow diagrams are well-established |
| Pitfalls | HIGH | All critical pitfalls have clear prevention strategies from Phase 1 research |
| Overall confidence | HIGH | Build phase is well-supported by Phase 1 research foundations |

## Gaps to Address

- **Bibliography source validation**: Specific sources and citation format for Brazilian high school chemistry curriculum need validation during implementation
- **Exact Matter.js + Three.js sync mechanism**: While research recommends `render: { visible: false }` for Matter.js and manual position sync in the animation loop, the specific implementation pattern needs to be decided during build
- **Target browser specification**: Exact browser versions students will use should be confirmed during build phase
- **Particle count targets for Matter.js**: Exact number of particles/physics bodies for the He²⁺ interaction simulation needs definition during implementation

## Sources

- .planning/research/STACK.md — Stack recommendations with version compatibility matrices and alternatives considered
- .planning/research/ARCHITECTURE.md — Architecture patterns, component responsibilities, data flow, and anti-patterns
- .planning/research/PITFALLS.md — Critical pitfalls with prevention strategies and pitfall-to-phase mapping
- .planning/research/FEATURES.md — Feature landscape with table stakes, differentiators, anti-features, and priority matrix
- .planning/research/SUMMARY.md — Synthesized analysis with executive summary, key findings, roadmap implications, confidence assessment, and gaps
- .planning/PROJECT.md, .planning/REQUIREMENTS.md, .planning/ROADMAP.md — Project context files referenced in research sources
- .planning/phases/01-research/PLAN.md — Phase 1 Research plan
- Spectacle.js docs, Three.js docs, Matter.js docs
- Brazilian chemistry curriculum standards
- gh CLI documentation for GitHub Pages deployment

---

**Phase 2: Build — Slide Deck & Simulations**  
*Planned: 2026-08-31*  
*Next: /gsd-transition to Phase 3 — Review*