'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, CornerDownLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setQuery('');
            setResults([]);
            setError(false);
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
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.trim()) {
                setIsLoading(true);
                try {
                    const response = await fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`);
                    const data = await response.json();
                    if (data.success && data.results) {
                        setResults(data.results);
                        setError(false);
                    } else {
                        setResults([]);
                        setError(data.error ? true : false);
                    }
                } catch (error) {
                    console.error("Search API error:", error);
                    setResults([]);
                    setError(true);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
                setIsLoading(false);
                setError(false);
            }
        };
        fetchResults();
    }, [debouncedQuery]);

    const highlightText = (text: string) => {
        return text;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-0 md:pt-[10vh] px-0 md:px-6"
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
                        className="relative w-full h-full md:h-auto max-w-2xl bg-[#0f0f0f] md:border border-white/10 rounded-none md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
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
                        <div className="flex-1 md:max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                            {error ? (
                                <div className="py-12 text-center text-red-400">
                                    <p className="text-lg font-bold">Search temporarily unavailable</p>
                                    <p className="text-sm mt-2 opacity-80">Our AI search engine is taking a quick break. Please try again in just a moment.</p>
                                </div>
                            ) : !query.trim() ? (
                                <div className="py-12 text-center">
                                    <p className="text-muted text-sm">Type to search for services, tiers, or blog posts...</p>
                                </div>
                            ) : isLoading ? (
                                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                    <p className="text-muted text-sm font-medium animate-pulse">Searching knowledge base...</p>
                                </div>
                            ) : results.length > 0 ? (
                                <div className="space-y-2">
                                    {results.map((result, idx) => {
                                        const item = result.item || result;
                                        return (
                                            <Link
                                                key={item.url || idx}
                                                href={item.url || '#'}
                                                onClick={onClose}
                                                className="group block p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                                            >
                                                <div className="flex items-center justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">
                                                            {highlightText(item.title)}
                                                        </h3>
                                                        <p className="text-muted text-sm mt-1 leading-relaxed">
                                                            {highlightText(item.description)}
                                                        </p>
                                                    </div>
                                                    <CornerDownLeft className="w-5 h-5 text-muted opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-white/60 text-lg">No results found for "<span className="text-primary italic font-bold">{query}</span>"</p>
                                    <p className="text-muted text-sm mt-2">Try searching with different keywords.</p>
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
