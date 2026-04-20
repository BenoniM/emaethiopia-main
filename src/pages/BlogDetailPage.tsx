import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, ArrowUpRight } from "lucide-react";
import { Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import emaLogo from "@/assets/ema-logo.png";
import { blogPosts } from "@/data/blogData";

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <span className="mb-4 text-6xl">☕</span>
          <h1 className="mb-3 font-display text-3xl font-bold text-foreground">Article Not Found</h1>
          <p className="mb-8 font-body text-muted-foreground">This article doesn't exist or may have been removed.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Related posts — same category, excluding current
  const related = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 font-body text-sm font-medium text-foreground backdrop-blur-sm border border-border hover:bg-background transition-colors mt-14"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </motion.button>

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 font-body text-xs font-semibold text-primary-foreground">
                  <Linkedin className="h-3 w-3" /> {post.tag}
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-background/70 backdrop-blur-sm px-3 py-1.5 font-body text-xs font-medium text-foreground border border-border">
                  <Tag className="h-3 w-3" /> {post.category}
                </span>
              </div>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-[3.2rem]">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-8"
            >
              <div className="flex items-center gap-3">
                <img src={emaLogo} alt="EMA" className="h-10 w-10 rounded-full ring-2 ring-primary/20" />
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{post.author}</p>
                  <p className="font-body text-xs text-muted-foreground">EMA Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center gap-5 font-body text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {post.readTime}
                </span>
              </div>
            </motion.div>

            {/* Lead paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-10 font-body text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {post.excerpt}
            </motion.p>

            {/* Body sections */}
            <div className="space-y-8">
              {post.body.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                >
                  {section.heading && (
                    <h2 className="mb-3 font-display text-xl font-bold text-foreground md:text-2xl">
                      {section.heading}
                    </h2>
                  )}
                  <p className="font-body text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
                    {section.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-16 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-2xl">☕</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* ── Photo Gallery ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6">
                <span className="mb-1 inline-block font-body text-xs font-semibold tracking-widest text-primary uppercase">
                  Gallery
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Photos
                </h3>
              </div>

              {/* Main large photo */}
              <div className="mb-3 overflow-hidden rounded-2xl" style={{ height: "420px" }}>
                <motion.img
                  src={post.gallery[0]}
                  alt={`${post.title} — photo 1`}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Three smaller photos */}
              <div className="grid grid-cols-3 gap-3">
                {post.gallery.slice(1, 4).map((src, i) => (
                  <motion.div
                    key={i}
                    className="overflow-hidden rounded-xl"
                    style={{ height: "200px" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <motion.img
                      src={src}
                      alt={`${post.title} — photo ${i + 2}`}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section className="border-t border-border py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="mb-1 inline-block font-body text-xs font-semibold tracking-widest text-primary uppercase">
                Keep Reading
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Related <span className="text-gradient">Articles</span>
              </h3>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={`/blog/${rp.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
                  >
                    <div className="relative overflow-hidden" style={{ height: "200px" }}>
                      <motion.img
                        src={rp.image}
                        alt={rp.title}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                        <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="mb-2 font-body text-xs font-medium text-primary">{rp.category}</span>
                      <h4 className="mb-2 font-display text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {rp.title}
                      </h4>
                      <p className="font-body text-xs leading-relaxed text-muted-foreground line-clamp-2 flex-1">
                        {rp.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-1 font-body text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {rp.date}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back to Blog CTA ── */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-5 font-body text-muted-foreground">Explore more stories from EMA Ethiopia</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 font-body text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> All Articles
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
