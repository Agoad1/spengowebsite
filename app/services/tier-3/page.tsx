'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import { Check, ArrowLeft, Globe, Search, MessageSquare, Mail, Calendar, UserPlus, Zap, Cpu, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Tier3Page() {
    const inclusions = [
        {
            name: 'Website or Landing Page',
            href: '/services/website-landing-page',
            icon: <Globe className="w-6 h-6 text-primary" />
        },
        {
            name: 'Full Automations',
            href: '/services/automations',
            icon: <Zap className="w-6 h-6 text-primary" />
        },
        {
            name: 'AEO Optimization',
            href: '/services/seo-aeo-optimization',
            icon: <Cpu className="w-6 h-6 text-primary" />
        },
        {
            name: 'Phone Caller Automation',
            href: '/services/phone-caller-automation',
            icon: <Phone className="w-6 h-6 text-primary" />
        },
        {
            name: 'Lead Capture & FAQ Bot',
            href: '/services/faq-bot-lead-capture',
            icon: <MessageSquare className="w-6 h-6 text-primary" />
        },
        {
            name: 'Email Follow-up',
            href: '/services/email-follow-up',
            icon: <Mail className="w-6 h-6 text-primary" />
        },
        {
            name: 'Booking CRM',
            href: '/services/booking-crm',
            icon: <Calendar className="w-6 h-6 text-primary" />
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
                            Tier 3 — <span className="text-primary">Full Automation</span>
                        </motion.h1>
                        <p className="text-muted text-xl leading-relaxed">
                            The ultimate digital transformation. A fully autonomous system that handles leads, bookings, and customer interactions while you focus on scaling your business.
                        </p>
                    </div>

                    <div className="space-y-8 mb-20">
                        <h2 className="font-outfit font-bold text-white text-3xl">What's Included</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {inclusions.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group"
                                >
                                    <div className="mb-4">{item.icon}</div>
                                    <h3 className="font-outfit font-bold text-white text-lg mb-4 group-hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                    <Link href={item.href} className="text-primary text-xs font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                        View Details <ArrowLeft className="w-3 h-3 rotate-180" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary border-2 border-primary/20 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                        <h2 className="font-outfit font-bold text-white text-3xl md:text-4xl mb-6 relative z-10">Total Business Transformation</h2>
                        <p className="text-white/80 mb-10 max-w-lg mx-auto relative z-10">
                            Ready to step out of the day-to-day and let AI handle your operations? Let's build your autonomous future.
                        </p>
                        <MagneticButton href="/#start">
                            <div className="relative inline-flex items-center gap-2 bg-white text-primary font-jakarta font-bold px-10 py-5 rounded-lg text-lg btn-jump shadow-2xl">
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
