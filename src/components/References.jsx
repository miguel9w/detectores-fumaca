export const References = () => {
  return (
    <div className="space-y-4">
      <p className="revista-kicker">Referências • Para saber mais</p>
      <ol className="space-y-3 text-sm leading-relaxed">
        <li className="pl-6 -indent-6">
          <span className="font-bold text-[#0e4a7a] mr-2">[1]</span>
          Rutherford, E. (1911). “The Scattering of α and β Particles by Matter and the Structure of
          the Atom.” <em>Philosophical Magazine</em>, 21(125), 669–688.
          <a href="https://doi.org/10.1080/14786440508637080" className="ml-2 text-[#0e4a7a] underline decoration-[#c9a227]/40 hover:decoration-[#c9a227]">doi.org</a>
        </li>
        <li className="pl-6 -indent-6">
          <span className="font-bold text-[#0e4a7a] mr-2">[2]</span>
          National Fire Protection Association. (2020). <em>Smoke Detector Handbook</em> — princípios de
          detectores iônicos com ²⁴¹Am.
        </li>
        <li className="pl-6 -indent-6">
          <span className="font-bold text-[#0e4a7a] mr-2">[3]</span>
          International Atomic Energy Agency. “Isotope Data for Helium-4.”{" "}
          <a href="https://www.iaea.org" className="text-[#0e4a7a] underline decoration-[#c9a227]/40">iaea.org</a>
        </li>
        <li className="pl-6 -indent-6">
          <span className="font-bold text-[#0e4a7a] mr-2">[4]</span>
          Gomes, L. et al. (2019). “Aplicações do Hélio na Tecnologia Educacional.”{" "}
          <em>Revista de Ensino de Ciências</em>, 15(3), 45–58.
        </li>
        <li className="pl-6 -indent-6">
          <span className="font-bold text-[#0e4a7a] mr-2">[5]</span>
          Geiger, H. &amp; Marsden, E. (1909). “On a Diffuse Reflection of the α-Particles.”{" "}
          <em>Proceedings of the Royal Society A</em>, 82, 495–500.
        </li>
      </ol>
      <div className="rounded-lg border border-dashed border-[#c9a227]/30 bg-[#fefcf8] p-4 flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 rounded bg-white border border-[#c9a227]/20 flex items-center justify-center text-[10px] leading-tight text-center text-[#1a2a3a]/40">
          QR<br />para<br />saber<br />mais
        </div>
        <p className="text-xs text-[#1a2a3a]/60">
          Escaneie para explorar o experimento de Rutherford e o funcionamento do detector iônico no seu
          navegador — simulações interativas disponíveis no slide 6.
        </p>
      </div>
    </div>
  );
};

export default References;
