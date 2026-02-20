import { supabase } from '@/lib/supabase';

// Helper to get or create session ID
const getSessionId = () => {
    if (typeof window === 'undefined') return null;

    let sessionId = sessionStorage.getItem('spengo_session_id');
    if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('spengo_session_id', sessionId);
    }
    return sessionId;
};

// Internal helper to handle fire-and-forget inserts
const logEvent = (eventType: string, eventData: any = {}, page: string = '') => {
    const sessionId = getSessionId();
    if (!sessionId) return;

    const pathname = page || (typeof window !== 'undefined' ? window.location.pathname : '');

    supabase
        .from('analytics')
        .insert([{
            session_id: sessionId,
            event_type: eventType,
            event_data: eventData,
            page: pathname
        }])
        .then(({ error }) => {
            if (error) console.error('Analytics Error:', error);
        });
};

/**
 * Tracks a page view event
 */
export const trackPageView = () => {
    logEvent('page_view');
};

/**
 * Tracks a button or link click
 * @param buttonName - The name/label of the clicked element
 */
export const trackClick = (buttonName: string) => {
    logEvent('click', { button: buttonName });
};

// State for scroll tracking to ensure we only track each threshold once
const trackedScrollThresholds = new Set<number>();

/**
 * Tracks scroll depth thresholds (25, 50, 75, 100)
 * @param depth - The current scroll percentage
 */
export const trackScrollDepth = (depth: number) => {
    const thresholds = [25, 50, 75, 100];

    // Find the highest threshold reached that hasn't been tracked yet
    const reached = thresholds.filter(t => depth >= t && !trackedScrollThresholds.has(t));

    reached.forEach(threshold => {
        trackedScrollThresholds.add(threshold);
        logEvent('scroll', { depth: threshold });
    });
};

/**
 * Tracks total time spent on the site
 * @param seconds - Total seconds elapsed
 */
export const trackTimeOnSite = (seconds: number) => {
    logEvent('time_on_site', { seconds });
};
