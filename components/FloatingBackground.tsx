
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useVelocity } from 'framer-motion';

const FloatingBackground: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Mouse tracking with inertia
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Scroll tracking with velocity-based physics
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Physics springs for smoother reactions
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 100, damping: 30 });
  const springScrollY = useSpring(scrollY, { stiffness: 50, damping: 30 });
  
  // Dynamic 3D transforms
  const rotateX = useTransform(springMouseY, [0, windowSize.height], [15, -15]);
  const rotateY = useTransform(springMouseX, [0, windowSize.width], [-15, 15]);
  
  // Scroll speed makes the elements "squash and stretch" or spin faster
  const dynamicScale = useTransform(smoothVelocity, [-2000, 2000], [1.3, 0.7]);
  const velocityRotation = useTransform(smoothVelocity, [-3000, 3000], [-180, 180]);
  const autoRotate = useTransform(springScrollY, [0, 5000], [0, 360]);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-black">
      {/* Background Ambience */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[150px]"
      />
      <motion.div 
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.03, 0.08, 0.03],
          x: [0, -100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 -right-1/4 w-[1200px] h-[1200px] bg-blue-500/10 rounded-full blur-[200px]"
      />

      {/* Reactive 3D Wireframe Element */}
      <div className="absolute top-[25%] left-[60%] hidden lg:block perspective-2000">
        <motion.div
          style={{
            rotateX,
            rotateY,
            rotateZ: autoRotate,
            scale: dynamicScale,
            skewX: velocityRotation
          }}
          className="relative w-[25vw] h-[25vw] flex items-center justify-center"
        >
          {/* Main Ring */}
          <div className="absolute inset-0 border border-blue-500/10 rounded-full shadow-[0_0_80px_rgba(74,144,226,0.05)]" />
          
          {/* Middle Kinetic Ring */}
          <motion.div 
            style={{ rotate: velocityRotation }}
            className="absolute w-[80%] h-[80%] border-l border-r border-blue-400/20 rounded-full"
          />
          
          {/* Pulsating Core - Reacts to velocity */}
          <motion.div 
            style={{ scale: dynamicScale }}
            className="w-16 h-16 bg-blue-500/20 rounded-full blur-[10px] border border-blue-400/30" 
          />
          
          {/* Inner Floating Lines */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[50%] h-[50%] border-t border-b border-blue-300/10 rounded-full"
          />
        </motion.div>
      </div>

      {/* Floating Medical Grid Dots */}
      <motion.div 
        style={{ opacity: useTransform(scrollY, [0, 2000], [0.1, 0.02]) }}
        className="absolute inset-0 w-full h-full"
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="medicalGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="#4A90E2" fillOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medicalGrid)" />
        </svg>
      </motion.div>
    </div>
  );
};

export default FloatingBackground;
