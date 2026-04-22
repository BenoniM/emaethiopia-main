import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import journeyVideo from "@/assets/videos/coffee-timelapse.mp4";

// Make sure to import your images or update these paths
import teamFull from "@/assets/team-full.png";
import coffeeLab from "@/assets/coffee-lab.png";
import teamCupping from "@/assets/team-cupping.png";

gsap.registerPlugin(ScrollTrigger);

// 1. Merged milestones with rich content
const milestones = [
  {
    year: "2019",
    title: "Established",
    label: "Chapter 01",
    content: (
      <div className="mt-2">
        <p className="mb-6 font-body text-base text-white/80 leading-relaxed">
          EMA Import and Export Pvt.Ltd. was established in Addis Ababa with a vision to bring Ethiopia's finest products to the global market. Operating under the Droga Pharma umbrella, we began exporting premium green coffee beans.
        </p>
        <img src={coffeeLab} alt="EMA team 2025" className="h-48 w-full rounded-xl object-cover shadow-lg border border-white/10" />
      </div>
    ),
  },
  {
    year: "2021",
    title: "Global Reach",
    label: "Chapter 02",
    content: (
      <div className="mt-2">
        <p className="mb-5 font-body text-base text-white/80 leading-relaxed">
          Expanded export operations to over 15 countries and established our state-of-the-art Coffee Laboratory for comprehensive quality testing, cupping, and grading services.
        </p>
        <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
          {[
            "✅ Expanded to 15+ countries across Asia and Europe", 
            "✅ ISO certification achieved for processing facilities", 
            "✅ Coffee Laboratory established with certified Q-graders", 
            "✅ Sesame seeds and Niger seeds added to export portfolio"
          ].map((item) => (
            <p key={item} className="font-body text-sm text-white/90 font-medium">{item}</p>
          ))}
        </div>
      </div>
    ),
  },
  {
    year: "2023",
    title: "Major Growth",
    label: "Chapter 03",
    content: (
      <div className="mt-2">
        <p className="mb-5 font-body text-base text-white/80 leading-relaxed">
          Reached major growth milestones with expanded product range including pulses, beans, and spices. Launched medical equipment import division to strengthen Ethiopian healthcare.
        </p>
        <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
          {[
            "✅ Export to multiple countries across 4 continents", 
            "✅ Medical equipment import division launched under Droga Pharma", 
            "✅ 100+ satisfied international clients", 
            "✅ 10,000+ tons exported annually"
          ].map((item) => (
            <p key={item} className="font-body text-sm text-white/90 font-medium">{item}</p>
          ))}
        </div>
      </div>
    ),
  },
  {
    year: "2025",
    title: "Sustainability",
    label: "Chapter 04",
    content: (
      <div className="mt-2">
        <p className="mb-6 font-body text-base text-white/80 leading-relaxed">
          Continuing to grow with new market expansions, cutting-edge quality control processes, and deepening partnerships with Ethiopian farmer cooperatives for sustainable sourcing.
        </p>
        <img src={teamFull} alt="EMA team 2025" className="h-48 w-full rounded-xl object-cover shadow-lg border border-white/10" />
      </div>
    ),
  },
];

const CANVAS_W = 1920;
const CANVAS_H = 1080;
const START_BUF = 0.05;
const END_BUF = 0.05;
const CH_FADE = 0.06;
const N = milestones.length;
const LAST_IDX = N - 1;

export default function JourneySection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);
  const seekingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const drawFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const vw = video.videoWidth, vh = video.videoHeight;
    if (!vw || !vh) return;
    const vR = vw / vh, cR = CANVAS_W / CANVAS_H;
    let sx = 0, sy = 0, sw = vw, sh = vh;
    if (vR > cR) { sw = vh * cR; sx = (vw - sw) / 2; }
    else { sh = vw / cR; sy = (vh - sh) / 2; }
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, CANVAS_W, CANVAS_H);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onReady = () => {
      durationRef.current = video.duration;
      video.currentTime = 0;
    };
    const onSeeked = () => {
      drawFrame();
      currentTimeRef.current = video.currentTime;
      seekingRef.current = false;
    };
    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady, { once: true });
    video.addEventListener("seeked", onSeeked);
    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [drawFrame]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const LERP = 0.18;
    const tick = () => {
      if (!seekingRef.current) {
        const gap = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(gap) > 0.02) {
          seekingRef.current = true;
          video.currentTime = currentTimeRef.current + gap * LERP;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const update = (p: number) => {
      const dur = durationRef.current;
      if (dur) {
        const vp = p <= START_BUF ? 0 : (p - START_BUF) / (1 - START_BUF);
        targetTimeRef.current = Math.min(dur - 0.02, Math.max(0, vp * dur));
      }

      milestones.forEach((_, i) => {
        const el = overlayRefs.current[i];
        const dot = dotRefs.current[i];

        const winStart = i / N;
        const winEnd = (i + 1) / N;
        const fadeInEnd = winStart + CH_FADE;
        const fadeOutStart = winEnd - CH_FADE;
        const isFirst = i === 0;
        const isLast = i === LAST_IDX;
        const effectiveEnd = isLast ? (1 - END_BUF + 0.001) : winEnd;

        let opacity = 0;
        if (p >= winStart && p < effectiveEnd) {
          if (!isFirst && p < fadeInEnd) {
            opacity = (p - winStart) / CH_FADE;
          } else if (!isLast && p > fadeOutStart) {
            opacity = (winEnd - p) / CH_FADE;
          } else {
            opacity = 1;
          }
        }
        if (isLast && p >= (1 - END_BUF)) {
          opacity = Math.max(0, (1 - p) / END_BUF);
        }

        const o = Math.max(0, Math.min(1, opacity));
        if (el) {
          el.style.opacity = String(o);
          // Changed translate curve slightly for the larger card
          el.style.transform = `translateY(${(1 - o) * 24}px) scale(${1 - (1 - o) * 0.02})`;
        }
        if (dot) {
          const active = p >= winStart && p < effectiveEnd;
          const dotO = isLast && p >= (1 - END_BUF)
            ? Math.max(0.3, (1 - p) / END_BUF)
            : active ? 1 : 0.7;
          dot.style.opacity = String(dotO);
          dot.style.transform = active ? "scaleY(1)" : "scaleY(0.5)";
          dot.style.backgroundColor = active ? "hsla(107, 100%, 19%, 1.00)" : "rgba(255, 255, 255, 1)";
        }
      });
    };

    update(0);

    const st = ScrollTrigger.create({
      trigger: outer,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => update(self.progress),
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={outerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={journeyVideo}
          muted
          playsInline
          preload="auto"
          className="absolute opacity-0 pointer-events-none"
          style={{ width: "1px", height: "1px", visibility: "hidden" }}
        />

        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", filter: "brightness(0.6)" }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(4,14,15,0.99) 0%, rgba(4,14,15,0.75) 45%, rgba(4,14,15,0.2) 75%, transparent 100%)",
          }}
        />

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-6 md:px-10 md:py-7 z-10">
          <span className="ml-0 md:ml-2 text-xs md:text-sm font-medium tracking-[0.24em] uppercase text-primary">Our Journey</span>
          <span className="ml-0 md:ml-2 text-[10px] md:text-sm font-medium tracking-[0.2em] uppercase text-white/80">Scroll to explore</span>
        </div>

        {milestones.map((m, i) => (
  <div
    key={i}
    ref={(el) => { (overlayRefs.current[i] as HTMLDivElement | null) = el; }}
    className="absolute top-1/3 -translate-y-1/2 md:top-[30%] left-[5%] md:left-[8%] z-10"
    style={{
      // Decreased max width from 600px to 450px
      width: "min(450px, 80vw)",
      opacity: i === 0 ? 1 : 0,
      transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
      willChange: "opacity, transform",
    }}
  >
    {/* Glass Card */}
    <div 
      className="flex flex-col rounded-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(20,20,22,0.85) 0%, rgba(10,10,12,0.65) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Card Header - Reduced padding and font sizes */}
      <div className="flex items-baseline gap-3 px-4 pt-5 pb-3 md:px-6 md:pt-6 md:pb-4 border-b border-white/5">
        <h2 
          className="font-montserrat font-bold text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }} // Reduced from 4.5rem
        >
          {m.year}
        </h2>
        <h3 
          className="font-montserrat font-semibold text-primary/90"
          style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }} // Reduced from 2rem
        >
          {m.title}
        </h3>
      </div>

      {/* Card Body - Targets all children to decrease their size globally */}
      <div className="px-4 pb-5 pt-3 md:px-6 md:pb-6 md:pt-3 [&_p]:text-[11px] sm:[&_p]:text-xs md:[&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3 [&_img]:h-28 md:[&_img]:h-36 [&_div]:space-y-1 md:[&_div]:space-y-2 [&_div]:p-2 md:[&_div]:p-3">
        {m.content}
      </div>
    </div>
  </div>
))}

        {/* Right progress indicator */}
        <div className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 md:gap-4 z-10">
          {milestones.map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1 md:gap-[6px]">
              <div
                ref={(el) => { (dotRefs.current[i] as HTMLDivElement | null) = el; }}
                className="w-[2px] h-6 md:h-9 rounded-sm transition-all duration-200"
                style={{ backgroundColor: "rgba(255, 255, 255, 1)", transformOrigin: "center", opacity: 1 }}
              />
              <span
                className="text-[8px] font-semibold tracking-[0.15em] uppercase text-white select-none"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}