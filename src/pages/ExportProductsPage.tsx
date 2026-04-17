import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf, Award, Globe, TrendingUp, Coffee, Droplets, Bean } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Timeline } from "@/components/ui/timeline";
import productCoffeeGreen from "@/assets/product-coffee-green.jpg";
import productSesame from "@/assets/product-sesame.jpg";
import productNigerSeeds from "@/assets/product-niger-seeds.jpg";
import productKidney from "@/assets/product-kidney.png";
import productChickpea from "@/assets/product-chickpea.jpg";
import productMungBean from "@/assets/product-mung-bean.jpg";
import productHaricot from "@/assets/product-haricot.jpg";
import productSpices from "@/assets/product-spices.png";
import productOilseedOrig from "@/assets/product-oilseed-orig.png";

const exportProducts = [
  {
    title: "Green Coffee Beans",
    description: "Premium Ethiopian Arabica green coffee cherries — the birthplace of coffee. We export washed and natural processed green beans from Yirgacheffe, Sidamo, Jimma, and Harar regions known for their complex, fruity, and floral flavor profiles.",
    image: productCoffeeGreen,
    featured: true,
    icon: Coffee,
    specs: ["Arabica Variety", "Grade 1-5", "Washed & Natural"],
  },
  {
    title: "Sesame Seeds",
    description: "Premium Humera and Wollega sesame seeds, valued worldwide for their rich oil content (50-55%) and nutty flavor. Available in white, brown, and mixed varieties for food processing and oil extraction.",
    image: productSesame,
    featured: true,
    icon: Droplets,
    specs: ["50-55% Oil Content", "Humera & Wollega", "White & Brown"],
  },
  {
    title: "Niger Seeds",
    description: "High-quality Ethiopian Niger seeds (Noug) — a premium oil seed crop with 38-43% oil content. Widely used in bird feed markets and edible oil production across Europe and North America.",
    image: productNigerSeeds,
    featured: false,
    icon: Droplets,
    specs: ["38-43% Oil Content", "Bird Feed Grade", "Edible Oil Grade"],
  },
  {
    title: "Red Kidney Beans",
    description: "Nutrient-rich Ethiopian red kidney beans — packed with protein and fiber. Perfect for international food markets, canning industries, and wholesale distribution.",
    image: productKidney,
    featured: false,
    icon: Bean,
    specs: ["High Protein", "Export Grade", "Machine Cleaned"],
  },
  {
    title: "Chickpea (Desi & Kabuli)",
    description: "Ethiopian chickpeas available in both Desi (smaller, darker) and Kabuli (larger, lighter) varieties. A staple legume exported to Middle East, South Asia, and European markets.",
    image: productChickpea,
    featured: false,
    icon: Bean,
    specs: ["Desi & Kabuli", "8-12mm Size", "High Protein"],
  },
  {
    title: "Green Mung Bean",
    description: "Premium Ethiopian green mung beans — versatile legumes used in Asian cuisine, sprouting, and food processing. Consistently high germination rate and clean processing.",
    image: productMungBean,
    featured: false,
    icon: Bean,
    specs: ["High Germination", "3-4mm Size", "Machine Sorted"],
  },
  {
    title: "Haricot Beans",
    description: "White haricot beans from Ethiopia's fertile lands — exported for canning, baked beans production, and wholesale food markets worldwide. Available in various grades.",
    image: productHaricot,
    featured: false,
    icon: Bean,
    specs: ["Canning Grade", "6-8mm Size", "Low Moisture"],
  },
  {
    title: "Spices & Herbs",
    description: "Authentic Ethiopian spices including turmeric, ginger, fenugreek, and black cumin — the foundation of Ethiopian cuisine, now available for global export.",
    image: productSpices,
    featured: false,
    icon: Leaf,
    specs: ["Organic Available", "Sun Dried", "Hand Sorted"],
  },
  {
    title: "Oil Seeds Mix",
    description: "Various Ethiopian oil seeds including linseed (flaxseed), sunflower seeds, and soybean — sourced directly from Ethiopian cooperatives for global markets.",
    image: productOilseedOrig,
    featured: false,
    icon: Droplets,
    specs: ["Multiple Varieties", "High Oil Content", "Direct Source"],
  },
];

const whyChooseUs = [
  { icon: Leaf, title: "Direct Sourcing", description: "We work directly with Ethiopian farmers and cooperatives, eliminating middlemen and ensuring fair prices." },
  { icon: Award, title: "Quality Certified", description: "ISO-certified processing facilities with in-house Coffee Laboratory for cupping, grading, and comprehensive quality testing." },
  { icon: Globe, title: "Global Reach", description: "Exporting to buyers across Asia, Europe, Middle East, and North America with reliable year-round supply." },
  { icon: TrendingUp, title: "Consistent Supply", description: "10,000+ tons exported annually with reliable supply chain management and full traceability from farm to port." },
];

const timelineData = [
  { title: "Sourcing", content: <div><p className="font-body text-base text-muted-foreground mb-3">We partner directly with Ethiopian farmers and cooperatives across the country's best-producing regions — Yirgacheffe, Sidamo, Jimma, Harar, Humera, and Wollega.</p><ul className="space-y-1 font-body text-sm text-muted-foreground"><li>✅ Direct farmer relationships</li><li>✅ Fair trade pricing</li><li>✅ Regional quality mapping</li></ul></div> },
  { title: "Processing", content: <div><p className="font-body text-base text-muted-foreground mb-3">State-of-the-art processing facilities clean, grade, and prepare products to strict international export standards with ISO-certified quality control and full traceability.</p><ul className="space-y-1 font-body text-sm text-muted-foreground"><li>✅ Machine cleaning & sorting</li><li>✅ Moisture control</li><li>✅ ISO-certified facilities</li></ul></div> },
  { title: "Quality Testing", content: <div><p className="font-body text-base text-muted-foreground mb-3">Every batch undergoes rigorous testing in our Coffee Laboratory by certified Q-graders. We test for moisture, defects, cupping scores, and flavor profile to ensure specialty-grade quality.</p><ul className="space-y-1 font-body text-sm text-muted-foreground"><li>✅ Coffee cupping & grading by Q-graders</li><li>✅ Moisture & defect analysis</li><li>✅ Certificate of quality & cupping scores</li></ul></div> },
  { title: "Export & Delivery", content: <div><p className="font-body text-base text-muted-foreground mb-3">Products are professionally packaged in GrainPro & jute bags and shipped via our reliable logistics network, ensuring freshness and on-time delivery worldwide.</p><ul className="space-y-1 font-body text-sm text-muted-foreground"><li>✅ GrainPro & jute bag packaging</li><li>✅ Container shipping to all major ports</li><li>✅ Full export documentation & certificates</li></ul></div> },
];

const ProductCard = ({ product }: { product: typeof exportProducts[0] }) => {
  const Icon = product.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-background shadow-sm transition-shadow duration-500 hover:shadow-xl ${
        product.featured ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <GlowingEffect spread={40} glow disabled={false} blur={8} />
      <div className={`relative overflow-hidden ${product.featured ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
        <motion.img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
              <Icon className="h-3.5 w-3.5 text-background" />
            </div>
          </div>
          <h3 className="mb-1 font-display text-xl font-bold text-background">{product.title}</h3>
          <p className="font-body text-sm text-background/80 line-clamp-2 opacity-0 transition-all duration-400 group-hover:opacity-100">{product.description}</p>
          {product.specs && (
            <div className="mt-2 flex flex-wrap gap-1.5 opacity-0 transition-all duration-400 group-hover:opacity-100">
              {product.specs.map((spec) => (
                <span key={spec} className="rounded-full bg-background/20 px-2 py-0.5 font-body text-[10px] text-background/90 backdrop-blur-sm">{spec}</span>
              ))}
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:bg-primary">
          <ArrowUpRight className="h-5 w-5 text-background" />
        </div>
      </div>
    </motion.div>
  );
};

const ExportProductsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        badge="Export Products"
        title={<>Premium Ethiopian <span className="text-gradient">Export</span> Products</>}
        description="From the birthplace of coffee to the world — discover our range of Ethiopian green coffee beans, sesame seeds, Niger seeds, chickpea, haricot beans, mung bean, red kidney bean, and spices."
      />

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">Why EMA</span>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">Why Choose <span className="text-gradient">Our Products</span></h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg"
                >
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </motion.div>
                  <h3 className="mb-2 font-display text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="flex items-center gap-3 font-display text-3xl font-bold text-foreground">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">E</span>
              Our Export Range
            </h2>
            <p className="mt-2 max-w-2xl font-body text-muted-foreground">Premium Ethiopian green coffee beans, sesame seeds, Niger seeds, chickpea, haricot beans, green mung bean, red kidney bean, spices, and oil seeds — sourced directly from Ethiopian cooperatives.</p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {exportProducts.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Export Journey Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">From Farm to World</span>
            <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">Our Export <span className="text-gradient">Process</span></h2>
          </motion.div>
          <Timeline data={timelineData} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExportProductsPage;
