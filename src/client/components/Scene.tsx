import { useGSAP } from "@gsap/react"
import { useLayoutEffect, useRef, useState } from "react"
import { AnimationAction, AnimationClip, AnimationMixer } from "three"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

gsap.registerPlugin(ScrollTrigger)

function Scene () {
    const { scene, animations } = useGLTF("/models/MacbookCustom-transformed.glb")
    const mixer = useRef<AnimationMixer | null>(null)
    const actionRef = useRef<AnimationAction | null>(null)
    const clipRef = useRef<AnimationClip | null>(null)
    const [isReady, setIsReady] = useState(false)

    useLayoutEffect(() => {
        if (animations && animations.length > 0 && scene && !mixer.current) {
            mixer.current = new AnimationMixer(scene)
            clipRef.current = animations[0]
            
            // Usar setTimeout para evitar el setState síncrono
            const timer = setTimeout(() => {
                setIsReady(true)
            }, 0)
            
            return () => clearTimeout(timer)
        }
    }, [scene, animations])

    // Actualizar mixer en cada frame
    useFrame((_, delta) => {
        if (mixer.current) {
            mixer.current.update(delta)
        }
    })

    useGSAP(() => {
        if (!mixer.current || !clipRef.current) return
        
        console.log("Configurando animación con ScrollTrigger")
        
        const action = mixer.current.clipAction(clipRef.current)
        actionRef.current = action
        
        action.play()
        action.paused = true
        action.time = 0
        
        ScrollTrigger.create({
            trigger: "#scroll-area",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1,
            markers: true,
            onUpdate: (self) => {
                if (actionRef.current && clipRef.current) {
                    actionRef.current.time = clipRef.current.duration * self.progress
                    
                    if (mixer.current) {
                        mixer.current.update(0)
                    }
                }
            }
        })
        
        return () => {
            if (actionRef.current) {
                actionRef.current.stop()
            }
        }
    }, [isReady])
    
    return(
        <primitive object={scene} scale={[0.05,0.05,0.05]} />
    )
}

export default Scene