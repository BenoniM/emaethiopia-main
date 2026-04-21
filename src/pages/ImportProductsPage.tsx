import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { ArrowUpRight, HeartPulse, Shield, Truck, CheckCircle, Stethoscope, Activity } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import productStretcher from "@/assets/product-stretcher-new.jpg";
import productBlood from "@/assets/product-blood.jpg";
import productMedicalDevices from "@/assets/product-medical-devices.jpg";
import ImportsShowcase from "@/components/ImportsShowcase";



import importHero1 from "@/assets/import-imgs/pexels-i-sens-usa-578245562-17072086.jpg";
import importHero2 from "@/assets/import-imgs/pexels-mart-production-7088493.jpg";
import importHero3 from "@/assets/import-imgs/pexels-rdne-6519843.jpg";

const importSlides = [
  { image: importHero1, alt: "Medical equipment diagnostic device" },
  { image: importHero2, alt: "Healthcare professional with equipment" },
  { image: importHero3, alt: "Modern medical diagnostic tools" },
];

const benefits = [
  { icon: HeartPulse, title: "Healthcare Impact", description: "Strengthening Ethiopian healthcare infrastructure by importing world-class medical equipment and diagnostic devices to hospitals and clinics nationwide." },
  { icon: Shield, title: "Certified Quality", description: "All imported medical devices meet international quality standards including CE marking, ISO 13485, and WHO certification requirements." },
  { icon: Truck, title: "Reliable Supply", description: "End-to-end logistics management ensuring timely delivery of critical medical equipment from international manufacturers to Ethiopian facilities." },
  { icon: Stethoscope, title: "Technical Support", description: "Post-delivery technical support, user training, and maintenance guidance for all imported medical devices to ensure proper operation." },
];

const partners = [
  "Hospitals & Clinics",
  "Government Health Agencies",
  "Private Healthcare Providers",
  "Pharmaceutical Companies",
  "Emergency Medical Services",
  "Rural Health Centers",
];

const ImportProductsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        badge="Import Products"
        title={<>Medical <span className="text-gradient">Equipment</span> & Devices</>}
        description="Importing high-quality medical equipment and diagnostic devices to strengthen Ethiopia's healthcare infrastructure under Droga Pharma."
        slides={importSlides}
      />

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">Our Import Mission</span>
              <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
                Building a <span className="text-gradient">Healthier</span> Ethiopia
              </h2>
              <p className="mb-6 font-body text-lg leading-relaxed text-muted-foreground">
                As part of the Droga Pharma umbrella, EMA Import and Export is committed to bridging the gap in Ethiopia's healthcare equipment needs. We source and import internationally certified medical devices, diagnostic tools, and hospital equipment from leading global manufacturers.
              </p>
              <p className="mb-8 font-body text-base text-muted-foreground">
                Our import division focuses on essential medical equipment that directly impacts patient care quality — from emergency stretchers used in ambulances across Ethiopia to precision diagnostic devices used in laboratories and clinics nationwide.
              </p>
              <div className="flex flex-wrap gap-2">
                {partners.map((partner) => (
                  <span key={partner} className="rounded-full border border-border bg-secondary px-4 py-1.5 font-body text-xs font-medium text-foreground">{partner}</span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {benefits.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-1 font-display text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="font-body text-xs text-muted-foreground">{item.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <ImportsShowcase />

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">Need Medical <span className="text-gradient">Equipment?</span></h2>
            <p className="mx-auto mb-8 max-w-2xl font-body text-lg text-muted-foreground">
              Contact our import division for pricing, availability, and bulk orders. We handle all logistics, customs clearance, and delivery across Ethiopia.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 font-body text-sm font-semibold text-background"
            >
              Request a Quote
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ImportProductsPage;
