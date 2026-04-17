import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import teamCupping from "@/assets/team-cupping.png";
import coffeeLab from "@/assets/coffee-lab.png";
import aboutSeedlings from "@/assets/about-seedlings.png";

const highlights = [
  "Premium Ethiopian Arabica green coffee beans",
  "Sesame seeds, Niger seeds & oil seed crops",
  "Chickpea, haricot beans, mung bean & red kidney bean",
  "Medical equipment & diagnostic devices import",
  "ISO-certified processing & Coffee Laboratory",
  "Direct farmer partnerships & fair trade",
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative overflow-hidden py-28 lg:py-36">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Top section */}
        <div className="mb-20 grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-primary uppercase">
              About EMA Ethiopia
            </span>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Connecting{" "}
              <span className="text-gradient">Ethiopia's Finest</span>{" "}
              to the World
            </h2>
            <p className="mb-6 font-body text-lg leading-relaxed text-muted-foreground">
              Since 2019, EMA Import and Export Pvt.Ltd. has been at the forefront of Ethiopian international trade. We specialize in exporting premium green coffee beans, oil seeds, pulses, and spices while importing essential medical equipment to strengthen Ethiopia's healthcare infrastructure.
            </p>
            <p className="mb-8 font-body text-base text-muted-foreground">
              Operating under the Droga Pharma umbrella, we maintain ISO-certified processing facilities and a state-of-the-art Coffee Laboratory for cupping and grading. Our direct relationships with Ethiopian farmers and cooperatives ensure the highest quality at every step.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-body text-sm font-semibold text-background"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} className="col-span-2 overflow-hidden rounded-3xl">
              <img src={teamCupping} alt="EMA Coffee team cupping session" className="h-64 w-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl">
              <img src={coffeeLab} alt="EMA Coffee Laboratory" className="h-40 w-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl">
              <img src={aboutSeedlings} alt="Ethiopian seedlings" className="h-40 w-full object-cover" />
            </motion.div>
          </motion.div>
        </div>

        {/* What we do highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="rounded-3xl border border-border bg-card p-10 lg:p-14"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="mb-4 font-display text-3xl font-bold text-foreground">
                What We <span className="text-gradient">Deliver</span>
              </h3>
              <p className="font-body text-base text-muted-foreground">
                From Ethiopia's fertile highlands to global markets — we handle sourcing, processing, quality testing, and logistics for every shipment.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="font-body text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
