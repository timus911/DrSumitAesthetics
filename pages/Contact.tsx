import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { CONTACT } from '../constants.ts';

const Contact: React.FC = () => {
  const [isQrLightboxOpen, setIsQrLightboxOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    mobile: '',
    interest: '',
    message: ''
  });

  const handleWhatsAppClick = () => {
    const { name, email, mobile, interest, message } = formData;

    // Build the WhatsApp message
    let whatsappMessage = `Hi! My name is *${name || '[Name]'}*. My email and number is ${email || '[Email]'} and ${mobile || '[Mobile]'}, and I am interested in *${interest || '[Interest]'}*.`;

    if (message.trim()) {
      whatsappMessage += `\n\n${message}`;
    }

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp with pre-filled message to counselor number
    const whatsappUrl = `https://wa.me/${CONTACT.counselorPhone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="pt-52 pb-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">Contact</span>
              <h1 className="text-5xl md:text-7xl font-serif">Discuss your options</h1>
              <p className="text-gray-400 text-lg font-light">Begin your transformation by scheduling a private consultation with Dr. Sumit.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-[#D4AF37]">
                  <Phone size={18} />
                  <span className="text-xs uppercase tracking-widest font-bold">Consultation Support</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-light mb-1">Guidance, questions, and appointment planning</p>
                <div className="flex items-center space-x-4">
                  <a href={`tel:${CONTACT.counselorPhone.replace(/\s/g, '')}`} className="text-gray-400 text-sm font-light hover:text-[#D4AF37] transition-colors">{CONTACT.counselorPhone}</a>
                  <a
                    href={`https://wa.me/${CONTACT.counselorPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500/70 hover:text-green-400 transition-colors"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-[#D4AF37]">
                  <Phone size={18} />
                  <span className="text-xs uppercase tracking-widest font-bold">Clinical Enquiries</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-light mb-1">Medical-related questions</p>
                <div className="flex items-center space-x-4">
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-gray-400 text-sm font-light hover:text-[#D4AF37] transition-colors">{CONTACT.phone}</a>
                  <a
                    href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500/70 hover:text-green-400 transition-colors"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-[#D4AF37]">
                  <Mail size={18} />
                  <span className="text-xs uppercase tracking-widest font-bold">Email Inquiries</span>
                </div>
                <a href={`mailto:${CONTACT.email}`} className="block text-gray-500 text-sm font-light hover:text-[#D4AF37] transition-colors">{CONTACT.email}</a>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-[#D4AF37]">
                  <MapPin size={18} />
                  <span className="text-xs uppercase tracking-widest font-bold">Clinic Location</span>
                </div>
                <a
                  href={CONTACT.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-500 text-sm font-light leading-relaxed hover:text-[#D4AF37] transition-colors"
                >
                  {CONTACT.location}
                </a>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-[#D4AF37]">
                  <Clock size={18} />
                  <span className="text-xs uppercase tracking-widest font-bold">Clinic Hours</span>
                </div>
                <p className="text-gray-500 text-sm font-light">{CONTACT.hours.weekdays}</p>
              </div>
            </div>

            {/* QR Code / vCard Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-8 border-t border-white/5"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-2">Digital Contact Card</h3>
                  <p className="text-gray-500 text-xs font-light">Scan or click the QR code to instantly add Dr. Sumit to your contacts.</p>
                </div>
                <div className="flex items-start">
                  <button
                    onClick={() => setIsQrLightboxOpen(true)}
                    className="group relative block w-48 h-48 glass p-3 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 shadow-2xl overflow-hidden"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}contact-qr.png`}
                      alt="Contact QR Code"
                      className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500 backdrop-blur-[2px]">
                      <span className="text-[10px] uppercase tracking-widest text-white font-bold">Expand QR Code</span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 space-y-8"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-[#D4AF37] outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-[#D4AF37] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500">Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-[#D4AF37] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500">Interest / Procedure / Concern</label>
                <input
                  type="text"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-[#D4AF37] outline-none transition-all"
                  placeholder="e.g., Facelift, HD Liposuction, etc."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500">Message</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-[#D4AF37] outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleWhatsAppClick}
                type="button"
                className="w-full py-5 bg-green-600 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-green-500 transition-all flex items-center justify-center space-x-3"
              >
                <MessageCircle size={18} />
                <span>Send via WhatsApp</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* QR Lightbox Portal */}
      {createPortal(
        <AnimatePresence>
          {isQrLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/95 backdrop-blur-2xl px-6"
              onClick={() => setIsQrLightboxOpen(false)}
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
                  <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
    </div>
  );
};

export default Contact;