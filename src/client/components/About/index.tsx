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
          Hi! My name is Mario and I live in Buenos Aires, Argentina. I’ve been programming for about 10 years, starting back when Flash websites were still a thing.<br />
          Over the past four years, I’ve focused on building modern web applications with React and Next.js (TypeScript), working across both frontend and backend to deliver scalable and consistent solutions. I also have experience working with both relational and non-relational databases.<br /><br />
          I’ve worked in both product and service companies, collaborating with talented teams on a wide range of web and mobile challenges. I enjoy working with modern tools and continuously evolving technologies to improve both development experience and product quality.<br /><br />
          More recently, I’ve been integrating AI into my workflow using tools like Cursor—designing custom agent workflows, automating development tasks, and enhancing code quality through AI-assisted testing, refactoring, and code review processes.<br /><br />
          I genuinely enjoy building software and continuously pushing myself to stay up to date in this fast-moving field.
        </p>
      </section>
    </div>
  )
}

export default About