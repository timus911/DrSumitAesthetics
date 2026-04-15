
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROCEDURES, Procedure, COLORS } from '../constants.ts';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO.tsx';
import ProcedureCard from '../components/ProcedureCard.tsx';
import Breadcrumbs from '../components/Breadcrumbs.tsx';

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
    aesthetic: "Expert plastic surgery in Chandigarh by Board-Certified Surgeon Dr. Sumit Singh Gautam. Specialized in Liposuction, Rhinoplasty, and Breast Augmentation.",
    reconstructive: "Advanced reconstructive surgery in Chandigarh for trauma, congenital issues, and functional restoration by expert Dr. Sumit Singh Gautam.",
    "non-surgical": "Minimally invasive facial rejuvenation and skin treatments in Chandigarh including Botox, Fillers, and Laser therapies.",
    vascular: "Precision treatment for vascular issues and varicose veins in Chandigarh using advanced ultrasound-guided surgical techniques."
  };

  return (
    <div className="pt-52 pb-32">
      <SEO
        title={`${titles[type]} | Dr. Sumit Aesthetics`}
        description={descriptions[type]}
        url={`/${type}`}
        breadcrumbs={[
          { name: titles[type], item: `/${type}` }
        ]}
      />
      <div className="container mx-auto px-6">
        <Breadcrumbs
          items={[
            { name: titles[type], path: `/${type}` }
          ]}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="max-w-4xl mb-24 space-y-8 mt-8"
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
              <p className="text-gray-300 uppercase tracking-[0.4em] text-xs">Exhaustive clinical review required for full database access.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

