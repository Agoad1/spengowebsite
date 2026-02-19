"use client";

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth the mouse movement
    const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
    const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
            style={{
                background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(0, 229, 255, 0.05), transparent 80%)`,
            }}
        />
    );
}
