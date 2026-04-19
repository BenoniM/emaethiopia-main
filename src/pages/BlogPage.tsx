import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, ArrowUpRight, Linkedin, Tag, Coffee, Globe, FlaskConical, Truck, Leaf, Building2 } from "lucide-react";
import emaLogo from "@/assets/ema-logo.png";

/* ─────────────────────────── DATA ─────────────────────────── */
const blogPosts = [
  {
    id: 1,
    title: "Ethiopia, the Birthplace of Coffee",
    excerpt:
      "Ethiopia, the birthplace of coffee, offers beans with rich flavors and unique profiles unlike anywhere else on earth. From Yirgacheffe to Sidama, every cup tells a story of ancient tradition. Discover what makes Ethiopian coffee truly one-of-a-kind.",
    author: "EMA Ethiopia",
    date: "August 20, 2022",
    category: "Coffee Origins",
    tag: "LinkedIn",
    imageSrc: "https://www.emaethiopia.com/wp-content/uploads/2022/08/blog1.jpg",
    fallbackIcon: Coffee,
    fallbackLabel: "Ethiopian Coffee",
    fallbackGradient: "from-[hsl(120_61%_20%)] to-[hsl(120_61%_37%)]",
    featured: true,
  },
  {
    id: 2,
    title: "Cafe Show 2024: A World Coffee Experience",
    excerpt:
      "This event is a unique opportunity to experience the world of coffee — the 23rd International Cafe Show brought together the finest in specialty coffee culture from around the globe.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Events",
    tag: "LinkedIn",
    imageSrc: "https://www.emaethiopia.com/wp-content/uploads/2022/08/blog2.jpg",
    fallbackIcon: Globe,
    fallbackLabel: "Cafe Show 2024",
    fallbackGradient: "from-[hsl(200_60%_20%)] to-[hsl(120_61%_30%)]",
    featured: false,
  },
  {
    id: 3,
    title: "At EMA, We're More Than Just a Company",
    excerpt:
      "At EMA, we're more than just a company — we're a community dedicated to excellence. With over 70 high-quality products and 300+ loyal customers, we're here to help you succeed.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Company",
    tag: "LinkedIn",
    imageSrc: "https://www.emaethiopia.com/wp-content/uploads/2022/08/blog3.jpg",
    fallbackIcon: Building2,
    fallbackLabel: "Your Trusted Partner",
    fallbackGradient: "from-[hsl(120_61%_15%)] to-[hsl(120_50%_35%)]",
    featured: false,
  },
  {
    id: 4,
    title: "Pharmaceutical & Medical Equipment Imports",
    excerpt:
      "EMA Ethiopia expands its import portfolio with state-of-the-art pharmaceutical and medical equipment, bridging the gap between global innovation and local healthcare needs.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Imports",
    tag: "LinkedIn",
    imageSrc: "https://www.emaethiopia.com/wp-content/uploads/2022/08/blog4.jpg",
    fallbackIcon: Truck,
    fallbackLabel: "Medical Imports",
    fallbackGradient: "from-[hsl(120_55%_18%)] to-[hsl(120_61%_37%)]",
    featured: false,
  },
  {
    id: 5,
    title: "Wake Up and Smell Ethiopia's Finest Coffee!",
    excerpt:
      "Wake up and smell Ethiopia's finest coffee! Our single-origin green beans carry the essence of the highlands — bright, floral, and deeply complex notes in every roast.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Coffee Origins",
    tag: "LinkedIn",
    imageSrc: "https://www.emaethiopia.com/wp-content/uploads/2022/08/blog5.jpg",
    fallbackIcon: Coffee,
    fallbackLabel: "Ethiopia's Finest",
    fallbackGradient: "from-[hsl(120_61%_22%)] to-[hsl(150_50%_32%)]",
    featured: false,
  },
  {
    id: 6,
    title: "How Technology Is Changing the Workplace",
    excerpt:
      "The impact of technology on the workplace continues to evolve — how EMA Ethiopia leverages digital tools, quality tracking systems, and data-driven logistics for a smarter supply chain.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Industry",
    tag: "LinkedIn",
    imageSrc: "https://www.emaethiopia.com/wp-content/uploads/2022/08/blog6.jpg",
    fallbackIcon: FlaskConical,
    fallbackLabel: "In Quality",
    fallbackGradient: "from-[hsl(120_40%_15%)] to-[hsl(120_61%_40%)]",
    featured: false,
  },
  {
    id: 7,
    title: "Arabica vs. Robusta: What's the Difference?",
    excerpt:
      "Arabica vs. Robusta: the two titans of the coffee world. We break down the key differences in flavor, growing conditions, caffeine content, and why Ethiopian Arabica stands apart.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Coffee Origins",
    tag: "LinkedIn",
    imageSrc: "https://www.emaethiopia.com/wp-content/uploads/2022/08/blog7.jpg",
    fallbackIcon: Coffee,
    fallbackLabel: "Arabica vs Robusta",
    fallbackGradient: "from-[hsl(200_30%_15%)] to-[hsl(120_61%_30%)]",
    featured: false,
  },
  {
    id: 8,
    title: "From Ethiopia to the World",
    excerpt:
      "Ethiopia's fertile lands produce some of the most sought-after agricultural commodities — green coffee, sesame, Niger seeds, and pulses that fuel global markets and support local farmers.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Exports",
    tag: "LinkedIn",
    imageSrc: "https://www.emaethiopia.com/wp-content/uploads/2022/08/blog8.jpg",
    fallbackIcon: Globe,
    fallbackLabel: "From Ethiopia",
    fallbackGradient: "from-[hsl(190_50%_20%)] to-[hsl(120_61%_35%)]",
    featured: false,
  },
  {
    id: 9,
    title: "Adding Value to Every Bean",
    excerpt:
      "We don't just export coffee — we ensure each bean is handled with care, from farm to container. EMA's rigorous quality control guarantees consistency and excellence across every shipment.",
    author: "Admin",
    date: "August 20, 2022",
    category: "Quality",
    tag: "LinkedIn",
    imageSrc: "https://www.emaethiopia.com/wp-content/uploads/2022/08/blog9.jpg",
    fallbackIcon: Leaf,
    fallbackLabel: "Adding Value",
    fallbackGradient: "from-[hsl(30_20%_10%)] to-[hsl(120_61%_25%)]",
    featured: false,
  },
];

const categories = ["All", "Coffee Origins", "Events", "Company", "Imports", "Exports", "Quality", "Industry"];

/* ─────────────────────────── BLOG IMAGE ─────────────────────────── */
type Post = typeof blogPosts[0];

const BlogImage = ({ post, className }: { post: Post; className?: string }) => {
  const [imgError, setImgError] = useState(false);
  const Icon = post.fallbackIcon;

  return imgError ? (
    <div className={`flex flex-col items-center justify-center bg-gradient-to-br ${post.fallbackGradient} ${className}`}>
      <Icon className="mb-3 h-10 w-10 text-white/60" />
      <span className="font-display text-sm font-bold uppercase tracking-widest text-white/80">{post.fallbackLabel}</span>
    </div>
  ) : (
    <img
      src={post.imageSrc}
      alt={post.title}
      className={`h-full w-full object-cover ${className}`}
      onError={() => setImgError(true)}
    />
  );
};

/* ─────────────────────────── FEATURED CARD ─────────────────────────── */
const FeaturedCard = ({ post }: { post: Post }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="group relative grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-[1.1fr_0.9fr]"
  >
    {/* Image */}
    <div className="relative overflow-hidden" style={{ minHeight: "440px" }}>
      <motion.div className="h-full w-full" whileHover={{ scale: 1.04 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <BlogImage post={post} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 to-transparent pointer-events-none" />
      <span className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 font-body text-xs font-semibold tracking-widest text-primary-foreground uppercase shadow-md">
        ⭐ Featured
      </span>
    </div>

    {/* Content */}
    <div className="flex flex-col justify-between p-10">
      <div>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 font-body text-xs font-medium text-primary">
            <Linkedin className="h-3 w-3" /> {post.tag}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-body text-xs font-medium text-muted-foreground">
            <Tag className="h-3 w-3" /> {post.category}
          </span>
        </div>

        <h2 className="mb-4 font-display text-3xl font-bold leading-tight text-foreground md:text-[2.4rem]">
          {post.title}
        </h2>
        <p className="mb-8 font-body text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-6">
        <div className="flex items-center gap-3">
          <img src={emaLogo} alt="EMA" className="h-8 w-8 rounded-full" />
          <div>
            <p className="font-body text-sm font-semibold text-foreground">{post.author}</p>
            <p className="font-body text-xs text-muted-foreground">{post.date}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-primary-foreground magnetic-btn"
        >
          Read More <ArrowUpRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  </motion.article>
);

/* ─────────────────────────── BLOG CARD ─────────────────────────── */
const BlogCard = ({ post, index }: { post: Post; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card card-lift cursor-pointer"
  >
    {/* Image */}
    <div className="relative overflow-hidden" style={{ height: "230px" }}>
      <motion.div className="h-full w-full" whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <BlogImage post={post} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
        <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-body text-xs font-medium text-primary">
          <Linkedin className="h-3 w-3" /> {post.tag}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 font-body text-xs font-medium text-muted-foreground">
          <Tag className="h-3 w-3" /> {post.category}
        </span>
      </div>

      <h3 className="mb-3 font-display text-lg font-bold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-1">
        {post.excerpt}
      </p>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <img src={emaLogo} alt="EMA" className="h-6 w-6 rounded-full" />
        <span className="font-body text-xs font-medium text-foreground">{post.author}</span>
        <span className="ml-auto flex items-center gap-1 font-body text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" /> {post.date}
        </span>
      </div>
    </div>
  </motion.article>
);

/* ─────────────────────────── STATS ─────────────────────────── */
const stats = [
  { value: "9+", label: "Articles Published" },
  { value: "300+", label: "Global Partners" },
  { value: "70+", label: "Export Products" },
  { value: "5", label: "Years of Excellence" },
];

/* ─────────────────────────── PAGE ─────────────────────────── */
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const featuredPost = blogPosts.find((p) => p.featured)!;
  const filteredPosts = blogPosts
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === "All" || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        badge="EMA Blog"
        title={
          <>
            Shared Value{" "}
            <span className="text-gradient">For Sustainability</span>{" "}
            In African Coffee
          </>
        }
        description="Insights, stories, and updates from EMA Ethiopia — where premium coffee trade meets sustainability, innovation, and people."
      />

      {/* ── Featured Post ── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <span className="mb-2 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">
                Featured Post
              </span>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Latest <span className="text-gradient">Insights</span>
              </h2>
            </div>
            <span className="hidden font-body text-sm text-muted-foreground md:block">
              {blogPosts.length} articles published
            </span>
          </motion.div>

          <FeaturedCard post={featuredPost} />
        </div>
      </section>

      {/* ── Category Filter + Grid ── */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          {/* section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="mb-2 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">
              Latest News
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              All <span className="text-gradient">Articles</span>
            </h2>
          </motion.div>

          {/* Category pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`rounded-full px-5 py-2 font-body text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md glow-green"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {filteredPosts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-24 text-center"
              >
                <span className="mb-3 text-5xl">☕</span>
                <p className="font-display text-xl text-muted-foreground">No articles in this category yet.</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredPosts.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Newsletter / LinkedIn CTA ── */}
      <section className="relative overflow-hidden bg-foreground py-28">
        {/* decorative blobs */}
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(120 61% 37%), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(120 61% 50%), transparent 70%)" }}
        />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 font-body text-xs font-semibold tracking-widest text-primary uppercase">
              <img src={emaLogo} alt="EMA" className="h-4 w-4 rounded-full" />
              Stay Connected
            </span>
            <h2 className="mb-4 font-display text-4xl font-bold text-background md:text-5xl">
              Follow Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="mb-10 font-body text-lg leading-relaxed text-background/70">
              Stay up-to-date with the latest news, coffee insights, and trade updates from EMA Ethiopia. Join our community of 300+ global partners.
            </p>
            <motion.a
              href="https://www.linkedin.com/company/ema-ethiopia"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-body text-base font-semibold text-primary-foreground magnetic-btn"
            >
              <Linkedin className="h-5 w-5" />
              Follow on LinkedIn
              <ArrowUpRight className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
