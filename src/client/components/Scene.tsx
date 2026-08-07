import { useLayoutEffect, useRef } from "react"
import { AnimationMixer, Group, Quaternion, Vector3 } from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useScrollAnimation from "../utils/useScrollAnimation";
import { useMediaQuery } from "react-responsive";
import RobotEyes from "./RobotEyes";

import "./Scene.css";

gsap.registerPlugin(ScrollTrigger)

// Pantalla B del modelo Terminal: superficie plana detectada por UV + análisis
// topológico de la malla (ver conversación) — mira hacia [-Z] con leve tilt en Y.
const SCREEN_POSITION: [number, number, number] = [0, 0.2, 0.165]
const SCREEN_NORMAL = new Vector3(-0.005, 0.13, 0.42).normalize()
const SCREEN_QUATERNION = new Quaternion().setFromUnitVectors(new Vector3(0, 0, 0.35), SCREEN_NORMAL)

// buffers reutilizados en el useFrame para no alocar por frame
const _screenWorldQuat = new Quaternion()
const _screenWorldNormal = new Vector3()
const _screenWorldPos = new Vector3()
const _camToScreen = new Vector3()

function Scene() {
    const { scene, animations } = useGLTF("/models/TerminalV2-transformed.glb")

    const mixer = useRef<AnimationMixer>(null)
    const groupRef = useRef<Group>(null)
    const screenRef = useRef<Group>(null)
    const hudRef = useRef<HTMLDivElement>(null)
    const floatRef = useRef(0)

    const isMobile = useMediaQuery({ query: "(max-width: 900px)" })

    const sceneY = isMobile ? 0.5 : 0.8
    const sceneX = isMobile ? 0 : 0.1

    useLayoutEffect(() => {
        scene.position.set(sceneX, sceneY, 1.9)
        scene.rotation.set(-0.5, -0.6, -0.1)

        if (!animations.length) return
        mixer.current = new AnimationMixer(scene)
    }, [scene, animations, sceneX, sceneY])

    useFrame((state, delta) => {
        if (!groupRef.current) return

        floatRef.current += delta
        groupRef.current.position.y =
            Math.sin(floatRef.current * .2) * 0.1
        groupRef.current.rotation.z =
            Math.sin(floatRef.current) * 0.02

        if (screenRef.current && hudRef.current) {
            screenRef.current.getWorldQuaternion(_screenWorldQuat)
            _screenWorldNormal.set(0, 0, 1).applyQuaternion(_screenWorldQuat)
            screenRef.current.getWorldPosition(_screenWorldPos)
            _camToScreen.subVectors(state.camera.position, _screenWorldPos)

            const facesCamera = _screenWorldNormal.dot(_camToScreen) > 0
            hudRef.current.style.opacity = facesCamera ? "1" : "0"
        }
    })

    useScrollAnimation(mixer, scene, animations, "#scroll-area")

    return (
        <>
            <group ref={groupRef}>
                <primitive object={scene} scale={isMobile ? [0.6, 0.6, 0.6] : [0.9, 0.9, 0.9]}>
                    <group ref={screenRef} position={SCREEN_POSITION} quaternion={SCREEN_QUATERNION}>
                        <Html
                            transform
                            distanceFactor={1.9}
                            zIndexRange={[1, 0]}
                        >
                            <div ref={hudRef} className="model-hud model-hud--screen">
                                <RobotEyes />
                            </div>
                        </Html>
                    </group>
                </primitive>
            </group>
        </>
    )
}

export default Scene