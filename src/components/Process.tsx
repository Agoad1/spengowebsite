import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Submit Your Project',
    body: 'Fill out a quick form with your goals, current site (if any), and what you need. No calls, no fluff.',
  },
  {
    num: '02',
    title: 'We Scope & Plan',
    body: "We review everything and send you a clear proposal — what we'll build, timeline, and price. You approve, we start.",
  },
  {
    num: '03',
    title: 'Design & Build',
    body: 'We design and develop your site with check-ins along the way. You see progress, give feedback, we iterate.',
  },
  {
    num: '04',
    title: 'Launch & Optimize',
    body: 'Your new site goes live. We make sure everything is fast, functional, and ready to convert.',
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
          <h2 className="font-syne font-bold text-white text-[clamp(2rem,4vw,3rem)] tracking-headline leading-[1.1]">
            From idea to live in 4 steps.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid md:grid-cols-4 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={stepVariants}
              className="relative rounded-2xl border border-card-border bg-card p-8 backdrop-blur-sm"
            >
              <span className="font-syne font-bold text-cyan/30 text-5xl absolute top-6 right-6 select-none">
                {step.num}
              </span>
              <div className="relative">
                <h3 className="font-syne font-bold text-white text-lg mb-3 mt-8">{step.title}</h3>
                <p className="text-muted text-[15px] leading-[1.7]">{step.body}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-card-border" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
