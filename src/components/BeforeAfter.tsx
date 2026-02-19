"use client";

import { motion } from 'framer-motion';

const cases = [
    {
        title: 'E-commerce Optimization',
        description: 'A complete performance overhaul for a high-volume retailer.',
        metrics: [
            { label: 'Load Time', before: '3.5s', after: '0.8s' },
            { label: 'Bounce Rate', before: '45%', after: '18%' },
        ],
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop', // SaaS/Digital placeholder
    },
    {
        title: 'SaaS Landing Page',
        description: 'Visual cleanup and conversion optimization for enterprise data tools.',
        metrics: [
            { label: 'Core Vitals', before: 'Poor', after: 'Great' },
            { label: 'Conversion', before: '2.4%', after: '5.1%' },
        ],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop', // Chart/Analysis placeholder
    },
    {
        title: 'Professional Services',
        description: 'Modernizing a medical practice with a premium digital presence.',
        metrics: [
            { label: 'Page Speed', before: 'D+', after: 'A+' },
            { label: 'Mobile Score', before: '42', after: '98' },
        ],
        image: 'https://images.unsplash.com/photo-1551288049-bbbda536ad37?q=80&w=2000&auto=format&fit=crop', // Tech/Service placeholder
    },
];

export default function BeforeAfter() {
    return (
        <section id="results" className="py-24 md:py-32 bg-bg relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-outfit font-bold text-white text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-[1.1] mb-6"
                    >
                        Before & After
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Hover over the cards to see how we transform cluttered, slow websites into high-performance digital machines.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cases.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="glass-card group p-6 rounded-3xl"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface/50 border border-white/5 mb-8">
                                {/* Before State */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={item.image}
                                        alt="Before overhaul"
                                        className="w-full h-full object-cover grayscale blur-[2px] opacity-40 scale-105 transition-transform duration-700 group-hover:scale-100"
                                    />
                                    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20">
                                        <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Before</span>
                                    </div>
                                </div>

                                {/* After State Overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 z-10"
                                >
                                    <img
                                        src={item.image}
                                        alt="After overhaul"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full shadow-lg z-20">
                                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">After</span>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="px-2">
                                <h3 className="font-outfit font-bold text-white text-xl mb-3 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-muted text-sm leading-relaxed mb-6">
                                    {item.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                                    {item.metrics.map(metric => (
                                        <div key={metric.label}>
                                            <span className="block text-[10px] font-bold text-muted tracking-widest uppercase mb-1">{metric.label}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm line-through text-white/30">{metric.before}</span>
                                                <span className="text-sm font-bold text-primary">→ {metric.after}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
