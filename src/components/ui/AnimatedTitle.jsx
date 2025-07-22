import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedTitle({ title, containerClass }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Cari elemen dalam scope container, bukan global
      const animatedWords =
        containerRef.current?.querySelectorAll(".animated-word");

      if (!animatedWords || animatedWords.length === 0) {
        console.warn("No animated-word elements found");
        return;
      }

      // Set initial state
      gsap.set(animatedWords, {
        opacity: 0,
        transform:
          "translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
        transformOrigin: "50% 50% -150px",
      });

      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
          // Debug untuk melihat trigger area
          // markers: true,
        },
      });

      titleAnimation.to(animatedWords, {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
        duration: 0.8,
      });
    }, containerRef); // Penting: pass containerRef sebagai scope

    return () => ctx.revert();
  }, [title]); // Add title as dependency

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, i) => (
            <span
              key={`${index}-${i}`} // Better key for nested loops
              className="animated-word special-font"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
