import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
  FlaskConical,
  Award,
  Thermometer,
  Droplets,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Star,
  MapPin,
  Microscope,
  Coffee,
  BarChart3,
  Leaf,
  Shield,
  Users,
  ChevronDown,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogSection from "@/components/BlogSection";

// Assets
import teamCupping from "@/assets/team-cupping.png";
import teamFull from "@/assets/team-full.png";
import coffeeLab from "@/assets/coffee-lab.png";
import emaLogo from "@/assets/ema-logo.png";
import qualityTest from "@/assets/work-process/quality-test.png";
import assurance from "@/assets/serv/assurance.png";
import exportDelivery from "@/assets/work-process/export-delivery.jpg";
import sourcing from "@/assets/serv/sourcing.jpg";
import sample from "@/assets/process/sample.png";
import dry from "@/assets/process/dry.png";
import breaka from "@/assets/process/break.png";
import skim from "@/assets/process/skim.png";
import slurp from "@/assets/process/slurp.png";
import final from "@/assets/process/final.png";




gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const labServices = [
  {
    icon: Coffee,
    title: "Cupping & Sensory Analysis",
    description:
      "Professional cupping sessions following SCA protocols. We evaluate aroma, flavor, aftertaste, acidity, body, balance, and overall cup quality — producing detailed scoresheets for every lot.",
    tag: "Core Service",
    accent: "#2D7A2F",
  },
  {
    icon: Award,
    title: "Q-Grading & Certification",
    description:
      "Our certified Q-Graders score each coffee lot using the SCAA 100-point system. Lots scoring 80+ are classified as Specialty Grade, with full certification documentation provided.",
    tag: "Certification",
    accent: "#1B5E20",
  },
  {
    icon: FlaskConical,
    title: "Sample Roasting",
    description:
      "Precision sample roasting on calibrated lab-grade equipment to develop roast profiles that reveal each coffee's full potential before buyer commitments and shipment.",
    tag: "Processing",
    accent: "#2D7A2F",
  },
  {
    icon: Thermometer,
    title: "Moisture & Defect Testing",
    description:
      "Electronic moisture measurement, screen size grading, and primary/secondary defect counting per SCAA and ECX standards to ensure every consignment meets specification.",
    tag: "Quality Control",
    accent: "#1B5E20",
  },
  {
    icon: Microscope,
    title: "Flavor Profiling",
    description:
      "Detailed tasting notes mapped to the SCA flavor wheel — from the floral and fruity profiles of Yirgacheffe to the full-bodied wine tones of Sidama and Guji origins.",
    tag: "Expertise",
    accent: "#2D7A2F",
  },
  {
    icon: BarChart3,
    title: "Export Quality Reports",
    description:
      "Comprehensive quality assurance documentation combining cupping scores, physical analysis, and origin traceability for seamless ECX and international export compliance.",
    tag: "Documentation",
    accent: "#1B5E20",
  },
];

const cuppingSteps = [
  {
    title1: "SAMPLE",
    title2: "PREPARATION",
    description: "Freshly roasted samples ground to medium-coarse in sealed containers",
    image: sample
  },
  {
    title1: "DRY",
    title2: "FRAGRANCE",
    description: "Evaluating the dry aroma before water is added to the grounds",
    image: dry
  },
  {
    title1: "BREAK &",
    title2: "BLOOM",
    description: "Pouring 93°C water and noting the wet aroma as gases are released",
    image: breaka
  },
  {
    title1: "SKIMMING",
    title2: "& COOLING",
    description: "Clearing the crust and allowing to cool to optimal tasting temperature",
    image: skim
  },
  {
    title1: "SLURPING",
    title2: "& SCORING",
    description: "Aspirating across the palate and recording scores across 10 attributes",
    image: slurp
  },
  {
    title1: "FINAL",
    title2: "REPORT",
    description: "Compiling cupping scores into a full SCA-standard quality report",
    image: final
  },
];

const labStats = [
  { value: "80+", label: "Specialty Score Minimum", sub: "SCA Standard" },
  { value: "500+", label: "Lots Graded Annually", sub: "& Certified" },
  { value: "9", label: "Ethiopian Origins", sub: "Profiled in Lab" },
  { value: "100%", label: "Traceability", sub: "Farm to Export" },
];

const origins = [
  { name: "Yirgacheffe", notes: "Floral · Jasmine · Bergamot · Stone Fruit", region: "Gedeo Zone, SNNPR" },
  { name: "Sidama", notes: "Berry · Wine · Bright Acidity · Full Body", region: "Sidama Region" },
  { name: "Guji", notes: "Blueberry · Dark Chocolate · Complex Finish", region: "Oromia Zone" },
  { name: "Harrar", notes: "Wild Blueberry · Mocha · Dry Processed", region: "Eastern Highlands" },
  { name: "Limu", notes: "Spicy · Sweet · Well-Balanced", region: "Jimma Zone" },
  { name: "Kaffa", notes: "Forest Fruit · Herbal · Winey", region: "Forest Origin" },
];

const certifications = [
  { name: "SCA Member", desc: "Specialty Coffee Association standards", icon: Award },
  { name: "ISO Certified", desc: "ISO 9001:2015 quality management", icon: Shield },
  { name: "ECX Compliant", desc: "Ethiopian Commodity Exchange approved", icon: CheckCircle2 },
  { name: "Q-Graders", desc: "Licensed Q-Grader professionals on team", icon: Star },
];

// ─── Page Component ────────────────────────────────────────────────────────────

const CoffeeLabPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LabHero />
      <LabServices />
      <CuppingProcess />
      <OriginsShowcase />
      <TeamSection />
      <Footer />
    </div>
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────

const LabHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle parallax on scroll
      gsap.to(overlayRef.current, {
        y: "25%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div ref={overlayRef} className="absolute inset-0 scale-110">
        <img
          src={teamCupping}
          alt="EMA Ethiopia Coffee Laboratory Cupping Session"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f0c]/80 via-[#0a1f0c]/65 to-[#0a1f0c]/90" />
      </div>

      {/* Decorative grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')" }} />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm"
        >
          <img src={emaLogo} alt="EMA" className="h-5 w-5 rounded-full" />
          <span className="font-body text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
            EMA Ethiopia · Coffee Lab
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mx-auto mb-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          Coffee{" "}
          <span className="bg-gradient-to-r from-[#6fcf6f] to-[#a8e063] bg-clip-text text-transparent">
            Laboratory
          </span>{" "}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mb-10 max-w-2xl font-body text-lg leading-relaxed text-white/75"
        >
          We proudly serve multiple industries under the umbrella of Droga Pharma, delivering tailored solutions across sectors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/30 hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
        </motion.div>
      </div>
    </section>
  );
};

// ─── Lab Services ──────────────────────────────────────────────────────────────

const LabServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <section id="lab-services" ref={ref} className="relative bg-[#F0F4F0] py-20 lg:py-28 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2]">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -left-10 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" 
        />
      </div>

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-primary uppercase">
            <FlaskConical className="h-3 w-3" />
            Our Laboratory Services
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Precision at <span className="text-gradient">Every Stage</span>
          </h2>
          <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
            From raw sample intake to certified export documentation, our lab provides end-to-end
            quality intelligence for buyers and producers worldwide.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {labServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
                className="group relative h-full cursor-default rounded-3xl border border-border bg-background/60 p-8 shadow-sm backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-500 hover:border-primary/40 hover:bg-white hover:shadow-2xl"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                </div>

                {/* Icon Container */}
                <div className="mb-8 flex items-start justify-between">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-7 w-7 transition-all duration-500 group-hover:rotate-[15deg]" />
                    </div>
                    {/* Ring animation on hover */}
                    <div className="absolute inset-0 h-16 w-16 animate-ping rounded-2xl bg-primary/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[ping_2s_infinite]" />
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-body text-[10px] font-bold tracking-widest text-primary uppercase">
                    {service.tag}
                  </span>
                </div>

                <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground/90">
                  {service.description}
                </p>

                {/* Service indicator lines */}
                <div className="mt-8 flex gap-1 items-center">
                  <div className="h-1 w-8 rounded-full bg-primary/10 transition-all duration-300 group-hover:w-12 group-hover:bg-primary" />
                  <div className="h-1 w-1 rounded-full bg-primary/10 group-hover:bg-primary/40" />
                  <div className="h-1 w-1 rounded-full bg-primary/10 group-hover:bg-primary/20" />
                </div>

                {/* Inner Glow Overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[inset_0_0_20px_rgba(37,152,37,0.05)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ─── Cupping Process ───────────────────────────────────────────────────────────

const CuppingProcess = () => {
  const containerRef = useRef(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = stepsRef.current;

      panels.forEach((panel, i) => {
        if (!panel) return;
        ScrollTrigger.create({
          trigger: panel,
          start: () => `top top+=${i * 60}`, 
          pin: true,
          pinSpacing: false,
          endTrigger: containerRef.current,
          end: "bottom bottom",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background mt-20" id="cupping-process">
      {/* Intro Header */}
      <div className="container mx-auto px-6 py-16">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-primary uppercase">
          <Coffee className="h-3 w-3" />
          Coffee Process
        </span>
        <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl mt-6">
          Six Steps to a <span className="text-gradient">Perfect Score</span>
        </h2>
        <p className="max-w-2xl font-body text-base leading-relaxed text-muted-foreground mt-4">
          Every lot that passes through EMA Ethiopia's lab is evaluated through our
          rigorous SCA-aligned cupping protocol.
        </p>
      </div>

      <div className="relative w-full pb-[20vh]">
        {cuppingSteps.map((step, i) => (
          <div
            key={i}
            ref={(el) => (stepsRef.current[i] = el)}
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
                    alt={step.title2}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* The #259825 Overlay */}
                  <div className="absolute inset-0 bg-[#259825] opacity-20 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Origins Showcase ──────────────────────────────────────────────────────────

const OriginsShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative bg-[#0a1f0c] py-20 lg:py-36 overflow-hidden">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')" }}
      />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-white/70 uppercase">
            <MapPin className="h-3 w-3" />
            Ethiopian Origins
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-white md:text-5xl">
            Flavors Rooted in{" "}
            <span className="bg-gradient-to-r from-[#6fcf6f] to-[#a8e063] bg-clip-text text-transparent">
              Ethiopian Terroir
            </span>
          </h2>
          <p className="mx-auto max-w-xl font-body text-base leading-relaxed text-white/60">
            Our lab profiles coffees from Ethiopia's most celebrated growing regions — each with
            distinct cup characteristics shaped by altitude, soil, and processing method.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {origins.map((origin, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative cursor-default overflow-hidden rounded-2xl border p-7 transition-all duration-500 ${
                hovered === i
                  ? "border-[#6fcf6f]/40 bg-[#6fcf6f]/5"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {/* Number */}
              <span className="absolute right-5 top-5 font-display text-5xl font-bold text-white/5 transition-all duration-500 group-hover:text-white/10">
                0{i + 1}
              </span>

              <div className="mb-1 flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full transition-colors duration-300 ${hovered === i ? "bg-[#6fcf6f]" : "bg-white/30"}`} />
                <span className="font-body text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  {origin.region}
                </span>
              </div>

              <h3 className="mb-3 font-display text-2xl font-bold text-white">
                {origin.name}
              </h3>

              <p className="font-body text-sm leading-relaxed text-white/55">
                {origin.notes}
              </p>

              <div className="mt-6 flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-[#6fcf6f] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span>View Profile</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Team Section ──────────────────────────────────────────────────────────────

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F0F4F0] py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-primary uppercase">
              <Users className="h-3 w-3" />
              Our Team
            </span>
            <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Expert Sensory{" "}
              <span className="text-gradient">Professionals</span>
            </h2>
            <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground">
              Our cupping team combines generations of local knowledge with internationally
              recognized specialty coffee training. Each member brings deep familiarity with
              Ethiopian growing regions and rigorous SCA sensory methodology.
            </p>
            <p className="mb-8 font-body text-base leading-relaxed text-muted-foreground">
              Working in partnership with Ethiopian institutions — including the Coffee Training
              Center (CTC) and the Ethiopian Commodity Exchange (ECX) — our team ensures every
              lot is evaluated with both scientific precision and genuine passion for quality.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { icon: Award, label: "Licensed Q-Graders", val: "Certified" },
                { icon: BookOpen, label: "SCA Training", val: "Aligned" },
                { icon: Leaf, label: "Origin Knowledge", val: "9+ Regions" },
                { icon: Shield, label: "Export Standards", val: "ECX / ISO" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
                      <p className="font-display text-sm font-bold text-foreground">{item.val}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large image */}
              <div className="col-span-2 overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={teamFull}
                  alt="EMA Ethiopia Full Team"
                  className="h-128 w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoffeeLabPage;
