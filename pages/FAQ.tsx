import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, MessageSquare } from 'lucide-react';
import { PROCEDURES } from '../constants';
import SEO from '../components/SEO';

const FAQ: React.FC = () => {
    // Extract all FAQs from procedures and flatten them
    const allFaqs = PROCEDURES.flatMap(p => 
        (p.faqs || []).map(faq => ({
            ...faq,
            category: p.title
        }))
    );

    // Grouping for the UI if needed, but let's keep a searchable/expandable list
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

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
                        <h1 className="text-5xl md:text-7xl font-serif text-white">Frequently Asked <br />Questions</h1>
                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                            Comprehensive answers to common clinical and surgical concerns.
                        </p>
                    </div>

                    <div className="space-y-4 pt-12">
                        {allFaqs.map((faq, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.02 }}
                                className="border border-white/5 bg-white/[0.02] rounded-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.05] transition-colors group"
                                >
                                    <div className="space-y-1">
                                        <span className="text-[10px] uppercase tracking-widest text-[#4A90E2]/60 group-hover:text-[#4A90E2]">
                                            {faq.category}
                                        </span>
                                        <h3 className="text-white text-lg pr-8">{faq.question}</h3>
                                    </div>
                                    <div className="shrink-0 text-[#4A90E2]">
                                        {activeIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>
                                
                                <div 
                                    className={`transition-all duration-300 ease-in-out px-6 ${
                                        activeIndex === idx ? 'max-h-[500px] pb-8 opacity-100' : 'max-h-0 opacity-0'
                                    } overflow-hidden`}
                                >
                                    <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                                        {faq.answer.map((para, pIdx) => (
                                            <p key={pIdx}>{para}</p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-24 p-12 glass border border-[#4A90E2]/20 text-center space-y-6">
                        <MessageSquare className="mx-auto text-[#4A90E2]" size={32} />
                        <h2 className="text-2xl font-serif text-white">Still have questions?</h2>
                        <p className="text-gray-400 font-light max-w-md mx-auto">
                            The best way to understand your options is a personalized consultation.
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
