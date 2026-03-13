export default function V2Page() {
  return (
    <main
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen"
    >
      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: 'rgba(250, 249, 246, 0.88)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(45, 45, 45, 0.07)',
        }}
      >
        <span
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "'Lora', serif", color: '#2D2D2D' }}
        >
          Spengo
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm font-light"
          style={{ color: '#6B6B6B' }}
        >
          <a href="#services" className="hover:text-[#2D2D2D] transition-colors duration-300">Services</a>
          <a href="#philosophy" className="hover:text-[#2D2D2D] transition-colors duration-300">Philosophy</a>
          <a href="#contact" className="hover:text-[#2D2D2D] transition-colors duration-300">Contact</a>
        </div>
        <a
          href="#contact"
          className="text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-md"
          style={{
            backgroundColor: '#2D2D2D',
            color: '#FAF9F6',
            fontWeight: 400,
          }}
        >
          Start a conversation
        </a>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24"
        style={{ backgroundColor: '#FAF9F6' }}
      >
        {/* Background texture – soft radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(180, 140, 110, 0.09) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 70%, rgba(130, 160, 130, 0.07) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-8 w-full grid md:grid-cols-2 gap-16 items-center py-24">
          {/* Left: Copy */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-px" style={{ backgroundColor: '#B48C6E' }} />
              <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#B48C6E' }}>
                Web conversion agency
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Lora', serif", color: '#1C1C1C' }}
            >
              Let&rsquo;s build something{' '}
              <em className="not-italic" style={{ color: '#B48C6E' }}>
                extraordinary
              </em>{' '}
              together.
            </h1>

            <p className="text-lg leading-relaxed font-light max-w-md" style={{ color: '#5A5A5A' }}>
              We partner with small businesses to craft beautiful, high-converting websites,
              intelligent automations, and seamless booking systems — built with care, delivered with clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: '#2D2D2D', color: '#FAF9F6' }}
              >
                Begin your project
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm transition-all duration-300 hover:bg-[#F0EDE8]"
                style={{ border: '1px solid rgba(45,45,45,0.18)', color: '#2D2D2D' }}
              >
                See our work
              </a>
            </div>

            {/* Social proof pill */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {['#D4A574', '#A8C4A0', '#7EB8C4', '#C4A0B8'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#FAF9F6]"
                    style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-sm font-light" style={{ color: '#7A7A7A' }}>
                Trusted by small businesses across Ohio and beyond
              </span>
            </div>
          </div>

          {/* Right: Editorial image block */}
          <div className="relative hidden md:block">
            <div
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #EDE8DF 0%, #D6CFC4 50%, #C9BEB0 100%)',
                boxShadow: '0 24px 64px rgba(45, 45, 45, 0.12)',
              }}
            >
              {/* Inner card — simulates editorial layout */}
              <div className="absolute inset-6 rounded-xl flex flex-col justify-between p-8"
                style={{ backgroundColor: 'rgba(250,249,246,0.6)', backdropFilter: 'blur(8px)' }}
              >
                <div className="space-y-1">
                  <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: '#B48C6E' }} />
                  <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#B48C6E' }}>
                    Case in point
                  </p>
                </div>
                <div className="space-y-4">
                  <p
                    className="text-2xl font-medium leading-snug"
                    style={{ fontFamily: "'Lora', serif", color: '#1C1C1C' }}
                  >
                    "Working with Spengo felt like having a thoughtful creative partner, not just a vendor."
                  </p>
                  <p className="text-sm font-light" style={{ color: '#7A7A7A' }}>— A satisfied small business owner</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[{ stat: '3×', label: 'Avg conversion lift' }, { stat: '14d', label: 'Avg delivery time' }].map((item) => (
                    <div key={item.stat} className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(45,45,45,0.04)' }}>
                      <p className="text-2xl font-semibold" style={{ fontFamily: "'Lora', serif", color: '#1C1C1C' }}>
                        {item.stat}
                      </p>
                      <p className="text-xs mt-1 font-light" style={{ color: '#7A7A7A' }}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating accent tag */}
            <div
              className="absolute -bottom-5 -left-5 px-5 py-3 rounded-xl text-sm"
              style={{
                backgroundColor: '#2D2D2D',
                color: '#FAF9F6',
                boxShadow: '0 8px 24px rgba(45,45,45,0.2)',
              }}
            >
              <span className="font-light">Small businesses.</span>{' '}
              <span className="font-medium">Serious results.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────── */}
      <section id="services" className="py-32 px-8" style={{ backgroundColor: '#F3F0EB' }}>
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="max-w-xl mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-px" style={{ backgroundColor: '#8AAF8A' }} />
              <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#8AAF8A' }}>
                What we craft
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-medium leading-tight mb-6"
              style={{ fontFamily: "'Lora', serif", color: '#1C1C1C' }}
            >
              Every service, purposefully designed.
            </h2>
            <p className="text-base leading-relaxed font-light" style={{ color: '#5A5A5A' }}>
              We don't believe in one-size-fits-all solutions. Each service we offer is crafted with
              the specific rhythms and realities of small business in mind.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                accent: '#B48C6E',
                title: 'High-Converting Websites',
                desc: 'Beautiful, fast, and purposeful. We build sites that tell your story and guide visitors toward becoming customers.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                accent: '#8AAF8A',
                title: 'AI Automations',
                desc: 'Let intelligent systems handle the repetitive work — follow-ups, scheduling, and lead capture — so you can focus on what matters.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                accent: '#7EB8C4',
                title: 'Booking CRMs',
                desc: 'A seamless booking experience for your customers and a clear, organized dashboard for you. No more back-and-forth.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                ),
                accent: '#C4A0B8',
                title: 'FAQ Bots',
                desc: 'Thoughtfully trained conversational bots that answer your customers\' most common questions, any hour of the day.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                accent: '#B48C6E',
                title: 'SEO & AEO Optimization',
                desc: 'Structured, semantically rich content designed to be discovered by both search engines and AI recommendation systems.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                accent: '#8AAF8A',
                title: 'Email & Phone Automations',
                desc: 'Nurture leads with warm, well-timed follow-up sequences. Automated, but always human in its tone.',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-default"
                style={{ backgroundColor: '#FAF9F6', border: '1px solid rgba(45,45,45,0.06)' }}
              >
                <div
                  className="inline-flex p-3 rounded-xl mb-5"
                  style={{ backgroundColor: `${service.accent}15`, color: service.accent }}
                >
                  {service.icon}
                </div>
                <h3
                  className="text-lg font-medium mb-3"
                  style={{ fontFamily: "'Lora', serif", color: '#1C1C1C' }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: '#6B6B6B' }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────────────────────── */}
      <section id="philosophy" className="py-32 px-8" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            {/* Left: Visual */}
            <div className="relative">
              <div
                className="w-full aspect-square rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, #EDE8DF, #D6CFC4)',
                  boxShadow: '0 20px 60px rgba(45,45,45,0.1)',
                }}
              />
              {/* Staggered quote cards */}
              <div
                className="absolute top-8 -right-6 p-5 rounded-xl w-52"
                style={{
                  backgroundColor: '#2D2D2D',
                  color: '#FAF9F6',
                  boxShadow: '0 12px 32px rgba(45,45,45,0.25)',
                }}
              >
                <p className="text-xs font-light leading-relaxed italic">
                  "Craft over speed. Clarity over cleverness."
                </p>
              </div>
              <div
                className="absolute -bottom-6 left-8 p-5 rounded-xl w-56"
                style={{
                  backgroundColor: '#FAF9F6',
                  border: '1px solid rgba(45,45,45,0.1)',
                  boxShadow: '0 12px 32px rgba(45,45,45,0.08)',
                }}
              >
                <p className="text-xs font-light leading-relaxed" style={{ color: '#5A5A5A' }}>
                  We believe every small business deserves the same quality of digital experience as a Fortune 500 company.
                </p>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <span className="inline-block w-8 h-px" style={{ backgroundColor: '#B48C6E' }} />
                <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#B48C6E' }}>
                  Our philosophy
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-medium leading-tight"
                style={{ fontFamily: "'Lora', serif", color: '#1C1C1C' }}
              >
                We believe in the quiet power of getting it right.
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: 'Partnership over transaction',
                    body: "We take time to understand your business, your customers, and what success actually looks like for you — before writing a single line of code.",
                  },
                  {
                    title: 'Craft that earns trust',
                    body: 'Every detail — the copy, the layout, the speed of your page — is a signal to your visitors. We obsess over the details so your customers feel them, even if they can\'t name them.',
                  },
                  {
                    title: 'Clarity as a feature',
                    body: 'We write proposals in plain language, give honest timelines, and explain our thinking. No jargon, no hidden processes — just clear communication from start to launch.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: '#B48C6E' }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1" style={{ color: '#1C1C1C' }}>
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed font-light" style={{ color: '#6B6B6B' }}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────── */}
      <section className="py-32 px-8" style={{ backgroundColor: '#2D2D2D' }}>
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block w-8 h-px" style={{ backgroundColor: '#B48C6E' }} />
            <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#B48C6E' }}>
              How we work
            </span>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: '#B48C6E' }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-medium leading-tight"
            style={{ fontFamily: "'Lora', serif", color: '#FAF9F6' }}
          >
            A process as clear as the results.
          </h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundColor: 'rgba(250,249,246,0.1)' }}
          />
          {[
            { step: '01', title: 'Listen', desc: 'We start by understanding your business — your goals, your customers, and what\'s not working yet.' },
            { step: '02', title: 'Craft', desc: 'We design and build with intention, sharing progress along the way so there are no surprises.' },
            { step: '03', title: 'Refine', desc: 'Real feedback shapes the final product. We iterate until it feels exactly right.' },
            { step: '04', title: 'Launch & Support', desc: 'We deploy with care and stay available after launch because a good partnership doesn\'t end at delivery.' },
          ].map((step) => (
            <div key={step.step} className="text-center relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium mx-auto mb-5 relative z-10"
                style={{ backgroundColor: '#B48C6E', color: '#FAF9F6' }}
              >
                {step.step}
              </div>
              <h3
                className="text-xl font-medium mb-3"
                style={{ fontFamily: "'Lora', serif", color: '#FAF9F6' }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed font-light" style={{ color: '#A0A0A0' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────── */}
      <section id="contact" className="py-32 px-8" style={{ backgroundColor: '#F3F0EB' }}>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px" style={{ backgroundColor: '#8AAF8A' }} />
            <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#8AAF8A' }}>
              Get in touch
            </span>
            <span className="inline-block w-8 h-px" style={{ backgroundColor: '#8AAF8A' }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-medium leading-tight"
            style={{ fontFamily: "'Lora', serif", color: '#1C1C1C' }}
          >
            Ready to begin the conversation?
          </h2>
          <p className="text-base leading-relaxed font-light" style={{ color: '#5A5A5A' }}>
            Tell us a little about your business and what you&rsquo;re looking to build.
            We&rsquo;ll review your situation and come back with a clear, honest plan — no pressure, no jargon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://spengowebsite.vercel.app/audit"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: '#2D2D2D', color: '#FAF9F6' }}
            >
              Request a free audit
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="mailto:adamgoad22@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm transition-all duration-300 hover:bg-[#E9E4DC]"
              style={{ border: '1px solid rgba(45,45,45,0.18)', color: '#2D2D2D' }}
            >
              Send us a note
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="py-12 px-8" style={{ backgroundColor: '#FAF9F6', borderTop: '1px solid rgba(45,45,45,0.07)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            className="text-xl font-semibold"
            style={{ fontFamily: "'Lora', serif", color: '#2D2D2D' }}
          >
            Spengo
          </span>
          <p className="text-sm font-light" style={{ color: '#A0A0A0' }}>
            © {new Date().getFullYear()} Spengo Technologies. Crafted with care in Ohio.
          </p>
          <div className="flex items-center gap-6 text-sm font-light" style={{ color: '#7A7A7A' }}>
            <a href="https://spengowebsite.vercel.app" className="hover:text-[#2D2D2D] transition-colors">
              Homepage
            </a>
            <a href="mailto:adamgoad22@gmail.com" className="hover:text-[#2D2D2D] transition-colors">
              Contact
            </a>
            <a href="https://spengowebsite.vercel.app/audit" className="hover:text-[#2D2D2D] transition-colors">
              Free Audit
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
