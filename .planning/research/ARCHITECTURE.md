# Architecture Research

**Domain:** Educational slide presentations with 3D/2D simulations (React + Spectacle.js + Three.js + Matter.js)
**Researched:** 2026-08-31
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Slide 1 │  │ Slide 2 │  │ Slide 3 │  │  ...  │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
├───────┴────────────┴────────────┴────────────┴──────────────┤
│                      Spectacle.js Router                     │
├─────────────────────────────────────────────────────────────┤
│                    Simulation Components                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │ Three.js Component  │  │ Matter.js Component │        │
│  │ (AtomicStructure)   │  │ (ParticleSimulation)│        │
│  └─────────────────────┘  └─────────────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                    Content & References                      │
│  ┌─────────────────────┐  ┌─────────────────────┐        │
│  │ ChemicalInfo        │  │ References          │        │
│  └─────────────────────┘  └─────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Slide** | Render slide content, Spectacle.js navigation wrapper | Spectacle.js `Slide` component wrapper |
| **AtomicStructure3D** | Render 3D atomic structure, He²⁺ ion visualization | `react-three-fiber` `<Canvas>` with scene, camera, lights, meshes |
| **ParticleSimulation2D** | Render 2D particle interactions, physics simulations | Matter.js `Engine` + `World` with bodies, `requestAnimationFrame` loop |
| **ChemicalInfo** | Display chemical identification, subatomic explanation | Plain React with JSX, receives props from parent |
| **References** | Display bibliography, citations | React component with bibliography data, possibly with tooltip/accordion UI |

## Recommended Project Structure

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

### Structure Rationale

- **components/Slide.jsx**: Wraps slide content with Spectacle.js navigation. Each slide is a component that may embed Three.js/Matter.js simulations as sub-components. This keeps the Spectacle.js routing concern separate from simulation logic.

- **components/AtomicStructure3D.jsx**: Uses `react-three-fiber` (R3F) for the 3D scene. R3F provides React declarative composition for Three.js, avoiding the pitfalls of manual `useEffect` + plain Three.js initialization. The canvas fills the slide area or a designated region.

- **components/ParticleSimulation2D.jsx**: Uses Matter.js directly with React wrappers. The physics engine is created once (via `useRef`) and updated on each render frame via `useFrame` or `requestAnimationFrame`. Bodies are added/removed Reactively.

- **utils/constants.jsx**: Centralized ion data (He²⁺: Z=2, 2 protons, 2 electrons removed, mass, etc.). Shared between Three.js and Matter.js visualizations to ensure consistency.

- **utils/helpers.jsx**: Formatting functions (format atomic number, format ion notation, calculate electron configurations, etc.).

- **styles/slide-styles.css**: Spectacle.js slide theming. Since slides have a fixed structure, CSS ensures simulations resize appropriately within slide boundaries.

## Architectural Patterns

### Pattern 1: Container/Presentational Pattern

**What:** Slide components follow a container/presentational pattern where container components manage simulation state and presentational components render UI.

**When to use:** Always in this project — separates simulation control logic from slide rendering concerns.

**Trade-offs:**
- ✅ Clear separation of concerns, easier testing of UI parts
- ✅ Simulation state can be passed down without tight coupling
- ❌ Slightly more boilerplate for simple slides

**Example:**
```tsx
// Slide.jsx (container)
import { useThree } from '@react-three/fiber';
import AtomicStructure3D from './AtomicStructure3D';

export default function Slide3D() {
  const { camera, gl } = useThree();
  return <AtomicStructure3D camera={camera} gl={gl} />;
}

// AtomicStructure3D.jsx (presentational)
import { Canvas } from '@react-three/fiber';

export default function AtomicStructure3D({ camera, gl }) {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 2]} intensity={1} />
      {/* He²⁺ ion mesh */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    </Canvas>
  );
}
```

### Pattern 2: Custom Hooks for Three.js/Matter.js Initialization

**What:** Custom hooks encapsulate the initialization, lifecycle, and cleanup of 3D/2D simulation contexts, making them reusable across slides.

**When to use:** When multiple slides need Three.js or Matter.js visualizations.

**Trade-offs:**
- ✅ Reusable across the project, reduces duplication
- ✅ Lifecycle management (mount/unmount, resize, dispose) is handled in one place
- ❌ Initial learning curve for hook design

**Example — useThreeCanvas hook:**
```tsx
import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';

export function useThreeCanvas({
  position = [0, 2, 6],
  fov = 50,
  onLoad,
}: { position?: number[], fov?: number, onLoad?: () => void }) {
  const ref = useRef(null);
  const { gl, scene, camera } = useThree();
  
  useEffect(() => {
    camera.position.set(...position);
    camera.fov = fov;
    onLoad?.();
  }, [position, fov, onLoad]);
  
  return { ref, gl, scene, camera };
}
```

**Example — useMatterEngine hook:**
```tsx
import { useRef, useEffect } from 'react';
import { Engine, World, Bodies } from 'matter-js';

export function useMatterEngine({
  width, height,
  gravity = 0.98,
}: { width: number, height: number, gravity?: number }) {
  const engineRef = useRef();
  
  useEffect(() => {
    engineRef.current = Engine.create({
      gravity: { x: 0, y: 0, scale: gravity }
    });
    
    return () => {
      Engine.destroy(engineRef.current);
    };
  }, [width, height, gravity]);
  
  const runner = useRef(
    setInterval(() => { Engine.update(engineRef.current); }, 1000 / 60)
  );
  
  return { engine: engineRef.current, runner };
}
```

### Pattern 3: State Management for Simulation Controls

**What:** React state simulation controls (play/pause, speed, parameters) are managed outside the Three.js/Matter.js render loop using Zustand or React state, avoiding the anti-pattern of driving per-frame animations with `useState`.

**When to use:** When the simulation needs user-controllable parameters (ion energy, collision forces, etc.).

**Trade-offs:**
- ✅ No React re-renders every frame (60fps → 1fps performance)
- ✅ Clean separation between UI state and render loop
- ❌ Requires custom hooks or state management library

**Anti-pattern to avoid:**
```tsx
// ❌ DON'T DO THIS — re-renders React every frame
function SpinningBox() {
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => {
      setRotation((r) => r + 0.01);  // triggers React re-render every frame!
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <mesh rotation-y={rotation}>...</mesh>;
}
```

**✅ Do this instead — direct mutation in useFrame:**
```tsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function SpinningBox() {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta;  // Direct mutation, ~free
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
```

**Or with Zustand for controllable parameters:**
```tsx
import create from 'zustand';

// Simulation state store (outside React render cycle)
const useSimulationStore = create(set => ({
  speed: 1,
  paused: false,
  setSpeed: (s) => set({ speed: s }),
  togglePause: () => set(s => ({ paused: !s paused })),
}));

// In a Three.js component
function IonSimulation() {
  const { speed, paused } = useSimulationStore();
  
  useFrame((state, delta) => {
    if (!paused) {
      // Apply speed multiplier to physics
      mesh.rotation.y += delta * speed;
    }
  });
  
  return <mesh ref={meshRef}>...</mesh>;
}
```

## Data Flow

### Request Flow

1. **User navigates slides** → Spectacle.js handles routing between slides via hashchange or programmatic navigation
2. **Slide content loads** → Each slide component mounts; if it contains Three.js/Matter.js, the simulation initializes on mount
3. **User interacts with simulations** → 
   - Three.js: mouse events, raycasting, GUI controls (dat.GUI)
   - Matter.js: body creation/removal, parameter changes via controls
4. **State updates** → Simulation state updates (direct object mutation, store updates)
5. **Re-render** → R3F re-renders the WebGL scene; Matter.js bodies positions updated via Engine.update()

### State Management

```
[Spectacle.js Slide Router]
          ↓
[Slide Component]
          ↓
[Simulation State (Zustand / React state)]
          ↓
[Three.js: useFrame render loop (direct mutation)]
          ↓
[Matter.js: Engine.update() called via requestAnimationFrame]
          ↓
[WebGL Canvas / 2D Renderer updates]
```

### Key Data Flows

1. **Slide Navigation Flow:** User clicks next/prev → Spectacle.js changes route → Slide components mount/unmount → Three.js/Matter.js initialize/cleanup accordingly

2. **Simulation Control Flow:** UI controls (sliders, buttons) update simulation state (Zustand store or React state) → `useFrame` or physics runner reads from state → renders next frame

3. **Data Consistency Flow:** `constants.jsx` provides shared ion data → Both Three.js and Matter.js visualizations reference the same data → Consistent He²⁺ representation across 3D and 2D

## Scalability Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users (academic project) | Monolith structure is fine — all simulations run in-browser |
| 1k-10k users (classroom deployment) | Consider code splitting per slide; lazy-load simulations only when slide is active |
| 10k+ users (public deployment) | Static serve via GitHub Pages; simulations are read-only, no server needed |

### Scaling Priorities

1. **First bottleneck:** Initial slide load time — simulations should lazy-initialize (only load Three.js/Matter.js when the slide is actively visible)
2. **Second bottleneck:** Memory leaks from improper Three.js/Matter.js cleanup on slide navigation — ensure `useEffect` cleanup and object disposal

## Anti-Patterns

### Anti-Pattern 1: Plain Three.js with useEffect Only

**What people do:** Use `useEffect` to create a Three.js renderer, scene, camera, and animation loop directly, without `react-three-fiber`.

**Why it's wrong:** 
- React re-renders the component, killing performance (animation loop fights React's virtual DOM diffing)
- No declarative composition — adding/removing objects requires manual scene graph management
- Cleanup on unmount is error-prone, causing memory leaks
- Harder to integrate with Spectacle.js slide lifecycle

**Do this instead:** Use `react-three-fiber` (`@react-three/fiber`) which provides a React reconciler for Three.js, enabling declarative JSX, proper lifecycle management, and seamless Spectacle.js integration.

### Anti-Pattern 2: Driving Simulations with useState

**What people do:** Use `useState` to drive per-frame animations (e.g., `setRotation(setRotation + 0.01)` in a `useEffect`).

**Why it's wrong:** 
- Forces React to re-render 60 times per second
- Makes the entire UI sluggish and unresponsive
- Wastes compute; React's reconciliation is unnecessary for per-frame animations

**Do this instead:** Use `useFrame` from `react-three-fiber` for direct Three.js object mutation, or `requestAnimationFrame` with `useRef` for Matter.js. State changes (play/pause, speed) should go through a separate store (Zustand) that doesn't trigger per-frame re-renders.

### Anti-Pattern 3: Shared Matter.js Engine Across All Slides

**What people do:** Create a single Matter.js engine at the app root and share it across all slides.

**Why it's wrong:** 
- When navigating away from a slide, the engine and its bodies persist
- Slide navigation (Spectacle.js) unmounts/re-mounts components — the engine needs to be created per-slide or properly cleaned up
- Physics state accumulates across slides, causing unexpected behavior

**Do this instead:** Create the Matter.js engine per-slide component using a custom hook (`useMatterEngine`) that handles creation and cleanup on mount/unmount. Or, if simulations need to persist, use a singleton pattern with explicit reset/cleanup on slide change.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | `npm run deploy` → gh CLI deploys to `gh-pages` branch | Project-specific deploy script |
| npm packages | `npm install three @react-three/fiber @react-three/drei matter-js` | Core dependencies |
| Bibliography data | Embedded JSON or CSV in `utils/` | Can be fetched externally later |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Slide ↔ Three.js component | Props (camera, gl context) | Slide passes simulation context down |
| Slide ↔ Matter.js component | Props (engine, world) | Slide passes physics context down |
| Three.js ↔ Matter.js | None (separate visualization layers) | Both visualize He²⁺ ion independently |
| UI controls ↔ Simulation | Zustand store / React state | Play/pause, speed controls |

## Sources

- React Three Fiber documentation (r3f.docs.pmrd.rs)
- @react-three/drei helper components
- Matter.js official documentation and examples
- Spectacle.js component API reference
- "Integrating Three.js into React Projects" — MoldStud (2026)
- Three.js + React state management best practices

---

**Architecture research for:** Detectors de Fumaça e a Descoberta do Núcleo Atômico  
**Researched:** 2026-08-31