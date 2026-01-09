
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { PROCEDURES } from '../constants.ts';
import { ArrowRight } from 'lucide-react';

const ConcernDetail: React.FC = () => {
    const { region } = useParams<{ region: string }>();

    // Normalize region for comparison if needed, though exact match is expected from Links
    const filteredProcedures = PROCEDURES.filter(p =>
        p.regions?.includes(region || "") &&
        p.parentCategory !== 'reconstructive'
    );

    return (
        <div className="pt-52 pb-32">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mb-24 space-y-8"
                >
                    <span className="text-[#5DA9E9] text-[10px] tracking-[0.4em] uppercase font-bold">Region Focus</span>
                    <h1 className="text-5xl md:text-8xl font-serif leading-none text-white">{region}</h1>
                    <p className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
                        specialized procedures targeting the {region?.toLowerCase()} area for enhanced contour and function.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProcedures.length > 0 ? (
                        filteredProcedures.map((proc, idx) => (
                            <motion.div
                                key={proc.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative h-full overflow-hidden rounded-sm glass border border-white/5"
                            >
                                {/* Background "After" Result Image */}
                                <motion.div
                                    className="absolute inset-0 z-0 overflow-hidden"
                                    initial={{ opacity: 0.2 }}
                                    whileHover={{ opacity: 0.5 }}
                                    whileInView={{ opacity: 0.5 }}
                                    viewport={{ once: false, amount: 0.8 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <img
                                        src={proc.image || `https://picsum.photos/800/1000?${proc.id}-after`}
                                        alt={proc.title}
                                        className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
                                </motion.div>

                                <Link to={`/procedure/${proc.id}`} className="relative z-10 block h-full p-12 border-b-2 border-transparent hover:border-[#5DA9E9] transition-all duration-700">
                                    <div className="space-y-8 flex flex-col h-full">
                                        <div className="space-y-4">
                                            <div className="text-[#5DA9E9] text-[10px] tracking-[0.3em] uppercase font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                                                {proc.category}
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-[#5DA9E9] transition-colors duration-500 leading-tight">
                                                {proc.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-300 text-sm flex-grow leading-relaxed font-light group-hover:text-white transition-colors">
                                            {proc.description}
                                        </p>
                                        <div className="flex items-center space-x-3 text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white pt-8 border-t border-white/10">
                                            <span className="font-bold">Explore Mastery</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-3 transition-transform duration-500 text-[#5DA9E9]" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center glass border border-white/5">
                            <p className="text-gray-500 uppercase tracking-[0.4em] text-xs">No specific procedures listed for this region yet.</p>
                            <Link to="/contact" className="inline-block mt-8 text-[#5DA9E9] text-xs uppercase tracking-widest hover:text-white transition-colors">
                                Contact for specific inquiry
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConcernDetail;
