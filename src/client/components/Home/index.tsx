import { useRef } from 'react'
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

import './Home.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

function Home() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)

    useGSAP(() => {
        if (!sectionRef.current || !titleRef.current || !subtitleRef.current) return

        const split = new SplitText(titleRef.current, {
            type: "chars,words,lines",
            mask: "lines",
            linesClass: "line"
        })

        gsap.from(split.lines, {
            yPercent: 100,
            opacity: 0,
            stagger: 0.03,
            ease: "power3.out",
            duration: 0.6,
            delay: 0.9,
        })
        gsap.from(subtitleRef.current, {
            opacity: 0,
            delay: 1.2
        })

        gsap.to(sectionRef.current, {
            opacity: 0,
            scale: 1.1,
            scrollTrigger: {
                trigger: "#scroll-area",
                start: "top top",
                end: "top+=400 top",
                scrub: true
            }
        })

        return () => {
            split.revert()
          }
    }, [])

    return(
        <div ref={sectionRef} className="section">
            <section className="title-section dimension">
                <h1 ref={titleRef} className="header">Mario Quiroga</h1>
                <p ref={subtitleRef} className="subtitle">software developer</p>
            </section>
        </div>
    )   
}

export default Home