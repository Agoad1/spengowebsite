import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Submit Your Project',
    body: 'Fill out a quick form with your goals and your current site. No calls. No fluff.',
  },
  {
    num: '02',
    title: 'We Scope & Plan',
    body: "We review everything and send you a clear proposal. We define the build, the timeline, and the price. You approve, we start.",
  },
  {
    num: '03',
    title: 'Design & Build',
    body: 'We design and develop your site with regular check-ins. You see progress, give feedback, and we iterate.',
  },
  {
    num: '04',
    title: 'Launch & Optimize',
    body: 'Your new site goes live. We ensure everything is fast, functional, and ready to convert.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan text-sm font-medium tracking-wide uppercase mb-4">How It Works</p>
          <h2 className="font-outfit font-bold text-white text-[clamp(2rem,4vw,3rem)] tracking-headline leading-[1.1]">
            From idea to live in 4 steps.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid md:grid-cols-4 gap-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={stepVariants}
              whileHover={{ y: -5 }}
              className="relative glass-card rounded-3xl p-8 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -top-4 -right-2 font-outfit font-black text-white/5 text-8xl leading-none pointer-events-none">
                {step.num}
              </div>
              <div className="relative pt-6">
                <div className="text-cyan text-xs font-bold tracking-widest uppercase mb-4 opacity-50">Step {step.num}</div>
                <h3 className="font-outfit font-bold text-white text-xl mb-4 tracking-tight">{step.title}</h3>
                <p className="text-muted text-[14px] leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
