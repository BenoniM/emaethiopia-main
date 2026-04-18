import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

// Grain images (left column)
import grainCoffee from "@/assets/export-imgs/green-coffee.png";
import grainSesame from "@/assets/export-imgs/sesame-seeds.png";
import grainNiger from "@/assets/export-imgs/niger-seed.png";
import grainKidney from "@/assets/export-imgs/kidney-bean.png";
import grainChickpea from "@/assets/export-imgs/chickpea.png";

// Food images (right column)
import foodCoffee from "@/assets/food-imgs/coffee-dish.png";
import foodSesame from "@/assets/food-imgs/sesame-dish.png";
import foodNiger from "@/assets/food-imgs/niger-seed-dish.png";
import foodKidney from "@/assets/food-imgs/kidney-bean-dish.png";
import foodChickpea from "@/assets/food-imgs/chickpea-dish.png";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Green Coffee",
    origin: "Yirgacheffe · Sidamo",
    description: "Premium Ethiopian Arabica green coffee cherries — washed and natural processed from the lush highlands, delivering floral, citrus, and wine-like notes prized worldwide.",
    grainImage: grainCoffee,
    foodImage: foodCoffee,
    cta: "Click to explore",
  },
  {
    name: "Sesame Seeds",
    origin: "Humera · Wollega",
    description: "Humera and Wollega sesame seeds with 50–55% oil content — the gold standard for tahini, confections, and culinary oils.",
    grainImage: grainSesame,
    foodImage: foodSesame,
    cta: "Click to explore",
  },
  {
    name: "Niger Seeds",
    origin: "Ethiopian Highlands",
    description: "High-quality Ethiopian Niger seeds (Noug) with 38–43% oil content — essential for oil extraction, traditional Ethiopian cuisine, and premium bird feed.",
    grainImage: grainNiger,
    foodImage: foodNiger,
    cta: "Click to explore",
  },
  {
    name: "Red Kidney Beans",
    origin: "Southern Ethiopia",
    description: "Nutrient-rich Ethiopian red kidney beans — packed with protein and fiber, exported to international food markets for stews, curries, and health cooking.",
    grainImage: grainKidney,
    foodImage: foodKidney,
    cta: "Click to explore",
  },
  {
    name: "Chickpea",
    origin: "Debre Zeit · Amhara",
    description: "Desi and Kabuli chickpeas cultivated in Ethiopia's fertile central highlands — exported globally for hummus, falafel, and beyond.",
    grainImage: grainChickpea,
    foodImage: foodChickpea,
    cta: "Click to explore",
  },
];

const ExportsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Trigger state changes when left items scroll past viewport center
      leftItemsRef.current.forEach((item, i) => {
        if (!item) return;
        ScrollTrigger.create({
          trigger: item,
          start: "top 50%", 
          end: "bottom 50%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#181a18] text-[#f8f9fa] overflow-visible border-y border-white/5"
    >
      {/* Background noise */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px" }} />
      
      {/* Three Column Grid Container */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_minmax(auto,500px)_1fr] max-w-full lg:max-w-[1800px] mx-auto h-full">
        
        {/* ─── LEFT COLUMN: Grains (Normal Scroll) ─── */}
        <div className="hidden md:flex flex-col items-center justify-start space-y-[30vh] h-full">
          {products.map((p, i) => (
            <div
              key={`left-wrapper-${i}`}
              ref={el => leftItemsRef.current[i] = el}
              className="relative w-full h-[80vh] flex justify-center items-center"
            >
              <div 
                className="relative w-[300px] h-[300px] flex justify-center items-center group"
              >
                <img 
                  src={p.grainImage} 
                  alt={p.name} 
                  className="w-[120%] h-[120%] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-6"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ─── CENTER COLUMN: Sticky Text (White invert on hover) ─── */}
        <div className="relative w-full h-full border-x border-dashed border-white/10 hover:border-black/10 bg-[#1C6F1C] hover:bg-[#f4f4f4] transition-colors duration-[800ms] group/center">
          <Link 
            to="/export-products" 
            className="absolute inset-0 z-20 cursor-pointer sticky top-0 h-screen w-full flex flex-col items-center justify-between py-12 px-6 md:px-12 text-center overflow-hidden" 
            aria-label="View Product Details">
            
            {/* Top Badge (Circular) */}
            <div className="mt-8 flex justify-center w-full relative z-10">
               <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 group-hover/center:border-black/20 text-white/50 group-hover/center:text-black/60 font-display text-[9px] uppercase tracking-widest transition-colors duration-[800ms]">
                  ETH
               </div>
            </div>

            {/* Middle Content */}
            <div className="relative w-full flex-grow flex items-center justify-center">
              {products.map((p, i) => {
                const isActive = i === activeIndex;
                const isPast = i < activeIndex;
                
                return (
                  <div
                    key={`center-${i}`}
                    className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `translateY(${isActive ? "0" : isPast ? "-30px" : "30px"})`,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-medium mb-4 text-white group-hover/center:text-black transition-colors duration-[800ms] tracking-widest uppercase">
                      {p.name}
                    </h3>
                    <p className="font-display text-[10px] md:text-[11px] font-semibold tracking-[0.2em] text-white/60 group-hover/center:text-black/60 transition-colors duration-[800ms] uppercase">
                      Origin: {p.origin}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Content (Description & CTA) */}
            <div className="relative w-full h-[120px] flex items-end justify-center text-center pb-8 z-10">
              {products.map((p, i) => {
                 const isActive = i === activeIndex;
                 return (
                  <div
                    key={`bottom-${i}`}
                    className="absolute bottom-6 flex flex-col items-center gap-6 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `translateY(${isActive ? "0" : "15px"})`,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    <Link
                      to="/export-products"
                      className="text-white/40 hover:text-white group-hover/center:text-black/40 group-hover/center:hover:text-black transition-colors duration-[800ms] font-display text-[11px] tracking-wider uppercase"
                    >
                      {p.cta}
                    </Link>
                    <p className="font-serif text-[14px] italic text-white/40 group-hover/center:text-black/60 transition-colors duration-[800ms] max-w-[280px]">
                      {p.description}
                    </p>
                  </div>
                 )
              })}
            </div>

            {/* Optional dots for mobile / additional indication */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
               {products.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-[800ms] ${
                      i === activeIndex 
                        ? 'bg-white group-hover/center:bg-black' 
                        : 'bg-white/30 group-hover/center:bg-black/20'
                    }`} 
                  />
               ))}
            </div>

          </Link>
        </div>

        {/* ─── RIGHT COLUMN: Food Images (Perfectly Aligned) ─── */}
        <div 
          className="hidden md:flex flex-col items-center justify-start space-y-[30vh] h-full"
        >
          {products.map((p, i) => (
            <div 
              key={`right-${i}`}
              className="relative w-full h-[80vh] flex items-center justify-center group overflow-hidden"
            >
              {/* Image filling column gracefully */}
              <img 
                src={p.foodImage} 
                alt={`${p.name} dish`} 
                className="w-full h-full object-cover grayscale-[15%] mix-blend-luminosity hover:mix-blend-normal hover:grayscale-0 transition-all duration-700" 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExportsShowcase;
