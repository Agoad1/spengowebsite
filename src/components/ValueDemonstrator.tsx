"use client";

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Gauge, AlertTriangle, TrendingUp } from 'lucide-react';

function Counter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest: number) => {
        const val = Math.round(latest);
        return `${prefix}${val}${suffix}`;
    });

    useEffect(() => {
        const controls = animate(count, value, { duration: 1, ease: "easeOut" });
        return controls.stop;
    }, [count, value]);

    return <motion.span>{rounded}</motion.span>;
}

export default function ValueDemonstrator() {
    const [loadTime, setLoadTime] = useState(3);

    const bounceRate = Math.min(loadTime * 15, 90);
    const conversionLoss = Math.min(loadTime * 12, 85);

    return (
        <motion.section
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative pt-12 md:pt-16 pb-24 md:pb-32 overflow-hidden bg-white/[0.01]"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-risk/10 border border-risk/20 px-3 py-1 rounded-full mb-6">
                            <AlertTriangle className="w-3.5 h-3.5 text-risk" />
                            <span className="text-risk text-[10px] font-bold uppercase tracking-widest label-tracking">The Risk</span>
                        </div>
                        <h2 className="font-outfit font-bold text-white text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-[1] mb-6">
                            The cost of a <span className="text-risk">slow</span> first impression.
                        </h2>
                        <p className="text-muted text-lg mb-8 max-w-lg leading-relaxed">
                            Every second your site takes to load, you're not just losing speed—you're losing revenue.
                            Modern users decide in 50 milliseconds if they trust you.
                        </p>

                        <div className="space-y-6">
                            <div className="glass-card rounded-2xl p-6">
                                <div className="flex justify-between mb-4">
                                    <span className="text-sm font-medium text-white">Simulated Load Time</span>
                                    <span className="text-sm font-bold text-cyan">{loadTime}s</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="10"
                                    step="0.5"
                                    value={loadTime}
                                    onChange={(e) => setLoadTime(parseFloat(e.target.value))}
                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        <div className="glass-card rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Gauge className="w-16 h-16 text-white" />
                            </div>
                            <div className="relative">
                                <div className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2 label-tracking">People Leaving</div>
                                <div className="text-4xl font-outfit font-bold text-white mb-2">
                                    <Counter value={bounceRate} prefix="+" suffix="%" />
                                </div>
                                <p className="text-muted text-xs leading-relaxed">
                                    The chance someone leaves without clicking anything.
                                </p>
                            </div>
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-risk/50"
                                initial={{ width: 0 }}
                                animate={{ width: `${bounceRate}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        <div className="glass-card rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <TrendingUp className="w-16 h-16 text-white" />
                            </div>
                            <div className="relative">
                                <div className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2 label-tracking">Lost Sales</div>
                                <div className="text-4xl font-outfit font-bold text-white mb-2">
                                    <Counter value={conversionLoss} prefix="-" suffix="%" />
                                </div>
                                <p className="text-muted text-xs leading-relaxed">
                                    The money you&rsquo;re losing because the site is too slow.
                                </p>
                            </div>
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-risk/50"
                                initial={{ width: 0 }}
                                animate={{ width: `${conversionLoss}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        <div className="sm:col-span-2 glass-card rounded-3xl p-8 flex items-center gap-6 bg-cyan/[0.02]">
                            <div className="w-12 h-12 rounded-2xl bg-cyan/10 flex items-center justify-center shrink-0">
                                <TrendingUp className="w-6 h-6 text-cyan" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Our Goal: Blink of an eye</h3>
                                <p className="text-muted text-sm">
                                    We build high-speed sites that load in less than 0.8 seconds.
                                </p>
                            </div>
                        </div>

                        <div className="sm:col-span-2 mt-4 flex justify-center lg:justify-start">
                            <a
                                href="#start"
                                className="inline-flex items-center gap-2 bg-primary text-white font-jakarta font-semibold px-8 py-4 rounded-xl text-base btn-jump"
                            >
                                Start Your Free Audit
                                <span aria-hidden="true" className="text-lg">&rarr;</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
