import { Suspense, lazy, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, PerformanceMonitor } from "@react-three/drei"

import { EffectComposer, SMAA } from "@react-three/postprocessing"

const Scene = lazy(() => import("./components/Scene"))
import Home from "./components/Home"
import About from "./components/About"
import Skills from "./components/Skills"
import Contact from "./components/Contact"

function App() {
  const [dpr, setDpr] = useState(1.5)

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

      <Canvas
        id="canvas"
        style={{ position: 'fixed' }}
        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "default"
        }}
        dpr={dpr}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(2)}
        />

        <Environment preset="dawn" />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <EffectComposer multisampling={0}>
          <SMAA />
        </EffectComposer>
      </Canvas>
    </>
  )
}

export default App
