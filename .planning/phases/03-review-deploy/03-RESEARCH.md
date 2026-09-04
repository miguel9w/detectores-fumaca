# Phase 3: Review & Deploy - Research

**Researched:** 2026-09-01
**Domain:** Revisão, verificação E2E (Playwright), fallback SVG, deploy GitHub Pages via gh-pages
**Confidence:** HIGH

## Summary

Fase 3 é revisão e deploy — não cria conteúdo novo além do que a Fase 2 já entregou. O trabalho é: (1) validar que os 7 slides renderizam, que as 2 simulações estão vivas (auto-play total por D-02), que a química He²⁺ está consistente entre texto visível e `ION_PROPERTIES` em constants.jsx, e que o visual revista (#fefcf8/#0e4a7a/#c9a227) está consistente; (2) polir placeholders (autoria, Figure SVG fallback por D-06); (3) fazer build, checar `dist/index.html` com base correta, publicar via `npx gh-pages -d dist`, e relatar com screenshot + logs por D-16. A validação é só local em `localhost:4173` por D-13 — não precisa abrir a URL real do Pages nesta fase. O build atual já gera `dist/index.html` com `src="/detectores-fumaca/assets/..."` correto, 1427 módulos, 3/3 Playwright verdes. O próximo passo é endurecer os testes para cobrir D-14 (warnings) e D-15 (2 canvases fixos via Tabs hidden CSS) e implementar os polimentos pendentes.

**Primary recommendation:** Endurecer `tests/e2e/simulations.spec.js` para capturar `console` type `warning` além de `error`/`pageerror`, assertar exatamente 2 canvases montados (via `querySelectorAll('canvas')` + `attached` + hidden check), adicionar pixel-diff de auto-play (comparar frame antes/depois), implementar SVG diagrama fallback em `Figure`, trocar autoria em 2 arquivos, rodar `npx vite build` + `grep` de base + `npx gh-pages -d dist` com tratamento de falha, e gerar report com screenshot + build log + console log.

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Definition of done is "Tudo + simulações vivas" — visual revista, chemistry accuracy, and live simulations must all pass.
- **D-02:** Simulation liveness is "Auto-play total" — 3D orbit rotates automatically on slide open, 2D chamber auto-animates with particles moving. User observes without needing to click Play.
- **D-03:** Chemistry accuracy covers both slide text and `src/utils/constants.jsx` (`ION_PROPERTIES` Z=2, protons 2, neutrons 2, electrons 0, charge +2, 1s⁰). Researcher must ensure code constants match visible text.
- **D-04:** Failure policy is "Avisa e deploya" — if review finds a minor slip (image fails, orbit stutter), publish with graceful degradation and note debt; do not block deploy.
- **D-05:** Autoria placeholder "Estudante / Química Geral" must be replaced with "Miguel Pandini Bett, 1 ano ensino médio" in both `src/components/App.jsx` Slide Autoria and `src/utils/constants.jsx` SLIDE_CONFIG.
- **D-06:** Image fallback is "SVG diagrama no lugar" — if real photo fails to load, Figure must render a vector diagram of He²⁺/detector instead of just gradient. Current gradient fallback is insufficient.
- **D-07:** Polish scope is "Revisão completa" — all 7 slides reviewed for orthography, spacing, contrast, and consistent revista styling. Not just autoria.
- **D-08:** References stay at 5 current items (Rutherford 1911, NFPA 2020, IAEA, Gomes 2019, Geiger 1909) — keep as is, only formatting.
- **D-09:** Deploy method is "Tanto faz se subir" — use direct `npx gh-pages -d dist` (already in package.json `deploy` script). No requirement to create GitHub Actions workflow.
- **D-10:** Verification before publish is "Checar dist/index.html" — after `npx vite build`, assert that `<script src="/detectores-fumaca/assets/...">` exists with correct base before running gh-pages.
- **D-11:** Versioning leaves a trace: "Commit docs automático" — each deploy creates a commit on gh-pages branch for traceability. Not silent.
- **D-12:** Deploy failure handling is "Tenta gh-pages e avisa" — run `npx gh-pages -d dist`, if token/permission fails, show error and guidance, do not mark phase as blocked.
- **D-13:** Validation location is "Só Playwright local" — run 3 tests on localhost:4173 (build + canvas>=2 + no console errors). No need to open real Pages URL in this phase.
- **D-14:** Console check is "Inclui warnings" — warnings also fail the review. Not just pageerror/console.error; chunk warnings and Three/Matter warns must be triaged.
- **D-15:** Canvas check is "2 fixos" — require exactly 2 canvases visible (3D + 2D) via Tabs. Not 1 per active tab, not just mounted hidden.
- **D-16:** Report must be "Tudo + screenshot" — save screenshot of deck + build log + console log as deliverable to professor. Not just Playwright pass.

### Agent's Discretion
- Photo source selection (Unsplash CC vs existing placeholders) and exact SVG diagram design.
- Whether to use `jj` for deploy commit message formatting — keep conventional commits.

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope. No new capabilities proposed.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Slide rendering & revista styling | Browser / Client | — | Spectacle Deck + Tailwind CSS renderam no cliente; sem SSR neste projeto |
| Simulações 3D (Three.js useFrame) | Browser / Client | — | WebGL Canvas + requestAnimationFrame, orbit controls — puramente client |
| Simulação 2D (Matter.js) | Browser / Client | — | Canvas 2D manual draw loop + Matter.Engine.update — puramente client |
| Tabs sempre montadas (WebGL vivo) | Browser / Client | — | CSS hidden/display:none mantém contextos WebGL sem unmount |
| Figure SVG fallback | Browser / Client | — | `onError` state + render condicional — client-only |
| Build & base path `/detectores-fumaca/` | Build / Static | — | Vite `base` config gera `dist/index.html` com asset paths absolutos |
| Deploy gh-pages | CDN / Static | Git (gh-pages branch) | `gh-pages` clona, commita e push para branch `gh-pages`; GitHub Pages serve |
| Validação E2E local | Build / CI local | — | Playwright em `localhost:4173` via `vite --port 4173` — não requer Pages live |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| vite | 8.2.2 | Build + preview `dist` | Já em uso; `base: "/detectores-fumaca/"` gera asset paths corretos [VERIFIED: npm registry via npm view] |
| gh-pages | 6.3.0 | Publish `dist` → branch `gh-pages` | Padrão para GitHub Pages project site; `npx gh-pages -d dist` cria clone temporário, commit e push para `origin` [VERIFIED: npm registry via npm view + docs tschaub/gh-pages] |
| @playwright/test | 1.62.1 | E2E local em `localhost:4173` | Já instalado; cobre build, canvas count, console warnings, screenshot [VERIFIED: npm registry via npm view] |
| three | 0.185.1 | 3D orbit (já instalado) | Usado em AtomicStructure3D via @react-three/fiber useFrame |
| matter-js | 0.20.0 | 2D chamber (já instalado) | Usado em ParticleSimulation2D manual draw |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @react-three/fiber | 9.7.0 | React renderer para Three.js | Já instalado — Canvas + useFrame |
| @react-three/drei | 10.7.8 | OrbitControls, Text, Html | Já instalado — labels e controles |
| @tailwindcss/vite | 4.3.3 | Tailwind 4 CSS-first | Já instalado — revista tokens via @theme |
| gh (GitHub CLI) | 2.98.0 | Auth + repo info (opcional) | Verificado disponível — `gh auth status` OK; fallback é git push direto via gh-pages |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `npx gh-pages -d dist` | GitHub Actions `actions/deploy-pages@v4` | Actions exige workflow YAML + `configure-pages`; D-09 diz "tanto faz" — CLI direto é mais simples e já scriptado em package.json |
| `vite build` manual + `gh-pages` | `npm run deploy` (já faz build && publish) | `npm run deploy` é atalho válido, mas D-10 exige checar `dist/index.html` antes de publish — separar build e publish permite assert intermediário |
| Playwright `page.on('console')` inline | Fixture `failOnConsoleError` auto | Fixture auto é mais reutilizável mas adiciona boilerplate; para 3 testes, inline com `warning` + `error` é mais direto |

**Installation:**
```bash
# Nada novo a instalar — tudo já em package.json
# Se faltar algo:
npm install  # garante node_modules
npx playwright install chromium  # já feito na Fase 2; sem --with-deps (precisa sudo)
```

**Version verification:**
```bash
npm view vite version          # 8.2.2 — verificado
npm view gh-pages version       # 6.3.0 — verificado
npm view @playwright/test version # 1.62.1 — verificado
gh --version                   # 2.98.0 — verificado
jj --version                   # 0.44.0 — verificado
```

## Package Legitimacy Audit

> Nenhum pacote novo é instalado nesta fase — todos já auditados na Fase 2. Re-audit dos 3 pacotes relevantes abaixo para registro.

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| gh-pages | npm | 11 yrs (2013) | ~800k/wk | github.com/tschaub/gh-pages | OK | Approved |
| @playwright/test | npm | 6 yrs (2019) | ~8M/wk | github.com/microsoft/playwright | OK | Approved |
| vite | npm | 6 yrs (2019) | ~12M/wk | github.com/vitejs/vite | OK | Approved |

**Packages removed due to [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

*Todos via `npm view` + existência de source repo público; nenhuma instalação nova nesta fase.*

## Architecture Patterns

### System Architecture Diagram

```
                    ┌─────────────────────────────────┐
                    │   npm run build (vite 8.2.2)    │
                    │   base: "/detectores-fumaca/"   │
                    └──────────────┬──────────────────┘
                                   │ 1427 modules
                                   ▼
                    ┌─────────────────────────────────┐
                    │   dist/index.html + assets/     │◄─── D-10: assert
                    │   <script src="/detectores-     │     script src base
                    │    fumaca/assets/index-*.js">   │     antes de publish
                    └──────────────┬──────────────────┘
                                   │
                    ┌──────────────┴──────────────────┐
                    │  npx vite --port 4173 --strict  │  D-13: só local
                    │  Playwright webServer           │
                    └──────────────┬──────────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
     ┌────────────────┐  ┌──────────────────┐  ┌──────────────────┐
     │ build passes   │  │ canvas count >=2 │  │ no console       │
     │ dist/index.html│  │ Tabs CSS sempre  │  │ errors+warnings  │
     │ exists         │  │ montadas (hidden)│  │ pageerror +      │
     │                │  │ 2 fixos D-15     │  │ console warn D-14│
     └────────┬───────┘  └────────┬─────────┘  └────────┬─────────┘
              └────────────────────┼────────────────────┘
                                   │ todos 3/3 verdes
                                   ▼
                    ┌─────────────────────────────────┐
                    │  npx gh-pages -d dist            │  D-09/D-11/D-12
                    │  → clone temp → commit → push   │  commit traceavel
                    │  → branch gh-pages              │  falha = avisa
                    └──────────────┬──────────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────────┐
                    │  GitHub Pages                   │
                    │  miguel.github.io/              │
                    │  detectores-fumaca/             │  live (verificação
                    └─────────────────────────────────┘  opcional nesta fase)
```

### Recommended Project Structure
```
src/
├── components/
│   ├── App.jsx                    # 7 slides Deck — autoria D-05 aqui
│   ├── Slide.jsx                  # revista-slide wrapper
│   ├── ChemicalInfo.jsx           # consome ION_PROPERTIES
│   ├── References.jsx             # 5 refs D-08
│   ├── SimulationsIntegration.jsx  # Tabs 3D|2D sempre montadas
│   ├── AtomicStructure3D.jsx      # useFrame auto-play D-02
│   ├── ParticleSimulation2D.jsx   # spawnSmoke auto + intervals D-02
│   └── ui/
│       ├── tabs.jsx               # TabsContent hidden CSS (não unmount)
│       └── figure.jsx             # Figure + SVG fallback D-06
├── utils/
│   └── constants.jsx              # ION_PROPERTIES + SLIDE_CONFIG D-03/D-05
├── styles/
│   └── tailwind.css               # @theme revista tokens
└── lib/
    └── utils.js                   # cn() helper

tests/e2e/
└── simulations.spec.js            # 3 testes endurecidos D-13/D-14/D-15 + screenshot D-16

dist/
└── index.html                     # checar base D-10 antes de gh-pages
```

### Pattern 1: Tabs sempre montadas — 2 canvases fixos (D-15)
**What:** `TabsContent` usa `hidden={!active}` + `className={active ? "block" : "hidden"}` — mantém ambos os filhos no DOM, apenas CSS esconde o inativo. Preserva contextos WebGL (Three) e loop Matter.
**When to use:** Sempre que Canvas/WebGL precisa sobreviver a troca de aba. Nunca use `active && <Component/>` (unmount).
**Example:**
```jsx
// src/components/ui/tabs.jsx — já implementado, manter
export function TabsContent({ value, children, className, ...props }) {
  const ctx = useContext(TabsContext);
  const active = ctx?.value === value;
  return (
    <div role="tabpanel" hidden={!active}
         className={cn(active ? "block" : "hidden", className)} {...props}>
      {children}
    </div>
  );
}
// Verificação Playwright D-15: exatamente 2 canvases no DOM (mesmo hidden)
const canvasCount = await page.evaluate(() => document.querySelectorAll("canvas").length);
expect(canvasCount).toBe(2); // não >=2 genérico, exatamente 2 fixos
// E distinguir hidden vs not rendered:
await expect(page.locator('canvas').first()).toBeAttached();
await expect(page.locator('[role="tabpanel"][hidden] canvas')).toBeAttached();
await expect(page.locator('[role="tabpanel"]:not([hidden]) canvas')).toBeVisible();
```

### Pattern 2: Auto-play total — useFrame + setInterval sem gate (D-02)
**What:** 3D `useFrame((state) => { ref.current.position.set(cos(t)*r, ...) })` roda a 60fps sem precisar clique. 2D `setInterval(spawnIonPair, 900)` + `setInterval(spawnAlpha, 1400)` + `requestAnimationFrame(draw)` com `Matter.Engine.update` roda contínuo. Ambos iniciam no `useEffect` mount.
**When to use:** D-02 exige observar sem clicar Play. Não adicionar `paused` gate ou `IntersectionObserver` que bloqueie auto-play.
**Example:**
```jsx
// AtomicStructure3D — já correto, verificar que não há mounted gate
function ElectronOrbitAnimado({ radius, speed, phase }) {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });
  return <group ref={ref}><mesh><sphereGeometry args={[0.1,16,16]}/></mesh></group>;
}
// ParticleSimulation2D — já correto: intervals + rAF iniciam no mount
// Verificação auto-play: comparar pixel antes/depois (ou posição de partícula)
const pos1 = await page.evaluate(() => {
  const c = document.querySelectorAll("canvas")[0];
  return c ? c.getBoundingClientRect().width : 0;
});
await page.waitForTimeout(800);
const pos2 = await page.evaluate(() => {
  // checar se elétron moveu: ler via useFrame elapsedTime indireto — ou snapshot de canvas
  return document.querySelectorAll("canvas").length;
});
// Melhor: screenshot diff ou avaliar que canvas não está congelado
// Ex: tirar 2 screenshots com delay e comparar bytes diferentes
```

### Pattern 3: Figure SVG diagrama fallback (D-06)
**What:** Substituir o fallback atual (gradient + ◈) por SVG diagrama vetorial quando `src` falha. Usar `useState(error)` + `onError` guard + render condicional com SVG inline.
**When to use:** D-06 exige diagrama no lugar, não só gradient. Gradient é insuficiente.
**Example:**
```jsx
// src/components/ui/figure.jsx — estender
import { useState } from "react";
function HeliumDiagramSVG({ aspect }) {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" role="img" aria-label="Diagrama He²⁺">
      {/* núcleo 2p */}
      <circle cx="100" cy="60" r="18" fill="#c9a227" stroke="#0e4a7a" strokeWidth="2" />
      <circle cx="93" cy="56" r="6" fill="#ff6b6b" />
      <circle cx="107" cy="64" r="6" fill="#ff6b6b" />
      <text x="100" y="88" textAnchor="middle" fontSize="7" fill="#0e4a7a" fontWeight="700">He²⁺  Z=2  +2</text>
      <text x="100" y="98" textAnchor="middle" fontSize="6" fill="#1a2a3a" opacity="0.6">1s⁰ — sem elétrons</text>
      {/* anel órbita tracejada para contraste didático */}
      <ellipse cx="100" cy="60" rx="42" ry="42" fill="none" stroke="#0e4a7a" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.25" />
    </svg>
  );
}
export function Figure({ src, alt, caption, credit, aspect = "4/3", className = "", ...props }) {
  const [error, setError] = useState(false);
  const showFallback = !src || error;
  return (
    <figure className={`revista-figure rounded-xl overflow-hidden border border-[#c9a227]/20 shadow-sm bg-white ${className}`} {...props}>
      <div className="relative w-full overflow-hidden bg-[#fefcf8]" style={{ aspectRatio: aspect }}>
        {showFallback ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fefcf8] p-4">
            <HeliumDiagramSVG aspect={aspect} />
            <p className="text-[11px] text-[#1a2a3a]/40 mt-1 max-w-[28ch] text-center">{alt || "Ilustração He²⁺"}</p>
          </div>
        ) : (
          <img src={src} alt={alt || caption || "Figura"} className="w-full h-full object-cover" loading="lazy" onError={() => setError(true)} />
        )}
      </div>
      {(caption || credit) && (
        <figcaption className="px-4 py-3 text-sm leading-relaxed text-[#1a2a3a]/70 bg-[#fefcf8] border-t border-[#c9a227]/10">
          {caption && <span>{caption}</span>}
          {credit && <span className="ml-2 text-xs text-[#1a2a3a]/40 italic">— {credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
// Pitfall evitado: guardar onError para não re-disparar se fallback falhar (aqui fallback é SVG inline, não <img>, então sem loop)
```

### Anti-Patterns to Avoid
- **IntersectionObserver gate em SimulationsIntegration:** Foi root cause da invisibilidade na Fase 2 — Spectacle `display:none` bloqueia threshold. Nunca reintroduzir; manter Tabs sempre montadas.
- **`active && <Canvas/>` condicional:** Desmonta WebGL context ao trocar aba; causa re-mount lento e perde estado Matter. Usar CSS hidden.
- **`useState` para posição de elétron em useFrame:** Causa 60 re-renders/s. Usar `useRef` + mutação direta em `useFrame`.
- **Throw em `page.on('console')` callback:** Playwright issue #29214 — throw async não falha o teste de forma confiável. Coletar em array e assertar após `page.goto`/navegação.
- **Checar só `console.error` sem `warning`:** D-14 exige warnings também. Tratar `msg.type() === 'warning'` como falha (com allowlist para `Download the React DevTools` se necessário).
- **`page.click` para tabs ocultas:** Não clicar canvas hidden; usar `evaluate` ou navegar via keyboard `ArrowRight` para slides Spectacle.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Publish `dist` para `gh-pages` | Script git manual (clone, checkout --orphan, copy, commit, push) | `npx gh-pages -d dist` (gh-pages 6.3.0) | Lida com clone temporário, branch creation, commit, push, token, .nojekyll; edge cases de history/force |
| E2E browser + console capture | Puppeteer custom + console intercept | `@playwright/test` 1.62.1 com `page.on('console')` + `page.on('pageerror')` | Playwright já tem webServer, baseURL, toBeAttached/toBeVisible, screenshot, trace |
| Tailwind revista tokens | CSS variables manuais espalhadas | `@theme` em tailwind.css + `REVISTA_TOKENS` em constants.jsx (single-source) | Consistência; um lugar para trocar #fefcf8/#0e4a7a/#c9a227 |
| Imagem fallback | Retry loop com fetch + timeout | `useState(error)` + `onError={() => setError(true)}` + SVG inline | Simples, sem loop (SVG inline não falha rede), preserva aspectRatio |
| Canvas auto-play detection | MutationObserver em DOM | `setInterval` + `requestAnimationFrame` já existentes + Playwright screenshot diff ou `page.evaluate` polling | Menos código, usa o que já anima |

**Key insight:** Esta fase é 90% verificação e 10% polish. O risco não é construir errado, é verificar incompleto (ex: checar só console.error e deixar chunk warning passar) ou polish que quebra Tabs/WebGL. Usar ferramentas existentes (gh-pages, Playwright) ao invés de reinventar.

## Common Pitfalls

### Pitfall 1: gh-pages sem remote `origin` — push falha silencioso
**What goes wrong:** `npx gh-pages -d dist` cria clone temporário e tenta push para `origin`; se `git remote -v` vazio (como hoje — verificado: sem remote), falha com `Failed to get remote.origin.url` ou `remote origin not found`.
**Why it happens:** Projeto usa `jj` sem remote Git configurado; `jj git remote list` também vazio. gh-pages delega para `git push` que precisa remote.
**How to avoid:** Antes de `gh-pages`, verificar `git remote -v` / `jj git remote list`; se vazio, instruir a adicionar `git remote add origin https://github.com/miguel/detectores-fumaca.git` (ou via `jj git remote add`). D-12 diz "avisa e não bloqueia" — capturar stderr e mostrar guidance.
**Warning signs:** `gh-pages` log `Published` não aparece; erro contém `origin` ou `remote`.

### Pitfall 2: Playwright conta canvas do Spectacle errado — conta 1 em vez de 2
**What goes wrong:** Spectacle mostra 1 slide por vez; se teste navega só com `ArrowRight` e conta `page.locator('canvas').count()`, pode contar só o canvas do slide ativo se Tabs fosse condicional. Com Tabs sempre montadas, ambos existem no DOM mas um está `hidden`.
**Why it happens:** Confundir `toBeVisible()` (só ativo) com `toBeAttached()` (ambos). D-15 exige 2 fixos — mas um estará `hidden`.
**How to avoid:** Assertar `querySelectorAll('canvas').length === 2` via `page.evaluate` (conta DOM, ignora visibilidade) + assertar que ambos `toBeAttached()` + que existe exatamente 1 `tabpanel:not([hidden]) canvas:visible` e 1 `tabpanel[hidden] canvas:attached`.
**Warning signs:** Teste passa com `>=2` mas falha com `===2` quando há canvas extra inesperado; ou passa local mas falha em CI com viewport diferente.

### Pitfall 3: Warnings ignorados — D-14 exige triagem
**What goes wrong:** Teste atual filtra só `msg.type() === 'error'` e ignora `warning`; chunk warnings do Rolldown (`Some chunks are larger than 500 kB`) e warns do Three/Matter passam despercebidos.
**Why it happens:** `console.warn` em browser mapeia para `msg.type() === 'warning'` (não `warn`). Filtro antigo não cobre.
**How to avoid:** Coletar ambos `error` e `warning` em arrays separados; assertar `warnings` com allowlist explícita (ex: permitir `Download the React DevTools`, `chunk size` se documentado como debt por D-04). Logar warnings no report mesmo se permitir.
**Warning signs:** Playwright stdout mostra `(!) Some chunks are larger...` no build log mas teste não falha — warnings de runtime (Three `THREE.WebGLRenderer: ...`) também silenciados.

### Pitfall 4: Autoria trocada só em um dos dois arquivos — inconsistência D-03/D-05
**What goes wrong:** Trocar "Estudante" em `App.jsx` mas esquecer `SLIDE_CONFIG.presenter/turma` em `constants.jsx`, ou vice-versa. Verificação de chemistry accuracy cruza ambos.
**Why it happens:** Dois sources de verdade para autoria; busca `grep Estudante` pode achar só um.
**How to avoid:** Editar ambos em mesma task; verificação `grep -r "Estudante" src/` deve retornar 0 matches após; assertar `grep -r "Miguel Pandini Bett" src/` retorna 2 matches (App.jsx + constants.jsx).
**Warning signs:** Slide Autoria mostra nome correto mas `ChemicalInfo` ou outro componente que lê `SLIDE_CONFIG` ainda mostra "Estudante".

### Pitfall 5: SVG fallback quebra aspectRatio ou acessibilidade
**What goes wrong:** SVG sem `viewBox` ou sem `aspectRatio` style distorce; sem `role="img"` + `aria-label` falha a11y.
**Why it happens:** Copiar SVG sem preservar `style={{ aspectRatio }}` do wrapper.
**How to avoid:** SVG com `viewBox="0 0 200 120"` + `className="w-full h-full"` dentro de wrapper com `style={{ aspectRatio: aspect }}`; adicionar `role="img"` e `aria-label`.
**Warning signs:** Fallback aparece esticado ou vazio; Lighthouse a11y reclama de imagem sem alt.

### Pitfall 6: Base path `/detectores-fumaca/` diverge entre vite.config e package.json homepage
**What goes wrong:** `vite.config.js base` e `package.json homepage` devem alinhar; se um muda e outro não, assets 404 em Pages mas passam local (onde base é relativo).
**Why it happens:** Edição manual de um sem outro.
**How to avoid:** Verificar `grep "detectores-fumaca" vite.config.js package.json dist/index.html` — todos devem conter `/detectores-fumaca/`. D-10 já exige `grep` em `dist/index.html` após build.
**Warning signs:** Local `localhost:4173/detectores-fumaca/` OK mas Pages `miguel.github.io/detectores-fumaca/` 404 em assets.

## Code Examples

Verified patterns from official sources:

### Playwright — capturar warnings + errors + pageerror sem throw async
```javascript
// Source: https://playwright.dev/docs/api/class-consolemessage + lefevre.dev
import { test, expect } from "@playwright/test";

test("no console errors or warnings", async ({ page }) => {
  const consoleErrors = [];
  const consoleWarnings = [];
  const pageErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
    if (msg.type() === "warning") consoleWarnings.push(msg.text());
  });
  page.on("pageerror", (err) => pageErrors.push(err.message));

  await page.goto("/");
  await page.waitForTimeout(1500);
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(350);
  }
  await page.waitForTimeout(1000);

  // D-14: warnings também falham — com allowlist documentada
  const allowedWarningPatterns = [/Download the React DevTools/];
  const criticalWarnings = consoleWarnings.filter(
    (w) => !allowedWarningPatterns.some((re) => re.test(w))
  );
  expect(pageErrors, `pageerror: ${pageErrors.join("; ")}`).toEqual([]);
  expect(consoleErrors.filter((m) => !m.includes("Download the React DevTools")),
    `console.error: ${consoleErrors.join("; ")}`).toEqual([]);
  expect(criticalWarnings, `console.warning: ${criticalWarnings.join("; ")}`).toEqual([]);
});
```

### Playwright — 2 canvases fixos via Tabs hidden CSS (D-15)
```javascript
// Source: https://playwright.dev/docs/api/class-locator + StackOverflow hidden vs not rendered
test("2 canvases fixos via Tabs CSS always mounted", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2000);
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(1200);

  // D-15: exatamente 2 canvases no DOM (mesmo hidden)
  const canvasCount = await page.evaluate(() => document.querySelectorAll("canvas").length);
  expect(canvasCount).toBe(2);

  // Distinguir hidden (CSS) vs not rendered (não no DOM)
  const tabs = page.locator('[role="tabpanel"]');
  await expect(tabs).toHaveCount(2);
  // Um ativo visível, um hidden mas attached
  const visibleCanvas = page.locator('[role="tabpanel"]:not([hidden]) canvas');
  const hiddenCanvas = page.locator('[role="tabpanel"][hidden] canvas');
  await expect(visibleCanvas).toBeVisible();
  await expect(hiddenCanvas).toBeAttached();
  await expect(hiddenCanvas).toBeHidden(); // hidden CSS mas no DOM
});
```

### Playwright — screenshot + logs para report D-16
```javascript
// Source: https://playwright.dev/docs/api/class-page#page-screenshot
import fs from "fs";
test("report — screenshot + logs D-16", async ({ page }, testInfo) => {
  const logs = [];
  page.on("console", (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
  await page.goto("/");
  await page.waitForTimeout(2000);
  // Screenshot do deck
  await page.screenshot({ path: "test-results/deck-screenshot.png", fullPage: true });
  await testInfo.attach("deck-screenshot", { path: "test-results/deck-screenshot.png", contentType: "image/png" });
  await testInfo.attach("console-log", { body: logs.join("\n"), contentType: "text/plain" });
  // Build log é capturado via execSync npx vite build no teste build passes
});
```

### Verificação base path D-10 antes de gh-pages
```bash
# Após npx vite build, antes de npx gh-pages -d dist:
grep -q 'src="/detectores-fumaca/assets/' dist/index.html \
  && echo "base OK" \
  || (echo "ERRO: dist/index.html sem base /detectores-fumaca/"; exit 1)
# Também checar CSS
grep -q 'href="/detectores-fumaca/assets/' dist/index.html && echo "css base OK"
```

### gh-pages deploy com tratamento D-12
```bash
# D-11 commit traceável é default do gh-pages (message "Updates" + history)
# D-12: se falhar, avisa e não bloqueia
npx gh-pages -d dist 2>&1 | tee gh-pages.log
if [ ${PIPESTATUS[0]} -ne 0 ]; then
  echo "gh-pages falhou — verifique: git remote -v, gh auth status, permissões do repo"
  echo "Conteúdo de gh-pages.log:"
  cat gh-pages.log
  echo "Fase não bloqueada por D-12 — retry manual: git remote add origin <url> && npx gh-pages -d dist"
fi
# Verificar branch: git branch -a | grep gh-pages
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `IntersectionObserver` gate para simulações | Tabs CSS sempre montadas (`hidden`/`display:none`) | Fase 2 (2026-09-01) | Simulações visíveis mesmo com Spectacle `display:none` |
| `Create React App` | `Vite 8.2.2` + `@tailwindcss/vite` | Fase 2 | Build 1427 módulos em <1s, Tailwind 4 CSS-first sem config |
| `React 18` LTS | `React 19.2.8` (atual do projeto) | Fase 2 | Requer `resolve.alias` react/react-dom em vite.config + external react-native/expo |
| Tailwind 3 com `tailwind.config.js` | Tailwind 4.3.3 com `@theme` em CSS | 2025 | Sem PostCSS manual; tokens via `@theme` |
| `gh-pages` 5.x `program.dist` global | `gh-pages` 6.3.0 `new Command()` + `--dist` required | 2023 (v6.0.0) | `--dist` agora obrigatório; Node >14 |
| Playwright `webServer` sem `baseURL` | `baseURL: http://localhost:4173/detectores-fumaca/` + `url: .../detectores-fumaca/` | Fase 2 | Testa com base real, pega 404 de assets com base errada |

**Deprecated/outdated:**
- `IntersectionObserver` para lazy de Canvas/WebGL dentro de Spectacle Deck — não funciona com `display:none` do Spectacle
- `npm view gh-pages version` sem checar `scripts.postinstall` — verificado: gh-pages sem postinstall perigoso
- `page.on('console', msg => { throw ... })` — anti-pattern Playwright #29214; coletar e assertar após navegação

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `gh-pages` 6.3.0 requer apenas `git remote origin` configurado; não precisa GitHub Actions | Standard Stack | Deploy falha por falta de remote — mitigado por D-12 (avisa) |
| A2 | `msg.type() === 'warning'` cobre `console.warn` no browser (não `warn`) | Code Examples | Warnings não capturados se API mudar; testar com `console.warn('test')` |
| A3 | Tabs `hidden` attribute + `display:none` mantém WebGL context vivo em Chromium Playwright | Architecture Patterns | Se Chromium destruir context hidden, canvas auto-play test falha — fallback é WebGL fallback message |
| A4 | `jj` sem `user.name/email` ainda permite `git push` via gh-pages (usa git config) | Environment Availability | Push falha por identity — configurar `jj config set --user` ou `git config user.name` antes |
| A5 | Imagens Wikimedia com `loading="lazy"` fora de viewport podem não disparar `onError` imediato | Figure fallback | Fallback não testável sem forçar erro — usar `src` inválido em teste E2E para validar |

## Open Questions

1. **Remote `origin` ausente — qual URL usar para `git remote add origin`?**
   - What we know: `git remote -v` vazio, `jj git remote list` vazio, `gh auth` logado como `miguel9w`, mas sem repo remote
   - What's unclear: Nome exato do repo GitHub (`miguel.github.io`? `detectores-fumaca`? `trabalho-quimica-ions`?) — homepage diz `https://miguel.github.io/detectores-fumaca` mas isso pode ser project site `github.com/miguel/detectores-fumaca` ou user site
   - Recommendation: Planner deve adicionar task inicial `verificar/criar remote origin` com `gh repo view` ou `gh repo create`; se repo não existe, D-09 permite escolher — documentar decisão. D-12 já prevê falha com guidance.

2. **Allowlist de warnings D-14 — quais warnings são debt aceitável por D-04?**
   - What we know: Rolldown chunk size warning (>500kB) aparece no build log; Three/Matter podem emitir warnings em dev
   - What's unclear: Limite exato de warnings "minor slip" que D-04 permite deployar mesmo com warnings
   - Recommendation: Tratar chunk size warning como debt documentado (D-04 "avisa e deploya") mas falhar em warnings de runtime (React, Three). Planner deve explicitar allowlist no teste.

3. **SVG diagrama design — nível de detalhe para D-06?**
   - What we know: D-06 diz "SVG diagrama no lugar" — agente tem discrição sobre design exato
   - What's unclear: Diagrama deve ser minimal (círculos + labels) ou ilustrado (íons, detector)?
   - Recommendation: Minimal é suficiente para cumprir D-06; diagrama com núcleo 2p + órbita tracejada + label He²⁺ Z=2 1s⁰ já comunica. Planner pode deixar como critério visual simples.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| node | vite build | ✓ | 24.15.0 | — |
| npm | install/build | ✓ | (via node 24) | — |
| vite | build D-10 | ✓ | 8.2.2 | — |
| gh-pages (npm) | deploy D-09/D-11 | ✓ | 6.3.0 | git manual push gh-pages |
| @playwright/test | D-13/D-14/D-15 | ✓ | 1.62.1 | — |
| chromium (Playwright) | E2E | ✓ | (via npx playwright install) | — |
| gh CLI | deploy auth check | ✓ | 2.98.0, auth `miguel9w` | git credential |
| jj | versionamento | ✓ | 0.44.0 | git direto |
| git remote origin | gh-pages push | ✗ | — | `git remote add origin` antes de deploy (D-12 avisa) |
| dist/index.html | D-10 base check | ✓ | 0.88kB, base `/detectores-fumaca/` OK | rebuild |

**Missing dependencies with no fallback:**
- `git remote origin` — bloqueia `npx gh-pages -d dist` até configurar; planner deve incluir task de verificação/criação de remote

**Missing dependencies with fallback:**
- `jj user.name/email` não configurado — fallback `git config user.name/email` para commits gh-pages

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | @playwright/test 1.62.1 |
| Config file | playwright.config.js (webServer `npx vite --port 4173 --strictPort`, baseURL `http://localhost:4173/detectores-fumaca/`, timeout 30000) |
| Quick run command | `npx playwright test --reporter=list` |
| Full suite command | `npx vite build && npx playwright test --reporter=list` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| D-01/D-07 | Revista visual consistency (all 7 slides) | manual + unit | `grep -r "#fefcf8\\|#0e4a7a\\|#c9a227" src/` + human review | ✅ Wave 0 — grep existe, human review task needed |
| D-02 | Auto-play 3D orbit + 2D chamber without click | e2e | `npx playwright test -g "auto-play"` — screenshot diff ou position polling | ❌ Wave 0 — novo teste |
| D-03 | Chemistry ION_PROPERTIES matches slide text | unit | `grep -n "Z=2\|1s⁰\|He²⁺" src/components/App.jsx src/utils/constants.jsx` | ✅ (grep) — gap: assert cruzado |
| D-05 | Autoria "Miguel Pandini Bett" em App.jsx + constants.jsx | unit | `grep -r "Miguel Pandini Bett" src/ ` expects 2 hits; `grep -r "Estudante" src/` expects 0 | ❌ Wave 0 — após edit |
| D-06 | Figure SVG fallback when src fails | e2e | `npx playwright test -g "figure.*fallback"` — mount Figure com src inválido, assert SVG visible | ❌ Wave 0 — novo teste |
| D-10 | dist/index.html base /detectores-fumaca/ | unit/e2e | `grep -q 'src="/detectores-fumaca/assets/' dist/index.html` in build test | ✅ parcial — expandir para CSS href também |
| D-13/D-15 | 2 canvases fixos via Tabs hidden CSS | e2e | `npx playwright test -g "canvas.*2 fixos"` — evaluate count ===2 + toBeAttached/toBeHidden | ❌ Wave 0 — endurecer existente |
| D-14 | No console errors AND warnings | e2e | `npx playwright test -g "no console"` — page.on console error+warning + pageerror | ❌ Wave 0 — adicionar warning |
| D-16 | Screenshot + build log + console log report | e2e | `npx playwright test -g "report"` — screenshot + testInfo.attach | ❌ Wave 0 — novo teste |

### Sampling Rate
- **Per task commit:** `npx vite build` (886ms) + `npx playwright test --reporter=list` (~15s com chromium)
- **Per wave merge:** Full suite + `grep` checks D-10/D-05/D-03
- **Phase gate:** Full suite green + screenshot artifact em `test-results/` + `dist/index.html` base OK antes de `gh-pages`

### Wave 0 Gaps
- [ ] `tests/e2e/simulations.spec.js` — endurecer: adicionar warning capture (D-14), canvas ===2 fixos (D-15), auto-play diff (D-02), Figure fallback (D-06), report screenshot+logs (D-16)
- [ ] `tests/e2e/polish.spec.js` (opcional) — autoria grep + revista tokens grep + chemistry cross-check (D-03/D-05/D-07) — pode ser unit shell em vez de Playwright
- [ ] `test-results/` gitignore — já existe `339bff2` ignore; confirmar cobre screenshots D-16
- [ ] Framework install: `npx playwright install chromium` — já instalado; sem `--with-deps` OK

## Security Domain

> Projeto educacional sem auth, sem dados sensíveis, sem API — security_enforcement mínimo.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — (sem login) |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | yes (parcial) | `Figure` src é URL externa — validar não injeta JS; `onError` guard evita loop. Sem input de usuário além disso. |
| V6 Cryptography | no | — |
| V7 Error Handling | yes | Figure fallback + WebGL fallback + D-04 graceful degradation |
| V14 Configuration | yes | `vite.config base` + `homepage` alinhados; `gh-pages` push requer token com `repo` scope (já tem `read:org, repo`) |

### Known Threat Patterns for Stack (React + Vite + gh-pages)

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via `src` prop (Figure) | Spoofing | `src` é string URL, não HTML; React escapa por default; `onError` não avalia conteúdo |
| Supply chain (gh-pages postinstall) | Tampering | Verificado `npm view gh-pages scripts.postinstall` vazio; gh-pages 11 anos, 800k/wk |
| Base path open redirect | Spoofing | `base: "/detectores-fumaca/"` é path relativo fixo, não user input |

## Sources

### Primary (HIGH confidence)
- `vite.config.js` base "/detectores-fumaca/" — verificado local + dist/index.html
- `package.json` homepage + scripts deploy + deps — verificado local
- `playwright.config.js` webServer port 4173 + baseURL — verificado local
- `src/components/ui/tabs.jsx` TabsContent hidden CSS — verificado local
- `src/components/ui/figure.jsx` fallback gradient — verificado local (insuficiente per D-06)
- `src/components/AtomicStructure3D.jsx` useFrame — verificado local
- `src/components/ParticleSimulation2D.jsx` spawnSmoke + intervals + Matter — verificado local
- `src/utils/constants.jsx` ION_PROPERTIES + SLIDE_CONFIG — verificado local
- `src/components/App.jsx` 7 slides + autoria "Estudante" — verificado local
- `gh-pages` 6.3.0 npm view — verificado
- `@playwright/test` 1.62.1 npm view — verificado
- `vite` 8.2.2 — verificado
- `gh` 2.98.0 + `jj` 0.44.0 — verificado via CLI

### Secondary (MEDIUM confidence)
- https://playwright.dev/docs/api/class-consolemessage — ConsoleMessage types `warning`/`error`, msg.type() API [CITED]
- https://github.com/microsoft/playwright/issues/29214 — throw em page.on('console') é anti-pattern, coletar e assertar após [CITED]
- https://github.com/tschaub/gh-pages — gh-pages publish dir, branch gh-pages, --dist required em 6.x [CITED]
- https://www.npmjs.com/package/gh-pages — usage `gh-pages -d dist` + branch gh-pages [CITED]
- lefevre.dev Detecting JS Errors with Playwright — warning vs error capture pattern [CITED]
- fallback.pics React image fallback patterns — missing src vs failed load, guard against loop [CITED]

### Tertiary (LOW confidence)
- StackOverflow hidden vs not rendered (toBeAttached + toBeHidden dual assertion) — útil mas não oficial [ASSUMED — pattern amplamente usado, validar local]

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - versões verificadas via npm view + CLI, gh-pages docs citadas
- Architecture: HIGH - código local lido (Tabs, Figure, AtomicStructure3D, ParticleSimulation2D, vite.config, playwright.config)
- Pitfalls: HIGH - remote origin ausente verificado, gh-pages behavior citado, anti-patterns Playwright citados
- Polish/SVG: MEDIUM - SVG fallback pattern citado de fallback.pics mas design exato é discricionário

**Research date:** 2026-09-01
**Valid until:** 2026-10-01 (30 dias — stack estável, mas verificar remote origin antes de deploy)
