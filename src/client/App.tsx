import { OrbitControls, Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import MacbookCustom from "./components/MacbookCustom"
import { useMediaQuery } from "react-responsive"

function App() {
  const isMobile = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  return (
    <main>
      <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100}}>
        <Environment
           files="/puresky.exr"
           background
        />

        <MacbookCustom scale={isMobile ? 0.08 : 0.04} position={[-0.1, -0.2, 0]} rotation={[0, -2.3, 0]} />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </main>
  )
}

export default App
