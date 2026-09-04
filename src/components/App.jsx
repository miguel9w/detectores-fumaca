
import { Deck } from "spectacle";
import { Slide } from "./Slide";
import { ChemicalInfo } from "./ChemicalInfo";
import { References } from "./References";
import { SimulationsIntegration } from "./SimulationsIntegration";
import { Figure } from "./ui/figure";
import { ION_PROPERTIES, PHYSICS_DETAILS, ALPHA_SOURCE, APPLICATIONS_DETAIL } from "../utils/constants";

const App = () => {
  return (
    <Deck
      theme={{
        colors: { primary: "#fefcf8", secondary: "#0e4a7a", tertiary: "#c9a227" },
        size: { width: 1366, height: 768, maxCodePaneHeight: 200 },
      }}
    >
        {/* SLD-01 Título */}
        <Slide title="Detectores de Fumaça e a Descoberta do Núcleo Atômico">
          <div className="space-y-3">
            <div className="text-center">
              <h1 className="font-display text-2xl md:text-4xl font-black text-[#0e4a7a] leading-tight mt-1">
                Detectores de Fumaça
                <span className="block text-[#c9a227] text-xl md:text-2xl font-bold mt-1">
                  e a Descoberta do Núcleo Atômico
                </span>
              </h1>
              <p className="mt-2 text-xs md:text-sm text-[#1a2a3a]/60 max-w-2xl mx-auto leading-relaxed">
                Do experimento de Rutherford ao sensor da sua casa — a jornada do íon He²⁺
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c9a227]/20 bg-[#fefcf8] px-4 py-1 text-xs">
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
              aspect="21/9"
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
              aspect="21/9"
            />
          </div>
        </Slide>

        {/* SLD-03 Estrutura Subatômica — Química & Quântica */}
        <Slide title="Estrutura Subatômica: Prótons, Elétrons, Formação do Íon">
          <div className="grid md:grid-cols-5 gap-4 items-start">
            <div className="md:col-span-3 space-y-3 text-xs leading-relaxed text-[#1a2a3a]/80">
              <p>
                O íon <strong className="text-[#0e4a7a]">He²⁺</strong> surge quando o hélio neutro
                (1s²) perde os dois elétrons da camada <em>K</em>. Sem blindagem eletrônica, resta
                o núcleo nu com <strong>Z=2</strong> e carga +2 — quimicamente é uma partícula α.
              </p>
              <div className="rounded-xl bg-[#0e4a7a] text-white p-3 font-mono text-center text-xs">
                <div className="font-bold">He (1s²) → He²⁺ (1s⁰) + 2e⁻</div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-[11px] font-sans">
                  <span className="rounded bg-white/10 px-2 py-1">1ª EI: 24.6 eV<br/>2372 kJ/mol</span>
                  <span className="rounded bg-white/10 px-2 py-1">2ª EI: 54.4 eV<br/>5251 kJ/mol</span>
                  <span className="rounded bg-[#c9a227] text-[#0e4a7a] font-bold px-2 py-1">Total 79.0 eV<br/>7621 kJ/mol</span>
                </div>
              </div>
              <div className="rounded-lg border border-[#c9a227]/15 bg-[#fefcf8] p-3">
                <p className="text-[11px] font-bold tracking-widest uppercase text-[#c9a227] mb-1">Números quânticos (Hélio neutro)</p>
                <div className="grid grid-cols-4 gap-1 text-[11px] text-center">
                  <span className="rounded bg-white border border-[#c9a227]/10 p-1.5"><b>n=1</b><br/>K</span>
                  <span className="rounded bg-white border border-[#c9a227]/10 p-1.5"><b>l=0</b><br/>s</span>
                  <span className="rounded bg-white border border-[#c9a227]/10 p-1.5"><b>ml=0</b><br/>—</span>
                  <span className="rounded bg-white border border-[#c9a227]/10 p-1.5"><b>ms=±½</b><br/>↑↓</span>
                </div>
                <p className="text-[11px] mt-1.5 text-[#1a2a3a]/60">He²⁺: 1s⁰ — sem elétrons, sem números quânticos eletrônicos; spin nuclear 0 (par-par, bóson).</p>
              </div>
              <ul className="space-y-1 text-xs">
                <li className="flex gap-2"><span className="text-[#c9a227]">◆</span><span><strong>Raio nuclear:</strong> ~1.7 fm; massa {ION_PROPERTIES.massKg}</span></li>
                <li className="flex gap-2"><span className="text-[#c9a227]">◆</span><span><strong>Carga:</strong> {ION_PROPERTIES.chargeCoulomb} — repulsão Coulomb ~60 N a 1.7 fm, contida pela força forte</span></li>
              </ul>
            </div>
            <div className="md:col-span-2 space-y-3">
              <Figure
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rutherford_scattering.svg/640px-Rutherford_scattering.svg.png"
                alt="Espalhamento de Rutherford — partículas alfa desviadas pelo núcleo"
                caption="Espalhamento de Rutherford: partículas α (He²⁺) desviadas — prova do núcleo."
                credit="Wikimedia Commons"
                aspect="4/3"
              />
              <div className="rounded-lg bg-[#0e4a7a]/5 border border-[#0e4a7a]/10 p-2 text-[11px] text-[#0e4a7a]">
                <strong>Por que He é inerte, mas He²⁺ é reativo?</strong> Camada 1s² completa tem alta EI; sem elétrons, He²⁺ atrai fortemente elétrons (afinidade efetiva 54.4 eV).
              </div>
            </div>
          </div>
        </Slide>

        {/* SLD-04 Imagem Representativa + Física Elétrica */}
        <Slide title="Física Elétrica na Câmara de Ionização">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Figure
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Helium_nucleus.jpg/640px-Helium_nucleus.jpg"
                alt="Representação artística do núcleo de hélio com 2 prótons"
                caption="He²⁺ — núcleo nu com 2 prótons; indistinguível da partícula α."
                credit="Wikimedia Commons"
                aspect="21/9"
              />
              <div className="rounded-xl bg-white border border-[#c9a227]/15 p-3 text-xs leading-relaxed">
                <p className="font-bold text-[#0e4a7a] mb-1">Como a corrente surge?</p>
                <p className="text-[#1a2a3a]/70">{PHYSICS_DETAILS.ionizationMechanism.description}</p>
                <div className="mt-2 rounded bg-[#fefcf8] border border-[#c9a227]/10 p-2 font-mono text-[11px] text-center">
                  I<sub>sem fumaça</sub> ≈ 85 (escalonado) → queda &gt;40% ⇒ Alarme ON
                </div>
              </div>
            </div>
            <div className="space-y-3 text-xs leading-relaxed text-[#1a2a3a]/80">
              <div className="rounded-xl border border-[#0e4a7a]/10 bg-[#0e4a7a] text-white p-3">
                <p className="text-[11px] tracking-widest uppercase font-bold opacity-80">Campo e mobilidade</p>
                <p className="mt-1 font-mono text-[11px]">E = V/d ≈ 9V / 5cm ≈ 180 V/m</p>
                <p className="mt-1 text-xs leading-relaxed opacity-90">v<sub>íon</sub> = μE ≈ 0.13 m/s; v<sub>e⁻</sub> ≈ 100× maior — elétrons coletados em µs, íons em ms. Mobilidade μ ≈ {ION_PROPERTIES.mobilityAir}.</p>
              </div>
              <ul className="space-y-1.5">
                {PHYSICS_DETAILS.chargeTransport.bullets.map((b,i)=>(
                  <li key={i} className="flex gap-2"><span className="text-[#c9a227]">◆</span><span>{b}</span></li>
                ))}
              </ul>
              <div className="rounded-lg bg-[#c9a227]/10 border border-[#c9a227]/20 p-2 text-[11px]">
                <strong>Coulomb:</strong> {PHYSICS_DETAILS.coulomb.formula} — núcleo estável por força forte 10³× maior que repulsão eletrostática.
              </div>
            </div>
          </div>
        </Slide>

        {/* SLD-07 Aplicações He²⁺ — aprofundado */}
        <Slide title="Aplicações do He²⁺ na Tecnologia, Saúde e Meio Ambiente">
          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl border border-[#c9a227]/20 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#c9a227] mb-1">{APPLICATIONS_DETAIL.tecnologia.title}</p>
              <ul className="space-y-1.5 text-[#1a2a3a]/70 leading-relaxed">
                {APPLICATIONS_DETAIL.tecnologia.points.map((p,i)=><li key={i} className="flex gap-1.5"><span className="text-[#c9a227]">◆</span><span>{p}</span></li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-[#c9a227]/20 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#c9a227] mb-1">{APPLICATIONS_DETAIL.saude.title}</p>
              <ul className="space-y-1.5 text-[#1a2a3a]/70 leading-relaxed">
                {APPLICATIONS_DETAIL.saude.points.map((p,i)=><li key={i} className="flex gap-1.5"><span className="text-[#c9a227]">◆</span><span>{p}</span></li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-[#c9a227]/20 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#c9a227] mb-1">{APPLICATIONS_DETAIL.meioAmbiente.title}</p>
              <ul className="space-y-1.5 text-[#1a2a3a]/70 leading-relaxed">
                {APPLICATIONS_DETAIL.meioAmbiente.points.map((p,i)=><li key={i} className="flex gap-1.5"><span className="text-[#c9a227]">◆</span><span>{p}</span></li>)}
              </ul>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-[#0e4a7a] text-white p-3 text-xs text-center">
            <span className="font-bold">Conexão:</span> He²⁺ da fusão D-T (ITER) ≡ He²⁺ do detector — mesmo núcleo, energias 3.5 MeV vs 5.5 MeV, física idêntica.
          </div>
        </Slide>

        {/* SLD-NEW Fonte Alfa e Decaimento */}
        <Slide title="Fonte Alfa: ²⁴¹Am e o Decaimento">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="rounded-xl bg-[#0e4a7a] text-white p-4 text-center">
                <p className="text-[11px] tracking-widest uppercase opacity-70">Equação de decaimento</p>
                <p className="font-mono text-sm font-bold mt-1">{ALPHA_SOURCE.decayEquation}</p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
                  <span className="rounded bg-white/10 p-2">α: {ALPHA_SOURCE.alphaEnergy}</span>
                  <span className="rounded bg-white/10 p-2">γ: {ALPHA_SOURCE.gamma}</span>
                </div>
              </div>
              <div className="rounded-xl border border-[#c9a227]/20 bg-white p-3 text-xs leading-relaxed text-[#1a2a3a]/80">
                <p className="font-bold text-[#0e4a7a]">O que é decaimento alfa?</p>
                <p className="mt-1">Núcleo pesado emite aglomerado 2p+2n (He²⁺) por tunelamento quântico — barreira Coulomb. <sup>241</sup>Am (Z=95) → <sup>237</sup>Np (Z=93) + α; Q ≈ 5.64 MeV, α leva 5.49 MeV, recuo do Np leva 0.09 MeV.</p>
                <p className="mt-2 text-[11px] text-[#1a2a3a]/60">Meia-vida {ALPHA_SOURCE.halfLife} — decai 1.6% em 10 anos, por isso detector dura 10 anos sem recarga. Atividade {ALPHA_SOURCE.activity}.</p>
              </div>
            </div>
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="rounded-xl border border-[#c9a227]/20 bg-[#fefcf8] p-3">
                <p className="font-bold text-[#0e4a7a] mb-1">Por que amerício?</p>
                <ul className="space-y-1 text-[#1a2a3a]/70">
                  <li className="flex gap-2"><span className="text-[#c9a227]">◆</span><span>Produzido em reator: <sup>239</sup>Pu + 2n → <sup>241</sup>Pu → β⁻ → <sup>241</sup>Am.</span></li>
                  <li className="flex gap-2"><span className="text-[#c9a227]">◆</span><span>α de 4 cm em ar ioniza exatamente o volume da câmara (≈ 5 cm) — otimizado.</span></li>
                  <li className="flex gap-2"><span className="text-[#c9a227]">◆</span><span>γ 59.5 keV é útil para autocalibração, mas baixa dose.</span></li>
                </ul>
              </div>
              <div className="rounded-xl border border-[#c9a227]/15 bg-white p-3">
                <p className="font-bold text-[#0e4a7a] mb-1">Segurança e blindagem</p>
                <p className="text-[#1a2a3a]/70">{ALPHA_SOURCE.shielding}. {ALPHA_SOURCE.safety}.</p>
                <div className="mt-2 rounded bg-[#c9a227]/10 p-2 text-[11px] text-center font-semibold text-[#0e4a7a]">
                  Camada dourada de {ALPHA_SOURCE.isotope} (0.2 µg) selada em matriz cerâmica + folha de ouro
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLD-NEW Física Quântica aprofundada */}
        <Slide title="Química Quântica: Por que He²⁺ existe?">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3 text-xs leading-relaxed text-[#1a2a3a]/80">
              <div className="rounded-xl border border-[#0e4a7a]/10 bg-white p-3">
                <p className="text-[11px] font-bold tracking-widest uppercase text-[#0e4a7a]">Quântica do He neutro vs He²⁺</p>
                <ul className="mt-2 space-y-1.5">
                  {PHYSICS_DETAILS.quantum.bullets.map((b,i)=><li key={i} className="flex gap-2"><span className="text-[#c9a227]">◆</span><span>{b}</span></li>)}
                </ul>
              </div>
              <div className="rounded-lg bg-[#fefcf8] border border-[#c9a227]/15 p-2 text-[11px]">
                <strong>Insight:</strong> Sem elétrons, He²⁺ não tem química covalente — interage só por Coulomb e como projétil nuclear. Por isso Rutherford o usou para sondar o núcleo.
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-[#0e4a7a] text-white p-4">
                <p className="text-[11px] tracking-widest uppercase opacity-70">Escala de energia</p>
                <div className="mt-2 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between rounded bg-white/10 px-2 py-1"><span>He → He⁺</span><span>24.6 eV</span></div>
                  <div className="flex justify-between rounded bg-white/10 px-2 py-1"><span>He⁺ → He²⁺</span><span>54.4 eV</span></div>
                  <div className="flex justify-between rounded bg-[#c9a227] text-[#0e4a7a] font-bold px-2 py-1"><span>α ²⁴¹Am</span><span>5.49 MeV (70.000× maior)</span></div>
                </div>
                <p className="text-[11px] mt-2 opacity-80">α tem energia 10⁵× maior que química — ioniza 150 mil moléculas por trilha.</p>
              </div>
              <div className="rounded-xl border border-[#c9a227]/20 bg-white p-3 text-xs">
                <p className="font-bold text-[#0e4a7a]">Tunelamento quântico</p>
                <p className="text-[#1a2a3a]/70 mt-1">α preso por barreira ~25 MeV escapa por tunelamento — probabilidade define meia-vida de 432 anos. Gamow explicou em 1928 usando Schrödinger.</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* SLD-08 Autoria */}
        <Slide title="Autoria">
          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl border-2 border-[#c9a227]/20 bg-white p-8 shadow-sm text-center">
              <p className="revista-kicker mb-4">Trabalho Acadêmico — Química Geral</p>
              <div className="h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent mb-6" />
              <p className="font-display text-2xl font-bold text-[#0e4a7a]">Miguel Pandini Bett</p>
              <p className="text-sm text-[#1a2a3a]/60 mt-1">101 aluno</p>
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
  );
};

export default App;
