import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Product images
import blood from "@/assets/import-imgs/product-blood.jpg";
import blood2 from "@/assets/import-imgs/blood.jpg";
import imgDh20Photo from "@/assets/import-imgs/dh201.jpg";
import imgDh20 from "@/assets/import-imgs/dh20.png";
import imgHemoglobin from "@/assets/import-imgs/hemoglobin1.jpg";
import imgViva from "@/assets/import-imgs/viva.png";
import imgFacemask from "@/assets/import-imgs/facemask.png";
import imgFacemask1 from "@/assets/import-imgs/facemask2.png";
import imgLcd from "@/assets/import-imgs/lcd.png";
import imgVildamic from "@/assets/import-imgs/vildamic.png";

gsap.registerPlugin(ScrollTrigger);

const importProducts = [
  {
    id: "glucose-system",
    title: "Glucose Testing System",
    badge: "Diagnostic Device",
    description: "Easy and accurate blood glucose monitoring with 5-second test time.",
    image: blood,       // default: real photo
    hoverImage: blood2,       // hover: device PNG
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
    image: imgViva,      // default: real photo
    hoverImage: imgHemoglobin,       // hover: device PNG
    specs: [
      "Range: 3 g/dL – 25.6 g/dL",
      "Hematocrit: 9% – 76.8%",
      "1,000 records with date/time",
      "10-second test, 10µL blood",
      "Capillary & venous whole blood",
      "Reference range per age group",
    ],
  },
  {
    id: "cbc",
    title: "CBC Hematology Analyzer",
    badge: "Hematology Analyzer",
    description: "Full CBC with 3-part diff, 21+8 parameters, WiFi LIS connectivity and 200k record storage.",
    image: imgDh20Photo,
    hoverImage: imgDh20,
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
    hoverImage: imgLcd,
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
    hoverImage: imgVildamic,
    specs: [
      "Available in three dose combinations",
      "Vildagliptin: DPP-4 inhibitor",
      "Metformin: Biguanide antidiabetic",
      "Dual mechanism of action",
      "Under Droga Pharma umbrella",
    ],
  },
  {
    id: "Facemask",
    title: "Disposable Facemask",
    badge: "Protective Equipment",
    description: "3-ply disposable surgical facemasks offering reliable filtration and breathable comfort — designed for clinical, laboratory, and general healthcare settings.",
    image: imgFacemask,
    hoverImage: imgFacemask1,
    specs: [
      "3-ply non-woven construction",
      "Fluid-resistant outer layer",
      "Soft inner layer for comfort",
      "Adjustable nose wire",
      "Latex-free ear loops",
      "Individually or bulk packaged",
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
        const defaultImg = item.querySelector(".img-default") as HTMLElement | null;
        const hoverImg = item.querySelector(".img-hover") as HTMLElement | null;

        item.addEventListener("mouseenter", () => {
          gsap.to(defaultImg, { opacity: 0, scale: 1.05, duration: 0.3, ease: "power2.out" });
          gsap.to(hoverImg,   { opacity: 1, scale: 1,    duration: 0.3, ease: "power2.out" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(defaultImg, { opacity: 1, scale: 1,    duration: 0.3, ease: "power2.out" });
          gsap.to(hoverImg,   { opacity: 0, scale: 1.05, duration: 0.3, ease: "power2.out" });
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
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 mb-8 -mx-8 md:mx-0 items-stretch">
          {importProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (itemsRefs.current[index] = el)}
              className="import-item group relative flex flex-col cursor-pointer overflow-hidden bg-white border border-[#f0ede8] h-full"
            >
              {/* Image area — default + hover image stacked */}
              <div className="relative w-full overflow-hidden h-80 bg-[#f7f7f5]">
                {/* Default image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-default absolute inset-0 w-full h-full object-contain p-6"
                />
                {/* Hover image — starts hidden */}
                <img
                  src={product.hoverImage}
                  alt={product.title}
                  className="img-hover absolute inset-0 w-full h-full object-contain p-8 opacity-0 scale-105"
                  style={{ background: "#f7f7f5" }}
                />
              </div>

              {/* Text — instant green on hover */}
              <div className="flex flex-col flex-grow text-left p-7 transition-colors duration-0 group-hover:bg-[#289928]">
                <span className="font-body text-[10px] font-bold text-primary uppercase tracking-widest group-hover:text-white transition-colors duration-0">
                  {product.badge}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-wide text-[#1a202c] group-hover:text-white transition-colors duration-0">
                  {product.title}
                </h3>
                <p className="mt-2 font-body text-[12px] leading-relaxed text-[#718096] group-hover:text-white/90 transition-colors duration-0">
                  {product.description}
                </p>
                {product.specs && product.specs.length > 0 && (
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
