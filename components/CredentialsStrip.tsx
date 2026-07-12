import React from 'react';
import { Award, Stethoscope, Building2 } from 'lucide-react';

// Quiet credentials box for procedure-page sidebars. No heading, no sell —
// the facts carry the trust. Mirrors MedicalAuthority.tsx / BRAND.education.
const CREDENTIALS = [
    { icon: Award, text: 'Board Certified — MCh Plastic & Reconstructive Surgery' },
    { icon: Stethoscope, text: 'Fellowship in Aesthetic Surgery — Belgium' },
    { icon: Building2, text: 'Healing Hospital, Sector 34-A, Chandigarh' },
];

const CredentialsStrip: React.FC = () => {
    return (
        <div className="glass px-8 py-6 border border-white/5 space-y-4">
            {CREDENTIALS.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-4">
                    <Icon size={15} className="text-[#4A90E2]/70 mt-0.5 shrink-0" />
                    <span className="text-gray-400 text-xs leading-relaxed">{text}</span>
                </div>
            ))}
        </div>
    );
};

export default CredentialsStrip;
