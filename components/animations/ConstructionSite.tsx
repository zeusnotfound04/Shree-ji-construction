"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export function ConstructionSite() {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Crane animation
      gsap.set("#crane-arm", { transformOrigin: "20% 90%" });
      gsap.to("#crane-arm", {
        rotate: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Cable animation
      gsap.to("#cable", {
        scaleY: 1.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Building blocks rising animation
      gsap.from("#building-blocks rect", {
        y: 500,
        duration: 2,
        stagger: 0.2,
        ease: "power4.out"
      });

      // Workers animation
      gsap.to("#workers g", {
        y: -5,
        duration: 1,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={svgRef} className="w-full h-[600px]">
      <svg viewBox="0 0 800 600" className="w-full h-full">
        {/* Sky Background */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: "hsl(var(--background))" }} />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#skyGradient)" />

        {/* Construction Site */}
        <g id="construction-site">
          {/* Building Blocks */}
          <g id="building-blocks">
            {Array.from({ length: 6 }).map((_, i) => (
              <rect
                key={i}
                x={200 + i * 60}
                y={400 - i * 50}
                width="50"
                height="40"
                fill="hsl(var(--primary))"
                opacity={0.8 - i * 0.1}
                rx="2"
              />
            ))}
          </g>

          {/* Crane */}
          <g id="crane">
            <rect x="100" y="200" width="20" height="400" fill="currentColor" />
            <g id="crane-arm">
              <rect x="100" y="200" width="300" height="20" fill="currentColor" />
              <rect id="cable" x="350" y="220" width="2" height="100" fill="currentColor" />
              <rect x="330" y="320" width="40" height="40" fill="hsl(var(--primary))" />
            </g>
          </g>

          {/* Workers */}
          <g id="workers">
            {Array.from({ length: 3 }).map((_, i) => (
              <g key={i} transform={`translate(${150 + i * 100}, 500)`}>
                <circle r="10" fill="hsl(var(--primary))" />
                <rect x="-5" y="10" width="10" height="20" fill="hsl(var(--primary))" />
                <rect x="-15" y="30" width="30" height="5" fill="hsl(var(--primary))" />
              </g>
            ))}
          </g>
        </g>

        {/* Blueprint Grid */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </pattern>
        <rect width="800" height="600" fill="url(#grid)" opacity="0.5" />
      </svg>
    </div>
  );
}