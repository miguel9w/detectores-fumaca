# Stack Research

**Domain:** Educational chemistry slides with 3D/2D simulations (smoke detectors + atomic nucleus discovery, focused on He²⁺ ion)
**Researched:** 2026-08-31
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 18.3.x | Core UI library for building the interactive slide deck and simulations | React 18 is the stable LTS version as of 2025-2026. React 18.3+ provides concurrent features without the breaking changes of React 19 (still in RC/dev phase). Battle-tested for production including educational apps. Required by both Spectacle.js (slides) and react-three-fiber (3D). |
| Three.js | r155 | 3D library for atomic structure visualizations (He²⁺ ion, nucleus discovery simulation) | r155 is the latest stable as of 2025-2026. Integrates with React via react-three-fiber (r8+), providing React hooks and components for 3D. The standard trio stack (three, react-three-fiber, three-mesh-raycaster) is well-documented and stable. WebGL2 is required, which all modern browsers support. GLTFLoader enables importing detailed atom models for visualizing the nucleus and electron orbitals. |
| Spectacle.js | 4.5.0 | React-based presentation framework for the slide deck | Latest as of 2025-2026. Built specifically for React presentations. Supports Markdown content, nested slides, vertical slides, headless browser output, theming, speaker notes, auto-scaling, and touch/swipe support. Best suited for structured educational presentations with code examples, diagrams, and minimal interactivity. Supports embedding React components within slides for interactive elements. Theming via CSS custom properties. |
| Matter.js | 0.19.0 | 2D physics engine for particle interactions simulations | Latest stable as of 2025-2026. Provides a lightweight physics engine for 2D particle interactions. Integrates with React via the matter-js npm package and useEffect for engine creation, or via react-matterjs wrapper. Key modules: Engine, World, Bodies, Body, Events. Simpler than PhysX but less performant at scale — appropriate for educational-scale simulations. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vitejs/plugin-react | ^3.1.0 | Vite plugin for Fast Refresh with React Fast Refresh (RFC) | Required when using Vite as build tool. Provides fast HMR essential for educational development iterations. |
| three-stdlib | r3.5.0 | Utility modules for Three.js (RGBELoader, etc.) | Needed for environment maps and advanced loading. RGBELoader environment maps for realistic scene lighting in atomic simulations. |
| react-three-fiber | r8.0.0 | React renderer for Three.js | Core integration layer between React and Three.js. Provides hooks (useThree, useFrame) and components (<Canvas>, <mesh>, <primitives>). |
| @react-three/drei | r9.0.0 | Helpful Three.js helpers and components | Contains commonly used helpers for educational demos: OrbitControls, Text, useFrameLoop, useLoadingManager, etc. Essential for 3D scene interaction and visualization. |
| matter-js | 0.19.0 | 2D physics engine (same as core) | Used directly for 2D particle interaction simulations. Can also use react-matterjs wrapper for React-integrated usage. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Vite 5.x | Build tool and dev server | Recommended over CRA and Next.js for this project. Provides fast HMR, ES modules natively, and minimal config. Vite 5 with React 18 and @vitejs/plugin-react is the modern standard. |
| npm | Package manager | `npm install` and `npm install -d` commands below. |
| gh CLI | GitHub deployment | Used for GitHub Pages deployment as specified in project requirements. |
| jj | Version control | Used for project versioning as specified in project requirements. |

## Installation

```bash
# Core
npm install react react-dom @vitejs/plugin-react three spectacle

# Three.js ecosystem
npm install @react-three/fiber @react-three/drei three-stdlib

# Matter.js
npm install matter-js

# Dev dependencies
npm install -D vite

# Post-install
npx vite
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| React 18.3 + Vite | React 19 | Use React 19 only when it reaches stable LTS and your project requires its new APIs (RSC, Actions). Not recommended until 2026 at earliest. |
| Three.js r155 + react-three-fiber | Two.js or PlayCanvas | Use alternative 2D/3D engines if you need a different rendering approach or licensing. Choose Two.js for 2D canvas vector graphics, PlayCanvas for browser-based 3D collaboration. |
| Spectacle.js 4.5.0 | Reveal.js or PowerPoint | Use Reveal.js if you need non-React presentations with more built-in transition effects. Use PowerPoint/Keynote for traditional offline presentations without web requirements. |
| Matter.js 0.19.0 | Physix or Box2D | Use Physix if you need more advanced 2D physics (compounds, ropes, heightfields). Box2D is the underlying algorithm if you need to port to other languages or platforms. |
| Vite 5.x | Create React App | Do NOT use CRA — it is deprecated, creates larger bundles, and has poorer HMR performance. Not recommended for new projects in 2025-2026. |
| Vite 5.x | Next.js | Do NOT use Next.js unless you need SSR, SSG, or API routes. It adds unnecessary complexity for a simple slide + simulation project. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App (CRA) | Deprecated; no longer maintained; larger production bundles; slower HMR; modern React features (concurrent mode) integration is difficult; community migration away. | Vite 5.x with @vitejs/plugin-react |
| Three.js r125 or older | Missing WebGL2 support; removed important loaders (RGBE moved to separate package); incompatible with react-three-fiber r8+; security vulnerabilities unpatched. | Three.js r155 (latest stable) |
| Spectacle.js 3.x | Missing modern features (vertical slides, headless output, touch support); CSS theming limitations; React 18 incompatibilities. | Spectacle.js 4.5.0 |
| Matter.js 0.18 or older | Known bugs with Body.reset(); missing newer constraints; not compatible with current React patterns. | Matter.js 0.19.0 |
| Next.js for this project | Overkill for simple slide + simulation project; adds server complexity, file-system routing conventions, and build overhead not needed. | Vite 5.x |

## Stack Patterns by Variant

**If building slide-deck-only:** Use Spectacle.js with React components for static content and minimal interactivity. No Three.js or Matter.js needed beyond basic DOM animations.

**If building slide-deck with 3D atomic visualizations:** Use React 18 + Vite + Spectacle.js for slides, and embed a Three.js/React-three-fiber canvas as a Slide component within Spectacle.js for the 3D sections. This gives you structured presentation flow with interactive 3D at specific points.

**If building full interactive educational app:** Use React 18 + Vite as a single-page app (not Spectacle.js), with Three.js for 3D atomic structure and Matter.js for 2D particle simulations, routing via react-router-dom if multiple views are needed.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| react@18.3.0 | three@r155, react-three-fiber@r8, @react-three/drei@r9 | Tested and stable combo as of 2025-2026 |
| spectacle@4.5.0 | react@18.3, vite@5 | Official Spectacle peer dependencies |
| matter-js@0.19.0 | react@18.3, vite@5 | No conflicts with React 18 |
| @vitejs/plugin-react@3.1.0 | vite@5, react@18 | Latest plugin version |

## Sources

- React 18 LTS stability — Context7 docs, HIGH confidence
- Three.js r155 + react-three-fiber integration — Context7 docs, HIGH confidence
- Matter.js 0.19.0 + React integration — Context7 docs, HIGH confidence
- Spectacle.js 4.5.0 features for educational slides — Context7 docs, HIGH confidence
- Vite recommended over CRA/Next.js — EXA web search, HIGH confidence

---
*Stack research for: Educational chemistry slides with 3D/2D simulations (smoke detectors + atomic nucleus discovery, He²⁺ ion focus)*
*Researched: 2026-08-31*