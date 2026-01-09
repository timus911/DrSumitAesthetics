
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Plane, Hotel, MessageCircle } from 'lucide-react';

const InternationalPatients: React.FC = () => {
  return (
    <div className="pt-52 pb-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Global Excellence</span>
              <h1 className="text-5xl md:text-7xl font-serif">Traveling for Surgery</h1>
            </div>

            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Dr. Sumit welcomes patients from across the globe. We provide a seamless "Fly-In for Surgery" experience, ensuring international guests receive the same Belgian-standard excellence found in elite European clinics.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 glass flex items-center justify-center shrink-0">
                  <MessageCircle className="text-[#D4AF37]" size={20} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-white uppercase tracking-widest text-xs font-bold">Virtual Consultation</h4>
                  <p className="text-gray-500 text-sm">Initial assessment via high-definition video call to discuss suitability and travel timelines.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 glass flex items-center justify-center shrink-0">
                  <Hotel className="text-[#D4AF37]" size={20} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-white uppercase tracking-widest text-xs font-bold">Concierge Recovery</h4>
                  <p className="text-gray-500 text-sm">Partnerships with premium luxury hotels for comfortable post-operative care.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative glass p-1 rounded-sm overflow-hidden aspect-[4/5]">
            <img src="https://picsum.photos/1000/1200?travel" className="w-full h-full object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute top-10 right-10 flex flex-col items-end space-y-4">
              <div className="flex items-center space-x-2 glass px-4 py-2">
                <Globe size={14} className="text-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-widest">Global Standards</span>
              </div>
              <div className="flex items-center space-x-2 glass px-4 py-2">
                <Plane size={14} className="text-[#D4AF37]" />
                <span className="text-[10px] uppercase tracking-widest">Travel Concierge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalPatients;
