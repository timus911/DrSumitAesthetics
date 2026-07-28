import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { ProcedureVideo } from '../constants.ts';

// Video section for procedure pages.
//
// Two deliberate choices:
//
// 1. Click-to-load facade. A raw YouTube iframe pulls roughly 500KB of player
//    JavaScript on page load, which would undo the Core Web Vitals work. We
//    render the thumbnail from YouTube's image CDN and only mount the iframe
//    once the visitor actually clicks play.
//
// 2. VideoObject schema is emitted only for videos on Dr. Sumit's own channel.
//    Google wants contentUrl for full video rich results, which you only
//    control for your own uploads, and marking up a third party's video as
//    though it were page content is not what the markup is for.

interface ProcedureVideosProps {
  videos: ProcedureVideo[];
  procedureTitle: string;
}

const ProcedureVideos: React.FC<ProcedureVideosProps> = ({ videos, procedureTitle }) => {
  const [playing, setPlaying] = useState<string | null>(null);
  if (!videos || videos.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': videos.map(v => ({
      '@type': 'VideoObject',
      name: v.title,
      description: v.description || `${v.title} - explained by Dr. Sumit Singh Gautam, plastic surgeon in Chandigarh.`,
      thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`,
      uploadDate: v.uploadDate,
      embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
      publisher: {
        '@type': 'Organization',
        name: 'Dr. Sumit Aesthetics',
        logo: {
          '@type': 'ImageObject',
          url: 'https://drsumitaesthetics.com/logo-512.png'
        }
      }
    }))
  };

  return (
    <section className="space-y-10 pt-16 border-t border-white/5">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>

      <div className="space-y-4">
        <span className="text-[#4A90E2] text-[10px] tracking-[0.4em] uppercase font-extrabold">
          On video
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight">
          {procedureTitle}, explained
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((v, idx) => (
          <motion.div
            key={v.youtubeId}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="space-y-3"
          >
            <div className="relative aspect-video overflow-hidden rounded-sm border border-white/5 bg-black">
              {playing === v.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(v.youtubeId)}
                  aria-label={`Play video: ${v.title}`}
                  className="group absolute inset-0 w-full h-full cursor-pointer"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-black/60 border border-white/20 group-hover:bg-[#4A90E2] group-hover:border-[#4A90E2] transition-all duration-300">
                      <Play size={22} className="text-white ml-1" fill="currentColor" />
                    </span>
                  </span>
                </button>
              )}
            </div>
            <p className="text-sm text-gray-300 font-light leading-snug">{v.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProcedureVideos;
