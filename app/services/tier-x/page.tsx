'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { ArrowLeft, Sparkles, Code, Layers, Zap } from 'lucide-react';
import Link from 'next/link';

export default function TierXPage() {
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

                    <div className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8"
                        >
                            <Sparkles className="w-3 h-3" />
                            Bespoke Solutions
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-outfit font-bold text-white text-5xl md:text-7xl tracking-tight mb-8"
                        >
                            Tier X — <span className="text-primary italic">Custom Build</span>
                        </motion.h1>
                        <p className="text-muted text-xl leading-relaxed max-w-2xl">
                            For enterprises and high-growth startups that require unique, complex architectures and fully tailored AI integrations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            {
                                title: 'Custom Logic',
                                desc: 'Bespoke backend systems and unique business logic tailored to your exact workflow.',
                                icon: <Code className="w-6 h-6 text-primary" />
                            },
                            {
                                title: 'Deep Integrations',
                                desc: 'Seamless connection with your existing tech stack, custom APIs, and proprietary data.',
                                icon: <Layers className="w-6 h-6 text-primary" />
                            },
                            {
                                title: 'Advanced AI',
                                desc: 'Custom-trained models and sophisticated AI agents designed for your specific industry use-case.',
                                icon: <Zap className="w-6 h-6 text-primary" />
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-white/5 border border-white/10"
                            >
                                <div className="mb-6">{item.icon}</div>
                                <h3 className="font-outfit font-bold text-white text-xl mb-4">{item.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-b from-primary/20 to-transparent border border-primary/30 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                        <h2 className="font-outfit font-bold text-white text-4xl md:text-5xl mb-8">Let's build something unique.</h2>
                        <p className="text-muted text-lg mb-12 max-w-xl mx-auto">
                            Every Custom Build starts with a deep dive into your business. No fixed inclusions, just pure engineering excellence.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <MagneticButton href="/#start">
                                <div className="relative inline-flex items-center gap-2 bg-primary text-white font-jakarta font-bold px-12 py-6 rounded-xl text-xl btn-jump shadow-[0_20px_40px_rgba(168,85,247,0.3)]">
                                    Let's Talk
                                    <ArrowLeft className="w-5 h-5 rotate-180" />
                                </div>
                            </MagneticButton>

                            <Link href="/services" className="text-white hover:text-primary transition-colors font-bold">
                                View Standard Tiers
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
