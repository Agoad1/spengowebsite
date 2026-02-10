import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Layers } from 'lucide-react';

const cards = [
  {
    icon: Zap,
    title: 'Attention is compressed',
    body: "AI gives one answer. One link. Visitors arrive ready to decide. They aren't here to browse. If your site doesn't work instantly, you're invisible.",
  },
  {
    icon: ShieldCheck,
    title: 'Trust is the new filter',
    body: "Outdated, slow, or generic sites get filtered out before a buyer reads a single word. First impressions are the only impressions.",
  },
  {
    icon: Layers,
    title: "One homepage isn't enough",
    body: "Every offer, campaign, and audience needs its own page. The landing page economy is here. Most businesses haven't caught up.",
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
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan text-sm font-medium tracking-wide uppercase mb-4">The Shift</p>
          <h2 className="font-outfit font-bold text-white text-[clamp(2rem,4vw,3rem)] tracking-headline leading-[1.1]">
            The internet doesn&rsquo;t browse anymore.
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
