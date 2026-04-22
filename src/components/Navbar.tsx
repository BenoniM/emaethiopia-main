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
  { label: "Services", href: "/services" },
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ${scrolled && !menuOpenRef.current ? "backdrop-blur-md bg-foreground/15" : "bg-transparent"}`}
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="flex items-start justify-between px-6 py-5 md:px-10 md:py-6 relative w-full h-full pointer-events-none">
          <Link to="/" className="relative z-[60] pointer-events-auto">
            <img src={emaLogo} alt="EMA Ethiopia" className="h-14 w-14 rounded-full transition-transform duration-300 hover:scale-110" />
          </Link>

          <div className="relative z-[60] flex flex-col items-center pointer-events-auto">
            <button
              onClick={toggleMenu}
              className={`relative z-20 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 overflow-hidden ${menuOpen ? "bg-[#1D781D] border border-white" : "bg-transparent"}`}
              aria-label={menuOpenRef.current ? "Close menu" : "Open menu"}
            >
              {!menuOpen && <div className="absolute inset-0 bg-[#1D781D] backdrop-blur-md rounded-full pointer-events-none transition-opacity duration-300 opacity-90 hover:opacity-100" />}
              <svg viewBox="0 0 59 59" fill="none" className="h-10 w-10 relative z-10" aria-hidden="true">
                <path ref={topLineRef} d="M14.5 19.5 L27.5 19.5" stroke="white" strokeWidth="5" strokeLinecap="round" className="transition-colors duration-300" />
                <path ref={middleLineRef} d="M14.5 29.5 L44.5 29.5" stroke="white" strokeWidth="5" strokeLinecap="round" className="transition-colors duration-300" />
                <path ref={bottomLineRef} d="M31.5 39.5 L44.5 39.5" stroke="white" strokeWidth="5" strokeLinecap="round" className="transition-colors duration-300" />
              </svg>
            </button>

            <div ref={menuPanelRef} className="absolute top-14 left-1/2 -translate-x-1/2 w-[320px] pointer-events-none z-10" style={{ display: "none", opacity: 0 }}>
              <nav className="relative flex flex-col w-full h-full">
                <div ref={menuLineRef} className={`absolute top-0 bottom-6 left-1/2 -translate-x-[0.5px] w-[1px] opacity-80 transition-colors duration-300 ${activeLineBgClass}`} style={{ transformOrigin: "top", transform: "scaleY(0)" }} />

                <div className="flex flex-col relative w-full pt-4 pb-8">
                  {navLinks.map((link, i) => (
                    <div
                      key={link.label}
                      ref={(el) => { menuItemsRef.current[i] = el; }}
                      className="group/link relative flex flex-col items-end w-full pr-[calc(50%+30px)] min-h-[48px] justify-start pt-[12px] opacity-0"
                      style={{ transform: "translateX(-20px)" }}
                    >
                      <img
                        ref={(el) => { menuDotsRef.current[i] = el; }}
                        src={littleDot}
                        alt=""
                        className={`absolute right-[152px] top-[17px] translate-x-1/2 h-[14px] w-[14px] z-10 drop-shadow-md transition-all duration-300 ${activeDotClass}`}
                        style={{ opacity: 0, transform: "scale(0)" }}
                      />

                      {/* Main Link Logic */}
                      {link.subLinks ? (
                        <div className="flex items-center gap-2 cursor-default">
                          <span
                            className={`text-lg lg:text-xl font-body font-medium whitespace-nowrap block transition-colors duration-300 ${activeTextColorClass}`}
                            style={textShadow}
                          >
                            {link.label}
                          </span>
                          {/* Chevron Arrow */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16" height="16"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            className={`transition-transform duration-300 group-hover/link:rotate-90 ${isLightMenu ? "text-[#1D781D]" : "text-white/80"}`}
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </div>
                      ) : (
                        <Link
                          to={link.href}
                          className={`text-lg lg:text-xl font-body font-medium whitespace-nowrap block transition-colors duration-300 ${activeTextColorClass}`}
                          style={textShadow}
                          onClick={closeMenu}
                        >
                          {link.label}
                        </Link>
                      )}

                      {/* Sub-links */}
                      {link.subLinks && (
                        <div className="grid grid-rows-[0fr] group-hover/link:grid-rows-[1fr] transition-[grid-template-rows] duration-300 overflow-visible">
                          <div className="overflow-hidden min-h-0 pt-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 delay-100">
                            <div className="flex flex-col items-end gap-2">
                              {link.subLinks.map((subLink) => (
                                <Link
                                  key={subLink.label}
                                  to={subLink.href}
                                  className={`font-body text-sm whitespace-nowrap block text-right pr-0 transition-colors duration-300 ${activeSubTextColorClass}`}
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