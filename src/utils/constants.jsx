export const ION_PROPERTIES = {
  symbol: "He²⁺",
  name: "Hélio duplamente ionizado",
  atomicNumber: 2,
  massNumber: 4,
  protons: 2,
  neutrons: 2,
  electrons: 0,
  charge: +2,
  electronConfiguration: "1s⁰ (camada vazia — 2 elétrons removidos)",
  elementName: "Hélio",
  // Física fundamental
  massKg: "6.64×10⁻²⁷ kg (4.0026 u)",
  chargeCoulomb: "+3.204×10⁻¹⁹ C (2×e)",
  radiusFm: "~1.7 fm (núcleo)",
  // Quântica
  quantumNumbers: { n: 1, l: 0, ml: 0, ms: "— (sem elétrons)" },
  spin: "0 (bóson, núcleo par-par)",
  ionizationEnergies: { first: "2372 kJ/mol (24.59 eV)", second: "5251 kJ/mol (54.42 eV)", total: "7621 kJ/mol (79.0 eV)" },
  // Elétrica
  mobilityAir: "≈ 7×10⁻⁴ m²/(V·s) em ar seco",
  pairCreationEnergy: "≈ 34 eV/par em ar (W-value)",
};

export const PHYSICS_DETAILS = {
  coulomb: {
    title: "Lei de Coulomb e repulsão nuclear",
    formula: "F = k·q₁q₂/r² — dois prótons a 1.7 fm repelem com ~ 60 N, contidos pela força forte (~10³× maior)",
  },
  ionizationMechanism: {
    title: "Ionização por partícula α",
    description: "Cada α de 5.49 MeV cria ~1.5×10⁵ pares íon-elétron em ar (E/W ≈ 5.49 MeV / 34 eV). Núvem de carga deriva no campo E ≈ 100 V/cm da câmara.",
    current: "Corrente iônica típica sem fumaça: 10–100 pA (display mostra 85 µA escalonado p/ visualização); queda >40% dispara alarme.",
  },
  quantum: {
    title: "Estrutura quântica",
    bullets: [
      "Hélio neutro: 1s² (n=1, l=0, ml=0, ms=±½) — camada K completa, gás nobre inerte.",
      "He²⁺: 1s⁰ — camada vazia, sem elétrons para blindagem; potencial efetivo Z=2 puro, atrai elétrons com energia 54.4 eV (He⁺→He).",
      "Spin nuclear 0, estatística bosônica — não sofre princípio de exclusão como férmion.",
      "Energia de ionização total 79 eV: remover 1º e⁻ custa 24.6 eV, 2º custa 54.4 eV (elétron mais ligado ao núcleo nu).",
    ],
  },
  chargeTransport: {
    title: "Transporte elétrico na câmara",
    bullets: [
      "Campo E = V/d ≈ 9V / 0.05 m ≈ 180 V/m → deriva de íons v = μE ≈ 0.13 m/s, elétrons ~100× mais rápidos.",
      "Recombinação íon-elétron compete com coleta; ar seco minimiza.",
      "Fumaça (partículas 0.1–1 µm) captura íons por difusão e campo — mobilidade cai 1000×, corrente colapsa.",
    ],
  },
};

export const ALPHA_SOURCE = {
  isotope: "²⁴¹Am",
  halfLife: "432.2 anos",
  activity: "~0.9 µCi (≈33 kBq) por detector, massa ~0.2 µg",
  decayEquation: "²⁴¹Am → ²³⁷Np + α (He²⁺) + γ (59.5 keV)",
  alphaEnergy: "5.49 MeV (85%) e 5.44 MeV (13%) — alcance ~4 cm em ar",
  gamma: "γ 59.5 keV (36%) — fóton de baixa penetração, blindado pela carcaça plástica",
  shielding: "Papel/alumínio fino bloqueia α; carcaça ABS retém partículas dentro da câmara",
  safety: "Dose externa <1 µSv/ano a 30 cm — 100× menor que fundo natural; risco só por ingestão/inalação se fonte violada",
};

export const APPLICATIONS_DETAIL = {
  tecnologia: {
    title: "Tecnologia — Detectores iônicos",
    points: [
      "Câmara dual: câmara aberta (exposta) vs referência selada — compara corrente e cancela variação de umidade/pressão.",
      "Resposta em <10 s para partículas de combustão; detecta flaming fires melhor que fotoelétrico, mas sensível a vapor e poeira (causa falsos alarmes).",
      "Vida útil 10 anos — limitada por decaimento Am (≈1.6% perda em 10 anos) e deposição de poeira na câmara.",
    ],
  },
  saude: {
    title: "Saúde — Terapia com partículas α",
    points: [
      "Terapia alfa-alvo (TAT): ²²⁵Ac, ²¹³Bi, ²²³Ra emitem α (He²⁺) com LET 80–100 keV/µm — destroem DNA de célula cancerosa em <100 µm, poupando tecido sadio.",
      "RBE (eficácia biológica relativa) 3–7× maior que raio X; usado em câncer de próstata metastático (Xofigo®).",
      "Hélio líquido (4.2 K) resfria bobinas supercondutoras de MRI — 30% do uso mundial de He.",
    ],
  },
  meioAmbiente: {
    title: "Meio Ambiente & Indústria",
    points: [
      "Traçador atmosférico: razão ³He/⁴He data águas subterrâneas e manto terrestre; detecta vazamento de gás natural.",
      "Detecção de vazamentos: sonda He puro + espectrômetro de massa acha furos de 10⁻⁹ mbar·L/s em dutos e vasos de pressão.",
      "Fusão nuclear: D + T → He²⁺ (α 3.5 MeV) + n — α aquece o plasma; He²⁺ é cinza de reator ITER.",
    ],
  },
};

export const CHEMICAL_INFO = {
  [ION_PROPERTIES.symbol]: {
    zValue: ION_PROPERTIES.atomicNumber,
    description: "Íon de hélio com carga +2, após a remoção de ambos os elétrons da camada 1s. Núcleo nu com Z=2 puro.",
    applications: [
      "Detectores de fumaça por ionização (câmara α)",
      "Traçador isotópico e detecção de vazamentos",
      "Terapia alfa-alvo e MRI (He líquido)",
      "Produto da fusão D-T e sondagem de plasma",
    ],
  },
};

export const REVISTA_TOKENS = {
  bg: "#fefcf8",
  blue: "#0e4a7a",
  gold: "#c9a227",
  ink: "#1a2a3a",
};

export const SLIDE_CONFIG = {
  title: "Detectores de Fumaça e a Descoberta do Núcleo Atômico",
  theme: "átomo de Hélio",
  presenter: "Miguel Pandini Bett",
  turma: "101 aluno",
  revista: REVISTA_TOKENS,
};