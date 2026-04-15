import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageSquare, Search, Filter } from 'lucide-react';
import { PROCEDURES } from '../constants';
import SEO from '../components/SEO';

const FAQ: React.FC = () => {
    // Extract all FAQs from procedures and flatten them
    const allFaqs = PROCEDURES.flatMap(p => 
        (p.faqs || []).map(faq => ({
            ...faq,
            procedureName: p.title,
            category: p.category // Clinical category like "Body", "Face"
        }))
    );

    // Get unique categories for filtering
    const categories = ["All", ...Array.from(new Set(allFaqs.map(f => f.category)))];
    
    // State management
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = React.useState("All");
    const [searchQuery, setSearchQuery] = React.useState("");

    // Filtering logic
    const filteredFaqs = allFaqs.filter(faq => {
        const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             faq.answer.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pt-40 pb-32">
            <SEO 
                title="Frequently Asked Questions (FAQ) | Surgery & Recovery"
                description="Find answers to common questions about plastic surgery, recovery times, costs, and procedures by Dr. Sumit Singh Gautam in Chandigarh."
                url="/faqs"
                schemaType="FAQPage"
                faqs={allFaqs}
            />
            
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <span className="text-[#4A90E2] text-xs font-black uppercase tracking-[0.4em]">Expert Answers</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-white">Clinical FAQ Hub</h1>
                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                            Filter by procedure or search for specific surgical concerns.
                        </p>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="space-y-8 pt-8">
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setActiveIndex(null); // Close everything on filter change
                                        }}
                                        className={`px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 border ${
                                            selectedCategory === cat 
                                            ? 'bg-[#4A90E2] border-[#4A90E2] text-black shadow-lg shadow-[#4A90E2]/20' 
                                            : 'border-white/10 text-gray-400 hover:border-white/30'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                                <input 
                                    type="text"
                                    placeholder="Search FAQ..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-full py-2.5 pl-11 pr-6 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#4A90E2]/50 transition-colors"
                                />
                            </div>
                        </div>

                        {/* FAQ List */}
                        <div className="space-y-4 min-h-[400px]">
                            <AnimatePresence mode="popLayout">
                                {filteredFaqs.length > 0 ? (
                                    filteredFaqs.map((faq, idx) => (
                                        <motion.div 
                                            key={`${faq.procedureName}-${idx}`}
                                            layout
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.2 }}
                                            className="border border-white/5 bg-white/[0.02] rounded-sm overflow-hidden"
                                        >
                                            <button
                                                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.05] transition-colors group"
                                            >
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-[9px] uppercase tracking-widest text-[#4A90E2] font-black">
                                                            {faq.category}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-white/10" />
                                                        <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                                                            {faq.procedureName}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-white text-lg pr-8">{faq.question}</h3>
                                                </div>
                                                <div className="shrink-0 text-[#4A90E2]">
                                                    {activeIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                                </div>
                                            </button>
                                            
                                            <div 
                                                className={`transition-all duration-300 ease-in-out px-6 ${
                                                    activeIndex === idx ? 'max-h-[800px] pb-8 opacity-100' : 'max-h-0 opacity-0'
                                                } overflow-hidden`}
                                            >
                                                <div className="space-y-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-6">
                                                    {faq.answer.map((para, pIdx) => (
                                                        <p key={pIdx}>{para}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20 border border-dashed border-white/10 rounded-sm"
                                    >
                                        <p className="text-gray-500 italic">No questions found matching your criteria.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="mt-24 p-12 glass border border-[#4A90E2]/20 text-center space-y-6">
                        <MessageSquare className="mx-auto text-[#4A90E2]" size={32} />
                        <h2 className="text-2xl font-serif text-white">Still have questions?</h2>
                        <p className="text-gray-400 font-light max-w-md mx-auto">
                            The best way to understand your clinical options is a personalized consultation.
                        </p>
                        <a 
                            href="/contact" 
                            className="inline-block px-10 py-4 bg-[#4A90E2] text-black text-[10px] uppercase tracking-[0.4em] font-black rounded-sm active:scale-95 transition-transform"
                        >
                            Book a Consultation
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
