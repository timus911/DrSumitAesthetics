import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export interface FAQItem {
    question: string;
    answer: string[];
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, title = "Frequently Asked Questions" }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!items || items.length === 0) return null;

    // Generate FAQPage schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.join(' ')
            }
        }))
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            </Helmet>

            <div className="space-y-6 pt-12 border-t border-white/5">
                <h3 className="text-3xl font-serif text-white">{title}</h3>
                <p className="text-[#4A90E2] text-sm uppercase tracking-widest font-bold mb-8">People Also Ask</p>

                <div className="space-y-4">
                    {items.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className="glass border border-white/5 rounded-sm overflow-hidden transition-colors">
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full text-left p-6 flex items-center justify-between hover:bg-white/5 transition-colors focus:outline-none focus:bg-white/5"
                                >
                                    <span className="text-white font-bold">{item.question}</span>
                                    <ChevronDown
                                        size={20}
                                        className={`text-[#4A90E2] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed space-y-4 border-t border-white/5 mt-4">
                                                {item.answer.map((para, i) => (
                                                    <p key={i}>{para}</p>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default FAQ;

