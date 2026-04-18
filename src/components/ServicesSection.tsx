import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Globe, Shield, Truck, Leaf, FlaskConical, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import coffeeLab from "@/assets/coffee-lab.png";
import teamFull from "@/assets/team-full.png";
import teamCupping from "@/assets/team-cupping.png";
import productCoffee from "@/assets/product-coffee.jpg";

const services = [
  {
    icon: Globe,
    title: "Global Export",
    description: "We export premium Ethiopian green coffee beans, sesame seeds, Niger seeds, pulses, and spices to buyers across Asia, Europe, Middle East, and North America.",
    image: teamFull
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Every shipment undergoes rigorous quality checks — from moisture and defect analysis to cupping scores — meeting the highest international food safety and export standards.",
    image: teamCupping
  },
  {
    icon: Truck,
    title: "Supply Chain & Logistics",
    description: "End-to-end supply chain management including sourcing, processing, packaging in GrainPro & jute bags, container shipping, customs clearance, and on-time delivery.",
    image: productCoffee
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description: "Direct partnerships with Ethiopian farmer cooperatives, promoting fair trade pricing, sustainable practices, and organic farming methods across producing regions.",
    image: coffeeLab
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
  const [activeImage, setActiveImage] = useState(coffeeLab);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="services" className="relative py-28 lg:py-36">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
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

        {/* Dynamic Service Grid */}
        <div className="mb-32 grid gap-12 lg:grid-cols-2 items-start">
          {/* Image Display - Changes on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="sticky top-32 h-[450px] overflow-hidden rounded-[2.5rem] shadow-2xl bg-muted"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="h-full w-full object-cover"
                alt="EMA Service Display"
              />
            </AnimatePresence>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
          </motion.div>

          {/* Service cards - Triggers image change */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid gap-4 sm:grid-cols-2"
          >
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = activeImage === service.image;
              
              return (
                <motion.div
                  key={service.title}
                  variants={cardVariants}
                  onMouseEnter={() => setActiveImage(service.image)}
                  className={`relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? "bg-primary border-primary shadow-xl scale-[1.02]" 
                      : "bg-white border-border hover:border-primary/30 hover:shadow-lg"
                  }`}
                >
                  <div className={`mb-6 inline-flex rounded-2xl p-4 transition-colors duration-500 ${
                    isActive ? "bg-white/20" : "bg-primary/10"
                  }`}>
                    <Icon className={`h-6 w-6 transition-colors duration-500 ${
                      isActive ? "text-white" : "text-primary"
                    }`} />
                  </div>
                  <h3 className={`mb-3 font-display text-xl font-bold transition-colors duration-500 ${
                    isActive ? "text-white" : "text-foreground"
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`font-body text-sm leading-relaxed transition-colors duration-500 ${
                    isActive ? "text-white/90" : "text-muted-foreground"
                  }`}>
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* How We Work - Refactored to match the requested design */}
        <div className="mt-20 py-20 bg-gray-100 rounded-[3rem] overflow-hidden">
          <div className="container mx-auto px-8 lg:px-16">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:items-start">
              {/* Left Column: Title and Header */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-12"
              >
                <div className="flex justify-between items-center border-b border-foreground/10 pb-6">
                  <span className="font-display italic text-lg opacity-60">// 05</span>
                  <span className="font-body text-xs uppercase tracking-[0.2em] opacity-60">/ WORK PROCESS</span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] italic text-foreground tracking-tight">
                  a seamless <br />
                  <span className="text-primary">experience</span> made <br />
                  for you
                </h2>
              </motion.div>

              {/* Right Column: Steps and Content Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-[3rem] shadow-xl overflow-hidden"
              >
                {/* Step Tabs */}
                <div className="grid grid-cols-4 border-b border-foreground/5">
                  {steps.map((step, i) => {
                    const isActive = activeStep === i;
                    return (
                      <button
                        key={step.title}
                        onClick={() => setActiveStep(i)}
                        className={`py-8 text-center transition-all duration-500 relative group ${
                          isActive 
                            ? "bg-primary text-white" 
                            : "bg-white text-foreground/40 hover:text-primary"
                        }`}
                      >
                        <span className="font-display text-4xl md:text-5xl font-medium tracking-tighter">
                          0{i + 1}
                        </span>
                        {!isActive && (
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Content Area */}
                <div className="p-12 md:p-16 min-h-[300px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide text-foreground">
                        {steps[activeStep].title}
                      </h3>
                      <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        {steps[activeStep].description}
                      </p>
                      
                      <div className="pt-8">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-3 font-body text-sm font-bold uppercase tracking-widest text-primary hover:gap-5 transition-all duration-300"
                        >
                          Start This Step <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

