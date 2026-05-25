import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { ArrowDown, ArrowRight } from "lucide-react";
import emaLogo from "@/assets/ema-logo.png";
import heroSlide1 from "@/assets/testimony.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";
import heroSlide5 from "@/assets/hero-slide-5.jpg";
import heroSlide6 from "@/assets/hero-slide-6.jpg";
import productCoffeeGreen from "@/assets/export-imgs/coffee2.png";
import productSesame from "@/assets/product-sesame.jpg";
import productChickpea from "@/assets/product-chickpea.jpg";
import productKidney from "@/assets/product-kidney.png";
import productMungBean from "@/assets/product-mung-bean.jpg";

const slides = [
  { image: heroSlide1, alt: "Ethiopian green coffee cherries on branch" },
  { image: heroSlide2, alt: "Ethiopian coffee picking at golden hour" },
  { image: heroSlide3, alt: "Sesame seeds harvest in Ethiopia" },
  { image: heroSlide4, alt: "Ethiopian pulses and beans at market" },
  { image: heroSlide5, alt: "Coffee drying beds in Ethiopian highlands" },
  { image: heroSlide6, alt: "Ethiopian export shipping logistics" },
];

const grainProducts = [
  { name: "Coffee", image: productCoffeeGreen },
  { name: "Sesame Seeds", image: productSesame },
  { name: "Chickpea", image: productChickpea },
  { name: "Red Kidney", image: productKidney },
  { name: "Mung Bean", image: productMungBean },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Refs for bg images
  const bgImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const bgContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Refs for content elements
  const foundingDateRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const exploreBtnRef = useRef<HTMLAnchorElement>(null);
  const grainContainerRef = useRef<HTMLDivElement>(null);
  const grainTrackRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Background slide cycling
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Animate slide transitions
  useEffect(() => {
    bgContainerRefs.current.forEach((container, i) => {
      if (!container) return;
      if (i === currentSlide) {
        gsap.set(container, { zIndex: 2 });
        gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 1.8, ease: "power2.inOut" });
        const img = bgImgRefs.current[i];
        if (img) {
          gsap.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 8, ease: "none" });
        }
      } else {
        gsap.to(container, { opacity: 0, duration: 1.8, ease: "power2.inOut" });
        gsap.set(container, { zIndex: 1, delay: 1.8 });
      }
    });
  }, [currentSlide]);

  // Grain product scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % grainProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate grain track scroll
// 1. Remove the old scrollIndex state and the two grain-related useEffects
// 2. Add this new useEffect for the infinite loop:

useEffect(() => {
  if (!grainTrackRef.current) return;

  const totalItems = grainProducts.length;
  const itemWidth = 150;
  const gap = 12;
  const stepDistance = itemWidth + gap;

  // Create a continuous seamless loop
  const ctx = gsap.context(() => {
    gsap.to(grainTrackRef.current, {
      x: `-=${stepDistance * totalItems}`,
      duration: totalItems * 3, // 3 seconds per grain
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          // This keeps the value looping between 0 and the total width
          return parseFloat(x) % (stepDistance * totalItems);
        }),
      },
    });
  });

  return () => ctx.revert();
}, []);

  // Entry animations on mount
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(foundingDateRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3);
    tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
    tl.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.8);
    tl.fromTo(exploreBtnRef.current, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 1.0);
    tl.fromTo(grainContainerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.2);
    tl.fromTo(descriptionRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.3);
    tl.fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.3);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col"
    >
      {/* Background slider */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { bgContainerRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 }}
          >
            <img
              ref={(el) => { bgImgRefs.current[i] = el; }}
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        {/* Gradient overlay — bottom to top, 80% coverage */}
        <div 
          className="absolute inset-0" 
          style={{ 
            zIndex: 3,
            background: "linear-gradient(to top, rgba(37,153,37,0.97) 0%, rgba(37,153,37,0.90) 15%, rgba(37,153,37,0.60) 45%, rgba(37,153,37,0) 100%)"
          }} 
        />
      </div>

      {/* ============ MAIN CONTENT LAYER ============ */}
      {/* We use an overlay layout separated into absolute positioned chunks to explicitly control positioning seamlessly without depending on unpredictable flex flow. */}
      <div className="relative z-10 w-full h-full pointer-events-none">

        {/* === ABSOLUTE CENTER BLOCK: Fixed vertically slightly above center = 45% === */}
        {/* Ensures the bottom items are always completely visible, whilst properly centering title text blocks. */}
        <div className="absolute top-[40%] md:top-[45%] left-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center px-4 md:px-6 pointer-events-auto">

          {/* Founding Date — original translucent pill badge */}
          <span
            ref={foundingDateRef}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 font-body text-xs font-medium tracking-widest text-primary-foreground uppercase backdrop-blur-sm"
            style={{ opacity: 0 }}
          >
            <img src={emaLogo} alt="EMA Logo" className="h-5 w-5 rounded-full" />
            Since 2019 G.C.
          </span>

          {/* Title — "Premium Ethiopian" + animated words */}
          <h1
  ref={titleRef}
  className="flex flex-col items-center justify-center text-center font-display text-4xl sm:text-5xl font-bold text-white md:text-7xl lg:text-[5rem]"
  style={{ opacity: 1 }}
>
  <span className="block">Premium Ethiopian</span>
  
  <div className="flex justify-center items-center min-h-[1.2em] w-full">
    <AnimatedHero words={["Coffee", "Sesame Seeds", "Pulses", "Oil Seeds", "Medical Devices"]} />
  </div>
</h1>

          {/* Subtitle line */}
          <div
            ref={subtitleRef}
            className="mb-8 max-w-lg font-body text-base font-light tracking-wide text-white/80 md:text-lg"
            style={{ opacity: 0 }}
          >
            We Supply The Organic Taste Of Ethiopia!
          </div>

          <a
  ref={exploreBtnRef}
  href="#about"
  className="group relative mb-8 flex h-[40px] w-fit items-center rounded-full bg-[#154716] transition-all duration-300 hover:scale-105 md:h-[46px]"
>
  {/* Text Section */}
  <div className="flex h-full items-center justify-center rounded-full bg-white px-5 mr-1 md:px-6">
    <p className="whitespace-nowrap font-display text-xs font-bold tracking-wide text-[#154716] md:text-sm">
      Explore
    </p>
  </div>

  {/* Arrow Section */}
  <div className="flex items-center justify-center px-2 md:px-3">
    <ArrowDown className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-y-1 md:h-5 md:w-5" />
  </div>
</a>

{/* Changing Grains — 3-4 visible, taller cards */}
<div
  ref={grainContainerRef}
  className="relative w-full max-w-[640px] md:w-[640px] overflow-hidden drop-shadow-md mx-auto"
  style={{ opacity: 0 }}
>
  <div 
    ref={grainTrackRef} 
    className="flex gap-3"
    style={{ 
      width: "max-content",
      paddingLeft: "16px" 
    }}
  >
    {[...grainProducts, ...grainProducts].map((product, i) => (
      <div
        key={`${product.name}-${i}`}
        className="w-[150px] shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/10 backdrop-blur-md transition-all hover:bg-white/20"
      >
        <div className="h-[150px] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-400 hover:scale-110"
          />
        </div>
        <div className="px-2 py-2 text-center">
          <span className="font-body text-[10px] font-medium text-white/90">
            {product.name}
          </span>
        </div>
      </div>
    ))}
  </div>

  <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/30 to-transparent pointer-events-none z-10" />
  <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/30 to-transparent pointer-events-none z-10" />
</div>
        </div>

        {/* === ABSOLUTE BOTTOM ROW === */}
        {/* Anchored independently to bottom of the screen */}
        <div className="absolute bottom-8 lg:bottom-12 left-0 w-full px-6 md:px-12 pointer-events-auto">
          <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
            {/* Bottom Left: Import/Export Buttons — Green main div, White inside */}
            <div
              ref={buttonsRef}
              className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6"
              style={{ opacity: 0 }}
            >
            <Link
              to="/export-products"
              className="group relative flex h-[40px] w-fit items-center overflow-hidden rounded-full bg-white transition-transform duration-300 md:h-[46px]"
            >
              {/* Inner Green Pill with Ring Fix */}
              <div className="flex h-full items-center justify-center rounded-full bg-[#154716] px-5 ring-1 ring-[#154716] md:px-6">
                <p className="whitespace-nowrap font-display text-xs font-bold tracking-wide text-white md:text-sm">
                  Our Exports
                </p>
              </div>

              {/* Arrow Section */}
              <div className="flex items-center justify-center px-2 md:px-3">
                <ArrowRight className="h-4 w-4 text-[#154716] transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5" />
              </div>
            </Link>

            <Link
              to="/import-products"
              className="group relative flex h-[40px] w-fit items-center overflow-hidden rounded-full bg-white transition-transform duration-300 md:h-[46px]"
            >
              {/* Inner Green Pill */}
              <div className="flex h-full items-center justify-center rounded-full bg-[#154716] px-5 ring-1 ring-[#154716] md:px-6">
                <p className="whitespace-nowrap font-display text-xs font-bold tracking-wide text-white md:text-sm">
                  Import Products
                </p>
              </div>

              {/* Arrow Section */}
              <div className="flex items-center justify-center px-2 md:px-3">
                <ArrowRight className="h-4 w-4 text-[#154716] transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5" />
              </div>
            </Link>
            </div>

            {/* Bottom Right: Long Description */}
            <p
              ref={descriptionRef}
              className="max-w-sm md:max-w-lg text-center font-body text-[10px] leading-relaxed text-white md:text-right md:text-sm"
              style={{ opacity: 0 }}
            >
              Since 2019 G.C. EMA Import And Export Pvt.Ltd. Has Been Focused On Export Business Particularly
              On Export Of Best Quality Ethiopia Coffee, Oil Seeds &amp; Pulses Like Sesame Seeds, Niger Seeds,
              Haricot Beans, Chick Pea, Beans, Green Mung Bean And Red Kidney Bean.
            </p>
          </div>
        </div>
      </div>

      {/* Slide indicators — right side */}
      <div className="absolute top-1/2 right-4 z-20 flex -translate-y-1/2 flex-col gap-2 md:right-6 pointer-events-auto">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${i === currentSlide
                ? "h-6 bg-primary"
                : "bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
