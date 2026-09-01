import { ION_PROPERTIES, CHEMICAL_INFO } from "../utils/constants";

export const ChemicalInfo = () => {
  const ion = ION_PROPERTIES;
  const info = CHEMICAL_INFO[ion.symbol];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#c9a227]/20 bg-white p-6 shadow-sm">
          <p className="revista-kicker mb-2">Identificação</p>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl font-black text-[#c9a227]">{ion.symbol}</span>
            <span className="rounded-full bg-[#0e4a7a] px-3 py-1 text-xs font-bold tracking-widest text-white">
              Z = {ion.atomicNumber} • Cátion +{ion.charge}
            </span>
          </div>
          <h3 className="mt-3 font-display text-lg font-bold text-[#0e4a7a]">{ion.name}</h3>
          <p className="text-sm text-[#1a2a3a]/70 mt-1">Elemento: {ion.elementName} — Hélio duplamente ionizado</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-[#fefcf8] border border-[#c9a227]/10 p-3">
              <dt className="text-xs uppercase tracking-widest text-[#1a2a3a]/50 font-semibold">Prótons</dt>
              <dd className="text-lg font-bold text-[#0e4a7a]">{ion.protons}</dd>
            </div>
            <div className="rounded-lg bg-[#fefcf8] border border-[#c9a227]/10 p-3">
              <dt className="text-xs uppercase tracking-widest text-[#1a2a3a]/50 font-semibold">Elétrons</dt>
              <dd className="text-lg font-bold text-[#0e4a7a]">{ion.electrons} (removidos)</dd>
            </div>
            <div className="rounded-lg bg-[#fefcf8] border border-[#c9a227]/10 p-3">
              <dt className="text-xs uppercase tracking-widest text-[#1a2a3a]/50 font-semibold">Nêutrons</dt>
              <dd className="text-lg font-bold text-[#0e4a7a]">{ion.neutrons}</dd>
            </div>
            <div className="rounded-lg bg-[#fefcf8] border border-[#c9a227]/10 p-3">
              <dt className="text-xs uppercase tracking-widest text-[#1a2a3a]/50 font-semibold">Carga</dt>
              <dd className="text-lg font-bold text-[#c9a227]">+{ion.charge}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-[#c9a227]/20 bg-white p-6 shadow-sm flex flex-col">
          <p className="revista-kicker mb-2">Configuração</p>
          <p className="font-mono text-sm bg-[#0e4a7a] text-white rounded-lg px-3 py-2 inline-block">
            {ion.electronConfiguration}
          </p>
          <p className="text-sm text-[#1a2a3a]/70 mt-3 leading-relaxed">
            He → He²⁺ + 2e⁻ — perda dos dois elétrons da camada 1s. Resta apenas o núcleo com 2 prótons.
          </p>
          {info && (
            <div className="mt-4">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#c9a227] mb-2">Aplicações</h4>
              <ul className="space-y-2">
                {info.applications.map((app, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[#1a2a3a]/80">
                    <span className="text-[#c9a227] mt-1">◆</span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChemicalInfo;
