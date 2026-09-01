import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Nucleus() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#ffd700" roughness={0.3} />
    </mesh>
  );
}

function ElectronOrbit({ radius }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.02, 64]} />
      <meshBasicMaterial color="#cccccc" transparent opacity={0.3} side={2} />
    </mesh>
  );
}

function Electron({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#4fc3f7" roughness={0.5} />
    </mesh>
  );
}

function Scene() {
  return (
    <group>
      <Nucleus />
      <ElectronOrbit radius={0.7} />
      <Electron position={[0.8, 0, 0]} />
      <Electron position={[-0.8, 0, 0]} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <ambientLight intensity={0.5} />
    </group>
  );
}

export const AtomicStructure3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 60 }} gl={{ antialias: true }}>
      <OrbitControls enableZoom={true} enablePan={false} rotateSpeed={0.2} />
      <Scene />
    </Canvas>
  );
};