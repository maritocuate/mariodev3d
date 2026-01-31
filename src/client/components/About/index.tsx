import { useRef } from 'react'
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

import './About.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "scroll-area",
        start: () => window.innerHeight * 1.2 + " top",
        end: () => window.innerHeight * 5.8 + " top",
        scrub: 0.9
      }
    })

    // IN
    tl.fromTo(
      sectionRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        ease: "power3.out",
        duration: 1,
      }
    )

    // Stay
    tl.to(sectionRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
    })

    // OUT
    tl.to(sectionRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1,
    })
  }, [])

  return (
    <div id="about" ref={sectionRef} className="section">
      <section className="title-section dimension">
        <h1 ref={titleRef} className="header">About Me</h1>
        <p ref={contentRef} className='content'>
          Hi! I'm Mario, a frontend engineer based in Buenos Aires, Argentina, with nearly 10 years of experience building web applications. Over the last four years, I’ve specialized in React and Next.js, creating scalable, high-performance interfaces and full-stack solutions using the same stack across frontend and backend.
          <br />
          I’ve worked with both relational and non-relational databases, and collaborated in product-driven and service-based teams facing diverse web and mobile challenges. I’m passionate about writing clean, modern code, staying up to date with the ecosystem, and constantly improving how users experience software.
        </p>
      </section>
    </div>
  )
}

export default About