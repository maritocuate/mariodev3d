import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current || !subtitleRef.current)
      return;

    gsap.from(subtitleRef.current, {
      opacity: 0,
      delay: 1.5,
    });

    gsap.to(sectionRef.current, {
      opacity: 0,
      scale: 1.1,
      scrollTrigger: {
        trigger: "#scroll-area",
        start: "top top",
        end: "top+=400 top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div id="home" ref={sectionRef} className="section">
      <section className="title-section hero-title-section">
        <h1 ref={titleRef} className="header">
          Mario<br/>Quiroga
        </h1>
        <p ref={subtitleRef} className="subtitle">
          Software Engineer
        </p>
      </section>
      <div className="scroll-cue" aria-hidden="true">
        <svg viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1V29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 21L12 29L20 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

export default Home;
