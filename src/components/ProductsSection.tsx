import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight, Coffee, Droplets, Bean, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import productCoffeeGreen from "@/assets/product-coffee-green.jpg";
import productSesame from "@/assets/product-sesame.jpg";
import productNigerSeeds from "@/assets/product-niger-seeds.jpg";
import productKidney from "@/assets/product-kidney.png";
import productChickpea from "@/assets/product-chickpea.jpg";
import productStretcher from "@/assets/product-stretcher-new.jpg";
import productBlood from "@/assets/product-blood.jpg";

const exportProducts = [
  { title: "Green Coffee Beans", description: "Premium Ethiopian Arabica green coffee cherries — washed and natural processed from Yirgacheffe, Sidamo, Jimma, and Harar regions.", image: productCoffeeGreen, featured: true, icon: Coffee },
  { title: "Sesame Seeds", description: "Humera and Wollega sesame seeds with 50-55% oil content, available in white, brown, and mixed varieties.", image: productSesame, featured: true, icon: Droplets },
  { title: "Niger Seeds", description: "High-quality Ethiopian Niger seeds (Noug) with 38-43% oil content for oil extraction and bird feed.", image: productNigerSeeds, featured: false, icon: Droplets },
  { title: "Red Kidney Beans", description: "Nutrient-rich Ethiopian red kidney beans — packed with protein for international food markets.", image: productKidney, featured: false, icon: Bean },
  { title: "Chickpea", description: "Desi and Kabuli chickpeas exported to Middle East, South Asia, and European markets.", image: productChickpea, featured: false, icon: Bean },
];

const importProducts = [
  { title: "Stretcher Trolley", description: "Hospital-grade ambulance stretcher trolleys for emergency medical services across Ethiopia.", image: productStretcher, icon: HeartPulse },
  { title: "Blood Glucose Monitor", description: "Viva Check precision blood glucose monitoring system for hospitals, clinics, and home healthcare.", image: productBlood, icon: HeartPulse },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 40 } as const,
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const ExportCard = ({ product }: { product: typeof exportProducts[0] }) => {
  const Icon = product.icon;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-background shadow-sm transition-shadow duration-500 hover:shadow-xl ${product.featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden ${product.featured ? "aspect-[4/3]" : "aspect-square"}`}>
        <motion.img src={product.image} alt={product.title} className="h-full w-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.7 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
              <Icon className="h-3.5 w-3.5 text-background" />
            </div>
            <span className="font-body text-[10px] font-semibold tracking-widest text-background/70 uppercase">Export</span>
          </div>
          <h3 className="mb-1 font-display text-xl font-bold text-background">{product.title}</h3>
          <p className="font-body text-sm text-background/80 line-clamp-2 opacity-0 transition-all group-hover:opacity-100">{product.description}</p>
        </div>
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 group-hover:bg-primary">
          <ArrowUpRight className="h-5 w-5 text-background" />
        </div>
      </div>
    </motion.div>
  );
};

const ImportCard = ({ product }: { product: typeof importProducts[0] }) => {
  const Icon = product.icon;
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
    >
      <div className="grid sm:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
          <motion.img src={product.image} alt={product.title} className="h-full w-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
        </div>
        <div className="flex flex-col justify-center p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/10">
              <Icon className="h-4 w-4 text-foreground" />
            </div>
            <span className="font-body text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">Medical Import</span>
          </div>
          <h3 className="mb-2 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">{product.title}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="products" className="relative py-28 lg:py-36">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 text-center">
          <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">Our Products</span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Premium Ethiopian <span className="text-gradient">Export & Import</span> Products
          </h2>
          <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
            Green coffee beans, sesame seeds, Niger seeds, chickpea, haricot beans, green mung bean, red kidney bean, spices, and medical devices — delivered worldwide.
          </p>
        </motion.div>

        {/* Export Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="mb-6">
          <h3 className="mb-6 flex items-center gap-3 font-display text-2xl font-bold text-foreground">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">E</span>
            Export Products
          </h3>
        </motion.div>
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {exportProducts.map((p) => <ExportCard key={p.title} product={p} />)}
        </motion.div>

        {/* Import Products - different background */}
        <div className="rounded-3xl bg-secondary p-8 lg:p-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="mb-6">
            <h3 className="mb-2 flex items-center gap-3 font-display text-2xl font-bold text-foreground">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">I</span>
              Import Products — Medical Equipment
            </h3>
            <p className="font-body text-sm text-muted-foreground">High-quality medical devices imported under Droga Pharma to strengthen Ethiopian healthcare infrastructure.</p>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mb-8 space-y-5">
            {importProducts.map((p) => <ImportCard key={p.title} product={p} />)}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/export-products" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-sm font-semibold text-primary-foreground">
              All Export Products <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/import-products" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 font-body text-sm font-semibold text-background">
              All Import Products <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
