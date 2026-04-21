import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import drogalogo from "@/assets/partners/droga.png";
import ecxlogo from "@/assets/partners/ecx.png";
import emalogo from "@/assets/partners/ema.png";
import trustlogo from "@/assets/partners/trust.png";
import partner2logo from "@/assets/partners/partner2.png";
import physiologo from "@/assets/partners/physio.svg";

const partners = [
  { name: "Droga Pharma", logo: drogalogo, description: "Parent company providing pharmaceutical excellence" },
  { name: "ECX Ethiopia", logo: ecxlogo, description: "Ethiopian Commodity Exchange partnership" },
  { name: "EMA Trade", logo: emalogo, description: "International trade network across 30+ countries" },
  { name: "Trust Pharmatical", logo: trustlogo, description: "Ethiopian Export Authority certified" },
  { name: "Quality Cert.", logo: partner2logo, description: "ISO 9001:2015 certified operations" },
  { name: "Droga Physiotherapy", logo: physiologo, description: "End-to-end supply chain partners" },
];

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-secondary py-16 lg:py-20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-2 inline-block font-body text-xs font-semibold tracking-widest text-primary uppercase">
            Our Partners
          </span>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="mx-auto max-w-xl font-body text-base text-muted-foreground">
            We collaborate with leading organizations to deliver excellence across the supply chain.
          </p>
        </motion.div>

        {/* Proportionalized Crawling Carousel */}
        <div className="relative h-[500px] w-full overflow-hidden [perspective:1000px]">
          <div 
            className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 [transform:rotateX(25deg)] origin-bottom scale-95"
          >
            {/* Column 1 - Faster */}
            <div 
              className="relative flex flex-col gap-6"
              onMouseEnter={() => setHoveredColumn(0)}
              onMouseLeave={() => setHoveredColumn(null)}
            >
              <motion.div
                animate={hoveredColumn === 0 ? { y: "0%" } : { y: ["0%", "-50%"] }}
                transition={hoveredColumn === 0 ? { duration: 0 } : { duration: 15, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-6"
              >
                {[...partners, ...partners].map((partner, i) => (
                  <PartnerCard key={`col1-${i}`} partner={partner} />
                ))}
              </motion.div>
            </div>

            {/* Column 2 - Reverse Direction (Faster) */}
            <div 
              className="relative hidden flex-col gap-6 md:flex"
              onMouseEnter={() => setHoveredColumn(1)}
              onMouseLeave={() => setHoveredColumn(null)}
            >
              <motion.div
                animate={hoveredColumn === 1 ? { y: "-50%" } : { y: ["-50%", "0%"] }}
                transition={hoveredColumn === 1 ? { duration: 0 } : { duration: 15, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-6"
              >
                {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, i) => (
                  <PartnerCard key={`col2-${i}`} partner={partner} />
                ))}
              </motion.div>
            </div>

            {/* Column 3 - Faster */}
            <div 
              className="relative hidden flex-col gap-6 lg:flex"
              onMouseEnter={() => setHoveredColumn(2)}
              onMouseLeave={() => setHoveredColumn(null)}
            >
              <motion.div
                animate={hoveredColumn === 2 ? { y: "0%" } : { y: ["0%", "-50%"] }}
                transition={hoveredColumn === 2 ? { duration: 0 } : { duration: 15, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-6"
              >
                {[...partners, ...partners].map((partner, i) => (
                  <PartnerCard key={`col3-${i}`} partner={partner} />
                ))}
              </motion.div>
            </div>
          </div>
          
          {/* Fading Overlays - Increased Strength for better transition */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-secondary to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-secondary to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};

// Extracted Card Component for cleaner code and proportionality
const PartnerCard = ({ partner }) => (
  <div className="group relative rounded-xl border border-primary/10 bg-background/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/40 hover:bg-background">
    <div className="mb-4 flex h-12 items-center justify-center">
      <img 
        src={partner.logo} 
        alt={partner.name} 
        className="h-10 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0" 
      />
    </div>
    <h3 className="mb-1 font-display text-lg font-bold text-center text-primary uppercase tracking-tight">
      {partner.name}
    </h3>
    <p className="font-body text-xs text-center leading-relaxed text-muted-foreground">
      {partner.description}
    </p>
  </div>
);

export default PartnersSection;