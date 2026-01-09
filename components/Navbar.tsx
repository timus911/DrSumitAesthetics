
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
      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
        behavior: 'smooth'
      });
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
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${(scrolled || isOpen) ? 'py-2 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center gap-8">
        <Link to="/" className="flex flex-col group shrink-0">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-serif tracking-[0.2em] text-white leading-tight uppercase group-hover:text-[#5DA9E9] transition-colors whitespace-nowrap">Dr. Sumit Singh</span>
            <span className="text-lg md:text-xl font-serif tracking-[0.2em] text-white leading-tight uppercase group-hover:text-[#5DA9E9] transition-colors whitespace-nowrap -mt-1">Gautam</span>
          </div>
          <span className="text-[8px] md:text-[9px] tracking-[0.4em] text-gray-500 mt-1 uppercase font-bold whitespace-nowrap border-t border-white/5 pt-1">Plastic & Aesthetic Mastery</span>
        </Link>

        {/* Desktop Menu - with horizontal scroll support */}
        <div ref={navRef} className="hidden lg:flex items-center overflow-x-auto no-scrollbar scroll-smooth py-4">
          <div className="flex items-center space-x-10 min-w-max">
            {navLinks.map((link) => {
              const isConcerns = link.name === 'Concerns';
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[9px] uppercase font-bold transition-all whitespace-nowrap
                    ${isConcerns ? 'tracking-[0.35em] duration-700 px-5 rounded-sm hover:bg-white/5' : 'tracking-[0.3em]'} 
                    ${isActive ? 'text-[#5DA9E9]' : (isConcerns ? 'text-stone-400 hover:text-stone-300' : 'text-gray-400 hover:text-[#5DA9E9]')}
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link to="/contact" className="px-8 py-2.5 bg-[#5DA9E9] text-black text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
              Request a consultation
            </Link>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 lg:hidden relative z-[60]">
          {/* Mobile Request Consultation Icon */}
          <Link to="/contact" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#357ABD] text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-transform hover:bg-[#2A659E]">
            <MessageCircle size={20} className="-mr-0.5 mt-0.5" />
          </Link>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="text-white shrink-0">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      {/* Mobile Menu Portal */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[45] bg-black/40 flex flex-col items-center justify-start pt-32 pb-32 space-y-8 lg:hidden overflow-y-auto"
              style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-2xl font-bold uppercase tracking-[0.2em] text-white hover:text-[#5DA9E9]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-12 py-4 bg-[#5DA9E9] text-black text-xs uppercase tracking-[0.3em] font-bold"
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
