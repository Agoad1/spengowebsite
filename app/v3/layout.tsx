import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spengo — Supercharge Your Business',
  description:
    'Unlock exponential growth with AI automations, high-converting websites, and powerful SEO. Get started today.',
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      <div
        className="bg-gray-950 text-white min-h-screen selection:bg-green-500 selection:text-black antialiased overflow-x-hidden"
        style={{
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {children}
      </div>
    </>
  );
}
