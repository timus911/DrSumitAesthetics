
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ActionFunctionArgs } from 'react-router-dom';
import { PROCEDURES } from '../constants.ts';
import { ArrowRight } from 'lucide-react';
import ProcedureCard from '../components/ProcedureCard.tsx';

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
                            <ProcedureCard key={proc.id} proc={proc} index={idx} />
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
            </div >
        </div >
    );
};

export default ConcernDetail;
