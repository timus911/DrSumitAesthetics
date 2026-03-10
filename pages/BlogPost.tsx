import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { BLOG_POSTS } from '../constants.ts';
import SEO from '../components/SEO.tsx';
import Breadcrumbs from '../components/Breadcrumbs.tsx';

const BlogPost: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.id === id);

    if (!post) {
        return (
            <div className="h-screen flex items-center justify-center text-center bg-black">
                <div className="space-y-6">
                    <h2 className="text-4xl font-serif mb-6 text-white">Article Not Found</h2>
                    <button onClick={() => navigate('/blog')} className="text-[#4A90E2] uppercase tracking-widest text-xs border-b border-[#4A90E2] pb-1 font-bold">Back to Journal</button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-52 pb-32 bg-black min-h-screen">
            <SEO
                title={`${post.title} | The Journal`}
                description={post.excerpt}
                url={`/blog/${post.id}`}
                image={post.image}
                schemaType="Article"
                type="article"
                procedureName={post.title}
                articleDate={post.date}
            />

            <div className="container mx-auto px-6 max-w-4xl">
                <Breadcrumbs
                    items={[
                        { name: 'Blog', path: '/blog' },
                        { name: post.title, path: `/blog/${post.id}` }
                    ]}
                />

                <div className="mb-12 mt-8">
                    <Link to="/blog" className="inline-flex items-center space-x-3 text-gray-500 hover:text-[#4A90E2] transition-colors group uppercase tracking-widest text-[10px] font-bold">
                        <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" />
                        <span>Back to Journal</span>
                    </Link>
                </div>

                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <header className="space-y-8 border-b border-white/5 pb-12">
                        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">{post.title}</h1>

                        <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-[#4A90E2]" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={14} className="text-[#4A90E2]" />
                                <span>Dr. Sumit Singh Gautam</span>
                            </div>
                        </div>
                    </header>

                    <div className="aspect-video w-full overflow-hidden rounded-sm glass">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-90"
                            loading="eager"
                        />
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-white prose-a:text-[#4A90E2] prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed pt-8">
                        {post.content.split('\n').map((line, i) => {
                            const trimmed = line.trim();
                            if (!trimmed) return <br key={i} className="hidden" />;

                            if (trimmed.startsWith('## ')) {
                                return <h2 key={i} className="text-3xl text-[#4A90E2] mt-12 mb-6 border-b border-white/5 pb-4">{trimmed.replace('## ', '')}</h2>;
                            }
                            if (trimmed.startsWith('### ')) {
                                return <h3 key={i} className="text-xl mt-8 mb-4">{trimmed.replace('### ', '')}</h3>;
                            }
                            if (trimmed.startsWith('* ')) {
                                const listText = trimmed.replace('* ', '');
                                const listParts = listText.split(/(\*\*.*?\*\*)/g);
                                return (
                                    <div key={i} className="flex items-start space-x-3 ml-4 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A90E2] mt-2.5 shrink-0" />
                                        <span className="text-gray-400">
                                            {listParts.map((part, index) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                                                }
                                                return part;
                                            })}
                                        </span>
                                    </div>
                                );
                            }

                            // Simple bold text replacement
                            const parts = trimmed.split(/(\*\*.*?\*\*)/g);
                            return (
                                <p key={i} className="mb-6">
                                    {parts.map((part, index) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                                        }
                                        return part;
                                    })}
                                </p>
                            );
                        })}
                    </div>

                    <div className="pt-16 border-t border-white/5 mt-20">
                        <div className="glass p-12 text-center space-y-6 shadow-2xl">
                            <h3 className="text-2xl font-serif text-white">Have Questions?</h3>
                            <p className="text-gray-400 font-light max-w-lg mx-auto">Discuss your specific needs and expected outcomes with Dr. Sumit directly.</p>
                            <Link to="/contact" className="inline-block px-8 py-4 bg-[#4A90E2] text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all">
                                Request Consultation
                            </Link>
                        </div>
                    </div>
                </motion.article>
            </div>
        </div>
    );
};

export default BlogPost;
