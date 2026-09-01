import { useRef, useEffect, useState } from "react";
import { AtomicStructure3D } from "./AtomicStructure3D";
import { ParticleSimulation2D } from "./ParticleSimulation2D";

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5, ...options }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, inView };
};

const SimulationsIntegration = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [mounted, setMounted] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);

  useEffect(() => {
    setWebglAvailable(!!window.WebGLRenderingContext || !!window.WebGL2RenderingContext);
  }, []);

  useEffect(() => {
    if (inView && !mounted) {
      setMounted(true);
    } else if (!inView && mounted) {
      setMounted(false);
    }
  }, [inView, mounted]);

  if (!webglAvailable) {
    return (
      <div className="no-webgl-fallback">
        <h2>Visualizações Atômicas</h2>
        <p>
          Simulações 3D e 2D requerem suporte a WebGL. Este conteúdo será
          substituído por descrições estáticas para navegadores sem WebGL.
        </p>
      </div>
    );
  }

  if (!mounted) {
    return <div ref={ref} style={{ height: 400 }} />;
  }

  return (
    <div ref={ref} style={{ display: "flex", height: 400, gap: "1rem" }}>
      <div style={{ flex: 1, pointerEvents: "none", position: "relative", minWidth: 0 }}>
        <AtomicStructure3D />
      </div>
      <div style={{ flex: 1, pointerEvents: "none", position: "relative", minWidth: 0 }}>
        <ParticleSimulation2D />
      </div>
    </div>
  );
};

SimulationsIntegration.displayName = "SimulationsIntegration";

export { SimulationsIntegration };
export default SimulationsIntegration;