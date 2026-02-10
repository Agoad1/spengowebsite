import { useRef, useEffect } from 'react';

export default function BackgroundEngine() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
            containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <div ref={containerRef} className="grid-background" />
            <div className="scanning-beam" />
        </>
    );
}
