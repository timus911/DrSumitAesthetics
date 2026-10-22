import React from 'react';
import { BRAND } from '../constants';

// Author, registration and sources for a medically reviewed page. The NMC
// advertising guidelines (6 Oct 2026, 3.2 Explanation III) require name,
// qualifications, registration status and number on every public
// communication; the dated review and reference list back the clinical figures.
interface ReviewedByProps {
    reviewedOn: string; // ISO date, e.g. "2026-10-22"
    references?: { citation: string; url: string }[];
}

const formatDate = (iso: string) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const ReviewedBy: React.FC<ReviewedByProps> = ({ reviewedOn, references }) => (
    <div className="space-y-8 pt-12 border-t border-white/5">
        <div className="glass p-8 border border-white/5 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#4A90E2] font-bold">Written and medically reviewed by</p>
            <p className="text-white font-serif text-2xl">{BRAND.name}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{BRAND.qualifications}</p>
            <p className="text-gray-400 text-sm leading-relaxed">Registered medical practitioner, Reg. No. {BRAND.registration}</p>
            <p className="text-gray-300 text-xs pt-2">
                Reviewed on <time dateTime={reviewedOn}>{formatDate(reviewedOn)}</time>
            </p>
        </div>

        {references && references.length > 0 && (
            <div className="space-y-4">
                <h3 className="text-xl font-serif text-white">References</h3>
                <ol className="list-decimal ml-5 space-y-3 text-gray-400 text-sm leading-relaxed">
                    {references.map((ref) => (
                        <li key={ref.url}>
                            {ref.citation}{' '}
                            <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-[#4A90E2] hover:underline break-all">
                                {ref.url.replace(/^https?:\/\//, '')}
                            </a>
                        </li>
                    ))}
                </ol>
            </div>
        )}
    </div>
);

export default ReviewedBy;
