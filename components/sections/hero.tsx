"use client";

import { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { HardHat, Building2, Ruler, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export function HeroSection() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blueprint-line", {
        drawSVG: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen relative overflow-hidden" ref={scope}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Building Dreams
              <span className="block text-primary">Into Reality</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              With over two decades of excellence in construction, we transform visions into 
              architectural masterpieces that stand the test of time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg">
                Explore Projects
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Contact Us
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {[
                { icon: Building2, label: 'Projects', value: '500+' },
                { icon: Users, label: 'Clients', value: '200+' },
                { icon: Ruler, label: 'Sq Ft Built', value: '2M+' },
                { icon: HardHat, label: 'Team Size', value: '150+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="font-bold text-2xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Building Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[600px] hidden lg:block"
          >
            {/* Add your 3D building animation here */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl">
              {/* Placeholder for 3D model */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-1 h-8 bg-primary/50 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}