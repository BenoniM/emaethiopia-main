import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Globe, Shield, Truck, Leaf, FlaskConical } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import consultimg from "@/assets/service-page/consult.jpg";
import qualityimg from "@/assets/service-page/quality.png";
import sourcingimg from "@/assets/service-page/source.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  { icon: Globe, title: "Global Export", description: "We export premium Ethiopian green coffee beans, sesame seeds, Niger seeds, pulses, and spices to buyers across Asia, Europe, Middle East, and North America — ensuring timely delivery and full documentation.", area: "md:[grid-area:1/1/2/7]" },
  { icon: Shield, title: "Quality Assurance", description: "Every product undergoes rigorous quality checks — from moisture and defect analysis to cupping scores — meeting the highest international food safety and export standards.", area: "md:[grid-area:1/7/2/13]" },
  { icon: Truck, title: "Logistics & Supply Chain", description: "End-to-end supply chain management including sourcing, processing, packaging in GrainPro & jute bags, container shipping, customs clearance, and on-time delivery worldwide.", area: "md:[grid-area:2/1/3/5]" },
  { icon: Leaf, title: "Sustainable Sourcing", description: "Direct partnerships with Ethiopian farmer cooperatives, promoting fair trade pricing, sustainable agriculture, and organic farming methods across all producing regions.", area: "md:[grid-area:2/5/3/9]" },
  { icon: FlaskConical, title: "Coffee Laboratory", description: "Our Coffee Laboratory Service ensures the highest quality through comprehensive cupping, grading, flavor profiling, and defect analysis with state-of-the-art equipment and expert Q-graders.", area: "md:[grid-area:2/9/3/13]" },
];

const timelineData = [
  { title: "Consultation", content: "We begin with understanding your specific requirements — product type, volume, quality specs, target market, and delivery timeline through detailed consultations.", image: consultimg },
  { title: "Sourcing & Processing", content: "Our team sources the finest products from trusted Ethiopian cooperatives and processes them in our ISO-certified facilities with full traceability.", image: qualityimg },
  { title: "Quality Testing", content: "Every batch undergoes comprehensive quality testing in our Coffee Laboratory — including cupping scores, moisture analysis, defect counts, and flavor profiling by certified Q-graders.", image: sourcingimg },
  { title: "Export & Delivery", content: "We handle all logistics, documentation, customs clearance, and container shipping to ensure smooth, on-time delivery to your destination with full export certificates.", image: "https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg" },
];

const ServicesPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const parallaxWrappers = gsap.utils.toArray<HTMLElement>(".parallax-wrap");
      parallaxWrappers.forEach((wrapper) => {
        const image = wrapper.querySelector("img");
        if (image) {
          gsap.fromTo(image, 
            { y: "-15%" }, 
            {
              y: "15%", 
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
              force3D: true
            }
          );
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        yPercent: 100,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".reveal-container",
          start: "top 80%",
        }
      });

      const parallaxWrappers = gsap.utils.toArray<HTMLElement>(".parallax-wrap");
      parallaxWrappers.forEach((wrapper) => {
        const img = wrapper.querySelector("img");
        if (!img) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
        tl.fromTo(img, 
          { yPercent: -10, skewY: 2, scale: 1.1 }, 
          { yPercent: 10, skewY: 0, scale: 1, ease: "none" }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900" ref={containerRef}>
      <Navbar />
      
      <PageHero
        badge="Our Services"
        title={<>Our{" "}<span className="text-gradient">Services</span></>}
        description="Our Coffee Laboratory Service ensures the highest quality in coffee production through comprehensive testing, flavor profiling, and expert analysis."
      />

      {/* Redesigned Services - Tightened padding */}
      <section className="relative bg-slate-50 py-12 overflow-hidden reveal-container">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-8">
              <h2>
                <span className="reveal-text block font-display text-4xl md:text-6xl font-light text-slate-900 leading-[0.9]">
                  Quality <span className="text-primary">Refined.</span>
                </span>
              </h2>
            </div>
            <div className="lg:col-span-4 border-l border-slate-200 pl-8 pb-1">
              <p className="text-slate-500 font-body text-lg leading-relaxed">
                From the highlands of Ethiopia to the global stage, we define the chemistry of excellence.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.title} 
                  className="group flex flex-col md:flex-row items-start md:items-center py-8 px-4 transition-all duration-700 hover:bg-white"
                >
                  <div className="flex items-center gap-8 md:w-1/3">
                    <span className="font-serif italic text-2xl text-slate-300 group-hover:text-primary transition-colors duration-500">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl font-medium text-slate-900">
                      {service.title}
                    </h3>
                  </div>

                  <div className="mt-4 md:mt-0 md:w-1/2">
                    <p className="text-slate-500 font-body text-base max-w-lg group-hover:text-slate-900 transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-8 md:mt-0 md:w-1/6 flex md:justify-end">
                    <div className="relative h-16 w-16 flex items-center justify-center rounded-full border border-slate-200 group-hover:rotate-[360deg] group-hover:border-primary group-hover:bg-primary transition-all duration-1000">
                      <Icon className="h-6 w-6 text-slate-400 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work - Optimized Spacing */}
      <section className="pb-10">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block font-body text-xs font-bold tracking-[0.4em] text-primary uppercase">Our Process</span>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tighter text-foreground capitalize">
              How We <span className="text-primary">Work</span>
            </h2>
          </div>

          <div className="flex flex-col gap-20"> 
            {timelineData.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2">
                  <div className="parallax-wrap relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-sm bg-slate-50 shadow-xl">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="absolute top-0 left-0 w-full h-[130%] object-cover grayscale-[40%] hover:grayscale-0 transition-[filter] duration-1000 will-change-transform"
                      style={{ willChange: "transform" }}
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                  <div className="relative">
                    <h3 className="text-3xl md:text-5xl font-display font-medium uppercase tracking-tight text-slate-900 -mt-6 md:-mt-8">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-16 h-[2px] bg-primary" />
                  <p className="text-lg leading-relaxed text-slate-500 font-body max-w-md">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;