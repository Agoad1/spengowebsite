'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WebsiteAuditForm from '@/components/WebsiteAuditForm';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BookingSection from '@/components/BookingSection';
import MobileCTA from '@/components/MobileCTA';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import Pricing from '@/components/Pricing';
import RiskReversal from '@/components/RiskReversal';
import FirstImpression from '@/components/FirstImpression';
import FAQ from '@/components/FAQ';
import SidebarNav from '@/components/SidebarNav';
import AnalyticsTracker from '@/components/AnalyticsTracker';

export default function Home() {
    return (
        <div className="relative z-10 min-h-screen">
            <AnalyticsTracker />
            <BackgroundBlobs />
            <BackgroundEngine />
            <CursorGlow />
            <MobileCTA />
            <SidebarNav />
            <Navbar />
            <Hero />
            
            <section id="start" className="relative z-20 py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 w-[80%] h-[80%] mx-auto" />
                <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(168,85,247,0.05)] relative">
                    <WebsiteAuditForm />
                </div>
            </section>

            <Pricing />
            <FirstImpression />
            <BookingSection />
            <FAQ />
            <RiskReversal />
            <Footer />
        </div>
    );
}
