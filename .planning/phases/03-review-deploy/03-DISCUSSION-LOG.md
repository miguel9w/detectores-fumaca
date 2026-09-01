# Phase 3: Review & Deploy - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-01
**Phase:** 3-Review & Deploy
**Areas discussed:** Critério de "pronto", Polimento final e placeholders, Estratégia de deploy, Verificação pós-deploy

---

## Critério de "pronto"

| Option | Description | Selected |
|--------|-------------|----------|
| Visual + sem erros | Slides bonitos (revista #fefcf8/#0e4a7a), build + Playwright 3/3 verde — conteúdo químico confia no que já está | |
| Visual + química precisa | Além do visual, He²⁺ com Z=2, carga +2, 1s⁰, prótons 2/nêutrons 2 e aplicações (detectores Am-241, saúde, ambiente) revisados | |
| Tudo + simulações vivas | Também exige órbita 3D girando, câmara 2D com Inserir Fumaça/drag/gauge e tabs trocando sem quebrar | ✓ |

**User's choice:** Tudo + simulações vivas
**Notes:** User wants full definition of done including live simulations.

| Option | Description | Selected |
|--------|-------------|----------|
| Auto-play total | 3D órbita já girando e 2D já com partículas se movendo — usuário só observa | ✓ |
| Híbrido (recomendado) | 3D gira sozinha, 2D começa vazia e ganha vida com 'Inserir Fumaça' / drag — mostra causa-efeito | |
| Só por botão | Nada anima até clicar Play — mais controle, mas menos impacto inicial | |

**User's choice:** Auto-play total
**Notes:** Both simulations should animate immediately on slide open.

| Option | Description | Selected |
|--------|-------------|----------|
| Só texto do slide | Confere o que o estudante lê: Z, carga, prótons, aplicações — constants é detalhe interno | |
| Texto + constants | Garante que ION_PROPERTIES (Z=2, p=2, n=2, e=0, 1s⁰) bate com o slide — evita divergência | ✓ |
| Deixa pro pesquisador | Downstream researcher valida Rutherford/Am-241, você só valida visual + sim | |

**User's choice:** Texto + constants
**Notes:** Chemistry accuracy must match between visible text and code constants.

| Option | Description | Selected |
|--------|-------------|----------|
| Bloqueia deploy | Nada vai pro Pages até tudo estar verde — rigor total | |
| Avisa e deploya | Sobe com nota de débito (foto fallback, degrade gracioso) e corrige depois | ✓ |
| Auto-fallback conta como pass | Se Figure mostra gradiente + WebGL fallback, já é considerado ok | |

**User's choice:** Avisa e deploya
**Notes:** Minor slips should not block deploy if graceful degradation exists.

---

## Polimento final e placeholders

| Option | Description | Selected |
|--------|-------------|----------|
| Manter placeholder | Deixa 'Estudante' genérico — professor preenche depois, sem bloqueio | |
| Pedir dados agora | Você informa nome/turma/professor agora e eu gravo em constants.jsx e no slide | ✓ |
| Campos editáveis no slide | Deixa inputs visuais no slide para preencher na hora da apresentação | |

**User's choice:** miguel pandini bett, 1 ano ecino medio
**Notes:** Free-text provided, normalized to "Miguel Pandini Bett, 1 ano ensino médio"

| Option | Description | Selected |
|--------|-------------|----------|
| Gradiente + legenda já basta | Fallback colorido com texto 'Foto: detector / câmara' conta como polido | |
| SVG diagrama no lugar | Substitui foto por diagrama vetorial do He²⁺/detector — mais informativo | ✓ |
| Tenta carregar e avisa | Mostra spinner, se falhar exibe 'imagem indisponível' discreto | |

**User's choice:** SVG diagrama no lugar

| Option | Description | Selected |
|--------|-------------|----------|
| Só preencher autoria | Só troca 'Estudante' por Miguel Pandini Bett / 1º ano Ensino Médio, o resto já está bom | |
| Autoria + tipografia fina | Além da autoria, ajusta espaçamento, contraste, e garante 4 Figures com fotos/SVG + legendas | |
| Revisão completa | Revisar todos os 7 slides, corrigir ortografia, padronizar refs e checar contraste WCAG | ✓ |

**User's choice:** Revisão completa

| Option | Description | Selected |
|--------|-------------|----------|
| Manter 5 refs atuais | Rutherford 1911, NFPA 2020, IAEA, Gomes 2019, Geiger 1909 já cobrem — só formata | ✓ |
| Adicionar fontes extras | Inclui link IAEA He-4 e manual detector com URL clicável + QR | |
| Simplificar | Deixa só 3 refs essenciais para caber bem no slide sem poluir | |

**User's choice:** Manter 5 refs atuais

---

## Estratégia de deploy

| Option | Description | Selected |
|--------|-------------|----------|
| gh-pages branch direto | Roda 'npx gh-pages -d dist' local — simples, já configurado em package.json deploy | |
| GitHub Actions workflow | Cria .github/workflows/pages.yml que builda e publica a cada push em main — automático | |
| Tanto faz se subir | O que for mais rápido pra entregar, sem preferência técnica | ✓ |

**User's choice:** Tanto faz se subir

| Option | Description | Selected |
|--------|-------------|----------|
| Confiar no que está | vite base + homepage já garantem assets em /detectores-fumaca/ — sem checagem extra | |
| Checar dist/index.html | Após build, garante que <script src="/detectores-fumaca/assets/..."> existe antes de publicar | ✓ |
| Testar URL real após push | Depois de publicar, abre https://miguel.github.io/detectores-fumaca/ e valida | |

**User's choice:** Checar dist/index.html

| Option | Description | Selected |
|--------|-------------|----------|
| Commit docs automático | Cada deploy gera commit 'chore(deploy): publish' na branch — rastreável | ✓ |
| Só publica, sem commit extra | gh-pages publica direto, sem poluir log — histórico limpo | |
| Tag de release | Cria tag v1.0 no commit de deploy para marcar entrega ao professor | |

**User's choice:** Commit docs automático

| Option | Description | Selected |
|--------|-------------|----------|
| Tenta gh-pages e avisa | Roda npx gh-pages, se falhar mostra erro e orienta configurar token — não bloqueia review | ✓ |
| Bloqueia como falha | Falha no deploy = fase não completa, precisa corrigir permissão antes de marcar feito | |
| Publica local e entrega zip | Gera dist/ zip como fallback para professor mesmo sem Pages | |

**User's choice:** Tenta gh-pages e avisa

---

## Verificação pós-deploy

| Option | Description | Selected |
|--------|-------------|----------|
| Só Playwright local | Roda 3 testes em localhost:4173 (build + canvas>=2 + no console errors) — rápido | ✓ |
| Local + URL real | Roda Playwright local e depois abre https://miguel.github.io/detectores-fumaca/ para checar manualmente | |
| Só URL real | Ignora local, valida direto no Pages — mais fiel ao professor | |

**User's choice:** Só Playwright local

| Option | Description | Selected |
|--------|-------------|----------|
| Só pageerror + console.error | Ignora warnings de chunk >500kB e warn de Three/Matter — só falha se quebrar | |
| Inclui warnings | Qualquer warn também reprova — mais rigoroso, mas pode gerar falso positivo | ✓ |
| Lista mas não bloqueia | Mostra warnings no relatório, mas só error bloqueia o 'pronto' | |

**User's choice:** Inclui warnings

| Option | Description | Selected |
|--------|-------------|----------|
| 2 fixos | Sempre 2 (3D + 2D) visíveis via Tabs — simples | ✓ |
| 1 por tab ativa | Basta 1 visível na tab aberta, pois tabs escondem o outro com hidden — mais fiel ao CSS | |
| 2 montados mesmo hidden | Conta 2 no DOM mesmo se hidden — garante que Tabs não desmontou WebGL | |

**User's choice:** 2 fixos

| Option | Description | Selected |
|--------|-------------|----------|
| Só Playwright verde | 3/3 passando já é suficiente para marcar Review & Deploy como feito | |
| Playwright + build log | Inclui npx vite build log + Playwright — prova que 1427 módulos e assets geraram | |
| Tudo + screenshot | Salva screenshot do deck + log de console + build — entrega completa ao professor | ✓ |

**User's choice:** Tudo + screenshot

---

## Agent's Discretion

No areas where user said "you decide" — all selections were explicit.

## Deferred Ideas

None — discussion stayed within phase scope.
