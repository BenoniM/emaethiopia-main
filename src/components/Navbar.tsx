import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import emaLogo from "@/assets/ema-logo.png";
import hamburgerIcon from "@/assets/icon/hamburger.svg";
import closeIcon from "@/assets/icon/close.svg";
import littleDot from "@/assets/icon/little-dot.svg";

const navLinks = [
  { label: "Home", href: "/" }, // Added Home here
  { label: "About Us", href: "/about" },
  { 
    label: "Products", 
    href: "/products",
    subLinks: [
      { label: "Export Products", href: "/export-products" },
      { label: "Import Products", href: "/import-products" }
    ]
  },
  { label: "Industries", href: "/industries" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const menuOpenRef = useRef(false);
  const location = useLocation();

  // Refs for icon images
  const hamburgerImgRef = useRef<HTMLImageElement>(null);
  const closeImgRef = useRef<HTMLImageElement>(null);

  // Refs for menu panel
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const menuDotsRef = useRef<(HTMLImageElement | null)[]>([]);
  const menuLineRef = useRef<HTMLDivElement>(null);

  // Animate icon swap: hamburger ↔ close
  const animateIcon = useCallback((open: boolean) => {
    if (open) {
      gsap.to(hamburgerImgRef.current, {
        opacity: 0,
        rotation: 90,
        scale: 0.5,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(hamburgerImgRef.current, { display: "none" }),
      });
      gsap.set(closeImgRef.current, { display: "block" });
      gsap.fromTo(
        closeImgRef.current,
        { opacity: 0, rotation: -90, scale: 0.5 },
        { opacity: 1, rotation: 0, scale: 1, duration: 0.25, ease: "power2.out", delay: 0.1 }
      );
    } else {
      gsap.to(closeImgRef.current, {
        opacity: 0,
        rotation: 90,
        scale: 0.5,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(closeImgRef.current, { display: "none" }),
      });
      gsap.set(hamburgerImgRef.current, { display: "block" });
      gsap.fromTo(
        hamburgerImgRef.current,
        { opacity: 0, rotation: -90, scale: 0.5 },
        { opacity: 1, rotation: 0, scale: 1, duration: 0.25, ease: "power2.out", delay: 0.1 }
      );
    }
  }, []);

  // Menu panel animation
  const animateMenu = useCallback((open: boolean) => {
    if (open) {
      gsap.set(menuPanelRef.current, { display: "block", pointerEvents: "auto" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        menuPanelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45 },
        0
      );

      // Vertical line drops straight down from the top
      tl.fromTo(
        menuLineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.5 },
        0
      );

      // Stagger dots popping
      tl.fromTo(
        menuDotsRef.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, stagger: 0.05 },
        0.15
      );

      // Stagger links fading in from left
      tl.fromTo(
        menuItemsRef.current.filter(Boolean),
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.05 },
        0.2
      );
    } else {
      const tl = gsap.timeline({
        defaults: { ease: "power3.in" },
        onComplete: () => {
          gsap.set(menuPanelRef.current, { display: "none", pointerEvents: "none" });
        },
      });

      tl.to(
        menuItemsRef.current.filter(Boolean),
        { opacity: 0, x: 10, duration: 0.2, stagger: 0.02 },
        0
      );
      tl.to(
        menuDotsRef.current.filter(Boolean),
        { scale: 0, opacity: 0, duration: 0.15, stagger: 0.02 },
        0.05
      );
      tl.to(menuLineRef.current, { scaleY: 0, duration: 0.25 }, 0.1);
      tl.to(menuPanelRef.current, { opacity: 0, duration: 0.2 }, 0.25);
    }
  }, []);

  const closeMenu = useCallback(() => {
    if (!menuOpenRef.current) return;
    menuOpenRef.current = false;
    setMenuOpen(false);
    animateIcon(false);
    animateMenu(false);
  }, [animateIcon, animateMenu]);

  const toggleMenu = useCallback(() => {
    const next = !menuOpenRef.current;
    menuOpenRef.current = next;
    setMenuOpen(next);
    animateIcon(next);
    animateMenu(next);
  }, [animateIcon, animateMenu]);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 150) {
        setIsVisible(false); // scrolling down past threshold
      } else {
        setIsVisible(true); // scrolling up
      }
      lastScrollYRef.current = currentScrollY;

      if (menuOpenRef.current && currentScrollY > 10) {
        closeMenu();
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [closeMenu]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !menuOpenRef.current ? "backdrop-blur-md bg-foreground/15" : "bg-transparent"
        }`}
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="flex items-start justify-between px-6 py-5 md:px-10 md:py-6 relative w-full h-full pointer-events-none">
          {/* Logo */}
          <Link to="/" className="relative z-[60] pointer-events-auto">
            <img
              src={emaLogo}
              alt="EMA Ethiopia"
              className="h-14 w-14 rounded-full transition-transform duration-300 hover:scale-110"
            />
          </Link>

          {/* Right Side: Hamburger container with menu */}
          <div className="relative z-[60] flex flex-col items-center pointer-events-auto">
            {/* The Hamburger Button acts as the origin point */}
            <button
              onClick={toggleMenu}
              className={`relative z-20 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 overflow-hidden ${
                menuOpen ? "bg-[#1D781D] border border-white" : "bg-transparent"
              }`}
              aria-label={menuOpenRef.current ? "Close menu" : "Open menu"}
            >
              {!menuOpen && (
                <div className="absolute inset-0 bg-[#1D781D] backdrop-blur-md rounded-full pointer-events-none transition-opacity duration-300 opacity-90 hover:opacity-100" />
              )}
              <img
                ref={hamburgerImgRef}
                src={hamburgerIcon}
                alt="Menu"
                className="h-6 w-6 relative z-10"
                style={{ display: "block" }}
              />
              <img
                ref={closeImgRef}
                src={closeIcon}
                alt="Close"
                className="absolute h-6 w-6 z-10"
                style={{ display: "none", opacity: 0 }}
              />
            </button>

            {/* Downward extending menu panel */}
            <div
              ref={menuPanelRef}
              className="absolute top-14 left-1/2 -translate-x-1/2 w-[320px] pointer-events-none z-10"
              style={{ display: "none", opacity: 0 }}
            >
              <nav className="relative flex flex-col w-full h-full">
                {/* Center line descending from bottom center of the button */}
                <div
                  ref={menuLineRef}
                  className="absolute top-0 bottom-6 left-1/2 -translate-x-[0.5px] w-[1px] bg-white opacity-80"
                  style={{ transformOrigin: "top", transform: "scaleY(0)" }}
                />

                <div className="flex flex-col relative w-full pt-4 pb-8">
                  {navLinks.map((link, i) => (
                    <div
                      key={link.label}
                      ref={(el) => { menuItemsRef.current[i] = el; }}
                      className="group/link relative flex flex-col items-end w-full pr-[calc(50%+30px)] min-h-[48px] justify-start pt-[12px] opacity-0"
                      style={{ transform: "translateX(-20px)" }}
                    >
                      {/* Anchor Dot placed precisely on the center line */}
                      <img
                        ref={(el) => { menuDotsRef.current[i] = el; }}
                        src={littleDot}
                        alt=""
                        className="absolute right-[152px] top-[17px] translate-x-1/2 h-[14px] w-[14px] z-10 drop-shadow-md"
                        style={{ opacity: 0, transform: "scale(0)" }}
                      />

                      {/* Main Link label to the left of the dot */}
                      <Link
                        to={link.href}
                        className="text-white text-lg lg:text-xl font-body font-medium transition-colors hover:text-[#1D781D] drop-shadow-md whitespace-nowrap block"
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>

                      {/* Dropdown Sub-links using CSS Grid transition */}
                      {link.subLinks && (
                        <div className="grid grid-rows-[0fr] group-hover/link:grid-rows-[1fr] transition-[grid-template-rows] duration-300 overflow-visible">
                          <div className="overflow-hidden min-h-0 pt-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 delay-100">
                            <div className="flex flex-col items-end gap-2">
                              {link.subLinks.map((subLink) => (
                                <Link
                                  key={subLink.label}
                                  to={subLink.href}
                                  className="text-white/70 hover:text-[#1D781D] font-body text-sm whitespace-nowrap block text-right pr-0 transition-colors"
                                  onClick={closeMenu}
                                >
                                  {subLink.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
