"use client";

import Changelog from '@/components/Changelog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import BackgroundEngine from '@/components/BackgroundEngine';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import MobileCTA from '@/components/MobileCTA';

export default function ChangelogPage() {
    return (
        <main className="relative z-10 min-h-screen bg-[#0a0a0f] text-white">
            <AnalyticsTracker />
            <BackgroundBlobs />
            <BackgroundEngine />
            <CursorGlow />
            <MobileCTA />
            <Navbar />

            {/* Add a spacer for the fixed navbar */}
            <div className="h-16" />

            <Changelog />

            <Footer />
        </main>
    );
}
