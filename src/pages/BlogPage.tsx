import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight, Linkedin, Tag } from "lucide-react";
import emaLogo from "@/assets/ema-logo.png";
import { blogPosts, categories } from "@/data/blogData";

// CTA background
import ctaBg from "@/assets/CTA/photo_2026-04-19_11-44-37.jpg";

/* ─────────────────────────── UI COMPONENTS ─────────────────────────── */
import type { BlogPost } from "@/data/blogData";
type Post = BlogPost;

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
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
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
        <Link to={`/blog/${post.id}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-primary-foreground magnetic-btn cursor-pointer"
          >
            Read More <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </Link>      </div>
    </div>
  </motion.article>
);

/* ─────────────────────────── BLOG CARD ─────────────────────────── */
const BlogCard = ({ post, index }: { post: Post; index: number }) => (
  <Link to={`/blog/${post.id}`}>
  <motion.article
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card card-lift cursor-pointer h-full"
  >
    {/* Image */}
    <div className="relative overflow-hidden" style={{ height: "230px" }}>
      <motion.div className="h-full w-full" whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
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
  </Link>
);

/* ─────────────────────────── PAGE ─────────────────────────── */
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

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

      {/* REDESIGNED CTA SECTION - 50% SCREEN HEIGHT */}
      <div 
        className="relative flex h-[50vh] min-h-[450px] items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${ctaBg})` }}
       >
        {/* The warm overlay from the image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D781D]/40 via-[#289928]/20 to-[#259825]/40 backdrop-brightness-75" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl bg-white/10 backdrop-blur-md px-8 py-10 text-center shadow-2xl md:px-16 md:py-12 rounded-3xl"
          >
            <h2 className="mb-4 font-display text-2xl font-extrabold text-white md:text-4xl uppercase tracking-tighter">
              Ready to Partner<br />with EMA?
            </h2>
            
            <p className="mx-auto mb-8 max-w-3xl font-body text-sm md:text-base text-white/80 leading-relaxed">
              Whether you're looking for premium Ethiopian green coffee beans, sesame seeds, pulses, or medical equipment — 
              our team is ready to help you source, process, and deliver with confidence.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#259825] px-8 py-5 font-body text-xs font-bold text-white uppercase tracking-wide"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
