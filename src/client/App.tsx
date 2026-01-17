import { OrbitControls, Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import MacbookCustom from "./components/MacbookCustom"

function App() {

  return (
    <main>
      <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100}}>
        <Environment
           files="/puresky.exr"
           background
        />

        <MacbookCustom scale={0.08} position={[0, -0.2, 0]} rotation={[0, -2.3, 0]} />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </main>
  )
}

export default App
