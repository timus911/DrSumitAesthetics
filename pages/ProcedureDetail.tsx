import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Info, Crosshair, MessageCircle } from 'lucide-react';
import { PROCEDURES, ASSETS, CONTACT } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import Breadcrumbs from '../components/Breadcrumbs.tsx';
import FAQ from '../components/FAQ.tsx';
import ProcedureCard from '../components/ProcedureCard.tsx';
import FellowshipProvenance from '../components/FellowshipProvenance.tsx';
import ProcedureVideos from '../components/ProcedureVideos.tsx';
import CredentialsStrip from '../components/CredentialsStrip.tsx';
import ReviewedBy from '../components/ReviewedBy.tsx';
import { useMobileCenterFocus } from '../hooks/useMobileCenterFocus.ts';

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

  const mainImageRef = React.useRef<HTMLDivElement>(null);
  const isMainImageFocused = useMobileCenterFocus(mainImageRef);

  // Procedures a visitor is most likely to consider alongside this one:
  // shared body regions first, then same category, capped at 3.
  const relatedProcedures = [
    ...PROCEDURES.filter(p =>
      p.id !== procedure.id &&
      p.regions?.some(r => procedure.regions?.includes(r))
    ),
    ...PROCEDURES.filter(p =>
      p.id !== procedure.id &&
      p.category === procedure.category &&
      !p.regions?.some(r => procedure.regions?.includes(r))
    ),
  ].slice(0, 3);

  return (
    <div className="pt-52 pb-32">
      <SEO
        titleOverride={procedure.seoTitle}
        title={`${procedure.title} in Chandigarh`}
        description={procedure.metaDescription || procedure.description || procedure.longDescription?.slice(0, 160)}
        image={procedure.image}
        url={`/${id}`}
        schemaType="HowTo"
        procedureName={procedure.title}
        priceRange={procedure.priceRange}
        lastReviewed={procedure.reviewedOn}
        howToSteps={[
          { name: "Immediate Recovery", text: procedure.details?.functional?.[0] || "Begin early mobilization and follow prescribed post-op care." },
          { name: "Work Readiness", text: procedure.details?.backToWork?.[0] || "Typical return to light work within 10-14 days." },
          { name: "Final Refinement", text: procedure.details?.results?.[1] || "Full maturity of results visible at 6-12 months." }
        ]}
      />
      <div className="container mx-auto px-6">
        <Breadcrumbs
          items={[
            { name: procedure.parentCategory, path: `/${procedure.parentCategory}` },
            { name: procedure.title, path: `/${procedure.id}` }
          ]}
        />
        <div className="mb-12 mt-8">
          <button onClick={() => navigate(-1)} className="flex items-center space-x-3 text-gray-300 hover:text-[#4A90E2] transition-colors group uppercase tracking-widest text-[10px] font-bold">
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
                <Crosshair size={12} /> {procedure.category}
              </span>
              <h1 className="text-5xl md:text-8xl font-serif leading-none text-white">{procedure.h1 || `${procedure.title.replace(/\s*\([^)]*\)/g, '').trim()} in Chandigarh`}</h1>
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
                        <Link key={i} to={linkMatch[2].startsWith('/') ? `${linkMatch[2].replace(/\/+$/, '')}/` : linkMatch[2]} className="text-[#4A90E2] hover:underline font-bold block w-fit mt-2">
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

            {procedure.id === 'fat-grafting-chandigarh' && (
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
                        <p className="text-gray-300 text-xs">Used for structural volume in cheeks, temples, or under-eye region.</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-widest text-[#4A90E2] font-bold">Nanofat</h4>
                        <p className="text-gray-300 text-xs">For skin quality, texture, and fine lines in eyelids or perioral region.</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-widest text-[#4A90E2] font-bold">SNIF</h4>
                        <p className="text-gray-300 text-xs">Sharp Needle Intradermal placement for precise dermal refinement.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 glass p-10 border-l border-white/5 flex flex-col justify-between">
                    <div className="space-y-8">
                      <h3 className="text-xl font-serif text-white border-b border-white/5 pb-4 text-[#4A90E2]">Body Fat Grafting</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">Focuses primarily on volume restoration and contour enhancement, where durability and integration are key.</p>
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-widest text-[#4A90E2] font-bold">Microfat (Body)</h4>
                        <p className="text-gray-300 text-xs">Stable fat transfer suited to thicker tissues like breasts and buttocks.</p>
                      </div>
                    </div>
                    <div className="pt-8 border-t border-white/5">
                      <p className="text-gray-300 text-[10px] uppercase tracking-widest italic leading-relaxed">
                        Technique choice depends on your anatomy and skin quality, determined during consultation.
                      </p>
                    </div>
                  </div>
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

            {procedure.videos && procedure.videos.length > 0 && (
              <ProcedureVideos videos={procedure.videos} procedureTitle={procedure.title} />
            )}

            {procedure.fellowshipAnchor && <FellowshipProvenance />}

            {procedure.faqs && procedure.faqs.length > 0 && (
              <FAQ items={procedure.faqs} />
            )}

            {procedure.reviewedOn && (
              <ReviewedBy reviewedOn={procedure.reviewedOn} references={procedure.references} />
            )}

            {relatedProcedures.length > 0 && (
              <div className="space-y-8 pt-12 border-t border-white/5">
                <h2 className="text-3xl font-serif text-white">Related Procedures</h2>
                <p className="text-gray-400 text-sm font-light">Treatments often considered alongside {procedure.title}:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProcedures.map((rel, idx) => (
                    <ProcedureCard key={rel.id} proc={rel} index={idx} hideDescription />
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
              <img
                src={procedure.image || ASSETS.surgeryTheater}
                alt={procedure.title}
                className={`w-full h-full object-cover transition-all duration-500 ${isMainImageFocused ? 'grayscale-0 opacity-90' : 'opacity-60 grayscale'} group-hover:grayscale-0 group-hover:opacity-90`}
                loading="eager"
                width={1200}
                height={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            <div className="glass p-12 space-y-12 border border-[#4A90E2]/10 shadow-2xl backdrop-blur-3xl">
              <div className="pt-0 border-b border-white/5 pb-8 space-y-4">
                <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-6">Questions about this procedure</p>
                <Link to="/contact/" className="w-full text-center px-8 py-4 bg-[#4A90E2] text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all inline-block shadow-lg">
                  Contact
                </Link>
                <a
                  href={`https://wa.me/${CONTACT.counselorPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello, I have a question about ${procedure.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-8 py-4 border border-[#25D366]/40 text-[#25D366] font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#25D366] hover:text-black transition-all inline-flex items-center justify-center gap-3"
                >
                  <MessageCircle size={14} />
                  <span>Ask on WhatsApp</span>
                </a>
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
                    ...(procedure.priceRange ? [{ label: "Fee Range", val: procedure.priceRange }] : []),
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-4 group">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gray-300 font-extrabold group-hover:text-[#4A90E2] transition-colors">{stat.label}</span>
                      <span className="text-sm text-white font-bold tracking-wider">{stat.val}</span>
                    </div>
                  ))}
                </div>
                {procedure.priceRange && (
                  <Link to="/plastic-surgery-cost-chandigarh/" className="inline-block mt-6 text-[10px] uppercase tracking-[0.2em] text-[#4A90E2] font-bold hover:text-white transition-colors">
                    View Full Price Guide &rarr;
                  </Link>
                )}
              </div>

              <div className="bg-[#4A90E2]/5 border border-[#4A90E2]/20 p-8 flex items-start space-x-5 shadow-inner">
                <Info size={20} className="text-[#4A90E2] mt-1 shrink-0" />
                <p className="text-[11px] text-[#4A90E2]/50 leading-relaxed font-light uppercase tracking-wider">
                  Results vary from person to person and no outcome can be guaranteed. The plan is decided only after an examination.
                </p>
              </div>
            </div>

            <CredentialsStrip />

            {/* Removed duplicate CTA link */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProcedureDetail;

