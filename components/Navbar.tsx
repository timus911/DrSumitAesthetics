
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scissors, Activity, Zap, MessageCircle } from 'lucide-react';
import { BRAND } from '../constants.ts';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      // Prevent vertical scrolling of the page when hovering the nav
      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += e.deltaY; // Direct assignment for instant response without page jank
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Concerns', path: '/concerns' },
    { name: 'Aesthetic', path: '/aesthetic', icon: <Scissors size={14} /> },
    { name: 'Reconstructive', path: '/reconstructive', icon: <Activity size={14} /> },
    { name: 'Non-Surgical', path: '/non-surgical', icon: <Zap size={14} /> },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Costs & Financing', path: '/plastic-surgery-cost-chandigarh' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${(scrolled || isOpen) ? 'py-2 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center gap-8">

        {/* LEFT: Static Logo */}
        <Link to="/" className="flex flex-col group shrink-0 mr-2 z-10">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-serif tracking-[0.2em] text-white leading-tight uppercase group-hover:text-[#4A90E2] transition-colors whitespace-nowrap overflow-hidden text-ellipsis">Dr. Sumit Singh</span>
            <span className="text-lg md:text-xl font-serif tracking-[0.2em] text-white leading-tight uppercase group-hover:text-[#4A90E2] transition-colors whitespace-nowrap overflow-hidden text-ellipsis -mt-1">Gautam</span>
          </div>
          <span className="text-[8px] md:text-[9px] tracking-[0.4em] text-gray-500 mt-1 uppercase font-bold whitespace-nowrap border-t border-white/5 pt-1">Plastic & Aesthetic Surgeon</span>
        </Link>

        {/* MIDDLE: Scrollable Menu (Desktop Only) */}
        <div ref={navRef} className="hidden min-[1600px]:flex flex-1 items-center justify-center overflow-x-auto no-scrollbar scroll-smooth py-4 px-4 mask-linear-gradient">
          <div className="flex items-center space-x-10 min-w-max px-4">
            {navLinks.map((link) => {
              const isConcerns = link.name === 'Concerns';
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[9px] uppercase font-bold transition-all whitespace-nowrap
                    ${isConcerns ? 'tracking-[0.35em] duration-700 px-5 rounded-sm hover:bg-white/5' : 'tracking-[0.3em]'} 
                    ${isActive ? 'text-[#4A90E2]' : (isConcerns ? 'text-stone-400 hover:text-stone-300' : 'text-gray-400 hover:text-[#4A90E2]')}
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Static Icon (Desktop) & Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0 z-10">
          {/* Desktop Request Button - Now just an Icon */}
          <Link
            to="/contact"
            className="hidden min-[1600px]:flex w-10 h-10 items-center justify-center rounded-full bg-[#4A90E2] text-white shadow-lg shadow-[#4A90E2]/20 active:scale-95 transition-transform hover:bg-[#357ABD]"
            title="Request Consultation"
          >
            <MessageCircle size={20} className="-mr-0.5 mt-0.5" />
          </Link>

          {/* Mobile Request Consultation Icon */}
          <Link to="/contact" className="min-[1600px]:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#4A90E2] text-white shadow-lg shadow-[#4A90E2]/20 active:scale-95 transition-transform hover:bg-[#357ABD]">
            <MessageCircle size={20} className="-mr-0.5 mt-0.5" />
          </Link>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white shrink-0 min-[1600px]:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[45] bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-start pt-32 pb-32 space-y-4 min-[1600px]:hidden overflow-y-auto overscroll-contain"
              data-lenis-prevent // Prevents lenis from hijacking scroll inside this container
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xl font-bold uppercase tracking-[0.2em] text-white hover:text-[#4A90E2] py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-8 px-10 py-4 bg-[#4A90E2] text-black text-[10px] uppercase tracking-[0.3em] font-bold rounded-sm"
              >
                Request a consultation
              </Link>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </nav >
  );
};

export default Navbar;
