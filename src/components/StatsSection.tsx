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
      // Reveal items with stagger
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Count up numbers
      numbersRef.current.forEach((numRef, i) => {
        if (!numRef) return;
        const targetValue = stats[i].value;
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
          onUpdate: () => {
            if (numRef) numRef.innerText = Math.floor(obj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#154716] py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-primary/5 blur-[100px]" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105"
            >
              <div className="relative mb-3 flex items-baseline">
                <span 
                  ref={(el) => (numbersRef.current[index] = el)}
                  className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                >
                  0
                </span>
                <span className="font-display text-2xl font-bold text-primary md:text-3xl lg:text-4xl ml-0.5">
                  {stat.suffix}
                </span>
                
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 -z-10 bg-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 group-hover:text-white md:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border separator */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default StatsSection;
