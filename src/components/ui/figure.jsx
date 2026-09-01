import { useState } from "react";

export function Figure({ src, alt, caption, credit, aspect = "4/3", className = "", ...props }) {
  const [error, setError] = useState(false);
  const showFallback = !src || error;

  return (
    <figure
      className={`revista-figure rounded-xl overflow-hidden border border-[#c9a227]/20 shadow-sm bg-white ${className}`}
      {...props}
    >
      <div className="relative w-full overflow-hidden bg-[#fefcf8]" style={{ aspectRatio: aspect }}>
        {showFallback ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0e4a7a]/10 via-[#fefcf8] to-[#c9a227]/15 p-6 text-center">
            <div className="text-3xl mb-2 opacity-40">◈</div>
            <p className="text-xs tracking-widest uppercase text-[#0e4a7a]/50 font-semibold">
              Ilustração — He²⁺
            </p>
            <p className="text-[11px] text-[#1a2a3a]/40 mt-1 max-w-[28ch]">{alt || "Imagem ilustrativa"}</p>
          </div>
        ) : (
          <img
            src={src}
            alt={alt || caption || "Figura ilustrativa"}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setError(true)}
          />
        )}
      </div>
      {(caption || credit) && (
        <figcaption className="px-4 py-3 text-sm leading-relaxed text-[#1a2a3a]/70 bg-[#fefcf8] border-t border-[#c9a227]/10">
          {caption && <span>{caption}</span>}
          {credit && <span className="ml-2 text-xs text-[#1a2a3a]/40 italic">— {credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

export default Figure;
