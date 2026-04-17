import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PageHero from "@/components/PageHero";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        badge="Contact Us"
        title={<>Let's <span className="text-gradient">Connect</span></>}
        description="Reach out to discuss your Ethiopian coffee, oil seed, and pulse export needs, or inquire about medical equipment imports."
      />
      <ContactSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default ContactPage;
