"use client";

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function RiskReversal() {
    return (
        <section className="py-24 bg-surface relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8"
                >
                    <ShieldCheck className="w-8 h-8 text-primary" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-outfit font-bold text-white text-[clamp(2rem,4vw,3.5rem)] tracking-tight leading-tight mb-6"
                >
                    Zero Risk, All Reward
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
                >
                    We don't do meaningless monthly retainers or hidden fees. We provide a clear, professional audit for free. If you don't believe our plan will transform your site's performance, you walk away with the audit and pay zero. If we do work together and you aren't wowed by the results, we'll give you every cent back. <span className="text-white font-bold glow-noise">The risk is entirely on us.</span>
                </motion.p>
            </div>

            {/* Decorative background element - polished with larger spread and dual gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px] pointer-events-none opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[100px] pointer-events-none opacity-30" />
        </section>
    );
}
