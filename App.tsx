import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import FloatingBackground from './components/FloatingBackground.tsx';
import Home from './pages/Home.tsx';

// Lazy-load all below-fold / secondary pages for code splitting
const About = React.lazy(() => import('./pages/About.tsx'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage.tsx'));
const Gallery = React.lazy(() => import('./pages/Gallery.tsx'));
const PatientJourney = React.lazy(() => import('./pages/PatientJourney.tsx'));
const InternationalPatients = React.lazy(() => import('./pages/InternationalPatients.tsx'));
const Contact = React.lazy(() => import('./pages/Contact.tsx'));
const ProcedureDetail = React.lazy(() => import('./pages/ProcedureDetail.tsx'));
const Concerns = React.lazy(() => import('./pages/Concerns.tsx'));
const ConcernDetail = React.lazy(() => import('./pages/ConcernDetail.tsx'));
const Reviews = React.lazy(() => import('./pages/Reviews.tsx'));
const CostsAndFinancing = React.lazy(() => import('./pages/CostsAndFinancing.tsx'));
const SurgiSetPrivacy = React.lazy(() => import('./pages/SurgiSetPrivacy.tsx'));
const BlogList = React.lazy(() => import('./pages/BlogList.tsx'));
const BlogPost = React.lazy(() => import('./pages/BlogPost.tsx'));
const FAQ = React.lazy(() => import('./pages/FAQ.tsx'));

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

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isStandalone = location.pathname === '/surgiset-privacy';

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-gold-500/30 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
      {!isStandalone && <FloatingBackground />}
      {!isStandalone && <Navbar />}

      <main className="relative z-10">
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-2 border-[#4A90E2]/30 border-t-[#4A90E2] rounded-full animate-spin" /></div>}>
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
            <Route path="/surgiset-privacy" element={<SurgiSetPrivacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/procedure/:id" element={<ProcedureDetail />} />
            <Route path="/concerns" element={<Concerns />} />
            <Route path="/concerns/:region" element={<ConcernDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/services" element={<Navigate to="/aesthetic" replace />} />
            <Route path="/:id" element={<ProcedureDetail />} />
          </Routes>
        </AnimatePresence>
        </Suspense>
      </main>

      {!isStandalone && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
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
      <AppLayout />
    </Router>
  );
};

export default App;

