import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import emaLogo from "@/assets/ema-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "/products",
    dropdown: [
      { label: "Export Products", href: "/export-products" },
      { label: "Import Products", href: "/import-products" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => location.pathname === href;
  const isProductActive = () => ["/products", "/export-products", "/import-products"].includes(location.pathname);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-light py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="flex items-center gap-2">
            <img src={emaLogo} alt="EMA Ethiopia" className="h-10 w-10 rounded-full" />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              <span className="text-gradient">EMA</span> Ethiopia
            </span>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-1.5 backdrop-blur-sm lg:flex">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="relative"
              ref={link.dropdown ? dropdownRef : undefined}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`relative flex items-center gap-1 rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                      isProductActive()
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`h-3 w-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-lg"
                      >
                        <Link
                          to="/products"
                          onClick={() => setDropdownOpen(false)}
                          className="block rounded-lg px-4 py-2.5 font-body text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          All Products
                        </Link>
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block rounded-lg px-4 py-2.5 font-body text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={link.href}
                  className={`relative rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <Link
              to="/contact"
              className="magnetic-btn rounded-full bg-foreground px-6 py-2.5 font-body text-sm font-semibold text-background"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground lg:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.div key={link.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 font-body text-base transition-colors ${
                          isProductActive() ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            <Link to="/products" onClick={() => { setMobileOpen(false); setMobileProductsOpen(false); }} className="block rounded-lg px-4 py-2.5 font-body text-sm text-muted-foreground hover:text-foreground">All Products</Link>
                            {link.dropdown.map((item) => (
                              <Link key={item.label} to={item.href} onClick={() => { setMobileOpen(false); setMobileProductsOpen(false); }} className="block rounded-lg px-4 py-2.5 font-body text-sm text-muted-foreground hover:text-foreground">{item.label}</Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-lg px-4 py-3 font-body text-base transition-colors ${
                        isActive(link.href) ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-2 block rounded-full bg-foreground px-6 py-3 text-center font-body text-sm font-semibold text-background">Contact Us</Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
