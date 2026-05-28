import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import emaLogo from "@/assets/ema-logo.png";
import littleDot from "@/assets/icon/little-dot.svg";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products",
    href: "",
    subLinks: [
      { label: "Export Products", href: "/export-products" },
      { label: "Import Products", href: "/import-products" },
      { label: "Coffee", href: "/coffee" }
    ]
  },
  { label: "Coffee Lab", href: "/industries" },
  // { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  // "light" = white/light solid bg → use green; "dark" = dark/image/video bg → use white
  const [bgMode, setBgMode] = useState<"light" | "dark">("dark");
  const [menuBgMode, setMenuBgMode] = useState<"light" | "dark">("dark");

  const lastScrollYRef = useRef(0);
  const menuOpenRef = useRef(false);
  const location = useLocation();

  const topLineRef = useRef<SVGPathElement>(null);
  const middleLineRef = useRef<SVGPathElement>(null);
  const bottomLineRef = useRef<SVGPathElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const menuDotsRef = useRef<(HTMLImageElement | null)[]>([]);
  const menuLineRef = useRef<HTMLDivElement>(null);

  const animateIcon = useCallback((open: boolean) => {
    if (open) {
      gsap.to(middleLineRef.current, {
        rotation: -45,
        transformOrigin: "50% 50%",
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to([topLineRef.current, bottomLineRef.current], {
        rotation: 45,
        transformOrigin: "50% 50%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      gsap.to([middleLineRef.current, topLineRef.current, bottomLineRef.current], {
        rotation: 0,
        transformOrigin: "50% 50%",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, []);

  const animateMenu = useCallback((open: boolean) => {
    if (open) {
      gsap.set(menuPanelRef.current, { display: "block", pointerEvents: "auto" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(menuPanelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0);
      tl.fromTo(menuLineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.5 }, 0);
      tl.fromTo(
        menuDotsRef.current.filter(Boolean),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, stagger: 0.05 },
        0.15
      );
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
      tl.to(menuItemsRef.current.filter(Boolean), { opacity: 0, x: 10, duration: 0.2, stagger: 0.02 }, 0);
      tl.to(menuDotsRef.current.filter(Boolean), { scale: 0, opacity: 0, duration: 0.15, stagger: 0.02 }, 0.05);
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

  useEffect(() => {
    closeMenu();
    // Re-evaluate bg colour after the new page has painted
    const t = setTimeout(() => {
      setBgMode('dark'); // reset first so there's no flash of wrong colour
      setMenuBgMode('dark');
      // Then let the scroll/resize listener pick it up on next tick
      window.dispatchEvent(new Event('resize'));
    }, 80);
    return () => clearTimeout(t);
  }, [location.pathname, closeMenu]);

  useEffect(() => {
    /**
     * Sample several horizontal points at the navbar band (y ≈ 40px — centre of
     * the navbar row).  For each point we walk down the element stack looking for
     * the first non-navbar node that carries a visible background.
     *
     * Rules:
     *   • IMG / VIDEO / CANVAS / background-image  → always "dark" (use white)
     *   • Solid colour with luma > 180             → "light" (use green)
     *   • Everything else (dark solid / transparent)→ "dark" (use white)
     *
     * We tally votes across sample points and pick the majority.
     */
    const checkBgColor = () => {
      const header = document.querySelector('header');
      const sampleY = 40; // vertical centre of the navbar strip
      const sampleXPositions = [
        window.innerWidth * 0.15,
        window.innerWidth * 0.35,
        window.innerWidth * 0.5,
        window.innerWidth * 0.65,
        window.innerWidth * 0.85,
      ];
      
      const menuSampleYPositions = [100, 160, 220, 280, 340, 400];
      const menuSampleX = window.innerWidth / 2;

      const evaluatePoints = (points: {x: number, y: number}[]) => {
        let lightVotes = 0;
        let darkVotes = 0;

        for (const pt of points) {
          const elements = document.elementsFromPoint(pt.x, pt.y);
          let voted = false;

          for (const elem of elements) {
            // Skip the navbar itself, root tags, and the open menu panel
            if (header && header.contains(elem)) continue;
            if (elem.tagName === 'HTML' || elem.tagName === 'BODY') continue;
            if (elem === menuPanelRef.current || elem.closest('.group\\/link')) continue;

            // Manual override check
            const themeOverride = elem.closest('[data-nav-theme]');
            if (themeOverride) {
              const theme = themeOverride.getAttribute('data-nav-theme');
              if (theme === 'dark') {
                darkVotes++;
              } else if (theme === 'light') {
                lightVotes++;
              }
              voted = true;
              break;
            }

            // Media elements → definitively dark
            if (
              elem.tagName === 'IMG' ||
              elem.tagName === 'VIDEO' ||
              elem.tagName === 'CANVAS'
            ) {
              darkVotes++;
              voted = true;
              break;
            }

            const style = window.getComputedStyle(elem);

            // CSS background-image (gradients, url()) → treat as dark
            if (
              style.backgroundImage &&
              style.backgroundImage !== 'none' &&
              style.backgroundImage !== 'initial'
            ) {
              darkVotes++;
              voted = true;
              break;
            }

            // Solid background colour
            const bg = style.backgroundColor;
            if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
              const match = bg.match(/[\d.]+/g);
              if (match && match.length >= 3) {
                const alpha = match.length >= 4 ? parseFloat(match[3]) : 1;
                if (alpha > 0.05) {
                  const r = parseInt(match[0]);
                  const g = parseInt(match[1]);
                  const b = parseInt(match[2]);
                  // Perceived luminance (ITU-R BT.709)
                  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                  if (luma > 180) {
                    lightVotes++;
                  } else {
                    darkVotes++;
                  }
                  voted = true;
                  break;
                }
              }
            }
          }

          // No opaque element found → assume dark page / hero image
          if (!voted) darkVotes++;
        }
        return lightVotes > darkVotes ? 'light' : 'dark';
      };

      const topPoints = sampleXPositions.map(x => ({ x, y: sampleY }));
      const menuPoints = menuSampleYPositions.map(y => ({ x: menuSampleX, y }));

      setBgMode(evaluatePoints(topPoints));
      setMenuBgMode(evaluatePoints(menuPoints));
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
      if (menuOpenRef.current && currentScrollY > 10) closeMenu();
      checkBgColor();
    };

    // Also fire on route changes (handled below via location) and initial mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkBgColor);
    // Small delay so page content has actually painted
    const initTimer = setTimeout(checkBgColor, 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkBgColor);
      clearTimeout(initTimer);
    };
  }, [closeMenu]);

  const isLightTop = bgMode === 'light';
  const isLightMenu = menuBgMode === 'light';
  const hamburgerStroke = menuOpen ? "white" : (isLightTop ? "#1D781D" : "white");

  // Line separating menu items
  const activeLineBgClass = isLightMenu ? "bg-[#1D781D]" : "bg-white";
  // Primary nav link colour
  const activeTextColorClass = isLightMenu
    ? "text-[#1D781D] hover:text-[#0f3e0f]"
    : "text-white hover:text-white/70";
  // Sub-link colour
  const activeSubTextColorClass = isLightMenu
    ? "text-[#1D781D] hover:text-[#0f3e0f]"
    : "text-white/80 hover:text-white";
  // Little-dot tint
  const activeDotClass = isLightMenu
    ? "brightness-[0.35] sepia hue-rotate-90 saturate-[300%]"
    : "brightness-0 invert"; // force white on dark bg
  // Text-shadow for legibility on busy backgrounds
  const textShadow = isLightMenu
    ? undefined
    : { textShadow: "0 1px 6px rgba(0,0,0,0.55)" };

  const isHomePage = location.pathname === "/";
  
  const headerBgClass = isHomePage 
    ? (scrolled && !menuOpenRef.current ? "backdrop-blur-md bg-white/95 shadow-md border border-gray-100/50" : "bg-transparent") 
    : "bg-primary shadow-lg"; // primary color for bg on non-home pages

  const headerShapeClass = scrolled && !menuOpenRef.current
    ? "mt-4 md:mt-5 rounded-full mx-auto w-[96%] max-w-7xl"
    : "mt-0 rounded-none mx-auto w-full max-w-full";

  const navTextBase = isHomePage && scrolled ? "text-primary drop-shadow-none" : "text-white drop-shadow-sm";
  const navTextHover = isHomePage && scrolled ? "hover:text-primary/80" : "hover:text-white/80";

  return (
    <>
      <div 
        className="fixed top-0 left-0 right-0 flex justify-center z-50 pointer-events-none transition-transform duration-500 ease-in-out"
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <header
          className={`relative pointer-events-auto transition-all duration-500 ease-in-out flex flex-col justify-center ${headerBgClass} ${headerShapeClass}`}
        >
          <div className="flex items-center justify-between px-5 py-1 md:py-2 md:px-8 relative w-full pointer-events-none h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="relative z-[60] pointer-events-auto flex-shrink-0">
               <img src={emaLogo} alt="EMA Ethiopia" className="h-11 w-11 md:h-11 md:w-11 rounded-full transition-transform duration-500 hover:scale-110 " />
            </Link>

            {/* Desktop Nav Links (Slides from right to center) */}
            <div 
              className="hidden md:flex absolute top-1/2 items-center gap-8 z-[60] pointer-events-auto whitespace-nowrap transition-all duration-500 ease-in-out"
              style={{
                left: scrolled ? '50%' : 'calc(100% - 2.5rem)',
                transform: scrolled ? 'translate(-50%, -50%)' : 'translate(-100%, -50%)'
              }}
            >
              {navLinks.map((link) => (
                <div key={link.label} className="relative group/desklink">
                  {link.subLinks ? (
                    <div className="flex items-center gap-1.5 cursor-pointer py-2">
                      <span className={`font-body text-[15px] font-semibold transition-colors duration-500 ease-in-out ${navTextBase} ${navTextHover}`}>
                        {link.label}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`mt-0.5 group-hover/desklink:rotate-180 transition-transform ${navTextBase}`}>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  ) : (
                    <Link to={link.href} className={`font-body text-[15px] font-semibold transition-colors py-2 block ${navTextBase} ${navTextHover}`}>
                      {link.label}
                    </Link>
                  )}
                  
                  {/* Desktop Dropdown */}
                  {link.subLinks && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-black/5 opacity-0 invisible group-hover/desklink:opacity-100 group-hover/desklink:visible transition-all duration-300 transform origin-top translate-y-2 group-hover/desklink:translate-y-0 flex flex-col overflow-hidden">
                      {link.subLinks.map((sub) => (
                        <Link key={sub.label} to={sub.href} className="px-5 py-3.5 text-sm font-body font-semibold text-black hover:bg-primary hover:text-white transition-colors border-b border-gray-100 last:border-0">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="relative z-[60] flex flex-col items-center pointer-events-auto md:hidden">
              <button
                onClick={toggleMenu}
                className={`relative z-20 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 overflow-hidden ${menuOpen ? "bg-primary border border-white" : "bg-transparent"}`}
                aria-label={menuOpenRef.current ? "Close menu" : "Open menu"}
              >
                {!menuOpen && <div className="absolute inset-0 bg-primary backdrop-blur-md rounded-full pointer-events-none transition-opacity duration-300 opacity-90 hover:opacity-100" />}
                <svg viewBox="0 0 59 59" fill="none" className="h-8 w-8 relative z-10" aria-hidden="true">
                  <path ref={topLineRef} d="M14.5 19.5 L27.5 19.5" stroke="white" strokeWidth="5" strokeLinecap="round" className="transition-colors duration-300" />
                  <path ref={middleLineRef} d="M14.5 29.5 L44.5 29.5" stroke="white" strokeWidth="5" strokeLinecap="round" className="transition-colors duration-300" />
                  <path ref={bottomLineRef} d="M31.5 39.5 L44.5 39.5" stroke="white" strokeWidth="5" strokeLinecap="round" className="transition-colors duration-300" />
                </svg>
              </button>

              {/* Mobile Menu Panel */}
              <div ref={menuPanelRef} className="absolute top-14 right-0 w-[260px] pointer-events-none z-10" style={{ display: "none", opacity: 0 }}>
                <nav className="relative flex flex-col w-full h-full bg-black/70 backdrop-blur-xl rounded-3xl border border-white/20 mt-4 p-5 shadow-2xl">
                  <div className="flex flex-col relative w-full">
                    {navLinks.map((link, i) => (
                      <div
                        key={link.label}
                        ref={(el) => { menuItemsRef.current[i] = el; }}
                        className="group/link relative flex flex-col w-full min-h-[44px] justify-start py-2 opacity-0"
                        style={{ transform: "translateX(-20px)" }}
                      >
                        {/* Main Link Logic */}
                        {link.subLinks ? (
                          <div className="flex items-center justify-between gap-2 cursor-default border-b border-white/10 pb-2">
                            <span className="text-base font-body font-semibold whitespace-nowrap block text-white drop-shadow-md">
                              {link.label}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16" height="16"
                              viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2.5"
                              className="transition-transform duration-300 group-hover/link:rotate-90 text-white"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </div>
                        ) : (
                          <Link
                            to={link.href}
                            className="text-base font-body font-semibold whitespace-nowrap block text-white drop-shadow-md border-b border-white/10 pb-2"
                            onClick={closeMenu}
                          >
                            {link.label}
                          </Link>
                        )}

                        {/* Sub-links */}
                        {link.subLinks && (
                          <div className="grid grid-rows-[0fr] group-hover/link:grid-rows-[1fr] transition-[grid-template-rows] duration-300 overflow-visible">
                            <div className="overflow-hidden min-h-0 pt-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 delay-100">
                              <div className="flex flex-col gap-2 pl-4 border-l-2 border-primary mt-1">
                                {link.subLinks.map((subLink) => (
                                  <Link
                                    key={subLink.label}
                                    to={subLink.href}
                                    className="font-body text-sm whitespace-nowrap block text-white/90 hover:text-white transition-colors duration-300 py-1"
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
      </div>
    </>
  );
};

export default Navbar;