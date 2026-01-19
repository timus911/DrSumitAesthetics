
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROCEDURES, CONTACT } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import { ChevronDown, ArrowRight, ShieldCheck, CheckCircle, CreditCard, HeartPulse, MessageCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const CostsAndFinancing: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [openProcedureId, setOpenProcedureId] = useState<string | null>(null);

    const categories = ['All', ...new Set(PROCEDURES
        .filter(p => !['Reconstructive', 'Vascular'].includes(p.category))
        .map(p => p.category))];

    const filteredProcedures = selectedCategory === 'All'
        ? PROCEDURES.filter(p => p.priceRange)
        : PROCEDURES.filter(p => p.category === selectedCategory && p.priceRange);

    return (
        <div className="pt-40 pb-32">
            <SEO
                title="Costs & Financing | Dr. Sumit Aesthetics Chandigarh"
                description="Transparent pricing for plastic surgery in Chandigarh. View cost estimates for Liposuction, Rhinoplasty, Hair Transplant, and more. EMI options available."
                url="/costs-financing"
            />

            {/* Trust Header */}
            <div className="container mx-auto px-6 mb-24">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <span className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-bold flex items-center justify-center gap-2">
                        <ShieldCheck size={14} /> Transparency & Trust
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                        Investing in Your Confidence
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed font-light">
                        We believe in honest, transparent conversations about cost. Every body is unique, and safe surgery requires a personalized approach. While final quotes are provided after a physical examination, this guide offers realistic estimates for our patients.
                    </p>
                    <div className="inline-block px-6 py-2 bg-[#4A90E2]/10 border border-[#4A90E2]/20 rounded-full">
                        <p className="text-[#4A90E2] text-xs uppercase tracking-widest font-bold">
                            Safety & Hygiene at Healing Hospital is our #1 Priority
                        </p>
                    </div>
                </div>
            </div>

            {/* Value of Consult & Comparison Guide */}
            <div className="container mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Compare Options */}
                    <div className="bg-white/5 p-8 border border-white/5 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -z-10" />

                        <h2 className="text-2xl md:text-3xl font-serif text-white mb-8">Understanding Your Quote: How to Compare Options</h2>
                        <p className="text-gray-400 text-sm leading-relaxed font-light mb-8">
                            When comparing quotes for plastic surgery in Chandigarh, it is vital to ensure you are comparing "apples to apples." A lower initial price often hides missing essentials. At our clinic, we believe in <strong>All-Inclusive Transparency</strong>.
                        </p>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-white text-sm font-bold uppercase tracking-wider">The Surgeon’s Expertise</h3>
                                <p className="text-gray-500 text-sm font-light">Is the surgeon a board-certified M.Ch Plastic Surgeon?</p>
                                <p className="text-gray-500 text-sm font-light mt-2">
                                    Is the surgeon an expert in aesthetics? Do they have a Fellowship or other specialized experience in aesthetic surgeries?
                                </p>
                                <p className="text-[#D4AF37] text-sm font-light mt-4">
                                    Value of compassion, truth and transparency
                                </p>
                                <p className="text-gray-500 text-sm font-light leading-relaxed mt-1">
                                    Has your surgeon explained about expected results? Possible complications? Roadmap and options if a complication does arise?
                                </p>
                                <p className="text-gray-500 text-sm font-light leading-relaxed mt-1">
                                    Does talking to the surgeon make you feel like they are a partner in your journey?
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-white text-sm font-bold uppercase tracking-wider">Hospital Standards</h3>
                                <p className="text-gray-500 text-sm font-light">Is the surgery in a makeshift clinic or a NABH-accredited facility like Healing Hospital?</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-white text-sm font-bold uppercase tracking-wider text-[#D4AF37]">The Hidden Essentials</h3>
                                <p className="text-gray-500 text-sm font-light mb-2">Does the quote include:</p>
                                <ul className="list-disc list-inside text-gray-400 text-sm font-light space-y-1 ml-2">
                                    <li>Anesthesia & Anesthesiologist fees?</li>
                                    <li>Operation Theater (OT) & Consumable charges?</li>
                                    <li>Post-operative nursing care and hospital stay?</li>
                                    <li>Follow up consults and care?</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <p className="text-gray-300 text-sm font-light">
                                At Dr. Sumit Aesthetics, our quotes are comprehensive. We don't believe in "surprise" bills during your recovery.
                            </p>
                        </div>
                    </div>

                    {/* Value of Consult */}
                    <div className="space-y-8">
                        <h2 className="text-2xl md:text-3xl font-serif text-white">Your Consultation: The Blueprint for Success</h2>
                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                            A consultation at Dr. Sumit Aesthetics is more than a conversation; it is a comprehensive medical evaluation. During your 45-minute session in Sector 34, Dr. Sumit performs:
                        </p>
                        <div className="space-y-6 border-l border-white/10 pl-6">
                            {[
                                { title: "Anatomical Mapping", desc: "Assessing your skin elasticity, fat distribution, and bone structure." },
                                { title: "Surgical Planning", desc: "Selecting the specific technique (e.g., PAL vs. Manual Liposuction) that fits your body type." },
                                { title: "Safety Screening", desc: "Reviewing your medical history to ensure you are a fit for anesthesia at Healing Hospital." },
                                { title: "Goal Alignment", desc: "Using reference photos and measurements to set realistic, beautiful expectations." }
                            ].map((item, i) => (
                                <div key={i}>
                                    <h4 className="text-[#4A90E2] text-xs uppercase tracking-widest font-bold mb-1">{item.title}</h4>
                                    <p className="text-gray-500 text-sm font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-white text-sm italic font-light border-t border-white/10 pt-4">
                            "By the end of this session, you won't just have a 'price'—you will have a personalized surgical roadmap."
                        </p>
                    </div>

                </div>
            </div>

            {/* Master Price Table Section */}
            <div className="container mx-auto px-2 md:px-6 mb-32 relative z-10">
                <div className="glass p-3 md:p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
                    {/* Decorative Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A90E2]/5 rounded-full blur-3xl -z-10" />

                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                        <h2 className="text-2xl font-serif text-white">Master Price Guide</h2>

                        {/* Category Filter */}
                        <div className="relative group">
                            <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-sm border border-white/10 cursor-pointer min-w-[200px] justify-between">
                                <span className="text-xs uppercase tracking-widest text-gray-400">{selectedCategory} Procedures</span>
                                <ChevronDown size={14} className="text-[#D4AF37]" />
                            </div>
                            <div
                                className="absolute top-full right-0 w-full mt-2 bg-[#111] border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 max-h-60 overflow-y-auto overscroll-contain"
                                data-lenis-prevent
                            >
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className="block w-full text-left px-4 py-3 text-xs uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 border-b border-white/5 last:border-0"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="py-3 px-1 md:py-6 md:px-4 text-[8px] md:text-[10px] uppercase tracking-wider md:tracking-[0.2em] text-[#D4AF37] font-bold w-[35%] md:w-1/3">Procedure</th>
                                    <th className="py-3 px-1 md:py-6 md:px-4 text-[8px] md:text-[10px] uppercase tracking-wider md:tracking-[0.2em] text-[#D4AF37] font-bold w-[18%] md:w-[15%] text-right md:text-left whitespace-nowrap">Range (INR)</th>
                                    <th className="py-3 px-1 md:py-6 md:px-4 text-[8px] md:text-[10px] uppercase tracking-wider md:tracking-[0.2em] text-[#D4AF37] font-bold">Key Factors</th>
                                    <th className="py-3 px-1 md:py-6 md:px-4 w-6 md:w-1/12"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProcedures.map((proc, idx) => (
                                    <React.Fragment key={proc.id}>
                                        <tr className={`border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer ${openProcedureId === proc.id ? 'bg-white/5' : ''}`} onClick={() => setOpenProcedureId(openProcedureId === proc.id ? null : proc.id)}>
                                            <td className="py-4 px-2 md:py-6 md:px-4 align-top">
                                                <span className="text-white text-xs md:text-lg block group-hover:text-[#4A90E2] transition-colors leading-snug font-semibold md:font-normal">{proc.title}</span>
                                            </td>
                                            <td className="py-4 px-2 md:py-6 md:px-4 align-top">
                                                <div className="flex flex-col text-right md:text-left">
                                                    {proc.priceRange?.split(' - ').map((price, i) => (
                                                        <span key={i} className="text-gray-300 font-mono text-xs md:text-base tracking-tight md:tracking-widest block whitespace-nowrap">
                                                            {price}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 md:py-6 md:px-4 align-top">
                                                <span className="text-gray-500 text-[11px] md:text-sm font-light block leading-snug">{proc.costFactors || "Complexity-dependent sizing & time"}</span>
                                            </td>
                                            <td className="py-4 px-1 md:py-6 md:px-4 text-right align-middle">
                                                <ChevronDown size={14} className={`text-gray-600 transition-transform ${openProcedureId === proc.id ? 'rotate-180' : ''}`} />
                                            </td>
                                        </tr>

                                        {/* Expandable Details */}
                                        <AnimatePresence>
                                            {openProcedureId === proc.id && (
                                                <tr key={`${proc.id}-details`}>
                                                    <td colSpan={4} className="p-0">
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="bg-[#111] overflow-hidden"
                                                        >
                                                            <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
                                                                <div className="flex-1 space-y-4">
                                                                    <p className="text-gray-400 text-sm font-light leading-relaxed">{proc.description}</p>
                                                                </div>

                                                                <div>
                                                                    <Link to={`/procedure/${proc.id}`} className="inline-flex items-center space-x-2 text-white border border-white/20 px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all font-bold">
                                                                        <span>View Full Procedure</span>
                                                                        <ArrowRight size={12} />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </td>
                                                </tr>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
                        <div className="flex items-center gap-2">
                            <Info size={12} />
                            <span>Estimate only. Final quote provided after clinical assessment.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* What's Included & Financial Aid Grid */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* What's Included */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-serif text-white mb-8">What's Included in Your Quote?</h3>
                        <div className="space-y-6">
                            {[
                                { title: "Surgeon's Fee", desc: "Dr. Sumit's expertise and surgical planning." },
                                { title: "Hospital Stay", desc: "Private room at Healing Hospital (Sector 34) with nursing care." },
                                { title: "OT Charges", desc: "State-of-the-art operation theater usage." },
                                { title: "Consumables & Implants", desc: "Standard medical supplies. (Premium implants charged at MRP)." },
                                { title: "Follow-up Care", desc: "No service charges for dressings or consult for the first 1-2 weeks depending on the expected recovery period." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start space-x-4 group">
                                    <CheckCircle size={20} className="text-[#D4AF37] mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                    <div>
                                        <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1">{item.title}</h4>
                                        <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Aid */}
                    <div className="space-y-12">
                        <div className="glass p-8 border border-white/5">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-3 bg-[#4A90E2]/20 rounded-full text-[#4A90E2]">
                                    <HeartPulse size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif text-white">Insurance Coverage</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500">For Reconstructive Procedures</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                                Purely cosmetic surgeries are generally not covered. However, <strong>Functional Surgeries</strong> (e.g., Reconstructive Rhinoplasty for breathing, Trauma Repair, Burn Surgery, or severe Gynecomastia with pain) may be eligible for partial insurance claims.
                            </p>
                            <Link to="/contact" className="text-[#D4AF37] text-xs uppercase tracking-widest underline hover:text-white transition-colors">Check your eligibility →</Link>
                        </div>

                        <div className="glass p-8 border border-white/5">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-3 bg-[#D4AF37]/20 rounded-full text-[#D4AF37]">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif text-white">EMI Options</h3>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500">Finance Partners</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                                We partner with leading medical finance providers (like Bajaj Finserv and others) to offer <strong>0% Interest EMI</strong> options for eligible patients, making your transformation more accessible.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-32 text-center">
                    <p className="text-white font-serif text-2xl mb-8">Ready to get an exact quote?</p>
                    <a
                        href={`https://wa.me/${CONTACT.counselorPhone.replace(/[^0-9]/g, '')}?text=Hi Dr. Sumit, I would like to get a quote for...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-3 px-10 py-5 bg-green-600 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-green-500 transition-all shadow-xl shadow-green-900/20 rounded-sm"
                    >
                        <MessageCircle size={18} />
                        <span>Get Quote via WhatsApp</span>
                    </a>
                </div>
            </div>
        </div >
    );
};

export default CostsAndFinancing;
