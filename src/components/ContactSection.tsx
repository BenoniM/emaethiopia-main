import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import mapImage from "@/assets/map.png";
import emaLogo from "@/assets/ema-logo.png";
// Use your specific asset path
import ctaBg from "@/assets/CTA/photo_2026-04-19_11-44-37.jpg";

const ContactSection = ({ showForm = false }: { showForm?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({ 
        title: "Incomplete Fields", 
        description: "Please fill in your name, email, and message.", 
        variant: "destructive" 
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ 
        title: "Invalid Email", 
        description: "Please enter a valid email address.", 
        variant: "destructive" 
      });
      return;
    }

    setSending(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    
    setSuccess(true);
    toast({ 
      title: "Message Sent!", 
      description: "Thank you for reaching out. We'll be in touch soon.",
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setSending(false);
    
    // Reset success state after a few seconds
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-background">
      {/* ── Background Elements ── */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-40">
        <div 
          className="absolute -left-20 top-40 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, hsl(120 61% 37% / 0.15), transparent 70%)" }}
        />
        <div 
          className="absolute -right-20 bottom-40 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, hsl(120 61% 50% / 0.1), transparent 70%)" }}
        />
      </div>

      {/* ── Contact Content Area (Form/Info) ── */}
      {showForm && (
        <div className="relative z-10 py-28 lg:py-36" ref={ref}>
          <div className="container mx-auto px-6">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              
              {/* Left: Info Side */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-[1px] w-12 bg-primary/40" />
                  <span className="font-body text-sm font-semibold tracking-widest text-primary uppercase">
                    Contact Us
                  </span>
                </div>
                
                <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                  Ready to <span className="text-gradient">Start</span> A<br />
                  Conversation?
                </h2>
                
                <p className="mb-10 max-w-lg font-body text-lg leading-relaxed text-muted-foreground">
                  Whether you're looking for premium coffee, sesame seeds, or medical equipment — our team is here to ensure your trade journey is seamless and sustainable.
                </p>

                <div className="grid gap-4 sm:grid-cols-1">
                  {[
                    { 
                      icon: Phone, 
                      label: "Phone Support", 
                      values: ["+251 929 908 566", "+251 961 260 001"],
                      gradient: "from-[hsl(120_61%_37%)] to-[hsl(120_61%_50%)]" 
                    },
                    { 
                      icon: Mail, 
                      label: "Direct Email", 
                      values: ["export@emaethiopia.com", "emaisnow@gmail.com"],
                      gradient: "from-[hsl(120_61%_25%)] to-[hsl(120_61%_40%)]"
                    },
                    { 
                      icon: MapPin, 
                      label: "Business Office", 
                      values: ["Droga Building, 7th Floor, RM 701", "Addis Ababa, Ethiopia"],
                      gradient: "from-[hsl(120_40%_20%)] to-[hsl(120_60%_35%)]"
                    },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="group flex gap-5 rounded-2xl border border-border/40 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-sm"
                      >
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg shadow-primary/10 transition-transform group-hover:rotate-6`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="mb-1 font-body text-xs font-bold text-primary uppercase tracking-widest">
                            {item.label}
                          </div>
                          {item.values.map((val) => (
                            <div key={val} className="font-body text-sm font-medium text-foreground/80">{val}</div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Map Highlight */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="mt-8 group relative overflow-hidden rounded-xl border border-border/60 shadow-md"
                >
                  <img 
                    src={mapImage} 
                    alt="EMA Ethiopia Location" 
                    className="h-44 w-full object-cover filter grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent p-5">
                    <div className="flex items-center gap-2">
                      <img src={emaLogo} alt="EMA" className="h-5 w-5 rounded-full" />
                      <span className="font-display text-sm font-bold text-foreground">Droga Building, Gulele Subcity, Addis Ababa</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Form Side */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Decorative elements behind form */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                
                <form
                  className="relative overflow-hidden rounded-[1rem] border border-border/80 bg-background/80 p-8 shadow-2xl backdrop-blur-xl lg:p-12"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-10">
                    <h3 className="mb-2 font-display text-3xl font-bold text-foreground">Send us a message</h3>
                    <p className="font-body text-sm text-muted-foreground">Fill out the form below and our team will get back to you shortly.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="group space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary/70 transition-colors group-focus-within:text-primary">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-2xl border border-border bg-secondary/50 px-5 py-4 font-body text-sm transition-all focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none"
                        />
                      </div>
                      <div className="group space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary/70 transition-colors group-focus-within:text-primary">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full rounded-2xl border border-border bg-secondary/50 px-5 py-4 font-body text-sm transition-all focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none"
                        />
                      </div>
                    </div>

                    <div className="group space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/70 transition-colors group-focus-within:text-primary">Phone Number (Optional)</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+251 ..."
                        className="w-full rounded-2xl border border-border bg-secondary/50 px-5 py-4 font-body text-sm transition-all focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none"
                      />
                    </div>

                    <div className="group space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/70 transition-colors group-focus-within:text-primary">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Trade Inquiry"
                        className="w-full rounded-2xl border border-border bg-secondary/50 px-5 py-4 font-body text-sm transition-all focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none"
                      />
                    </div>

                    <div className="group space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-primary/70 transition-colors group-focus-within:text-primary">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us what you're looking for..."
                        className="w-full resize-none rounded-2xl border border-border bg-secondary/50 px-5 py-4 font-body text-sm transition-all focus:border-primary/50 focus:bg-background focus:ring-4 focus:ring-primary/5 outline-none"
                      />
                    </div>

                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={sending || success}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative w-full overflow-hidden rounded-2xl py-5 font-display text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                          success 
                          ? "bg-green-600 text-white" 
                          : "bg-foreground text-background hover:bg-primary hover:text-white"
                        } magnetic-btn`}
                      >
                        <AnimatePresence mode="wait">
                          {sending ? (
                            <motion.span
                              key="sending"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center justify-center gap-2"
                            >
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Processing...
                            </motion.span>
                          ) : success ? (
                            <motion.span
                              key="success"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center justify-center gap-2"
                            >
                              <CheckCircle2 className="h-5 w-5" />
                              Message Received
                            </motion.span>
                          ) : (
                            <motion.span
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center justify-center gap-2"
                            >
                              Send Message
                              <ArrowRight className="h-4 w-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* ── Refined CTA Section ── */}
      {!showForm && (
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
            className="mx-auto max-w-4xl bg-white/10 backdrop-blur-md px-8 py-10 text-center shadow-2xl md:px-16 md:py-12 rounded-3xl"
          >
            <h2 className="mb-4 font-display text-2xl font-extrabold text-white md:text-4xl uppercase tracking-tighter">
              Ready to Partner<br />with EMA?
            </h2>
            
            <p className="mx-auto mb-8 max-w-3xl font-body text-sm md:text-base text-white/80 leading-relaxed">
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
      )}
    </section>
  );
};

export default ContactSection;