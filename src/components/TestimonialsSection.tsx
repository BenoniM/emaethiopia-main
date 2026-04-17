import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Kim Sung-Ho",
    role: "Coffee Buyer, Seoul",
    quote: "EMA's green coffee beans are exceptional. The Yirgacheffe natural process we sourced had incredible blueberry and floral notes. Their Coffee Laboratory testing gives us confidence in every shipment.",
    rating: 5,
  },
  {
    name: "Hans Weber",
    role: "Specialty Roaster, Hamburg",
    quote: "We've been importing Ethiopian green coffee from EMA for 3 years. The consistency in quality, reliable logistics, and their direct farmer relationships make them our preferred partner.",
    rating: 5,
  },
  {
    name: "Fatima Al-Rashid",
    role: "Trading Company, Dubai",
    quote: "The sesame seeds and chickpeas we source from EMA meet the highest food safety standards. Their ISO-certified processing and responsive team make international trade seamless.",
    rating: 5,
  },
  {
    name: "Dr. Tadesse Bekele",
    role: "Hospital Director, Addis Ababa",
    quote: "EMA's medical equipment import division has been instrumental in equipping our emergency department. The stretcher trolleys and diagnostic devices are high quality with excellent after-sales support.",
    rating: 5,
  },
  {
    name: "Yuki Tanaka",
    role: "Green Coffee Importer, Tokyo",
    quote: "What sets EMA apart is their Coffee Laboratory — they provide detailed cupping scores and quality certificates with every lot. The Sidamo and Jimma coffees are outstanding.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="relative overflow-hidden py-28 lg:py-36" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">
            Testimonials
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
            Trusted by coffee buyers, roasters, trading companies, and healthcare providers worldwide.
          </p>
        </motion.div>

        {/* Orbital-style testimonial carousel */}
        <div className="relative mx-auto max-w-4xl">
          {/* Decorative orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute h-[500px] w-[500px] rounded-full border border-border/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute h-[600px] w-[600px] rounded-full border border-border/20"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute h-[700px] w-[700px] rounded-full border border-border/10"
            />
          </div>

          {/* Floating dots on orbits */}
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                top: `${20 + i * 15}%`,
                left: i % 2 === 0 ? "-2%" : "98%",
              }}
              className={`z-10 h-3 w-3 rounded-full transition-colors duration-300 ${
                i === current ? "bg-primary scale-150" : "bg-border hover:bg-primary/50"
              }`}
            />
          ))}

          {/* Main testimonial card */}
          <div className="relative z-10 mx-auto max-w-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -direction * 100, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-border bg-card p-10 shadow-lg lg:p-14"
              >
                <Quote className="mb-6 h-10 w-10 text-primary/20" />
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-8 font-body text-lg leading-relaxed text-foreground italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display text-base font-bold text-foreground">{t.name}</div>
                    <div className="font-body text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </motion.button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-primary/30"
                    }`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
