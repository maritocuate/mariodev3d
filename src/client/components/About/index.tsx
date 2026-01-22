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
          start: "800vh top",
          end: "2800vh top",
          scrub: 0.9,
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

    return(
        <div id="about" ref={sectionRef} className="section">
            <section className="title-section dimension">
                <h1 ref={titleRef} className="header">About Me</h1>
                <p ref={contentRef} className='content'>
                    Hi! My name is Mario and I live in Buenos Aires, Argentina. Ive been
                    programming for about 10 years (when Flash sites were very popular).
                    Over the past four years, I've been extensively working with React
                    and NextJs to keep the same language in the backend. In addition to my
                    frontend expertise, I have hands-on experience with both relational
                    and non-relational databases. In my life I have worked in product and
                    service companies in teams with great professionals and diverse web
                    and mobile challenges. Always trying to use the latest libraries and
                    technologies. I really love to develop software and keep myself
                    updated in this exciting field.
                </p>
            </section>
        </div>
    )   
}

export default About