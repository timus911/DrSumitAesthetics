import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../constants.ts';

const FloatingWhatsApp: React.FC = () => {
    return (
        <a
            href={`https://wa.me/${CONTACT.counselorPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Dr. Sumit, I would like to book a consultation.')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-2xl shadow-black/40 hover:scale-110 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300"
        >
            <MessageCircle size={26} strokeWidth={2.2} />
        </a>
    );
};

export default FloatingWhatsApp;
