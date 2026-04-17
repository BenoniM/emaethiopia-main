import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import blogCafeshow from "@/assets/blog-cafeshow.svg";
import blogQuality from "@/assets/blog-quality.svg";
import blogEthcof from "@/assets/blog-ethcof.svg";

const blogPosts = [
  {
    image: blogCafeshow,
    category: "Event",
    title: "Join Us at the 23rd Seoul International Cafe Show",
    excerpt: "We're excited to invite you to the 23rd Seoul International Cafe Show, taking place from November 6–9, 2024, at Coex in Seoul, South Korea. Visit our booth to sample premium Ethiopian green coffee beans.",
  },
  {
    image: blogQuality,
    category: "Quality",
    title: "Ethiopia is Home to Several Unique Coffee Varieties",
    excerpt: "From the floral notes of Yirgacheffe to the fruity profiles of Sidamo and the wine-like tones of Harrar — each Ethiopian region produces distinctly unique green coffee beans prized by specialty roasters.",
  },
  {
    image: blogEthcof,
    category: "Heritage",
    title: "Ethiopia, the Birthplace of Coffee",
    excerpt: "Known globally as the origin of Arabica coffee, Ethiopia produces some of the world's most sought-after green coffee beans. Our direct farm partnerships ensure every lot meets specialty-grade standards.",
  },
  {
    image: blogQuality,
    category: "Expo",
    title: "EMA Coffee at Specialty Coffee Expo 2024",
    excerpt: "EMA Coffee participated in the Specialty Coffee Expo 2024 in Chicago, showcasing our range of washed and natural processed Ethiopian green coffee beans to international buyers and roasters.",
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section id="blog" className="relative overflow-hidden py-28 lg:py-36" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-body text-sm font-semibold tracking-widest text-primary uppercase">
            Latest Updates
          </span>
          <h2 className="mb-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Explore the Latest <span className="text-gradient">Updates & Insights</span>
          </h2>
          <p className="mx-auto max-w-2xl font-body text-lg text-muted-foreground">
            From international coffee expos to quality innovations — stay connected with EMA Ethiopia's latest news and industry insights.
          </p>
        </motion.div>
      </div>

      {/* Parallax horizontal carousel */}
      <div ref={scrollRef} className="relative">
        <motion.div
          style={{ x }}
          className="flex gap-6 px-6 pb-4"
        >
          {[...blogPosts, ...blogPosts].map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: Math.min(i * 0.1, 0.4), duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group w-[320px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/20 hover:shadow-lg md:w-[380px]"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="h-52 w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 font-body text-xs font-medium text-primary-foreground">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="mb-2 font-display text-base font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mb-4 font-body text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 font-body text-sm font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Read More <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
