import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, UserCheck, Stethoscope } from 'lucide-react';
import { BRAND } from '../constants.ts';

const MedicalAuthority: React.FC = () => {
    return (
        <section className="py-32 relative border-t border-white/5 bg-gradient-to-b from-black to-[#0a0a0a]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-bold flex items-center gap-3">
                                <div className="w-8 h-[1px] bg-[#D4AF37]" />
                                Medical Authority
                            </span>
                            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                                Combining Safety <br /> with <span className="text-[#4A90E2] italic opacity-80">Surgical Artistry</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl">
                                Dr. Sumit Singh Gautam is a <strong className="text-white">Board Certified Plastic Surgeon</strong> committed to the highest standards of safety, ethics, and transparency.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: <Award size={24} />,
                                    title: "Board Certified",
                                    desc: "MCh Plastic Surgery - The highest qualification in the field."
                                },
                                {
                                    icon: <Stethoscope size={24} />,
                                    title: "Fellowship Trained",
                                    desc: "Specialized training in Aesthetic Surgery from Belgium (The Coupure Centre)."
                                },
                                {
                                    icon: <UserCheck size={24} />,
                                    title: "Patient Safety",
                                    desc: "Operating exclusively at fully accredited hospitals with advanced ICU backup."
                                },
                                {
                                    icon: <BookOpen size={24} />,
                                    title: "Academic Excellence",
                                    desc: "Published author in international journals and faculty at national conferences."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="space-y-4 p-6 glass border border-white/5 hover:border-[#4A90E2]/30 transition-all group"
                                >
                                    <div className="text-[#4A90E2] group-hover:scale-110 transition-transform duration-500">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-white text-sm font-bold uppercase tracking-wider">{item.title}</h3>
                                    <p className="text-gray-500 text-[11px] leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative flex justify-center items-end"
                    >
                        <div className="relative group w-full max-w-md">
                            <motion.img
                                src={`${import.meta.env.BASE_URL}dr-sumit-transparent.png`}
                                alt="Dr. Sumit Singh Gautam - Board Certified Plastic Surgeon Chandigarh"
                                className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                                initial={{ scale: 1 }}
                                whileInView={{ scale: 1.05 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                            {/* Bottom fade mask to hide cut-off */}
                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/90 to-transparent z-20" />

                            {/* Restored Quote Overlay - Warning: Negative bottom might overlap footer if not careful, but section has padding */}
                            <div className="absolute -bottom-10 left-0 right-0 z-30 px-6">
                                <div className="glass p-6 border-l-2 border-[#D4AF37] backdrop-blur-xl bg-black/60 shadow-2xl">
                                    <p className="text-gray-300 text-sm italic font-light">"The goal is not to change who you are, but to reveal the version of you that has been hidden by time or genetics."</p>
                                    <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold mt-4">— Dr. Sumit Singh Gautam</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default MedicalAuthority;
