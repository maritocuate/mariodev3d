import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "./Home.css"

gsap.registerPlugin(ScrollTrigger)

function HeroBackdrop() {
    const ref = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!ref.current) return

        gsap.to(ref.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: "#scroll-area",
                start: "top top",
                end: "top+=400 top",
                scrub: true,
            },
        })
    }, [])

    return (
        <div ref={ref} className="hero-backdrop-layer" aria-hidden="true">
            <div className="hero-backdrop" />
            <div className="hero-shoe-glow" />
        </div>
    )
}

export default HeroBackdrop
