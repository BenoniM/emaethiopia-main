import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import { Globe, Shield, Truck, Leaf, FlaskConical, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Add custom styles for the 3D effect
const sectionStyles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .center-image-container {
    transform-style: preserve-3d;
  }
  @media (max-width: 1024px) {
    .center-image-container {
      max-width: 300px;
      opacity: 0.2; /* Fade back on smaller screens to allow text readability */
    }
  }
`;

gsap.registerPlugin(ScrollTrigger);
import assurance from "@/assets/serv/assurance.png";
import globalExport from "@/assets/serv/global-export.jpg";
import logistics from "@/assets/serv/logistice.jpg";
import sourcing from "@/assets/serv/sourcing.jpg";

import shareReq from "@/assets/work-process/share-req.jpg";
import sourceProcess from "@/assets/work-process/source-process.jpg";
import qualityTest from "@/assets/work-process/quality-test.png";
import exportDelivery from "@/assets/work-process/export-delivery.jpg";

const services = [
  {
    icon: Globe,
    title: "Global Export",
    description: "We export premium Ethiopian green coffee beans, sesame seeds, Niger seeds, pulses, and spices to buyers across Asia, Europe, Middle East, and North America.",
    image: globalExport
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Every shipment undergoes rigorous quality checks — from moisture and defect analysis to cupping scores — meeting the highest international food safety and export standards.",
    image: assurance
  },
  {
    icon: Truck,
    title: "Supply Chain & Logistics",
    description: "End-to-end supply chain management including sourcing, processing, packaging in GrainPro & jute bags, container shipping, customs clearance, and on-time delivery.",
    image: logistics
  },
  {
    icon: Leaf,
    title: "Sustainable Sourcing",
    description: "Direct partnerships with Ethiopian farmer cooperatives, promoting fair trade pricing, sustainable practices, and organic farming methods across producing regions.",
    image: sourcing
  },
];

const steps = [
  { title1: "SHARE YOUR", title2: "REQUIREMENTS", description: "Tell us what products you need, volumes, and quality specifications.", image: shareReq },
  { title1: "SOURCING &", title2: "PROCESSING", description: "We source from trusted Ethiopian cooperatives and process in ISO-certified facilities.", image: sourceProcess },
  { title1: "QUALITY TESTING", title2: "& CERTIFICATION", description: "Every batch is tested in our Coffee Laboratory and quality assurance labs.", image: qualityTest },
  { title1: "EXPORT &", title2: "DELIVERY", description: "Professional packaging, container shipping, and full documentation for smooth delivery.", image: exportDelivery },
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
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Image container entry from bottom
      gsap.from(".center-image-container", {
        y: "60vh",
        opacity: 0,
        rotateX: 15,
        scale: 0.8,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        }
      });

      // 2. Individual Image Transitions
      services.forEach((_, i) => {
        // Handle image visibility based on which card is in view
        gsap.to(imagesRef.current[i], {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: cardsRef.current[i],
            start: "top center+=250",
            end: "bottom center-=250",
            toggleActions: "play reverse play reverse",
          }
        });

        // Card animation
        gsap.from(cardsRef.current[i], {
          opacity: 0.1,
          y: 100,
          scale: 0.9,
          duration: 0.5,
          scrollTrigger: {
            trigger: cardsRef.current[i],
            start: "top bottom",
            end: "top center",
            scrub: true,
          }
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Custom Styles */}
      <style>{sectionStyles}</style>

      {/* Coffee Laboratory & Trade Services */}
      <section id="services" ref={sectionRef} className="relative bg-background">
        {/* Static Header - Still scrolls normally until reaching the animation trigger */}
        <div className="container mx-auto px-6 pt-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-primary uppercase">
              Our Services
            </span>
            <div className="grid gap-8 lg:grid-cols-2">
              <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl max-w-lg">
                Coffee Laboratory{" "}
                <span className="text-gradient">& Trade</span> Services
              </h2>
              <p className="font-body text-sm tracking-wide lg:pt-2">
                Our Coffee Laboratory Service ensures the highest quality in coffee production through comprehensive testing and flavor profiling. With state-of-the-art equipment and expert analysis, we help producers enhance their products for global markets.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Animation Wrapper - Defining the total scroll length */}
        <div ref={triggerRef} className="relative w-full min-h-[400vh]">
          {/* Sticky Image Container - Pinned to the center of the viewport */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="center-image-container relative w-[90vw] max-w-[450px] aspect-[4/5] rounded-[1rem] overflow-hidden shadow-2xl bg-muted z-10 perspective-1000 pointer-events-auto">
              {services.map((service, index) => (
                <img
                  key={index}
                  ref={(el) => (imagesRef.current[index] = el)}
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 scale-110 will-change-transform"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Scrolling Content - Each item takes 100vh to ensure it scrolls past the center image */}
          <div className="relative z-20 mt-[-100vh]">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`h-screen flex items-center px-6 lg:px-20 ${
                    isEven ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className={`w-full max-w-[380px] p-8 rounded-xl border bg-white/95 backdrop-blur-xl border-border shadow-2xl hover:border-primary/30 transition-shadow duration-500`}>
                    <div className="mb-6 inline-flex rounded-2xl p-4 bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-3 font-display text-2xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="font-body text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <Link to="/services" className="mt-6 flex items-center gap-2 text-primary font-semibold text-sm">
                      <span>Explore Service</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WorkProcessStack />
    </>
  );
};

const WorkProcessStack = () => {
  const containerRef = useRef(null);
  const stepsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = stepsRef.current;

      // We loop through all panels except the last one to pin them
      // OR we pin the container and animate the panels.
      // For the "Stacking" effect, pinning each one is best:
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: () => `top top+=${i * 120}`, // Adjust offset for the "peek" effect
          pin: true,
          pinSpacing: false, // This allows the next one to scroll over it
          endTrigger: containerRef.current,
          end: "bottom bottom",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background" id="how-we-work">
      {/* Intro Header */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground max-w-4xl">
          Our <span className="text-primary">Work Process</span>
        </h2>
      </div>

      <div className="relative w-full pb-[20vh]"> {/* Extra padding at bottom to see the final stack */}
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => (stepsRef.current[i] = el)}
            // Remove 'sticky' class, GSAP handles pinning
            className="w-full border-t border-border bg-background"
            style={{ zIndex: i }}
          >
            <div className="flex flex-col lg:flex-row w-full max-w-[1500px] mx-auto min-h-[400px] lg:min-h-[500px]">
              {/* Text Side */}
              <div className="lg:w-1/2 flex flex-col pt-6 pb-10 px-6 lg:px-12 xl:px-20 relative">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-1.5 h-1.5 bg-primary rotate-45" />
                  <span className="font-display italic text-base leading-none">0{i + 1}</span>
                </div>

                <div className="my-auto lg:-mt-4 pl-2 lg:pl-16">
                  <h3 className="flex flex-col text-foreground mb-4">
                    <span className="font-display text-lg md:text-xl lg:text-2xl font-medium tracking-wide leading-tight mb-0.5">
                      {step.title1}
                    </span>
                    <span className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider leading-[1.1]">
                      {step.title2}
                    </span>
                  </h3>
                  <p className="font-body text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Image Side */}
              <div className="lg:w-1/2 p-4 lg:p-8 xl:p-12 flex items-center justify-center">
                <div className="relative w-full h-[300px] lg:h-[400px] overflow-hidden group rounded-2xl shadow-xl">
                  <img
                    src={step.image}
                    alt={step.title1}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Link to="/industries" className="w-14 h-14 rounded-full border border-white/80 flex items-center justify-center text-white backdrop-blur-sm bg-black/10 transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 pointer-events-auto">
                      <ArrowRight className="w-5 h-5" strokeWidth={1} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;

