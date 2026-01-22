import { useLayoutEffect, useRef } from "react"
import { AnimationMixer, Group } from "three"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useScrollAnimation from "../utils/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger)

function Scene () {
    const { scene, animations } = useGLTF("/models/MacbookCustom-transformed.glb")

    const mixer = useRef<AnimationMixer>(null)
    const groupRef = useRef<Group>(null)
    const floatRef = useRef(0)

    useLayoutEffect(() => {
        if (!animations.length) return
        mixer.current = new AnimationMixer(scene)

        scene.position.set(0, 0, -1)
        scene.rotation.set(0.2, -1.9, 0.1)
    }, [scene, animations])

    useFrame((_, delta) => {
        if (!groupRef.current) return
      
        floatRef.current += delta
        groupRef.current.position.y =
          Math.sin(floatRef.current * .2) * 0.1
        groupRef.current.rotation.z =
          Math.sin(floatRef.current) * 0.02
    })

    useScrollAnimation(mixer, scene, animations, "#scroll-area")
    
    return(
        <group ref={groupRef}>
            <primitive object={scene} scale={[0.05,0.05,0.05]} />
        </group>
    )
}

export default Scene