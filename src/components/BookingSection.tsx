"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Clock, Calendar as CalendarIcon, ArrowRight, Loader2 } from 'lucide-react';

interface Session {
    id: string;
    title: string;
    description: string;
    duration_minutes: number;
    category_id: string;
    session_categories: { name: string } | null;
}

export default function BookingSection() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

    useEffect(() => {
        fetchActiveSessions();
    }, []);

    const fetchActiveSessions = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('sessions')
            .select(`
                id,
                title,
                description,
                duration_minutes,
                category_id,
                session_categories(name)
            `)
            .eq('is_active', true)
            .order('created_at', { ascending: true });

        if (!error && data) {
            setSessions(data as any);
        } else {
            console.error("Error fetching sessions:", error);
        }
        setLoading(false);
    };

    // Grouping logic if needed, but for now we just map them nicely
    const categories = Array.from(new Set(sessions.map(s => s.session_categories?.name || 'General')));

    return (
        <section id="booking" className="relative py-24 md:py-32 overflow-hidden bg-white/[0.01]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6"
                    >
                        <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Book A Session</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-outfit font-bold text-white text-[clamp(2.5rem,4vw,3.5rem)] tracking-tight leading-[1.1] mb-6 max-w-2xl mx-auto"
                    >
                        Ready to elevate your <span className="opacity-40 italic">strategy?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted text-lg max-w-xl mx-auto leading-relaxed"
                    >
                        Select a session block below to lock in time directly with our senior engineers and strategists.
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <p className="text-muted font-medium text-sm">Loading available sessions...</p>
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <p className="text-muted text-lg">No sessions are currently open for booking.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sessions.map((session, i) => (
                                <motion.div
                                    key={session.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedSessionId(session.id)}
                                    className={`relative p-8 rounded-3xl border transition-all duration-300 cursor-pointer group flex flex-col h-full overflow-hidden ${selectedSessionId === session.id
                                            ? 'bg-primary/10 border-primary/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-[1.02]'
                                            : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                                        }`}
                                >
                                    {selectedSessionId === session.id && (
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-[40px] pointer-events-none rounded-full" />
                                    )}

                                    <div className="mb-6 flex justify-between items-start">
                                        <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-lg">
                                            {session.session_categories?.name || 'Strategy'}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-muted/70 text-sm font-medium">
                                            <Clock size={16} />
                                            {session.duration_minutes}m
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white font-outfit mb-3 pr-4">
                                        {session.title}
                                    </h3>

                                    <p className="text-muted text-sm leading-relaxed mb-8 flex-1">
                                        {session.description}
                                    </p>

                                    <div className={`mt-auto pt-6 border-t font-bold flex items-center justify-between transition-colors ${selectedSessionId === session.id ? 'border-primary/20 text-white' : 'border-white/5 text-muted group-hover:text-white'
                                        }`}>
                                        <span className="text-sm uppercase tracking-widest">
                                            {selectedSessionId === session.id ? 'Selected' : 'Select Session'}
                                        </span>
                                        <ArrowRight size={18} className={`transition-transform duration-300 ${selectedSessionId === session.id ? 'translate-x-1 text-primary' : 'group-hover:translate-x-1'
                                            }`} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <AnimatePresence>
                        {selectedSessionId && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 40 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-white/[0.03] border border-primary/30 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-400"></div>
                                    <div>
                                        <h4 className="text-white font-bold font-outfit text-xl mb-2">Configure Your Booking</h4>
                                        <p className="text-muted text-sm">You selected a session. Let's find a time that works.</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            alert("Step 2: Proceeding to Calendar Selection Flow (Next Issue)");
                                        }}
                                        className="w-full md:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                                    >
                                        <CalendarIcon size={18} />
                                        Continue to Calendar
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
