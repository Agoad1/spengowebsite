import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spengo — Thoughtful Web Design & AI Automation for Small Business',
  description:
    'We partner with small businesses to craft beautiful, high-converting websites, intelligent automations, and seamless booking systems. Based in Ohio, serving businesses nationwide.',
  // Inject Google Fonts via metadata link tags (Next.js App Router)
  other: {
    'link-google-fonts': '',
  },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Font import via style tag — nested layouts cannot use <html>/<body> */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
      `}</style>
      <div
        style={{
          backgroundColor: '#FAF9F6',
          color: '#2D2D2D',
          fontFamily: "'Inter', sans-serif",
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    </>
  );
}
