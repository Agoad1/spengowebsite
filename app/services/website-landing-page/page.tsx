'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { ArrowLeft, Globe, Zap, Layout, Shield } from 'lucide-react';
import Link from 'next/link';

export default function WebsiteServicePage() {
    const features = [
        { title: 'Next.js Powered', desc: 'Lightning fast load times and superior SEO out of the box.', icon: <Zap className="w-5 h-5" /> },
        { title: 'Conversion-Focused', desc: 'Designed to guide visitors toward your primary call to action.', icon: <Layout className="w-5 h-5" /> },
        { title: 'Enterprise Security', desc: 'Built with the latest security standards to keep your data safe.', icon: <Shield className="w-5 h-5" /> },
    ];

    const tiers = [
        { name: 'Tier 1 — Foundation', href: '/services/tier-1' },
        { name: 'Tier 2 — System', href: '/services/tier-2' },
        { name: 'Tier 3 — Full Automation', href: '/services/tier-3' },
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

                    <header className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-2xl bg-primary/10 border border-primary/20 w-fit mb-8"
                        >
                            <Globe className="w-8 h-8 text-primary" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-outfit font-bold text-white text-5xl md:text-6xl tracking-tight mb-8"
                        >
                            Website & <span className="text-primary italic">Landing Pages</span>
                        </motion.h1>
                        <p className="text-muted text-xl leading-relaxed max-w-2xl">
                            We don't just build websites; we build high-performance assets designed to convert. Using Next.js and modern engineering, we ensure your site is fast, secure, and beautiful.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                        {features.map((feature, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
                                <div className="text-primary mb-4">{feature.icon}</div>
                                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mb-24">
                        <h2 className="font-outfit font-bold text-white text-3xl mb-8 text-center">Included In</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {tiers.map((tier) => (
                                <Link
                                    key={tier.name}
                                    href={tier.href}
                                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-body hover:border-primary hover:text-primary transition-all font-bold"
                                >
                                    {tier.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/10 rounded-3xl p-12 border border-primary/20 text-center">
                        <h2 className="font-outfit font-bold text-white text-3xl mb-6">Need a high-converting site?</h2>
                        <p className="text-muted mb-10 max-w-lg mx-auto">
                            Let's start with a free audit of your current site to see where you're losing money.
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
