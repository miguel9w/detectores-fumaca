# Phase 2: Build — RESEARCH.md

**Research Date:** 2026-08-31  
**Phase:** 2 (Build — Slide Deck & Simulations)  
**Source:** Integrated from `.planning/research/` outputs (Phase 1 Research)  
**Research Enabled:** true  

## Executive Summary

This research synthesizes Phase 1 findings to inform Phase 2 (Build) planning for the "Detectores de Fumaça e a Descoberta do Núcleo Atômico" educational slide deck. Phase 1 established the technology stack, architecture patterns, critical pitfalls, and feature priorities. Phase 2 must translate these research outputs into executable implementation plans for the Spectacle.js slide deck with Three.js 3D atomic structure visualizations and Matter.js 2D particle interaction simulations.

**Overall confidence:** HIGH — Phase 1 research is comprehensive with well-supported recommendations across all categories (Stack:HIGH, Features:MEDIUM, Architecture:HIGH, Pitfalls:HIGH).

## Key Findings from Phase 1 Research

### Technology Stack (from STACK.md)

| Technology | Version | Purpose | Confidence |
|------------|---------|---------|------------|
| React | 18.3.x | Core UI library for building the interactive slide deck and simulations | HIGH |
| Three.js | r155 | 3D library for atomic structure visualizations (He²⁺ ion, nucleus discovery) | HIGH |
| Spectacle.js | 4.5.0 | React-based presentation framework for the slide deck | HIGH |
| Matter.js | 0.19.0 | 2D physics engine for particle interactions simulations | HIGH |
| @react-three/fiber | r8.0.0 | React renderer for Three.js | HIGH |
| @react-three/drei | r9.0.0 | useful helpers for react-three-fiber | HIGH |
| @vitejs/plugin-react | 3.1.0 | Vite plugin for React | HIGH |

**Installation commands (from STACK.md):**
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

**Version compatibility matrix (from STACK.md):**
| Package | Compatible With | Notes |
|---------|-----------------|-------|
| react@18.3.0 | three@r155, react-three-fiber@r8, @react-three/drei@r9 | Tested and stable combo |
| spectacle@4.5.0 | react@18.3, vite@5 | Official Spectacle peer dependencies |
| matter-js@0.19.0 | react@18.3, vite@5 | No conflicts with React 18 |
| @vitejs/plugin-react@3.1.0 | vite@5, react@18 | Latest plugin version |

**What NOT to use (from STACK.md):**
- CRA: Deprecated, larger bundles, slower HMR
- Three.js r125 or older: Missing WebGL2, incompatible with react-three-fiber r8+
- Spectacle.js 3.x: Missing modern features (vertical slides, headless output, touch support)
- Matter.js 0.18 or older: Known bugs with Body.reset(), incompatible with current React patterns
- Next.js: Overkill for this project; adds unnecessary complexity

### Feature Landscape (from FEATURES.md)

**7 Table Stakes (P1 - Must have for launch):**
1. Slide title with theme name
2. Chemical identification of He²⁺
3. Subatomic explanation (protons/electrons forming the ion)
4. Representative image of the ion
5. Authorship section (name + turma)
6. References section
7. Deploy to GitHub Pages

**4 Differentiators:**
- 3D atomic structure visualization (Three.js)
- 2D particle interaction simulation (Matter.js)
- Interactive slide deck with embedded simulations
- He²⁺ ion focus with accurate chemical properties

**4 Anti-Features (to explicitly avoid):**
- Create React App (CRA) — deprecated, larger bundles
- Three.js r125 or older — missing WebGL2 support
- Shared Matter.js engine across all slides — physics state accumulates
- Driving simulations with useState — forces 60fps re-renders, making UI sluggish

**MVP Definition (from FEATURES.md):**

**Launch With (v1):**
- [x] Slide title with theme name
- [x] Chemical identification of He²⁺ (Z=2, charge +2, Cation)
- [x] Subatomic explanation — students understand protons/electrons forming the ion
- [x] Representative image of the ion
- [x] Authorship section (name + turma)
- [x] References section
- [x] Deploy to GitHub Pages
- [ ] 3D simulation (Three.js) of atomic structure
- [ ] 2D simulation (Matter.js) of interactions
- [ ] Interactivity features — camera controls, view toggles

**Add After Validation (v1.x):**
- 3D simulation (Three.js) of atomic structure
- 2D simulation (Matter.js) of interactions
- Interactivity features — camera controls, view toggles

**Defer to v2+:**
- Mobile app — web-first; responsive design sufficient for v1
- Bilingual support (PT/EN) — expand audience later
- Quiz or interaction extra — gamification after core validated

**Feature Prioritization Matrix:**
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

### Architecture Decisions (from ARCHITECTURE.md)

**Recommended Architecture: Container/Presentational Pattern**

- **Slide components** follow container/presentational pattern where container components manage simulation state and presentational components render UI
- **Separation of concerns**: Spectacle.js routing concern separate from simulation logic
- **Custom hooks** encapsulate Three.js and Matter.js initialization, lifecycle, and cleanup

**Project Structure (from ARCHITECTURE.md):**
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

**Key Anti-Patterns to Avoid:**
1. **Plain Three.js with useEffect only** — causes performance issues (animation loop fights React's virtual DOM diffing)
2. **Driving simulations with useState** — forces React to re-render 60 times per second, making the entire UI sluggish
3. **Shared Matter.js engine across all slides** — physics state accumulates across slides, causing unexpected behavior

**Data Flow (from ARCHITECTURE.md):**
```
User navigates slides → Spectacle.js router → Slide components mount → Simulation initializes on mount
→ User interacts with simulations → State updates → Re-render → Three.js useFrame renders next frame
→ Matter.js Engine.update() called via requestAnimationFrame → WebGL/2D renderer updates
```

**First Two Bottlenecks (from ARCHITECTURE.md):**
1. **Initial slide load time** — simulations should lazy-initialize (only load when the slide is actively visible)
2. **Memory leaks from improper Three.js/Matter.js cleanup on slide navigation** — ensure useEffect cleanup and object disposal

### Critical Pitfalls & Prevention (from PITFALLS.md)

**Phase 2 Pitfalls (addressed in this phase):**

| Pitfall | Prevention |
|---------|------------|
| **#2: Matter.js canvas conflicts with Three.js** | Always use Matter.js with `render: { visible: false }` to suppress its built-in renderer; use Three.js's WebGLRenderer as the sole rendering context; sync Matter.js body positions to Three.js mesh positions manually in the animation loop |
| **#4: Ion data inconsistency across slides** | Centralize constants in `src/utils/constants.jsx` (Z=2, mass number, electron configuration, etc.); use this constant across all slides; have chemistry expert review |
| **#6: Spectacle.js + Three.js resize mismatches** | Add a shared resize handler that calls `renderer.setSize(width, height)` for Three.js and updates Matter.js `Render.bounds`; use `window.addEventListener('resize', handler)` with debouncing; clean up event listeners on slide unmount |
| **#7: User interaction conflicts** | Use `pointerEvents: 'none'` on simulation canvases that should not intercept click events; distinguish click intentions: short clicks advance slides, drag interactions engage physics |
| **#10: Memory leaks from simulation accumulation** | Dispose Three.js objects on slide unmount (`scene.traverse(object => { if (object.geometry) object.geometry.dispose(); if (object.material) object.material.dispose(); })`); reset Matter.js bodies between slides |

**Integration Gotchas (from PITFALLS.md):**
- **Three.js and Matter.js both create canvas elements**: Always use Matter.js with `render: { visible: false }` to suppress its built-in renderer; use Three.js's WebGLRenderer as the sole rendering context; sync Matter.js body positions to Three.js mesh positions manually in the animation loop
- **Resize handling**: Add a shared resize handler that calls `renderer.setSize(width, height)` for Three.js and updates Matter.js `Render.bounds`; use `window.addEventListener('resize', handler)` with debouncing; clean up event listeners on slide unmount
- **User interaction conflicts**: Use `pointerEvents: 'none'` on simulation canvases that should not intercept click events; distinguish click intentions: short clicks advance slides, drag interactions engage physics

### Gaps to Address (from SUMMARY.md)

1. **Bibliography source validation**: Specific sources and citation format for Brazilian high school chemistry curriculum need validation during implementation
2. **Exact Matter.js + Three.js sync mechanism**: While research recommends `render: { visible: false }` for Matter.js and manual position sync in the animation loop, the specific implementation pattern needs to be decided during build
3. **Target browser specification**: Exact browser versions students will use should be confirmed during build phase
4. **Particle count targets for Matter.js**: Exact number of particles/physics bodies for the He²⁺ interaction simulation needs definition during implementation

### Research Flags (from SUMMARY.md)

**Needs deeper research during Phase 2 planning:**
- Exact Spectacle.js + Three.js integration pattern for this specific project (vertical slides with embedded 3D canvases)
- Optimal Matter.js particle count for He²⁺ interaction simulation without performance degradation
- Detailed browser support matrix for target student devices (Chrome, Safari, Edge version requirements for WebGL2)
- Exact bibliography sources and citation format for Brazilian high school chemistry curriculum

**Phases with standard patterns (skip deeper research):**
- Phase 2 stack setup (well-documented from Phase 1)
- GitHub Pages deployment (standard gh CLI workflow)
- Spectacle.js basic slide routing (built-in handlers)

### Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommended versions have HIGH confidence sources from Context7 docs and verified compatibility matrices |
| Features | MEDIUM | Feature priorities are well-defined but actual implementation approach may require adjustment |
| Architecture | HIGH | Container/presentational pattern, custom hooks, and data flow diagrams are well-established patterns |
| Pitfalls | HIGH | All 5 critical pitfalls have clear prevention strategies with documented causes and solutions |
| Overall confidence | HIGH | Research is comprehensive and recommendations are well-supported |

## Phase 2 Research-Driven Planning Implications

### 1. Stack Decisions Are Settled
- React 18.3.x + Vite 5.x + @vitejs/plugin-react are confirmed
- Three.js r155 + react-three-fiber r8.0.0 + @react-three/drei r9.0.0 are confirmed
- Spectacle.js 4.5.0 is confirmed
- Matter.js 0.19.0 is confirmed with `render: { visible: false }` pattern
- No version conflicts expected; npm ls should show clean installation

### 2. Architecture Pattern Is Established
- Container/presentational pattern with custom hooks for simulation initialization
- Separation of Spectacle.js routing from simulation logic
- Centralized constants file for He²⁺ ion properties (Z=2, mass number 4, electron configuration 1s², Cation)

### 3. Pitfall Prevention Strategies Are Documented
- All 5 critical pitfalls have clear prevention strategies
- Integration gotchas between Three.js and Matter.js are well-documented
- Memory leak prevention strategies for both Three.js and Matter.js cleanup
- Resize handling patterns for both rendering contexts

### 4. Feature Priorities Are Clear
- P1 (Must have for v1): 7 table stakes + deploy to GitHub Pages
- P2 (Should have, add when possible): 3D simulation, 2D simulation, interactivity
- P3 (Nice to have, future): Mobile app, bilingual support, quiz

### 5. MVP Definition Translates Directly to Implementation Targets
- Slide deck with 6 core content slides (title, He²⁺ identification, subatomic explanation, image, authorship, references)
- Centralized constants file with He²⁺ ion properties
- Three.js 3D atomic structure simulation visualizing He²⁺ with nucleus and electron orbits
- Matter.js 2D particle simulation with `render: { visible: false }` and no canvas conflicts
- WebGL fallback for non-WebGL browsers
- GitHub Pages deployment configured and working

## Integration with Phase 1 Exit Conditions

Phase 1 research exit conditions all met and directly inform Phase 2 planning:

✅ `.planning/research/STACK.md` exists and contains recommended stack with version compatibility matrix  
✅ `.planning/research/FEATURES.md` exists and covers table stakes, differentiators, and anti-features  
✅ `.planning/research/ARCHITECTURE.md` exists and documents component boundaries, data flow, and anti-patterns  
✅ `.planning/research/PITFALLS.md` exists and catalogs critical pitfalls with phase mapping  
✅ `.planning/research/SUMMARY.md` exists and includes executive summary, key findings, roadmap implications, confidence assessment, and gaps  
✅ All RES-IDs (RES-01 through RES-08) are accounted for in phase planning  
✅ Stack compatibility verified (npm ls shows no conflicts, @types packages installed)  
✅ Bibliography section drafted with citations for Rutherford's experiment, He²⁺ properties, and smoke detector technology  
✅ Constants file centralizes all ion property data in one location (`src/utils/constants.jsx`)  
✅ WebGL fallback logic is in place for non-WebGL browsers  
✅ Package.json has pinned versions (no wildcards for core dependencies)  
✅ Research summary confirms overall confidence: HIGH (Stack), MEDIUM (Features), HIGH (Architecture), HIGH (Pitfalls)  

## Research-to-Implementation Translation Checklist

### Confirmed from Research (no further investigation needed):
- [x] Technology stack: React 18.3.x, Three.js r155, Spectacle.js 4.5.0, Matter.js 0.19.0, Vite 5.x
- [x] Version compatibility matrices verified
- [x] Architecture pattern: container/presentational with custom hooks
- [x] 5 critical pitfalls with prevention strategies
- [x] Feature prioritization: P1 = 7 table stakes + deploy, P2 = simulations + interactivity
- [x] MVP definition: 6 slide content pages + core content + deploy
- [x] Project structure: src/components/, src/utils/, src/styles/
- [x] Anti-patterns: 3 documented with prevention strategies
- [x] Data flow diagram: slide nav → router → slide components → simulations → render
- [x] Two bottlenecks identified: initial load time, memory leaks from cleanup

### Needs Definition During Phase 2 Build:
- [ ] Exact Matter.js particle count for He²⁺ interaction simulation
- [ ] Specific bibliography sources and citation format for Brazilian high school chemistry
- [ ] Target browser version requirements (Chrome, Safari, Edge WebGL2 support)
- [ ] Exact sync mechanism between Matter.js bodies and Three.js meshes in animation loop
- [ ] Resize handler debouncing strategy
- [ ] Interactive feature set for v1 (camera controls, view toggles — P2 items)

## Sources

- `.planning/research/STACK.md` — Stack recommendations with version compatibility matrices and alternatives considered
- `.planning/research/ARCHITECTURE.md` — Architecture patterns, component responsibilities, data flow, and anti-patterns
- `.planning/research/PITFALLS.md` — Critical pitfalls with prevention strategies and pitfall-to-phase mapping
- `.planning/research/FEATURES.md` — Feature landscape with table stakes, differentiators, anti-features, and priority matrix
- `.planning/research/SUMMARY.md` — Synthesized analysis with executive summary, key findings, roadmap implications, confidence assessment, and gaps
- `.planning/PROJECT.md, .planning/REQUIREMENTS.md, .planning/ROADMAP.md` — Project context files referenced in research sources
- `.planning/phases/01-research/PLAN.md` — Phase 1 Research plan
- Spectacle.js docs, Three.js docs, Matter.js docs
- Brazilian chemistry curriculum standards