import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Star, CheckCircle2 } from "lucide-react";

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
  const trackRef = useRef(null);
  const isAnimating = useRef(false);

  const cardWidth = 300;
  const gap = 16;

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
          gsap.set(trackRef.current, {
            x: -(resetIndex * (cardWidth + gap)),
          });
        } else if (current < testimonials.length) {
          const resetIndex = current + testimonials.length;
          setCurrent(resetIndex);
          gsap.set(trackRef.current, {
            x: -(resetIndex * (cardWidth + gap)),
          });
        }
      },
    });
  }, [current]);

  const btnHover = (e, direction) => {
    const xMove = direction === "next" ? 8 : -8;
    gsap.to(e.currentTarget, {
      x: xMove,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const btnLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const btnClick = (e, direction) => {
    const icon = e.currentTarget.querySelector("svg");
    const xMove = direction === "next" ? 10 : -10;

    gsap.fromTo(
      icon,
      { x: 0 },
      { x: xMove, duration: 0.25, yoyo: true, repeat: 1, ease: "power1.inOut" }
    );
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[520px] flex flex-col items-center justify-end overflow-hidden bg-slate-900 mt-32">
      
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/3794811/pexels-photo-3794811.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Big Heading */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-24 pointer-events-none">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight text-center leading-[0.9]">
          What Our<br /><span className="text-gradient">Clients Say.</span>
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-20 w-full flex flex-col items-center mb-4 md:mb-6">
        
        {/* Nav */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex gap-4">
            <button
              onClick={(e) => {
                handleMove("prev");
                btnClick(e, "prev");
              }}
              onMouseEnter={(e) => btnHover(e, "prev")}
              onMouseLeave={btnLeave}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6 text-[#259825]" />
            </button>

            <button
              onClick={(e) => {
                handleMove("next");
                btnClick(e, "next");
              }}
              onMouseEnter={(e) => btnHover(e, "next")}
              onMouseLeave={btnLeave}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl cursor-pointer"
            >
              <ChevronRight className="h-6 w-6 text-[#259825]" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="w-full overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-4 px-[calc(50%-150px)]"
          >
            {extendedTestimonials.map((t, i) => {
              const { title, body } = splitQuote(t.quote);
              const isActive = i === current;

              return (
                <div
                  key={i}
                  className={`flex-shrink-0 w-[280px] md:w-[300px] h-[220px] md:h-[240px] rounded-xl p-5 flex flex-col justify-between transition-all duration-500
                  ${
                    isActive
                      ? "bg-white border-2 border-white scale-100 shadow-2xl text-slate-900"
                      : "bg-black/20 backdrop-blur-md border-2 border-white scale-90 text-white"
                  }`}
                >
                  <div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-3 w-3 fill-current ${
                            isActive ? "text-[#259825]" : "text-white/40"
                          }`}
                        />
                      ))}
                    </div>

                    <h4 className="font-bold text-base mb-1 leading-tight">
                      {title}
                    </h4>

                    <p
                      className={`text-xs leading-relaxed line-clamp-3 ${
                        isActive ? "text-slate-600" : "text-white/70"
                      }`}
                    >
                      {body}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t pt-3 border-black/5">
                    <div>
                      <div className="font-bold text-xs">{t.name}</div>
                      <div
                        className={`text-[10px] ${
                          isActive ? "text-slate-500" : "text-white/40"
                        }`}
                      >
                        {t.role}
                      </div>
                    </div>

                    {/* <div
                      className={`flex items-center gap-1 text-[10px] font-medium ${
                        isActive ? "text-green-700" : "text-white/40"
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3 fill-current opacity-80" />
                      Verified
                    </div> */}
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