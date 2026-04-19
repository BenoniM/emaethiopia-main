import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Updated Image Imports
import birthplace from "@/assets/blog/birthplace.jpg";
import cafeShow from "@/assets/blog/Cafe-Show-Seoul-2023.jpeg";
import homeBg from "@/assets/blog/Home.jpg";
import specialty from "@/assets/blog/speciality.jpg";

const blogPosts = [
  {
    image: cafeShow,
    category: "Event",
    title: "Join Us at the 23rd Seoul International Cafe Show",
    excerpt:
      "We're excited to invite you to the 23rd Seoul International Cafe Show, taking place from November 6–9, 2024, at Coex in Seoul, South Korea. Visit our booth to sample premium Ethiopian green coffee beans.",
  },
  {
    image: homeBg,
    category: "Quality",
    title: "Ethiopia is Home to Several Unique Coffee Varieties",
    excerpt:
      "From the floral notes of Yirgacheffe to the fruity profiles of Sidamo and the wine-like tones of Harrar — each Ethiopian region produces distinctly unique green coffee beans prized by specialty roasters.",
  },
  {
    image: birthplace,
    category: "Heritage",
    title: "Ethiopia, the Birthplace of Coffee",
    excerpt:
      "Known globally as the origin of Arabica coffee, Ethiopia produces some of the world's most sought-after green coffee beans. Our direct farm partnerships ensure every lot meets specialty-grade standards.",
  },
  {
    image: specialty,
    category: "Expo",
    title: "EMA Coffee at Specialty Coffee Expo 2024",
    excerpt:
      "EMA Coffee participated in the Specialty Coffee Expo 2024 in Chicago, showcasing our range of washed and natural processed Ethiopian green coffee beans to international buyers and roasters.",
  },
];

const BlogSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const miniImageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const excerptRef = useRef<HTMLParagraphElement>(null);

  // Initial entrance animation
  useEffect(() => {
    const tl = gsap.timeline();
    if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

    tl.fromTo(
      miniImageRefs.current[0],
      { opacity: 0, x: 80, scale: 0.85 },
      { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power4.out" },
      0.3
    );

    tl.fromTo(
      [numberRef.current, categoryRef.current, titleRef.current, excerptRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      0.4
    );
  }, []);

  const animateToSlide = useCallback(
    (newIndex: number, direction: "left" | "right") => {
      if (isAnimating || newIndex === activeIndex) return;
      setIsAnimating(true);

      const oldIdx = activeIndex;
      const slideDirection = direction === "right" ? 1 : -1;
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // === BACKGROUND TRANSITION ===
      if (bgRefs.current[newIndex]) {
        gsap.set(bgRefs.current[newIndex], {
          x: direction === "right" ? "100%" : "-100%",
          opacity: 1,
          zIndex: 2,
        });
        tl.to(bgRefs.current[newIndex], {
          x: "0%",
          duration: 1.1,
          ease: "expo.inOut",
        }, 0);
      }

      if (bgRefs.current[oldIdx]) {
        tl.to(bgRefs.current[oldIdx], {
          x: direction === "right" ? "-30%" : "30%",
          opacity: 0,
          duration: 1.1,
          ease: "expo.inOut",
          onComplete: () => {
            gsap.set(bgRefs.current[oldIdx]!, { zIndex: 0 });
          },
        }, 0);
      }

      // === CONTENT OUT ===
      tl.to([titleRef.current, excerptRef.current, categoryRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      }, 0);

      if (miniImageRefs.current[oldIdx]) {
        tl.to(miniImageRefs.current[oldIdx], {
          opacity: 0,
          x: slideDirection * -100,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.inOut",
        }, 0);
      }

      // === UPDATE STATE ===
      tl.call(() => setActiveIndex(newIndex), [], 0.5);

      // === CONTENT IN ===
      if (miniImageRefs.current[newIndex]) {
        gsap.set(miniImageRefs.current[newIndex], {
          x: slideDirection * 100,
          opacity: 0,
          scale: 0.9,
        });
        tl.to(miniImageRefs.current[newIndex], {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }, 0.6);
      }

      tl.fromTo(
        [categoryRef.current, titleRef.current, excerptRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
        0.7
      );
    },
    [activeIndex, isAnimating]
  );

  const goNext = () => animateToSlide((activeIndex + 1) % blogPosts.length, "right");
  const goPrev = () => animateToSlide((activeIndex - 1 + blogPosts.length) % blogPosts.length, "left");

  const padNumber = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh", minHeight: 650 }}
    >
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        {blogPosts.map((post, index) => (
          <div
            key={`bg-${index}`}
            ref={(el) => (bgRefs.current[index] = el)}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${post.image})`,
              opacity: index === 0 ? 1 : 0,
              zIndex: index === 0 ? 1 : 0,
              willChange: "transform, opacity",
            }}
          >
            {/* Individual overlay for deeper contrast per slide */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
        {/* Global vignette/gradient */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* ── Arrows ── */}
      <div className="absolute inset-y-0 left-4 right-4 z-30 flex items-center justify-between pointer-events-none md:left-10 md:right-10">
        <button
          onClick={goPrev}
          disabled={isAnimating}
          className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all hover:bg-white disabled:opacity-20"
        >
          <ChevronLeft className="h-6 w-6 text-white group-hover:text-[#259825]" />
        </button>
        <button
          onClick={goNext}
          disabled={isAnimating}
          className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all hover:bg-white disabled:opacity-20"
        >
          <ChevronRight className="h-6 w-6 text-white group-hover:text-[#259825]" />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-12 md:px-16 lg:px-24">
        <div>
          <span className="font-body text-xl font-bold tracking-[0.3em] text-[#259825] uppercase">
            Latest Updates & Insights
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-12 lg:flex-row lg:gap-20">
          <div className="flex max-w-xl flex-1 flex-col order-2 lg:order-1">
            <span
              ref={categoryRef}
              className="mb-4 inline-block w-fit rounded-full border border-white/20 px-4 py-1.5 font-body text-[10px] font-semibold tracking-widest text-white/80 uppercase backdrop-blur-md"
            >
              {blogPosts[activeIndex].category}
            </span>

            <div ref={titleRef}>
              <h2 className="mb-6 font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                {blogPosts[activeIndex].title}
              </h2>
            </div>

            <p ref={excerptRef} className="mb-8 max-w-md font-body text-sm leading-relaxed text-white/90 md:text-base">
              {blogPosts[activeIndex].excerpt}
            </p>

            <button className="group flex items-center gap-3 w-fit font-body text-xs font-bold tracking-widest text-white/70 uppercase transition-colors hover:text-[#259825] hover:scale-110">
              <span>Read Article</span>
              <div className="h-[1px] w-8 bg-white/20 transition-all group-hover:w-12 group-hover:bg-[#259825]" />
            </button>
          </div>

          {/* Miniature Image Container */}
          <div className="relative order-1 lg:order-2">
            <div className="relative h-[300px] w-[260px] md:h-[400px] md:w-[320px]">
              {blogPosts.map((post, index) => (
                <img
                  key={`mini-${index}`}
                  ref={(el) => (miniImageRefs.current[index] = el)}
                  src={post.image}
                  alt=""
                  className="absolute inset-0 h-full w-full rounded-2xl object-cover shadow-2xl"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    willChange: "transform, opacity",
                    boxShadow: "0 30px 60px -12px rgba(0,0,0,0.7)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-center">
          <div ref={numberRef} className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-[#259825] md:text-6xl">
              {padNumber(activeIndex)}
            </span>
            <span className="font-body text-lg text-white/20">
              / {padNumber(blogPosts.length - 1)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;