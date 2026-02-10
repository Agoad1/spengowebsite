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
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
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
                animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
                className="absolute inset-0 bg-cyan opacity-0 hover:opacity-10 blur-xl transition-opacity duration-300 rounded-full"
            />
        </div>
    );
}
