import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Why don't you do calls?",
    a: "Because a clear form gets us the same info in less time. We review your details, scope the project properly, and send you a plan. No scheduling friction, no wasted time.",
  },
  {
    q: 'How long does a project take?',
    a: "Most builds take 2-4 weeks depending on scope. Upgrades can be faster. You'll get a clear timeline in your proposal.",
  },
  {
    q: 'What if I already have a website?',
    a: "Perfect. We audit it, identify what's costing you conversions, and upgrade it into a site that actually performs.",
  },
  {
    q: 'Do you write the copy too?',
    a: 'We provide copywriting direction and structure. If you need full copy, we can scope that into your project.',
  },
  {
    q: "What's the AI optimization about?",
    a: "AI tools like ChatGPT and Perplexity are replacing Google for a lot of searches. We structure your site so it's clear, proof-driven, and easy for both humans and AI to understand and recommend.",
  },
];

function FAQItem({ item, isOpen, toggle }: { item: typeof faqs[0]; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-card-border">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-jakarta font-medium text-white text-base pr-4 group-hover:text-cyan transition-colors duration-200">
          {item.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="text-muted text-[15px] leading-[1.7] pb-6 max-w-[640px]">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan text-sm font-medium tracking-wide uppercase mb-4">FAQ</p>
          <h2 className="font-outfit font-bold text-white text-[clamp(2rem,4vw,3rem)] tracking-headline leading-[1.1] mb-12">
            Questions? Answered.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
