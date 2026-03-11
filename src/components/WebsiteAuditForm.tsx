"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Building2,
  ShoppingCart,
  MapPin,
  Rocket,
  TrendingUp,
  MousePointerClick,
  AlertTriangle,
  Eye,
  Search,
  Users,
  Share2,
  HelpCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { trackClick } from '@/lib/analytics';

type FormData = {
  business_type: string;
  biggest_problem: string;
  traffic_source: string;
  revenue_range: string;
  name: string;
  email: string;
  website_url: string;
};

type CardOption = {
  value: string;
  label: string;
  Icon: React.ElementType | null;
  desc: string;
};

type Step = {
  id: keyof Pick<FormData, 'business_type' | 'biggest_problem' | 'traffic_source' | 'revenue_range'>;
  question: string;
  subtitle: string;
  options: CardOption[];
};

const CARD_STEPS: Step[] = [
  {
    id: 'business_type',
    question: 'What kind of business are you running?',
    subtitle: 'This helps us focus your audit on what matters most.',
    options: [
      { value: 'Service-based', label: 'Service-based', Icon: Building2, desc: 'Consulting, agency, freelance' },
      { value: 'Ecommerce', label: 'Ecommerce', Icon: ShoppingCart, desc: 'Online store, products' },
      { value: 'Local Business', label: 'Local Business', Icon: MapPin, desc: 'Brick & mortar, local services' },
      { value: 'Startup', label: 'Startup', Icon: Rocket, desc: 'Early-stage, scaling fast' },
    ],
  },
  {
    id: 'biggest_problem',
    question: "What's your biggest problem right now?",
    subtitle: "Be honest — we've seen it all.",
    options: [
      { value: 'Not enough leads', label: 'Not enough leads', Icon: TrendingUp, desc: "Traffic isn't converting" },
      { value: 'Low conversions', label: 'Low conversions', Icon: MousePointerClick, desc: "Visitors don't take action" },
      { value: 'Outdated site', label: 'Outdated site', Icon: AlertTriangle, desc: 'Site looks old or slow' },
      { value: 'No online presence', label: 'No online presence', Icon: Eye, desc: 'Hard to find online' },
    ],
  },
  {
    id: 'traffic_source',
    question: 'How are people finding you now?',
    subtitle: "We'll build on what's already working.",
    options: [
      { value: 'Google Search', label: 'Google Search', Icon: Search, desc: 'Organic or paid search' },
      { value: 'Referrals', label: 'Referrals', Icon: Users, desc: 'Word of mouth, recommendations' },
      { value: 'Social Media', label: 'Social Media', Icon: Share2, desc: 'Instagram, Facebook, TikTok' },
      { value: 'None really', label: 'None really', Icon: HelpCircle, desc: 'Just getting started' },
    ],
  },
  {
    id: 'revenue_range',
    question: "What's your monthly revenue range?",
    subtitle: 'Helps us recommend the right solutions for your stage.',
    options: [
      { value: 'Under $5k', label: 'Under $5k', Icon: null, desc: 'Early stage or pre-revenue' },
      { value: '$5k–$20k', label: '$5k–$20k', Icon: null, desc: 'Growing but not there yet' },
      { value: '$20k–$50k', label: '$20k–$50k', Icon: null, desc: 'Established, scaling up' },
      { value: '$50k+', label: '$50k+', Icon: null, desc: 'Ready to dominate' },
    ],
  },
];

const TOTAL_STEPS = CARD_STEPS.length + 1; // 4 card steps + 1 contact step

const stepVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
  },
};

function CheckIcon() {
  return (
    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
      <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WebsiteAuditForm() {
  // visibleSteps: how many steps have been revealed (1 = only step 1 visible)
  const [visibleSteps, setVisibleSteps] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    business_type: '',
    biggest_problem: '',
    traffic_source: '',
    revenue_range: '',
    name: '',
    email: '',
    website_url: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCardSelect = (stepId: Step['id'], value: string, stepIndex: number) => {
    setFormData((prev) => ({ ...prev, [stepId]: value }));
    // Reveal the next step after a short delay for a polished feel
    setTimeout(() => {
      setVisibleSteps((prev) => Math.max(prev, stepIndex + 2));
    }, 320);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: submitError } = await supabase.from('audits').insert([
      {
        business_type: formData.business_type,
        biggest_problem: formData.biggest_problem,
        traffic_source: formData.traffic_source,
        revenue_range: formData.revenue_range,
        name: formData.name,
        email: formData.email,
        website_url: formData.website_url || null,
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (submitError) {
      setError('Something went wrong. Please try again.');
      console.error(submitError);
    } else {
      trackClick('audit_submit');
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setVisibleSteps(1);
    setError('');
    setFormData({
      business_type: '',
      biggest_problem: '',
      traffic_source: '',
      revenue_range: '',
      name: '',
      email: '',
      website_url: '',
    });
  };

  // --- Success state ---
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="py-16 text-center flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-cyan/20 blur-2xl rounded-full" />
          <div className="relative w-20 h-20 bg-cyan/10 rounded-full flex items-center justify-center border border-cyan/20">
            <CheckCircle2 className="w-10 h-10 text-cyan" />
          </div>
        </div>
        <h3 className="text-3xl font-outfit font-bold text-white mb-3">Audit Request Received</h3>
        <p className="text-muted leading-relaxed max-w-[300px] mx-auto mb-10 text-[15px]">
          A real engineer will review your site and send personalized feedback within 24 hours. No automated reports.
        </p>
        <button
          onClick={resetForm}
          className="text-cyan text-xs font-bold uppercase tracking-widest border-b border-cyan/20 hover:border-cyan/100 transition-all duration-300 pb-1"
        >
          Start over
        </button>
      </motion.div>
    );
  }

  // --- Progress indicator ---
  // Steps 1–4 are card steps, step 5 is contact. Answered = step has a value selected.
  const answeredCount = [
    formData.business_type,
    formData.biggest_problem,
    formData.traffic_source,
    formData.revenue_range,
  ].filter(Boolean).length;

  return (
    <div className="space-y-8 min-h-[400px]">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
          <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Free Audit</span>
        </div>
        <h2 className="font-outfit font-bold text-white text-[clamp(1.75rem,4vw,2.5rem)] tracking-tight leading-[1.15] mb-2">
          Get Your Free Website Audit
        </h2>
        <p className="text-muted text-base leading-relaxed">
          Answer a few quick questions and we&rsquo;ll send you a personalized audit — no fluff, no sales calls.
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
          const isAnswered = i < answeredCount;
          const isCurrent = i === answeredCount && i < visibleSteps;
          return (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                isAnswered
                  ? 'bg-primary w-8'
                  : isCurrent
                  ? 'bg-primary/50 w-6'
                  : 'bg-white/10 w-4'
              }`}
            />
          );
        })}
        <span className="ml-2 text-[11px] text-muted font-medium">
          {answeredCount}/{TOTAL_STEPS}
        </span>
      </div>

      {/* Card steps */}
      {CARD_STEPS.map((step, stepIndex) => {
        if (visibleSteps <= stepIndex) return null;
        const isAnswered = !!formData[step.id];

        return (
          <motion.div
            key={step.id}
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Step label + question */}
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1.5">
                Step {stepIndex + 1} of {TOTAL_STEPS}
              </p>
              <h3 className="font-outfit font-bold text-white text-xl leading-tight">{step.question}</h3>
              <p className="text-muted text-sm mt-1">{step.subtitle}</p>
            </div>

            {/* Option cards */}
            <div className="grid grid-cols-2 gap-3">
              {step.options.map(({ value, label, Icon, desc }) => {
                const isSelected = formData[step.id] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleCardSelect(step.id, value, stepIndex)}
                    className={`relative text-left p-4 rounded-xl border transition-all duration-300 group cursor-pointer ${
                      isSelected
                        ? 'bg-primary/10 border-primary/50 shadow-[0_0_24px_rgba(168,85,247,0.12)]'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    {/* Checkmark badge when selected */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <CheckIcon />
                      </div>
                    )}

                    {/* Icon or large label for revenue cards */}
                    {Icon ? (
                      <>
                        <div
                          className={`mb-3 transition-colors duration-300 ${
                            isSelected ? 'text-primary' : 'text-muted group-hover:text-white/70'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div
                          className={`font-outfit font-semibold text-sm mb-1 transition-colors duration-300 ${
                            isSelected ? 'text-white' : 'text-white/80'
                          }`}
                        >
                          {label}
                        </div>
                      </>
                    ) : (
                      <div
                        className={`font-outfit font-bold text-2xl mb-1 transition-colors duration-300 ${
                          isSelected ? 'text-primary' : 'text-white'
                        }`}
                      >
                        {label}
                      </div>
                    )}

                    <div className="text-xs text-muted leading-snug">{desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Divider when answered and another step follows */}
            {isAnswered && stepIndex < CARD_STEPS.length - 1 && (
              <div className="h-px bg-white/5 mt-2" />
            )}
          </motion.div>
        );
      })}

      {/* Step 5: Contact info + submit */}
      {visibleSteps > CARD_STEPS.length && (
        <motion.form
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-1.5">
              Step {TOTAL_STEPS} of {TOTAL_STEPS}
            </p>
            <h3 className="font-outfit font-bold text-white text-xl leading-tight">
              Almost done — where do we send it?
            </h3>
            <p className="text-muted text-sm mt-1">No spam. Just your audit.</p>
          </div>

          <div className="space-y-3 group">
            <label className="block text-[11px] font-bold text-muted uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">
              Your Name
            </label>
            <input
              required
              type="text"
              placeholder="Jane Smith"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300"
            />
          </div>

          <div className="space-y-3 group">
            <label className="block text-[11px] font-bold text-muted uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">
              Email Address
            </label>
            <input
              required
              type="email"
              placeholder="jane@yoursite.com"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300"
            />
          </div>

          <div className="space-y-3 group">
            <label className="block text-[11px] font-bold text-muted uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">
              Website URL{' '}
              <span className="normal-case font-normal opacity-60 tracking-normal">(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://yoursite.com"
              value={formData.website_url}
              onChange={(e) => setFormData((prev) => ({ ...prev, website_url: e.target.value }))}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 mt-4"
            >
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-[13px] font-medium leading-relaxed">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-jakarta font-bold py-4 rounded-xl flex items-center justify-center gap-2 btn-jump disabled:opacity-50 text-base mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Send My Free Audit <span className="opacity-50">→</span>
              </>
            )}
          </button>

          <p className="text-[12px] text-muted/60 font-medium italic text-center">
            Real engineer feedback. Zero automated reports.
          </p>
        </motion.form>
      )}
    </div>
  );
}
