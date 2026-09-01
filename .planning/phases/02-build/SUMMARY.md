# Phase 2: Build — Slide Deck & Simulations

## Wave 1: Slide Deck Creation — Complete

**Objective:** Create the Spectacle.js-based slide deck with all core educational content, including static imagery, text, and references.

**Deliverables:**
- Functional slide deck with all 6 core content pages
- Centralized constants file (`src/utils/constants.jsx`) with He²⁺ ion properties
- Slide styling adapted for educational content (`src/styles/slide-styles.css`)
- Basic navigation between slides via Spectacle.js router
- Local development server working (`npx vite dev`)

**Tasks Completed:**
- [x] Created `src/utils/constants.jsx` — He²⁺ ion properties (Z=2, mass number 4, electron configuration 1s⁰, Cation)
- [x] Created `src/components/Slide.jsx` — Spectacle.js wrapper component
- [x] Created `src/components/ChemicalInfo.jsx` — Chemical data display component
- [x] Created `src/components/References.jsx` — Bibliography component
- [x] Created `src/styles/slide-styles.css` — Slide styling for educational content
- [x] Set up `src/components/App.jsx` — Spectacle.js configuration with all 6 content slides plus simulations slide
- [x] Implemented basic navigation and routing between slides
- [x] Installed dependencies (react, react-dom, vite, @vitejs/plugin-react, @react-three/fiber, @react-three/drei, matter-js, three)
- [x] Verified development server: `npx vite dev` starts successfully
- [x] Confirmed all SLD-01 through SLD-06 requirements accounted for

**Remaining from Wave 1:**
- SLD-07: Integrar simulação 3D (Three.js) — in Wave 2
- SLD-08: Integrar simulação 2D (Matter.js) — in Wave 2
- SLD-09: Deploy para GitHub Pages — in Wave 2

## Wave 2: Simulations & Integration — In Progress

**Objective:** Add the Three.js 3D atomic structure simulation and Matter.js 2D particle interaction simulation, integrate them with the slide deck, implement proper cleanup, and deploy to GitHub Pages.

**Deliverables:**
- Three.js 3D atomic structure simulation of He²⁺ ion (nucleus + electrons + orbits)
- Matter.js 2D particle simulation with visible rendering
- Simulations integrated with slide deck with lazy-loading and pointerEvents
- WebGL fallback for non-WebGL browsers
- GitHub Pages deployment configured (homepage + base path + deploy script)
- Build verified successfully with `npx vite build`
- Complete interactive slide deck operational

**Tasks Completed:**
- [x] Create `src/components/AtomicStructure3D.jsx` — Three.js / react-three-fiber component (updated with nucleus, electrons, orbits)
- [x] Create `src/components/ParticleSimulation2D.jsx` — Matter.js physics simulation (fixed requestAnimationFrame bug, added visible canvas rendering, resize handler, pointerEvents)
- [x] Create `src/components/SimulationsIntegration.jsx` — Integration component with lazy loading, WebGL detection, side-by-side layout
- [x] Implement lazy-initialization of simulations only when slide is actively visible (IntersectionObserver)
- [x] Proper cleanup on unmount (Three.js object disposal, Matter.js engine stop, requestAnimationFrame cancel)
- [x] Resize handler for both Three.js renderer and Matter.js canvas
- [x] Implement interaction handling (pointerEvents: 'none' on simulation canvases)
- [x] Add WebGL feature detection and static fallback
- [x] Configure package.json `homepage` field and Vite `base` path for GitHub Pages
- [x] Add deploy script (`vite build && npx gh-pages -d dist`)
- [x] Fix App.jsx import: `Spectacle` → `Deck` for Spectacle.js v10 compatibility
- [x] Fix frontend rendering: downgrade React 19→18.3.1, add styled-components 6.5.3 for `styled.div` compatibility
- [x] Fix ParticleSimulation2D.jsx: use refs for dimensions, fix animation loop, add resize handler
- [x] Fix SimulationsIntegration.jsx: proper flex layout with explicit heights for Canvas rendering
- [x] Build verified successfully (`npx vite build` produces dist/)

**Remaining:**
- [ ] Final testing: complete slide deck with simulations, navigate all slides, verify interactions
- [ ] Deploy to GitHub Pages and verify live URL
- [ ] Confirm SLD-09 deployment requirements fully met

**Phase Requirements Mapping:**
- SLD-01: ✅ — Slide title with theme name (Wave 1 complete)
- SLD-02: ✅ — Chemical identification of He²⁺ (Wave 1 complete)
- SLD-03: ✅ — Subatomic explanation (Wave 1 complete)
- SLD-04: ✅ — Representative image of the ion (Wave 1 complete)
- SLD-05: ✅ — Authorship section (Wave 1 complete)
- SLD-06: ✅ — References section (Wave 1 complete)
- SLD-07: ✅ — 3D simulation integration (AtomicStructure3D with nucleus, electrons, orbits)
- SLD-08: ✅ — 2D simulation integration (ParticleSimulation2D with Matter.js physics)
- SLD-09: 🔄 — GitHub Pages deployment (configured, awaiting push)