import { Slide as SpectacleSlide } from "spectacle";

export const Slide = ({ title, kicker, children, ...props }) => {
  return (
    <SpectacleSlide title={title} speakerNotes={props.speakerNotes} {...props}>
      <div className="revista-slide min-h-full bg-[#fefcf8] text-[#1a2a3a] flex flex-col">
        <div className="revista-content max-w-5xl mx-auto px-8 py-6 w-full flex-1 flex flex-col">
          {title && (
            <header className="mb-6">
              {kicker && (
                <p className="revista-kicker mb-2 tracking-[0.2em] text-[#c9a227] uppercase text-xs font-semibold">
                  {kicker}
                </p>
              )}
              {!kicker && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#c9a227]/15 text-[#c9a227] text-[10px] font-bold tracking-widest uppercase mb-3">
                  Revista Científica Ilustrada — He²⁺
                </span>
              )}
              <h2 className="revista-title font-display text-3xl md:text-4xl text-[#0e4a7a] leading-tight">
                {title}
              </h2>
              <hr className="revista-rule mt-4" />
            </header>
          )}
          <div className="flex-1 flex flex-col rounded-2xl border-2 border-[#c9a227]/15 bg-white/60 backdrop-blur-sm p-6 md:p-8 shadow-sm">
            {children}
          </div>
          <footer className="mt-4 flex items-center justify-between text-[10px] tracking-widest uppercase text-[#1a2a3a]/40">
            <span>Revista Científica Ilustrada — He²⁺</span>
            <span className="w-12 h-px bg-[#c9a227]/30" />
          </footer>
        </div>
      </div>
    </SpectacleSlide>
  );
};

export default Slide;
