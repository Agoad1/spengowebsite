"use client";

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TierCardProps {
    name: string;
    description: string;
    features: string[];
    href: string;
    cta: string;
    exclusive?: boolean;
    delay?: number;
}

export default function TierCard({
    name,
    description,
    features,
    href,
    cta,
    exclusive = false,
    delay = 0
}: TierCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`relative group p-8 rounded-3xl border transition-all duration-500 flex flex-col h-full ${exclusive
                    ? 'bg-gradient-to-b from-primary/10 to-transparent border-primary/30 hover:border-primary/60'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
        >
            {exclusive && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-lg shadow-primary/20">
                    Exclusive
                </div>
            )}

            <div className="mb-8">
                <h3 className="font-outfit font-bold text-2xl text-white mb-2 group-hover:text-primary transition-colors">
                    {name}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                    {description}
                </p>
            </div>

            <div className="flex-grow space-y-4 mb-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-body/90">{feature}</span>
                    </div>
                ))}
            </div>

            <Link
                href={href}
                className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all btn-jump ${exclusive
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
            >
                {cta}
                <ArrowRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
}
