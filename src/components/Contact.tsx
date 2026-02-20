"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { trackClick } from '@/lib/analytics';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website_url: '',
        business_type: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        trackClick('contact_submit');

        const { error: submitError } = await supabase
            .from('submissions')
            .insert([formData]);

        setLoading(false);

        if (submitError) {
            setError('Something went wrong. Please try again.');
            console.error(submitError);
        } else {
            setSubmitted(true);
            setFormData({ name: '', email: '', website_url: '', business_type: '', message: '' });
        }
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
                                            <div className="space-y-3 group">
                                                <label htmlFor="name" className="text-[11px] font-bold text-muted uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">Your name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    id="name"
                                                    placeholder="Your name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                                                />
                                            </div>
                                            <div className="space-y-3 group">
                                                <label htmlFor="email" className="text-[11px] font-bold text-muted uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">Audit Delivery Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    id="email"
                                                    placeholder="Where should we send your audit?"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3 group">
                                            <label htmlFor="website" className="text-[11px] font-bold text-muted uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">Your website URL</label>
                                            <input
                                                type="url"
                                                id="website"
                                                placeholder="Your website URL"
                                                value={formData.website_url}
                                                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300"
                                            />
                                        </div>
                                        <div className="space-y-3 group">
                                            <label htmlFor="business_type" className="text-[11px] font-bold text-muted uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">Business type</label>
                                            <select
                                                required
                                                id="business_type"
                                                value={formData.business_type}
                                                onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select your business type</option>
                                                <option value="E-commerce / Online Store">E-commerce / Online Store</option>
                                                <option value="SaaS / Tech Startup">SaaS / Tech Startup</option>
                                                <option value="Local Business / Service">Local Business / Service</option>
                                                <option value="Agency / Consultancy">Agency / Consultancy</option>
                                                <option value="Creator / Personal Brand">Creator / Personal Brand</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3 group">
                                            <label htmlFor="message" className="text-[11px] font-bold text-muted uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">What's frustrating you about your current site?</label>
                                            <textarea
                                                required
                                                id="message"
                                                rows={4}
                                                placeholder="What's frustrating you about your current site?"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 resize-none"
                                            />
                                        </div>

                                        <div className="pt-6 space-y-4 text-center">
                                            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                className="w-full bg-primary text-white font-jakarta font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-jump disabled:opacity-50 text-base"
                                            >
                                                {loading ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>Receive My Free Audit <span className="opacity-50">→</span></>
                                                )}
                                            </button>
                                            <p className="text-[12px] text-muted/60 font-medium italic">
                                                Direct engineer feedback. Zero automated reports.
                                            </p>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-16 text-center"
                                    >
                                        <div className="relative inline-block mb-8">
                                            <div className="absolute inset-0 bg-cyan/20 blur-2xl rounded-full" />
                                            <div className="relative w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center border border-cyan/20">
                                                <CheckCircle2 className="w-10 h-10 text-cyan" />
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-outfit font-bold text-white mb-4">You're All Set</h3>
                                        <p className="text-muted leading-relaxed max-w-[280px] mx-auto mb-10 text-[15px]">
                                            We've received your project details. A lead engineer will review your request and get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-cyan text-xs font-bold uppercase tracking-widest border-b border-cyan/20 hover:border-cyan/100 transition-all duration-300 pb-1"
                                        >
                                            Send another request
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
