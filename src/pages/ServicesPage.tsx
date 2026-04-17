import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Shield, Truck, Leaf, FlaskConical } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Timeline } from "@/components/ui/timeline";
import coffeeLab from "@/assets/coffee-lab.png";
import teamFull from "@/assets/team-full.png";
import teamCupping from "@/assets/team-cupping.png";

const services = [
  { icon: Globe, title: "Global Export", description: "We export premium Ethiopian green coffee beans, sesame seeds, Niger seeds, pulses, and spices to buyers across Asia, Europe, Middle East, and North America — ensuring timely delivery and full documentation.", area: "md:[grid-area:1/1/2/7]" },
  { icon: Shield, title: "Quality Assurance", description: "Every product undergoes rigorous quality checks — from moisture and defect analysis to cupping scores — meeting the highest international food safety and export standards.", area: "md:[grid-area:1/7/2/13]" },
  { icon: Truck, title: "Logistics & Supply Chain", description: "End-to-end supply chain management including sourcing, processing, packaging in GrainPro & jute bags, container shipping, customs clearance, and on-time delivery worldwide.", area: "md:[grid-area:2/1/3/5]" },
  { icon: Leaf, title: "Sustainable Sourcing", description: "Direct partnerships with Ethiopian farmer cooperatives, promoting fair trade pricing, sustainable agriculture, and organic farming methods across all producing regions.", area: "md:[grid-area:2/5/3/9]" },
  { icon: FlaskConical, title: "Coffee Laboratory", description: "Our Coffee Laboratory Service ensures the highest quality through comprehensive cupping, grading, flavor profiling, and defect analysis with state-of-the-art equipment and expert Q-graders.", area: "md:[grid-area:2/9/3/13]" },
];

const timelineData = [
  { title: "Consultation", content: <p className="font-body text-base text-muted-foreground">We begin with understanding your specific requirements — product type, volume, quality specs, target market, and delivery timeline through detailed consultations.</p> },
  { title: "Sourcing & Processing", content: <p className="font-body text-base text-muted-foreground">Our team sources the finest products from trusted Ethiopian cooperatives and processes them in our ISO-certified facilities with full traceability.</p> },
  { title: "Quality Testing", content: <p className="font-body text-base text-muted-foreground">Every batch undergoes comprehensive quality testing in our Coffee Laboratory — including cupping scores, moisture analysis, defect counts, and flavor profiling by certified Q-graders.</p> },
  { title: "Export & Delivery", content: <p className="font-body text-base text-muted-foreground">We handle all logistics, documentation, customs clearance, and container shipping to ensure smooth, on-time delivery to your destination with full export certificates.</p> },
];

const ServicesPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        badge="Our Services"
        title={<>Coffee Laboratory{" "}<span className="text-gradient">& Trade</span> Services</>}
        description="Our Coffee Laboratory Service ensures the highest quality in coffee production through comprehensive testing, flavor profiling, and expert analysis."
      />

      {/* Coffee Lab Feature Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">Coffee Laboratory</span>
              <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
                State-of-the-Art <span className="text-gradient">Quality Testing</span>
              </h2>
              <p className="mb-4 font-body text-lg leading-relaxed text-muted-foreground">
                Our Coffee Laboratory is equipped with professional cupping equipment, moisture analyzers, and defect analysis tools. Our certified Q-graders evaluate every lot to ensure it meets the exacting standards of specialty coffee buyers worldwide.
              </p>
              <p className="mb-6 font-body text-base text-muted-foreground">
                We provide comprehensive testing services including green bean grading, roast profiling, sensory evaluation, and detailed cupping reports. Whether you're a roaster seeking single-origin lots or a distributor needing consistent quality, our lab ensures every shipment exceeds expectations.
              </p>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li>✅ Professional cupping & sensory evaluation</li>
                <li>✅ Moisture content & defect analysis</li>
                <li>✅ Green bean grading (Grade 1-5)</li>
                <li>✅ Detailed quality certificates & cupping scores</li>
                <li>✅ Custom roast profiling for buyers</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} className="col-span-2 overflow-hidden rounded-3xl">
                <img src={coffeeLab} alt="EMA Coffee Laboratory cupping" className="h-64 w-full object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl">
                <img src={teamFull} alt="EMA team coffee cupping" className="h-40 w-full object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden rounded-2xl">
                <img src={teamCupping} alt="EMA quality testing team" className="h-40 w-full object-cover" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-secondary py-20" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
              Our <span className="text-gradient">Comprehensive</span> Services
            </h2>
          </motion.div>

          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <li key={service.title} className={`min-h-[14rem] list-none ${service.area}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group relative h-full rounded-2xl border border-border bg-background p-2 md:rounded-3xl md:p-3"
                  >
                    <GlowingEffect spread={40} glow disabled={false} blur={8} />
                    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 border-border bg-background p-6 shadow-sm">
                      <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <motion.div whileHover={{ rotate: 12, scale: 1.15 }} transition={{ type: "spring", stiffness: 300 }} className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="mb-2 font-display text-xl font-bold text-foreground">{service.title}</h3>
                          <p className="font-body text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How We Work Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">Our Process</span>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              How We <span className="text-gradient">Work</span>
            </h2>
          </motion.div>
          <Timeline data={timelineData} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
