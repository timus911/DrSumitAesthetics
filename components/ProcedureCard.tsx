import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMobileCenterFocus } from '../hooks/useMobileCenterFocus.ts';

interface ProcedureCardProps {
    proc: any;
    index?: number;
    hint?: string;
    hideDescription?: boolean;
}

const ProcedureCard: React.FC<ProcedureCardProps> = ({ proc, index = 0, hint, hideDescription = false }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isFocused = useMobileCenterFocus(ref);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.2 }}
            className="group relative h-full overflow-hidden rounded-sm glass border border-white/5"
        >
            {/* Background "After" Result Image */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
                initial={{ opacity: 0.2 }}
                whileHover={{ opacity: 0.5 }}
                animate={{ opacity: isFocused ? 0.5 : 0.2 }}
                transition={{ duration: 0.6 }}
            >
                <img
                    src={proc.image || `https://picsum.photos/800/1000?${proc.id}-after`}
                    alt={proc.title}
                    className={`w-full h-full object-cover grayscale brightness-75 transition-transform duration-1000 group-hover:scale-110 ${isFocused ? 'grayscale-0' : 'grayscale'} group-hover:grayscale-0`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
            </motion.div>

            {/* Contextual Hint Overlay - Blurred Header */}
            {hint && (
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center min-h-[85px]">
                    <div
                        className="absolute inset-0 backdrop-blur-md bg-black/50"
                        style={{
                            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                        }}
                    />
                    <p className="relative z-10 text-gray-500 font-sans text-xs font-medium text-center leading-relaxed max-w-[90%] p-4">
                        {hint}
                    </p>
                </div>
            )}

            <Link
                to={`/${proc.id}`}
                className={`relative z-10 block h-full border-b-2 border-transparent hover:border-[#5DA9E9] transition-all duration-700 ${hint ? 'pt-24 pb-12 px-12' : 'p-12'}`}
            >
                <div className="space-y-8 flex flex-col h-full justify-end md:justify-start">
                    <div className="space-y-4">
                        <div className={`text-[#5DA9E9] text-[10px] tracking-[0.3em] uppercase font-bold transition-opacity ${isFocused ? 'opacity-100' : 'opacity-80'} group-hover:opacity-100`}>
                            {proc.category}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-serif text-white transition-colors duration-500 leading-tight ${isFocused ? 'text-[#5DA9E9]' : ''} group-hover:text-[#5DA9E9]`}>
                            {proc.title}
                        </h3>
                    </div>
                    {!hideDescription && (
                        <p className={`text-gray-300 text-sm flex-grow leading-relaxed font-light transition-colors ${isFocused ? 'text-white' : ''} group-hover:text-white`}>
                            {proc.description}
                        </p>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};

export default ProcedureCard;
