import { Deck } from "spectacle";
import { Slide } from "./Slide";
import { ChemicalInfo } from "./ChemicalInfo";
import { References } from "./References";
import { SimulationsIntegration } from "./SimulationsIntegration";

const App = () => {
  return (
    <Deck>
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