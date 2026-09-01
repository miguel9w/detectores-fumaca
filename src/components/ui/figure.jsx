import { useState } from "react";

function HeliumDiagramSVG() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full h-full"
      role="img"
      aria-label="Diagrama He²⁺"
    >
      <circle cx="100" cy="60" r="18" fill="#c9a227" stroke="#0e4a7a" strokeWidth="2" />
      <circle cx="93" cy="56" r="6" fill="#ff6b6b" />
      <circle cx="107" cy="64" r="6" fill="#ff6b6b" />
      <ellipse
        cx="100"
        cy="60"
        rx="42"
        ry="42"
        fill="none"
        stroke="#0e4a7a"
        strokeWidth="0.8"
        strokeDasharray="4 3"
        opacity="0.25"
      />
      <text x="100" y="88" textAnchor="middle" fontSize="7" fill="#0e4a7a" fontWeight="700">
        He²⁺ Z=2 +2
      </text>
      <text x="100" y="98" textAnchor="middle" fontSize="6" fill="#1a2a3a" opacity="0.6">
        1s⁰ — sem elétrons
      </text>
    </svg>
  );
}

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
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#fefcf8] p-4">
            <HeliumDiagramSVG />
            <p className="text-[11px] text-[#1a2a3a]/40 mt-1 max-w-[28ch] text-center">{alt || "Ilustração He²⁺"}</p>
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
