import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight, Coffee, Leaf, Bean, Sprout, Droplet } from "lucide-react";

import greenCoffee from "@/assets/export-imgs/coffee1.png";
import sesameSeeds from "@/assets/export-imgs/sesame-seeds.png";
import kidneyBean from "@/assets/export-imgs/redbeans.png";
import spicesHerbs from "@/assets/export-imgs/spices-herbs.png";

import bgCoffee from "@/assets/product-coffee.jpg";
import bgSesame from "@/assets/product-sesame.jpg";
import bgKidney from "@/assets/product-kidney.png";
import bgSpices from "@/assets/product-spices.png";
import gumOlibanum from "@/assets/export-imgs/gum3.png";
import bgGum from "@/assets/export-imgs/gum3.png";

/* ─── types ───────────────────────────────────────────────── */
interface Product {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  accentLight: string;
  filterIcon: React.ElementType;
  image?: string;
  bgImage?: any;
  description: string;
  longDescription?: string;
  specs: string[];
  qualitySpecs?: string[];
  varieties?: { name: string; description: string }[];
  origin: string;
}

/* ─── data ────────────────────────────────────────────────── */
const products: Product[] = [
  {
    id: "coffee",
    title: "Coffee",
    subtitle: "Premium Ethiopian Coffee",
    color: "#3d3522",
    accentLight: "#c8b87a",
    filterIcon: Coffee,
    image: greenCoffee,
    bgImage: bgCoffee,
    description: "Experience the Essence of Ethiopia with EMA Coffee. We share our latest Arabica and specialty coffee streams with global partners.",
    longDescription: "Our current exports feature the diverse genetic profiles unique to Ethiopia, sourced directly from the country's most renowned regions.",
    specs: ["Arabica Variety", "Washed & Natural"],
    qualitySpecs: ["Washed & Natural Process", "Grade 1–5 Available", "Direct Farmer Sourcing"],
    varieties: [
      { name: "Yirgacheffe", description: "Processing Types: Natural, washed. Growing Altitude: 5,900-6,250 feet (1,800-1,900 meters)." },
      { name: "Lekempti", description: "Processing Types: Natural, washed. Growing Altitude: 5,575-7,225 feet (1,900-2,100 meters)." },
      { name: "Guji", description: "Processing Types: Natural, washed. Growing Altitude: 6,233-6,561 feet (1,900-2,000 meters)." },
      { name: "Djimmah", description: "Processing Types: Natural, washed. Growing Altitude: 4,400 to 6,000 feet (1,400-1800 meters)." },
      { name: "Sidamo", description: "Processing Types: Natural, washed. Growing Altitude: 4,900-7,225 feet (1,500-2,200 meters)." },
      { name: "Limu", description: "Processing Types: Natural, washed. Growing Altitude: 3,600-6,225 feet (1,100-1,900 meters)." },
    ],
    origin: "Yirgacheffe, Sidamo, Jimma, Guji, Lekempti",
  },
  {
    id: "oilseeds",
    title: "Oilseeds",
    subtitle: "Premium Oilseeds",
    color: "#4a3800",
    accentLight: "#f0c040",
    filterIcon: Leaf,
    image: sesameSeeds,
    bgImage: bgSesame,
    description: "High-quality Ethiopian oil seeds including sesame, niger seeds, and soybeans.",
    longDescription: "Our oil seed range covers multiple varieties sourced directly from Ethiopian farming cooperatives. High oil content and organic options available for health food and industrial markets.",
    specs: ["Multiple Varieties", "High Oil"],
    qualitySpecs: ["Multiple Varieties", "High Oil Content", "Direct Cooperative Source", "Organic Available", "Machine Cleaned"],
    varieties: [
      { name: "Sesame Seed", description: "Humera type and Gonder Type." },
      { name: "Black Cumin seed", description: "Premium Ethiopian black cumin seed." },
      { name: "Niger Seed", description: "High-quality Ethiopian Niger seeds (Noug)." },
      { name: "Soybeans", description: "Ethiopian soybeans, sourced directly from farming cooperatives." },
    ],
    origin: "Humera, Wollega, Central & Western Ethiopia",
  },
  {
    id: "pulses",
    title: "Pulses",
    subtitle: "Ethiopian Pulses & Beans",
    color: "#3e0c0c",
    accentLight: "#e07070",
    filterIcon: Bean,
    image: kidneyBean,
    bgImage: bgKidney,
    description: "Proudly sourced from Ethiopia's fertile regions, our pulses and beans are packed with protein and fiber, ideal for global markets.",
    longDescription: "We export multiple pulse varieties including chickpeas, kidney beans, and pea beans. Carefully sourced and processed to meet quality standards.",
    specs: ["High Protein", "Export Grade", "Machine Cleaned"],
    qualitySpecs: ["Sortex & Hand Picked", "Low Moisture", "Free from Live Weevils & Weevil Holes", "Fit for human consumption"],
    varieties: [
      { name: "Chickpeas", description: "Kabuli Chickpeas and Dessie chickpeas." },
      { name: "Red Kidney Beans", description: "Deep red color, rich taste, and high nutritional value." },
      { name: "White Pea beans", description: "Small, creamy white beans with a mild, delicate flavor." },
      { name: "Light Speckled kidney beans", description: "Light cream color with reddish-brown speckles." },
      { name: "Red Speckled kidney beans", description: "Nutritious and highly demanded globally." },
      { name: "Green Mung beans", description: "Premium Ethiopian green mung beans." },
      { name: "Pumpkin seed", description: "High quality Ethiopian pumpkin seeds." },
    ],
    origin: "Rift Valley, Southern Ethiopia",
  },
  {
    id: "spices-herbs",
    title: "Spices & Herbs",
    subtitle: "Authentic Ethiopian Spices",
    color: "#3d2400",
    accentLight: "#e8922a",
    filterIcon: Sprout,
    image: spicesHerbs,
    bgImage: bgSpices,
    description: "Authentic Ethiopian spices exported globally for culinary, medicinal, and industrial applications.",
    longDescription: "Our spice range covers some of Ethiopia's most prized exports, valued for their high content of essential oils, antioxidants, and natural bioactive compounds.",
    specs: ["Organic Available", "Sun Dried", "Hand Sorted"],
    qualitySpecs: ["Hand Sorted & Sun Dried", "Free from any kind of Infestation"],
    varieties: [
      { name: "Turmeric", description: "Bulb type and finger type." },
    ],
    origin: "Various Regions, Ethiopia",
  },
  {
    id: "gum",
    title: "Gum",
    subtitle: "Gum Olibanum",
    color: "#2d1a08",
    accentLight: "#c8905a",
    filterIcon: Droplet,
    image: gumOlibanum,
    bgImage: bgGum,
    description: "Gum Olibanum is an aromatic gum resin extracted from trees, exported for ancient and modern uses.",
    longDescription: "Gum Olibanum is the ancient and proper name for Frankincense, an aromatic gum resin extracted from trees of the genus Boswellia, primarily found in arid regions like Ethiopia.",
    specs: ["Export Grade"],
    origin: "Ethiopia",
  },
];

/* ─── typewriter component ──────────────────────────────────── */
const TypewriterText = () => {
  const words = ["Coffee", "Pulses", "Oilseeds", "Spices & Herbs", "Gum"];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentWord = words[index];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1));
        setTypingSpeed(40);
        if (text === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(400); // pause before typing new word
        }
      }, typingSpeed);
    } else {
      timeoutId = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1));
        setTypingSpeed(100);
        if (text === currentWord) {
          // Pause at the end of word before deleting
          timeoutId = setTimeout(() => setIsDeleting(true), 2000);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, index, typingSpeed]);

  return (
    <span className="text-gradient inline-flex items-center min-w-[200px]">
      {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[4px] h-[0.9em] bg-white/80 ml-2 rounded-full"
      />
    </span>
  );
};

/* ─── page component ──────────────────────────────────────── */
const ExportProductsPage = () => {
  const [activeId, setActiveId] = useState<string | null>("coffee");
  const detailRef = useRef<HTMLDivElement>(null);

  const activeProduct = products.find((p) => p.id === activeId) ?? null;
  const activeIndex = products.findIndex((p) => p.id === activeId);
  const prevProduct = activeIndex > 0 ? products[activeIndex - 1] : null;
  const nextProduct = activeIndex !== -1 && activeIndex < products.length - 1 ? products[activeIndex + 1] : null;

  const handleFilterClick = (id: string) => {
    if (activeId === id) {
      setActiveId(null);
      return;
    }
    setActiveId(id);
    // Small delay so the panel can mount before we scroll
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-foreground">
      <Navbar />

      <PageHero
        badge="Export Products"
        title={<>Premium Ethiopian <TypewriterText /></>}
        description="Connecting Ethiopia's finest agricultural products—from organic coffee to rich oilseeds and aromatic spices—to global markets."
      />

      {/* ── FILTER BAR ── */}
      <section className="relative z-20 bg-white py-8">
        {/* Subtle top-edge glow */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)" }}
        />

        <div className="container mx-auto px-6">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className="inline-block font-body text-xs tracking-[0.25em] uppercase text-black/40 mb-3">
              Browse by category
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#111]">
              Our Export <span className="text-gradient">Products</span>
            </h2>
          </motion.div>

          {/* Filter chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {products.map((p, i) => {
              const isActive = activeId === p.id;

              return (
                <motion.button
                  key={p.id}
                  id={`filter-${p.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onClick={() => handleFilterClick(p.id)}
                  className={`relative group flex flex-col items-center gap-2 px-6 py-4 rounded-xl border transition-all duration-500 focus:outline-none overflow-hidden ${
                    isActive ? "bg-primary border-transparent shadow-[0_8px_30px_-8px_hsl(120,61%,37%,0.5)]" : "bg-white border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
                  }`}
                >
                  {/* Glow orb on hover/active */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: isActive
                        ? `radial-gradient(circle at 50% 0%, ${p.accentLight}18 0%, transparent 70%)`
                        : `radial-gradient(circle at 50% 0%, ${p.accentLight}22 0%, transparent 70%)`,
                    }}
                  />

                  {/* Water fill animation on hover */}
                  {!isActive && (
                    <div className="absolute inset-x-0 bottom-0 bg-primary h-0 group-hover:h-full transition-all duration-[600ms] ease-out z-0" />
                  )}

                  {/* Active indicator bar at top */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-full bg-white/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />

                  {/* Image Icon */}
                  <div
                    className={`relative z-10 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 overflow-hidden group-hover:border-white/40 group-hover:bg-white/10 ${
                      isActive ? "bg-white/15 border-white/30" : "bg-black/5 border-black/10"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`relative z-10 font-body text-sm font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap ${
                      isActive ? "text-white" : "text-[#222222] group-hover:text-white"
                    }`}
                  >
                    {p.title}
                  </span>

                  {/* Active dot */}
                  {isActive && (
                    <motion.div
                      layoutId="active-dot"
                      className="w-1.5 h-1.5 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRODUCT DETAIL PANEL ── */}
      <div ref={detailRef}>
        <AnimatePresence>
          {activeProduct && (
            <motion.section
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1, backgroundColor: activeProduct.color }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
              {/* BG blur */}
              {activeProduct.bgImage && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${activeProduct.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(10px) brightness(0.3)",
                    transform: "scale(1.12)",
                  }}
                />
              )}
              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 40%, transparent 25%, rgba(0,0,0,0.65) 100%)",
                }}
              />

              <div className="container relative mx-auto px-6 py-24 z-10">
                {/* Top colour accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="h-[2px] w-full mb-8 rounded-full origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${activeProduct.accentLight}, transparent)`,
                  }}
                />

                {/* Navigation Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="mb-12 flex justify-between items-center"
                >
                  {prevProduct ? (
                    <button
                      onClick={() => handleFilterClick(prevProduct.id)}
                      className="group flex items-center gap-3 px-4 sm:px-6 py-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:-translate-x-1 transition-all">
                        <ArrowLeft className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left hidden sm:block">
                        <p className="text-xs text-white/50 font-body uppercase tracking-widest mb-1">Previous</p>
                        <p className="text-sm font-bold text-white">{prevProduct.title}</p>
                      </div>
                    </button>
                  ) : <div />}

                  {nextProduct ? (
                    <button
                      onClick={() => handleFilterClick(nextProduct.id)}
                      className="group flex items-center gap-3 px-4 sm:px-6 py-2 rounded-full hover:bg-white/10 transition-colors text-right"
                    >
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-white/50 font-body uppercase tracking-widest mb-1">Next</p>
                        <p className="text-sm font-bold text-white">{nextProduct.title}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:translate-x-1 transition-all">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  ) : <div />}
                </motion.div>

                {/* Main 2-column layout */}
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
                  {/* Image card */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/20 backdrop-blur-md group"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${activeProduct.accentLight}18, transparent 65%)`,
                      }}
                    />
                    <img
                      src={activeProduct.image!}
                      alt={activeProduct.title}
                      className="relative z-10 w-full h-full object-contain p-10 filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Corner badge */}
                    <div
                      className="absolute bottom-5 left-5 px-4 py-1.5 rounded-full backdrop-blur-md font-body text-xs font-semibold border z-20"
                      style={{
                        background: `${activeProduct.accentLight}22`,
                        borderColor: `${activeProduct.accentLight}40`,
                        color: activeProduct.accentLight,
                      }}
                    >
                      {activeProduct.subtitle}
                    </div>
                  </motion.div>

                  {/* Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    <span
                      className="inline-block mb-3 font-body text-xs font-bold tracking-[0.22em] uppercase"
                      style={{ color: activeProduct.accentLight }}
                    >
                      {activeProduct.subtitle}
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                      {activeProduct.title}
                    </h2>
                    <p className="font-body text-lg leading-relaxed text-white/90 mb-3">
                      {activeProduct.description}
                    </p>
                    {activeProduct.longDescription && (
                      <p className="font-body text-base leading-relaxed text-white/60 mb-8">
                        {activeProduct.longDescription}
                      </p>
                    )}

                    {/* Spec pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeProduct.specs.map((s) => (
                        <span
                          key={s}
                          className="px-4 py-2 rounded-full font-body text-sm text-white border backdrop-blur-md transition-all duration-300 hover:scale-105"
                          style={{
                            borderColor: activeProduct.accentLight + "40",
                            background: activeProduct.accentLight + "14",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Quality specs card */}
                    {activeProduct.qualitySpecs && activeProduct.qualitySpecs.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6 rounded-2xl border bg-black/25 backdrop-blur-md p-6 shadow-inner"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      >
                        <span
                          className="font-body text-xs font-bold tracking-widest uppercase block mb-4"
                          style={{ color: activeProduct.accentLight }}
                        >
                          Quality Specifications
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                          {activeProduct.qualitySpecs.map((q) => (
                            <div key={q} className="flex items-center gap-2.5">
                              <div
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: activeProduct.accentLight }}
                              />
                              <span className="font-body text-sm text-white/85">{q}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Origin card */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mb-8 rounded-2xl border bg-black/25 backdrop-blur-md p-6 shadow-inner"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <span
                        className="font-body text-xs font-bold tracking-widest uppercase"
                        style={{ color: activeProduct.accentLight }}
                      >
                        Origin
                      </span>
                      <p className="font-body text-base text-white mt-1.5">{activeProduct.origin}</p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-black hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-lg"
                      >
                        Contact Us <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Varieties */}
                {activeProduct.varieties && activeProduct.varieties.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="mt-16 pt-12"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span
                      className="font-body text-xs font-bold tracking-[0.22em] uppercase block mb-8"
                      style={{ color: activeProduct.accentLight }}
                    >
                      Varieties
                    </span>
                    <div
                      className={`grid gap-4 ${
                        activeProduct.varieties.length > 2
                          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                          : "grid-cols-1 sm:grid-cols-2"
                      }`}
                    >
                      {activeProduct.varieties.map((v, vi) => (
                        <motion.div
                          key={v.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + vi * 0.06 }}
                          className="rounded-2xl border bg-black/25 backdrop-blur-md p-6 shadow-inner hover:bg-black/40 transition-all duration-300 group/card"
                          style={{ borderColor: "rgba(255,255,255,0.07)" }}
                        >
                          <div
                            className="w-7 h-[2px] rounded-full mb-3 transition-all duration-300 group-hover/card:w-12"
                            style={{ background: activeProduct.accentLight }}
                          />
                          <p className="font-body text-sm font-bold text-white mb-2">{v.name}</p>
                          <p className="font-body text-xs text-white/65 leading-relaxed">{v.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                </div>
              </motion.div>
            </AnimatePresence>
          </motion.section>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default ExportProductsPage;