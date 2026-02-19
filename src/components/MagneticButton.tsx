"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
}

export default function MagneticButton({ children, className = '', href, onClick }: MagneticButtonProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Magnetic pull (strength factor 0.35)
        setPosition({ x: x * 0.35, y: y * 0.35 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const content = (
        <motion.div
            animate={{
                x: position.x,
                y: position.y,
                scale: position.x !== 0 ? 1.05 : 1
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, mass: 0.1 }}
            className="relative z-10"
        >
            {children}
        </motion.div>
    );

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {href ? (
                <a href={href} className="block w-full h-full">
                    {content}
                </a>
            ) : (
                <button onClick={onClick} className="block w-full h-full text-left">
                    {content}
                </button>
            )}

            {/* Background glow that follows slightly behind */}
            <motion.div
                animate={{
                    x: position.x * 0.4,
                    y: position.y * 0.4,
                    scale: position.x !== 0 ? 1.2 : 1,
                    opacity: position.x !== 0 ? 0.4 : 0
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.1 }}
                className="absolute inset-0 bg-primary/40 blur-2xl pointer-events-none rounded-full"
            />
        </div>
    );
}
