import ExportsShowcase from "./ExportsShowcase";
import ImportsShowcase from "./ImportsShowcase";

const ProductsSection = () => {
  return (
    <section id="products" className="relative">
      {/* ─── Export Products — Scroll-Pinned Showcase ─── */}
      <ExportsShowcase />

      {/* ─── Import Products — Video Hover Showcase ─── */}
      <ImportsShowcase />
    </section>
  );
};

export default ProductsSection;
