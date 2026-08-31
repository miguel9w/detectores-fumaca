# Phase 1: Research — Foundation & Content

**Wave 1:** Domain Research (smoke detectors, atomic nucleus discovery, He²⁺ ion)  
**Wave 2:** Technology Research (React stack, Spectacle.js, Three.js, Matter.js)  
**Goal:** Establish the core stack, validate browser/environment compatibility, and populate educational content before building any simulations.

## Frontmatter

| Field | Value |
|-------|-------|
| `wave` | 1 of 2 (Domain Research currently active) |
| `depends_on` | — (Phase 1 is the foundation; no prior phases) |
| `files_modified` | `.planning/research/STACK.md`, `.planning/research/FEATURES.md`, `.planning/research/ARCHITECTURE.md`, `.planning/research/PITFALLS.md`, `.planning/research/SUMMARY.md` |
| `autonomous` | false |

## Phase Requirement IDs

Every ID below MUST appear in a plan's `requirements` field:

| ID | Requirement |
|-----|-------------|
| RES-01 | Pesquisar funcionamento e história dos detectores de fumaça |
| RES-02 | Pesquisar a descoberta do núcleo atômico (Rutherford) |
| RES-03 | Pesquisar propriedades do íon He²⁺ (Z=2, configuração eletrônica) |
| RES-04 | Pesquisar aplicações do He²⁺ na tecnologia, saúde e meio ambiente |
| RES-05 | Pesquisar boas práticas para slides educativos interativos |
| RES-06 | Pesquisar Spectacle.js para apresentações React |
| RES-07 | Pesquisar Three.js para simulações 3D de estruturas atômicas |
| RES-08 | Pesquisar Matter.js para simulações 2D de partículas |

## Research Findings (from `.planning/research/`)

### Stack Recommendations (from STACK.md)

- **React 18.3.x** — stable LTS, required by Spectacle.js and react-three-fiber
- **Three.js r155** — latest stable, integrates via react-three-fiber for 3D atomic visualizations
- **Spectacle.js 4.5.0** — React presentation framework for the slide deck
- **Matter.js 0.19.0** — 2D physics engine for particle interactions simulations
- **Vite 5.x** — recommended build tool (over CRA and Next.js)

### Key Technologies & Versions

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 18.3.x | Core UI library for building the interactive slide deck and simulations | Stable LTS; required by both Spectacle.js and react-three-fiber |
| Three.js | r155 | 3D library for atomic structure visualizations (He²⁺ ion, nucleus discovery) | Latest stable; integrates with React via react-three-fiber (r8+) |
| Spectacle.js | 4.5.0 | React-based presentation framework for the slide deck | Latest; supports Markdown content, nested slides, vertical slides, headless browser output, theming, speaker notes, auto-scaling, and touch/swipe support |
| Matter.js | 0.19.0 | 2D physics engine for particle interactions simulations | Latest stable; provides lightweight 2D physics; integrates with React via matter-js npm package |

### Installation Commands (from STACK.md)

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

### Alternatives Considered (from STACK.md)

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| React 18.3 + Vite | React 19 | Use React 19 only when it reaches stable LTS (not recommended until 2026 at earliest) |
| Three.js r155 + react-three-fiber | Two.js or PlayCanvas | Use alternative if you need a different rendering approach or licensing |
| Spectacle.js 4.5.0 | Reveal.js or PowerPoint | Use Reveal.js if you need non-React presentations with more built-in transition effects |
| Matter.js 0.19.0 | Physix or Box2D | Use Physix if you need more advanced 2D physics; Box2D if you need to port to other languages |
| Vite 5.x | Create React App | Do NOT use CRA — it is deprecated, creates larger bundles, and has poorer HMR performance |
| Vite 5.x | Next.js | Do NOT use Next.js unless you need SSR, SSG, or API routes — it adds unnecessary complexity |

### What NOT to Use (from STACK.md)

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App (CRA) | Deprecated; no longer maintained; larger production bundles; slower HMR; difficult React 18 integration | Vite 5.x with @vitejs/plugin-react |
| Three.js r125 or older | Missing WebGL2 support; removed important loaders; incompatible with react-three-fiber r8+; security vulnerabilities | Three.js r155 (latest stable) |
| Spectacle.js 3.x | Missing modern features (vertical slides, headless output, touch support); CSS theming limitations; React 18 incompatibilities | Spectacle.js 4.5.0 |
| Matter.js 0.18 or older | Known bugs with Body.reset(); missing newer constraints; not compatible with current React patterns | Matter.js 0.19.0 |
| Next.js for this project | Overkill for simple slide + simulation project; adds server complexity | Vite 5.x |

### Version Compatibility Matrix (from STACK.md)

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

### Project Structure (from ARCHITECTURE.md)

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

### Key Anti-Patterns to Avoid (from ARCHITECTURE.md)

1. **Plain Three.js with useEffect only** — causes performance issues (animation loop fights React's virtual DOM diffing)
2. **Driving simulations with useState** — forces React to re-render 60 times per second, making the entire UI sluggish
3. **Shared Matter.js engine across all slides** — physics state accumulates across slides, causing unexpected behavior

### Data Flow (from ARCHITECTURE.md)

```
User navigates slides → Spectacle.js router → Slide components mount → Simulation initializes on mount
→ User interacts with simulations → State updates → Re-render → Three.js useFrame renders next frame
→ Matter.js Engine.update() called via requestAnimationFrame → WebGL/2D renderer updates
```

### Scalability Considerations (from ARCHITECTURE.md)

- **0-1k users (academic project)**: Monolith structure is fine — all simulations run in-browser
- **1k-10k users (classroom deployment)**: Consider code splitting per slide; lazy-load simulations only when slide is active
- **10k+ users (public deployment)**: Static serve via GitHub Pages; simulations are read-only, no server needed

### First Two Bottlenecks (from ARCHITECTURE.md)

1. **Initial slide load time** — simulations should lazy-initialize (only load when the slide is actively visible)
2. **Memory leaks from improper Three.js/Matter.js cleanup on slide navigation** — ensure useEffect cleanup and object disposal

## Critical Pitfalls & Prevention (from PITFALLS.md)

### Phase 1 Pitfalls (addressed in this phase)

| Pitfall | Prevention |
|---------|------------|
| **#1: Three.js initialization failing in browser** | Always check `renderer.capabilities.isWebGL2Available()`, initialize inside `DOMContentLoaded` or `useEffect` with proper cleanup, provide visible fallback for browsers without WebGL support |
| **#3: Dependency version mismatches** | Pin specific versions in package.json (Three.js r155 with Matter.js ~0.19.0), run `npm ls` after adding dependencies, keep @types packages in sync |
| **#5: Missing references/bibliography** | Add references section early (Phase 1, Wave 2), cite all sources, use consistent citation format, verify accuracy |
| **#8: Inconsistent ion data** | Centralize constants in one file (Z=2, mass number, electron configuration, etc.); use this constant across all slides; have chemistry expert review |
| **#9: Poor WebGL fallback** | Check `!!window.WebGLRenderingContext` before loading Three.js-dependent content; provide static fallback image or description for browsers without WebGL; design presentation so core content is readable even without simulations |

### Integration Gotchas (from PITFALLS.md)

- **Three.js and Matter.js both create canvas elements**: Always use Matter.js with `render: { visible: false }` to suppress its built-in renderer; use Three.js's WebGLRenderer as the sole rendering context; sync Matter.js body positions to Three.js mesh positions manually in the animation loop
- **Resize handling**: Add a shared resize handler that calls `renderer.setSize(width, height)` for Three.js and updates Matter.js `Render.bounds`; use `window.addEventListener('resize', handler)` with debouncing; clean up event listeners on slide unmount
- **User interaction conflicts**: Use `pointerEvents: 'none'` on simulation canvases that should not intercept click events; distinguish click intentions: short clicks advance slides, drag interactions engage physics

## MVP Definition (from FEATURES.md)

### Launch With (v1) — Minimum Viable Product

- [ ] Slide title with theme name — presentation starts with clear topic identification
- [ ] Chemical identification of He²⁺ — core content is visible and accurate (Z=2, charge +2, Cation)
- [ ] Subatomic explanation — students understand protons/electrons forming the ion
- [ ] Representative image of the ion — visual reference present
- [ ] Authorship section (name + turma) — academic context established
- [ ] References section — sources acknowledged
- [ ] Deploy to GitHub Pages — product is live and shareable

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

### Wave 1: Domain Research (Complete — research files already exist)

**Tasks completed** (from research agents):

- [x] RES-01: Pesquisar funcionamento e história dos detectores de fumaça — consolidated in PITFALLS.md and SUMMARY.md
- [x] RES-02: Pesquisar a descoberta do núcleo atômico (Rutherford) — consolidated in PITFALLS.md and SUMMARY.md
- [x] RES-03: Pesquisar propriedades do íon He²⁺ — consolidated in ARCHITECTURE.md (constants file) and SUMMARY.md
- [x] RES-04: Pesquisar aplicações do He²⁺ na tecnologia, saúde e meio ambiente — consolidated in SUMMARY.md
- [x] RES-05: Pesquisar boas práticas para slides educativos interativos — consolidated in FEATURES.md and SUMMARY.md
- [x] RES-06: Pesquisar Spectacle.js para apresentações React — consolidated in STACK.md and SUMMARY.md
- [x] RES-07: Pesquisar Three.js para simulações 3D de estruturas atômicas — consolidated in STACK.md, ARCHITECTURE.md and SUMMARY.md
- [x] RES-08: Pesquisar Matter.js para simulações 2D de partículas — consolidated in STACK.md, ARCHITECTURE.md and SUMMARY.md

**Deliverables** (already exist in `.planning/research/`):

- `.planning/research/STACK.md` — technology stack with version recommendations and compatibility matrices
- `.planning/research/FEATURES.md` — feature landscape with table stakes, differentiators, anti-features
- `.planning/research/ARCHITECTURE.md` — architecture patterns, component responsibilities, data flow diagrams
- `.planning/research/PITFALLS.md` — critical pitfalls with prevention strategies and pitfall-to-phase mapping
- `.planning/research/SUMMARY.md` — executive summary with roadmap implications and confidence assessment

### Wave 2: Technology Research (Complete — research files already exist)

**Tasks completed** (from research agents):

- [x] STACK.md: Full technology stack with versions, installation commands, alternatives considered, what NOT to use
- [x] FEATURES.md: Feature landscape with dependency chain, MVP definition, prioritization matrix, competitor analysis
- [x] ARCHITECTURE.md: Component boundaries, data flow diagrams, architectural patterns with code examples, anti-patterns
- [x] PITFALLS.md: 9 critical pitfalls with prevention strategies, integration gotchas, performance traps, security mistakes, "looks done but isn't" checklist

**Key tech decisions solidified**:

- React 18.3.x + Vite 5.x + @vitejs/plugin-react as the foundation
- Spectacle.js 4.5.0 for slide framework with embedded React component canvases
- Three.js r155 + react-three-fiber r8.0.0 + @react-three/drei r9.0.0 for 3D atomic structure visualization
- Matter.js 0.19.0 with `render: { visible: false }` to avoid canvas conflicts with Three.js
- Vite as build tool (not CRA or Next.js) for fast HMR and minimal configuration

## Verification Criteria

### Phase 1 Success Criteria

- [ ] `.planning/research/STACK.md` exists and contains recommended stack with version compatibility matrix
- [ ] `.planning/research/FEATURES.md` exists and covers table stakes, differentiators, and anti-features
- [ ] `.planning/research/ARCHITECTURE.md` exists and documents component boundaries, data flow, and anti-patterns
- [ ] `.planning/research/PITFALLS.md` exists and catalogs critical pitfalls with phase mapping
- [ ] `.planning/research/SUMMARY.md` exists and includes executive summary, key findings, roadmap implications, confidence assessment, and gaps
- [ ] All RES-IDs (RES-01 through RES-08) are accounted for in phase planning
- [ ] Browser WebGL feature detection implemented (check `!!window.WebGLRenderingContext`)
- [ ] npm dependency pins in package.json (react, three, spectacle, matter-js versions fixed)
- [ ] Type definitions installed (`@types/three`, `@types/matter-js`)
- [ ] Bibliography section drafted with citations for Rutherford's experiment, He²⁺ properties, and smoke detector technology
- [ ] Centralized constants file created (`src/utils/constants.jsx`) with He²⁺ ion properties (Z=2, 2 protons, 2 electrons removed, mass number, electron configuration)

### Exit Conditions

Phase 1 is complete when:

- [ ] All research output files exist in `.planning/research/` and are substantive (non-empty, free of continuation sentinels)
- [ ] All RES-IDs are acknowledged and mapped to phase objectives
- [ ] Stack compatibility verified (npm ls shows no conflicts, @types packages installed)
- [ ] Bibliography section has initial content with sourced citations
- [ ] Constants file centralizes all ion property data in one location
- [ ] WebGL fallback logic is in place for non-WebGL browsers
- [ ] Package.json has pinned versions (no wildcards for core dependencies)
- [ ] Research summary confirms overall confidence: HIGH (Stack), MEDIUM (Features), HIGH (Architecture), HIGH (Pitfalls)

### Wave Transition

When Wave 1 (Domain Research) objectives are met, transition to **Wave 2: Technology Research** (which is already complete — research files already exist). The phase then moves to building the slide deck in Phase 2.

## Dependencies

- **No prior phases** — Phase 1 is the foundation phase
- **Depends on**: None (this is the first phase)
- **Blocks**: Phase 2 (Build — simulations and slide deck creation) depends on Phase 1 research being complete and validated

## Research Flags (from SUMMARY.md)

- **Needs deeper research during planning Phase 1**: 
  - Verification that Spectacle.js 4.5.0 integrates cleanly with React 18.3 and Vite 5 in this specific project context
  - Confirmation of compatible @types versions for all packages
  - Detailed browser support matrix for target student devices (Chrome, Safari, Edge version requirements for WebGL2)
  - Exact bibliography sources and citation format for Brazilian high school chemistry curriculum
- **Phases with standard patterns (skip deeper research)**: Phase 1 base stack setup (well-documented); Phase 3 keyboard navigation (Spectacle.js built-in handlers); Phase 3 GitHub Pages deployment (standard gh CLI workflow)

## Confidence Assessment (from SUMMARY.md)

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommended versions have HIGH confidence sources from Context7 docs and verified compatibility matrices |
| Features | MEDIUM | Feature priorities are well-defined but actual implementation approach may require adjustment |
| Architecture | HIGH | Container/presentational pattern, custom hooks, and data flow diagrams are well-established patterns |
| Pitfalls | HIGH | All 5 critical pitfalls have clear prevention strategies with documented causes and solutions |
| Overall confidence | HIGH | Research is comprehensive and recommendations are well-supported |

## Gaps to Address (from SUMMARY.md)

- **Bibliography source validation**: Specific sources and citation format for Brazilian high school chemistry curriculum need validation during planning
- **Exact Matter.js + Three.js sync mechanism**: While research recommends `render: { visible: false }` for Matter.js and manual position sync in the animation loop, the specific implementation pattern needs to be decided during planning
- **Target browser specification**: Exact browser versions students will use should be confirmed during planning
- **Particle count targets for Matter.js**: Exact number of particles/physics bodies for the He²⁺ interaction simulation needs definition

## Sources

- .planning/research/STACK.md — Stack recommendations with version compatibility matrices and alternatives considered
- .planning/research/ARCHITECTURE.md — Architecture patterns, component responsibilities, data flow, and anti-patterns
- .planning/research/PITFALLS.md — Critical pitfalls with prevention strategies and pitfall-to-phase mapping
- .planning/research/FEATURES.md — Feature landscape with table stakes, differentiators, anti-features, and priority matrix
- .planning/research/SUMMARY.md (this file) — Synthesized analysis
- .planning/PROJECT.md, .planning/REQUIREMENTS.md, .planning/ROADMAP.md — Project context files referenced in research sources
- Spectacle.js docs, Three.js docs, Matter.js docs
- Brazilian chemistry curriculum standards

---

*Phase 1: Research — Foundation & Content*  
*Researched: 2026-08-31*  
*Last updated: 2026-08-31 after Phase 1 planning*  
*Next: /gsd-transition to Phase 2 — Build*