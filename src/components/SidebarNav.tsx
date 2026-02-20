"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
    { id: 'home', label: 'Home' },
    { id: 'pricing', label: 'How it works' },
    { id: 'audit', label: 'The risk' },
    { id: 'start', label: 'Contact' },
    { id: 'faq', label: 'FAQ' },
];

export default function SidebarNav() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0.1, 0.5, 0.8],
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection('home');
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-end gap-5">
            {sections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="group flex items-center gap-3 focus:outline-none"
                    >
                        {/* Label */}
                        <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{
                                opacity: isActive ? 1 : 0,
                                x: isActive ? 0 : 10,
                            }}
                            className="text-[12px] font-bold tracking-tight text-white group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none"
                        >
                            {section.label}
                        </motion.span>

                        {/* Dot & Ring Container */}
                        <div className="relative w-6 h-6 flex items-center justify-center">
                            {/* Outer Ring */}
                            <motion.div
                                animate={{
                                    scale: isActive ? 1 : 0,
                                    opacity: isActive ? 1 : 0,
                                    borderColor: 'var(--primary)',
                                }}
                                className="absolute inset-0 border-2 rounded-full ring-offset-bg ring-offset-2"
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            />

                            {/* Hover Ring (Subtle) */}
                            <div className="absolute inset-0 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Inner Dot */}
                            <motion.div
                                animate={{
                                    scale: isActive ? 0.35 : 0.25,
                                    backgroundColor: isActive ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                                }}
                                className="w-full h-full rounded-full transition-colors duration-300 group-hover:bg-white"
                            />

                            {/* Active Glow */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-glow"
                                    className="absolute inset-0 bg-primary/20 rounded-full blur-md"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
