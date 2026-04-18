import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import blogCafeshow from "@/assets/blog-cafeshow.svg";
import blogQuality from "@/assets/blog-quality.svg";
import blogEthcof from "@/assets/blog-ethcof.svg";

const blogPosts = [
  {
    image: blogCafeshow,
    category: "Event",
    title: "Join Us at the 23rd Seoul International Cafe Show",
    excerpt:
      "We're excited to invite you to the 23rd Seoul International Cafe Show, taking place from November 6–9, 2024, at Coex in Seoul, South Korea. Visit our booth to sample premium Ethiopian green coffee beans.",
  },
  {
    image: blogQuality,
    category: "Quality",
    title: "Ethiopia is Home to Several Unique Coffee Varieties",
    excerpt:
      "From the floral notes of Yirgacheffe to the fruity profiles of Sidamo and the wine-like tones of Harrar — each Ethiopian region produces distinctly unique green coffee beans prized by specialty roasters.",
  },
  {
    image: blogEthcof,
    category: "Heritage",
    title: "Ethiopia, the Birthplace of Coffee",
    excerpt:
      "Known globally as the origin of Arabica coffee, Ethiopia produces some of the world's most sought-after green coffee beans. Our direct farm partnerships ensure every lot meets specialty-grade standards.",
  },
  {
    image: blogQuality,
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
  const prevIndex = useRef(0);

  // Initial entrance animation
  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in the first background
    if (bgRefs.current[0]) {
      gsap.set(bgRefs.current[0], { opacity: 1, y: 0 });
    }

    // Animate the miniature image in from the right
    if (miniImageRefs.current[0]) {
      tl.fromTo(
        miniImageRefs.current[0],
        { opacity: 0, x: 80, scale: 0.85 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
        0.3
      );
    }

    // Animate text elements
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.5
    );
    tl.fromTo(
      excerptRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.65
    );
    tl.fromTo(
      numberRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      0.4
    );
    tl.fromTo(
      categoryRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
      0.55
    );
  }, []);

  const animateToSlide = useCallback(
    (newIndex: number, direction: "left" | "right") => {
      if (isAnimating || newIndex === activeIndex) return;
      setIsAnimating(true);

      const oldIdx = activeIndex;
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          prevIndex.current = newIndex;
        },
      });

      const slideDirection = direction === "right" ? 1 : -1;

      // === BACKGROUND TRANSITION (horizontal swipe) ===
      // New background slides in from side
      if (bgRefs.current[newIndex]) {
        gsap.set(bgRefs.current[newIndex], {
          opacity: 1,
          x: direction === "right" ? "100%" : "-100%",
          y: 0,
          zIndex: 2,
        });
        tl.to(
          bgRefs.current[newIndex],
          {
            x: "0%",
            duration: 0.9,
            ease: "power3.inOut",
          },
          0
        );
      }

      // Old background fades out slightly and slides to side
      if (bgRefs.current[oldIdx]) {
        tl.to(
          bgRefs.current[oldIdx],
          {
            x: direction === "right" ? "-30%" : "30%",
            opacity: 0.3,
            duration: 0.9,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(bgRefs.current[oldIdx]!, {
                x: 0,
                opacity: 0,
                zIndex: 0,
              });
            },
          },
          0
        );
      }

      // === TEXT ELEMENTS EXIT ===
      tl.to(
        titleRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.35,
          ease: "power2.in",
        },
        0
      );
      tl.to(
        excerptRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        0.05
      );
      tl.to(
        categoryRef.current,
        {
          opacity: 0,
          x: slideDirection * -30,
          duration: 0.3,
          ease: "power2.in",
        },
        0
      );
      tl.to(
        numberRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        0
      );

      // === MINIATURE IMAGE EXIT (slides out to the opposite side) ===
      if (miniImageRefs.current[oldIdx]) {
        tl.to(
          miniImageRefs.current[oldIdx],
          {
            opacity: 0,
            x: slideDirection * -120,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(miniImageRefs.current[oldIdx]!, {
                x: 0,
                opacity: 0,
                scale: 0.85,
              });
            },
          },
          0
        );
      }

      // === UPDATE STATE MID-ANIMATION ===
      tl.call(() => setActiveIndex(newIndex), [], 0.45);

      // === MINIATURE IMAGE ENTER (slides in from the direction of navigation) ===
      if (miniImageRefs.current[newIndex]) {
        gsap.set(miniImageRefs.current[newIndex], {
          x: slideDirection * 120,
          opacity: 0,
          scale: 0.85,
        });
        tl.to(
          miniImageRefs.current[newIndex],
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          0.45
        );
      }

      // === TEXT ELEMENTS ENTER ===
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.55
      );
      tl.fromTo(
        excerptRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        0.65
      );
      tl.fromTo(
        numberRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.5
      );
      tl.fromTo(
        categoryRef.current,
        { opacity: 0, x: slideDirection * 30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
        0.55
      );
    },
    [activeIndex, isAnimating]
  );

  const goNext = useCallback(() => {
    const newIndex = (activeIndex + 1) % blogPosts.length;
    animateToSlide(newIndex, "right");
  }, [activeIndex, animateToSlide]);

  const goPrev = useCallback(() => {
    const newIndex =
      (activeIndex - 1 + blogPosts.length) % blogPosts.length;
    animateToSlide(newIndex, "left");
  }, [activeIndex, animateToSlide]);

  const padNumber = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh", minHeight: 600 }}
    >
      {/* ── Background Images Layer ── */}
      <div className="absolute inset-0 z-0">
        {blogPosts.map((post, index) => (
          <div
            key={`bg-${index}`}
            ref={(el) => (bgRefs.current[index] = el)}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${post.image})`,
              opacity: index === 0 ? 1 : 0,
              zIndex: index === 0 ? 1 : 0,
              willChange: "transform, opacity",
            }}
          />
        ))}
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      {/* ── Navigation Arrows (Edges) ── */}
      <div className="absolute inset-y-0 left-4 right-4 z-20 flex items-center justify-between pointer-events-none md:left-10 md:right-10">
        <button
          onClick={goPrev}
          disabled={isAnimating}
          className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-black/40 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white/50 transition-colors group-hover:text-white" />
        </button>
        <button
          onClick={goNext}
          disabled={isAnimating}
          className="group pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-black/40 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white/50 transition-colors group-hover:text-white" />
        </button>
      </div>

      {/* ── Content Layer ── */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-12 md:px-16 lg:px-24">
        {/* Top: Section label */}
        <div className="mb-8">
          <span className="inline-block font-body text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase">
            Latest Updates & Insights
          </span>
        </div>

        {/* Middle: Main Content Area */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:gap-16">
          {/* Left Column: Text Content */}
          <div className="flex max-w-xl flex-1 flex-col justify-center order-2 lg:order-1">
            {/* Category badge */}
            <span
              ref={categoryRef}
              className="mb-4 inline-block w-fit rounded-full border border-white/20 px-4 py-1.5 font-body text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase backdrop-blur-sm"
            >
              {blogPosts[activeIndex].category}
            </span>

            {/* Title */}
            <div ref={titleRef}>
              <h2 className="mb-5 font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {blogPosts[activeIndex].title}
              </h2>
            </div>

            {/* Excerpt */}
            <p
              ref={excerptRef}
              className="mb-8 max-w-md font-body text-sm leading-relaxed text-white/60 md:text-base"
            >
              {blogPosts[activeIndex].excerpt}
            </p>

            {/* Read More link */}
            <div className="flex items-center gap-2 font-body text-xs font-semibold tracking-widest text-white/40 uppercase transition-colors hover:text-white/80 cursor-pointer">
              <span>Read Article</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Right Column: Miniature Image */}
          <div className="relative flex items-center justify-center order-1 lg:order-2" style={{ minWidth: 280, minHeight: 280 }}>
            {/* Decorative ring behind image */}
            <div
              className="absolute rounded-2xl border border-white/[0.06]"
              style={{
                width: "calc(100% + 32px)",
                height: "calc(100% + 32px)",
                top: -16,
                left: -16,
              }}
            />

            {blogPosts.map((post, index) => (
              <img
                key={`mini-${index}`}
                ref={(el) => (miniImageRefs.current[index] = el)}
                src={post.image}
                alt={post.title}
                className="absolute rounded-2xl object-cover shadow-2xl"
                style={{
                  width: 280,
                  height: 320,
                  opacity: index === 0 ? 1 : 0,
                  willChange: "transform, opacity",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom: Navigation Bar */}
        <div className="mt-8 flex items-center justify-center">
          {/* Centered Slide Number */}
          <div ref={numberRef} className="flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold text-white md:text-5xl">
              {padNumber(activeIndex)}
            </span>
            <span className="font-body text-sm text-white/30">
              {" "}
              / {padNumber(blogPosts.length - 1)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
