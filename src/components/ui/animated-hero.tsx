import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedHeroProps {
  words: string[];
}

const AnimatedHero = ({ words }: AnimatedHeroProps) => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => words, [words]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <span className="relative inline-flex h-[1.15em] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {titles.map((title, index) =>
          index === titleNumber ? (
            <motion.span
              key={`title-${index}`}
              className="absolute text-gradient"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {title}
            </motion.span>
          ) : null
        )}
      </AnimatePresence>
    </span>
  );
};

export { AnimatedHero };
