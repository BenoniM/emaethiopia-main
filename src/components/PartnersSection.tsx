import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Award, Handshake, Globe, ShieldCheck, Truck } from "lucide-react";

const partners = [
  { name: "Droga Pharma", logo: "src/assets/partners/droga.png", description: "Parent company providing pharmaceutical excellence" },
  { name: "ECX Ethiopia", logo: "src/assets/partners/ecx.png", description: "Ethiopian Commodity Exchange partnership" },
  { name: "EMA Trade", logo: "src/assets/partners/ema.png", description: "International trade network across 30+ countries" },
  { name: "Export Authority", logo: "src/assets/partners/trust.png", description: "Ethiopian Export Authority certified" },
  { name: "Quality Cert.", logo: "src/assets/partners/partner2.png", description: "ISO 9001:2015 certified operations" },
  { name: "Logistics Hub", logo: "src/assets/partners/physio.svg", description: "End-to-end supply chain partners" },
];

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden bg-secondary py-24 lg:py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">
            Our Partners
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
            We collaborate with leading organizations to deliver excellence across the supply chain.
          </p>
        </motion.div>

        {/* Star Wars Style Crawling Carousel */}
        <div className="relative h-[800px] w-full overflow-hidden [perspective:800px]">
          <div 
            className="grid h-full grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 [transform:rotateX(45deg)] origin-bottom scale-90"
          >
            {/* Column 1 - Crawling Upwards */}
            <div className="relative flex flex-col gap-8">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-8"
              >
                {[...partners, ...partners].map((partner, i) => {
                  return (
                    <div
                      key={`col1-${i}`}
                      className="group relative rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm p-10 transition-all duration-300 hover:border-primary hover:bg-background"
                    >
                      <div className="mb-6 flex h-16 items-center justify-center">
                        <img src={partner.logo} alt={partner.name} className="h-14 object-contain filter group-hover:grayscale-0 transition-all duration-300" />
                      </div>
                      <h3 className="mb-3 font-display text-2xl font-bold text-center text-primary uppercase tracking-tighter">{partner.name}</h3>
                      <p className="font-body text-base text-center leading-relaxed text-muted-foreground">{partner.description}</p>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Column 2 - Crawling Upwards (Slower) */}
            <div className="relative hidden flex-col gap-8 md:flex">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-8"
              >
                {[...partners, ...partners].map((partner, i) => {
                  return (
                    <div
                      key={`col2-${i}`}
                      className="group relative rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm p-10 transition-all duration-300 hover:border-primary hover:bg-background"
                    >
                      <div className="mb-6 flex h-16 items-center justify-center">
                        <img src={partner.logo} alt={partner.name} className="h-14 object-contain filter group-hover:grayscale-0 transition-all duration-300" />
                      </div>
                      <h3 className="mb-3 font-display text-2xl font-bold text-center text-primary uppercase tracking-tighter">{partner.name}</h3>
                      <p className="font-body text-base text-center leading-relaxed text-muted-foreground">{partner.description}</p>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Column 3 - Crawling Upwards (Faster) */}
            <div className="relative hidden flex-col gap-8 lg:flex">
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="flex flex-col gap-8"
              >
                {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, i) => {
                  return (
                    <div
                      key={`col3-${i}`}
                      className="group relative rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm p-10 transition-all duration-300 hover:border-primary hover:bg-background"
                    >
                      <div className="mb-6 flex h-16 items-center justify-center">
                        <img src={partner.logo} alt={partner.name} className="h-14 object-contain filter group-hover:grayscale-0 transition-all duration-300" />
                      </div>
                      <h3 className="mb-3 font-display text-2xl font-bold text-center text-primary uppercase tracking-tighter">{partner.name}</h3>
                      <p className="font-body text-base text-center leading-relaxed text-muted-foreground">{partner.description}</p>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
          
          {/* Deep Space Fading Overlay */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-secondary via-transparent to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
