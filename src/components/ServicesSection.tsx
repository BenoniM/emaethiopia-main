import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Shield, Truck, Leaf, FlaskConical, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import coffeeLab from "@/assets/coffee-lab.png";
import teamFull from "@/assets/team-full.png";
import teamCupping from "@/assets/team-cupping.png";

const services = [
  {
    icon: Globe,
    title: "Global Export",
    description: "We export premium Ethiopian green coffee beans, sesame seeds, Niger seeds, pulses, and spices to buyers across Asia, Europe, Middle East, and North America.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Every shipment undergoes rigorous quality checks — from moisture and defect analysis to cupping scores — meeting the highest international food safety and export standards.",
  },
  {
    icon: Truck,
    title: "Supply Chain & Logistics",
    description: "End-to-end supply chain management including sourcing, processing, packaging in GrainPro & jute bags, container shipping, customs clearance, and on-time delivery.",
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description: "Direct partnerships with Ethiopian farmer cooperatives, promoting fair trade pricing, sustainable practices, and organic farming methods across producing regions.",
  },
];

const steps = [
  { title: "Share Your Requirements", description: "Tell us what products you need, volumes, and quality specifications." },
  { title: "Sourcing & Processing", description: "We source from trusted Ethiopian cooperatives and process in ISO-certified facilities." },
  { title: "Quality Testing & Certification", description: "Every batch is tested in our Coffee Laboratory and quality assurance labs." },
  { title: "Export & Delivery", description: "Professional packaging, container shipping, and full documentation for smooth delivery." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 } as const,
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-28 lg:py-36">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-primary uppercase">
            Our Services
          </span>
          <div className="grid gap-8 lg:grid-cols-2">
            <h2 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Coffee Laboratory{" "}
              <span className="text-gradient">& Trade</span> Services
            </h2>
            <p className="font-body text-lg text-muted-foreground lg:pt-2">
              Our Coffee Laboratory Service ensures the highest quality in coffee production through comprehensive testing and flavor profiling. With state-of-the-art equipment and expert analysis, we help producers enhance their products for global markets.
            </p>
          </div>
        </motion.div>

        {/* Service grid with coffee lab images */}
        <div className="mb-24 grid gap-8 lg:grid-cols-2">
          {/* Image column - Coffee Lab */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} className="col-span-2 overflow-hidden rounded-3xl">
              <img src={coffeeLab} alt="EMA Coffee Laboratory cupping session" className="h-64 w-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl">
              <img src={teamFull} alt="EMA team at coffee cupping" className="h-40 w-full object-cover" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl">
              <img src={teamCupping} alt="Coffee quality testing" className="h-40 w-full object-cover" />
            </motion.div>
          </motion.div>

          {/* Service cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={cardVariants}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px -15px hsl(120 61% 37% / 0.1)" }}
                  className="card-lift group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="mb-4 inline-flex rounded-xl bg-primary/8 p-3"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </motion.div>
                  <h3 className="mb-2 font-display text-base font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* How We Work */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-primary uppercase">
              How We Work
            </span>
            <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              From Ethiopia{" "}
              <span className="text-gradient">to Your Door</span>
            </h2>
            <p className="mb-8 font-body text-muted-foreground">
              Whether you need a single container of specialty-grade green coffee or a full season's supply of sesame seeds, our streamlined export process makes it seamless.
            </p>

            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/20"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-display text-sm font-semibold text-foreground">{step.title}</span>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
              <Link
                to="/services"
                className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-body text-sm font-semibold text-background"
              >
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-3xl">
              <img src={teamFull} alt="EMA Coffee team quality testing" className="h-[420px] w-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
