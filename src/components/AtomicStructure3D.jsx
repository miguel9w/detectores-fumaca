import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";

function Nucleus() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#c9a227"
          metalness={0.3}
          roughness={0.3}
          emissive="#c9a227"
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* two visual protons inside nucleus */}
      <mesh position={[0.08, 0.06, 0.12]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.09, -0.05, 0.1]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.2} />
      </mesh>
      <Html center position={[0, -0.52, 0]} style={{ pointerEvents: "none" }}>
        <span className="whitespace-nowrap rounded-full bg-[#0e4a7a] px-2 py-0.5 text-[10px] font-bold tracking-widest text-white">
          Núcleo: 2p⁺
        </span>
      </Html>
    </group>
  );
}

function ElectronOrbit({ radius }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.02, 64]} />
      <meshBasicMaterial color="#cccccc" transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ElectronOrbitAnimado({ radius, speed, phase, color = "#4fc3f7" }) {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} emissive={color} emissiveIntensity={0.25} />
      </mesh>
      <Html center position={[0, 0.18, 0]} style={{ pointerEvents: "none" }}>
        <span className="rounded bg-[#0e4a7a] px-1 py-0.5 text-[9px] font-bold text-white">e⁻</span>
      </Html>
    </group>
  );
}

function Scene() {
  return (
    <group>
      <Nucleus />
      <ElectronOrbit radius={0.7} />
      <ElectronOrbit radius={0.9} />
      <ElectronOrbitAnimado radius={0.7} speed={1.0} phase={0} color="#4fc3f7" />
      <ElectronOrbitAnimado radius={0.9} speed={0.85} phase={Math.PI} color="#38bdf8" />

      {/* Labels */}
      <Text
        position={[0, 1.35, 0]}
        fontSize={0.14}
        color="#0e4a7a"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        He
      </Text>
      <Html center position={[0, -1.15, 0]} style={{ pointerEvents: "none" }}>
        <span className="whitespace-nowrap text-[10px] text-[#1a2a3a]/60 text-center block max-w-[28ch] leading-tight">
          Órbita 1s² → 1s⁰ (sem elétrons — modelo didático com elétrons para contraste)
        </span>
      </Html>

      {/* Revista lights */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />
      <pointLight position={[-3, -2, 3]} intensity={0.6} color="#0e4a7a" />
    </group>
  );
}

export const AtomicStructure3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#fefcf8"]} />
      <OrbitControls enableZoom enablePan={false} minDistance={1.5} maxDistance={6} rotateSpeed={0.5} />
      <Scene />
    </Canvas>
  );
};

export default AtomicStructure3D;
