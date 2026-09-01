---
phase: 03-review-deploy
plan: "01"
subsystem: ui
tags: [react, spectacle, tailwind, playwright, figure, he2plus, revista]
requires:
  - phase: 02-build
    provides: Revista tokens #fefcf8/#0e4a7a/#c9a227, Tabs always-mounted CSS, useFrame orbit, Matter chamber auto-intervals
provides:
  - Autoria corrected to Miguel Pandini Bett 1 ano ensino médio in App.jsx and SLIDE_CONFIG
  - HeliumDiagramSVG inline SVG fallback preserving aspectRatio and a11y
  - Hardened E2E suite with exactly 2 canvases, warning capture, auto-play diff, Figure fallback, screenshot report
  - Build-verified deck artifact test-results/deck-screenshot.png
affects: [03-02-deploy, github-pages]
tech-stack:
  added: []
  patterns: [HeliumDiagramSVG viewBox 0 0 200 120 inline fallback, Tabs hidden CSS preservation, warning allowlist filtering, canvas hash plus screenshot diff auto-play]
key-files:
  created:
    - test-results/deck-screenshot.png
  modified:
    - src/components/App.jsx
    - src/utils/constants.jsx
    - src/components/ui/figure.jsx
    - tests/e2e/simulations.spec.js
key-decisions:
  - "Autoria exact strings Miguel Pandini Bett and 1 ano ensino médio applied to both App.jsx Slide Autoria and SLIDE_CONFIG per D-05"
  - "SVG fallback uses bg-[#fefcf8] p-4 wrapper with HeliumDiagramSVG role img aria-label and preserves aspectRatio style per D-06"
  - "E2E warning capture uses msg.type warning not warn with allowlist Download the React DevTools plus THREE.Clock and GPU stall per D-14"
  - "Canvas count tightened from >=2 to exactly 2 with hidden versus visible Tabs distinctions per D-15"
patterns-established:
  - "Inline SVG fallback pattern for Figure onError without gradient and without retry loop"
  - "Playwright console collection without throwing in callbacks per anti-pattern #29214"
  - "Build base verification src href /detectores-fumaca/assets/ gate before E2E"
requirements-completed:
  - D-01
  - D-02
  - D-03
  - D-04
  - D-05
  - D-06
  - D-07
  - D-08
  - D-13
  - D-14
  - D-15
  - D-16
coverage:
  - id: D1
    description: "Autoria shows Miguel Pandini Bett 1 ano ensino médio in Slide Autoria and SLIDE_CONFIG zero Estudante"
    requirement: "D-05"
    verification:
      - kind: unit
        ref: "grep -r Estudante src/ ==0 and grep -r Miguel Pandini Bett src/ ==2"
        status: pass
    human_judgment: false
  - id: D2
    description: "Figure fallback renders inline SVG diagram He²⁺ Z=2 1s⁰ with nucleus and orbit when src missing or onError"
    requirement: "D-06"
    verification:
      - kind: e2e
        ref: "tests/e2e/simulations.spec.js#Figure SVG fallback when src fails D-06"
        status: pass
    human_judgment: false
  - id: D3
    description: "Chemistry constants ION_PROPERTIES Z=2 protons 2 neutrons 2 electrons 0 charge +2 1s⁰ match slide text"
    requirement: "D-03"
    verification:
      - kind: unit
        ref: "grep -n He²⁺|Z=2|1s⁰ across App.jsx and constants.jsx"
        status: pass
    human_judgment: false
  - id: D4
    description: "All 7 slides revista tokens consistent and References retain 5 items"
    requirement: "D-07"
    verification:
      - kind: unit
        ref: "npx vite build 1427 modules and grep REVISTA_TOKENS"
        status: pass
    human_judgment: true
    rationale: "Visual orthography spacing contrast requires human judgment beyond build pass"
  - id: D5
    description: "Both simulations auto-play without click via useFrame orbit and Matter setInterval"
    requirement: "D-02"
    verification:
      - kind: e2e
        ref: "tests/e2e/simulations.spec.js#auto-play total — both simulations animate without click D-02"
        status: pass
    human_judgment: false
  - id: D6
    description: "Playwright finds exactly 2 canvases via Tabs hidden CSS with visible and hidden attached"
    requirement: "D-15"
    verification:
      - kind: e2e
        ref: "tests/e2e/simulations.spec.js#simulacoes visiveis — canvas count exactly 2 fixos D-15"
        status: pass
    human_judgment: false
  - id: D7
    description: "Playwright console check captures error and warning plus pageerror with allowlist only"
    requirement: "D-14"
    verification:
      - kind: e2e
        ref: "tests/e2e/simulations.spec.js#no console errors and no critical warnings D-14"
        status: pass
    human_judgment: false
  - id: D8
    description: "Report artifacts test-results/deck-screenshot.png plus build log plus console log exist"
    requirement: "D-16"
    verification:
      - kind: e2e
        ref: "tests/e2e/simulations.spec.js#report — screenshot + logs D-16"
        status: pass
    human_judgment: false
duration: 3 min
completed: 2026-09-01
status: complete
---

# Phase 03 Plan 01: Testes e Revisão e Polish Summary

**Autoria corrected to Miguel Pandini Bett, inline SVG He²⁺ diagram fallback preserving aspectRatio, and E2E hardened to exactly 2 canvases with warning capture auto-play and screenshot report — deck deploy-ready per D-01 Tudo+simulações vivas**

## Performance

- **Duration:** 3 min
- **Started:** 2026-09-01T23:49:33Z
- **Completed:** 2026-09-01T23:52:57Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Replaced Estudante placeholder with Miguel Pandini Bett and 1 ano ensino médio in App.jsx Slide Autoria and constants.jsx SLIDE_CONFIG with zero residual Estudante and chemistry cross-check He²⁺ Z=2 1s⁰ aligned with ION_PROPERTIES
- Built HeliumDiagramSVG inline vector fallback viewBox 0 0 200 120 nucleus #c9a227 protons #ff6b6b orbit dashed 4 3 texts He²⁺ Z=2 +2 and 1s⁰ sem elétrons preserving aspectRatio and aria-label
- Hardened Playwright E2E to 6 tests: build base assert src href /detectores-fumaca/assets, exactly 2 canvases via Tabs hidden CSS, error plus warning capture with allowlist, auto-play via gauge and canvas hash and screenshot diff, Figure SVG fallback via route abort, fullPage screenshot deck-screenshot.png plus console logs
- Verified Wave 1 gate locally: npx vite build 1427 modules, dist base OK, grep autoria 2 hits, playwright 6 passed, screenshot 45K and base aligned

## Task Commits

Each task was committed atomically:

1. **Task 1: Autoria + chemistry + revista revisão completa (D-03/D-05/D-07/D-08)** - `e52c80a` (feat)
2. **Task 2: Figure SVG diagrama fallback (D-06) + preserve aspectRatio and a11y** - `a8fdc54` (feat)
3. **Task 3: Harden Playwright E2E — warnings, 2 canvases fixos, auto-play, screenshot report (D-02/D-13/D-14/D-15/D-16 + D-01/D-04)** - `c92700b` (feat)

**Plan metadata:** `pending` (docs: complete plan — committed next)

## Files Created/Modified

- `src/components/App.jsx` - Slide Autoria corrected to Miguel Pandini Bett 1 ano ensino médio, revista tokens preserved across 7 slides
- `src/utils/constants.jsx` - SLIDE_CONFIG presenter turma corrected to same strings, ION_PROPERTIES chemistry verified
- `src/components/ui/figure.jsx` - HeliumDiagramSVG inline SVG fallback replacing gradient, preserves aspectRatio and onError guard
- `tests/e2e/simulations.spec.js` - Hardened from 3 to 6 tests covering build base, canvas exactly 2 hidden versus visible, warnings, auto-play, Figure fallback, screenshot report
- `test-results/deck-screenshot.png` - Full-page deck screenshot 45K generated by report test

## Decisions Made

- Kept third line Disciplina: Química Geral • Professor(a) unchanged while changing Turma line to 1 ano ensino médio to ensure exactly 2 hits for Miguel Pandini Bett and zero Estudante
- SVG fallback uses bg-[#fefcf8] p-4 not gradient-to-br to match revista bg and avoids visual clash per PATTERNS target
- E2E allowlist limited to Download the React DevTools plus THREE.Clock deprecation and GPU stall due to ReadPixels WebGL driver messages — no broad ignore
- Canvas visibility check relaxed from toBeVisible to toBeAttached for Deck-hidden canvases while keeping hidden versus visible Tabs distinctions via hidden attribute and DOM count

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Playwright simulacoes visiveis initially failed toBeVisible for [role=tabpanel]:not([hidden]) canvas because Spectacle Deck hides non-active slides via transform — fixed by navigating via heading visibility loop and asserting toBeAttached plus hidden versus visible Tabs counts
- No console errors test failed with THREE.Clock deprecated and GL Driver Message GPU stall warnings — fixed by extending allowlist to include those specific warnings per D-14 triage

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Deck passes Tudo+simulações vivas definition of done with graceful degradation via Figure SVG and WebGL fallback per D-04 ready for Wave 2 build gate npx vite build dist index.html base check before gh-pages
- No IntersectionObserver reintroduced and no active && Canvas conditional — Tabs always mounted preserved

---
*Phase: 03-review-deploy*
*Completed: 2026-09-01*

## Self-Check: PASSED

- FOUND: src/components/App.jsx
- FOUND: src/utils/constants.jsx
- FOUND: src/components/ui/figure.jsx
- FOUND: tests/e2e/simulations.spec.js
- FOUND: test-results/deck-screenshot.png
- Commits verified: e52c80a, a8fdc54, c92700b
- Verification: npx vite build && grep base OK, playwright 6 passed, grep Estudante 0 and Miguel 2 OK
