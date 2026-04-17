import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Award, Handshake, Globe, ShieldCheck, Truck } from "lucide-react";

const partners = [
  { name: "Droga Pharma", icon: Building2, description: "Parent company providing pharmaceutical excellence" },
  { name: "ECX Ethiopia", icon: Award, description: "Ethiopian Commodity Exchange partnership" },
  { name: "Global Traders", icon: Handshake, description: "International trade network across 30+ countries" },
  { name: "Export Authority", icon: Globe, description: "Ethiopian Export Authority certified" },
  { name: "Quality Cert.", icon: ShieldCheck, description: "ISO 9001:2015 certified operations" },
  { name: "Logistics Hub", icon: Truck, description: "End-to-end supply chain partners" },
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

        {/* Marquee */}
        <div className="mb-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex animate-marquee gap-12 whitespace-nowrap"
          >
            {[...Array(3)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-12">
                {["Quality First", "Global Reach", "Sustainable Growth", "Premium Products", "Trusted Partnership", "Innovation"].map((text) => (
                  <span key={`${setIdx}-${text}`} className="font-display text-5xl font-bold text-border/60 md:text-7xl">
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Partner grid with glowing cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {partners.map((partner, i) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={partner.name}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-5 inline-flex rounded-2xl bg-primary/8 p-4"
                >
                  <Icon className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="mb-2 font-display text-lg font-bold text-foreground">
                  {partner.name}
                </h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">
                  {partner.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
