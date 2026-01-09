
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Microscope, Waves, Crosshair } from 'lucide-react';
import { BRAND, COLORS, ASSETS } from '../constants.ts';

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll-driven Hero background animations - Enhanced for fluid feel
  const heroScale = useTransform(smoothProgress, [0, 0.4], [1, 1.15]); // Subtler scale
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const heroYShift = useTransform(smoothProgress, [0, 0.4], [0, 150]); // Deeper parallax
  const textYMastery = useTransform(smoothProgress, [0, 0.3], [0, -150]); // Faster exit
  const philosophyYEnter = useTransform(smoothProgress, [0.1, 0.6], [150, 0]); // Smoother entry

  return (
    <div ref={containerRef} className="w-full">
      {/* Hero Section */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, y: heroYShift }}
          className="absolute inset-0 z-0"
        >
          {/* Surgical operation background with balanced fade overlay */}
          <img
            src={ASSETS.surgeryHeroBackground}
            className="w-full h-full object-cover opacity-60"
            alt="Dr. Sumit Surgical Excellence"
          />
          {/* Balanced black fade overlay for visible yet professional background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85" />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            style={{ opacity: heroOpacity, y: textYMastery }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 mt-32"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="inline-block px-8 py-3 border border-[#4A90E2]/40 bg-[#4A90E2]/10 rounded-full backdrop-blur-2xl shadow-2xl shadow-blue-500/10"
            >
              <span className="text-[#4A90E2] text-[10px] tracking-[0.6em] uppercase font-bold">Artistry · Precision · Sculpture</span>
            </motion.div>

            <h1 className="text-7xl md:text-[10rem] font-serif leading-none tracking-tighter text-white">
              Surgical <br />
              <span className="text-[#4A90E2]">Artistry</span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-xl tracking-wide font-light leading-relaxed">
              Dr. Sumit Singh Gautam fuses fine art mastery with surgical precision to redefine aesthetic surgery. A sculptor's eye ensuring anatomical harmony.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 pt-12">
              <Link to="/concerns" className="group flex items-center space-x-5 px-12 py-6 bg-white text-black font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-[#4A90E2] hover:text-white transition-all shadow-2xl overflow-hidden relative">
                <span className="relative z-10">Explore Mastery</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-4 transition-transform duration-500" />
                <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </Link>
              <Link to="/contact" className="text-white text-[11px] uppercase tracking-[0.5em] border-b border-white/20 pb-2 hover:border-[#4A90E2] transition-all font-bold">
                Consultation
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center"
        >
          <span className="text-[8px] tracking-[0.5em] uppercase mb-4 opacity-50 font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-[#4A90E2] via-[#4A90E2]/50 to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <motion.section
        style={{ y: philosophyYEnter }}
        className="py-60 relative z-20"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative aspect-[4/5] overflow-hidden glass rounded-sm group shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5"
            >
              {/* Photo 4: Surgical profile */}
              <img src={ASSETS.surgeryProfile} alt="Surgical Profile" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 space-y-4">
                <div className="h-0.5 w-12 bg-[#4A90E2]" />
                <p className="text-[#4A90E2] font-serif text-4xl">Artistic Anatomy</p>
                <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase font-bold">Surgical Sculpture Directive</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-20"
            >
              <div className="space-y-8">
                <span className="text-[#4A90E2] text-[11px] tracking-[0.6em] uppercase font-extrabold flex items-center gap-4">
                  <Crosshair size={16} /> Sculpted Precision
                </span>
                <h2 className="text-6xl md:text-8xl font-serif leading-[1.1]">Form & <br /> Function</h2>
              </div>

              <p className="text-gray-400 leading-relaxed text-2xl font-light">
                Every procedure is approached as a living sculpture. By combining the principles of 3D modeling and fine art with advanced surgical techniques, we achieve results that are naturally balanced and artistically refined.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
                <div className="space-y-8 group">
                  <div className="w-16 h-16 glass flex items-center justify-center rounded-full border border-blue-500/20 shadow-2xl group-hover:border-blue-400 transition-colors">
                    <Microscope size={28} className="text-[#4A90E2]" />
                  </div>
                  <h4 className="text-[12px] uppercase tracking-[0.4em] font-extrabold text-white">Microsurgical Technique</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Precision restoration of neural and vascular pathways under high-optic magnification protocols.</p>
                </div>
                <div className="space-y-8 group">
                  <div className="w-16 h-16 glass flex items-center justify-center rounded-full border border-blue-500/20 shadow-2xl group-hover:border-blue-400 transition-colors">
                    <ShieldCheck size={28} className="text-[#4A90E2]" />
                  </div>
                  <h4 className="text-[12px] uppercase tracking-[0.4em] font-extrabold text-white">Artistic Vision</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Applying the laws of proportion, light, and shadow from the studio to the operating theater.</p>
                </div>
              </div>

              <Link to="/about" className="inline-flex items-center space-x-8 mt-16 group">
                <span className="px-12 py-5 border border-white/10 group-hover:border-[#4A90E2] group-hover:bg-blue-900/10 transition-all text-[11px] uppercase tracking-[0.5em] font-bold text-gray-300">Biographical Brief</span>
                <ArrowRight size={18} className="text-gray-600 group-hover:text-[#4A90E2] group-hover:translate-x-6 transition-all duration-500" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
