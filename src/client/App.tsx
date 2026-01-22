import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"

import Scene from "./components/Scene"
import Home from "./components/Home"
import About from "./components/About"

function App() {
  return (
    <>
      <div 
        id="scroll-area" 
        style={{ 
          height: "500vh"
        }}
      />
      <Home />
      <About />

      <Canvas id="canvas" style={{ position: 'fixed' }} camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100}}>
        <Environment
          files="/puresky.exr"
          background
        />
        <Scene />
      </Canvas>
    </>
  )
}

export default App
