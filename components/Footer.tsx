
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Globe, MessageCircle, QrCode } from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND, COLORS, CONTACT } from '../constants.ts';

const Footer: React.FC = () => {
  const [isQrOpen, setIsQrOpen] = React.useState(false);
  return (
    <footer className="relative z-10 bg-[#050505] border-t border-white/5 pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-serif tracking-[0.2em] text-white">{BRAND.name}</span>
              <span className="text-[9px] tracking-[0.4em] text-[#5DA9E9] font-bold uppercase mt-1">BOARD CERTIFIED PLASTIC SURGEON</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed font-light">
              International surgical expertise focusing on structural harmony and ethical patient care. Blending the precision of surgery with the vision of art.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/dr.sumitsgautam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#5DA9E9] cursor-pointer transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-10">Clinical Domains</h4>
            <ul className="space-y-5">
              <li><Link to="/aesthetic" className="text-gray-500 hover:text-[#5DA9E9] text-xs tracking-widest transition-colors">Aesthetic Procedures</Link></li>
              <li><Link to="/reconstructive" className="text-gray-500 hover:text-[#5DA9E9] text-xs tracking-widest transition-colors">Reconstructive Surgery</Link></li>
              <li><Link to="/non-surgical" className="text-gray-500 hover:text-[#5DA9E9] text-xs tracking-widest transition-colors">Non-Surgical Aesthetics</Link></li>
              <li><Link to="/patient-journey" className="text-gray-500 hover:text-[#5DA9E9] text-xs tracking-widest transition-colors">Patient Journey</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-10">Institutional</h4>
            <ul className="space-y-5">
              <li><Link to="/about" className="text-gray-500 hover:text-[#5DA9E9] text-xs tracking-widest transition-colors">About Dr. Sumit</Link></li>
              <li><Link to="/international" className="text-gray-500 hover:text-[#5DA9E9] text-xs tracking-widest transition-colors">International Concierge</Link></li>
              <li><Link to="/gallery" className="text-gray-500 hover:text-[#5DA9E9] text-xs tracking-widest transition-colors">Results Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-[#5DA9E9] text-xs tracking-widest transition-colors">Book Consultation</Link></li>
            </ul>
          </div>

          <div>
            <div className="flex items-center space-x-4 mb-10">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold">Headquarters</h4>
              <button
                onClick={() => setIsQrOpen(true)}
                className="p-2 glass border border-white/5 hover:border-[#5DA9E9]/50 transition-all group"
                title="Scan Contact QR"
              >
                <QrCode size={12} className="text-gray-600 group-hover:text-[#5DA9E9] transition-colors" />
              </button>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin size={18} className="text-[#5DA9E9] mt-0.5 shrink-0" />
                <a
                  href={CONTACT.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-[10px] tracking-widest font-bold uppercase hover:text-[#5DA9E9] transition-colors"
                >
                  {CONTACT.location} <span className="block text-[8px] opacity-70 mt-1">Near Picaddly Square Mall</span>
                </a>
              </li>
              <li className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone size={14} className="text-[#5DA9E9] shrink-0" />
                  <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">Consultation Support</span>
                </div>
                <div className="flex items-center space-x-4 pl-7">
                  <a href={`tel:${CONTACT.counselorPhone.replace(/\s/g, '')}`} className="text-gray-500 text-xs tracking-widest font-bold uppercase hover:text-[#5DA9E9] transition-colors">{CONTACT.counselorPhone}</a>
                  <a
                    href={`https://wa.me/${CONTACT.counselorPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500/50 hover:text-green-400 transition-colors"
                  >
                    <MessageCircle size={14} />
                  </a>
                </div>
              </li>
              <li className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone size={14} className="text-[#5DA9E9] shrink-0" />
                  <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">Clinical Enquiries</span>
                </div>
                <div className="flex items-center space-x-4 pl-7">
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-gray-500 text-xs tracking-widest font-bold uppercase hover:text-[#5DA9E9] transition-colors">Phone: {CONTACT.phone}</a>
                  <a
                    href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500/50 hover:text-green-400 transition-colors"
                  >
                    <MessageCircle size={14} />
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <Mail size={18} className="text-[#5DA9E9] shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="text-gray-500 text-xs tracking-widest font-bold uppercase hover:text-[#5DA9E9] transition-colors">{CONTACT.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.3em] text-gray-600 uppercase font-bold">
          <p>© {new Date().getFullYear()} {BRAND.name}. Surgical Excellence.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Protocols</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Care</span>
            <span className="cursor-pointer hover:text-white transition-colors">Medical Disclosure</span>
          </div>
        </div>
      </div>

      {/* QR Lightbox Portal */}
      {createPortal(
        <AnimatePresence>
          {isQrOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/95 backdrop-blur-2xl px-6"
              onClick={() => setIsQrOpen(false)}
            >
              <div className="absolute top-10 left-10 text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold pointer-events-none">
                Digital Business Card
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-lg w-full aspect-square glass p-8 border border-white/10 shadow-[0_100px_200px_rgba(0,0,0,1)]"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href={`${import.meta.env.BASE_URL}dr-sumit.vcf`}
                  download="Dr_Sumit_Singh_Gautam.vcf"
                  className="group block relative w-full h-full overflow-hidden"
                  title="Click to Download vCard"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}contact-qr.png`}
                    alt="Dr. Sumit Contact QR"
                    className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#5DA9E9]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="glass px-6 py-3 border border-white/20">
                      <span className="text-[10px] uppercase tracking-widest text-white font-bold">Click to Download vCard</span>
                    </div>
                  </div>
                </a>

                {/* Close Hint */}
                <div className="absolute -bottom-12 left-0 right-0 text-center text-white/30 text-[10px] uppercase tracking-[0.4em]">
                  Tap anywhere outside to close
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </footer >
  );
};

export default Footer;
