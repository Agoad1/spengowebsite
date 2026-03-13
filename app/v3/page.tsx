import React from 'react';
import Link from 'next/link';

export default function V3Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">SPENGO</span>
        </div>
        <Link
          href="#contact"
          className="bg-white text-black font-semibold px-5 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm uppercase tracking-wide"
        >
          Get Started
        </Link>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="px-6 py-24 md:py-32 flex flex-col items-center text-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 text-sm font-medium text-gray-300 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Supercharge Your Growth
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight mb-6">
            Build Faster. Scale Harder. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Automate Everything.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
            Unlock exponential growth with high-converting websites, powerful SEO, and AI automations. We engineer systems that drive results, so you can focus on scaling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-bold text-lg rounded-md transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2"
            >
              Start Building Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-lg rounded-md border border-gray-800 transition-colors flex items-center justify-center"
            >
              Explore Features
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="px-6 py-24 bg-gray-950 border-t border-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 md:text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Engineered for Performance
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl md:mx-auto">
                Stop wasting time on manual tasks and sub-par platforms. We deploy cutting-edge stacks to give you an unfair advantage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-xl hover:bg-gray-900 transition-colors group">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">High-Impact Web Apps</h3>
                <p className="text-gray-400 leading-relaxed">
                  Lightning-fast, SEO-optimized web applications built with modern frameworks. We don't use templates; we build tailored engines for your business.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-xl hover:bg-gray-900 transition-colors group">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">AI & Automations</h3>
                <p className="text-gray-400 leading-relaxed">
                  Deploy intelligent agents and automated workflows. Connect your tools, eliminate manual data entry, and let software handle the heavy lifting.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-xl hover:bg-gray-900 transition-colors group">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Growth Architecture</h3>
                <p className="text-gray-400 leading-relaxed">
                  Data-driven SEO, conversion rate optimization, and scalable backend systems designed to handle thousands of users seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Stats */}
        <section className="px-6 py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-800">
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-black text-white mb-2">99%</p>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Uptime</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-black text-white mb-2">10x</p>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Faster Deployments</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-black text-white mb-2">24/7</p>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Automated Tasks</p>
            </div>
            <div className="text-center px-4">
              <p className="text-4xl md:text-5xl font-black text-white mb-2">0</p>
              <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">Compromises</p>
            </div>
          </div>
        </section>

        {/* Contact / CTA */}
        <section id="contact" className="px-6 py-24 md:py-32 bg-gray-950 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
          
          <div className="max-w-3xl mx-auto bg-gray-900/60 border border-gray-800 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Systemize Your Success?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Join the waitlist or contact us directly to start building your next-generation platform.
            </p>
            
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="bg-gray-950 border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-600"
                />
                <input 
                  type="email" 
                  placeholder="Work Email" 
                  className="bg-gray-950 border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-600"
                />
              </div>
              <textarea 
                placeholder="What are you looking to build?" 
                rows={4}
                className="bg-gray-950 border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all resize-none placeholder:text-gray-600"
              />
              <button 
                type="button"
                className="w-full py-4 bg-white hover:bg-gray-200 text-black font-bold text-lg rounded-md transition-colors uppercase tracking-wide mt-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-950 border-t border-gray-900 px-6 py-12 text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">SPENGO</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Spengo LLC. All rights reserved. Built for performance.
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
