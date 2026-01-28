import { useRef } from 'react'
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

import './Skills.css'
import { keySkills } from '../../../constants/skills'
import SkillTile from './SkillTile'

gsap.registerPlugin(ScrollTrigger, SplitText)

function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "scroll-area",
        start: () => window.innerHeight * 6.2 + " top",
        end: () => window.innerHeight * 11.2 + " top",
        //markers: true,
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
    <div id="skills" ref={sectionRef} className="section container-skills">
      <section className="title-section">
        <div className="tiles-wrapper">
          <div className="tiles-scroll tiles-scroll-left">
            {keySkills.map((type, index) => (
              <SkillTile
                key={`original-left-${index}`}
                type={type}
              />
            ))}
            {keySkills.map((type, index) => (
              <SkillTile
                key={`duplicate-left-${index}`}
                type={type}
              />
            ))}
          </div>
          <div className="tiles-scroll tiles-scroll-right">
            {keySkills.map((type, index) => (
              <SkillTile
                key={`original-right-${index}`}
                type={type}
              />
            ))}
            {keySkills.map((type, index) => (
              <SkillTile
                key={`duplicate-right-${index}`}
                type={type}
              />
            ))}
          </div>
          <div className="tiles-scroll tiles-scroll-left-fast">
            {keySkills.map((type, index) => (
              <SkillTile
                key={`original-left-fast-${index}`}
                type={type}
              />
            ))}
            {keySkills.map((type, index) => (
              <SkillTile
                key={`duplicate-left-fast-${index}`}
                type={type}
              />
            ))}
          </div>
        </div>
        <div className="skills-section">
          <h2 className="header">Key Skills</h2>
        </div>
      </section>
    </div>
  )
}

export default Skills