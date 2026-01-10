import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronRight, User } from 'lucide-react';
import { ASSETS, BRAND } from '../constants.ts';
import SEO from '../components/SEO.tsx';

// Placeholder data - User to replace with actual screenshot paths
const GOOGLE_REVIEWS = [
    // Example format: { id: 1, src: `${import.meta.env.BASE_URL}reviews/review-1.jpg`, alt: "Review by Patient Name" }
];

// Placeholder data - User to replace with actual patient photo paths
const HAPPY_PATIENTS = [
    // Example format: { id: 1, src: `${import.meta.env.BASE_URL}reviews/patient-1.jpg`, caption: "Rhinoplasty Result" }
];

const Reviews: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="pt-40 min-h-screen bg-black relative overflow-hidden">
            <SEO
                title="Patient Reviews & Stories | Dr. Sumit Singh Gautam"
                description="Real stories and experiences from our valued patients. See the difference Dr. Sumit makes."
                url="/reviews"
            />

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-900/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 pb-32">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24 space-y-6"
                >
                    <span className="text-[#4A90E2] text-xs tracking-[0.6em] uppercase font-black">Testimonials</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
                        Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Stories</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                        The greatest measure of our success is the satisfaction and confidence of our patients.
                    </p>
                </motion.div>

                {/* Google Reviews Section */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 glass rounded-full text-yellow-500">
                            <Star fill="currentColor" size={24} />
                        </div>
                        <h2 className="text-3xl font-serif text-white">Google Reviews</h2>
                    </div>

                    {GOOGLE_REVIEWS.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {GOOGLE_REVIEWS.map((review) => (
                                <motion.div
                                    key={review.id}
                                    variants={itemVariants}
                                    className="glass p-4 rounded-xl border border-white/5 cursor-pointer hover:border-blue-500/30 transition-all group"
                                    onClick={() => setSelectedImage(review.src)}
                                >
                                    <div className="aspect-[4/3] overflow-hidden rounded-lg relative">
                                        <img
                                            src={review.src}
                                            alt={review.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="glass p-12 text-center rounded-2xl border border-dashed border-white/10">
                            <Quote className="mx-auto text-gray-600 mb-4" size={48} />
                            <p className="text-gray-400 italic">"Google review screenshots will appear here soon."</p>
                        </div>
                    )}
                </section>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-24" />

                {/* Happy Patients Section */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 glass rounded-full text-blue-400">
                            <User size={24} />
                        </div>
                        <h2 className="text-3xl font-serif text-white">Our Happy Patients</h2>
                    </div>

                    {HAPPY_PATIENTS.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            {HAPPY_PATIENTS.map((patient) => (
                                <motion.div
                                    key={patient.id}
                                    variants={itemVariants}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedImage(patient.src)}
                                >
                                    <div className="aspect-[3/4] overflow-hidden rounded-xl relative glass border border-white/5">
                                        <img
                                            src={patient.src}
                                            alt={patient.caption}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <span className="text-white text-xs uppercase tracking-widest font-bold">{patient.caption}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="glass p-12 text-center rounded-2xl border border-dashed border-white/10">
                            <User className="mx-auto text-gray-600 mb-4" size={48} />
                            <p className="text-gray-400 italic">"Patient photos gallery coming soon."</p>
                        </div>
                    )}
                </section>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out items-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Full view"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Reviews;
