import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { ArrowUpRight, HeartPulse, Shield, Truck, CheckCircle, Stethoscope, Activity } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import productStretcher from "@/assets/product-stretcher-new.jpg";
import productBlood from "@/assets/product-blood.jpg";
import productMedicalDevices from "@/assets/product-medical-devices.jpg";

const importProducts = [
  {
    title: "Ambulance Stretcher Trolley",
    description: "High-quality ambulance stretcher trolleys designed for emergency medical services across Ethiopia. Features include adjustable height, foldable design, heavy-duty wheels with locks, and stainless steel construction for maximum durability and hygiene compliance.",
    image: productStretcher,
    features: ["Adjustable Height", "Stainless Steel", "Heavy-Duty Wheels", "Foldable Design"],
  },
  {
    title: "Viva Check Blood Glucose Monitor",
    description: "Precision blood glucose monitoring system — the Viva Check provides accurate readings in just 5 seconds with minimal blood sample required. Designed for hospitals, clinics, and home healthcare use, helping manage diabetes across Ethiopia.",
    image: productBlood,
    features: ["5-Second Results", "Minimal Blood Sample", "Memory Storage", "Compact Design"],
  },
  {
    title: "Diagnostic Medical Devices",
    description: "A comprehensive range of diagnostic medical devices including digital blood pressure monitors, pulse oximeters, infrared thermometers, and other essential clinical equipment for Ethiopian healthcare facilities — all meeting WHO and CE certification standards.",
    image: productMedicalDevices,
    features: ["Digital Accuracy", "WHO Standards", "Bulk Available", "Training Included"],
  },
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

      {/* Product Showcase - distinct dark section */}
      <section className="bg-foreground py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="flex items-center gap-3 font-display text-3xl font-bold text-background">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">I</span>
              Our Import Range
            </h2>
            <p className="mt-2 max-w-2xl font-body text-background/70">High-quality medical equipment and diagnostic devices sourced from certified international manufacturers for Ethiopian healthcare.</p>
          </motion.div>

          <div className="space-y-8">
            {importProducts.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-background/10 bg-background"
              >
                <GlowingEffect spread={40} glow disabled={false} blur={8} />
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <div className="mb-3 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      <span className="font-body text-xs font-semibold tracking-widest text-primary uppercase">Medical Equipment</span>
                    </div>
                    <h3 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">{product.title}</h3>
                    <p className="mb-6 font-body text-base leading-relaxed text-muted-foreground">{product.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature) => (
                        <span key={feature} className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-body text-xs font-medium text-foreground">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
