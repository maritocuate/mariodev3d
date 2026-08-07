import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { AnimationMixer, AnimationClip, Group } from "three"
import { useGSAP } from "@gsap/react"
import { useMediaQuery } from "react-responsive"
import type { RefObject } from "react"

gsap.registerPlugin(ScrollTrigger)

function useScrollAnimation(
    mixerRef: RefObject<AnimationMixer | null>,
    scene: Group,
    animations: AnimationClip[],
    trigger: string
) {
    const isMobile = useMediaQuery({ query: "(max-width: 900px)" })

    useGSAP(() => {
        const hasClip = animations.length > 0 && !!mixerRef.current
        const action = hasClip ? mixerRef.current!.clipAction(animations[0]) : null

        if (action) {
            action.play()
            action.paused = true
            action.time = 0
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                //markers: true,
            },
        })

        // 1️⃣ apertura tapa (0 → 1)
        if (action) {
            tl.to(action, {
                time: animations[0].duration,
                duration: 1,
                onUpdate: () => { mixerRef.current?.update(0) }
            }, 0)
        }

        // 2️⃣ About
        tl.to(scene.position, {
            x: -0.7,
            y: isMobile ? -0.4 : 0.8,
            z: 2,
            duration: 1,
        }, 0)
        tl.to(scene.rotation, {
            x: -0.5,
            y: 7.2,
            z: 0.2,
            duration: 1,
        }, "<") // mismo tramo

        // 3️⃣ Skills
        tl.to(scene.position, {
            x: isMobile ? -0.1 : -0.4,
            y: isMobile ? 1.3 : 1.1,
            z: 2,
            duration: 1,
        }, 3)
        tl.to(scene.rotation, {
            x: 0.5,
            y: 1,
            z: -0.5,
            duration: 1,
        }, "<")

        // 3️⃣ Contact
        tl.to(scene.position, {
            x: 0,
            y: isMobile ? -2.7 : -2.2,
            z: -4,
            duration: 1,
        }, 6)
        tl.to(scene.rotation, {
            x: -0.9,
            y: 6.3,
            z: 0,
            duration: 1,
        }, "<")

        // Cierre tapa
        if (action) {
            tl.to(action, {
                time: 0,
                duration: 0.5,
                onUpdate: () => { mixerRef.current?.update(0) }
            }, 6.5)
        }

        return () => {
            tl.kill()
            action?.stop()
        }
    }, [scene, animations])
}

export default useScrollAnimation