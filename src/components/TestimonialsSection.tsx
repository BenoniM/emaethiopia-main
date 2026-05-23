import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// Local assets
import fullBg from "../assets/testimony.jpg";

const testimonials = [
  {
    name: "Kim Sung-Ho",
    role: "Coffee Buyer, Seoul",
    quote: "Exceptional green coffee. The Yirgacheffe natural had incredible blueberry and floral notes. Highly recommended.",
    rating: 5,
  },
  {
    name: "Hans Weber",
    role: "Specialty Roaster, Hamburg",
    quote: "Consistency is key. We've sourced Ethiopian beans from EMA for 3 years, and the reliability never waver.",
    rating: 5,
  },
  {
    name: "Fatima Al-Rashid",
    role: "Trading Company, Dubai",
    quote: "Reliable trade partner. The sesame seeds meet high safety standards. Excellent communication.",
    rating: 5,
  },
  {
    name: "Dr. Tadesse Bekele",
    role: "Hospital Director",
    quote: "Essential medical equipment. EMA supplied our department with high-quality devices and great support.",
    rating: 5,
  },
  {
    name: "Yuki Tanaka",
    role: "Green Coffee Importer",
    quote: "Precision in quality. EMA's Laboratory provides detailed scores. Their Sidamo lots are outstanding.",
    rating: 5,
  },
];

const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

const splitQuote = (quote) => {
  const match = quote.match(/^(.*?[.!?])\s(.*)$/);
  if (match) return { title: match[1], body: match[2] };
  return { title: quote, body: "" };
};

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(testimonials.length);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  
  // Parallax Refs
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const navRef = useRef(null); // Ref for the buttons container
  
  const isAnimating = useRef(false);
  const cardWidth = 300;
  const gap = 16;

  // 1. Unified Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      // Deep background (Slowest, opposite direction)
      gsap.to(bgRef.current, {
        x: xPos * -15,
        y: yPos * -15,
        duration: 0.8,
        ease: "power2.out",
      });
      
      // Title Text (Moderate speed)
      gsap.to(textRef.current, {
        x: xPos * 25,
        y: yPos * 25,
        duration: 0.8,
        ease: "power2.out",
      });

      // Navigation Buttons (Floating effect)
      gsap.to(navRef.current, {
        x: xPos * 15,
        y: yPos * 15,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Slider Logic
  const handleMove = (direction) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setCurrent((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  useEffect(() => {
    const totalMove = current * (cardWidth + gap);
    gsap.to(trackRef.current, {
      x: -totalMove,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        isAnimating.current = false;
        if (current >= testimonials.length * 2) {
          const resetIndex = current - testimonials.length;
          setCurrent(resetIndex);
          gsap.set(trackRef.current, { x: -(resetIndex * (cardWidth + gap)) });
        } else if (current < testimonials.length) {
          const resetIndex = current + testimonials.length;
          setCurrent(resetIndex);
          gsap.set(trackRef.current, { x: -(resetIndex * (cardWidth + gap)) });
        }
      },
    });
  }, [current]);

  // 3. Button Feedback Animations
  const btnHover = (e, direction) => {
    gsap.to(e.currentTarget, {
      x: direction === "next" ? 8 : -8,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const btnLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const btnClick = (e, direction) => {
    const icon = e.currentTarget.querySelector("svg");
    gsap.fromTo(
      icon,
      { x: 0 },
      { x: direction === "next" ? 10 : -10, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" }
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[60vh] md:h-[90vh] min-h-[450px] md:min-h-[550px] flex flex-col items-center justify-end overflow-hidden bg-slate-950 pt-16 md:pt-32"
    >
      {/* LAYER 1: Background */}
      <div className="absolute inset-0 z-0 pointer-events-none scale-110" ref={bgRef}>
        <img 
          src={fullBg} 
          alt="" 
          className="w-full h-full object-cover object-bottom opacity-60"
        />
      </div>

      {/* LAYER 2: Text Layer */}
      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-16 md:pt-24 pointer-events-none"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight text-center leading-[0.85]">
          What Our<br /><span className="text-green-500">Clients Say</span>
        </h2>
      </div>

      {/* LAYER 3: UI Slider & Buttons */}
      <div className="relative z-30 w-full flex flex-col items-center pb-12">
        
        {/* Navigation Buttons with Parallax Wrapper */}
        <div ref={navRef} className="flex gap-4 mb-8">
          <button
            onClick={(e) => { handleMove("prev"); btnClick(e, "prev"); }}
            onMouseEnter={(e) => btnHover(e, "prev")}
            onMouseLeave={btnLeave}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl transition-shadow hover:shadow-2xl active:scale-95"
          >
            <ChevronLeft className="h-6 w-6 text-[#259825]" />
          </button>
          <button
            onClick={(e) => { handleMove("next"); btnClick(e, "next"); }}
            onMouseEnter={(e) => btnHover(e, "next")}
            onMouseLeave={btnLeave}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl transition-shadow hover:shadow-2xl active:scale-95"
          >
            <ChevronRight className="h-6 w-6 text-[#259825]" />
          </button>
        </div>

        {/* Testimonial Track */}
        <div className="w-full overflow-visible">
          <div ref={trackRef} className="flex gap-4 px-[calc(50%-150px)]">
            {extendedTestimonials.map((t, i) => {
              const { title, body } = splitQuote(t.quote);
              const isActive = i === current;
              return (
                <div
                  key={i}
                  className={`flex-shrink-0 w-[300px] h-[240px] rounded-xl p-6 flex flex-col justify-between transition-all duration-500 border-2
                  ${isActive 
                    ? "bg-white border-white scale-100 shadow-2xl text-slate-900" 
                    : "bg-black/20 backdrop-blur-md border-white scale-90 text-white"
                  }`}
                >
                  <div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`h-3 w-3 fill-current ${isActive ? "text-[#259825]" : "text-white/40"}`} />
                      ))}
                    </div>
                    <h4 className="font-bold text-base mb-1 leading-tight">{title}</h4>
                    <p className={`text-xs leading-relaxed line-clamp-3 ${isActive ? "text-slate-600" : "text-white/70"}`}>{body}</p>
                  </div>
                  <div className={`border-t pt-3 ${isActive ? "border-black/5" : "border-white/10"}`}>
                    <div className="font-medium text-xs">{t.name}</div>
                    <div className={`text-[10px] ${isActive ? "text-slate-500" : "text-white/40"}`}>{t.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;