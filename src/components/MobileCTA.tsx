import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MobileCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 500px
            setVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 z-[60] md:hidden"
                >
                    <a
                        href="#start"
                        className="flex items-center justify-center w-full bg-primary text-white font-jakarta font-bold py-4 rounded-xl shadow-[0_8px_30px_rgba(168,85,247,0.3)] backdrop-blur-md btn-jump"
                    >
                        Start Your Free Audit
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
