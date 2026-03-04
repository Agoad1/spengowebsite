'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { Check, ArrowLeft, Globe, Search } from 'lucide-react';
import Link from 'next/link';

export default function Tier1Page() {
    const inclusions = [
        {
            name: 'Website or Landing Page',
            description: 'A high-converting, performance-optimized website or landing page built with Next.js.',
            href: '/services/website-landing-page',
            icon: <Globe className="w-6 h-6 text-primary" />
        },
        {
            name: 'Basic SEO',
            description: 'Fundamental search engine optimization to ensure your site is discoverable by Google.',
            href: '/services/seo-aeo-optimization',
            icon: <Search className="w-6 h-6 text-primary" />
        }
    ];

    return (
        <div className="relative z-10 min-h-screen bg-bg">
            <BackgroundBlobs />
            <BackgroundEngine />
            <CursorGlow />
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/services" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </Link>

                    <div className="mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-outfit font-bold text-white text-5xl md:text-6xl tracking-tight mb-6"
                        >
                            Tier 1 — <span className="text-primary">Foundation</span>
                        </motion.h1>
                        <p className="text-muted text-xl leading-relaxed">
                            The essential digital foundation for businesses that need a professional, high-performance presence without the complexity of full automation.
                        </p>
                    </div>

                    <div className="space-y-8 mb-20">
                        <h2 className="font-outfit font-bold text-white text-3xl">What's Included</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {inclusions.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group"
                                >
                                    <div className="mb-4">{item.icon}</div>
                                    <h3 className="font-outfit font-bold text-white text-xl mb-2 group-hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-muted text-sm mb-6">
                                        {item.description}
                                    </p>
                                    <Link href={item.href} className="text-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                        View Details <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/10 rounded-3xl p-12 border border-primary/20 text-center">
                        <h2 className="font-outfit font-bold text-white text-3xl mb-6">Ready to build your foundation?</h2>
                        <p className="text-muted mb-10 max-w-lg mx-auto">
                            Get started with a free audit and see how we can transform your digital presence.
                        </p>
                        <MagneticButton href="/#start">
                            <div className="relative inline-flex items-center gap-2 bg-primary text-white font-jakarta font-semibold px-10 py-5 rounded-lg text-lg btn-jump">
                                Start Your Free Audit
                                <span aria-hidden="true" className="text-xl">&rarr;</span>
                            </div>
                        </MagneticButton>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
