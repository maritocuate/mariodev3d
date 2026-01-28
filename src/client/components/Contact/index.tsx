import { useRef } from 'react'
import gsap from "gsap"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

import './Contact.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const links = {
    linkedin: 'https://www.linkedin.com/in/mario-quiroga-73299527/',
    github: 'https://github.com/maritocuate',
    resume: '/resume.pdf',
    calendly: 'https://calendly.com/mario300/30min/',
}

function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!sectionRef.current) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "scroll-area",
                start: () => window.innerHeight * 11.2 + " top",
                scrub: 0.9
            }
        })

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
    }, [])

    const handleClick = async () => {
        try {
            const response = await fetch('/api/survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'new_prop',
                    score: 5,
                }),
            })

            if (!response.ok) {
                throw new Error('Error en el servidor: ' + response.statusText)
            }

            const result = await response.json()
            console.log(result)
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            } else {
                console.log('Unknown error occurred')
            }
        } finally {
            console.log(false)
        }
    }

    return (
        <div id="contact" ref={sectionRef} className="section section-contact">
            <section className="title-section dimension">
                <div className="links">
                    <span
                        className="link"
                        onClick={() => window.open(links.linkedin, '_blank')}
                    >
                        linkedin
                    </span>
                    <span
                        className="link"
                        onClick={() => window.open(links.github, '_blank')}
                    >
                        github
                    </span>
                    <span
                        className="link"
                        onClick={() => window.open(links.calendly, '_blank')}
                    >
                        calendly
                    </span>
                    <a
                        href={'https://marioquiroga.vercel.app' + links.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="link">resume</span>
                    </a>
                </div>
                <span className="email" onClick={handleClick}>
                    MARIO300@GMAIL.COM
                </span>
            </section>
        </div>
    )
}

export default Contact
