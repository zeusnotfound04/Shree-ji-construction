"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BlueprintText({ text, className = "" }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".blueprint-line", { 
        strokeDasharray: "1000",
        strokeDashoffset: "1000"
      });
      gsap.set(".blueprint-text", { opacity: 0 });

      const tl = gsap.timeline();

      tl.to(".blueprint-line", {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.inOut"
      })
      .to(".blueprint-text", {
        opacity: 1,
        duration: 0.5,
        stagger: 0.1
      }, "-=1");
    }, svgRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <div ref={svgRef} className={className}>
      <svg viewBox="0 0 400 100" className="w-full">
        <pattern id="blueprint" width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </pattern>
        <rect width="400" height="100" fill="url(#blueprint)" />
        
        {/* Text Path */}
        <path
          className="blueprint-line"
          d="M 50 50 H 350"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
        />
        
        <text
          className="blueprint-text"
          x="200"
          y="45"
          textAnchor="middle"
          fill="currentColor"
          fontSize="24"
          fontWeight="bold"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}