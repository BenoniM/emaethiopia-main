import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import emaLogo from "@/assets/ema-logo.png";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src={emaLogo} alt="EMA Ethiopia" className="h-10 w-10 rounded-full" />
              <span className="font-display text-xl font-bold text-foreground">
                <span className="text-gradient">EMA</span> Ethiopia
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
              Since 2019, EMA Import and Export Pvt.Ltd. has been delivering the finest Ethiopian green coffee beans, oil seeds, and pulses to the world while importing essential medical devices.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-bold text-foreground uppercase tracking-wider">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "All Products", to: "/products" },
                { label: "Export Products", to: "/export-products" },
                { label: "Import Products", to: "/import-products" },
                { label: "Services", to: "/services" },
                { label: "Industries", to: "/industries" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <motion.div key={link.label} whileHover={{ x: 4 }}>
                  <Link to={link.to} className="font-body text-sm text-muted-foreground transition-colors hover:text-primary">{link.label}</Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-bold text-foreground uppercase tracking-wider">Export Products</h4>
            <nav className="flex flex-col gap-3">
              {["Green Coffee Beans", "Sesame Seeds", "Niger Seeds", "Chickpea", "Haricot Beans", "Red Kidney Beans", "Green Mung Bean", "Spices & Herbs"].map((product) => (
                <motion.div key={product} whileHover={{ x: 4 }}>
                  <Link to="/export-products" className="font-body text-sm text-muted-foreground transition-colors hover:text-primary">{product}</Link>
                </motion.div>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-5 font-display text-sm font-bold text-foreground uppercase tracking-wider">Contact Info</h4>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <p>7th Floor, Room no-701</p>
              <p>Droga Building, Gulele Subcity</p>
              <p>Woreda 9, Addis Ababa, Ethiopia</p>
              <p className="pt-2 text-primary font-medium">export@emaethiopia.com</p>
              <p className="text-primary font-medium">emaisnow@gmail.com</p>
              <p className="text-primary font-medium">+251 929 908 566</p>
              <p className="text-primary font-medium">+251 961 260 001</p>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-display text-6xl font-bold tracking-tighter text-border/40 md:text-9xl"
          >
            EMA ETHIOPIA
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} EMA Import and Export Pvt.Ltd. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-md"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
