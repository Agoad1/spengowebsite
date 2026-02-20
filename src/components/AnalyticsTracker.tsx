"use client";

import { useEffect, useRef } from 'react';
import { trackPageView, trackScrollDepth, trackTimeOnSite } from '@/lib/analytics';

export default function AnalyticsTracker() {
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        // 1. Track Initial Page View
        trackPageView();

        // 2. Track Scroll Depth
        const handleScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';

            const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
            trackScrollDepth(Math.round(percent));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // 3. Track Time on Site (Capture on unload and cleanup)
        const sendTimeOnSite = () => {
            const seconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
            if (seconds > 0) {
                trackTimeOnSite(seconds);
            }
        };

        const handleUnload = () => {
            sendTimeOnSite();
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('beforeunload', handleUnload);
            sendTimeOnSite();
        };
    }, []);

    return null;
}
