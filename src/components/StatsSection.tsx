import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Tons Monthly" },
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "K+", label: "Tons Exported" },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Slick entrance: Staggered fade, scale, and slide
      tl.fromTo(
        itemsRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
        }
      );

      // Concurrent count-up animation
      numbersRef.current.forEach((numRef, i) => {
        if (!numRef) return;
        const targetValue = stats[i].value;
        const obj = { val: 0 };

        tl.to(
          obj,
          {
            val: targetValue,
            duration: 2,
            ease: "power4.out",
            onUpdate: () => {
              if (numRef) numRef.innerText = Math.floor(obj.val).toLocaleString();
            },
          },
          "<0.2" // Starts slightly after each item begins its reveal
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden bg-[#154716] py-10 md:py-12" // Reduced padding for "thinner" look
    >
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-y-8 md:flex-nowrap">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative flex w-1/2 flex-col items-center px-4 text-center md:w-1/4"
            >
              <div className="relative flex items-baseline">
                <span
                  ref={(el) => (numbersRef.current[index] = el)}
                  className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
                >
                  0
                </span>
                <span className="ml-1 font-display text-xl font-semibold text-[#8cc63f] md:text-2xl">
                  {stat.suffix}
                </span>
              </div>
              
              <span className="mt-1 font-body text-[9px] font-bold uppercase tracking-[0.15em] text-white/50 md:text-xs">
                {stat.label}
              </span>

              {/* Vertical Divider - Visible only on Desktop between items */}
              {index < stats.length - 1 && (
                <div className="absolute -right-[1px] top-1/2 hidden h-10 w-[1px] -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modern thin top/bottom separators */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
};

export default StatsSection;