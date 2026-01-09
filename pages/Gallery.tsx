
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const galleryImages = [
  { src: `${import.meta.env.BASE_URL}gallery-1.jpg`, title: 'Axillary Breast', category: 'Breast Surgery' },
  { src: `${import.meta.env.BASE_URL}gallery-2.jpg`, title: 'Breast Augmentation with Implant', category: 'Breast Surgery' },
  { src: `${import.meta.env.BASE_URL}gallery-3.jpg`, title: 'Breast Augmentation with Implant', category: 'Breast Surgery' },
  { src: `${import.meta.env.BASE_URL}gallery-4.jpg`, title: 'Axillary Breast', category: 'Breast Surgery' },
  { src: `${import.meta.env.BASE_URL}gallery-5.jpg`, title: 'Breast Reduction', category: 'Breast Surgery' },
  { src: `${import.meta.env.BASE_URL}gallery-6.jpg`, title: 'Keloid Excision', category: 'Reconstructive Surgery' },
  { src: `${import.meta.env.BASE_URL}gallery-7.jpg`, title: 'Ear Lobe Repair', category: 'Reconstructive Surgery' },
  { src: `${import.meta.env.BASE_URL}gallery-8.jpg`, title: 'Gynecomastia', category: 'Body Contouring' },
  { src: `${import.meta.env.BASE_URL}gallery-9.png`, title: 'Gynecomastia', category: 'Body Contouring' },
  { src: `${import.meta.env.BASE_URL}gallery-10.jpg`, title: 'Hair Transplant', category: 'Hair Restoration' },
  { src: `${import.meta.env.BASE_URL}gallery-11.png`, title: 'Lip Fat Grafting', category: 'Facial Aesthetics' },
  { src: `${import.meta.env.BASE_URL}gallery-12.png`, title: 'Mole Excision', category: 'Reconstructive Surgery' },
  { src: `${import.meta.env.BASE_URL}gallery-13.png`, title: 'Lipo-Sculpting', category: 'Body Contouring' },
  { src: `${import.meta.env.BASE_URL}gallery-14.png`, title: 'Tummy Tuck', category: 'Body Contouring' },
  { src: `${import.meta.env.BASE_URL}gallery-15.jpg`, title: 'Ear Reshaping', category: 'Reconstructive Surgery' },
  { src: `${import.meta.env.BASE_URL}gallery-16.jpg`, title: 'Xanthelasma Excision', category: 'Facial Aesthetics' },
  { src: `${import.meta.env.BASE_URL}gallery-17.jpg`, title: 'Tummy Tuck', category: 'Body Contouring' }
];

const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Handle URL hash to open specific image in lightbox
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/#image-(\d+)/);
      if (match) {
        const imageIndex = parseInt(match[1], 10);
        if (imageIndex >= 0 && imageIndex < galleryImages.length) {
          setLightboxIndex(imageIndex);
        }
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    // Clear hash when closing lightbox
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div className="pt-52 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20 space-y-6">
          <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">The Outcomes</span>
          <h1 className="text-5xl md:text-7xl font-serif">Results Gallery</h1>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Our results focus on structural harmony and natural enhancement. These are real patient outcomes showcasing the precision and artistry of Dr. Sumit's work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {galleryImages.map((image, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="group relative glass rounded-sm overflow-hidden aspect-[4/5] cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={image.src}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                alt={image.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-white font-serif text-xl mb-2">{image.title}</h4>
                  <p className="text-[#D4AF37] text-xs uppercase tracking-widest">{image.category}</p>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 text-white/20 font-serif text-4xl">0{idx + 1}</div>
            </motion.div>
          ))}
        </div>

        {/* Consent Disclaimer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-[10px] font-light tracking-wide opacity-70">
            All images have been shared with informed consent of the patient.
          </p>
        </div>
      </div>

      {/* Lightbox Portal */}
      {createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[30000] bg-black/95 backdrop-blur-xl"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-8 right-8 z-10 p-3 glass border border-white/10 hover:border-[#D4AF37]/50 transition-all group"
              >
                <X size={24} className="text-white group-hover:text-[#D4AF37] transition-colors" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-8 left-8 z-10 text-white/60 text-sm uppercase tracking-widest">
                {lightboxIndex + 1} / {galleryImages.length}
              </div>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-10 p-4 glass border border-white/10 hover:border-[#D4AF37]/50 transition-all group"
              >
                <ChevronLeft size={32} className="text-white group-hover:text-[#D4AF37] transition-colors" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-10 p-4 glass border border-white/10 hover:border-[#D4AF37]/50 transition-all group"
              >
                <ChevronRight size={32} className="text-white group-hover:text-[#D4AF37] transition-colors" />
              </button>

              {/* Image Container */}
              <div className="flex items-center justify-center h-full p-20" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="relative max-w-6xl max-h-full"
                >
                  <img
                    src={galleryImages[lightboxIndex].src}
                    alt={galleryImages[lightboxIndex].title}
                    className="max-w-full max-h-[80vh] object-contain shadow-[0_100px_200px_rgba(0,0,0,1)]"
                  />

                  {/* Image Info */}
                  <div className="absolute -bottom-16 left-0 right-0 text-center">
                    <h3 className="text-white text-xl font-serif mb-2">{galleryImages[lightboxIndex].title}</h3>
                    <p className="text-[#D4AF37] text-xs uppercase tracking-widest">{galleryImages[lightboxIndex].category}</p>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Hint */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-widest">
                Use arrow keys or click buttons to navigate
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default Gallery;
