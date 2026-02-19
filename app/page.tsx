'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import Contact from '@/components/Contact';
import MobileCTA from '@/components/MobileCTA';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import Pricing from '@/components/Pricing';
import RiskReversal from '@/components/RiskReversal';
import FirstImpression from '@/components/FirstImpression';
import FAQ from '@/components/FAQ';
import SidebarNav from '@/components/SidebarNav';

export default function Home() {
    return (
        <div className="relative z-10 min-h-screen">
            <BackgroundBlobs />
            <BackgroundEngine />
            <CursorGlow />
            <MobileCTA />
            <SidebarNav />
            <Navbar />
            <Hero />
            <Pricing />
            <FirstImpression />
            <Contact />
            <FAQ />
            <RiskReversal />
            <Footer />
        </div>
    );
}
