import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";

interface AnimatedHeroProps {
  words: string[];
}

const AnimatedHero = ({ words }: AnimatedHeroProps) => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => words, [words]);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  useEffect(() => {
    if (!spanRef.current) return;

    // Reset the position and opacity for the new word immediately
    gsap.fromTo(
      spanRef.current,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        ease: "power3.out",
        overwrite: true // Prevents animation overlap
      }
    );

    // We handle the "exit" animation via the cleanup or a timeline
    // But for a simple swap, the fromTo above handles the "entrance" best.
  }, [titleNumber]);

  return (
    <span className="relative flex justify-center items-center w-full h-[1.2em] overflow-hidden">
      <span
        key={titles[titleNumber]} // Use key to force a fresh element for GSAP if needed
        ref={spanRef}
        className="absolute text-center whitespace-nowrap text-gradient"
      >
        {titles[titleNumber]}
      </span>
    </span>
  );
};

export { AnimatedHero };