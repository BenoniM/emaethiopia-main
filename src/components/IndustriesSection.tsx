import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Coffee, Building2, ArrowLeftRight, Sprout, ArrowUpRight } from "lucide-react";

const industries = [
  {
    icon: Coffee,
    title: "Coffee",
    description: "Supplying premium Arabica & Robusta to roasters and distributors worldwide from Ethiopia's finest regions.",
    color: "from-primary/10 to-primary/5",
  },
  {
    icon: Building2,
    title: "Construction",
    description: "Providing quality construction materials and equipment for projects across East Africa.",
    color: "from-primary/8 to-primary/3",
  },
  {
    icon: ArrowLeftRight,
    title: "Import & Export",
    description: "Full-service import and export operations connecting Ethiopian producers with global markets.",
    color: "from-primary/10 to-primary/5",
  },
  {
    icon: Sprout,
    title: "Agriculture",
    description: "Organic pulses, beans, seeds and grains for the global food processing and agriculture industry.",
    color: "from-primary/8 to-primary/3",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 } as const,
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const IndustriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="industries" className="relative bg-secondary py-28 lg:py-36">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-center"
        >
          <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">
            Industries We Serve
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Delivering Tailored Solutions Across{" "}
            <span className="text-gradient">Diverse Industries</span>
          </h2>
          <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
            At EMA, we understand that each industry has unique challenges and
            opportunities. We proudly operate under the umbrella of Droga Pharma.
          </p>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16 overflow-hidden"
        >
          <div className="flex animate-marquee gap-8 whitespace-nowrap">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-8">
                {["Discover EMA's", "Diverse Industries", "Shaping the Future", "Across Sectors", "Sustainable Growth", "Innovation"].map((text) => (
                  <span key={`${setIdx}-${text}`} className="font-display text-5xl font-bold text-border md:text-7xl">
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Industry cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-lift group cursor-pointer rounded-3xl border border-border bg-background p-8 text-center transition-all duration-400 hover:border-primary/30 hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.15 }}
                  className={`mx-auto mb-6 inline-flex rounded-2xl bg-gradient-to-br ${item.color} p-5`}
                >
                  <Icon className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="mb-3 font-display text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="inline-flex items-center gap-1 font-body text-sm font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  Learn More <ArrowUpRight className="h-4 w-4" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
