
import React from 'react';
import { motion } from 'framer-motion';

const PatientJourney: React.FC = () => {
  const steps = [
    { title: "Consultation", desc: "A comprehensive anatomical assessment where we discuss goals, safety, and customized surgical plans." },
    { title: "Preparation", desc: "Detailed preoperative guidelines, medical clearances, and lifestyle optimization for peak recovery." },
    { title: "Surgery", desc: "Performed in state-of-the-art facilities with board-certified anesthesiologists and elite nursing staff." },
    { title: "Recovery", desc: "Continuous monitoring and professional scar management to ensure seamless healing and longevity of results." }
  ];

  return (
    <div className="pt-52 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-32 space-y-6">
          <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">The Experience</span>
          <h1 className="text-5xl md:text-7xl font-serif">Patient Journey</h1>
          <p className="text-gray-400 text-lg font-light">From the first touchpoint to final follow-up, your journey is handled with the highest level of surgical professionalism and care.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />

          <div className="space-y-24">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col lg:flex-row items-center justify-between ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:w-5/12 p-10 glass space-y-4">
                  <span className="text-[#D4AF37] font-serif text-3xl">0{idx + 1}</span>
                  <h3 className="text-2xl font-serif text-white">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-light">{step.desc}</p>
                </div>

                <div className="hidden lg:flex w-2/12 justify-center relative z-10">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37] neon-glow" />
                </div>

                <div className="lg:w-5/12 aspect-video overflow-hidden rounded-sm glass mt-8 lg:mt-0">
                  <img src={`https://picsum.photos/800/500?journey-${idx}`} className="w-full h-full object-cover opacity-20 grayscale" alt={step.title} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientJourney;
