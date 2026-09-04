# Phase 03: Review & Deploy — Pattern Map

**Mapped:** 2026-09-01
**Files analyzed:** 11 (8 modified, 3 verification/config)
**Analogs found:** 11 / 11

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/components/App.jsx` | component (Deck orchestrator) | request-response (static render, Spectacle navigation) | `src/components/App.jsx` (self) / `src/components/Slide.jsx` | exact |
| `src/utils/constants.jsx` | config/constants | transform (static data → UI) | `src/utils/constants.jsx` (self) | exact |
| `src/components/ui/figure.jsx` | component (UI primitive) | file I/O (image load → fallback) + request-response | `src/components/ui/figure.jsx` (self, gradient fallback) | exact |
| `tests/e2e/simulations.spec.js` | test (E2E) | event-driven (Playwright page events + timers) | `tests/e2e/simulations.spec.js` (self, 3 tests existing) | exact |
| `playwright.config.js` | config | event-driven (webServer lifecycle) | `playwright.config.js` (self) | exact |
| `vite.config.js` | config | transform (build → dist) | `vite.config.js` (self) | exact |
| `package.json` | config | static (homepage + scripts) | `package.json` (self) | exact |
| `src/components/SimulationsIntegration.jsx` | component (integration) | event-driven (Tabs state + WebGL lifecycle) | `src/components/SimulationsIntegration.jsx` (self) + `src/components/ui/tabs.jsx` | exact |
| `src/components/AtomicStructure3D.jsx` | component (3D simulation) | streaming (useFrame 60fps → Canvas/WebGL) | `src/components/AtomicStructure3D.jsx` (self) | exact |
| `src/components/ParticleSimulation2D.jsx` | component (2D simulation) | streaming (rAF + Matter.Engine.update 60fps) | `src/components/ParticleSimulation2D.jsx` (self) | exact |
| `src/styles/tailwind.css` + `src/lib/utils.js` | config/utility | transform (tokens + cn helper) | `src/styles/tailwind.css` / `src/lib/utils.js` (self) | exact |

> All Phase 3 work is **review/polish/deploy** — no greenfield roles. Every file's closest analog is itself. Pattern extraction below focuses on "what to copy/extend" for the planner's task slices. No analog search beyond self was needed because the codebase is self-contained (11 source files total).

## Pattern Assignments

### `src/components/App.jsx` (component, request-response)

**Analog:** `src/components/App.jsx` (self) + `src/components/Slide.jsx`

**Imports pattern** (lines 1-6):
```jsx
import { Deck } from "spectacle";
import { Slide } from "./Slide";
import { ChemicalInfo } from "./ChemicalInfo";
import { References } from "./References";
import { SimulationsIntegration } from "./SimulationsIntegration";
import { Figure } from "./ui/figure";
```

**Deck + Slide composition pattern** (lines 8-12, 155-181):
```jsx
// App.jsx lines 8-12: root wrapper + Deck theme uses revista tokens directly
const App = () => {
  return (
    <div className="min-h-screen bg-[#fefcf8]">
      <Deck theme={{ colors: { primary: "#fefcf8", secondary: "#0e4a7a", tertiary: "#c9a227" } }}>

// Lines 13-39: Slide with kicker + title + Figure pattern (D-07 polish scope = all slides)
<Slide title="Detectores de Fumaça e a Descoberta do Núcleo Atômico" kicker="Química Geral • Revista Científica Ilustrada">
  <Figure src="https://upload.wikimedia.org/..." alt="..." caption="..." credit="..." aspect="16/9" />
</Slide>
```

**D-05 Autoria edit pattern** (lines 155-172 — the exact lines to change):
```jsx
// CURRENT (lines 160-163) — must be replaced per D-05:
<p className="font-display text-2xl font-bold text-[#0e4a7a]">Estudante</p>
<p className="text-sm text-[#1a2a3a]/60 mt-1">Turma: Química Geral</p>
<p className="text-sm text-[#1a2a3a]/60">Disciplina: Química Geral • Professor(a)</p>
// TARGET: planner must change to:
<p className="font-display text-2xl font-bold text-[#0e4a7a]">Miguel Pandini Bett</p>
<p className="text-sm text-[#1a2a3a]/60 mt-1">1 ano ensino médio</p>
// Also keep 3rd line or adjust — verify no residual "Estudante" string remains
// Verification: grep -r "Estudante" src/ must return 0; grep -r "Miguel Pandini Bett" src/ must return 2
```

**Slide wrapper analog** (`src/components/Slide.jsx` lines 3-36):
```jsx
// Slide.jsx lines 3-8: SpectacleSlide → revista-slide wrapper — new content must go inside {children}
export const Slide = ({ title, kicker, children, ...props }) => {
  return (
    <SpectacleSlide title={title} speakerNotes={props.speakerNotes} {...props}>
      <div className="revista-slide min-h-full bg-[#fefcf8] text-[#1a2a3a] flex flex-col">
        <div className="revista-content max-w-5xl mx-auto px-8 py-6 w-full flex-1 flex flex-col">
```

**Error handling / graceful degradation:**
No try/catch in App.jsx — D-04 "Avisa e deploya" means Figure failures degrade via fallback, not via error boundary. Do not add blocking error guards to Deck navigation.

---

### `src/utils/constants.jsx` (config/constants, transform)

**Analog:** `src/utils/constants.jsx` (self, 39 lines)

**Imports pattern** (no imports — pure constants file, no barrel):
```jsx
// constants.jsx lines 1-12: ION_PROPERTIES single-source of truth for D-03 chemistry accuracy
export const ION_PROPERTIES = {
  symbol: "He²⁺",
  name: "Hélio duplamente ionizado",
  atomicNumber: 2,
  massNumber: 4,
  protons: 2,
  neutrons: 2,
  electrons: 0,
  charge: +2,
  electronConfiguration: "1s⁰ (empty shell — 2 electrons removed)",
  elementName: "Hélio",
};
```

**REVISTA_TOKENS pattern** (lines 26-31 — single-source with tailwind.css @theme):
```jsx
export const REVISTA_TOKENS = {
  bg: "#fefcf8",
  blue: "#0e4a7a",
  gold: "#c9a227",
  ink: "#1a2a3a",
};
```

**D-05 SLIDE_CONFIG edit pattern** (lines 33-39 — second file to change for autoria):
```jsx
// CURRENT lines 33-39:
export const SLIDE_CONFIG = {
  title: "Detectores de Fumaça e a Descoberta do Núcleo Atômico",
  theme: "átomo de Hélio",
  presenter: "Estudante",      // → "Miguel Pandini Bett"
  turma: "Química Geral",      // → "1 ano ensino médio"
  revista: REVISTA_TOKENS,
};
// TARGET:
  presenter: "Miguel Pandini Bett",
  turma: "1 ano ensino médio",
```

**Validation pattern for D-03** (consume via ChemicalInfo.jsx lines 1-5):
```jsx
// ChemicalInfo.jsx shows how constants are consumed — D-03 requires visible text matches constants
import { ION_PROPERTIES, CHEMICAL_INFO } from "../utils/constants";
const ion = ION_PROPERTIES; // renders Z={ion.atomicNumber}, charge +{ion.charge}, 1s⁰ etc.
// Planner must grep cross-check: visible "Z=2", "He²⁺", "1s⁰", "+2" in App.jsx match these constants
```

---

### `src/components/ui/figure.jsx` (component, file I/O + request-response)

**Analog:** `src/components/ui/figure.jsx` (self, 41 lines) — current gradient fallback is **insufficient per D-06**

**Current imports + state pattern** (lines 1-5):
```jsx
import { useState } from "react";

export function Figure({ src, alt, caption, credit, aspect = "4/3", className = "", ...props }) {
  const [error, setError] = useState(false);
  const showFallback = !src || error;
```

**Current fallback pattern** (lines 13-20 — gradient + ◈, to be REPLACED per D-06):
```jsx
// LINES 13-20 CURRENT — insufficient, planner must replace with SVG diagrama
{showFallback ? (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0e4a7a]/10 via-[#fefcf8] to-[#c9a227]/15 p-6 text-center">
    <div className="text-3xl mb-2 opacity-40">◈</div>
    <p className="text-xs tracking-widest uppercase text-[#0e4a7a]/50 font-semibold">Ilustração — He²⁺</p>
    <p className="text-[11px] text-[#1a2a3a]/40 mt-1 max-w-[28ch]">{alt || "Imagem ilustrativa"}</p>
  </div>
) : (
```

**Target SVG fallback pattern** (from RESEARCH.md Pattern 3 — copy this into figure.jsx):
```jsx
// New HeliumDiagramSVG sub-component to add BEFORE Figure export:
function HeliumDiagramSVG({ aspect }) {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" role="img" aria-label="Diagrama He²⁺">
      <circle cx="100" cy="60" r="18" fill="#c9a227" stroke="#0e4a7a" strokeWidth="2" />
      <circle cx="93" cy="56" r="6" fill="#ff6b6b" />
      <circle cx="107" cy="64" r="6" fill="#ff6b6b" />
      <text x="100" y="88" textAnchor="middle" fontSize="7" fill="#0e4a7a" fontWeight="700">He²⁺  Z=2  +2</text>
      <text x="100" y="98" textAnchor="middle" fontSize="6" fill="#1a2a3a" opacity="0.6">1s⁰ — sem elétrons</text>
      <ellipse cx="100" cy="60" rx="42" ry="42" fill="none" stroke="#0e4a7a" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.25" />
    </svg>
  );
}
// Then replace fallback div content:
{showFallback ? (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fefcf8] p-4">
    <HeliumDiagramSVG aspect={aspect} />
    <p className="text-[11px] text-[#1a2a3a]/40 mt-1 max-w-[28ch] text-center">{alt || "Ilustração He²⁺"}</p>
  </div>
) : (
```

**Critical preservation rules for Figure edit:**
- Keep `style={{ aspectRatio: aspect }}` on wrapper div (line 12) — do not remove or SVG distorts
- Keep `onError={() => setError(true)}` on `<img>` (line 27) — do not add retry loop
- SVG inline never triggers onError loop (not an `<img>`), so no guard needed vs current gradient
- Keep `role="img"` + `aria-label` on SVG for a11y (D-06 pitfall #5)
- Keep figcaption pattern (lines 31-36): `border-t border-[#c9a227]/10` + credit italic

---

### `tests/e2e/simulations.spec.js` (test, event-driven)

**Analog:** `tests/e2e/simulations.spec.js` (77 lines, 3 tests) + `playwright.config.js` (16 lines)

**Current imports + build test pattern** (lines 1-11):
```jsx
import { test, expect } from "@playwright/test";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

test("build passes", async () => {
  execSync("npx vite build", { stdio: "pipe" });
  const distExists = fs.existsSync(path.resolve("dist/index.html"));
  expect(distExists).toBe(true);
});
```

**Current canvas count pattern** (lines 13-48 — D-15 hardening needed):
```jsx
// CURRENT lines 32-47: counts >=2 but does NOT distinguish hidden vs visible — needs tightening for D-15
const canvasCount = await page.evaluate(() => document.querySelectorAll("canvas").length);
expect(canvasCount).toBeGreaterThanOrEqual(2); // ← D-15 requires exactly 2 fixos, change to .toBe(2)
const allCanvases = await page.evaluate(() => {
  const canvases = document.querySelectorAll("canvas");
  return Array.from(canvases).map((c) => ({
    w: c.getBoundingClientRect().width,
    h: c.getBoundingClientRect().height,
    visible: c.offsetParent !== null,
  }));
});
// MISSING for D-15: hidden/attached assertions — planner must add:
const tabs = page.locator('[role="tabpanel"]');
await expect(tabs).toHaveCount(2);
await expect(page.locator('[role="tabpanel"]:not([hidden]) canvas')).toBeVisible();
await expect(page.locator('[role="tabpanel"][hidden] canvas')).toBeAttached();
await expect(page.locator('[role="tabpanel"][hidden] canvas')).toBeHidden();
```

**Current console error pattern** (lines 50-77 — D-14 hardening needed):
```jsx
// CURRENT lines 50-62: only captures type === 'error', ignores warnings — D-14 fails without fix
page.on("pageerror", (err) => pageErrors.push(err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") {
    const text = msg.text();
    if (text.includes("WebGL") && text.includes("not available")) return;
    consoleErrors.push(text);
  }
});
// TARGET per RESEARCH.md Code Examples — collect AND assert after navigation, do NOT throw in callback:
const consoleWarnings = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
  if (msg.type() === "warning") consoleWarnings.push(msg.text()); // D-14: msg.type() is 'warning' not 'warn'
});
// After navigation + waits:
const allowedWarningPatterns = [/Download the React DevTools/];
const criticalWarnings = consoleWarnings.filter((w) => !allowedWarningPatterns.some((re) => re.test(w)));
expect(pageErrors, `pageerror: ${pageErrors.join("; ")}`).toEqual([]);
expect(consoleErrors.filter((m) => !m.includes("Download the React DevTools")),
  `console.error: ${consoleErrors.join("; ")}`).toEqual([]);
expect(criticalWarnings, `console.warning: ${criticalWarnings.join("; ")}`).toEqual([]);
```

**D-02 auto-play test to ADD** (no analog in existing file — use RESEARCH.md pattern):
```jsx
// Auto-play total: screenshot diff or position polling — planner must add new test
test("auto-play total — both simulations animate without click D-02", async ({ page }) => {
  await page.goto("/");
  for (let i = 0; i < 7; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(400); }
  await page.waitForTimeout(1200);
  // 2D chamber: current value must change over time (Matter intervals) — poll via evaluate
  const before = await page.evaluate(() => document.body.innerHTML.includes("µA") ? document.querySelector("span.font-bold")?.textContent : "");
  await page.waitForTimeout(1000);
  // Or screenshot diff: take 2 screenshots with delay, compare bytes not equal
  // For 3D: useFrame moves electron — snapshot canvas before/after and assert pixel diff
});
```

**D-06 Figure fallback test to ADD:**
```jsx
test("Figure SVG fallback when src fails D-06", async ({ page }) => {
  await page.goto("/");
  // Force error: evaluate to set img src to invalid, or mount Figure with bad src
  // Assert HeliumDiagramSVG visible: svg[aria-label="Diagrama He²⁺"] toBeVisible()
  // Assert fallback wrapper has bg-[#fefcf8] and text He²⁺ Z=2
});
```

**D-16 report pattern to ADD** (screenshot + logs):
```jsx
// From RESEARCH.md lines 418-429:
import fs from "fs";
test("report — screenshot + logs D-16", async ({ page }, testInfo) => {
  const logs = [];
  page.on("console", (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
  await page.goto("/");
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "test-results/deck-screenshot.png", fullPage: true });
  await testInfo.attach("deck-screenshot", { path: "test-results/deck-screenshot.png", contentType: "image/png" });
  await testInfo.attach("console-log", { body: logs.join("\n"), contentType: "text/plain" });
});
```

**Playwright config analog** (`playwright.config.js` lines 3-15):
```js
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  webServer: {
    command: "npx vite --port 4173 --strictPort",
    url: "http://localhost:4173/detectores-fumaca/",
    reuseExistingServer: false,
    timeout: 120000,
  },
  use: { baseURL: "http://localhost:4173/detectores-fumaca/" },
  timeout: 30000,
  reporter: "list",
});
// Planner note: do NOT change baseURL or webServer url — must include /detectores-fumaca/ per D-10/D-13
// If planner adds a new test file (e.g., polish.spec.js), it auto-picks up this config
```

---

### `vite.config.js` (config, transform)

**Analog:** `vite.config.js` (26 lines)

**Config pattern** (lines 1-26 — D-10 verification anchors to `base`):
```js
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/detectores-fumaca/", // ← D-10: must remain exactly this string, planner must grep for it
  resolve: {
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  optimizeDeps: { include: ["react", "react-dom", "@react-three/fiber", "@react-three/drei"] },
  build: { rollupOptions: { external: ["react-native", "expo-gl", "expo-asset"] } },
});
```

**D-10 verification commands** (copy into plan, not into vite.config.js):
```bash
npx vite build
grep -q 'src="/detectores-fumaca/assets/' dist/index.html && echo "base OK" || (echo "ERRO: dist/index.html sem base /detectores-fumaca/"; exit 1)
grep -q 'href="/detectores-fumaca/assets/' dist/index.html && echo "css base OK"
grep -q "detectores-fumaca" vite.config.js package.json dist/index.html  # all 3 must align per pitfall #6
```

---

### `package.json` (config, static)

**Analog:** `package.json` (35 lines)

**Deploy script pattern** (lines 6-12):
```json
"homepage": "https://miguel.github.io/detectores-fumaca",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "vite build && npx gh-pages -d dist",
  "test:e2e": "playwright test"
}
```

**D-09/D-11/D-12 gh-pages pattern** (from RESEARCH.md):
```bash
# Planner must include D-12 failure handling — do NOT mark phase blocked on push fail:
npx gh-pages -d dist 2>&1 | tee gh-pages.log
if [ ${PIPESTATUS[0]} -ne 0 ]; then
  echo "gh-pages falhou — verifique: git remote -v, gh auth status, permissões do repo"
  cat gh-pages.log
  echo "Fase não bloqueada por D-12 — retry manual: git remote add origin <url> && npx gh-pages -d dist"
fi
# Note: git remote -v currently empty (verified pitfall #1) — planner must add task to check/create remote before deploy
```

---

### `src/components/SimulationsIntegration.jsx` (component, event-driven)

**Analog:** `src/components/SimulationsIntegration.jsx` (81 lines) + `src/components/ui/tabs.jsx` (73 lines)

**WebGL guard pattern** (lines 9-32 — preserve, do NOT modify):
```jsx
const [webglAvailable, setWebglAvailable] = useState(true);
useEffect(() => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setWebglAvailable(!!gl || !!window.WebGLRenderingContext);
  } catch { setWebglAvailable(false); }
}, []);
if (!webglAvailable) { return <div className="rounded-xl border ...">Simulações ... WebGL...</div>; }
// D-04 graceful degradation: return static description when WebGL unavailable
```

**Tabs always-mounted pattern** (lines 48-73 — critical for D-15):
```jsx
<Tabs defaultValue="3d" className="w-full">
  <TabsList>
    <TabsTrigger value="3d">Visão 3D — Estrutura Atômica</TabsTrigger>
    <TabsTrigger value="2d">Visão 2D — Câmara de Ionização</TabsTrigger>
  </TabsList>
  <TabsContent value="3d">
    <div className="h-[420px] bg-white rounded-xl border border-[#c9a227]/20 overflow-hidden">
      <AtomicStructure3D />
    </div>
  </TabsContent>
  <TabsContent value="2d">
    <div className="h-[420px] bg-white rounded-xl border border-[#c9a227]/20 overflow-hidden flex flex-col">
      <ParticleSimulation2D />
    </div>
  </TabsContent>
</Tabs>
// Planner: NEVER reintroduce IntersectionObserver gate here (was root cause in Phase 2)
// NEVER change to {active && <Component/>} — would destroy WebGL context
```

**TabsContent hidden CSS analog** (`src/components/ui/tabs.jsx` lines 60-73):
```jsx
export function TabsContent({ value, children, className, ...props }) {
  const ctx = useContext(TabsContext);
  const active = ctx?.value === value;
  return (
    <div role="tabpanel" hidden={!active} className={cn(active ? "block" : "hidden", className)} {...props}>
      {children}
    </div>
  );
}
// hidden attribute + cn("block"/"hidden") keeps both canvases in DOM — D-15 requires this
```

---

### `src/components/AtomicStructure3D.jsx` (component, streaming)

**Analog:** `src/components/AtomicStructure3D.jsx` (116 lines)

**useFrame auto-play pattern** (lines 46-64 — D-02, copy exactly):
```jsx
function ElectronOrbitAnimado({ radius, speed, phase, color = "#4fc3f7" }) {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });
  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[0.1, 16, 16]} /></mesh>
    </group>
  );
}
// ANTI-PATTERN: never use useState for position in useFrame — would cause 60 re-renders/s
// CORRECT: useRef + direct mutation, as above
```

**Canvas pattern** (lines 100-114):
```jsx
export const AtomicStructure3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3.2], fov: 55 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}
      className="w-full h-full" style={{ background: "transparent" }}>
      <color attach="background" args={["#fefcf8"]} />
      <OrbitControls enableZoom enablePan={false} minDistance={1.5} maxDistance={6} rotateSpeed={0.5} />
      <Scene />
    </Canvas>
  );
};
```

---

### `src/components/ParticleSimulation2D.jsx` (component, streaming)

**Analog:** `src/components/ParticleSimulation2D.jsx` (408 lines)

**Auto-play intervals + rAF pattern** (lines 125-127, 277 — D-02, preserve):
```jsx
// Lines 125-127: intervals start on mount, no paused gate — D-02 auto-play total
const ionInterval = setInterval(spawnIonPair, 900);
const alphaInterval = setInterval(spawnAlpha, 1400);
// Line 277: rAF draw loop with Matter.Engine.update
animRef.current = requestAnimationFrame(draw);
// draw() line 142: Matter.Engine.update(engine, 1000 / 60) runs at 60fps
```

**Spawn + manual draw pattern** (lines 84-119, 181-275):
```jsx
// spawnIonPair lines 84-107: creates Matter bodies + setVelocity (drift toward electrodes)
const spawnIonPair = () => {
  if (!alphaOn) return;
  if (world.bodies.length > MAX_BODIES + 10) return;
  const ion = Matter.Bodies.circle(x, y, 5, { label: "ion", mass: 0.2, frictionAir: 0.03, restitution: 0.6 });
  // ...
  Matter.Body.setVelocity(ion, { x: -0.6 - Math.random() * 0.6, y: (Math.random() - 0.5) * 0.8 });
};
// Manual draw loop lines 181-275: ctx.clearRect → chamber → world.bodies.forEach draw — render:{visible:false}
```

**Cleanup pattern** (lines 293-302 — planner must not break):
```jsx
return () => {
  running = false;
  clearInterval(ionInterval);
  clearInterval(alphaInterval);
  clearTimeout(resizeTimeout);
  window.removeEventListener("resize", resizeHandler);
  if (animRef.current) cancelAnimationFrame(animRef.current);
  Matter.World.clear(world, false);
  Matter.Engine.clear(engine);
};
```

---

## Shared Patterns

### Revista Tokens — Single-Source Color System
**Source:** `src/styles/tailwind.css` lines 3-9 + `src/utils/constants.jsx` lines 26-31
**Apply to:** All component files (App.jsx, Slide.jsx, ChemicalInfo.jsx, figure.jsx, tabs.jsx, AtomicStructure3D.jsx, ParticleSimulation2D.jsx, SimulationsIntegration.jsx)

```css
/* tailwind.css lines 3-9 — @theme is the CSS single-source */
@theme {
  --color-revista-bg: #fefcf8;
  --color-revista-blue: #0e4a7a;
  --color-revista-gold: #c9a227;
  --color-revista-ink: #1a2a3a;
  --font-display: "Fraunces", "DM Serif Display", serif;
  --font-body: "Inter", "DM Sans", sans-serif;
}
```

```jsx
// constants.jsx lines 26-31 — JS mirror for runtime use
export const REVISTA_TOKENS = {
  bg: "#fefcf8",
  blue: "#0e4a7a",
  gold: "#c9a227",
  ink: "#1a2a3a",
};
```

**Usage pattern in components** (hardcoded hex, not CSS variables — copy this convention):
```jsx
// Throughout codebase: bg-[#fefcf8], text-[#0e4a7a], border-[#c9a227]/20, text-[#1a2a3a]/60
// E.g., Slide.jsx line 21: className="revista-slide min-h-full bg-[#fefcf8] text-[#1a2a3a]"
// AtomicStructure3D.jsx line 109: <color attach="background" args={["#fefcf8"]} />
// ParticleSimulation2D.jsx line 182: ctx.fillStyle = "#fefcf8";
// Planner: D-07 revisão completa must grep for token consistency, not introduce new colors
```

### cn() Helper — Conditional Classes
**Source:** `src/lib/utils.js` lines 1-6
**Apply to:** All UI component files (tabs.jsx, future polished components)

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

```jsx
// Usage in tabs.jsx lines 46-52: cn(active ? "bg-[#c9a227]..." : "text-white/80...", className)
import { cn } from "../../lib/utils";
// For any new conditional revista classes in polish tasks, use cn() not template strings
```

### Tabs Always-Mounted — WebGL Preservation
**Source:** `src/components/ui/tabs.jsx` lines 60-73 + `src/components/SimulationsIntegration.jsx` lines 48-73
**Apply to:** Any new tabbed verification UI or future tab usage

```jsx
// TabsContent uses hidden attribute + conditional class — NEVER unmount WebGL
<div role="tabpanel" hidden={!active} className={cn(active ? "block" : "hidden", className)}>
  {children}
</div>
// Verification: page.evaluate(() => document.querySelectorAll("canvas").length) === 2
// + toBeAttached() for hidden, toBeVisible() for active
```

### WebGL Fallback — Graceful Degradation
**Source:** `src/components/SimulationsIntegration.jsx` lines 9-32
**Apply to:** Figure fallback (similar pattern, applied to image failure)

```jsx
// Pattern: try canvas.getContext, fallback to static content — D-04 "avisa e deploya"
const [webglAvailable, setWebglAvailable] = useState(true);
useEffect(() => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    setWebglAvailable(!!gl || !!window.WebGLRenderingContext);
  } catch { setWebglAvailable(false); }
}, []);
if (!webglAvailable) return <div>...static fallback...</div>;
```

### Playwright Console Capture — No Throw in Callback
**Source:** `tests/e2e/simulations.spec.js` lines 50-77 (anti-pattern to fix) + RESEARCH.md Code Examples
**Apply to:** All E2E tests (simulations.spec.js hardening)

```jsx
// DO NOT throw inside page.on('console') — Playwright #29214 anti-pattern
// DO: collect into arrays, assert after navigation
const consoleErrors = [];
const consoleWarnings = [];
const pageErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
  if (msg.type() === "warning") consoleWarnings.push(msg.text()); // note: 'warning' not 'warn'
});
page.on("pageerror", (err) => pageErrors.push(err.message));
await page.goto("/");
// ... navigate slides ...
expect(pageErrors).toEqual([]);
expect(consoleErrors.filter(m => !m.includes("Download the React DevTools"))).toEqual([]);
```

### Build → Verify → Deploy Pipeline
**Source:** `vite.config.js` + `package.json` scripts + `playwright.config.js` + RESEARCH.md Architecture Diagram
**Apply to:** All deploy-related tasks

```bash
# Wave 1: verify (D-10, D-03, D-05) before deploy
npx vite build
grep -q 'src="/detectores-fumaca/assets/' dist/index.html && echo "base OK"
grep -q 'href="/detectores-fumaca/assets/' dist/index.html && echo "css base OK"
grep -r "Estudante" src/ && echo "FAIL: autoria not updated" || echo "autoria OK"
grep -r "Miguel Pandini Bett" src/ | wc -l  # must be 2
grep -n "Z=2\|1s⁰\|He²⁺" src/components/App.jsx src/utils/constants.jsx  # D-03 cross-check

# Wave 2: deploy (D-09, D-11, D-12)
npx gh-pages -d dist 2>&1 | tee gh-pages.log
# Check: git branch -a | grep gh-pages

# Validation local: D-13
npx playwright test --reporter=list  # webServer auto-starts vite --port 4173
# D-16: screenshot artifact at test-results/deck-screenshot.png + build log + console log
```

---

## No Analog Found

Files with no close match in the codebase (planner should use RESEARCH.md patterns instead):

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| *(none)* | — | — | Phase 3 is pure review/polish/deploy — every file to modify already exists in the codebase. For truly greenfield artifacts (e.g., `test-results/deck-screenshot.png`, `gh-pages.log`, deploy report), use RESEARCH.md Code Examples (Playwright screenshot + gh-pages log patterns) rather than codebase analogs. |

**Greenfield test helpers** (if planner creates `tests/e2e/polish.spec.js` optional):
- No existing polish.spec.js exists — closest analog is `tests/e2e/simulations.spec.js` structure (Playwright test with evaluate + expect)
- For shell-based polish checks (grep for autoria/tokens/chemistry), analog is the `grep` validation commands in RESEARCH.md § Validation Architecture, not a code file

---

## Metadata

**Analog search scope:** `src/components/` (App.jsx, Slide.jsx, ChemicalInfo.jsx, References.jsx, SimulationsIntegration.jsx, AtomicStructure3D.jsx, ParticleSimulation2D.jsx, ui/tabs.jsx, ui/figure.jsx), `src/utils/constants.jsx`, `src/styles/tailwind.css`, `src/lib/utils.js`, `tests/e2e/simulations.spec.js`, `playwright.config.js`, `vite.config.js`, `package.json`, `dist/index.html` check
**Files scanned:** 14 (11 source/config + 3 reference docs)
**Pattern extraction date:** 2026-09-01
**Phase directory:** `.planning/phases/03-review-deploy`

**Key cross-cutting decisions for planner:**
- D-02 auto-play total: planner must NOT add `paused` gate, IntersectionObserver, or click-to-play; verify existing useFrame + setInterval already satisfy — add test to prove it
- D-04 avisa e deploya: Figure fallback and WebGL fallback are degradation — do not block deploy on minor visual slip
- D-06 SVG fallback: most complex code change — planner should slice as standalone task before deploy tasks
- D-10 base verification: is a gate between build and gh-pages — planner must sequence build → grep → deploy
- D-12 gh-pages failure: planner must handle missing `origin` remote with guidance, not failure — see pitfall #1 in RESEARCH.md
- D-14 warnings: `msg.type() === 'warning'` (not `'warn'`) — easy to miss, explicit in this doc
- D-15 exactly 2 canvases: planner must change existing `>=2` to `===2` + add hidden/attached assertions

