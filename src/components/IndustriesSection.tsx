import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import coffee from "@/assets/industries/coffee.jpg";
import importExport from "@/assets/industries/import-export.jpg";
import agriculture from "@/assets/industries/agriculture.jpg";

const industries = [
  {
    title: "Coffee",
    description: "Supplying premium Arabica & Robusta to roasters and distributors worldwide from Ethiopia's finest regions.",
    image: coffee,
  },
  {
    title: "Import & Export",
    description: "Full-service import and export operations connecting Ethiopian producers with global markets.",
    image: importExport,
  },
  {
    title: "Agriculture",
    description: "Organic pulses, beans, seeds and grains for the global food processing and agriculture industry.",
    image: agriculture,
  },
];

const IndustriesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    bgRefs.current.forEach((bg, idx) => {
      if (idx === activeIndex) {
        gsap.to(bg, { opacity: 1, duration: 0.6, ease: "power2.inOut" });
      } else {
        gsap.to(bg, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
      }
    });
  }, [activeIndex]);

  return (
    <section 
      id="industries"
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Layer - Static position, changing opacity */}
      <div className="absolute inset-0 z-0">
        {industries.map((item, index) => (
          <div
            key={index}
            ref={(el) => (bgRefs.current[index] = el)}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${item.image})`,
              opacity: index === 0 ? 1 : 0 
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-body text-xs font-bold tracking-[0.2em] text-white uppercase">
            Industries We Serve
          </span>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            Tailored Solutions Across Diverse Sectors
          </h2>
        </div>

        {/* lg:items-center ensures small boxes align with the middle of the large box */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 h-[500px]">
          {industries.map((industry, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={industry.title}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative cursor-pointer transition-all duration-700 ease-[0.23,1,0.32,1]
                  ${isActive 
                    ? "w-full lg:w-[420px] h-[450px] bg-white text-black shadow-2xl p-10" 
                    : "w-full lg:w-[220px] h-[220px] bg-white/10 backdrop-blur-xl text-white border border-white/20 p-6"
                  } 
                  rounded-2xl flex flex-col overflow-hidden`}
              >
                {/* Content Wrapper: Centers title for small boxes, tops it for large ones */}
                <div className={`relative z-10 flex flex-col h-full transition-all duration-500 
                  ${!isActive ? "justify-center items-center" : "justify-start"}`}
                >
                  <h3 className={`font-display font-bold transition-all duration-500 
                    ${isActive ? "text-3xl mb-4 text-left" : "text-xl text-center mb-0"}`}
                  >
                    {industry.title}
                  </h3>
                  
                  {/* Expanded Content */}
                  <div className={`transition-all duration-500 
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none h-0"}`}
                  >
                    <p className="font-body text-base leading-relaxed text-gray-600 text-left">
                      {industry.description}
                    </p>
                  </div>

                  {/* Footer Logic inside the active box */}
                  {isActive && (
                    <div className="mt-auto pt-6 border-t border-black/10 w-full flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-widest">Tell me more</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;