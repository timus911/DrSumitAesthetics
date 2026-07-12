import React from 'react';
import { Award, Stethoscope, Building2, Globe } from 'lucide-react';

// Compact trust panel for procedure pages — first-time visitors landing from
// search see the surgeon's credentials next to the consultation CTA instead
// of only on the homepage. Facts mirror MedicalAuthority.tsx / BRAND.education.
const CREDENTIALS = [
    { icon: Award, text: 'Board Certified — MCh Plastic & Reconstructive Surgery' },
    { icon: Stethoscope, text: 'Fellowship in Aesthetic Surgery — Belgium (The Coupure Centre)' },
    { icon: Building2, text: 'Operates at Healing Hospital, Sector 34-A, Chandigarh' },
    { icon: Globe, text: 'Member — APSI · IAAPS · ISAPS' },
];

const CredentialsStrip: React.FC = () => {
    return (
        <div className="glass p-8 border border-[#D4AF37]/10 shadow-2xl space-y-6">
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] font-bold">Why Patients Trust Dr. Sumit</p>
            <ul className="space-y-4">
                {CREDENTIALS.map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex items-start gap-4">
                        <Icon size={16} className="text-[#4A90E2] mt-0.5 shrink-0" />
                        <span className="text-gray-300 text-xs leading-relaxed">{text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CredentialsStrip;
