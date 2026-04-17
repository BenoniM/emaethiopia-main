import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="about"><AboutSection /></div>
      <div id="products"><ProductsSection /></div>
      <div id="services"><ServicesSection /></div>
      <div id="industries"><IndustriesSection /></div>
      <PartnersSection />
      <TestimonialsSection />
      <div id="blog"><BlogSection /></div>
      <div id="contact"><ContactSection /></div>
      <Footer />
    </div>
  );
};

export default Index;
