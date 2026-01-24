
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../constants.ts';
import { useMobileCenterFocus } from '../hooks/useMobileCenterFocus.ts';

const CONCERN_ZONES = [
    { id: 'Face', title: 'Face', image: `${import.meta.env.BASE_URL}facelift-aesthetic.jpg` },
    { id: 'Nose', title: 'Nose', image: `${import.meta.env.BASE_URL}rhinoplasty-aesthetic.jpg` },
    { id: 'Eyes', title: 'Eyes', image: `${import.meta.env.BASE_URL}blepharoplasty-aesthetic.jpg` },
    { id: 'Ears', title: 'Ears', image: `${import.meta.env.BASE_URL}otoplasty-aesthetic.png` },
    { id: 'Lips', title: 'Lips', image: `${import.meta.env.BASE_URL}lip-lift-aesthetic.jpg` },
    { id: 'Neck', title: 'Neck', image: `${import.meta.env.BASE_URL}neck-lift-aesthetic.png` },
    { id: 'Breasts', title: 'Breasts', image: `${import.meta.env.BASE_URL}breast-augmentation-aesthetic.png` },
    { id: 'Abdomen', title: 'Abdomen', image: `${import.meta.env.BASE_URL}tummy-tuck-aesthetic.jpg` },
    { id: 'Body', title: 'Body', image: `${import.meta.env.BASE_URL}body-contouring-aesthetic.png` },
    { id: 'Buttock', title: 'Buttock', image: `${import.meta.env.BASE_URL}buttock-lift-aesthetic.jpg` },
    { id: 'Thighs', title: 'Thighs', image: `${import.meta.env.BASE_URL}thighs-concerns.jpg` }, // HD Lipo often targets thighs
    { id: 'Arms', title: 'Arms', image: `${import.meta.env.BASE_URL}arms-concerns.jpg` },
];

const ConcernCard = ({ zone, idx }: { zone: any, idx: number }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isFocused = useMobileCenterFocus(ref);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.2 }}
            className="group relative h-[400px] overflow-hidden rounded-sm glass border border-white/5 cursor-pointer"
        >
            <Link to={`/concerns/${zone.id}`} className="block h-full w-full">
                {/* Background Image */}
                <motion.div
                    className="absolute inset-0 z-0 overflow-hidden"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.8, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                >
                    <img
                        src={zone.image}
                        alt={zone.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${isFocused ? 'grayscale-0' : 'grayscale'} group-hover:grayscale-0`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </motion.div>

                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                    <div className="space-y-4">
                        <h3 className={`text-2xl font-serif text-white transition-colors duration-500 ${isFocused ? 'text-[#5DA9E9]' : ''} group-hover:text-[#5DA9E9]`}>
                            {zone.title}
                        </h3>
                        <div className={`flex items-center space-x-3 text-[10px] uppercase tracking-widest text-white/40 transition-colors ${isFocused ? 'text-white' : ''} group-hover:text-white`}>
                            <span className="font-bold">View Procedures</span>
                            <ArrowRight size={14} className={`transition-transform duration-500 text-[#5DA9E9] ${isFocused ? 'translate-x-2' : ''} group-hover:translate-x-2`} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const Concerns: React.FC = () => {
    return (
        <div className="pt-52 pb-32">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-4xl mb-24 space-y-8"
                >
                    <span className="text-[#5DA9E9] text-[10px] tracking-[0.4em] uppercase font-bold">Anatomical Focus</span>
                    <h1 className="text-5xl md:text-8xl font-serif leading-none">What Brings You Here</h1>
                    <p className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
                        Navigate our specialized procedures by anatomical region to find the precise solution for your aesthetic needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CONCERN_ZONES.map((zone, idx) => (
                        <ConcernCard key={zone.id} zone={zone} idx={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Concerns;
