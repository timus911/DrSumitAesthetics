
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import FloatingBackground from './components/FloatingBackground.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import CategoryPage from './pages/CategoryPage.tsx';
import Gallery from './pages/Gallery.tsx';
import PatientJourney from './pages/PatientJourney.tsx';
import InternationalPatients from './pages/InternationalPatients.tsx';
import Contact from './pages/Contact.tsx';
import ProcedureDetail from './pages/ProcedureDetail.tsx';
import Concerns from './pages/Concerns.tsx';
import ConcernDetail from './pages/ConcernDetail.tsx';
import Reviews from './pages/Reviews.tsx';
import CostsAndFinancing from './pages/CostsAndFinancing.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 2,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      (window as any).lenis = null;
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-black text-white selection:bg-gold-500/30 overflow-hidden">
        <FloatingBackground />
        <Navbar />

        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/aesthetic" element={<CategoryPage type="aesthetic" />} />
              <Route path="/reconstructive" element={<CategoryPage type="reconstructive" />} />
              <Route path="/non-surgical" element={<CategoryPage type="non-surgical" />} />
              <Route path="/vascular" element={<CategoryPage type="vascular" />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/patient-journey" element={<PatientJourney />} />
              <Route path="/international" element={<InternationalPatients />} />
              <Route path="/plastic-surgery-cost-chandigarh" element={<CostsAndFinancing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/procedure/:id" element={<ProcedureDetail />} />
              <Route path="/concerns" element={<Concerns />} />
              <Route path="/concerns/:region" element={<ConcernDetail />} />
              <Route path="/:id" element={<ProcedureDetail />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
