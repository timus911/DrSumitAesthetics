import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { NMC_GUIDELINES } from '../constants.ts';

// Stands in for content the NMC advertising guidelines no longer allow on the
// site (results photos, patient reviews). Quotes the clauses verbatim, so the
// page says exactly what the rule is rather than paraphrasing it.
interface ComplianceNoticeProps {
    eyebrow: string;
    title: string;
    intro: string;
    clauses: { ref: string; text: string }[];
    closing: string[];
}

const ComplianceNotice: React.FC<ComplianceNoticeProps> = ({ eyebrow, title, intro, clauses, closing }) => (
    <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-6">
                <span className="text-[#D4AF37] text-[10px] tracking-widest uppercase">{eyebrow}</span>
                <h1 className="text-5xl md:text-7xl font-serif">{title}</h1>
                <p className="text-gray-300 text-lg font-light leading-relaxed">{intro}</p>
            </div>

            <div className="glass border border-[#4A90E2]/20 p-8 md:p-12 space-y-8">
                <div className="flex items-start gap-4">
                    <ShieldCheck size={24} className="text-[#4A90E2] shrink-0 mt-1" />
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#4A90E2] font-bold leading-relaxed">
                        {NMC_GUIDELINES.notice}, dated {NMC_GUIDELINES.date}
                    </p>
                </div>
                {clauses.map((clause) => (
                    <figure key={clause.ref} className="space-y-3 border-l-2 border-[#4A90E2]/40 pl-6">
                        <blockquote className="text-white font-serif text-xl leading-relaxed">
                            &ldquo;{clause.text}&rdquo;
                        </blockquote>
                        <figcaption className="text-gray-400 text-xs tracking-wider">{clause.ref}</figcaption>
                    </figure>
                ))}
                <a
                    href={NMC_GUIDELINES.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-[#4A90E2] hover:underline break-words"
                >
                    Read the full guidelines (PDF, nmc.org.in)
                </a>
            </div>

            <div className="space-y-4">
                {closing.map((para) => (
                    <p key={para} className="text-gray-300 font-light leading-relaxed">{para}</p>
                ))}
            </div>
        </div>
    </div>
);

export default ComplianceNotice;
