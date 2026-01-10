import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useTransform, Variants, AnimatePresence } from 'framer-motion';
import { Award, GraduationCap, Globe, Box, Scissors, Brush, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BRAND, ASSETS } from '../constants.ts';
import SEO from '../components/SEO.tsx';

// Gallery images array
const galleryImages = [
  { src: `${import.meta.env.BASE_URL}gallery-1.jpg`, title: 'Axillary Breast' },
  { src: `${import.meta.env.BASE_URL}gallery-2.jpg`, title: 'Breast Augmentation with Implant' },
  { src: `${import.meta.env.BASE_URL}gallery-3.jpg`, title: 'Breast Augmentation with Implant' },
  { src: `${import.meta.env.BASE_URL}gallery-4.jpg`, title: 'Axillary Breast' },
  { src: `${import.meta.env.BASE_URL}gallery-5.jpg`, title: 'Breast Reduction' },
  { src: `${import.meta.env.BASE_URL}gallery-6.jpg`, title: 'Keloid Excision' },
  { src: `${import.meta.env.BASE_URL}gallery-7.jpg`, title: 'Ear Lobe Repair' },
  { src: `${import.meta.env.BASE_URL}gallery-8.jpg`, title: 'Gynecomastia' },
  { src: `${import.meta.env.BASE_URL}gallery-9.png`, title: 'Gynecomastia' },
  { src: `${import.meta.env.BASE_URL}gallery-10.jpg`, title: 'Hair Transplant' },
  { src: `${import.meta.env.BASE_URL}gallery-11.png`, title: 'Lip Fat Grafting' },
  { src: `${import.meta.env.BASE_URL}gallery-12.png`, title: 'Mole Excision' },
  { src: `${import.meta.env.BASE_URL}gallery-13.png`, title: 'Lipo-Sculpting' },
  { src: `${import.meta.env.BASE_URL}gallery-14.png`, title: 'Tummy Tuck' },
  { src: `${import.meta.env.BASE_URL}gallery-15.jpg`, title: 'Ear Reshaping' },
  { src: `${import.meta.env.BASE_URL}gallery-16.jpg`, title: 'Xanthelasma Excision' },
  { src: `${import.meta.env.BASE_URL}gallery-17.jpg`, title: 'Tummy Tuck' }
];

const About: React.FC = () => {
  const navigate = useNavigate();

  // Randomize and shuffle gallery images for the vertical scroll effect
  const shuffledImages = React.useMemo(() => {
    const images = [...galleryImages];
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
    return images;
  }, []);

  // Mouse hover tilt effect for the main portrait
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springY, [0, 1], [12, -12]);
  const rotateY = useTransform(springX, [0, 1], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

  const handleGalleryImageClick = (index: number) => {
    navigate(`/gallery#image-${index}`);
  };



  // Explicitly type as Variants to avoid inference issues with nested properties
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  // Explicitly type as Variants to ensure 'ease' property is recognized as valid Easing type
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="pt-60 pb-32 overflow-hidden relative">
      <SEO
        title="About Dr. Sumit Singh Gautam | Board Certified Plastic Surgeon"
        description="Learn about Dr. Sumit Singh Gautam's artistic background, triple board certification, and philosophy of bridging surgical science with fine art."
        url="/about"
      />
      {/* Background Image with Overlay - Top Section Only */}
      <div className="absolute top-0 left-0 w-full h-[120vh] z-0 pointer-events-none">
        <img
          src={ASSETS.aboutBackground}
          alt="Surgical Artistry Background"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient mask to fade into bottom dark theme - Made stronger for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-[#0a0a0a]/90 to-[#0a0a0a]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-12">
            <motion.div variants={fadeInUp} className="space-y-8">
              <span className="text-[#4A90E2] text-[12px] tracking-[0.6em] uppercase font-black text-blue-400">Board Certified Plastic and Aesthetic Surgeon</span>
              <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] text-white tracking-tighter">{BRAND.name}</h1>
              <p className="text-[#4A90E2] tracking-[0.5em] uppercase text-[12px] font-bold">{BRAND.specialty}</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="prose prose-invert text-gray-400 max-w-none space-y-10 text-xl leading-relaxed font-light">
              <p>
                Dr. Sumit Singh Gautam is a board-certified Plastic Surgeon who bridges the gap between surgical science and fine art.
              </p>
              <p>
                His academic journey began at <strong>GMCH-32, Chandigarh</strong> (MBBS and MS), followed by a specialization in Plastic & Reconstructive Surgery from <strong>DMC Ludhiana</strong> (MCh).
              </p>
              <p>
                He further honed his expertise with an <strong>International Fellowship in Aesthetic Surgery</strong> under the pioneers of facial rejuvenation, <strong>Dr. Patrick Tonnard and Dr. Alexis Verpaele</strong>. Imbibing a world-renowned standard of surgical precision, he has mastered advanced techniques that prioritize minimal invasiveness with maximum impact.
              </p>
              <p>
                However, his true distinction lies in his dual identity as an artist. Years of discipline in <strong>sketching, painting, sculpting</strong> have gifted him a unique spatial awareness, allowing him to see the human form not just as tissues to be repaired, but as a masterpiece to be restored.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-16">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Brush className="text-[#4A90E2]" size={24} />
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-white">Fine Arts Mastery</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">Integrating the principles of light, shadow, and proportion from art into surgery.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <GraduationCap className="text-[#4A90E2]" size={24} />
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-white">Board Certified</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">Board-certified background ensuring a comprehensive surgical perspective on form and function.</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="relative perspective-2000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative aspect-[3/4] group"
            >
              {/* Photo 1: Portrait */}
              <img
                src={`${import.meta.env.BASE_URL}dr-sumit-profile.png`}
                alt="Dr. Sumit Professional Portrait"
                className="w-full h-full object-contain drop-shadow-2xl filter brightness-110 contrast-110"
              />
              {/* Gradient Mask for bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-16 -left-16 glass p-12 max-w-sm space-y-6 border border-blue-500/30 backdrop-blur-3xl shadow-2xl"
            >
              <p className="text-gray-200 italic text-lg leading-relaxed font-light">"Surgical mastery is the ethical application of science to restore and refine the natural human form."</p>
              <p className="text-[#4A90E2] text-[11px] uppercase tracking-[0.5em] font-black text-blue-400">— {BRAND.shortName}</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Artistic Section */}
        <section className="mt-32 pt-16 border-t border-white/5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center"
          >
            <div className="order-1 lg:order-2 space-y-16">
              <motion.div variants={fadeInUp} className="space-y-6">
                <span className="text-[#4A90E2] text-[11px] tracking-[0.6em] uppercase font-black text-blue-400">Multidisciplinary Vision</span>
                <h2 className="text-5xl md:text-8xl font-serif text-white leading-tight">The Visualist <br /><span className="text-blue-500">Mentality</span></h2>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-gray-400 text-2xl leading-relaxed font-light">
                {BRAND.artisticBackground.description}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <a href="https://www.instagram.com/snackasketch/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 text-xs tracking-[0.2em] font-sans font-medium text-[#4A90E2] hover:text-white transition-colors group">
                  <div className="p-2 border border-blue-500/30 rounded-full group-hover:bg-blue-500/10 transition-colors">
                    <Instagram size={16} />
                  </div>
                  <span>@snackasketch</span>
                  <span className="text-[10px] text-gray-500 tracking-wider group-hover:text-blue-200 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300">The Artistic Side</span>
                </a>
              </motion.div>

              <div className="space-y-12">
                {[
                  { icon: <Brush className="text-[#4A90E2]" size={28} />, title: "Painting & Illustration", desc: "Mastery of lighting, depth, and anatomical contours translated into surgical precision." },
                  { icon: <Box className="text-[#4A90E2]" size={28} />, title: "3D Digital Design", desc: "Pre-modeling complex structural corrections in virtual space before the first incision." },
                  { icon: <Scissors className="text-[#4A90E2]" size={28} />, title: "Sculpture", desc: "Developing the tactile awareness and hand-eye coordination required for micro-surgery." }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="flex items-start space-x-8 group">
                    <div className="w-16 h-16 glass flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:border-blue-400 transition-colors shadow-2xl">
                      {item.icon}
                    </div>
                    <div className="space-y-2 pt-1">
                      <h4 className="text-white text-sm uppercase tracking-[0.4em] font-black">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="order-2 lg:order-1 relative h-[700px] overflow-hidden rounded-sm glass border border-blue-500/10 shadow-2xl">
              <motion.div
                animate={{ y: [0, -300, 0] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" as const }}
                className="grid grid-cols-2 gap-8 p-8"
              >
                {/* Real Gallery Images with Individual Hover Effects */}
                {shuffledImages.map((image, idx) => (
                  <motion.img
                    key={idx}
                    variants={fadeInUp}
                    src={image.src}
                    className={`opacity-60 rounded-sm shadow-lg cursor-pointer transition-all duration-500 ${hoveredImageIndex === idx ? 'grayscale-0 hover:opacity-100' : 'grayscale'
                      }`}
                    alt={image.title}
                    onMouseEnter={() => setHoveredImageIndex(idx)}
                    onMouseLeave={() => setHoveredImageIndex(null)}
                    onClick={() => handleGalleryImageClick(idx)}
                  />
                ))}
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* Personal Moments Section */}
        <section className="mt-32 border-t border-white/5 pt-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-24"
          >
            <motion.div variants={fadeInUp} className="text-center space-y-6">
              <span className="text-[#4A90E2] text-[11px] tracking-[0.6em] uppercase font-black text-blue-400">Behind the Scrubs</span>
              <h2 className="text-5xl md:text-7xl font-serif text-white">Moments in Medicine</h2>
            </motion.div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 min-h-[800px] p-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <motion.div
                  key={num}
                  variants={fadeInUp}
                  className="break-inside-avoid relative group overflow-hidden rounded-sm border border-white/5"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}personal/personal-${num}.jpg`}
                    alt={`Dr. Sumit Personal Moment ${num}`}
                    className="w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Academic Section */}
        <section className="mt-32">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-32 space-y-6"
          >
            <span className="text-[#4A90E2] text-[11px] tracking-[0.6em] uppercase font-black text-blue-400">Institutional Merit</span>
            <h2 className="text-5xl md:text-7xl font-serif text-white">Academic Path</h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {BRAND.education.map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="glass p-6 space-y-8 relative overflow-hidden group border border-white/5 transition-all hover:bg-blue-900/10 shadow-2xl">
                <div className="absolute top-0 left-0 w-1.5 h-0 bg-[#4A90E2] group-hover:h-full transition-all duration-700" />
                <Award size={36} className="text-[#4A90E2]/40 group-hover:text-[#4A90E2] transition-colors" />
                <p className="text-white text-lg font-sans font-light tracking-wider uppercase">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* The Ghent Legacy */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 glass p-6 lg:p-32 relative overflow-hidden border border-blue-500/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 right-0 p-24 opacity-[0.03] select-none pointer-events-none">
            <Brush size={600} className="text-[#4A90E2]" />
          </div>
          <div className="max-w-4xl space-y-12 relative z-10">
            <span className="text-[#4A90E2] text-[12px] tracking-[0.6em] uppercase font-black text-blue-400">The Artist's Eye</span>
            <h2 className="text-4xl md:text-7xl font-serif text-white leading-[1.1]">Sculpting the <br />Human Canvas</h2>
            <p className="text-gray-400 text-lg md:text-2xl leading-relaxed font-light">
              "To me, surgery is sculpting in a living medium. Every incision is a brushstroke, every suture a line of definition. I do not just operate; I curate the natural beauty that resides within the patient, bringing it to the surface with the gentle precision of an artist."
            </p>

            {/* User's Watercolor Painting - Subtle Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="pt-12 flex flex-col items-start gap-6 group cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
            >
              <div className="relative w-64 md:w-80 aspect-square glass p-2 border border-white/10 shadow-2xl rotate-[-2deg] group-hover:rotate-0 transition-all duration-700 overflow-hidden">
                <img
                  src={ASSETS.verpaelePainting}
                  alt="Watercolor of Dr. Verpaele"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
              </div>
              <div className="flex items-center gap-4 pl-2 opacity-40 group-hover:opacity-80 transition-opacity">
                <div className="w-8 h-[1px] bg-[#4A90E2]" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-300">A Mentor's Wisdom: Teachings from Dr. Verpaele</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Lightbox Overlays */}
        {createPortal(
          <AnimatePresence>
            {isLightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-xl cursor-zoom-out"
                onClick={() => setIsLightboxOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="relative max-w-[90vw] max-h-[85vh] shadow-[0_100px_200px_rgba(0,0,0,1)] border border-white/5"
                >
                  <img
                    src={ASSETS.verpaelePainting}
                    alt="Watercolor of Dr. Verpaele Full Resolution"
                    className="w-full h-full object-contain"
                  />

                  {/* Subtle Close Hint */}
                  <div className="absolute -top-12 right-0 text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">
                    Click anywhere to close
                  </div>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>,
          document.body
        )}
      </div>
    </div>
  );
};

export default About;
