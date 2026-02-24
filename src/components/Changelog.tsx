"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Settings, Zap, Bug, Bell } from 'lucide-react';

interface ChangelogEntry {
    id: string;
    title: string;
    description: string;
    type: 'feature' | 'improvement' | 'bugfix';
    created_at: string;
    tags: string[];
}

const TYPE_CONFIG = {
    feature: {
        label: 'Feature',
        color: '#22c55e', // green-500
        icon: Zap,
        bg: 'rgba(34, 197, 94, 0.1)',
    },
    improvement: {
        label: 'Improvement',
        color: '#f97316', // orange-500
        icon: Settings,
        bg: 'rgba(249, 115, 22, 0.1)',
    },
    bugfix: {
        label: 'Bug Fix',
        color: '#ef4444', // red-500
        icon: Bug,
        bg: 'rgba(239, 68, 68, 0.1)',
    },
};

function getRelativeTime(date: string) {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Changelog() {
    const [entries, setEntries] = useState<ChangelogEntry[]>([]);
    const [filter, setFilter] = useState<'all' | 'feature' | 'improvement' | 'bugfix'>('all');
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

    const fetchEntries = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('changelog')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setEntries(data || []);
        } catch (error) {
            console.error('Error fetching changelog:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const showToast = (message: string) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast({ message: '', visible: false }), 5000);
    };

    useEffect(() => {
        fetchEntries();

        const channel = supabase
            .channel('changelog_realtime')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'changelog' },
                (payload) => {
                    const newEntry = payload.new as ChangelogEntry;
                    setEntries((prev) => [newEntry, ...prev]);
                    showToast(`New ${newEntry.type}: ${newEntry.title}`);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchEntries]);

    const filteredEntries = entries.filter((entry) =>
        filter === 'all' ? true : entry.type === filter
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
            {/* Header */}
            <div className="mb-12 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Live Updates Enabled</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
                    What&apos;s <span className="text-primary italic">New</span>
                </h1>
                <p className="text-muted text-lg max-w-xl mx-auto">
                    We&apos;re constantly improving SPENGO. Here's a real-time record of all updates, features, and bug fixes.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {(['all', 'feature', 'improvement', 'bugfix'] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${filter === type
                                ? 'bg-primary border-primary text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                : 'bg-white/5 border-white/10 text-muted hover:border-white/20 hover:text-white'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Entries */}
            <div className="space-y-6">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredEntries.map((entry) => {
                            const config = TYPE_CONFIG[entry.type];
                            const Icon = config.icon;

                            return (
                                <motion.div
                                    key={entry.id}
                                    layout
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="glass-card p-6 !transform-none group relative overflow-hidden"
                                    style={{ borderLeft: `4px solid ${config.color}` }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span
                                                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                                                    style={{ backgroundColor: config.bg, color: config.color }}
                                                >
                                                    <Icon size={12} />
                                                    {config.label}
                                                </span>
                                                <span className="text-[11px] text-muted font-medium">
                                                    {getRelativeTime(entry.created_at)}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                                                {entry.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-muted leading-relaxed mb-6 whitespace-pre-wrap">
                                        {entry.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {entry.tags?.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs text-primary/60 font-medium hover:text-primary transition-colors cursor-default"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                )}

                {!loading && filteredEntries.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-muted italic">No updates found for this category.</p>
                    </div>
                )}
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast.visible && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className="fixed bottom-8 left-1/2 z-[100] bg-[#1a1a1a] border border-primary/50 text-white px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 min-w-[320px]"
                    >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <Bell size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-primary uppercase tracking-widest">New Update</p>
                            <p className="text-sm font-medium text-white/90">{toast.message}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
