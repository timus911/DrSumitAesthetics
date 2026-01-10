
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROCEDURES, Procedure, COLORS } from '../constants.ts';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO.tsx';
import ProcedureCard from '../components/ProcedureCard.tsx';

interface CategoryPageProps {
  type: Procedure['parentCategory'];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ type }) => {
  const filteredProcedures = PROCEDURES.filter(p => p.parentCategory === type);

  const titles = {
    aesthetic: "Aesthetic & Plastic Surgery",
    reconstructive: "Reconstructive & Trauma",
    "non-surgical": "Non-Surgical Aesthetics",
    vascular: "Vascular Procedures"
  };

  const descriptions = {
    aesthetic: "Harmonizing form and function through refined surgical artistry and anatomical precision.",
    reconstructive: "Restoring anatomical integrity and functional vitality after major trauma, illness, or congenital concerns.",
    "non-surgical": "Advanced, minimally invasive treatments for subtle yet profound facial and skin rejuvenation.",
    vascular: "Precision management of vascular concerns using state-of-the-art diagnostic and ultrasound technology."
  };

  return (
    <div className="pt-52 pb-32">
      <SEO
        title={`${titles[type]} | Dr. Sumit Aesthetics`}
        description={descriptions[type]}
        url={`/${type}`}
      />
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mb-24 space-y-8"
        >
          <span className="text-[#5DA9E9] text-[10px] tracking-[0.4em] uppercase font-bold">Clinical Domain</span>
          <h1 className="text-5xl md:text-8xl font-serif leading-none">{titles[type]}</h1>
          <p className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed max-w-3xl">{descriptions[type]}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProcedures.length > 0 ? (
            filteredProcedures.map((proc, idx) => (
              <ProcedureCard key={proc.id} proc={proc} index={idx} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center glass border border-white/5">
              <p className="text-gray-500 uppercase tracking-[0.4em] text-xs">Exhaustive clinical review required for full database access.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
