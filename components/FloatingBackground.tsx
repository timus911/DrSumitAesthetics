
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Subtle parallax for mouse interaction
  const mouseParallax = isReducedMotion ? {} : {
    x: (mousePos.x / window.innerWidth - 0.5) * 20,
    y: (mousePos.y / window.innerHeight - 0.5) * 20,
  };

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-black">
      {/* Background Ambience - Pure CSS animations, no JS */}
      <div
        className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-[#4A90E2]/10 rounded-full blur-[80px] animate-float-slow"
        style={!isReducedMotion ? { transform: `translate(${mouseParallax.x * 0.3}px, ${mouseParallax.y * 0.3}px)` } : undefined}
      />
      <div
        className="absolute bottom-0 -right-1/4 w-[1200px] h-[1200px] bg-[#4A90E2]/10 rounded-full blur-[100px] animate-float-slow-reverse"
        style={!isReducedMotion ? { transform: `translate(${mouseParallax.x * 0.2}px, ${mouseParallax.y * 0.2}px)` } : undefined}
      />

      {/* 3D Wireframe Element - Simplified, GPU-accelerated */}
      <div className="absolute top-[25%] left-[60%] hidden lg:block perspective-2000">
        <motion.div
          style={{
            x: isReducedMotion ? 0 : mouseParallax.x,
            y: isReducedMotion ? 0 : mouseParallax.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="relative w-[25vw] h-[25vw] flex items-center justify-center"
        >
          {/* Main Ring - CSS animated rotation */}
          <div className="absolute inset-0 border border-[#4A90E2]/10 rounded-full animate-slow-spin" />
          
          {/* Middle Ring */}
          <div className="absolute w-[80%] h-[80%] border-l border-r border-[#4A90E2]/20 rounded-full animate-slow-spin-reverse" />
          
          {/* Pulsating Core */}
          <div className="w-16 h-16 bg-[#4A90E2]/20 rounded-full blur-[10px] border border-[#4A90E2]/30 animate-pulse-subtle" />
          
          {/* Inner Floating Lines */}
          <div className="absolute w-[50%] h-[50%] border-t border-b border-[#4A90E2]/10 rounded-full animate-slow-spin" />
        </motion.div>
      </div>

      {/* Medical Grid Dots - Static SVG, no scroll reactivity */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="medicalGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="#4A90E2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medicalGrid)" />
        </svg>
      </div>
    </div>
  );
};

export default FloatingBackground;

