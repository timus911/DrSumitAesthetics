import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronRight, User } from 'lucide-react';
import { ASSETS, BRAND } from '../constants.ts';
import SEO from '../components/SEO.tsx';

// Placeholder data - User to replace with actual screenshot paths
// Generate array of 147 review images (review0001.jpg, etc.)
// Assuming the user formats them as 'review1.jpg' to 'review147.jpg' or similar. 
// The user said "reviewxxxx" but usually that implies 4 digits. Let's assume standard numbering for now and adjust if needed or just use a simple index.
// Actually, better to just generate numbers 1 to 147 and let the UI handle the path.

const GOOGLE_REVIEWS = [
    { id: 39, src: `${import.meta.env.BASE_URL}reviews/Review1411.png`, alt: "Patient Review 39" },
    { id: 1, src: `${import.meta.env.BASE_URL}reviews/Review0847.png`, alt: "Patient Review 1" },
    { id: 2, src: `${import.meta.env.BASE_URL}reviews/Review0857.png`, alt: "Patient Review 2" },
    { id: 3, src: `${import.meta.env.BASE_URL}reviews/Review0913.png`, alt: "Patient Review 3" },
    { id: 4, src: `${import.meta.env.BASE_URL}reviews/Review0920.png`, alt: "Patient Review 4" },
    { id: 5, src: `${import.meta.env.BASE_URL}reviews/Review0926.png`, alt: "Patient Review 5" },
    { id: 6, src: `${import.meta.env.BASE_URL}reviews/Review0932.png`, alt: "Patient Review 6" },
    { id: 7, src: `${import.meta.env.BASE_URL}reviews/Review0942.png`, alt: "Patient Review 7" },
    { id: 8, src: `${import.meta.env.BASE_URL}reviews/Review0948.png`, alt: "Patient Review 8" },
    { id: 9, src: `${import.meta.env.BASE_URL}reviews/Review0956.png`, alt: "Patient Review 9" },
    { id: 10, src: `${import.meta.env.BASE_URL}reviews/Review1001.png`, alt: "Patient Review 10" },
    { id: 11, src: `${import.meta.env.BASE_URL}reviews/Review1011.png`, alt: "Patient Review 11" },
    { id: 12, src: `${import.meta.env.BASE_URL}reviews/Review1028.png`, alt: "Patient Review 12" },
    { id: 13, src: `${import.meta.env.BASE_URL}reviews/Review1037.png`, alt: "Patient Review 13" },
    { id: 14, src: `${import.meta.env.BASE_URL}reviews/Review1047.png`, alt: "Patient Review 14" },
    { id: 15, src: `${import.meta.env.BASE_URL}reviews/Review1100.png`, alt: "Patient Review 15" },
    { id: 16, src: `${import.meta.env.BASE_URL}reviews/Review1106.png`, alt: "Patient Review 16" },
    { id: 17, src: `${import.meta.env.BASE_URL}reviews/Review1113.png`, alt: "Patient Review 17" },
    { id: 18, src: `${import.meta.env.BASE_URL}reviews/Review1121.png`, alt: "Patient Review 18" },
    { id: 19, src: `${import.meta.env.BASE_URL}reviews/Review1128.png`, alt: "Patient Review 19" },
    { id: 20, src: `${import.meta.env.BASE_URL}reviews/Review1133.png`, alt: "Patient Review 20" },
    { id: 21, src: `${import.meta.env.BASE_URL}reviews/Review1139.png`, alt: "Patient Review 21" },
    { id: 22, src: `${import.meta.env.BASE_URL}reviews/Review1144.png`, alt: "Patient Review 22" },
    { id: 23, src: `${import.meta.env.BASE_URL}reviews/Review1156.png`, alt: "Patient Review 23" },
    { id: 24, src: `${import.meta.env.BASE_URL}reviews/Review1203.png`, alt: "Patient Review 24" },
    { id: 25, src: `${import.meta.env.BASE_URL}reviews/Review1209.png`, alt: "Patient Review 25" },
    { id: 26, src: `${import.meta.env.BASE_URL}reviews/Review1214.png`, alt: "Patient Review 26" },
    { id: 27, src: `${import.meta.env.BASE_URL}reviews/Review1219.png`, alt: "Patient Review 27" },
    { id: 28, src: `${import.meta.env.BASE_URL}reviews/Review1225.png`, alt: "Patient Review 28" },
    { id: 29, src: `${import.meta.env.BASE_URL}reviews/Review1232.png`, alt: "Patient Review 29" },
    { id: 30, src: `${import.meta.env.BASE_URL}reviews/Review1240.png`, alt: "Patient Review 30" },
    { id: 31, src: `${import.meta.env.BASE_URL}reviews/Review1249.png`, alt: "Patient Review 31" },
    { id: 32, src: `${import.meta.env.BASE_URL}reviews/Review1255.png`, alt: "Patient Review 32" },
    { id: 33, src: `${import.meta.env.BASE_URL}reviews/Review1320.png`, alt: "Patient Review 33" },
    { id: 34, src: `${import.meta.env.BASE_URL}reviews/Review1327.png`, alt: "Patient Review 34" },
    { id: 35, src: `${import.meta.env.BASE_URL}reviews/Review1335.png`, alt: "Patient Review 35" },
    { id: 36, src: `${import.meta.env.BASE_URL}reviews/Review1342.png`, alt: "Patient Review 36" },
    { id: 37, src: `${import.meta.env.BASE_URL}reviews/Review1349.png`, alt: "Patient Review 37" },
    { id: 38, src: `${import.meta.env.BASE_URL}reviews/Review1401.png`, alt: "Patient Review 38" },
    { id: 40, src: `${import.meta.env.BASE_URL}reviews/Review1429.png`, alt: "Patient Review 40" },
    { id: 41, src: `${import.meta.env.BASE_URL}reviews/Review1436.png`, alt: "Patient Review 41" },
    { id: 42, src: `${import.meta.env.BASE_URL}reviews/Review1447.png`, alt: "Patient Review 42" },
    { id: 43, src: `${import.meta.env.BASE_URL}reviews/Review1452.png`, alt: "Patient Review 43" },
    { id: 44, src: `${import.meta.env.BASE_URL}reviews/Review1458.png`, alt: "Patient Review 44" },
    { id: 45, src: `${import.meta.env.BASE_URL}reviews/Review1509.png`, alt: "Patient Review 45" },
    { id: 46, src: `${import.meta.env.BASE_URL}reviews/Review1516.png`, alt: "Patient Review 46" },
    { id: 47, src: `${import.meta.env.BASE_URL}reviews/Review1524.png`, alt: "Patient Review 47" },
    { id: 48, src: `${import.meta.env.BASE_URL}reviews/Review1530.png`, alt: "Patient Review 48" },
    { id: 49, src: `${import.meta.env.BASE_URL}reviews/Review1535.png`, alt: "Patient Review 49" },
    { id: 50, src: `${import.meta.env.BASE_URL}reviews/Review1552.png`, alt: "Patient Review 50" },
    { id: 51, src: `${import.meta.env.BASE_URL}reviews/Review1602.png`, alt: "Patient Review 51" },
    { id: 52, src: `${import.meta.env.BASE_URL}reviews/Review1613.png`, alt: "Patient Review 52" },
    { id: 53, src: `${import.meta.env.BASE_URL}reviews/Review1745.png`, alt: "Patient Review 53" },
    { id: 54, src: `${import.meta.env.BASE_URL}reviews/Review1751.png`, alt: "Patient Review 54" },
    { id: 55, src: `${import.meta.env.BASE_URL}reviews/Review1757.png`, alt: "Patient Review 55" },
    { id: 56, src: `${import.meta.env.BASE_URL}reviews/Review1803.png`, alt: "Patient Review 56" },
    { id: 57, src: `${import.meta.env.BASE_URL}reviews/Review1810.png`, alt: "Patient Review 57" },
    { id: 58, src: `${import.meta.env.BASE_URL}reviews/Review1817.png`, alt: "Patient Review 58" },
    { id: 59, src: `${import.meta.env.BASE_URL}reviews/Review1828.png`, alt: "Patient Review 59" },
    { id: 60, src: `${import.meta.env.BASE_URL}reviews/Review1834.png`, alt: "Patient Review 60" },
    { id: 61, src: `${import.meta.env.BASE_URL}reviews/Review1839.png`, alt: "Patient Review 61" },
    { id: 62, src: `${import.meta.env.BASE_URL}reviews/Review1845.png`, alt: "Patient Review 62" },
    { id: 63, src: `${import.meta.env.BASE_URL}reviews/Review1850.png`, alt: "Patient Review 63" },
    { id: 64, src: `${import.meta.env.BASE_URL}reviews/Review1855.png`, alt: "Patient Review 64" },
    { id: 65, src: `${import.meta.env.BASE_URL}reviews/Review1900.png`, alt: "Patient Review 65" },
    { id: 66, src: `${import.meta.env.BASE_URL}reviews/Review1905.png`, alt: "Patient Review 66" },
    { id: 67, src: `${import.meta.env.BASE_URL}reviews/Review1911.png`, alt: "Patient Review 67" },
    { id: 68, src: `${import.meta.env.BASE_URL}reviews/Review1916.png`, alt: "Patient Review 68" },
    { id: 69, src: `${import.meta.env.BASE_URL}reviews/Review1921.png`, alt: "Patient Review 69" },
    { id: 70, src: `${import.meta.env.BASE_URL}reviews/Review1954.png`, alt: "Patient Review 70" },
    { id: 71, src: `${import.meta.env.BASE_URL}reviews/Review2008.png`, alt: "Patient Review 71" },
    { id: 72, src: `${import.meta.env.BASE_URL}reviews/Review2016.png`, alt: "Patient Review 72" },
    { id: 73, src: `${import.meta.env.BASE_URL}reviews/Review2024.png`, alt: "Patient Review 73" },
    { id: 74, src: `${import.meta.env.BASE_URL}reviews/Review2048.png`, alt: "Patient Review 74" },
    { id: 75, src: `${import.meta.env.BASE_URL}reviews/Review2101.png`, alt: "Patient Review 75" },
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

    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const maxScroll = scrollWidth - clientWidth;
            const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
            setScrollProgress(progress);
        }
    };

    React.useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8; // Scroll 80% of view

            // Loop logic for navigation buttons
            if (direction === 'left' && scrollLeft <= 10) {
                scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
            } else if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 10) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollContainerRef.current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Horizontal scroll with mouse wheel
    React.useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (evt: WheelEvent) => {
            if (evt.deltaY !== 0) {
                // If scrolling vertically, scroll horizontally instead
                // unless shift key is pressed (native horizontal scroll)
                // We prevent default to lock the page vertical scroll while over the section
                evt.preventDefault();
                container.scrollLeft += evt.deltaY;
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

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
            </div>

            {/* Google Reviews Section */}
            <section className="mb-32 relative group/section container mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div className="p-3 glass rounded-full text-yellow-500">
                            <Star fill="currentColor" size={24} />
                        </div>
                        <h2 className="text-3xl font-serif text-white">Google Reviews</h2>
                    </div>
                    {/* Desktop Hint */}
                    <div className="hidden md:flex items-center gap-2 text-white/30 text-xs font-mono uppercase tracking-widest">
                        <span className="animate-pulse">Scroll / Drag to Explore</span>
                        <ChevronRight size={14} />
                    </div>
                </div>

                {GOOGLE_REVIEWS.length > 0 ? (
                    <div className="relative">
                        {/* Navigation Arrows */}
                        <button
                            onClick={() => scroll('left')}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/50 hover:bg-blue-600 text-white rounded-full backdrop-blur-md border border-white/10 transition-all -translate-x-4 md:-translate-x-6 shadow-2xl ${scrollProgress > 0.01 ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0'}`}
                            aria-label="Scroll left"
                        >
                            <ChevronRight className="rotate-180" size={24} />
                        </button>

                        <button
                            onClick={() => scroll('right')}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/50 hover:bg-blue-600 text-white rounded-full backdrop-blur-md border border-white/10 transition-all translate-x-4 md:translate-x-6 shadow-2xl ${scrollProgress < 0.99 ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0'}`}
                            aria-label="Scroll right"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Horizontal Scroll Container */}
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto gap-8 pb-12 cursor-grab active:cursor-grabbing snap-x snap-mandatory scrollbar-none items-start"
                            data-lenis-prevent
                        >
                            {GOOGLE_REVIEWS.map((review) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "50px" }}
                                    className="flex-none w-[300px] md:w-[400px] snap-center"
                                >
                                    <div className="group relative select-none">
                                        <img
                                            src={review.src}
                                            alt={review.alt}
                                            loading="lazy"
                                            draggable={false}
                                            className="w-full h-auto object-contain rounded-lg shadow-2xl shadow-black/50"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                            <motion.div
                                className="h-full bg-white/50"
                                style={{ width: `${(scrollProgress * 100)}%` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="glass p-12 text-center rounded-2xl border border-dashed border-white/10">
                        <Quote className="mx-auto text-gray-600 mb-4" size={48} />
                        <p className="text-gray-400 italic">"Google review screenshots will appear here soon."</p>
                    </div>
                )}
            </section>

            {/* Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-24" />
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
