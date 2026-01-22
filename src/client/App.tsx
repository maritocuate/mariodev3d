import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"

import Scene from "./components/Scene"
import Home from "./components/Home"

function App() {
  return (
    <div style={{ position: "relative" }}>
      <div 
        id="scroll-area" 
        style={{ 
          height: "400vh",
          position: "relative",
          zIndex: 1,
          opacity: 0
        }}
      />

      <Home />

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
