import { Suspense, lazy } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"

const Scene = lazy(() => import("./components/Scene"))
import Home from "./components/Home"
import About from "./components/About"
import Skills from "./components/Skills"
import Contact from "./components/Contact"

function App() {
  return (
    <>
      <div
        id="scroll-area"
        style={{
          height: "1400vh"
        }}
      />
      <Home />
      <About />
      <Skills />
      <Contact />

      <Canvas id="canvas" style={{ position: 'fixed' }} camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}>
        <Environment
          files="/puresky.exr"
          background
        />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
