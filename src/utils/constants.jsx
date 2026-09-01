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

export const CHEMICAL_INFO = {
  [ION_PROPERTIES.symbol]: {
    zValue: ION_PROPERTIES.atomicNumber,
    description: "Ion de Hélio com carga +2, após a remoção de ambos os elétrons da camada 1s.",
    applications: [
      "Detectores de fumaça (ionização da fumaça)",
      "Pesquisa atmosférica",
      "Espectroscopia",
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
  presenter: "Estudante",
  turma: "Química Geral",
  revista: REVISTA_TOKENS,
};