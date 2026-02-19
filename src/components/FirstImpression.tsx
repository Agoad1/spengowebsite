import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, CreditCard, Target, ArrowRight, Timer } from 'lucide-react';
import MagneticButton from './MagneticButton';

const questionCards = [
    {
        icon: Search,
        iconTxt: "🔍",
        heading: "What do you sell?",
        body: "88% of visitors leave if they can't figure this out in 5 seconds"
    },
    {
        icon: CheckCircle,
        iconTxt: "✅",
        heading: "Do you have what I want?",
        body: "Cluttered sites with 40+ elements convert 50% less than clear sites"
    },
    {
        icon: CreditCard,
        iconTxt: "💳",
        heading: "How do I buy it?",
        body: "Every extra second of confusion costs 7% in conversions"
    }
];

export default function FirstImpression() {
    const [seconds, setSeconds] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

    // Dynamic Content Logic
    const getBadSiteContent = (s: number) => {
        if (s < 5) return "Landing on page...";
        if (s < 15) return "What do they sell? 🤔";
        if (s < 25) return "Where is it? 😤";
        if (s < 30) return "Ugh, forget it 😡";
        return "I'm leaving ❌";
    };

    const getGoodSiteContent = (s: number) => {
        if (s < 5) return "Landing on page...";
        if (s < 15) return "I understand what they sell ✓";
        if (s < 25) return "Found what I want ✓";
        if (s < 30) return "Price is good ✓";
        return "Buying now! 🎯";
    };

    return (
        <section id="audit" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-bg">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header Section */}
                <motion.div
                    style={{ opacity, scale }}
                    className="mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                        <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest">⚠️ THE RISK</span>
                    </div>
                    <h2 className="font-outfit font-bold text-white text-[clamp(2rem,5vw,48px)] tracking-tight leading-[1.1] mb-4">
                        Visitors Decide in 30 Seconds
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Question Cards */}
                    <div className="space-y-4">
                        {questionCards.map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="question-card group"
                            >
                                <div className="question-card-icon">
                                    <card.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="question-card-heading">{card.heading}</h3>
                                <p className="question-card-body">{card.body}</p>
                            </motion.div>
                        ))}

                        {/* Goal Card (Desktop Only) */}
                        <div className="hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="goal-card"
                            >
                                <div className="goal-card-icon">
                                    <Target className="w-8 h-8" />
                                </div>
                                <h3 className="goal-card-heading">Our Goal: Answer All 3 Questions Instantly</h3>
                                <p className="goal-card-body">
                                    We build sites so clear that visitors know what you
                                    sell, find what they want, and buy—all in under 30 seconds.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: Interactive Slider */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="decision-window-slider"
                        >
                            <div className="slider-title">
                                <span className="flex items-center gap-2">
                                    <Timer className="w-5 h-5 text-primary" />
                                    The 30-Second Decision Window
                                </span>
                                <span className="time-display">{seconds.toString().padStart(2, '0')}s</span>
                            </div>

                            <div className="timeline-content">
                                {/* Bad Site Column */}
                                <div className="bad-site">
                                    <div className="site-label">Confusing Site</div>
                                    <div className="timeline-text">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={getBadSiteContent(seconds)}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {getBadSiteContent(seconds)}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                    <div className="timeline-stats">
                                        88% bounce rate<br />
                                        1.5% conversion
                                    </div>
                                </div>

                                {/* Good Site Column */}
                                <div className="good-site">
                                    <div className="site-label">Clear Site</div>
                                    <div className="timeline-text">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={getGoodSiteContent(seconds)}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {getGoodSiteContent(seconds)}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                    <div className="timeline-stats">
                                        12% bounce rate<br />
                                        3.8% conversion
                                    </div>
                                </div>
                            </div>

                            {/* NEW: Instruction Text */}
                            <div className="slider-instruction">← Drag to see the difference →</div>

                            <div className="slider-container">
                                <input
                                    type="range"
                                    min="0"
                                    max="30"
                                    value={seconds}
                                    onChange={(e) => setSeconds(parseInt(e.target.value))}
                                    className="decision-slider"
                                    aria-label="30-second decision timeline"
                                />
                            </div>

                            <p className="text-center mt-6 text-muted text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                                Drag to see what happens over 30 seconds
                            </p>

                            <MagneticButton href="#start" className="w-full">
                                <button className="slider-cta">
                                    Start Your Free Audit <ArrowRight className="w-5 h-5" />
                                </button>
                            </MagneticButton>
                        </motion.div>

                        {/* Goal Card (Mobile Only) */}
                        <div className="block lg:hidden">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="goal-card"
                            >
                                <div className="goal-card-icon">
                                    <Target className="w-8 h-8" />
                                </div>
                                <h3 className="goal-card-heading">Our Goal: Answer All 3 Questions Instantly</h3>
                                <p className="goal-card-body">
                                    We build sites so clear that visitors know what you
                                    sell, find what they want, and buy—all in under 30 seconds.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
}
