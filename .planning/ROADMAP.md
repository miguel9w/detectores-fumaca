# Roadmap: Detectors de Fumaça e a Descoberta do Núcleo Atômico

**Core Value:** Transformar conceitos complexos de estrutura atômica e detectores de fumaça em uma experiência visual e interativa que estudantes compreendam de forma clara e envolvente.

## Phase 1: Research

**Goal:** Gather domain knowledge and validate technology choices for the educational slide project.

### Wave 1: Pesquisa de Domínio

**Tasks:**
- [ ] RES-01: Pesquisar funcionamento e história dos detectores de fumaça
- [ ] RES-02: Pesquisar a descoberta do núcleo atômico (Rutherford)
- [ ] RES-03: Pesquisar propriedades do íon He²⁺ (estrutura, configuração eletrônica)
- [ ] RES-04: Pesquisar aplicações do He²⁺ na tecnologia, saúde e meio ambiente
- [ ] RES-05: Pesquisar boas práticas para slides educativos interativos

**Deliverable:** `.planning/research/DOMAIN.md` — consolidated domain knowledge

### Wave 2: Pesquisa de Tecnologia

**Tasks:**
- [ ] RES-06: Pesquisar Spectacle.js para apresentações React
- [ ] RES-07: Pesquisar Three.js para simulações 3D de estruturas atômicas
- [ ] RES-08: Pesquisar Matter.js para simulações 2D de partículas

**Deliverable:** `.planning/research/TECH.md` — technology stack validation

**Transition to Phase 2:** All research items complete, technology stack confirmed

---

## Phase 2: Build

**Goal:** Build the slide deck with content and interactive simulations.

### Wave 1: Slides e Conteúdo

**Tasks:**
- [ ] SLD-01: Título atraente com nome do tema e aplicação prática no cotidiano
- [ ] SLD-02: Identificação química completa do He²⁺ (símbolo, Z=2, carga +2, Cátion)
- [ ] SLD-03: Explicação subatômica: prótons no núcleo, elétrons ganhos/perdidos
- [ ] SLD-04: Imagem representativa do íon He²⁺
- [ ] SLD-07: Parágrafo explicativo sobre aplicações do He²⁺
- [ ] SLD-08: Seção de autoria com nome do aluno e turma
- [ ] SLD-09: Seção de referências bibliográficas

**Deliverable:** Slide deck functional with Spectacle.js (React)

### Wave 2: Simulações

**Tasks:**
- [ ] SLD-05: Simulação 3D da estrutura atômica (Three.js)
- [ ] SLD-06: Simulação 2D das interações (Matter.js)
- [ ] SIM-01: Simulação 3D do átomo de Hélio e formação do íon He²⁺
- [ ] SIM-02: Simulação 2D de partículas/interações

**Deliverable:** Interactive 3D and 2D simulations integrated into slides

**Transition to Phase 3:** All slides and simulations built, integrated and functional

---

## Phase 3: Review & Deploy

**Goal:** Test, review, and deploy the final product to GitHub Pages.

### Wave 1: Testes e Revisão

**Tasks:**
- [ ] Verify all slides render correctly
- [ ] Verify simulations work (3D and 2D)
- [ ] Review content accuracy (chemistry verification)
- [ ] Add final polish and formatting
- [ ] Confirm references are complete and properly formatted

**Deliverable:** Reviewed, polished presentation ready for deployment

### Wave 2: Deploy

**Tasks:**
- [ ] Configure GitHub Pages deployment
- [ ] Push via jj version control
- [ ] Deploy using gh CLI
- [ ] Verify live URL is accessible
- [ ] Final commit and version tag

**Deliverable:** Live presentation on GitHub Pages

---

## Summary

| Phase | Waves | Requirements | Status |
|-------|-------|-------------|--------|
| Phase 1: Research | 2 waves (Domain + Tech) | RES-01 through RES-08 | ○ Pending |
| Phase 2: Build | 2 waves (Slides + Sims) | SLD-01 through SLD-09, SIM-01, SIM-02 | ○ Pending |
| Phase 3: Review & Deploy | 2 waves (Test + Deploy) | All remaining | ○ Pending |

**Total:** 3 phases, 6 waves, 27 requirements
