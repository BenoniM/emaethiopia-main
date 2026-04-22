import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import emaLogo from "@/assets/ema-logo.png";
import greenCoffee from "@/assets/export-imgs/green-coffee.png";
import sesameSeeds from "@/assets/export-imgs/sesame-seeds.png";
import nigerSeed from "@/assets/export-imgs/niger-seed.png";
import kidneyBean from "@/assets/export-imgs/kidney-bean.png";
import chickpea from "@/assets/export-imgs/chickpea.png";
import mungBean from "@/assets/export-imgs/mung-bean.png";
import haricotBean from "@/assets/export-imgs/haricot-bean.png";
import oilSeed from "@/assets/export-imgs/oil-seed.png";
import spicesHerbs from "@/assets/export-imgs/spices-herbs.png";
import allexports from "@/assets/export-imgs/all-exports.png";

import bgCoffee from "@/assets/product-coffee.jpg";
import bgSesame from "@/assets/product-sesame.jpg";
import bgNigerSeed from "@/assets/product-niger-seeds.jpg";
import bgKidney from "@/assets/product-kidney.png";
import bgChickpea from "@/assets/product-chickpea.jpg";
import bgMungBean from "@/assets/product-mung-bean.jpg";
import bgHaricot from "@/assets/product-haricot.jpg";
import bgOilSeed from "@/assets/product-oilseeds.jpg";
import bgSpices from "@/assets/product-spices.png";

/* ─── product data ─────────────────────────────────────────── */
interface Product {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  image?: string;
  bgImage?: any;
  isOverview: boolean;
  description: string;
  specs: string[];
  origin: string;
  adjustments?: {
    wheel?: {
      x?: string;
      y?: string;
      scale?: number;
      rotate?: number;
      mobile?: {
        x?: string;
        y?: string;
        scale?: number;
        rotate?: number;
      };
      width?: {
        focused?: string;
        normal?: string;
      };
      positions?: {
        left: string;
        top: string;
        width: string;
        rot: number;
        z: number;
      }[];
    };
  };
}

const products: Product[] = [
  {
    id: "green-coffee",
    title: "Green Coffee",
    subtitle: "Premium Arabica Beans",
    color: "#5b5743ff",
    image: greenCoffee,
    bgImage: bgCoffee,
    isOverview: false,
    adjustments: { wheel: { x: "-3%", y: "0%", scale: 1.2, rotate: 0, mobile: { x: "0%", y: "-28%", scale: 0.9, rotate: 0 } } },
    description:
      "Premium Ethiopian Arabica green coffee — washed and natural processed from Yirgacheffe, Sidamo, Jimma, and Harar regions.",
    specs: ["Arabica Variety", "Grade 1-5", "Washed & Natural", "SCA 80+"],
    origin: "Yirgacheffe, Sidamo, Jimma, Harar",
  },
  {
    id: "sesame-seeds",
    title: "Sesame Seeds",
    subtitle: "Humera & Wollega",
    color: "#9E7C0C",
    image: sesameSeeds,
    bgImage: bgSesame,
    isOverview: false,
    adjustments: { wheel: { x: "4%", y: "0%", scale: 1, rotate: 0, mobile: { x: "0%", y: "-5%", scale: 1.1, rotate: 0 } } },
    description:
      "Premium Humera and Wollega sesame seeds with 50-55% oil content and nutty flavor. White, brown, and mixed varieties.",
    specs: ["50-55% Oil", "Humera & Wollega", "White & Brown", "99.5% Purity"],
    origin: "Humera, Wollega",
  },
  {
    id: "niger-seed",
    title: "Niger Seeds",
    subtitle: "Premium Noug",
    color: "#000000ff",
    image: nigerSeed,
    bgImage: bgNigerSeed,
    isOverview: false,
    adjustments: { wheel: { x: "0%", y: "0%", scale: 1, rotate: 0, mobile: { x: "0%", y: "-5%", scale: 1, rotate: 0 } } },
    description:
      "High-quality Ethiopian Niger seeds (Noug) with 38-43% oil content for bird feed and edible oil markets.",
    specs: ["38-43% Oil", "Bird Feed Grade", "Edible Oil", "Machine Cleaned"],
    origin: "Central & Western Ethiopia",
  },
  {
    id: "kidney-bean",
    title: "Kidney Beans",
    subtitle: "Red Kidney",
    color: "#7B1818",
    image: kidneyBean,
    bgImage: bgKidney,
    isOverview: false,
    adjustments: { wheel: { x: "4%", y: "0%", scale: 1, rotate: 0, mobile: { x: "0%", y: "-20%", scale: 0.7, rotate: 0 } } },
    description:
      "Nutrient-rich Ethiopian red kidney beans packed with protein and fiber for global food markets.",
    specs: ["High Protein", "Export Grade", "Machine Cleaned", "Low Moisture"],
    origin: "Rift Valley, Southern Ethiopia",
  },
  {
    id: "chickpea",
    title: "Chickpea",
    subtitle: "Desi & Kabuli",
    color: "#BF6C00",
    image: chickpea,
    bgImage: bgChickpea,
    isOverview: false,
    adjustments: { wheel: { x: "0%", y: "-10%", scale: 1, rotate: 0, mobile: { x: "0%", y: "-15%", scale: 1, rotate: 0 } } },
    description:
      "Ethiopian chickpeas in Desi and Kabuli varieties — exported to Middle East, South Asia, and European markets.",
    specs: ["Desi & Kabuli", "8-12mm", "High Protein", "Machine Sorted"],
    origin: "Northern & Central Ethiopia",
  },
  {
    id: "mung-bean",
    title: "Mung Bean",
    subtitle: "Green Mung",
    color: "#9E9B4F",
    image: mungBean,
    bgImage: bgMungBean,
    isOverview: false,
    adjustments: { wheel: { x: "5%", y: "0%", scale: 1, rotate: 0, mobile: { x: "0%", y: "-20%", scale: 0.8, rotate: 0 } } },
    description:
      "Premium Ethiopian green mung beans for Asian cuisine, sprouting, and food processing.",
    specs: ["High Germination", "3-4mm", "Sprouting Grade", "Machine Sorted"],
    origin: "Eastern Ethiopia",
  },
  {
    id: "haricot-bean",
    title: "Haricot Bean",
    subtitle: "White Beans",
    color: "#FDCA90",
    image: haricotBean,
    bgImage: bgHaricot,
    isOverview: false,
    adjustments: { wheel: { x: "0%", y: "0%", scale: 1.2, rotate: 0, mobile: { x: "0%", y: "-10%", scale: 1, rotate: 0 } } },
    description:
      "White haricot beans from Ethiopia — exported for canning and baked beans production worldwide.",
    specs: ["Canning Grade", "6-8mm", "Low Moisture", "Hand Sorted"],
    origin: "Rift Valley",
  },
  {
    id: "oil-seed",
    title: "Oil Seeds",
    subtitle: "Linseed & More",
    color: "#4B4843",
    image: oilSeed,
    bgImage: bgOilSeed,
    isOverview: false,
    adjustments: { wheel: { x: "0%", y: "35%", scale: 1.3, rotate: 0, mobile: { x: "0%", y: "-5%", scale: 1.1, rotate: 0 } } },
    description:
      "Ethiopian oil seeds including linseed, sunflower, and soybean — sourced from cooperatives.",
    specs: ["Multiple Varieties", "High Oil", "Direct Source", "Organic Available"],
    origin: "Various Regions",
  },
  {
    id: "spices-herbs",
    title: "Spices & Herbs",
    subtitle: "Authentic Ethiopian",
    color: "#F5C34B",
    image: spicesHerbs,
    bgImage: bgSpices,
    isOverview: false,
    adjustments: { wheel: { x: "0%", y: "10%", scale: 1.1, rotate: -9, mobile: { x: "0%", y: "-10%", scale: 1, rotate: 0 } } },
    description:
      "Authentic Ethiopian turmeric, ginger, fenugreek, and black cumin — exported globally.",
    specs: ["Organic Available", "Sun Dried", "Hand Sorted", "Essential Oils"],
    origin: "Various Regions",
  },
];

const amalgamImgs = [
  allexports,
  greenCoffee,
  sesameSeeds,
  kidneyBean,
  spicesHerbs,
  nigerSeed,
  chickpea,
  mungBean,
  haricotBean,
  oilSeed,
];

const N = products.length;
const SEG = 360 / N;
const BASE_SPAN = 32;
const FOCUSED_SPAN = 50;
const PROP_SCALE = FOCUSED_SPAN / BASE_SPAN;
const FOCUSED_ANGLE = 70;
const NORMAL_ANGLE = (360 - FOCUSED_ANGLE) / (N - 1);
const NORMAL_CLIP = "polygon(50% 50%, 34% 0%, 66% 0%)";
const WIDE_CLIP = "polygon(50% 50%, 16% 0%, 84% 0%)";
const SENS = 0.2;

function snapTo(rot: number) {
  const raw = Math.round(-rot / SEG);
  const idx = ((raw % N) + N) % N;
  return { idx, rot: -raw * SEG };
}

/* ─── component ────────────────────────────────────────────── */

const ProductsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const wheelInnerRef = useRef<HTMLDivElement>(null);

  /* custom cursor refs */
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const rafId = useRef(0);
  const cursorVisible = useRef(false);

  const rotRef = useRef(0);
  const idxRef = useRef(0);
  useEffect(() => {
    idxRef.current = activeIndex;
  }, [activeIndex]);

  const dragActive = useRef(false);
  const sx = useRef(0);
  const sy = useRef(0);
  const baseR = useRef(0);
  const prevX = useRef(0);
  const prevT = useRef(0);
  const vel = useRef(0);
  const dir = useRef<"h" | "v" | null>(null);
  const accD = useRef(0);

  /* ─── Cursor follow animation ─── */
  useLayoutEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;

      if (cursorRef.current && cursorVisible.current) {
        const currentLeft = parseFloat(cursorRef.current.style.left || "0");
        const currentTop = parseFloat(cursorRef.current.style.top || "0");

        const nextLeft = currentLeft + (mouseX.current - currentLeft) * 0.15;
        const nextTop = currentTop + (mouseY.current - currentTop) * 0.15;

        cursorRef.current.style.left = `${nextLeft}px`;
        cursorRef.current.style.top = `${nextTop}px`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  /* ─── Detail Section Animations ─── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-animate",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "all",
        }
      );

      if (!products[activeIndex].isOverview) {
        gsap.fromTo(
          ".detail-image",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "all" }
        );
      }
    }, detailRef);

    return () => ctx.revert();
  }, [activeIndex]);

  /* ─── Wheel Focus Title Animation ─── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".title-animate",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [activeIndex]);

  /* ─── Interaction Handlers ─── */
  const onDown = useCallback((e: React.PointerEvent) => {
    dragActive.current = true;
    sx.current = e.clientX;
    sy.current = e.clientY;
    baseR.current = rotRef.current;
    prevX.current = e.clientX;
    prevT.current = Date.now();
    vel.current = 0;
    dir.current = null;
    setIsDragging(true);

    gsap.killTweensOf(wheelInnerRef.current);

    if (cursorDotRef.current) {
      gsap.to(cursorDotRef.current, {
        scale: 0.7,
        duration: 0.2,
        ease: "power2.out",
      });
    }

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;

    if (!dragActive.current) return;

    const dx = e.clientX - sx.current;
    const dy = e.clientY - sy.current;

    if (dir.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      dir.current = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
    }

    if (dir.current !== "h") return;
    if (e.cancelable) e.preventDefault();

    const newR = baseR.current + dx * SENS;
    rotRef.current = newR;

    gsap.set(wheelInnerRef.current, { rotation: newR });

    const now = Date.now();
    const dt = now - prevT.current;
    if (dt > 0) vel.current = ((e.clientX - prevX.current) / dt) * SENS;
    prevX.current = e.clientX;
    prevT.current = now;

    const s = snapTo(newR);
    if (s.idx !== idxRef.current) setActiveIndex(s.idx);
  }, []);

  const onUp = useCallback((e: React.PointerEvent) => {
    if (!dragActive.current) return;
    dragActive.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);

    if (cursorDotRef.current) {
      gsap.to(cursorDotRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)",
      });
    }

    if (dir.current === "h") {
      const projected = rotRef.current + vel.current * 120;
      const s = snapTo(projected);
      rotRef.current = s.rot;

      gsap.to(wheelInnerRef.current, {
        rotation: s.rot,
        duration: 0.85,
        ease: "back.out(1.2)",
      });
      setActiveIndex(s.idx);
    }

    dir.current = null;
  }, []);

  const onEnterHero = useCallback(() => {
    cursorVisible.current = true;
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  const onLeaveHero = useCallback(() => {
    cursorVisible.current = false;
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const r = hero.getBoundingClientRect();

      if (r.top < -120 || r.top > 120) {
        accD.current = 0;
        return;
      }

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;

      e.preventDefault();
      if (dragActive.current) return;

      accD.current += e.deltaX;
      if (Math.abs(accD.current) < 45) return;

      const d = accD.current > 0 ? 1 : -1;
      accD.current = 0;

      const newR = rotRef.current - d * SEG;
      const s = snapTo(newR);
      rotRef.current = s.rot;

      gsap.to(wheelInnerRef.current, {
        rotation: s.rot,
        duration: 0.6,
        ease: "power3.out",
      });
      setActiveIndex(s.idx);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  /* Fluid Contract/Expand Hover Handlers */
  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1.02, duration: 0.4, ease: "power3.out" });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: "power3.out" });
  };

  const active = products[activeIndex];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ━━━━ HERO PINWHEEL ━━━━ */}
      <section
        ref={heroRef}
        data-nav-theme="dark"
        className="relative h-screen overflow-hidden select-none"
        style={{ background: "#fcf8f1", touchAction: "pan-y", cursor: "none" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerEnter={onEnterHero}
        onPointerLeave={onLeaveHero}
      >
        {/* ── Custom cursor ── */}
        <div
          ref={cursorRef}
          className="fixed pointer-events-none z-[100]"
          style={{
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.5)",
            top: 0,
            left: 0,
            willChange: "transform",
          }}
        >
          <div className="relative flex items-center justify-center">
            <div
              ref={cursorDotRef}
              className="relative w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
                boxShadow:
                  "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: active.color, transition: "background 0.4s ease" }}
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${active.color}20`,
                  animation: isDragging ? "none" : "cursorPulse 2s ease-in-out infinite",
                }}
              />
            </div>

            <div
              className="absolute flex items-center gap-[4.5rem] transition-opacity duration-300"
              style={{ opacity: isDragging ? 0.3 : 0.7 }}
            >
              <ChevronLeft
                className="w-8 h-8 text-white"
                style={{
                  transform: isDragging ? "translateX(-6px)" : "translateX(0)",
                  transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
              <ChevronRight
                className="w-8 h-8 text-white rotate-180"
                style={{
                  transform: isDragging ? "translateX(6px)" : "translateX(0)",
                  transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="absolute left-1/2 bottom-0 pointer-events-none"
          style={{
            width: "220vmax",
            height: "220vmax",
            transform: "translate(-50%,50%)",
          }}
        >
          <div
            ref={wheelInnerRef}
            className="will-change-transform transform-gpu"
            style={{ width: "100%", height: "100%", transformOrigin: "50% 50%" }}
          >
            {products.map((p, i) => {
              const isFocused = i === activeIndex;

              const contentTop = p.isOverview ? (isFocused ? "9%" : "16%") : isFocused ? "30%" : "40%";

              const contentWidth = p.isOverview
                ? isFocused
                  ? "34vh"
                  : "28vh"
                : isFocused
                  ? p.adjustments?.wheel?.width?.focused || "90vh"
                  : p.adjustments?.wheel?.width?.normal || "50vh";

              const contentScale = isFocused ? 1 : 0.9;

              let dist = i - activeIndex;
              while (dist > N / 2) dist -= N;
              while (dist <= -N / 2) dist += N;

              let correction = 0;
              if (dist !== 0) {
                const sign = dist > 0 ? 1 : -1;
                const absDist = Math.abs(dist);
                const targetRelRotation =
                  sign * (FOCUSED_ANGLE / 2 + (absDist - 0.5) * NORMAL_ANGLE);
                correction = targetRelRotation - dist * SEG;
              }

              return (
                <div
                  key={p.id}
                  className="absolute inset-0 transition-[transform,clip-path,background-color] duration-[0.8s] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-[transform,clip-path] transform-gpu overflow-visible"
                  style={{
                    transform: `rotate(${i * SEG + correction}deg)`,
                    clipPath: isFocused ? WIDE_CLIP : NORMAL_CLIP,
                    zIndex: isFocused ? 10 : 1,
                    backgroundColor: p.color,
                  }}
                >
                  {p.bgImage && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${p.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(3px) brightness(0.5)',
                        transform: 'scale(1.1)', // Prevent blurred edges from leaking
                      }}
                    />
                  )}

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 50%,transparent 25%,rgba(0,0,0,0.35) 100%)",
                    }}
                  />

                  <div
                    className="absolute flex flex-col items-center justify-start transition-[transform,top,width,opacity] duration-[0.9s] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-[transform,top,width] transform-gpu"
                    style={{
                      top: contentTop,
                      left: "50%",
                      width: contentWidth,
                      transform: `translateX(-50%) scale(${contentScale})`,
                      transformOrigin: "top center",
                    }}
                  >
                    {p.isOverview ? (
                      <div className="relative w-[24vh] h-[24vh]">
                        {(p.adjustments?.wheel?.positions || [
                          { left: "10%", top: "5%", width: "45%", rot: -15, z: 1 },
                          { left: "55%", top: "15%", width: "50%", rot: 20, z: 3 },
                          { left: "25%", top: "45%", width: "40%", rot: 5, z: 2 },
                          { left: "-5%", top: "60%", width: "48%", rot: -25, z: 4 },
                          { left: "65%", top: "55%", width: "42%", rot: 30, z: 1 },
                          { left: "35%", top: "20%", width: "38%", rot: -10, z: 5 },
                        ]).map((pos, j) => (
                          <img
                            key={j}
                            src={amalgamImgs[j % amalgamImgs.length]}
                            alt=""
                            draggable={false}
                            className="absolute object-contain pointer-events-none"
                            style={{
                              width: pos.width,
                              left: pos.left,
                              top: pos.top,
                              transform: `rotate(${pos.rot}deg)`,
                              zIndex: pos.z,
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <img
                        src={p.image!}
                        alt={p.title}
                        draggable={false}
                        className="w-full h-auto object-contain pointer-events-none"
                        style={{
                          filter: isFocused
                            ? "drop-shadow(0 20px 30px rgba(0,0,0,0.2))"
                            : "none",
                          transform: (() => {
                            const mAdj = p.adjustments?.wheel?.mobile;
                            const dAdj = p.adjustments?.wheel;
                            const finalX = isMobile && mAdj?.x !== undefined ? mAdj.x : dAdj?.x || "0%";
                            const finalY = isMobile && mAdj?.y !== undefined ? mAdj.y : dAdj?.y || "0%";
                            const finalScale = isMobile && mAdj?.scale !== undefined ? mAdj.scale : dAdj?.scale || 1;
                            const finalRot = isMobile && mAdj?.rotate !== undefined ? mAdj.rotate : dAdj?.rotate || 0;
                            return `translate(${finalX}, ${finalY}) scale(${finalScale}) rotate(${finalRot}deg)`;
                          })(),
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stationary Title Container */}
        <div className="absolute top-[18%] md:top-[30%] left-1/2 -translate-x-1/2 z-[40] w-full max-w-[90vw] md:max-w-3xl text-center pointer-events-none flex flex-col items-center gap-5">
          <div className="title-animate inline-block bg-white/95 backdrop-blur-md px-8 py-4 md:px-10 md:py-4 rounded-[1rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-white/50 pointer-events-auto">
            <h2
              className={`font-display text-[38px] leading-[1.1] md:text-5xl md:leading-tight font-bold ${
                active.isOverview ? "lowercase" : "uppercase tracking-tighter"
              }`}
              style={{
                color: active.color,
                ...(active.isOverview ? { fontFamily: "Pacifico, cursive" } : {}),
              }}
            >
              {active.isOverview ? "Life tastes sweeter" : active.title}
            </h2>
          </div>

          <div className="title-animate pointer-events-auto" onPointerDown={(e) => e.stopPropagation()}>
            <button
              onClick={() => detailRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-3 bg-primary text-white px-12 py-5 md:px-10 md:py-4 rounded-xl font-body text-base md:text-sm font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              Explore
            </button>
          </div>

          {/* Mobile Drag Indicator */}
          <div className="md:hidden title-animate flex flex-col items-center gap-2 mt-4 text-[#1B6E1B] font-display text-[11px] uppercase tracking-[0.2em] drop-shadow-md bg-white backdrop-blur-sm px-6 py-2 rounded-full border border-white/30 pointer-events-none">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 9l-4 3 4 3" />
              <path d="M16 9l4 3-4 3" />
              <line x1="4" y1="12" x2="20" y2="12" />
            </svg>
            <span className="font-bold">Drag Left Or Right</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] z-20 pointer-events-none">
          <div className="w-4 h-4 rounded-full bg-white/90 shadow-lg" />
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div
            className="flex items-start justify-center pt-3"
            style={{
              width: "200px",
              height: "70px",
              borderRadius: "70px 70px 0 0",
            }}
          >
            <div className="flex flex-col items-center">
              <img src={emaLogo} alt="EMA" className="object-cover" draggable={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━ DETAIL SECTION ━━━━ */}
      <section
        ref={detailRef}
        data-nav-theme="dark"
        className="relative z-10 min-h-[80vh] overflow-hidden transition-colors duration-[0.8s] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ backgroundColor: active.color }}
      >
        {active.bgImage && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${active.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(4px) brightness(0.4)",
              transform: "scale(1.1)",
              zIndex: 0,
            }}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%,transparent 25%,rgba(0,0,0,0.5) 100%)",
            zIndex: 0,
          }}
        />

        <div className="container relative mx-auto px-6 py-12 z-10">
          <div key={active.id}>
            {active.isOverview ? (
              <div>
                <div className="text-center mb-14 detail-animate">
                  <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-[#f5eedc] uppercase">
                    Our Export Range
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                    Premium Ethiopian <span className="text-[#f5eedc]">Products</span>
                  </h2>
                  <p className="mt-4 max-w-2xl mx-auto font-body text-white/80">
                    {active.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {products.filter((p) => !p.isOverview).map((p) => (
                    <div
                      key={p.id}
                      onMouseEnter={handleCardEnter}
                      onMouseLeave={handleCardLeave}
                      className="detail-animate group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm transform-gpu origin-center hover:bg-black/30 transition-colors"
                    >
                      <div
                        className="aspect-square flex items-center justify-center p-10"
                        style={{ backgroundColor: p.color + "40" }}
                      >
                        <img src={p.image!} alt={p.title} className="w-3/5 h-3/5 object-contain filter drop-shadow-xl" />
                      </div>
                      <div className="px-5 py-4">
                        <h3 className="font-display text-lg font-bold text-white">{p.title}</h3>
                        <p className="font-body text-xs text-white/70">{p.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div
                  className="detail-image relative aspect-square rounded-3xl flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl bg-black/10 backdrop-blur-sm"
                >
                  <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${active.color}, transparent 70%)`,
                    }}
                  />
                  <img
                    src={active.image!}
                    alt={active.title}
                    className="relative z-10 w-3/5 h-3/5 object-contain filter drop-shadow-2xl"
                  />
                </div>

                <div>
                  <span className="detail-animate inline-block mb-3 font-body text-sm font-semibold tracking-widest text-[#f5eedc] uppercase">
                    {active.subtitle}
                  </span>
                  <h2 className="detail-animate font-display text-4xl md:text-5xl font-bold text-white mb-5">
                    {active.title}
                  </h2>
                  <p className="detail-animate font-body text-lg leading-relaxed text-white/80 mb-8">
                    {active.description}
                  </p>

                  <div className="detail-animate flex flex-wrap gap-2 mb-8">
                    {active.specs.map((s) => (
                      <span
                        key={s}
                        className="px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md font-body text-sm text-white shadow-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="detail-animate mb-8 rounded-xl border border-white/10 bg-black/20 backdrop-blur-md p-5 shadow-inner">
                    <span className="font-body text-xs font-semibold tracking-widest text-[#f5eedc] uppercase">
                      Origin
                    </span>
                    <p className="font-body text-base text-white mt-1">{active.origin}</p>
                  </div>

                  <div className="detail-animate flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-body text-sm font-semibold text-black hover:bg-white/90 transition-colors shadow-lg"
                    >
                      Contact Us <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes cursorPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;