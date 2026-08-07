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
          With 10 years of software development experience, I specialize in building modern, scalable web applications using TypeScript, React, and Next.js, backed by hands-on experience with both relational and NoSQL databases.<br /><br />
          Across product and service companies, my career has evolved alongside web technology—from early interactive platforms to end-to-end AI orchestration for complex projects (using Cursor, custom agent workflows, and automation to streamline architecture, accelerate development, and ensure code quality).<br /><br />
          I focus on building resilient software, streamlining developer experience, and adopting modern tools to solve complex challenges efficiently.
        </p>
      </section>
    </div>
  )
}

export default About