import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Layers } from 'lucide-react';

const cards = [
  {
    icon: Zap,
    title: 'People are in a hurry',
    body: "Customers don't browse anymore. They want an answer now. If they have to wait or look for it, they'll leave.",
  },
  {
    icon: ShieldCheck,
    title: 'If it looks bad, they leave',
    body: "If your site looks old or slow, people think your business is old or slow. You lose the sale before they even read a word.",
  },
  {
    icon: Layers,
    title: "One page doesn't fit everyone",
    body: "You shouldn't send every customer to the same front door. We build specific pages for specific goals.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Problem() {
  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan text-[10px] font-bold uppercase tracking-widest mb-4 label-tracking">The Reality</p>
          <h2 className="font-outfit font-bold text-white text-[clamp(2rem,4vw,3rem)] tracking-headline leading-[1.1]">
            People don&rsquo;t browse anymore.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid md:grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="group glass-card rounded-3xl p-8 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-cyan/30 transition-colors">
                <card.icon className="w-6 h-6 text-white group-hover:text-cyan transition-colors" />
              </div>
              <h3 className="font-outfit font-bold text-white text-xl mb-4 tracking-tight">{card.title}</h3>
              <p className="text-muted text-[15px] leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
