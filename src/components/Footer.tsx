import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import emaLogo from "@/assets/ema-logo.png";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#259825] border-t border-[#1e7a1e] text-[#f7f4ed] selection:bg-[#f7f4ed] selection:text-[#259825]">
      {/* Top Banner - For a premium badge feel */}
      <div className="border-b border-[#f7f4ed]/10">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
           <span className="font-display uppercase text-[10px] tracking-[0.3em] font-medium opacity-80 hidden md:inline-block">Premium Ethiopian Export</span>
           <span className="font-display uppercase text-[10px] tracking-[0.3em] font-medium opacity-80 text-center md:text-right w-full md:w-auto">Est. 2019</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          
          {/* Logo & About */}
          <div className="lg:w-1/3 flex flex-col items-start pr-8">
            <Link to="/" className="inline-block mb-6 relative group">
              <img src={emaLogo} alt="EMA Ethiopia Logo" className="h-14 w-14 rounded-full border border-[#f7f4ed]/30 object-cover shadow-sm transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <h3 className="font-display text-2xl font-medium mb-4 tracking-wide">EMA Ethiopia</h3>
            <p className="font-body text-sm leading-relaxed text-[#f7f4ed]/80 mb-8 max-w-sm">
              Sourcing the finest Ethiopian green coffee beans, oil seeds, and pulses. Excellence driven by a passion for quality and authentic origins.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f7f4ed]/20 text-[#f7f4ed]/70 transition-colors hover:bg-[#f7f4ed] hover:text-[#259825]"
                  aria-label={`Visit our social media ${i}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            
            <div>
              <h4 className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 text-[#f7f4ed]">Explore</h4>
              <ul className="space-y-3.5 font-body text-sm text-[#f7f4ed]/75">
                <li><Link to="/" className="hover:text-[#f7f4ed] transition-colors relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">Home</Link></li>
                <li><Link to="/about" className="hover:text-[#f7f4ed] transition-colors relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">Our Journey</Link></li>
                <li><Link to="/products" className="hover:text-[#f7f4ed] transition-colors relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">All Products</Link></li>
                <li><Link to="/services" className="hover:text-[#f7f4ed] transition-colors relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">Services</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 text-[#f7f4ed]">Business</h4>
              <ul className="space-y-3.5 font-body text-sm text-[#f7f4ed]/75">
                <li><Link to="/export-products" className="hover:text-[#f7f4ed] transition-colors relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">Exports</Link></li>
                <li><Link to="/import-products" className="hover:text-[#f7f4ed] transition-colors relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">Imports</Link></li>
                <li><Link to="/industries" className="hover:text-[#f7f4ed] transition-colors relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">Industries</Link></li>
                <li><Link to="/contact" className="hover:text-[#f7f4ed] transition-colors relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">Contact Us</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:pl-4">
              <h4 className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 text-[#f7f4ed]">Headquarters</h4>
              <ul className="space-y-2.5 font-body text-sm text-[#f7f4ed]/75">
                <li>7th Floor, Room 701</li>
                <li>Droga Building, Gulele Subcity</li>
                <li>Woreda 9, Addis Ababa, Ethiopia</li>
              </ul>
              
              <h4 className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] mt-8 mb-4 text-[#f7f4ed]">Inquiries</h4>
              <ul className="space-y-2.5 font-body text-sm text-[#f7f4ed]/75">
                <li>
                  <a href="mailto:export@emaethiopia.com" className="hover:text-[#f7f4ed] transition-colors inline-block relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">export@emaethiopia.com</a>
                </li>
                <li>
                  <span className="opacity-60 pr-2">T:</span> <a href="tel:+251929908566" className="hover:text-[#f7f4ed] transition-colors inline-block relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#f7f4ed] after:transition-all">+251 929 908 566</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#f7f4ed]/10">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[11px] uppercase tracking-[0.1em] text-[#f7f4ed]/50 text-center md:text-left">
            © {new Date().getFullYear()} EMA Import & Export. All Rights Reserved.
          </p>
          
          <div className="flex gap-8 font-display text-[10px] uppercase tracking-[0.15em] text-[#f7f4ed]/50">
            <Link to="#" className="hover:text-[#f7f4ed] transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-[#f7f4ed] transition-colors">Terms</Link>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.15em] text-[#f7f4ed]/70 hover:text-[#f7f4ed] transition-colors"
          >
            <span>Top</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#f7f4ed]/20 group-hover:border-[#f7f4ed] transition-colors">
              <ArrowUp className="h-3 w-3" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
