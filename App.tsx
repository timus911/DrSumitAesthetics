import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import FloatingBackground from './components/FloatingBackground.tsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.tsx';
// Home stays statically imported: it's the most-hit entry point and the LCP
// route, so deferring it would trade first-paint for nothing. Everything else
// is split per route so e.g. a blog-post visit doesn't download the whole app.
import Home from './pages/Home.tsx';

const About = lazy(() => import('./pages/About.tsx'));
const CategoryPage = lazy(() => import('./pages/CategoryPage.tsx'));
const Gallery = lazy(() => import('./pages/Gallery.tsx'));
const PatientJourney = lazy(() => import('./pages/PatientJourney.tsx'));
const InternationalPatients = lazy(() => import('./pages/InternationalPatients.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const ProcedureDetail = lazy(() => import('./pages/ProcedureDetail.tsx'));
const Concerns = lazy(() => import('./pages/Concerns.tsx'));
const ConcernDetail = lazy(() => import('./pages/ConcernDetail.tsx'));
const Reviews = lazy(() => import('./pages/Reviews.tsx'));
const CostsAndFinancing = lazy(() => import('./pages/CostsAndFinancing.tsx'));
const SurgiSetPrivacy = lazy(() => import('./pages/SurgiSetPrivacy.tsx'));
const BlogList = lazy(() => import('./pages/BlogList.tsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.tsx'));
const FAQ = lazy(() => import('./pages/FAQ.tsx'));

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
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="min-h-screen bg-black" aria-hidden="true" />}>
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
          </Suspense>
        </AnimatePresence>
      </main>

      {!isStandalone && <Footer />}
      {!isStandalone && <FloatingWhatsApp />}
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

