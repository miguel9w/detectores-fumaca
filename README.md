# Detectores de Fumaça e a Descoberta do Núcleo Atômico

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://miguel9w.github.io/detectores-fumaca/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Trabalho acadêmico de **Química Geral** — Universidade/Instituição: Ensino Médio

Uma apresentação interativa que conecta o experimento de Rutherford ao detector de fumaça do seu lar, explorando o íon **He²⁺** (hélio duplamente ionizado) como ponte entre a física nuclear e o cotidiano.

🔗 **[Acesse a apresentação ao vivo →](https://miguel9w.github.io/detectores-fumaca/)**

---

## Sobre o Projeto

Este projeto transforma conceitos complexos de estrutura atômica e detectores de fumaça em uma experiência visual e interativa, voltada para estudantes. A apresentação é construída com **Spectacle** (slides em React) e inclui simulações 3D (Three.js) e 2D (Matter.js) que explicam o funcionamento da câmara de ionização.

### Temas abordados

- **He²⁺** — o íon que provou a existência do núcleo atômico (experimento de Rutherford)
- **Detectores de fumaça iônicos** — fonte de ²⁴¹Am, câmara de ionização, princípio de funcionamento
- **Física quântica** — números quânticos, energias de ionização, tunelamento quântico
- **Aplicações** — medicina (terapia alfa-alvo), meio ambiente, fusão nuclear

---

## Slides

| # | Título |
|---|--------|
| SLD-01 | **Título** — Detectores de Fumaça e a Descoberta do Núcleo Atômico |
| SLD-02 | **Identificação Química do He²⁺** — prótons, elétrons, configuração eletrônica |
| SLD-03 | **Estrutura Subatômica** — formação do íon, números quânticos, repulsão Coulomb |
| SLD-04 | **Física Elétrica na Câmara de Ionização** — campo elétrico, mobilidade iônica |
| SLD-05 | **Fonte Alfa: ²⁴¹Am e o Decaimento** — equação, meia-vida, blindagem, segurança |
| SLD-06 | **Química Quântica: Por que He²⁺ existe?** — estrutura eletrônica, tunelamento |
| SLD-07 | **Aplicações do He²⁺** — tecnologia, saúde, meio ambiente |
| SLD-08 | **Simulações 3D e 2D** — estrutura atômica interativa + câmara de ionização |
| SLD-09 | **Autoria** — Miguel Pandini Bett, 1º ano ensino médio |
| SLD-10 | **Referências** — Rutherford, IAEA, NFPA, artigos acadêmicos |

---

## Tecnologias

| Tecnologia | Uso |
|------------|-----|
| [React](https://react.dev) | UI framework |
| [Spectacle](https://spectacle.app) | Framework de apresentações |
| [Vite](https://vitejs.dev) | Bundler e dev server |
| [Tailwind CSS](https://tailwindcss.com) | Estilização |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | Renderização 3D |
| [Three.js](https://threejs.org) | Motor gráfico 3D |
| [Matter.js](https://brm.io/matter-js/) | Simulação física 2D |
| [Playwright](https://playwright.dev) | Testes E2E |
| [gh-pages](https://github.com/gh-pages/gh-pages) | Deploy para GitHub Pages |

---

## Configuração e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org) ≥ 18
- [pnpm](https://pnpm.io) ou npm

### Instalação

```bash
npm install
```

### Servidor de desenvolvimento

```bash
npm run dev
```

Acessar em `http://localhost:5173`

### Build de produção

```bash
npm run build
```

O output fica em `dist/`.

### Preview

```bash
npm run preview
```

---

## Testes

```bash
npm run test:e2e
```

Testes E2E com Playwright — verificam canvas, renderização e interatividade das simulações.

---

## Deploy para GitHub Pages

```bash
npm run deploy
```

O comando executa `vite build` e faz o deploy do diretório `dist/` para o branch `gh-pages`.

### URLs

- **GitHub Pages:** [https://miguel9w.github.io/detectores-fumaca/](https://miguel9w.github.io/detectores-fumaca/)
- **Repositório:** [https://github.com/miguel9w/detectores-fumaca](https://github.com/miguel9w/detectores-fumaca)

---

## Estrutura do Projeto

```
detectores-fumaca/
├── index.html              # Entry point HTML
├── package.json            # Dependências e scripts
├── vite.config.js          # Configuração do Vite
├── playwright.config.js    # Configuração dos testes E2E
├── src/
│   ├── index.jsx           # Bootstrap React
│   ├── components/
│   │   ├── App.jsx         # Deck principal (Spectacle)
│   │   ├── Slide.jsx       # Componente de slide
│   │   ├── ChemicalInfo.jsx # Informações químicas do He²⁺
│   │   ├── AtomicStructure3D.jsx # Simulação 3D do átomo
│   │   ├── ParticleSimulation2D.jsx # Simulação 2D da câmara
│   │   ├── SimulationsIntegration.jsx # Integração das simulações
│   │   ├── References.jsx  # Referências bibliográficas
│   │   └── ui/             # Componentes UI auxiliares
│   ├── utils/
│   │   └── constants.jsx   # Constantes (íon, física, fonte alfa, aplicações)
│   ├── lib/
│   │   └── utils.js        # Utilitários (cn, clsx)
│   └── styles/
│       ├── tailwind.css    # Estilos Tailwind
│       └── slide-styles.css # Estilos de slides
├── tests/
│   └── e2e/                # Testes Playwright
├── dist/                   # Build output (gitignore)
└── README.md
```

---

## Dados do Íon He²⁺

| Propriedade | Valor |
|-------------|-------|
| **Símbolo** | He²⁺ |
| **Nome** | Hélio duplamente ionizado |
| **Z (prótons)** | 2 |
| **Elétrons** | 0 |
| **Nêutrons** | 2 |
| **Carga** | +2 |
| **Massa** | 6.64×10⁻²⁷ kg (4.0026 u) |
| **Configuração** | 1s⁰ (camada vazia) |
| **Energia de ionização (1ª)** | 24.6 eV / 2372 kJ/mol |
| **Energia de ionização (2ª)** | 54.4 eV / 5251 kJ/mol |
| **Energia total** | 79.0 eV / 7621 kJ/mol |

---

## Fonte Alfa (²⁴¹Am)

| Propriedade | Valor |
|-------------|-------|
| **Isótopo** | ²⁴¹Am |
| **Meia-vida** | 432.2 anos |
| **Atividade** | ~0.9 µCi (≈33 kBq) |
| **Massa** | ~0.2 µg por detector |
| **Partícula α** | 5.49 MeV (85%), 5.44 MeV (13%) |
| **γ** | 59.5 keV (36%) |
| **Decaimento** | ²⁴¹Am → ²³⁷Np + α (He²⁺) + γ |

---

## Autoria

**Miguel Pandini Bett** — 1º ano do ensino médio

Disciplina: Química Geral  
Ano: 2026  
Tema: *Detectores de Fumaça e o Núcleo Atômico*

---

## Referências

1. Rutherford, E. (1911). "The Scattering of α and β Particles by Matter and the Structure of the Atom." *Philosophical Magazine*, 21(125), 669–688.
2. National Fire Protection Association. (2020). *Smoke Detector Handbook*.
3. International Atomic Energy Agency. "Isotope Data for Helium-4." [iaea.org](https://www.iaea.org)
4. Geiger, H. & Marsden, E. (1909). "On a Diffusion Reflection of the α-Particles." *Proceedings of the Royal Society A*, 82, 495–500.

---

## Licença

MIT
