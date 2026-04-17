import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { AnimatedHero } from "@/components/ui/animated-hero";
import emaLogo from "@/assets/ema-logo.png";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";
import heroSlide5 from "@/assets/hero-slide-5.jpg";
import heroSlide6 from "@/assets/hero-slide-6.jpg";
import productCoffeeGreen from "@/assets/product-coffee-green.jpg";
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

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "500+", label: "Tons Monthly" },
  { value: "100+", label: "Happy Clients" },
  { value: "10K+", label: "Tons Exported" },
];

const miniProducts = [
  { name: "Green Coffee", image: productCoffeeGreen },
  { name: "Sesame Seeds", image: productSesame },
  { name: "Chickpea", image: productChickpea },
  { name: "Red Kidney Bean", image: productKidney },
  { name: "Mung Bean", image: productMungBean },
];

const HeroSection = () => {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) => (prev + 1) % miniProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative flex min-h-screen flex-col overflow-hidden">
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
        <div className="absolute inset-0 bg-foreground/55" />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-[200px] right-8 z-20 flex flex-col gap-2 md:bottom-[160px]">
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

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container relative z-10 mx-auto flex flex-1 items-center px-6 pt-24"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 font-body text-xs font-medium tracking-widest text-primary-foreground uppercase backdrop-blur-sm">
              <img src={emaLogo} alt="EMA Logo" className="h-5 w-5 rounded-full" />
              Since 2019 G.C.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-6 font-display text-5xl font-bold leading-[1.08] tracking-tight text-background md:text-7xl"
          >
            Premium Ethiopian
            <br />
            <AnimatedHero words={["Coffee", "Sesame Seeds", "Pulses", "Oil Seeds", "Medical Devices"]} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-10 max-w-xl font-body text-lg leading-relaxed text-background/80"
          >
            EMA Import and Export Pvt.Ltd. — exporting the finest Ethiopian green coffee beans, sesame seeds, Niger seeds, haricot beans, chickpea, green mung bean, and red kidney bean while importing essential medical devices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/export-products"
                className="magnetic-btn group flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-sm font-semibold text-primary-foreground"
              >
                Our Exports
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/import-products"
                className="flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-8 py-4 font-body text-sm font-semibold text-background backdrop-blur-sm transition-all hover:bg-background/20"
              >
                Import Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom right scrolling product cards */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-[200px] right-6 z-20 hidden md:bottom-[160px] md:right-12 lg:block"
      >
        <div className="relative h-36 w-[360px] overflow-hidden">
          <motion.div
            className="flex gap-3"
            animate={{ x: -(scrollIndex * 120) }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {[...miniProducts, ...miniProducts].map((product, i) => (
              <motion.div
                key={`${product.name}-${i}`}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group w-28 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-background/10 bg-background/10 backdrop-blur-md transition-all hover:bg-background/20"
              >
                <div className="aspect-square overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="px-2 py-2 text-center">
                  <span className="font-body text-[10px] font-medium text-background/90">{product.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="relative z-10 border-t border-background/10 bg-foreground/80 backdrop-blur-md"
      >
        <div className="container mx-auto grid grid-cols-2 divide-x divide-background/10 px-6 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="px-6 py-8 text-center transition-colors hover:bg-background/5"
            >
              <div className="mb-1 font-display text-3xl font-bold text-background md:text-4xl">
                {stat.value}
              </div>
              <div className="font-body text-sm text-background/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-[180px] left-1/2 -translate-x-1/2 md:bottom-[140px]"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-xs tracking-widest text-background/60 uppercase">Explore More</span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
