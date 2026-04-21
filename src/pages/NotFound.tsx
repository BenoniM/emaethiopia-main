import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Home, MoveLeft, Terminal } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial entrance
    tl.fromTo(".bg-accent-circle", 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 0.15, duration: 2, stagger: 0.5 }
    )
    .from(numRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      skewY: 10
    }, "-=1.5")
    .from(".animate-text", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    }, "-=0.8")
    .from(".animate-btn", {
      scale: 0.9,
      opacity: 0,
      duration: 0.6
    }, "-=0.4");

    // Floating animation for the 404 number
    gsap.to(numRef.current, {
      y: "-=20",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Decorative particles
    gsap.to(".particle", {
      y: "random(-100, 100)",
      x: "random(-100, 100)",
      duration: "random(4, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        amount: 3,
        from: "random"
      }
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0F0D]"
    >
      {/* Decorative Elements */}
      <div className="bg-accent-circle absolute -top-[10%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-primary/20 blur-[120px]" />
      <div className="bg-accent-circle absolute -bottom-[10%] -right-[10%] h-[50vw] w-[50vw] rounded-full bg-primary/10 blur-[120px]" />
      
      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i}
          className="particle absolute h-2 w-2 rounded-full bg-primary/30 blur-sm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm">
            <Terminal className="h-8 w-8 text-primary" />
          </div>
        </div>

        <h1 
          ref={numRef}
          className="mb-4 text-[12rem] font-bold leading-none tracking-tighter text-white sm:text-[16rem]"
          style={{ textShadow: "0 0 40px rgba(34, 197, 94, 0.2)" }}
        >
          404
        </h1>

        <div ref={textRef} className="space-y-4">
          <h2 className="animate-text text-3xl font-bold text-white sm:text-4xl">
            Lost in the Highlands?
          </h2>
          <p className="animate-text mx-auto max-w-md text-lg text-muted-foreground">
            The page you are looking for doesn't exist or has been moved to a new destination.
          </p>
          
          <div className="animate-text mt-4 rounded-lg bg-white/5 p-3 font-mono text-sm text-primary/80 backdrop-blur-sm">
            Error Path: {location.pathname}
          </div>
        </div>

        <div className="animate-btn mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link 
            to="/" 
            className="magnetic-btn group flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-medium text-white transition-all hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            <MoveLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
    </div>
  );
};

export default NotFound;

