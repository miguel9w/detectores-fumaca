import { Deck } from "spectacle";
import { Slide } from "./Slide";
import { ChemicalInfo } from "./ChemicalInfo";
import { References } from "./References";
import { SimulationsIntegration } from "./SimulationsIntegration";

const App = () => {
  return (
    <Deck
      theme={{
        backgroundColor: "#ffffff",
        textColor: "#333333",
        headerColor: "#333333",
        footerColor: "#666666",
        logo: null,
        battery: false,
      }}
      transition={{
        name: "default",
        duration: "0.5s",
        transition: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      plugins={[]}
      knobs={{
        automaticSlides: false,
        keyboard: true,
        touch: true,
        width: 1920,
        height: 1080,
        margin: 0.1,
        minSlideWidth: 200,
        maxSlideWidth: 2000,
        presentationHeadroom: 0.1,
        presentationFootroom: 0.1,
        headroom: 0.1,
        footroom: 0.1,
      }}
    >
      <Slide title="Detectores de Fumaça e a Descoberta do Núcleo Atômico">
        <h1>Detectores de Fumaça e a Descoberta do Núcleo Atômico</h1>
      </Slide>

      <Slide title="Identificação Química do He²⁺">
        <ChemicalInfo />
      </Slide>

      <Slide title="Estrutura Subatômica: Prótons, Elétrons, Formação do Íon">
        <p>
          O íon He²⁺ é formado quando um átomo de hélio perde seus dois elétrons
          da camada 1s. Restam apenas 2 prótons no núcleo, sem elétrons em órbita.
        </p>
        <ul>
          <li>Prótons: 2 (no núcleo)</li>
          <li>Elétrons: 0 (removidos)</li>
          <li>Carga: +2</li>
        </ul>
      </Slide>

      <Slide title="Imagem Representativa do Ion He²⁺">
        <p>Representação do íon de hélio com núcleo de 2 prótons</p>
      </Slide>

      <Slide title="Autoria">
        <p>
          <strong>Nome:</strong> Estudante<br />
          <strong>Turma:</strong> Química Geral
        </p>
      </Slide>

      <Slide title="Simulações 3D e 2D">
        <SimulationsIntegration />
      </Slide>

      <Slide title="Referências">
        <References />
      </Slide>
    </Deck>
  );
};

export default App;