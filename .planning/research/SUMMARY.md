# SUMMARY.md

## Executive Summary

This project is an educational slide presentation about smoke detectors and the discovery of the atomic nucleus, centered on the He²⁺ (helium doubly ionized) ion. It combines structured slideware with interactive 3D and 2D simulations to help students visualize abstract chemistry concepts. Based on the research, the recommended approach uses React 18.3 + Vite 5 as the foundation, Spectacle.js for slide navigation, Three.js r155 with react-three-fiber for 3D atomic structure visualization, and Matter.js 0.19.0 for 2D particle interaction simulations. The project should follow a container/presentational architectural pattern with centralized ion property constants, and simulations should be lazy-initialized per-slide to optimize performance. Key risks include Three.js initialization failures in the browser, version mismatches between Three.js and Matter.js, and ensuring proper bibliographic references for educational content.

## Key Findings

### Stack

The recommended technology stack combines mature, well-documented libraries suited for educational web presentations. React 18.3.x is the stable LTS choice, providing concurrent features without the breaking changes of React 19 (still in RC/dev as of 2026). Vite 5.x with @vitejs/plugin-react delivers fast refresh and minimal configuration. For slides, Spectacle.js 4.5.0 is the optimal React-based presentation framework, supporting Markdown, theming, speaker notes, and touch/swipe interactions. Three.js r155 with react-three-fiber r8+ and @react-three/drei r9 enables declarative 3D atomic structure visualization, including He²⁺ ion orbital representation. Matter.js 0.19.0 provides a lightweight 2D physics engine for particle interactions, configured with `render: { visible: false }` to avoid canvas conflicts with Three.js. The stack avoids Create React App (deprecated), Next.js (unnecessary complexity), and older Three.js versions (r125 or older lack WebGL2 support and important loaders). Version compatibility is well-established: react@18.3.0 works with three@r155, react-three-fiber@r8, @react-three/drei@r9, and matter-js@0.19.0.

### Expected Features

The feature landscape is organized into three tiers. **Table stakes** (must-have for v1 launch) include: slide title with theme name, chemical identification of He²⁺ (Z=2, charge +2, cation), subatomic explanation (protons/electrons), representative ion image, authorship section (name + turma), references bibliography section, and GitHub Pages deployment. These are expected by users and form the minimum viable product. **Differentiators** (competitive advantage, P2) include: 3D atomic structure simulation via Three.js, 2D particle interaction simulation via Matter.js, and user interactivity (camera controls, view toggles, particle dragging). These features set the product apart from traditional PowerPoint or static HTML presentations. **Anti-features** to avoid entirely are: mobile apps (defer to responsive web v2+), authentication systems (no user accounts needed), database/notes systems (presentation-only scope), and real-time chat (distracts from learning objectives). The feature dependency chain shows that slide title requires chemical identification, which requires subatomic explanation, which benefits from an ion image that enhances the 3D simulation; both 3D and 2D simulations enable interactivity; and authorship/references are independent parallel elements.

### Architecture Approach

The recommended architecture follows a container/presentational pattern with clear separation between Spectacle.js slide routing and simulation logic. The system has three layers: the presentation layer (Spectacle.js router wrapping individual Slide components), the simulation layer (Three.js AtomicStructure3D component and Matter.js ParticleSimulation2D component), and the content/references layer (ChemicalInfo and References components). The project structure organizes code under src/components (Slide, AtomicStructure3D, ParticleSimulation2D, ChemicalInfo, References), src/utils (constants with ion properties and helpers), and src/styles (slide-styles.css). A single constants file ensures consistent He²⁺ property data (Z=2, 2 protons, 2 electrons removed) across all slides, preventing the inconsistent ion data pitfall. Custom hooks encapsulate Three.js and Matter.js initialization, lifecycle, and cleanup, with Zustand used for simulation controls outside the React render loop. Data flows from Spectacle.js slide router → slide component → simulation state → Three.js useFrame render loop (direct mutation) or Matter.js Engine.update() → WebGL/2D renderer updates. Key architectural anti-patterns to avoid include plain Three.js with useEffect only (causes performance issues), driving simulations with useState (causes 60fps React re-renders), and sharing a single Matter.js engine across all slides (causes physics state accumulation).

### Critical Pitfalls

Top 5 critical pitfalls with prevention strategies:

1. **Three.js initialization failing in browser** (Phase 1): WebGL context creation failures, black screens, or canvas attachment issues. Prevention: always check `renderer.capabilities.isWebGL2Available()`, initialize inside `DOMContentLoaded` or `useEffect` with proper cleanup, provide visible fallback for browsers without WebGL.

2. **Matter.js conflicts with Three.js** (Phase 2): Both libraries creating canvas elements leading to visual artifacts or performance degradation. Prevention: always use Matter.js with `render: { visible: false }`, sync body positions manually to Three.js meshes in the animation loop, share a single animation loop stepping both engines.

3. **Dependency version mismatches** (Phase 1): Incompatible Three.js and Matter.js versions causing runtime errors. Prevention: pin specific versions in package.json (Three.js r155 with Matter.js ~0.19.0), run `npm ls` after adding dependencies, keep @types packages in sync.

4. **Mobile unfriendliness** (Phase 3): Simulations working on desktop but failing on mobile — touch events not propagating, wrong canvas size, 60fps causing battery drain. Prevention: responsive canvas sizing with resize handlers, device tier detection for lighter scenes on weak hardware, respect `prefers-reduced-motion`, test on actual devices.

5. **Missing references/bibliography** (Phase 1): Educational project without citations for Rutherford's experiment, He²⁺ properties, smoke detector principles. Prevention: add references section early (Phase 1, Wave 2), cite all sources, use consistent citation format, verify accuracy.

## Implications for Roadmap

### Suggested Phase Structure

Based on the research findings and pitfall-to-phase mapping, the roadmap should be structured in 3 phases:

**Phase 1 — Foundation & Content** (Weeks 1-3)
- **Rationale**: Establish the core stack, validate browser/environment compatibility, and populate educational content before building any simulations. This phase addresses the highest-priority pitfalls (Three.js init, version mismatches, missing references, inconsistent ion data) that would block later work.
- **Delivers**: Project setup with React 18 + Vite + Spectacle.js; slide deck with all table-stakes features (title, He²⁺ chemical identification, subatomic explanation, ion image, authorship, references); centralized constants file with ion properties; bibliography section with proper citations; browser WebGL feature detection and fallback; npm dependency pins and type definitions.
- **Features**: Slide title, chemical identification of He²⁺, subatomic explanation, representative ion image, authorship section, references section, GitHub Pages deploy configuration.
- **Pitfalls avoided**: #1 (Three.js init), #3 (version mismatches), #5 (missing references), #8 (inconsistent ion data), #9 (poor WebGL fallback).

**Phase 2 — Simulations & Integration** (Weeks 4-6)
- **Rationale**: Build the 3D and 2D simulations once the content foundation is stable. This phase addresses integration pitfalls between Three.js and Matter.js, performance considerations, and memory management that require actual simulation code.
- **Delivers**: Three.js/React-three-fiber Canvas component visualizing He²⁺ atomic structure with orbital visualization; Matter.js engine with `render: { visible: false }` integrated into the animation loop; responsive canvas sizing and device tier detection; performance profiling with Chrome DevTools; useEffect cleanup patterns for simulation components.
- **Features**: 3D simulation of atomic structure, 2D simulation of particle interactions, view toggles between 3D/2D modes.
- **Pitfalls avoided**: #2 (Matter.js + Three.js conflicts), #6 (performance degradation), #7 (memory leaks), #12 (inconsistent styling — design system established).

**Phase 3 — Accessibility & Polish** (Weeks 7-8)
- **Rationale**: Finalize the product with accessibility, mobile responsiveness, and deployment validation. This phase addresses the remaining critical pitfalls (mobile unfriendliness, no keyboard navigation) and moderate ones that validate the shippable product.
- **Delivers**: Mobile-responsive simulations with resize handling; keyboard navigation via Spectacle.js built-in handlers and arrow keys; touch event management; WCAG compliance testing; final performance optimization; deployment to GitHub Pages verification.
- **Features**: Full slide navigation (keyboard and touch), accessible focus indicators, reduced motion support, responsive breakpoints.
- **Pitfalls avoided**: #4 (mobile unfriendliness), #13 (no keyboard navigation).

### Phase Ordering Rationale

The phase order follows strict dependency logic: Phase 1 must complete before Phase 2 because the simulation components depend on stable slide routing, centralized ion constants, and validated bibliography content. Phase 2 must complete before Phase 3 because accessibility and mobile responsiveness features depend on the simulations being functional and their DOM structure being stable. This ordering is confirmed by the pitfall-to-phase mapping, which assigns critical Phase 1 pitfalls (Three.js init, version mismatches, references, ion data, WebGL fallback) to early phases and Phase 2/3 pitfalls (integration conflicts, performance, memory leaks, mobile, keyboard navigation) to later phases once the foundation exists.

## Research Flags

- **Needs deeper research during planning Phase 1**: Verification that Spectacle.js 4.5.0 integrates cleanly with React 18.3 and Vite 5 in this specific project context; confirmation of compatible @types versions for all packages; detailed browser support matrix for target student devices (Chrome, Safari, Edge version requirements for WebGL2); exact bibliography sources and citation format for Brazilian high school chemistry curriculum.
- **Needs deeper research during planning Phase 2**: Exact Matter.js + Three.js integration pattern (sync strategy for body positions to mesh positions in useFrame loop); performance benchmarks for He²⁺ 3D scene complexity target triangle counts; responsive breakpoints and canvas resize strategy for different slide sizes in Spectacle.js.
- **Phases with standard patterns (skip deeper research)**: Phase 1 base stack setup (React 18 + Vite + Spectacle.js pattern is well-documented); Phase 3 keyboard navigation (Spectacle.js built-in handlers are standard); Phase 3 GitHub Pages deployment (standard gh CLI workflow).

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommended versions have HIGH confidence sources from Context7 docs and verified compatibility matrices. React 18.3 + Vite 5 + Three.js r155 + Matter.js 0.19.0 is a tested combination as of 2025-2026. |
| Features | MEDIUM | Feature priorities are well-defined from the feature research, but the actual implementation approach for 3D/2D simulations may require adjustment based on project-specific constraints. The MVP vs. P2 differentiator split is clear. |
| Architecture | HIGH | Container/presentational pattern, custom hooks, and data flow diagrams are well-established patterns for React + Three.js + Matter.js projects. The component structure and constants file approach directly address the identified pitfalls. |
| Pitfalls | HIGH | All 5 critical pitfalls have clear prevention strategies with documented causes and solutions. The pitfall-to-phase mapping provides explicit guidance on when to address each. |
| Overall confidence | HIGH | The research is comprehensive and the recommendations are well-supported. The main source of uncertainty is the actual integration of Three.js and Matter.js in the same project, but the research provides explicit guidance to avoid the known conflict patterns. |

### Gaps to Address

- **Bibliography source validation**: The research identifies references as a table-stakes feature, but the specific sources and citation format for the Brazilian high school chemistry curriculum need to be validated during Phase 1. This includes Rutherford's experiment citations, He²⁺ ion property data origins, and smoke detector technology sources.
- **Exact Matter.js + Three.js sync mechanism**: While the research recommends `render: { visible: false }` for Matter.js and manual position sync in the animation loop, the specific implementation pattern (how body positions map to Three.js mesh positions each frame) needs to be decided during planning.
- **Target browser specification**: The research mentions WebGL2 support and mobile testing but doesn't specify exactly which browser versions students will use. This should be confirmed during planning to set appropriate feature detection thresholds.
- **Particle count targets for Matter.js**: The research mentions limiting particles for mobile (50-100) vs desktop (200-500), but the exact number of particles/physics bodies for the He²⁺ interaction simulation needs to be defined.

## Sources

- **Primary (HIGH confidence)**: .planning/research/STACK.md — Stack recommendations with version compatibility matrices and alternatives considered
- **Primary (HIGH confidence)**: .planning/research/ARCHITECTURE.md — Architecture patterns, component responsibilities, data flow, and anti-patterns
- **Primary (HIGH confidence)**: .planning/research/PITFALLS.md — Critical pitfalls with prevention strategies and pitfall-to-phase mapping
- **Primary (MEDIUM confidence)**: .planning/research/FEATURES.md — Feature landscape with table stakes, differentiators, anti-features, and priority matrix
- **Secondary**: .planning/research/SUMMARY.md (this file) — Synthesized analysis
- **Tertiary**: Project context files (.planning/PROJECT.md, .planning/REQUIREMENTS.md, .planning/ROADMAP.md referenced in FEATURES.md sources); Spectacle.js docs, Three.js docs, Matter.js docs; Brazilian chemistry curriculum standards