"use client";

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';

interface Post {
    id: string;
    slug: string;
    title: string;
    cover_image: string | null;
    published_at: string;
    created_at: string;
}

export default function BlogShowcase({ posts }: { posts: Post[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Tracking vertical scroll of the section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // We transform vertical progress (0 to 1) into a translation string.
    // The trick "calc(-100% + 100vw)" ensures the last card stops exactly at the right edge.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

    // Add spring for that premium feeling
    const smoothX = useSpring(x, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Progress bar logic
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        /* The container height defines the "scroll duration" */
        <section
            ref={containerRef}
            className="relative"
            style={{ height: `${posts.length * 50}vh` }}
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                {/* Section Header */}
                <div className="px-6 mb-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-outfit font-bold text-white mb-6 tracking-tight">
                                The <span className="text-primary glow-noise">Blog</span>
                            </h1>
                            <p className="text-muted text-xl max-w-2xl">
                                Insights on building high-converting websites, AI optimization, and digital strategy.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* 
                    Horizontal Scroll Track
                    We use overflow-x: scroll as a clue, but we control it with motion for the 'change direction' effect.
                */}
                <div className="flex items-center overflow-x-auto no-scrollbar">
                    <motion.div
                        style={{ x: smoothX }}
                        className="flex gap-8"
                    >
                        {/* Start Spacer */}
                        <div className="shrink-0 w-[10vw]" />

                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="group relative shrink-0 w-[85vw] md:w-[500px] aspect-[16/10] bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden hover:border-primary/50 transition-all duration-500"
                            >
                                <Link href={`/blog/${post.slug}`} className="block w-full h-full relative">
                                    {post.cover_image ? (
                                        <img
                                            src={post.cover_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                            <span className="text-muted/20 font-outfit text-4xl font-bold">SPENGO</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-2 py-1 rounded-md">
                                                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-4 font-outfit leading-tight group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <div className="flex items-center text-sm font-bold text-white/70 group-hover:text-primary transition-colors">
                                            Read the article
                                            <motion.span
                                                className="ml-2"
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                →
                                            </motion.span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}

                        {/* End Spacer */}
                        <div className="shrink-0 w-[10vw]" />
                    </motion.div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-12 left-6 right-6 md:left-[10vw] md:right-[10vw]">
                    <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            style={{ scaleX, transformOrigin: "left" }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
