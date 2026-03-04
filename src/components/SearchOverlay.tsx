'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, CornerDownLeft } from 'lucide-react';
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const searchIndex = [
    { title: "Home", description: "We make it easy for your website visitors to convert. Fast, modern websites that earn trust instantly.", url: "/" },
    { title: "How It Works", description: "Submit your site, we audit everything, you review the roadmap and decide.", url: "/#pricing" },
    { title: "Services", description: "Browse our service packages — Tier 1, Tier 2, Tier 3, and Tier X custom builds.", url: "/services" },
    { title: "Tier 1", description: "Foundation package. Includes website or landing page and basic SEO.", url: "/services/tier-1" },
    { title: "Tier 2", description: "System package. Includes everything in Tier 1 plus lead capture, FAQ bot, email follow-up automation, and booking CRM.", url: "/services/tier-2" },
    { title: "Tier 3", description: "Full automation package. Includes everything in Tier 2 plus full automations, AEO optimization, and phone caller automation.", url: "/services/tier-3" },
    { title: "Tier X", description: "Custom build. Fully tailored system built around your exact business needs. Quote-based.", url: "/services/tier-x" },
    { title: "Website & Landing Page", description: "High-converting websites and landing pages built to earn trust and drive action.", url: "/services/website-landing-page" },
    { title: "Automations", description: "Business automations that eliminate manual work and keep your operation running without you.", url: "/services/automations" },
    { title: "Booking CRM", description: "Booking and CRM systems that manage your clients, appointments, and follow-ups automatically.", url: "/services/booking-crm" },
    { title: "FAQ Bot & Lead Capture", description: "AI-powered FAQ bots that answer questions and capture leads around the clock.", url: "/services/faq-bot-lead-capture" },
    { title: "SEO & AEO Optimization", description: "Search engine and answer engine optimization to get your business found online.", url: "/services/seo-aeo-optimization" },
    { title: "Email Follow-up Automation", description: "Automated email sequences that follow up with leads so you never lose a potential client.", url: "/services/email-follow-up" },
    { title: "Phone Caller Automation", description: "Automated phone caller systems that reach out to leads and clients without manual dialing.", url: "/services/phone-caller-automation" },
    { title: "Blog", description: "Insights on building high-converting websites, AI optimization, and digital strategy.", url: "/blog" },
    { title: "Changelog", description: "Track updates and improvements to Spengo's services and platform.", url: "/changelog" },
    { title: "Contact", description: "Let's build your conversion engine. Start your free audit today.", url: "/#start" }
];

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const fuse = new Fuse(searchIndex, {
        keys: ['title', 'description'],
        threshold: 0.3,
        includeMatches: true,
    });

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setQuery('');
            setResults([]);
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (query.trim()) {
            const searchResults = fuse.search(query);
            setResults(searchResults);
        } else {
            setResults([]);
        }
    }, [query]);

    const highlightText = (text: string, matches: any[], key: string) => {
        if (!matches) return text;
        const match = matches.find((m: any) => m.key === key);
        if (!match) return text;

        const parts: React.ReactNode[] = [];
        let lastIndex = 0;

        // Fuse matches are sorted by beginning of range
        match.indices.forEach(([start, end]: [number, number]) => {
            // Add text before match
            if (start > lastIndex) {
                parts.push(text.slice(lastIndex, start));
            }
            // Add matched text with highlight
            parts.push(
                <span key={`${start}-${end}`} className="text-primary font-bold">
                    {text.slice(start, end + 1)}
                </span>
            );
            lastIndex = end + 1;
        });

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-6"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-bg/90 backdrop-blur-xl"
                        onClick={onClose}
                    />

                    {/* Search Box */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: -20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: -20 }}
                        className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Input Header */}
                        <div className="relative flex items-center p-6 border-b border-white/5">
                            <Search className="w-6 h-6 text-muted absolute left-8" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search Spengo..."
                                className="w-full bg-transparent border-none focus:ring-0 text-white text-xl pl-12 pr-12 placeholder:text-muted"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors absolute right-6"
                            >
                                <X className="w-5 h-5 text-muted" />
                            </button>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                            {!query.trim() ? (
                                <div className="py-12 text-center">
                                    <p className="text-muted text-sm">Type to search for services, tiers, or blog posts...</p>
                                </div>
                            ) : results.length > 0 ? (
                                <div className="space-y-2">
                                    {results.map((result, idx) => (
                                        <Link
                                            key={result.item.url}
                                            href={result.item.url}
                                            onClick={onClose}
                                            className="group block p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">
                                                        {highlightText(result.item.title, result.matches, 'title')}
                                                    </h3>
                                                    <p className="text-muted text-sm mt-1 leading-relaxed">
                                                        {highlightText(result.item.description, result.matches, 'description')}
                                                    </p>
                                                </div>
                                                <CornerDownLeft className="w-5 h-5 text-muted opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-white/60">No pages found for "<span className="text-primary italic">{query}</span>"</p>
                                </div>
                            )}
                        </div>

                        {/* Footer Tip */}
                        <div className="px-6 py-4 bg-white/5 border-t border-white/5 flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-muted">
                            <div className="flex gap-4">
                                <span><span className="text-white">ESC</span> to close</span>
                                <span><span className="text-white">ENTER</span> to select</span>
                            </div>
                            <span className="text-primary/50 italic">Spengo Search Engine</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
