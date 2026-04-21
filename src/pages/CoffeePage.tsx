import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { MapPin, ArrowDown, Droplets, MountainSnow, ChevronRight, X, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Assets
import emaLogo from "@/assets/ema-logo.png";
import teamCupping from "@/assets/wmremove-transformed (1).jpeg";

import yirgacheffeImg from "@/assets/coffee/Yirgacheffe.jpg";
import sidamaImg from "@/assets/coffee/sidama.jpg";
import gujiImg from "@/assets/coffee/guji.jpg";
import harrarImg from "@/assets/coffee/harrar.jpg";
import limuImg from "@/assets/coffee/limu.png";
import kaffaImg from "@/assets/coffee/kaffa.jpg";

gsap.registerPlugin(ScrollTrigger);

const origins = [
  { 
    name: "Yirgacheffe", 
    notes: "Floral · Jasmine · Bergamot · Stone Fruit", 
    region: "Gedeo Zone, SNNPR",
    altitude: "1,700 - 2,200m",
    process: "Washed / Natural",
    image: yirgacheffeImg,
    description: "Yirgacheffe coffees are globally celebrated for their bright, sparkling acidity, intensely floral aromatics, and elegant tea-like body. Grown at extreme altitudes, these beans develop slowly, resulting in a complex and distinctive flavor profile often featuring jasmine, bergamot, and sweet stone fruit."
  },
  { 
    name: "Sidama", 
    notes: "Berry · Wine · Bright Acidity · Full Body", 
    region: "Sidama Region",
    altitude: "1,500 - 2,200m",
    process: "Washed / Natural",
    image: sidamaImg,
    description: "Sidama produces a vast array of cup profiles, but is most famous for its profound, fruit-forward naturals and crisp, elegantly structured washed coffees. Expect vibrant berry notes, wine-like characteristics, and a exceptionally creamy body that rounds out the bright acidity."
  },
  { 
    name: "Guji", 
    notes: "Blueberry · Dark Chocolate · Complex Finish", 
    region: "Oromia Zone",
    altitude: "1,800 - 2,300m",
    process: "Natural / Washed",
    image: gujiImg,
    description: "In recent years, Guji has emerged as a powerhouse of Ethiopian specialty coffee. Separated from the broader Sidama classification, Guji coffees offer wild, sweet, and complex profiles. Naturals often burst with blueberry jam and dark chocolate, while washed lots exhibit pristine floral and citrus notes."
  },
  { 
    name: "Harrar", 
    notes: "Wild Blueberry · Mocha · Dry Processed", 
    region: "Eastern Highlands",
    altitude: "1,500 - 2,100m",
    process: "Natural (Dry Processed)",
    image: harrarImg,
    description: "Harrar is one of the oldest coffee-producing regions in the world. Almost exclusively dry-processed (natural), Harrar coffees are famous for their heavy body, rustic charm, and unmistakable wild blueberry and dark chocolate (mocha) notes. They are complex, earthy, and boldly fruity."
  },
  { 
    name: "Limu", 
    notes: "Spicy · Sweet · Well-Balanced", 
    region: "Jimma Zone",
    altitude: "1,100 - 1,900m",
    process: "Washed",
    image: limuImg,
    description: "Known predominantly for its high-quality washed coffees, Limu offers a profoundly balanced cup. It features a lower acidity compared to Yirgacheffe or Sidama, but compensates with rich sweetness, delicate spice notes, and a winey, full-bodied mouthfeel."
  },
  { 
    name: "Kaffa", 
    notes: "Forest Fruit · Herbal · Winey", 
    region: "Forest Origin",
    altitude: "1,300 - 1,900m",
    process: "Natural / Forest Dried",
    image: kaffaImg,
    description: "Kaffa is widely considered the absolute birthplace of Coffea Arabica. Much of the coffee here still grows wild in the dense Afromontane forests. The resulting cup is unique, deep, and wild, offering intense forest fruit flavours, herbal complexities, and a notably winey acidity."
  },
];

const CoffeePage = () => {
  return (
    <div className="min-h-screen bg-[#061507]">
      <Navbar />
      <HeroSection />
      <OriginsShowcase />
      <IndividualOrigins />
      <Footer />
    </div>
  );
};

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#0a1f0c]">
      {/* Background Image Parallax */}
      <div ref={overlayRef} className="absolute inset-0 scale-[1.15]">
        <img
          src={teamCupping}
          alt="Coffee Beans Background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061507]/90 via-[#061507]/75 to-[#061507]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')" }} />

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mb-6 max-w-5xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[5.5rem]"
        >
          Premium{" "}
          <span className="block mt-2 bg-gradient-to-r from-[#8be08b] via-[#a8e063] to-[#8be08b] bg-clip-text text-transparent">
            Ethiopian Coffee
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mb-10 max-w-2xl font-body text-lg leading-relaxed text-white/70"
        >
          Explore the distinct terroir, unparalleled flavors, and magnificent heritage 
          of Ethiopian coffee with our curated, export-grade origins.
        </motion.p>
      </div>
    </section>
  );
};

const OriginsShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative bg-[#061507] py-20 lg:py-32 overflow-hidden border-b border-white/5">
      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8be08b]/20 bg-[#8be08b]/10 px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-[#8be08b] uppercase">
            <MapPin className="h-4 w-4" />
            Discover The Origins
          </span>
          <h2 className="mb-6 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Flavors Rooted in{" "}
            <span className="text-white/60">Terroir</span>
          </h2>
          <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-white/60">
            Our premium selections represent Ethiopia's most celebrated growing regions — each with
            distinct cup characteristics shaped by altitude, soil, and processing method.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {origins.map((origin, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                const element = document.getElementById(`origin-${i}`);
                if (element) {
                   element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`showcase-card group relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-500 ease-out flex flex-col justify-between p-8 min-h-[300px] ${
                hovered === i
                  ? "border-[#8be08b]/30 -translate-y-2 shadow-2xl shadow-[#8be08b]/5"
                  : "border-white/10"
              }`}
            >
              {/* Blurred Image Background */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-white/5 group"> 
                <img 
                  src={origin.image} 
                  alt={origin.name} 
                  className="w-full h-full object-cover opacity-20 scale-125 blur-sm transition-all duration-700 group-hover:scale-150 group-hover:opacity-40 group-hover:blur-none" 
                />

                <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60" />
              </div>

              <div className="relative z-10">

                <div className="mb-4 flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full transition-colors duration-300 ${hovered === i ? "bg-[#8be08b]" : "bg-white/30"}`} />
                  <span className="font-body text-xs font-bold tracking-[0.2em] text-white/50 uppercase">
                    {origin.region}
                  </span>
                </div>

                <h3 className="mb-4 font-display text-3xl font-bold text-white">
                  {origin.name}
                </h3>

                <p className="font-body text-sm leading-relaxed text-white/70">
                  {origin.notes}
                </p>
              </div>

              <div className="relative z-10 mt-8 flex items-center gap-2 font-body text-sm font-bold uppercase tracking-widest text-[#8be08b] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                <span>Discover More</span>
                <ArrowDown className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndividualOrigins = () => {
  return (
    <section className="relative bg-white py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-24 lg:gap-32">
          {origins.map((origin, i) => (
            <OriginDetailRow key={i} origin={origin} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const OriginDetailRow = ({ origin, index }: { origin: any; index: number }) => {
  const isEven = index % 2 === 0;
  const rowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 85%",
          }
        }
      );
    }, rowRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      id={`origin-${index}`}
      ref={rowRef} 
      className={`flex flex-col gap-10 lg:gap-16 lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      {/* Image Container */}
      <div className="w-full lg:w-1/2 relative group">
        <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
            
            <img src={origin.image} alt={origin.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            
            <h2 className="bg-letters absolute z-20 font-display text-[8rem] font-bold text-[#061507]/10 tracking-tighter uppercase whitespace-nowrap opacity-10 group-hover:opacity-100 transition-opacity duration-1000 -rotate-12 pointer-events-none mix-blend-overlay">
               {origin.name}
            </h2>
        </div>
      </div>

      {/* Details Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        
        <h3 className="mb-6 font-display text-4xl lg:text-5xl font-bold text-[#061507]">
          {origin.name}
        </h3>
        
        <p className="mb-8 font-body text-lg leading-relaxed text-[#061507]/70">
          {origin.description}
        </p>

        <div className="grid grid-cols-2 gap-6 mb-8 border-y border-[#061507]/10 py-8">
            <div>
                 <p className="flex items-center gap-2 font-body text-xs tracking-widest text-[#061507]/50 uppercase mb-2">
                     <MountainSnow className="w-4 h-4" /> Altitude
                 </p>
                 <p className="font-display text-lg font-medium text-[#061507]">{origin.altitude}</p>
            </div>
            <div>
                 <p className="flex items-center gap-2 font-body text-xs tracking-widest text-[#061507]/50 uppercase mb-2">
                     <Droplets className="w-4 h-4" /> Processing
                 </p>
                 <p className="font-display text-lg font-medium text-[#061507]">{origin.process}</p>
            </div>
        </div>

        <div>
            <p className="font-body text-xs tracking-widest text-[#061507]/50 uppercase mb-4">Tasting Notes</p>
            <div className="flex flex-wrap gap-3">
                {origin.notes.split('·').map((note: string, idx: number) => (
                    <span 
                        key={idx} 
                        className="rounded-full bg-[#061507]/5 border border-[#061507]/10 px-4 py-2 font-body text-sm font-medium text-[#061507]/80"
                    >
                        {note.trim()}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeePage;
