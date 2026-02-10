import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <motion.section
            id="start"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative py-24 md:py-32 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 px-3 py-1 rounded-full mb-6">
                            <span className="text-cyan text-[10px] font-bold uppercase tracking-widest">Get Started</span>
                        </div>
                        <h2 className="font-outfit font-bold text-white text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-[1] mb-6">
                            Let&rsquo;s build your <span className="opacity-40 italic">conversion engine.</span>
                        </h2>
                        <p className="text-muted text-lg mb-10 max-w-md leading-relaxed">
                            Ready to stop losing visitors and start winning trust? Fill out the form and we&rsquo;ll get back to you with a direct plan. No sales calls, just solutions.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <span className="text-cyan font-bold text-sm">01</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Direct Communication</h4>
                                    <p className="text-muted text-sm">We value your time. All communication is direct, clear, and focused on your goals.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <span className="text-cyan font-bold text-sm">02</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">Transparent Proposals</h4>
                                    <p className="text-muted text-sm">You&rsquo;ll receive a detailed scope and fixed transparent pricing. No hidden fees.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative"
                    >
                        <div className="glass-card rounded-[2rem] p-8 md:p-10">
                            <AnimatePresence mode="wait">
                                {!submitted ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    id="name"
                                                    placeholder="John Doe"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-muted/50 focus:outline-none focus:border-cyan/50 transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    id="email"
                                                    placeholder="john@company.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-muted/50 focus:outline-none focus:border-cyan/50 transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="website" className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Current Website (Optional)</label>
                                            <input
                                                type="url"
                                                id="website"
                                                placeholder="https://example.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-muted/50 focus:outline-none focus:border-cyan/50 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-xs font-bold text-muted uppercase tracking-widest ml-1">Your Project Goals</label>
                                            <textarea
                                                required
                                                id="message"
                                                rows={4}
                                                placeholder="Tell us what you're looking to build or solve..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-muted/50 focus:outline-none focus:border-cyan/50 transition-colors resize-none"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <MagneticButton className="w-full">
                                                <button
                                                    disabled={loading}
                                                    type="submit"
                                                    className="w-full bg-cyan text-bg font-jakarta font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] transition-all disabled:opacity-50"
                                                >
                                                    {loading ? (
                                                        <div className="w-5 h-5 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            Submit Project Request <ArrowRight className="w-4 h-4" />
                                                        </>
                                                    )}
                                                </button>
                                            </MagneticButton>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 text-center"
                                    >
                                        <div className="w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <CheckCircle2 className="w-10 h-10 text-cyan" />
                                        </div>
                                        <h3 className="text-2xl font-outfit font-bold text-white mb-4">Request Received</h3>
                                        <p className="text-muted leading-relaxed max-w-xs mx-auto mb-10">
                                            We've received your project details. A lead engineer will review your request and get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-cyan text-sm font-bold border-b border-cyan/30 hover:border-cyan transition-colors"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-32 pt-24 border-t border-white/5"
                >
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="text-white font-bold mb-3">Why no discovery calls?</h4>
                            <p className="text-muted text-sm leading-relaxed">We review your site up-front and send a clear plan. No scheduling friction, no wasted time.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-3">What if I have a site already?</h4>
                            <p className="text-muted text-sm leading-relaxed">Perfect. We audit your current performance and focus on where you are losing customers.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-3">How long does it take?</h4>
                            <p className="text-muted text-sm leading-relaxed">Most builds/upgrades are completed in 2-4 weeks. You get a clear timeline in your proposal.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
