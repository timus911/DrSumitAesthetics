import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Info, Image as ImageIcon, Crosshair, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROCEDURES, ASSETS } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import { useMobileCenterFocus } from '../hooks/useMobileCenterFocus.ts';

const GalleryThumbnail: React.FC<{ img: string, onClick: () => void }> = ({ img, onClick }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isFocused = useMobileCenterFocus(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -10 }}
      className="group relative glass overflow-hidden rounded-sm cursor-pointer shadow-2xl border border-white/5 w-full md:w-[calc(50%-3rem)] lg:w-[calc(33.333%-4rem)] max-w-[450px]"
      onClick={onClick}
    >
      <img
        src={img}
        alt="Clinical result"
        className={`w-full h-auto transition-all duration-700 block ${isFocused ? 'grayscale-0 opacity-100' : 'grayscale opacity-60'} group-hover:grayscale-0 group-hover:opacity-100`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={`absolute bottom-6 left-6 transition-all translate-y-4 group-hover:translate-y-0 ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0'} group-hover:opacity-100`}>
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#4A90E2] font-extrabold flex items-center gap-2">
          <ImageIcon size={14} /> View Transformation
        </span>
      </div>
    </motion.div>
  );
};

const ExpandableSection: React.FC<{ title: string; shortLines: string[]; longLines?: string[] }> = ({ title, shortLines, longLines = [] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4 border-l border-white/5 pl-8 relative group">
      {/* Visual Indicator */}
      <div className="absolute left-[-1.5px] top-1 w-[3px] h-4 bg-[#4A90E2]/20 group-hover:bg-[#4A90E2] transition-all duration-500" />

      <button
        onClick={() => setOpen(!open)}
        className="text-left w-full space-y-3"
      >
        <h3 className="text-[#4A90E2] text-sm md:text-base font-bold uppercase tracking-widest group-hover:text-[#4A90E2] transition-colors">
          {title}
        </h3>
        <div className="space-y-2">
          {shortLines.map((line, i) => (
            <p key={i} className="text-gray-400 text-sm leading-relaxed font-light">{line}</p>
          ))}
          {open && longLines.map((line, i) => (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className="text-gray-500 text-sm italic leading-relaxed pt-2"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </button>
    </div>
  );
};

const ProcedureDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const procedure = PROCEDURES.find(p => p.id === id);

  if (!procedure) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <SEO title="Procedure Not Found" />
        <div className="space-y-6">
          <h2 className="text-4xl font-serif mb-6 text-white">Procedure Not Found</h2>
          <button onClick={() => navigate(-1)} className="text-[#4A90E2] uppercase tracking-widest text-xs border-b border-[#4A90E2] pb-1 font-bold">Go Back</button>
        </div>
      </div>
    );
  }

  // Fallback defaults if tailored details aren't provided in constants
  const defaultDetails = {
    whoNeeds: ["Patients seeking structural refinement and aesthetic harmony.", "Those whose concerns align with the procedure's specific corrective capabilities."],
    candidates: ["Generally healthy individuals with realistic goals.", "Non-smokers or those committed to a pre-surgical pause."],
    assessment: ["Anatomical structure and skin quality.", "Relevant medical history and lifestyle factors."],
    functional: ["Most patients are able to move around comfortably at home the same day.", "Daily activities are limited initially, but independence returns progressively."],
    backToWork: ["Typically 1–2 weeks for office-based roles.", "Physical independence is regained quickly."],
    holidays: ["A 10–14 day window is usually ideal.", "This allows for the most critical phase of healing to occur at home."],
    results: ["Initial refinement is visible as early as 2 weeks.", "Final results settle beautifully over 3–6 months."],
    recoveryTips: ["Follow the personalized post-op nutrition and hydration plan.", "Gentle movement and specialized compression as advised."],
    customFaq: undefined as { question: string; answer: string[] } | undefined
  };

  const d = procedure.details || defaultDetails;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [orientations, setOrientations] = useState<Record<string, 'h' | 'v'>>({});

  const mainImageRef = React.useRef<HTMLDivElement>(null);
  const isMainImageFocused = useMobileCenterFocus(mainImageRef);

  const galleryImages = procedure.gallery || [];

  useEffect(() => {
    galleryImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setOrientations(prev => ({
          ...prev,
          [src]: img.width >= img.height ? 'h' : 'v'
        }));
      };
    });
  }, [galleryImages]);

  const sortedGallery = [
    ...galleryImages.filter(img => orientations[img] === 'h'),
    ...galleryImages.filter(img => orientations[img] === 'v'),
    ...galleryImages.filter(img => !orientations[img])
  ];

  const horizontalImages = galleryImages.filter(img => orientations[img] === 'h');
  const verticalImages = galleryImages.filter(img => orientations[img] === 'v');
  const pendingImages = galleryImages.filter(img => !orientations[img]);

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + sortedGallery.length) % sortedGallery.length);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % sortedGallery.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, sortedGallery.length]);

  return (
    <div className="pt-52 pb-32">
      <SEO
        title={procedure.title}
        description={procedure.description || procedure.longDescription}
        image={procedure.image}
        url={`/procedure/${procedure.id}`}
      />
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <button onClick={() => navigate(-1)} className="flex items-center space-x-3 text-gray-500 hover:text-[#4A90E2] transition-colors group uppercase tracking-widest text-[10px] font-bold">
            <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
            <span>Clinical Domain</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-16"
          >
            <div className="space-y-6">
              <span className="text-[#4A90E2] text-[10px] tracking-widest uppercase font-extrabold flex items-center gap-2">
                <Crosshair size={12} /> {procedure.category} Mastery
              </span>
              <h1 className="text-5xl md:text-8xl font-serif leading-none text-white">{procedure.title}</h1>
            </div>

            <div className="prose prose-invert max-w-none text-gray-400 text-lg font-light leading-relaxed space-y-6">
              <p>{procedure.longDescription}</p>

              {/* Rich SEO Content Rendering */}
              {procedure.seoContent && (
                <div className="mt-12 space-y-6 pt-12 border-t border-white/5">
                  {procedure.seoContent.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <br key={i} className="hidden" />; // Skip empty lines visually but keep key structure

                    if (trimmed.startsWith('### ')) {
                      return <h3 key={i} className="text-2xl font-serif text-white pt-6 pb-2">{trimmed.replace('### ', '')}</h3>;
                    }
                    if (trimmed.startsWith('#### ')) {
                      return <h4 key={i} className="text-xl font-serif text-[#4A90E2] pt-4">{trimmed.replace('#### ', '')}</h4>;
                    }
                    if (trimmed.startsWith('**')) {
                      // Convert **Heading:** to a proper styled sub-heading
                      return (
                        <h5 key={i} className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest pt-4 pb-1 border-b border-white/5 inline-block">
                          {trimmed.replace(/\*\*/g, '')}
                        </h5>
                      );
                    }
                    if (trimmed.startsWith('* ')) {
                      const listText = trimmed.replace('* ', '');
                      const parts = listText.split(/(\*\*.*?\*\*)/g);
                      return (
                        <div key={i} className="flex items-start space-x-3 ml-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4A90E2] mt-2.5 shrink-0" />
                          <span className="text-gray-400">
                            {parts.map((part, index) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </span>
                        </div>
                      );
                    }
                    // Handle inline links locally if needed, for now stripping standard markdown link syntax for simplicity or rendering text
                    const linkMatch = trimmed.match(/\[(.*?)\]\((.*?)\)/);
                    if (linkMatch) {
                      return (
                        <Link key={i} to={linkMatch[2]} className="text-[#4A90E2] hover:underline font-bold inline-block mt-2">
                          {linkMatch[1]}
                        </Link>
                      );
                    }

                    // Handle inline bolding **text**
                    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i} className="text-gray-400">
                        {parts.map((part, index) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>

            {procedure.id === 'fat-grafting' && (
              <div className="space-y-16 pt-12 border-t border-white/5">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-serif text-white">Fat grafting, tailored to the face and body</h2>
                  <p className="text-gray-400 text-lg font-light leading-relaxed">
                    Fat grafting is not a single, uniform procedure. Different areas of the body require different approaches — depending on whether the goal is volume, contour, skin quality, or fine detail. Using the right technique for the right area is essential for natural, predictable results.
                  </p>
                  <p className="text-[#4A90E2] text-sm uppercase tracking-widest font-bold">Approach: Matching technique to tissue</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8 glass p-10 border-l border-white/5">
                    <h3 className="text-xl font-serif text-white border-b border-white/5 pb-4 text-[#4A90E2]">Facial Fat Grafting</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Requires a higher degree of refinement, as the tissues are delicate and changes are immediately visible.</p>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-widest text-[#4A90E2] font-bold">Microfat (Face)</h4>
                        <p className="text-gray-500 text-xs">Used for structural volume in cheeks, temples, or under-eye region.</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-widest text-[#4A90E2] font-bold">Nanofat</h4>
                        <p className="text-gray-500 text-xs">For skin quality, texture, and fine lines in eyelids or perioral region.</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-widest text-[#4A90E2] font-bold">SNIF</h4>
                        <p className="text-gray-500 text-xs">Sharp Needle Intradermal placement for precise dermal refinement.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 glass p-10 border-l border-white/5 flex flex-col justify-between">
                    <div className="space-y-8">
                      <h3 className="text-xl font-serif text-white border-b border-white/5 pb-4 text-[#4A90E2]">Body Fat Grafting</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Focuses primarily on volume restoration and contour enhancement, where durability and integration are key.</p>
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-widest text-[#4A90E2] font-bold">Microfat (Body)</h4>
                        <p className="text-gray-500 text-xs">Stable fat transfer suited to thicker tissues like breasts and buttocks.</p>
                      </div>
                    </div>
                    <div className="pt-8 border-t border-white/5">
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest italic leading-relaxed">
                        Technique choice depends on your anatomy and skin quality, determined during consultation.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Structured Reassurance Sections - Hidden for Reconstructive as requested */}
            {procedure.parentCategory !== 'reconstructive' && (
              <div className="space-y-12 pt-16 border-t border-white/5">
                <ExpandableSection
                  title={`Who needs a ${procedure.title}?`}
                  shortLines={[]}
                  longLines={d.whoNeeds}
                />

                <ExpandableSection
                  title="Ideal Candidate Profile"
                  shortLines={[]}
                  longLines={d.candidates}
                />

                <ExpandableSection
                  title="Clinical Assessment"
                  shortLines={[]}
                  longLines={d.assessment}
                />

                <ExpandableSection
                  title="Immediate Functionality"
                  shortLines={[]}
                  longLines={d.functional}
                />

                <ExpandableSection
                  title="Return to Professional Life"
                  shortLines={[]}
                  longLines={d.backToWork}
                />

                <ExpandableSection
                  title="Recommended Healing Window"
                  shortLines={[]}
                  longLines={d.holidays}
                />

                <ExpandableSection
                  title="Final Aesthetic Maturation"
                  shortLines={[]}
                  longLines={d.results}
                />

                <ExpandableSection
                  title="Optimization Protocol"
                  shortLines={[]}
                  longLines={d.recoveryTips}
                />

                {d.customFaq && (
                  <ExpandableSection
                    title={d.customFaq.question}
                    shortLines={[]}
                    longLines={d.customFaq.answer}
                  />
                )}

                <ExpandableSection
                  title="What determines the cost of procedure?"
                  shortLines={[]}
                  longLines={procedure.costFactors ? procedure.costFactors.split(',') : ["Complexity-dependent sizing & time"]}
                />

                <div className="pt-8">
                  <p className="text-gray-400 text-sm italic mb-12">Every anatomy is unique. During your consultation, we'll map out a timeline tailored specifically to your body's healing response.</p>
                  {(procedure.parentCategory === 'aesthetic' || procedure.parentCategory === 'non-surgical') && (
                    <Link to="/contact" className="text-[10px] uppercase tracking-[0.4em] text-gray-400 hover:text-[#4A90E2] transition-colors font-bold group flex items-center gap-2">
                      If this resonates, let's talk <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {procedure.subSections && (
              <div className="space-y-8 pt-16 border-t border-white/5">
                <h3 className="text-white uppercase tracking-widest text-[10px] font-extrabold text-[#4A90E2]">Technical Modalities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {procedure.subSections.map((sub, i) => (
                    <div key={i} className="flex items-center space-x-4 glass p-6 border-l-4 border-[#4A90E2]/30 group hover:border-[#4A90E2] transition-all shadow-lg shadow-[#4A90E2]/5">
                      <CheckCircle size={18} className="text-[#4A90E2]" />
                      <span className="text-xs uppercase tracking-widest text-white font-bold">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12 lg:sticky lg:top-32"
          >
            <div ref={mainImageRef} className="aspect-video glass rounded-sm overflow-hidden relative shadow-2xl border border-white/5 group">
              <img src={procedure.image || ASSETS.surgeryTheater} alt={procedure.title} className={`w-full h-full object-cover transition-all duration-1000 ${isMainImageFocused ? 'grayscale-0 opacity-90' : 'opacity-60 grayscale'} group-hover:grayscale-0 group-hover:opacity-90`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            <div className="glass p-12 space-y-12 border border-[#4A90E2]/10 shadow-2xl backdrop-blur-3xl">
              <div className="pt-0 border-b border-white/5 pb-8">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-6">Discuss your transformation</p>
                <Link to="/contact" className="w-full text-center px-8 py-4 bg-[#4A90E2] text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all inline-block shadow-lg">
                  Request Specialized Consultation
                </Link>
              </div>

              <div className="pt-4">
                <h4 className="text-white font-serif text-3xl mb-8">Procedural Brief</h4>
                <div className="space-y-8">
                  {[
                    { label: "Operation Time", val: procedure.brief?.operationTime || "2 - 4.5 Hours" },
                    { label: "Anesthesia Mode", val: procedure.brief?.anesthesia || "General / Deep Sedation" },
                    { label: "Clinical Recovery", val: procedure.brief?.recovery || "10 - 14 Days" },
                    { label: "Refinement Window", val: procedure.brief?.refinement || "Matures at 6 - 9 months" },
                    ...(procedure.brief?.technique ? [{ label: "Technique", val: procedure.brief.technique }] : []),
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-4 group">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-extrabold group-hover:text-[#4A90E2] transition-colors">{stat.label}</span>
                      <span className="text-sm text-white font-bold tracking-wider">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#4A90E2]/5 border border-[#4A90E2]/20 p-8 flex items-start space-x-5 shadow-inner">
                <Info size={20} className="text-[#4A90E2] mt-1 shrink-0" />
                <p className="text-[11px] text-[#4A90E2]/50 leading-relaxed font-light uppercase tracking-wider">
                  Surgical results are contingent upon individual anatomical dynamics. A comprehensive pre-operative examination is required to finalize operative strategies.
                </p>
              </div>
            </div>

            {/* Removed duplicate CTA link */}
          </motion.div>
        </div>

        {/* Clinical Results Section - Only shown if gallery images exist */}
        {procedure.gallery && procedure.gallery.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-40 border-t border-white/5 pt-32"
          >
            <div className="text-center mb-24 space-y-6">
              <div className="inline-block px-5 py-2 bg-[#4A90E2]/10 border border-[#4A90E2]/20 rounded-full shadow-lg shadow-[#4A90E2]/5">
                <span className="text-[#4A90E2] text-[10px] tracking-[0.4em] uppercase font-bold">Clinical Masterclass</span>
              </div>
            </div>

            <div className="space-y-24">
              {/* Horizontal Group */}
              {horizontalImages.length > 0 && (
                <div className="flex flex-wrap justify-center gap-12">
                  {horizontalImages.map((img) => {
                    const fullIdx = sortedGallery.indexOf(img);
                    return (
                      <GalleryThumbnail key={img} img={img} onClick={() => setLightboxIndex(fullIdx)} />
                    );
                  })}
                </div>
              )}

              {/* Vertical Group */}
              {verticalImages.length > 0 && (
                <div className="flex flex-wrap justify-center gap-12">
                  {verticalImages.map((img) => {
                    const fullIdx = sortedGallery.indexOf(img);
                    return (
                      <GalleryThumbnail key={img} img={img} onClick={() => setLightboxIndex(fullIdx)} />
                    );
                  })}
                </div>
              )}

              {/* Pending Load Group */}
              {pendingImages.length > 0 && pendingImages.length === galleryImages.length && (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-2 border-[#4A90E2]/20 border-t-[#4A90E2] rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Lightbox Rendering */}
            {lightboxIndex !== null && createPortal(
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors z-[110]"
                >
                  <X size={32} />
                </button>

                <button
                  onClick={goToPrevious}
                  className="absolute left-10 text-white/50 hover:text-white transition-colors z-[110] p-4"
                >
                  <ChevronLeft size={48} strokeWidth={1} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-10 text-white/50 hover:text-white transition-colors z-[110] p-4"
                >
                  <ChevronRight size={48} strokeWidth={1} />
                </button>

                <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={lightboxIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      src={sortedGallery[lightboxIndex]}
                      alt="Clinical Result"
                      className="max-w-full max-h-[80vh] object-contain shadow-2xl"
                    />
                  </AnimatePresence>

                  <div className="mt-8 flex items-center space-x-12">
                    <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-bold">
                      {String(lightboxIndex + 1).padStart(2, '0')} <span className="mx-4 text-white/10">|</span> {String(sortedGallery.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>,
              document.body
            )}

            <div className="mt-32 p-16 glass border border-[#4A90E2]/10 text-center shadow-inner">
              <p className="text-[11px] text-gray-500 italic leading-loose max-w-4xl mx-auto uppercase tracking-widest font-light">
                * Note: To preserve patient dignity and ensure the highest clinical standards, specific anatomical outcome data is restricted to secure, in-person clinical review. The imagery provided is illustrative of the surgical mastery and expected anatomical response.
              </p>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProcedureDetail;
