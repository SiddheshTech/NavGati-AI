import React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { useRef } from 'react';

interface ScrollTextHighlightProps {
  text: string;
  className?: string;
}

export default function ScrollTextHighlight({ text, className = "" }: ScrollTextHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"]
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-[0.2em] gap-y-[0.1em] ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
}

function Word({ children, progress, range }: any) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <span className="relative inline-block overflow-hidden pb-1">
      <motion.span 
        style={{ opacity, y }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}
