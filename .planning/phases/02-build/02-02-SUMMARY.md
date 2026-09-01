---
phase: 02-build
plan: 02
subsystem: ui
tags: [react, spectacle, three, matter-js, tailwind, shadcn, vite, playwright]
requires:
  - phase: 02-build
    provides: "Phase 1 wave 1 slide deck, constants, App.jsx bare deck"
provides:
  - "Revista científica ilustrada Deck estilizado (#fefcf8/#0e4a7a/#c9a227) mantendo Spectacle orquestrador"
  - "Simulações 3D/2D sempre montadas via Tabs CSS (sem IntersectionObserver gate)"
  - "AtomicStructure3D com órbita contínua useFrame + labels + luzes revista"
  - "ParticleSimulation2D câmara de ionização interativa com Inserir Fumaça/drag/gauge"
  - "Build verde + Playwright E2E 3/3 (canvas >=2, no console errors)"
affects: [03-review, deploy, gh-pages]

tech-stack:
  added: ["tailwindcss@4.3.3", "@tailwindcss/vite@4.3.3", "clsx@2.1.1", "tailwind-merge@3.6.0", "@playwright/test@1.62.1"]
  patterns: ["shadcn cn() helper", "Tabs CSS visibility (no unmount) for Canvas/WebGL contexts", "useFrame orbital animation (no useState)", "Matter.js requestAnimationFrame + Engine.update sync", "revista tokens single-source via constants + @theme"]

key-files:
  created: ["src/lib/utils.js", "src/styles/tailwind.css", "src/components/ui/tabs.jsx", "src/components/ui/figure.jsx", "playwright.config.js", "tests/e2e/simulations.spec.js"]
  modified: ["package.json", "vite.config.js", "index.html", "src/index.jsx", "src/styles/slide-styles.css", "src/utils/constants.jsx", "src/components/Slide.jsx", "src/components/SimulationsIntegration.jsx", "src/components/AtomicStructure3D.jsx", "src/components/ParticleSimulation2D.jsx", "src/components/App.jsx", "src/components/ChemicalInfo.jsx", "src/components/References.jsx"]

key-decisions:
  - "Tailwind 4.3 via @tailwindcss/vite (CSS-first, sem tailwind.config.js) — Vite-first oficial, evita PostCSS manual"
  - "Tabs shadcn-style sem Radix — useState + hidden CSS mantém Canvas/WebGL vivos, evita dep extra"
  - "Remover completamente IntersectionObserver/mounted gate — root cause Spectacle display:none, tabs sempre montadas"
  - "useFrame + useRef para órbita (não useState) — evita 60 re-renders, muta ref diretamente"
  - "Matter.js com render:{visible:false} + draw loop manual — evita conflito com Three.js, sincroniza via requestAnimationFrame"
  - "Vite rollup input removido — entry via index.html corrige dist/index.html generation"

patterns-established:
  - "Revista tokens: bg #fefcf8, blue #0e4a7a, gold #c9a227, ink #1a2a3a via @theme e REVISTA_TOKENS"
  - "Slide.jsx wrapper interno (não estilizar Deck root) com header badge + title serif + ornament border"
  - "Figure com fallback gradient + figcaption border gold"
  - "Spawn limit MAX_BODIES 30 + World.clear no reset (T-02-03 mitigação)"

requirements-completed: [SLD-01, SLD-02, SLD-03, SLD-04, SLD-05, SLD-06, SLD-07, SLD-08, SLD-09, SIM-01, SIM-02]

coverage:
  - id: D1
    description: "Tailwind/shadcn setup com build verde"
    requirement: "SLD-01"
    verification:
      - kind: other
        ref: "npx vite build"
        status: pass
    human_judgment: false
  - id: D2
    description: "Slide.jsx revista wrapper + tokens + UI primitives"
    requirement: "SLD-01"
    verification:
      - kind: other
        ref: "grep revista-slide src/components/Slide.jsx"
        status: pass
    human_judgment: false
  - id: D3
    description: "Simulações sempre montadas via Tabs (sem IntersectionObserver)"
    requirement: "SIM-01"
    verification:
      - kind: other
        ref: "grep -c IntersectionObserver src/components/SimulationsIntegration.jsx == 0"
        status: pass
      - kind: e2e
        ref: "tests/e2e/simulations.spec.js#simulacoes visiveis"
        status: pass
    human_judgment: false
  - id: D4
    description: "AtomicStructure3D órbita contínua com useFrame"
    requirement: "SIM-01"
    verification:
      - kind: other
        ref: "grep useFrame src/components/AtomicStructure3D.jsx"
        status: pass
      - kind: e2e
        ref: "tests/e2e/simulations.spec.js#simulacoes visiveis"
        status: pass
    human_judgment: false
  - id: D5
    description: "ParticleSimulation2D câmara interativa com Inserir Fumaça/drag/gauge"
    requirement: "SIM-02"
    verification:
      - kind: other
        ref: "grep spawnSmoke src/components/ParticleSimulation2D.jsx"
        status: pass
      - kind: e2e
        ref: "tests/e2e/simulations.spec.js#simulacoes visiveis"
        status: pass
    human_judgment: false
  - id: D6
    description: "App.jsx revista ilustrada com Figure fotos e SLD-01..09 cobertos"
    requirement: "SLD-04"
    verification:
      - kind: other
        ref: "grep Figure src/components/App.jsx"
        status: pass
    human_judgment: true
    rationale: "Qualidade visual revista + fotos reais requer julgamento humano — verificar fundo #fefcf8, headings #0e4a7a, acentos #c9a227 e legendas"
  - id: D7
    description: "Build + Playwright 3/3 (build, canvas >=2, no console errors)"
    requirement: "SLD-09"
    verification:
      - kind: e2e
        ref: "tests/e2e/simulations.spec.js"
        status: pass
    human_judgment: false

duration: 28min
completed: 2026-09-01
status: complete
---

# Phase 02 Plan 02: Wave 2 Build Fix — Revista + Simulações Visíveis Summary

**Deck revista científica ilustrada com simulações 3D/2D sempre visíveis via Tabs, órbita useFrame contínua e câmara de ionização interativa — build + Playwright 3/3 verdes**

## Performance

- **Duration:** 28 min
- **Started:** 2026-09-01T23:02:00Z
- **Completed:** 2026-09-01T23:30:33Z
- **Tasks:** 7
- **Files modified:** 16

## Accomplishments

- Simulações 3D e 2D visíveis imediatamente — IntersectionObserver gate removido, Tabs 3D|2D sempre montadas via CSS hidden (WebGL contextos preservados)
- AtomicStructure3D com órbita contínua via useFrame (clock.elapsedTime, sem useState) — 2 elétrons em fases opostas, luzes revista, labels He²⁺/e⁻/Núcleo
- ParticleSimulation2D câmara de ionização interativa — Inserir Fumaça, drag via MouseConstraint, gauge Corrente µA + Alarme ON/OFF, limite 30 bodies
- Visual revista científica ilustrada em todos os slides — tokens #fefcf8/#0e4a7a/#c9a227, tipografia Fraunces+Inter, Slide wrapper com ornament
- Fotos reais com Figure + legenda em 4 slides (detector, He, Rutherford, He²⁺ núcleo) com fallback gradient
- Dependências bumped — tailwindcss 4.3.3 + @tailwindcss/vite 4.3.3 + clsx + tailwind-merge, @playwright/test; vite build + Playwright verdes

## Task Commits

Each task was committed atomically:

1. **Task 1: Dependency update + Tailwind/shadcn setup** - `1708642` (feat)
2. **Task 2: Slide.jsx revista wrapper + theme tokens + UI primitives** - `cef9171` (feat)
3. **Task 3: SimulationsIntegration tabs fix — remover IntersectionObserver gate** - `4550ab1` (feat)
4. **Task 4: AtomicStructure3D — órbita contínua + labels + luzes revista** - `293dd60` (feat)
5. **Task 5: ParticleSimulation2D — câmara de ionização interativa** - `aff8bfe` (feat)
6. **Task 6: App.jsx + content slides — revista ilustrada com Figure/fotos** - `8f8c31d` (feat)
7. **Task 7: Build + Playwright verification (canvas count, console errors)** - `c067055` (feat)

**Plan metadata:** `pending` (docs: complete plan)

## Files Created/Modified

- `src/lib/utils.js` - cn() helper clsx+twMerge (shadcn)
- `src/styles/tailwind.css` - @import tailwindcss + @theme revista tokens + components
- `src/components/ui/tabs.jsx` - Tabs primitive com CSS visibility (no unmount)
- `src/components/ui/figure.jsx` - Figure com fallback e figcaption revista
- `src/components/Slide.jsx` - Wrapper revista com badge, title serif, border gold, footer
- `src/components/SimulationsIntegration.jsx` - Tabs 3D|2D sempre montadas, WebGL check melhorado
- `src/components/AtomicStructure3D.jsx` - useFrame órbita, Nucleus gold, labels, luzes
- `src/components/ParticleSimulation2D.jsx` - Câmara com walls/eletrodos, spawnSmoke, MouseConstraint, gauge
- `src/components/App.jsx` - 8 slides enriquecidos com Figure, ChemicalInfo, References, Simulações
- `src/components/ChemicalInfo.jsx` - Cards revista com Z badge e config
- `src/components/References.jsx` - Lista hanging indent + QR placeholder
- `src/utils/constants.jsx` - REVISTA_TOKENS adicionados
- `vite.config.js` - tailwindcss() plugin + remove rollup input fix
- `src/index.jsx` - import tailwind.css
- `index.html` - Google Fonts Fraunces+Inter, title atualizado
- `src/styles/slide-styles.css` - Compat layer thin
- `playwright.config.js` - webServer base /detectores-fumaca/
- `tests/e2e/simulations.spec.js` - 3 testes E2E
- `package.json` - deps bump + test:e2e script

## Decisions Made

- Tailwind 4.3 via @tailwindcss/vite sem tailwind.config.js — caminho oficial Vite-first, evita PostCSS manual
- Tabs sem Radix — evita dep extra, CSS hidden mantém Canvas vivos
- Remover IntersectionObserver completamente — root cause confirmado Spectacle display:none bloqueia threshold
- useFrame+useRef para animação — evita 60 re-renders, validado em RESEARCH anti-pattern #2
- Matter.js render visible:false + draw manual — evita conflito Three/WebGL, sincroniza Engine.update 60fps
- Vite input removido — corrige dist/index.html não gerado

## Deviations from Plan

None - plan executed exactly as written. Ajuste menor: tailwindcss 4.3.3 (latest) em vez de 4.1.x — compatível, mais recente dentro do major 4. Vite rollup input removido conforme previsto no plano ("remover se conflitar").

## Issues Encountered

- Vite build inicial não gerava dist/index.html devido a rollupOptions input="./src/index.jsx" — removido input, build passou com index.html 0.88kB
- Playwright install --with-deps falhou por falta de sudo — fallback para npx playwright install chromium (sem deps) funcionou
- Teste build passes inicial falhou por dist ausente (mesmo motivo input) — corrigido após vite.config fix, 3/3 passaram

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Wave 2 Build completo — simulações visíveis, revista aplicada, build e E2E verdes
- Pronto para deploy GitHub Pages (SLD-09 parcial — build verificado, push pendente)
- Pronto para Phase 3 Review — validação visual humana recomendada para tokens e fotos

---
*Phase: 02-build*
*Completed: 2026-09-01*

## Self-Check: PASSED
