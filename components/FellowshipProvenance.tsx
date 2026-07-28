import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Provenance block for the two procedures Dr. Sumit trained in directly under
// the surgeons who originated them - microfat/nanofat grafting and the MACS
// lift, both developed by Dr. Patrick Tonnard and Dr. Alexis Verpaele in Ghent.
// Rendered on a procedure page when `fellowshipAnchor` is set, so the claim sits
// next to the operation it actually applies to rather than being buried in About.

interface FellowshipImage {
  num: number;
  caption: string;
}

// Curated from the fellowship set on the About page. Order is deliberate:
// the certificate and the clinic roster carry the documentary weight, so they
// lead; theatre and teaching images follow as supporting context.
const IMAGES: FellowshipImage[] = [
  { num: 4, caption: 'Certificate of achievement, Tonnard & Verpaele, Ghent' },
  { num: 8, caption: 'Listed as Fellow on the Tonnard & Verpaele clinic roster' },
  { num: 1, caption: 'Teaching session with Dr. Tonnard and Dr. Verpaele' },
  { num: 2, caption: 'Operating during the fellowship' },
  { num: 7, caption: 'The Platform aesthetic meeting, Belgium' },
  { num: 6, caption: 'With a co-fellow between cases' },
];

const FellowshipProvenance: React.FC = () => {
  return (
    <section className="space-y-10 pt-16 border-t border-white/5">
      <div className="space-y-6">
        <span className="text-[#4A90E2] text-[10px] tracking-[0.4em] uppercase font-extrabold">
          Trained by the originators
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
          Fellowship in Ghent, Belgium
        </h2>
        <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-3xl">
          Dr. Sumit completed his Fellowship in Aesthetic Surgery under{' '}
          <span className="text-white">Dr. Patrick Tonnard</span> and{' '}
          <span className="text-white">Dr. Alexis Verpaele</span> - the surgeons who
          developed microfat and nanofat grafting, and the MACS lift, techniques now
          practised worldwide. The distinction matters here: fat grafting outcomes turn
          almost entirely on harvesting and processing technique, which is learned at
          the bench and in theatre rather than from a paper.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {IMAGES.map((img, idx) => (
          <motion.figure
            key={img.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="group relative overflow-hidden rounded-sm border border-white/5 bg-white/5"
          >
            <img
              src={`${import.meta.env.BASE_URL}personal/personal-${img.num}.webp`}
              alt={`Dr. Sumit Singh Gautam - ${img.caption}`}
              loading="lazy"
              className="w-full h-full object-cover aspect-[4/3] grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-3 text-[10px] leading-snug text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {img.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <Link
        to="/about"
        className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white border-b border-white/20 pb-2 hover:border-[#4A90E2] transition-all font-bold"
      >
        <span>More on Dr. Sumit's training</span>
        <ArrowRight size={13} />
      </Link>
    </section>
  );
};

export default FellowshipProvenance;
