import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

// Assets
import teamCupping from "@/assets/team-cupping.png";
import coffeeLab from "@/assets/about2.jpg";
import aboutSeedlings from "@/assets/about.jpg";

const highlights = [
  "Premium Ethiopian Arabica green coffee beans",
  "Sesame seeds, Niger seeds & oil seed crops",
  "Chickpea, haricot beans, mung bean & red kidney bean",
  "Medical equipment & diagnostic devices import",
  "ISO-certified processing & Coffee Laboratory",
  "Direct farmer partnerships & fair trade",
];

const imageData = [
  { img: teamCupping, label: "Our Process", tilt: -12, top: "15%", left: "0%", z: 30 },
  { img: coffeeLab, label: "Quality First", tilt: -5, top: "5%", left: "15%", z: 20 },
  { img: aboutSeedlings, label: "The Harvest", tilt: 6, top: "10%", left: "35%", z: 10 },
];

const AboutSection = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const topZIndex = useRef(50);

  useEffect(() => {
    if (isInView) {
      gsap.fromTo(
        imageRefs.current,
        { opacity: 0, scale: 0.8, y: 100 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: "expo.out" 
        }
      );
    }
  }, [isInView]);

const handleMouseMove = (e, index) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) / 15;
    const y = (clientY - (top + height / 2)) / 15;

    // Increment our shared counter and apply it immediately
    topZIndex.current += 1;
    gsap.set(imageRefs.current[index], { zIndex: topZIndex.current });

    gsap.to(imageRefs.current[index], {
      x: x,
      y: y,
      z: 40, 
      scale: 1.05,
      rotation: x * 0.5 + imageData[index].tilt,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(imageRefs.current[index], {
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      rotation: imageData[index].tilt,
      duration: 0.7,
      ease: "back.out(1.4)",
      // REMOVED: the onComplete zIndex reset. 
      // This keeps the image on top until a new one is hovered.
    });
  };
  

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative overflow-hidden bg-[#F0F4F0] py-16 lg:py-24"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[#2D4A31] md:text-5xl lg:text-6xl">
            Connecting <span className="text-[#3D6344]">Ethiopia's Finest</span> <br />
            <span className="text-[#5B8C61]">to the World</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* --- STACKED POLAROID IMAGES --- */}
          <div className="relative h-[480px] md:h-[600px] lg:col-span-6 [perspective:1200px]">
            {imageData.map((item, i) => (
              <div
                key={i}
                ref={(el) => (imageRefs.current[i] = el)}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
                className="absolute w-[220px] md:w-[320px] cursor-pointer"
                style={{ 
                  zIndex: item.z, 
                  top: item.top, 
                  left: item.left,
                  transform: `rotate(${item.tilt}deg)`,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="relative rounded-sm bg-white p-3 pb-12 shadow-xl ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl">
                  {/* Subtle Paper Texture */}
                  <div 
                    className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply" 
                    style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/p6-dark.png')` }} 
                  />
                  
                  <div className="relative overflow-hidden bg-gray-200">
                    <img 
                      src={item.img} 
                      alt={item.label} 
                      className="aspect-square w-full object-cover sepia-[0.05]" 
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]" />
                  </div>
                  
                  <div className="mt-6 text-center">
                    <span 
                      className="block text-2xl text-[#2D4A31]/80" 
                      style={{ fontFamily: '"Permanent Marker", cursive' }}
                    >
                      {item.label}
                    </span>
                    <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-[#2D4A31]/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- TEXT CONTENT --- */}
          <div className="lg:col-span-6 lg:pl-10">
            <div className="space-y-6">
              <p className="font-body text-xl font-medium leading-relaxed text-[#2D4A31]">
                Since 2019, EMA Import and Export Pvt.Ltd. has been at the forefront of Ethiopian international trade.
              </p>
              
              <p className="font-body text-base leading-relaxed text-[#4A634E]">
                Operating under the Droga Pharma umbrella, we maintain ISO-certified processing facilities and a state-of-the-art Coffee Laboratory. Our direct relationships with farmers ensure excellence from seed to cup.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <Link
                  to="/about"
                  className="flex items-center gap-2 rounded-full bg-[#2D4A31] px-8 py-4 font-body text-sm font-bold text-white transition-all hover:bg-[#3D6344] hover:shadow-lg"
                >
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 pt-8 border-t border-[#2D4A31]/10">
                <h3 className="mb-4 font-display text-xl font-bold text-[#2D4A31]">What We Deliver</h3>
                <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#5B8C61]" />
                      <span className="font-body text-sm text-[#2D4A31]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;