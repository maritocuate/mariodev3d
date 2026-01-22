import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { AnimationMixer, AnimationClip, Group } from "three"
import { useGSAP } from "@gsap/react"
import type { RefObject } from "react"

gsap.registerPlugin(ScrollTrigger)

function useScrollAnimation(
    mixerRef: RefObject<AnimationMixer | null>,
    scene: Group,
    animations: AnimationClip[],
    trigger: string
) {
    useGSAP(() => {
        if (!mixerRef.current || animations.length === 0) return
    
        const action = mixerRef.current.clipAction(animations[0])
        action.play()
        action.paused = true
        action.time = 0
    
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
        tl.to({}, {
            onUpdate: () => {
                const openDuration = 1
                const t = Math.min(tl.time(), openDuration)
                action.time = animations[0].duration * (t / openDuration)
                // action.time = animations[0].duration * tl.progress()
                mixerRef.current?.update(0)
            },
            duration: 1
        }, 0)
        
        // 2️⃣ About
        tl.to(scene.position, {
            y: 0.3,
            z: 2,
            duration: 1,
        }, 0)
        tl.to(scene.rotation, {
            x: Math.PI / 10,
            y: Math.PI / 2,
            z: Math.PI / -6,
            duration: 1,
        }, "<") // mismo tramo
        
        // 3️⃣ Skills
        tl.to(scene.position, {
            x: -0.4,
            y: 0.7,
            z: 2.6,
            duration: 1,
        }, 3)
        tl.to(scene.rotation, {
            x: -0.08,
            y: 4.1,
            z: 0.1,
            duration: 1,
        }, "<")
  
    
        return () => {
          tl.kill()
          action.stop()
        }
      }, [scene, animations])
}

export default useScrollAnimation