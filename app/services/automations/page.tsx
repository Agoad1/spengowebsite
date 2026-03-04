'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { ArrowLeft, Zap, Cpu, Settings, Workflow } from 'lucide-react';
import Link from 'next/link';

export default function AutomationsServicePage() {
    const features = [
        { title: 'Custom Workflows', desc: 'Automate repetitive tasks and data entry across your business.', icon: <Workflow className="w-5 h-5" /> },
        { title: 'AI-Driven Logic', desc: 'Intelligent systems that make decisions based on your business rules.', icon: <Cpu className="w-5 h-5" /> },
        { title: 'Seamless Sync', desc: 'Connect all your favorite tools into one unified, automated engine.', icon: <Settings className="w-5 h-5" /> },
    ];

    const tiers = [
        { name: 'Tier 3 — Full Automation', href: '/services/tier-3' },
        { name: 'Tier X — Custom Build', href: '/services/tier-x' },
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
                            <Zap className="w-8 h-8 text-primary" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-outfit font-bold text-white text-5xl md:text-6xl tracking-tight mb-8"
                        >
                            Business <span className="text-primary italic">Automations</span>
                        </motion.h1>
                        <p className="text-muted text-xl leading-relaxed max-w-2xl">
                            Stop wasting time on manual tasks. Our full-scale automations handle everything from lead filtering to data synchronization, letting you focus on high-level growth.
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
                        <h2 className="font-outfit font-bold text-white text-3xl mb-6">Ready to scale hands-off?</h2>
                        <p className="text-muted mb-10 max-w-lg mx-auto">
                            Get a free audit to see which parts of your business are ready for automation.
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
