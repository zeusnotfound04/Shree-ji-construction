"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export function BuildingAnimation() {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("#building-lines path", { drawSVG: 0 });
      gsap.set("#windows rect", { scaleY: 0, transformOrigin: "bottom" });
      
      const tl = gsap.timeline();
      
      tl.to("#building-lines path", {
        drawSVG: "100%",
        duration: 2,
        stagger: 0.1,
        ease: "power2.inOut"
      })
      .to("#windows rect", {
        scaleY: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "bounce.out"
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={svgRef} className="w-full h-[400px]">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        <g id="building-lines">
          <path d="M100,380 L100,100 L300,100 L300,380" fill="none" stroke="currentColor" strokeWidth="4"/>
          <path d="M100,100 L200,20 L300,100" fill="none" stroke="currentColor" strokeWidth="4"/>
        </g>
        <g id="windows">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x={150 + (i % 2) * 60}
              y={120 + Math.floor(i / 2) * 60}
              width="40"
              height="40"
              fill="currentColor"
              opacity="0.2"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}