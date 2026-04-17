import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustriesSection from "@/components/IndustriesSection";
import BlogSection from "@/components/BlogSection";
import PartnersSection from "@/components/PartnersSection";
import PageHero from "@/components/PageHero";

const IndustriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        badge="Industries & News"
        title={<>Diverse <span className="text-gradient">Industries</span> & Latest News</>}
        description="We proudly serve multiple industries under the umbrella of Droga Pharma, delivering tailored solutions across sectors."
      />
      <IndustriesSection />
      <BlogSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default IndustriesPage;
