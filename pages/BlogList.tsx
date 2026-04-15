import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.tsx';
import Breadcrumbs from '../components/Breadcrumbs.tsx';
import { ArrowRight, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../constants.ts';

const BlogList: React.FC = () => {
    return (
        <div className="pt-52 pb-32 min-h-screen bg-black text-white/90">
            <SEO
                title="Aesthetic Surgery Blog | Dr. Sumit Aesthetics"
                description="Expert insights, recovery tips, and clinical updates on plastic and reconstructive surgery from Dr. Sumit."
                url="/blog"
            />
            <div className="container mx-auto px-6">
                <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }]} />

                <div className="mb-24 mt-8 space-y-6">
                    <span className="text-[#4A90E2] text-[10px] tracking-[0.4em] uppercase font-bold">Clinical Insights</span>
                    <h1 className="text-5xl md:text-8xl font-serif leading-none tracking-tighter">The Journal</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {BLOG_POSTS.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group glass border border-white/5 rounded-sm overflow-hidden hover:border-[#4A90E2]/30 transition-colors"
                        >
                            <Link to={`/blog/${post.id}`} className="flex flex-col h-full w-full cursor-pointer">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                        loading="lazy"
                                        width={600}
                                        height={400}
                                    />
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex items-center space-x-2 text-gray-300 text-[10px] uppercase tracking-widest mb-4">
                                        <Calendar size={12} />
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#4A90E2] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-0 line-clamp-3 font-light">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogList;

