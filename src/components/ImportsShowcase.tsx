import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Assets — existing
import productStretcher from "@/assets/product-stretcher-new.jpg";
import productBlood from "@/assets/product-blood.jpg";
import productMedicalDevices from "@/assets/product-medical-devices.jpg";
import stretcherVideo from "@/assets/videos-import/8943558-hd_1920_1080_25fps.mp4";
import glucoseVideo from "@/assets/videos-import/VivaChek.mp4";
import diagnosticVideo from "@/assets/videos-import/6234582-uhd_3840_2160_25fps.mp4";

// Assets — new products
import imgGlucose from "@/assets/import-imgs/dh20.png";
import imgViva from "@/assets/import-imgs/viva.png";
import imgLcd from "@/assets/import-imgs/lcd.png";
import imgVildamic from "@/assets/import-imgs/vildamic.png";
import imgFacemask from "@/assets/import-imgs/facemask.png";

gsap.registerPlugin(ScrollTrigger);

const importProducts = [
  {
    id: "stretcher",
    title: "Stretcher Trolley",
    badge: "Emergency Equipment",
    description: "Emergency medical services ambulance stretchers",
    image: productStretcher,
    video: stretcherVideo,
    specs: [],
  },
  {
    id: "glucose-monitor",
    title: "Blood Glucose Monitor",
    badge: "Diagnostic Device",
    description: "Viva Check precision blood glucose monitoring system",
    image: productBlood,
    video: glucoseVideo,
    specs: [],
  },
  {
    id: "diagnostic",
    title: "Diagnostic Devices",
    badge: "Clinical Equipment",
    description: "Essential clinical equipment meeting WHO standards",
    image: productMedicalDevices,
    video: diagnosticVideo,
    specs: [],
  },
  {
    id: "glucose-system",
    title: "Glucose Testing System",
    badge: "Diagnostic Device",
    description: "Easy and accurate blood glucose monitoring with 5-second test time.",
    image: imgGlucose,
    video: glucoseVideo,
    specs: [
      "5-second test time",
      "Only 0.5µL blood required",
      "900 memories with time & date",
      "No coding required",
      "Hypo & Ketone warning",
    ],
  },
  {
    id: "viva",
    title: "VivaDiag Hemoglobin System",
    badge: "Hematology Device",
    description: "High-precision hemoglobin & hematocrit analyzer supporting capillary and venous blood.",
    image: imgViva,
    video: diagnosticVideo,
    specs: [
      "Range: 3 g/dL – 25.6 g/dL",
      "Hematocrit: 9% – 76.8%",
      "1,000 records with date/time",
      "10-second test, 10µL blood",
      "Capillary & venous whole blood",
    ],
  },
  {
    id: "cbc",
    title: "CBC Hematology Analyzer",
    badge: "Hematology Analyzer",
    description: "Full CBC with 3-part diff, 21+8 parameters, WiFi LIS connectivity and 200k record storage.",
    image: imgFacemask,
    video: diagnosticVideo,
    specs: [
      "21+8 parameters, 3 histograms",
      "8-inch TFT touch screen",
      "30 tests/hr, only 9µL sample",
      "200,000 records with histograms",
      "Bi-directional WiFi LIS",
      "Open reagent system",
    ],
  },
  {
    id: "lcd",
    title: "LCD Pressure Steam Sterilizer",
    badge: "Sterilization Equipment",
    description: "Fully automated vertical autoclave with LCD display, safety lock, and auto over-pressure protection.",
    image: imgLcd,
    video: stretcherVideo,
    specs: [
      "Fully stainless steel structure",
      "Auto steam discharge after sterilization",
      "Over temp & pressure auto-protection",
      "Door safety lock system",
      "Two sterilizing baskets",
      "Optional drying system",
    ],
  },
  {
    id: "vildamic",
    title: "Vildagliptin + Metformin",
    badge: "Pharmaceutical",
    description: "Combination antidiabetic in three doses — DPP-4 inhibitor + biguanide for type 2 diabetes.",
    image: imgVildamic,
    video: stretcherVideo,
    specs: [
      "Available in three dose combinations",
      "Vildagliptin: DPP-4 inhibitor",
      "Metformin: Biguanide antidiabetic",
      "Dual mechanism of action",
      "Under Droga Pharma umbrella",
    ],
  },
];

const ImportsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".import-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      itemsRefs.current.forEach((item) => {
        if (!item) return;
        const video = item.querySelector(".hover-video") as HTMLVideoElement | null;
        const image = item.querySelector(".product-image") as HTMLElement | null;

        item.addEventListener("mouseenter", () => {
          if (video) gsap.to(video, { opacity: 1, duration: 0 });
          if (image) gsap.to(image, { scale: 1.03, opacity: 0, duration: 0.3 });
        });

        item.addEventListener("mouseleave", () => {
          if (video) gsap.to(video, { opacity: 0, duration: 0 });
          if (image) gsap.to(image, { scale: 1, opacity: 1, duration: 0.3 });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-full bg-[#fdfaf6] flex flex-col overflow-hidden"
      ref={containerRef}
    >
      <div className="container pt-10 pb-4 flex flex-col">

        {/* Header */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end flex-shrink-0">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#1a202c] md:text-3xl">
              Our <span className="text-primary">Imports</span>
            </h2>
            <p className="mt-1 max-w-lg font-body text-[13px] text-[#4a5568]">
              High-quality medical equipment and pharmaceuticals strengthening Ethiopia's healthcare infrastructure.
            </p>
          </div>
          <Link
            to="/import-products"
            className="group flex items-center gap-2 rounded-full border border-[#cbd5e0] px-5 py-4 font-body text-[10px] font-bold uppercase tracking-widest text-[#2d3748] transition-colors hover:bg-[#289928] hover:text-white"
          >
            Explore All
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 mb-8 -mx-8 md:mx-0">
          {importProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (itemsRefs.current[index] = el)}
              className="import-item group relative flex flex-col cursor-pointer overflow-hidden bg-white border border-[#f0ede8]"
            >
              {/* Visual — video bg + product image on top */}
              <div className="relative w-full overflow-hidden h-80">
                {/* Video — autoplay at opacity 0, fades in on hover */}
                <video
                  className="hover-video absolute inset-0 z-0 h-full w-full object-cover opacity-0"
                  src={product.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {/* Product image — mix-blend-multiply so it blends with video */}
                <div className="absolute inset-0 z-10 flex items-center justify-center p-10 mix-blend-multiply">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Text — instant green on hover */}
              <div className="flex flex-col text-left p-7 transition-colors duration-0 group-hover:bg-[#289928]">
                <span className="font-body text-[10px] font-bold text-primary uppercase tracking-widest group-hover:text-white transition-colors duration-0">
                  {product.badge}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-wide text-[#1a202c] group-hover:text-white transition-colors duration-0">
                  {product.title}
                </h3>
                <p className="mt-2 font-body text-[12px] leading-relaxed text-[#718096] group-hover:text-white/90 transition-colors duration-0">
                  {product.description}
                </p>
                {product.specs.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {product.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 rounded-full bg-primary group-hover:bg-white shrink-0 transition-colors duration-0" />
                        <span className="font-body text-[11px] text-[#4a5568] group-hover:text-white/90 transition-colors duration-0">{spec}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImportsShowcase;
