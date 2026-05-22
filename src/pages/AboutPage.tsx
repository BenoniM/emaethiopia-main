import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PageHero from "@/components/PageHero";
import JourneySection from "@/components/JourneySection";
import DetailedReachSection from "@/components/DetailedReachSection";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import teamFull from "@/assets/team-full.png";
import coffeeLab from "@/assets/coffee-lab.png";
import teamCupping from "@/assets/team-cupping.png";

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
      <JourneySection />
      <PartnersSection />
      <DetailedReachSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
