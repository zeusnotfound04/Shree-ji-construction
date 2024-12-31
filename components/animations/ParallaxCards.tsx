"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxCards({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: "1000px"
      }}
      className="relative grid md:grid-cols-2 gap-8"
    >
      {Array.isArray(children) ? children.map((child, i) => (
        <motion.div
          key={i}
          style={{
            rotateX: useTransform(scrollYProgress, [0, 1], [20, 0]),
            rotateY: useTransform(scrollYProgress, [0, 1], [i % 2 ? 20 : -20, 0]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1])
          }}
        >
          {child}
        </motion.div>
      )) : children}
    </motion.div>
  );
}