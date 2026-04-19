import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import emaLogo from "@/assets/ema-logo.png";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";
import heroSlide5 from "@/assets/hero-slide-5.jpg";
import heroSlide6 from "@/assets/hero-slide-6.jpg";

const slides = [
  { image: heroSlide1, alt: "Ethiopian green coffee cherries" },
  { image: heroSlide2, alt: "Ethiopian coffee picking" },
  { image: heroSlide3, alt: "Sesame seeds harvest" },
  { image: heroSlide4, alt: "Ethiopian pulses and beans" },
  { image: heroSlide5, alt: "Coffee drying beds" },
  { image: heroSlide6, alt: "Export shipping logistics" },
];

interface PageHeroProps {
  badge: string;
  title: React.ReactNode;
  description: string;
}

const PageHero = ({ badge, title, description }: PageHeroProps) => {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section ref={containerRef} data-nav-theme="dark" className="relative flex min-h-[70vh] flex-col overflow-hidden">
      {/* Background slider with overlay crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            style={{ y: imageY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <motion.img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].alt}
              className="h-full w-full object-cover"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === currentSlide ? "h-6 bg-primary" : "bg-background/30 hover:bg-background/50"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container relative z-10 mx-auto flex flex-1 items-center px-6 pt-32 pb-16"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 font-body text-xs font-medium tracking-widest text-primary-foreground uppercase backdrop-blur-sm">
              <img src={emaLogo} alt="EMA" className="h-5 w-5 rounded-full" />
              {badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6 font-display text-5xl font-bold leading-[1.08] tracking-tight text-background md:text-7xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-lg font-body text-lg leading-relaxed text-background/80"
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default PageHero;
