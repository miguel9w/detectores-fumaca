import { Slide as SpectacleSlide } from "spectacle";

export const Slide = ({ title, kicker, children, ...props }) => {
  return (
    <SpectacleSlide title={title} speakerNotes={props.speakerNotes} {...props}>
      <div className="revista-slide h-full max-h-full overflow-hidden bg-[#fefcf8] text-[#1a2a3a] flex flex-col box-border">
        <div className="revista-content max-w-5xl mx-auto px-5 py-3 w-full flex-1 min-h-0 flex flex-col overflow-hidden">
          {title && (
            <header className="mb-3 shrink-0">
              {kicker && (
                <p className="revista-kicker mb-1 tracking-[0.2em] text-[#c9a227] uppercase text-xs font-semibold">
                  {kicker}
                </p>
              )}
              {!kicker && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#c9a227]/15 text-[#c9a227] text-[10px] font-bold tracking-widest uppercase mb-2">
                  Revista Científica Ilustrada — He²⁺
                </span>
              )}
              <h2 className="revista-title font-display text-2xl md:text-3xl text-[#0e4a7a] leading-tight">
                {title}
              </h2>
              <hr className="revista-rule mt-3" />
            </header>
          )}
          <div className="flex-1 min-h-0 flex flex-col rounded-2xl border-2 border-[#c9a227]/15 bg-white/60 backdrop-blur-sm p-3 md:p-4 shadow-sm overflow-y-auto overflow-x-hidden">
            {children}
          </div>
          <footer className="mt-3 flex items-center justify-between text-[10px] tracking-widest uppercase text-[#1a2a3a]/40 shrink-0">
            <span>Revista Científica Ilustrada — He²⁺</span>
            <span className="w-12 h-px bg-[#c9a227]/30" />
          </footer>
        </div>
      </div>
    </SpectacleSlide>
  );
};

export default Slide;
