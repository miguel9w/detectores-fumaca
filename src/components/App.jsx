import { Deck } from "spectacle";
import { Slide } from "./Slide";
import { ChemicalInfo } from "./ChemicalInfo";
import { References } from "./References";
import { SimulationsIntegration } from "./SimulationsIntegration";
import { Figure } from "./ui/figure";

const App = () => {
  return (
    <div className="min-h-screen bg-[#fefcf8]">
      <Deck theme={{ colors: { primary: "#fefcf8", secondary: "#0e4a7a", tertiary: "#c9a227" } }}>
        {/* SLD-01 Título */}
        <Slide title="Detectores de Fumaça e a Descoberta do Núcleo Atômico" kicker="Química Geral • Revista Científica Ilustrada">
          <div className="space-y-5">
            <div className="text-center">
              <p className="revista-kicker">Química Geral • Revista Científica Ilustrada</p>
              <h1 className="font-display text-3xl md:text-5xl font-black text-[#0e4a7a] leading-tight mt-2">
                Detectores de Fumaça
                <span className="block text-[#c9a227] text-2xl md:text-3xl font-bold mt-1">
                  e a Descoberta do Núcleo Atômico
                </span>
              </h1>
              <p className="mt-3 text-sm md:text-base text-[#1a2a3a]/60 max-w-2xl mx-auto leading-relaxed">
                Do experimento de Rutherford ao sensor da sua casa — a jornada do íon He²⁺
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c9a227]/20 bg-[#fefcf8] px-4 py-1.5 text-xs">
                <span className="h-2 w-2 rounded-full bg-[#c9a227] animate-pulse" />
                <span className="font-bold tracking-widest text-[#0e4a7a]">He²⁺</span>
                <span className="text-[#1a2a3a]/50">• Z=2 • Cátion +2</span>
              </div>
            </div>
            <Figure
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Smoke_detector_01.jpg/640px-Smoke_detector_01.jpg"
              alt="Detector de fumaça iônico residencial"
              caption="Detector iônico residencial — fonte ²⁴¹Am ioniza o ar continuamente; fumaça interrompe a corrente e dispara o alarme."
              credit="Wikimedia Commons / CC BY-SA"
              aspect="16/9"
            />
          </div>
        </Slide>

        {/* SLD-02 Identificação */}
        <Slide title="Identificação Química do He²⁺">
          <ChemicalInfo />
          <div className="mt-4">
            <Figure
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Helium_atom_QM.svg/640px-Helium_atom_QM.svg.png"
              alt="Estrutura eletrônica do átomo de hélio"
              caption="Átomo de hélio neutro (He) com 2 prótons, 2 nêutrons e 2 elétrons na camada 1s — ao perder ambos os elétrons torna-se He²⁺."
              credit="Wikimedia Commons"
              aspect="16/9"
            />
          </div>
        </Slide>

        {/* SLD-03 Estrutura Subatômica */}
        <Slide title="Estrutura Subatômica: Prótons, Elétrons, Formação do Íon">
          <div className="grid md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-3 space-y-4 text-sm leading-relaxed text-[#1a2a3a]/80">
              <p>
                O íon <strong className="text-[#0e4a7a]">He²⁺</strong> é formado quando um átomo de hélio
                perde seus dois elétrons da camada <em>1s</em>. Restam apenas{" "}
                <strong>2 prótons no núcleo</strong>, sem elétrons em órbita — carga resultante +2.
              </p>
              <div className="rounded-xl bg-[#0e4a7a] text-white p-4 font-mono text-center text-sm">
                He → He²⁺ + 2e⁻
                <span className="block text-xs font-sans text-white/60 mt-1">1s² → 1s⁰ (camada vazia)</span>
              </div>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-[#c9a227]">◆</span>
                  <span>
                    <strong>Prótons:</strong> 2 (no núcleo) — definem Z=2
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#c9a227]">◆</span>
                  <span>
                    <strong>Elétrons:</strong> 0 (removidos) — cátion
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#c9a227]">◆</span>
                  <span>
                    <strong>Nêutrons:</strong> 2 (isótopo ⁴He mais comum)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#c9a227]">◆</span>
                  <span>
                    <strong>Carga:</strong> +2 — partícula α do experimento de Rutherford
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <Figure
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rutherford_scattering.svg/640px-Rutherford_scattering.svg.png"
                alt="Espalhamento de Rutherford — partículas alfa desviadas pelo núcleo"
                caption="Espalhamento de Rutherford: partículas α (He²⁺) desviadas pelo núcleo atômico — evidência da estrutura nuclear."
                credit="Wikimedia Commons"
                aspect="4/3"
              />
            </div>
          </div>
        </Slide>

        {/* SLD-04 Imagem Representativa */}
        <Slide title="O Íon He²⁺ em Detalhe">
          <Figure
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Helium_nucleus.jpg/640px-Helium_nucleus.jpg"
            alt="Representação artística do núcleo de hélio com 2 prótons"
            caption="Representação artística do íon He²⁺ — núcleo com 2 prótons (vermelho) sem elétrons em órbita. Escala e cores ilustrativas, não reais."
            credit="Wikimedia Commons / Ilustração didática"
            aspect="16/9"
          />
          <p className="text-xs text-center text-[#1a2a3a]/50 mt-3 italic">
            Nota: He²⁺ é indistinguível de uma partícula α — núcleo de hélio nu, altamente energético.
          </p>
        </Slide>

        {/* SLD-07 Aplicações He²⁺ */}
        <Slide title="Aplicações do He²⁺ na Tecnologia, Saúde e Meio Ambiente">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl border border-[#c9a227]/20 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-[#c9a227] mb-2">Tecnologia</p>
              <h4 className="font-display font-bold text-[#0e4a7a] mb-2">Detectores de Fumaça</h4>
              <p className="text-[#1a2a3a]/70 leading-relaxed">
                Fonte ²⁴¹Am emite partículas α (He²⁺) que ionizam o ar na câmara; corrente iônica
                contínua monitorada — fumaça captura íons, corrente cai, alarme dispara.
              </p>
            </div>
            <div className="rounded-xl border border-[#c9a227]/20 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-[#c9a227] mb-2">Saúde</p>
              <h4 className="font-display font-bold text-[#0e4a7a] mb-2">Radioterapia e Pesquisa</h4>
              <p className="text-[#1a2a3a]/70 leading-relaxed">
                Feixes de He²⁺ (partículas α) usados em terapia alvo e estudos de dano ao DNA; hélio
                líquido resfria magnetos de ressonância magnética.
              </p>
            </div>
            <div className="rounded-xl border border-[#c9a227]/20 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold tracking-widest uppercase text-[#c9a227] mb-2">Meio Ambiente</p>
              <h4 className="font-display font-bold text-[#0e4a7a] mb-2">Atmosfera e Datação</h4>
              <p className="text-[#1a2a3a]/70 leading-relaxed">
                Traçador atmosférico e em datação geológica; detecção de vazamentos e monitoramento de
                gases nobres na atmosfera.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-[#fefcf8] border border-[#c9a227]/20 p-3 text-xs text-[#1a2a3a]/60 text-center">
            He²⁺ conecta a descoberta do núcleo (1911) ao dispositivo que protege milhões de lares hoje.
          </div>
        </Slide>

        {/* SLD-08 Autoria */}
        <Slide title="Autoria">
          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl border-2 border-[#c9a227]/20 bg-white p-8 shadow-sm text-center">
              <p className="revista-kicker mb-4">Trabalho Acadêmico — Química Geral</p>
              <div className="h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent mb-6" />
              <p className="font-display text-2xl font-bold text-[#0e4a7a]">Miguel Pandini Bett</p>
              <p className="text-sm text-[#1a2a3a]/60 mt-1">1 ano ensino médio</p>
              <p className="text-sm text-[#1a2a3a]/60">Disciplina: Química Geral • Professor(a)</p>
              <p className="text-xs text-[#1a2a3a]/40 mt-2">2026 • Detectores de Fumaça e o Núcleo Atômico</p>
              <div className="mt-6 flex justify-center gap-2">
                <span className="h-1 w-12 rounded-full bg-[#c9a227]/40" />
                <span className="h-1 w-4 rounded-full bg-[#0e4a7a]/30" />
                <span className="h-1 w-12 rounded-full bg-[#c9a227]/40" />
              </div>
            </div>
          </div>
        </Slide>

        {/* SLD-05/06 Simulações */}
        <Slide title="Simulações 3D e 2D">
          <p className="text-sm text-[#1a2a3a]/60 text-center mb-4 max-w-prose mx-auto">
            Explore os dois modelos interativos: estrutura atômica em 3D e o funcionamento da câmara de
            ionização do detector em 2D.
          </p>
          <SimulationsIntegration />
        </Slide>

        {/* SLD-09 Referências */}
        <Slide title="Referências">
          <References />
        </Slide>
      </Deck>
    </div>
  );
};

export default App;
