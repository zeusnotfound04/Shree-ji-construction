"use client";

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function MagneticButton({ children, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <Button {...props} className="relative z-0 overflow-hidden">
        <motion.span
          className="absolute inset-0 bg-primary/20"
          animate={{
            scale: position.x || position.y ? 1.5 : 1
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />
        <span className="relative">{children}</span>
      </Button>
    </motion.div>
  );
}