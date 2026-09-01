import { useEffect, useState } from "react";
import { AtomicStructure3D } from "./AtomicStructure3D";
import { ParticleSimulation2D } from "./ParticleSimulation2D";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

const SimulationsIntegration = () => {
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setWebglAvailable(!!gl || !!window.WebGLRenderingContext);
    } catch {
      setWebglAvailable(false);
    }
  }, []);

  if (!webglAvailable) {
    return (
      <div className="rounded-xl border border-[#c9a227]/20 bg-[#fefcf8] p-8 text-center">
        <p className="revista-kicker mb-2">Simulações Interativas</p>
        <h3 className="font-display text-xl text-[#0e4a7a] mb-3">Visualizações Atômicas</h3>
        <p className="text-sm text-[#1a2a3a]/70 max-w-prose mx-auto">
          Simulações 3D e 2D requerem suporte a WebGL. Este conteúdo será substituído por
          descrições estáticas para navegadores sem WebGL.
        </p>
      </div>
    );
  }

  return (
    <div className="sim-tabs w-full">
      <div className="mb-4 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-[#0e4a7a] text-white text-[10px] font-bold tracking-widest uppercase mb-2">
          Simulações Interativas
        </span>
        <h3 className="font-display text-2xl text-[#0e4a7a] font-bold">Do Átomo ao Detector</h3>
        <p className="text-sm text-[#1a2a3a]/60 mt-1 max-w-prose mx-auto">
          Explore os dois modelos: estrutura atômica em 3D e a câmara de ionização em 2D. Ambas as
          simulações permanecem ativas — alterne pelas abas.
        </p>
      </div>

      <Tabs defaultValue="3d" className="w-full">
        <div className="flex justify-center mb-4">
          <TabsList>
            <TabsTrigger value="3d">Visão 3D — Estrutura Atômica</TabsTrigger>
            <TabsTrigger value="2d">Visão 2D — Câmara de Ionização</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="3d">
          <div className="h-[420px] bg-white rounded-xl border border-[#c9a227]/20 overflow-hidden">
            <AtomicStructure3D />
          </div>
          <p className="text-xs text-center mt-2 text-[#1a2a3a]/60">
            Modelo 3D interativo — arraste para orbitar, scroll para zoom
          </p>
        </TabsContent>

        <TabsContent value="2d">
          <div className="h-[420px] bg-white rounded-xl border border-[#c9a227]/20 overflow-hidden flex flex-col">
            <ParticleSimulation2D />
          </div>
          <p className="text-xs text-center mt-2 text-[#1a2a3a]/60">
            Câmara de ionização — insira fumaça e observe a corrente cair
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

SimulationsIntegration.displayName = "SimulationsIntegration";

export { SimulationsIntegration };
export default SimulationsIntegration;
