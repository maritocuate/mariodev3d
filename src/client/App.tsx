import { Canvas } from "@react-three/fiber"
import Scene from "./components/Scene";
import { Environment, OrbitControls } from "@react-three/drei";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <div 
        id="scroll-area" 
        style={{ 
          height: "300vh",
          position: "relative",
          zIndex: 1,
          opacity: 0
        }}
      />

      <Canvas id="canvas" style={{ position: 'fixed' }} camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100}}>
        <Environment
          files="/puresky.exr"
          background
        />
        <Scene />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

export default App
