# Phase 3: Review & Deploy - Context

**Gathered:** 2026-09-01
**Status:** Ready for planning

## Phase Boundary

Phase 3 delivers the final review and deployment of the educational slide deck. Wave 1 validates that all slides render correctly, simulations (3D Three.js + 2D Matter.js) are interactive and accurate, chemistry content (He²⁺ Z=2, charge +2, 1s⁰) is correct, and polish is applied. Wave 2 builds the production bundle and publishes to GitHub Pages at `https://miguel.github.io/detectores-fumaca/` with base `/detectores-fumaca/`. No new content capabilities beyond what is built in Phase 2.

## Implementation Decisions

### Critério de "pronto"
- **D-01:** Definition of done is "Tudo + simulações vivas" — visual revista, chemistry accuracy, and live simulations must all pass. Not just visual or just build.
- **D-02:** Simulation liveness is "Auto-play total" — 3D orbit rotates automatically on slide open, 2D chamber auto-animates with particles moving. User observes without needing to click Play.
- **D-03:** Chemistry accuracy covers both slide text and `src/utils/constants.jsx` (`ION_PROPERTIES` Z=2, protons 2, neutrons 2, electrons 0, charge +2, 1s⁰). Researcher must ensure code constants match visible text.
- **D-04:** Failure policy is "Avisa e deploya" — if review finds a minor slip (image fails, orbit stutter), publish with graceful degradation (Figure fallback, WebGL fallback) and note debt; do not block deploy.

### Polimento final e placeholders
- **D-05:** Autoria placeholder "Estudante / Química Geral" must be replaced with "Miguel Pandini Bett, 1 ano ensino médio" in both `src/components/App.jsx` Slide Autoria and `src/utils/constants.jsx` SLIDE_CONFIG.
- **D-06:** Image fallback is "SVG diagrama no lugar" — if real photo fails to load, Figure component must render a vector diagram of He²⁺/detector instead of just gradient. Current gradient fallback is insufficient.
- **D-07:** Polish scope is "Revisão completa" — all 7 slides reviewed for orthography, spacing, contrast, and consistent revista styling. Not just autoria.
- **D-08:** References stay at 5 current items (Rutherford 1911, NFPA 2020, IAEA, Gomes 2019, Geiger 1909) — keep as is, only formatting.

### Estratégia de deploy
- **D-09:** Deploy method is "Tanto faz se subir" — use direct `npx gh-pages -d dist` (already in package.json `deploy` script). No requirement to create GitHub Actions workflow; either works if it publishes.
- **D-10:** Verification before publish is "Checar dist/index.html" — after `npx vite build`, assert that `<script src="/detectores-fumaca/assets/...">` exists with correct base before running gh-pages.
- **D-11:** Versioning leaves a trace: "Commit docs automático" — each deploy creates a commit on gh-pages branch for traceability. Not silent.
- **D-12:** Deploy failure handling is "Tenta gh-pages e avisa" — run `npx gh-pages -d dist`, if token/permission fails, show error and guidance, do not mark phase as blocked.

### Verificação pós-deploy
- **D-13:** Validation location is "Só Playwright local" — run 3 tests on localhost:4173 (build + canvas>=2 + no console errors). No need to open real Pages URL in this phase.
- **D-14:** Console check is "Inclui warnings" — warnings also fail the review. Not just pageerror/console.error; chunk warnings and Three/Matter warns must be triaged.
- **D-15:** Canvas check is "2 fixos" — require exactly 2 canvases visible (3D + 2D) via Tabs. Not 1 per active tab, not just mounted hidden.
- **D-16:** Report must be "Tudo + screenshot" — save screenshot of deck + build log + console log as deliverable to professor. Not just Playwright pass.

### Agent's Discretion
- Photo source selection (Unsplash CC vs existing placeholders) and exact SVG diagram design.
- Whether to use `jj` for deploy commit message formatting — keep conventional commits.

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project and Roadmap
- `.planning/PROJECT.md` — Core value, requirements (He²⁺, slides, simulations, deploy), tech stack React+Spectacle+Three+Matter
- `.planning/ROADMAP.md` § Phase 3: Review & Deploy — Goal, Wave 1 tasks (verify slides, simulations, chemistry, polish, references), Wave 2 tasks (deploy to GitHub Pages)
- `.planning/REQUIREMENTS.md` — Active requirements SLD-01..09, SIM-01/02, out-of-scope boundaries
- `.planning/STATE.md` — Current focus Phase 2 complete, Phase 3 pending, wave status

### Prior Phase Decisions
- `.planning/phases/02-build/02-02-SUMMARY.md` — Revista tokens #fefcf8/#0e4a7a/#c9a227, Tabs CSS always mounted, useFrame orbit, Matter chamber with spawnSmoke/MouseConstraint, build 1427 modules
- `.planning/phases/02-build/02-02-PLAN.md` — 7 tasks, file list, verification grep -c IntersectionObserver==0, useFrame>=1

### Codebase and Config
- `vite.config.js` — base "/detectores-fumaca/", @tailwindcss/vite plugin, resolve.alias react/react-dom, external react-native/expo
- `package.json` — homepage https://miguel.github.io/detectores-fumaca, scripts build/preview/deploy, deps tailwindcss 4.3.3, @tailwindcss/vite, clsx, tailwind-merge, @playwright/test
- `playwright.config.js` — webServer port 4173, base /detectores-fumaca/, tests/e2e/simulations.spec.js with 3 tests
- `src/utils/constants.jsx` — ION_PROPERTIES (Z=2, p=2, n=2, e=0, 1s⁰), CHEMICAL_INFO applications, SLIDE_CONFIG presenter/turma
- `src/components/App.jsx` — 7 slides Deck, Figure integration, Slide wrapper
- `src/components/Slide.jsx` — revista-slide wrapper with header badge
- `src/styles/tailwind.css` — @import tailwindcss + @theme tokens

## Existing Code Insights

### Reusable Assets
- `src/components/ui/tabs.jsx` — shadcn-style Tabs with CSS hidden (keeps Canvas/WebGL alive) — reuse for any tabbed verification UI
- `src/components/ui/figure.jsx` — Figure with fallback gradient, figcaption border gold, credit — extend to add SVG diagram fallback per D-06
- `src/lib/utils.js` — cn() via clsx+tailwind-merge — use for conditional revista classes
- `src/components/AtomicStructure3D.jsx` — useFrame orbital animation, Text/Html labels, orbit controls — verify auto-play per D-02
- `src/components/ParticleSimulation2D.jsx` — Matter.js spawnSmoke, MouseConstraint, gauge — verify auto-play and 2 fixed canvases per D-15

### Established Patterns
- Revista tokens single-source via @theme in tailwind.css and REVISTA_TOKENS in constants — maintain consistency
- Tabs always mounted (hidden CSS, not unmount) to preserve WebGL contexts — must keep per D-15
- useFrame + useRef for orbit (no useState) — avoids 60fps re-renders
- Matter.js render:{visible:false} + manual draw loop via requestAnimationFrame

### Integration Points
- Vite build → dist/index.html with base "/detectores-fumaca/" → gh-pages publish
- Spectacle Deck orchestrates Slide navigation; Slide wrapper injects revista styling without touching Deck root

## Specific Ideas

- Autoria must be "Miguel Pandini Bett, 1 ano ensino médio" — exact string from user, update both App.jsx and constants.jsx
- User wants "Tudo + screenshot" report — downstream planner must include screenshot artifact in verification tasks
- User emphasized auto-play total for both simulations — planner should ensure ParticleSimulation2D starts emitting without button press, not just via Inserir Fumaça

## Deferred Ideas

None — discussion stayed within phase scope. No new capabilities proposed.

---

*Phase: 3-Review & Deploy*
*Context gathered: 2026-09-01*
