import { ION_PROPERTIES, CHEMICAL_INFO } from "../utils/constants";

export const ChemicalInfo = () => {
  const ion = ION_PROPERTIES;
  const info = CHEMICAL_INFO[ion.symbol];

  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#c9a227]/20 bg-white p-4 shadow-sm">
          <p className="revista-kicker mb-1">Identificação</p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-[#c9a227]">{ion.symbol}</span>
            <span className="rounded-full bg-[#0e4a7a] px-2 py-0.5 text-xs font-bold tracking-widest text-white">
              Z = {ion.atomicNumber} • Cátion +{ion.charge}
            </span>
          </div>
          <h3 className="mt-2 font-display text-base font-bold text-[#0e4a7a]">{ion.name}</h3>
          <p className="text-xs text-[#1a2a3a]/70 mt-1">Elemento: {ion.elementName} — Hélio duplamente ionizado</p>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-[#fefcf8] border border-[#c9a227]/10 p-2">
              <dt className="text-xs uppercase tracking-widest text-[#1a2a3a]/50 font-semibold">Prótons</dt>
              <dd className="text-base font-bold text-[#0e4a7a]">{ion.protons}</dd>
            </div>
            <div className="rounded-lg bg-[#fefcf8] border border-[#c9a227]/10 p-2">
              <dt className="text-xs uppercase tracking-widest text-[#1a2a3a]/50 font-semibold">Elétrons</dt>
              <dd className="text-base font-bold text-[#0e4a7a]">{ion.electrons} (removidos)</dd>
            </div>
            <div className="rounded-lg bg-[#fefcf8] border border-[#c9a227]/10 p-2">
              <dt className="text-xs uppercase tracking-widest text-[#1a2a3a]/50 font-semibold">Nêutrons</dt>
              <dd className="text-base font-bold text-[#0e4a7a]">{ion.neutrons}</dd>
            </div>
            <div className="rounded-lg bg-[#fefcf8] border border-[#c9a227]/10 p-2">
              <dt className="text-xs uppercase tracking-widest text-[#1a2a3a]/50 font-semibold">Carga</dt>
              <dd className="text-base font-bold text-[#c9a227]">+{ion.charge}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-[#c9a227]/20 bg-white p-4 shadow-sm flex flex-col">
          <p className="revista-kicker mb-1">Configuração</p>
          <p className="font-mono text-xs bg-[#0e4a7a] text-white rounded-lg px-3 py-1.5 inline-block">
            {ion.electronConfiguration}
          </p>
          <p className="text-xs text-[#1a2a3a]/70 mt-2 leading-relaxed">
            He → He²⁺ + 2e⁻ — perda dos dois elétrons da camada 1s. Resta apenas o núcleo com 2 prótons.
          </p>
          {info && (
            <div className="mt-3">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#c9a227] mb-1">Aplicações</h4>
              <ul className="space-y-1">
                {info.applications.map((app, i) => (
                  <li key={i} className="flex gap-2 text-xs text-[#1a2a3a]/80">
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
