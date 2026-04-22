import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Assets
import productStretcher from "@/assets/product-stretcher-new.jpg";
import productBlood from "@/assets/product-blood.jpg";
import productMedicalDevices from "@/assets/product-medical-devices.jpg";
import stretcherVideo from "@/assets/videos-import/8943558-hd_1920_1080_25fps.mp4";
import glucoseVideo from "@/assets/videos-import/VivaChek.mp4";
import diagnosticVideo from "@/assets/videos-import/6234582-uhd_3840_2160_25fps.mp4";

gsap.registerPlugin(ScrollTrigger);

const importProducts = [
  {
    id: "stretcher",
    title: "Stretcher Trolley",
    price: "Inquire",
    description: "Emergency medical services ambulance stretchers",
    image: productStretcher,
    video: stretcherVideo,
  },
  {
    id: "glucose",
    title: "Blood Glucose Monitor",
    price: "Inquire",
    description: "Viva Check precision blood glucose monitoring system",
    image: productBlood,
    video: glucoseVideo,
  },
  {
    id: "diagnostic",
    title: "Diagnostic Devices",
    price: "Inquire",
    description: "Essential clinical equipment meeting WHO standards",
    image: productMedicalDevices,
    video: diagnosticVideo,
  },
];

const ImportsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo(
        ".import-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );

      itemsRefs.current.forEach((item) => {
        if (!item) return;
        const video = item.querySelector(".hover-video");
        const image = item.querySelector(".product-image");

        item.addEventListener("mouseenter", () => {
          // INSTANT VIDEO: Duration set to 0
          gsap.to(video, { opacity: 1, duration: 0 });
          gsap.to(image, { scale: 1.03, opacity: 0, duration: 0.3 });
        });
        
        item.addEventListener("mouseleave", () => {
          gsap.to(video, { opacity: 0, duration: 0 });
          gsap.to(image, { scale: 1, opacity: 1, duration: 0.3 });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="relative w-full min-h-screen md:h-screen bg-[#fdfaf6] flex flex-col overflow-hidden" 
      ref={containerRef}
    >
      <div className="container pt-10 pb-4 flex flex-col h-full">
        
        {/* Header */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end flex-shrink-0">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[#1a202c] md:text-3xl">
              Our <span className="text-primary">Imports</span>
            </h2>
            <p className="mt-1 max-w-lg font-body text-[13px] text-[#4a5568]">
              High-quality medical equipment strengthening Ethiopia's healthcare infrastructure.
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

        {/* Grid - GAPS REMOVED (gap-0) */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 flex-grow mb-8 -mx-8 md:mx-0">
          {importProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (itemsRefs.current[index] = el)}
              className="import-item group relative flex flex-col cursor-pointer transition-all overflow-hidden bg-white"
            >
              {/* Visual Container */}
              <div className="relative flex-grow w-full overflow-hidden aspect-[4/3] md:aspect-auto">
                <video
                  className="hover-video absolute inset-0 z-0 h-full w-full object-cover opacity-0"
                  src={product.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                
                <div className="absolute inset-0 z-10 flex items-center justify-center p-12 mix-blend-multiply">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Text Container - Instant Green BG on Hover */}
              {/* Use bg-[#f0fff4] for a visible green, or bg-[#FDFAF6] as requested */}
              <div className="flex flex-col text-left p-6 transition-colors duration-0 group-hover:bg-[#289928] group-hover:text-white">
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-[#1a202c] group-hover:text-white">
                  {product.title}
                </h3>
                <span className="mt-0.5 font-body text-[10px] font-bold text-primary uppercase tracking-widest group-hover:text-white">
                  {product.price}
                </span>
                <p className="mt-2 font-body text-[11px] leading-relaxed text-[#718096] max-w-xs group-hover:text-white">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImportsShowcase;