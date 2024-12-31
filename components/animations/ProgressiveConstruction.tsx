"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProgressiveConstruction() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Foundation animation
      gsap.from("#foundation", {
        scaleY: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      });

      // Walls animation
      gsap.from("#walls rect", {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      });

      // Roof animation
      gsap.from("#roof", {
        scale: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-[600px] relative">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Foundation */}
        <rect
          id="foundation"
          x="100"
          y="300"
          width="200"
          height="20"
          fill="hsl(var(--primary))"
          transformOrigin="center bottom"
        />

        {/* Walls */}
        <g id="walls">
          <rect x="100" y="200" width="20" height="100" fill="currentColor" />
          <rect x="280" y="200" width="20" height="100" fill="currentColor" />
          <rect x="120" y="200" width="160" height="100" fill="currentColor" opacity="0.8" />
        </g>

        {/* Roof */}
        <path
          id="roof"
          d="M 80 200 L 200 100 L 320 200"
          fill="hsl(var(--primary))"
          transformOrigin="center"
        />

        {/* Measurement Lines */}
        <g stroke="currentColor" strokeWidth="1" opacity="0.5">
          <line x1="50" y1="320" x2="350" y2="320" />
          <line x1="50" y1="320" x2="50" y2="300" />
          <line x1="350" y1="320" x2="350" y2="300" />
        </g>
      </svg>
    </div>
  );
}