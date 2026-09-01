---
phase: 03
slug: review-deploy
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-09-01
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | @playwright/test 1.62.1 |
| **Config file** | playwright.config.js (webServer `npx vite --port 4173 --strictPort`, baseURL `http://localhost:4173/detectores-fumaca/`) |
| **Quick run command** | `npx playwright test --reporter=list` |
| **Full suite command** | `npx vite build && npx playwright test --reporter=list` |
| **Estimated runtime** | ~15 seconds (build 886ms + e2e 15s) |

---

## Sampling Rate

- **After every task commit:** Run `npx vite build` + `grep -q 'src="/detectores-fumaca/assets/' dist/index.html` + `npx playwright test --reporter=list`
- **After every plan wave:** Run full suite + grep checks D-10/D-05/D-03
- **Before `/gsd-verify-work`:** Full suite must be green + screenshot artifact in test-results/
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | D-05 | — | Autoria grep 2 hits, 0 Estudante | unit | `grep -r "Miguel Pandini Bett" src/ ` expects 2; `grep -r "Estudante" src/` expects 0 | ❌ W0 (after edit) | ⬜ pending |
| 03-01-02 | 01 | 1 | D-06 | V5 | Figure SVG fallback visible when src fails | e2e | `npx playwright test -g "figure.*fallback"` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | D-02/D-15 | — | 2 canvases fixos via Tabs hidden CSS | e2e | `npx playwright test -g "canvas.*2 fixos"` — evaluate count ===2 + toBeAttached/toBeHidden | ❌ W0 | ⬜ pending |
| 03-01-04 | 01 | 1 | D-14 | — | No console errors AND warnings | e2e | `npx playwright test -g "no console"` — page.on console error+warning + pageerror | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 2 | D-10 | — | dist/index.html base /detectores-fumaca/ | unit | `grep -q 'src="/detectores-fumaca/assets/' dist/index.html` | ✅ exists | ⬜ pending |
| 03-02-02 | 02 | 2 | D-09/D-11/D-12 | — | gh-pages publish with traceable commit | manual+unit | `npx gh-pages -d dist 2>&1 | tee gh-pages.log; git branch -a | grep gh-pages` | ✅ exists | ⬜ pending |
| 03-02-03 | 02 | 2 | D-16 | — | Screenshot + build log + console log report | e2e | `npx playwright test -g "report"` — screenshot + testInfo.attach | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/e2e/simulations.spec.js` — endurecer: adicionar warning capture (D-14), canvas ===2 fixos (D-15), auto-play diff (D-02), Figure fallback (D-06), report screenshot+logs (D-16)
- [ ] `tests/e2e/polish.spec.js` (opcional) — autoria grep + revista tokens grep + chemistry cross-check (D-03/D-05/D-07)
- [ ] `test-results/` gitignore — já existe, confirmar cobre screenshots D-16
- [ ] `@playwright/test` chromium — já instalado via `npx playwright install chromium`

*Framework já instalado; Wave 0 é endurecer testes existentes.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Revista visual consistency all 7 slides | D-01/D-07 | Visual polish requires human eye | `grep -r "#fefcf8\|#0e4a7a\|#c9a227" src/` + abrir `npm run dev` e revisar orthography, spacing, contrast em cada slide |
| Chemistry ION_PROPERTIES matches slide text | D-03 | Cross-check text vs code constants | `grep -n "Z=2\|1s⁰\|He²⁺" src/components/App.jsx src/utils/constants.jsx` + comparar visual |
| References formatting 5 items | D-08 | Formatting check | Abrir slide Referências e confirmar 5 itens (Rutherford 1911, NFPA 2020, IAEA, Gomes 2019, Geiger 1909) formatados |

*All other behaviors have automated verification via Playwright/grep.*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
