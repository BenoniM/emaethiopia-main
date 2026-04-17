import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import teamFull from "@/assets/team-full.png";
import coffeeLab from "@/assets/coffee-lab.png";
import teamCupping from "@/assets/team-cupping.png";

const timelineData = [
  {
    title: "2019",
    content: (
      <div>
        <p className="mb-4 font-body text-base text-muted-foreground">
          EMA Import and Export Pvt.Ltd. was established in Addis Ababa with a vision to bring Ethiopia's finest products to the global market. Operating under the Droga Pharma umbrella, we began exporting premium green coffee beans.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src={teamCupping} alt="EMA founding team" className="h-32 w-full rounded-xl object-cover" />
          <img src={coffeeLab} alt="Coffee Lab setup" className="h-32 w-full rounded-xl object-cover" />
        </div>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div>
        <p className="mb-4 font-body text-base text-muted-foreground">
          Expanded export operations to over 15 countries and established our state-of-the-art Coffee Laboratory for comprehensive quality testing, cupping, and grading services.
        </p>
        <div className="space-y-2">
          {["✅ Expanded to 15+ countries across Asia and Europe", "✅ ISO certification achieved for processing facilities", "✅ Coffee Laboratory established with certified Q-graders", "✅ Sesame seeds and Niger seeds added to export portfolio"].map((item) => (
            <p key={item} className="font-body text-sm text-muted-foreground">{item}</p>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="mb-4 font-body text-base text-muted-foreground">
          Reached major growth milestones with expanded product range including pulses, beans, and spices. Launched medical equipment import division to strengthen Ethiopian healthcare.
        </p>
        <div className="space-y-2">
          {["✅ Export to multiple countries across 4 continents", "✅ Medical equipment import division launched under Droga Pharma", "✅ 100+ satisfied international clients", "✅ 10,000+ tons exported annually"].map((item) => (
            <p key={item} className="font-body text-sm text-muted-foreground">{item}</p>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="mb-4 font-body text-base text-muted-foreground">
          Continuing to grow with new market expansions, cutting-edge quality control processes, and deepening partnerships with Ethiopian farmer cooperatives for sustainable sourcing.
        </p>
        <img src={teamFull} alt="EMA team 2025" className="h-48 w-full rounded-xl object-cover" />
      </div>
    ),
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        badge="About EMA Ethiopia"
        title={<>Our <span className="text-gradient">Story</span> & Journey</>}
        description="Since 2019, EMA Import and Export Pvt.Ltd. has been delivering premium Ethiopian green coffee beans, oil seeds, and pulses to global markets while importing essential medical devices."
      />
      <AboutSection />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">
              Our Journey
            </span>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              Milestones & <span className="text-gradient">Achievements</span>
            </h2>
          </motion.div>
          <Timeline data={timelineData} />
        </div>
      </section>
      <TestimonialsSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
