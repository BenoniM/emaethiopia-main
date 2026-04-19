import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import mapImage from "@/assets/map.png";
// Use your specific asset path
import ctaBg from "@/assets/CTA/photo_2026-04-19_11-44-37.jpg";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ title: "Please fill in required fields", description: "Name, email, and message are required.", variant: "destructive" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast({ title: "Message sent!", description: "Thank you for reaching out. Our team will respond within 24 hours." });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <section id="contact" className="relative">
      {/* Contact form area stays exactly as you had it */}
      <div className="bg-secondary py-28 lg:py-36" ref={ref}>
        <div className="container mx-auto px-6">
          <div id="contact-form" className="grid gap-16 lg:grid-cols-2">
            {/* Info side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">
                Get In Touch
              </span>
              <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
                We are always ready to{" "}
                <span className="text-gradient">help you</span>
              </h2>
              <p className="mb-10 font-body text-lg text-muted-foreground">
                Have questions about our export products or need a quote for Ethiopian green coffee beans, sesame seeds, or medical equipment? Reach out and we'll respond within 24 hours.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { icon: Phone, label: "Call Center", values: ["+251 929 908 566", "+251 961 260 001", "+251 111 718 254"] },
                  { icon: MapPin, label: "Our Location", values: ["7th Floor, Room no-701 Droga Building", "Gulele Subcity, Woreda 9, Addis Ababa, Ethiopia"] },
                  { icon: Mail, label: "Email", values: ["export@emaethiopia.com", "emaisnow@gmail.com"] },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      whileHover={{ x: 8 }}
                      className="flex gap-4 rounded-xl p-3 transition-colors hover:bg-card"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="mb-1 font-body text-xs font-semibold text-primary uppercase tracking-wider">
                          {item.label}
                        </div>
                        {item.values.map((val) => (
                          <div key={val} className="font-body text-sm text-muted-foreground">{val}</div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="overflow-hidden rounded-2xl border border-border"
              >
                <img src={mapImage} alt="EMA Ethiopia location map" className="h-48 w-full object-cover" />
                <div className="bg-card p-4">
                  <p className="font-display text-sm font-bold text-foreground">Droga Building, 7th Floor, Room no-701</p>
                  <p className="font-body text-xs text-muted-foreground">Gulele Subcity, Woreda 9, Addis Ababa, Ethiopia</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Form side */}
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-fit space-y-5 rounded-3xl border border-border bg-background p-8 shadow-sm lg:p-10"
              onSubmit={handleSubmit}
            >
              <h3 className="font-display text-2xl font-bold text-foreground">Send Message</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-body text-sm font-medium text-foreground">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-xl border border-border bg-secondary px-4 py-3.5" />
                </div>
                <div>
                  <label className="mb-2 block font-body text-sm font-medium text-foreground">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-border bg-secondary px-4 py-3.5" />
                </div>
              </div>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full rounded-xl border border-border bg-secondary px-4 py-3.5" />
              <button type="submit" disabled={sending} className="w-full rounded-full bg-foreground py-4 font-semibold text-background">
                {sending ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* REDESIGNED CTA SECTION - 50% SCREEN HEIGHT */}
      <div 
        className="relative flex h-[50vh] min-h-[450px] items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${ctaBg})` }}
      >
        {/* The warm overlay from the image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D781D]/40 via-[#289928]/20 to-[#259825]/40 backdrop-brightness-75" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl bg-white px-8 py-10 text-center shadow-2xl md:px-16 md:py-12"
          >
            <h2 className="mb-4 font-display text-2xl font-extrabold text-black md:text-4xl uppercase tracking-tighter">
              Ready to Partner<br />with EMA?
            </h2>
            
            <p className="mx-auto mb-8 max-w-3xl font-body text-sm md:text-base text-gray-800 leading-relaxed">
              Whether you're looking for premium Ethiopian green coffee beans, sesame seeds, pulses, or medical equipment — 
              our team is ready to help you source, process, and deliver with confidence.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#259825] px-8 py-5 font-body text-xs font-bold text-white uppercase tracking-wide"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;