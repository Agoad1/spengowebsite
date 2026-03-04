'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import TierCard from '@/components/TierCard';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

const tiers = [
    {
        id: 'tier-1',
        name: 'Tier 1 — Foundation package',
        description: 'Perfect for small businesses looking to establish a professional presence.',
        features: ['Website or Landing Page', 'Basic SEO'],
        href: '/services/tier-1',
        cta: 'Learn More'
    },
    {
        id: 'tier-2',
        name: 'Tier 2 — System package',
        description: 'Designed for growth with automated leads and follow-ups.',
        features: ['Everything in Tier 1', 'Lead Capture', 'FAQ Bot', 'Email Follow-up Automation', 'Booking CRM'],
        href: '/services/tier-2',
        cta: 'Learn More'
    },
    {
        id: 'tier-3',
        name: 'Tier 3 — Full automation package',
        description: 'The ultimate digital transformation for hands-off business operations.',
        features: ['Everything in Tier 2', 'Full Automations', 'AEO Optimization', 'Phone Caller Automation'],
        href: '/services/tier-3',
        cta: 'Learn More'
    },
    {
        id: 'tier-x',
        name: 'Tier X — Custom build',
        description: 'Fully tailored solutions for unique business requirements.',
        features: ['Fully tailored build', 'Custom integrations', 'Dedicated support', 'Strategic consultation'],
        href: '/services/tier-x',
        cta: "Let's Talk",
        exclusive: true
    }
];

const serviceLinks = [
    { name: 'Website or Landing Page', href: '/services/website-landing-page' },
    { name: 'Automations', href: '/services/automations' },
    { name: 'Booking CRM', href: '/services/booking-crm' },
    { name: 'FAQ Bot & Lead Capture', href: '/services/faq-bot-lead-capture' },
    { name: 'SEO & AEO Optimization', href: '/services/seo-aeo-optimization' },
    { name: 'Email Follow-up', href: '/services/email-follow-up' },
    { name: 'Phone Caller Automation', href: '/services/phone-caller-automation' },
];

export default function ServicesPage() {
    return (
        <div className="relative z-10 min-h-screen bg-bg">
            <BackgroundBlobs />
            <BackgroundEngine />
            <CursorGlow />
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-outfit font-bold text-white text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight leading-[1.1] mb-6"
                        >
                            Our <span className="text-primary italic">Services</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-muted text-xl max-w-2xl mx-auto"
                        >
                            Choose the level of automation and digital presence that suits your business goals. No hidden fees, no complex pricing.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                        {tiers.map((tier, index) => (
                            <TierCard
                                key={tier.id}
                                {...tier}
                                delay={0.2 + index * 0.1}
                            />
                        ))}
                    </div>

                    <div className="border-t border-white/5 pt-24">
                        <div className="text-center mb-12">
                            <h2 className="font-outfit font-bold text-white text-3xl mb-4">Detailed Service Breakdown</h2>
                            <p className="text-muted">Explore each of our individual components</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {serviceLinks.map((service, index) => (
                                <motion.a
                                    key={service.href}
                                    href={service.href}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-body hover:border-primary hover:text-primary transition-all text-sm font-medium"
                                >
                                    {service.name}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="mt-32 text-center bg-primary/5 rounded-3xl p-12 md:p-20 border border-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />

                        <h2 className="font-outfit font-bold text-white text-3xl md:text-4xl mb-6">Not sure which one is right for you?</h2>
                        <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
                            Get a free audit of your current digital presence and a custom recommendation from our team.
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
