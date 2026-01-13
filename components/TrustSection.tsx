import React from 'react';
import { motion } from 'framer-motion';

const TrustSection: React.FC = () => {
    // Placeholders for real logos - using text for now to ensure no broken images
    const associations = [
        { name: "APSI", full: "Association of Plastic Surgeons of India" },
        { name: "IAAPS", full: "Indian Association of Aesthetic Plastic Surgeons" },
        { name: "ISAPS", full: "International Society of Aesthetic Plastic Surgery" },
        { name: "RBSPS", full: "Royal Belgian Society of Plastic Surgery" }
    ];

    return (
        <section className="py-24 border-t border-white/5 bg-neutral-950">
            <div className="container mx-auto px-6 text-center">
                <p className="text-gray-600 text-[10px] uppercase tracking-[0.4em] font-bold mb-12">
                    Member of Prestigious Global Societies
                </p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    {associations.map((assoc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-default"
                        >
                            <div className="border border-white/10 px-6 py-4 rounded-sm hover:border-[#5DA9E9]/30 transition-colors bg-white/5">
                                <h4 className="text-2xl font-serif text-gray-400 group-hover:text-white transition-colors">{assoc.name}</h4>
                                <span className="hidden absolute bg-black border border-white/10 text-xs text-gray-300 p-2 -mt-16 -ml-16 w-48 rounded shadow-xl group-hover:block z-50">
                                    {assoc.full}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
