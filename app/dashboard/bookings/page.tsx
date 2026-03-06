"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Loader2, Calendar, Clock, Video, Info } from "lucide-react";

interface Booking {
    id: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    status: string;
    reason_notes: string;
    created_at: string;
    sessions: { title: string, duration_minutes: number, description: string } | null;
}

export default function DashboardBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setUserId(session.user.id);
            fetchBookings(session.user.id);
        } else {
            window.location.href = "/";
            setLoading(false);
        }
    };

    const fetchBookings = async (id: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                id,
                booking_date,
                start_time,
                end_time,
                status,
                reason_notes,
                created_at,
                sessions ( title, duration_minutes, description )
            `)
            .eq('user_id', id)
            .order('booking_date', { ascending: false })
            .order('start_time', { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setBookings(data as any);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!userId) {
        return null; // Next.js standard redirect handles the visual gap
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full text-xs font-bold uppercase tracking-widest">Pending</span>;
            case 'confirmed': return <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-widest">Confirmed</span>;
            case 'cancelled': return <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-xs font-bold uppercase tracking-widest">Cancelled</span>;
            default: return <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest">{status}</span>;
        }
    };

    const formatTime = (timeStr: string) => {
        if (!timeStr) return "";
        const [h, m] = timeStr.split(':');
        let hours = parseInt(h);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${m} ${ampm}`;
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex">
            <DashboardSidebar
                currentPath="/dashboard/bookings"
                onLogout={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/";
                }}
            />

            <div className="flex-1 p-8 lg:p-12 h-screen overflow-y-auto w-full ml-0 md:ml-64 transition-all duration-300">
                <div className="max-w-4xl mx-auto space-y-10 mt-16 md:mt-0">
                    {/* Header */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
                            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Dashboard</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-outfit font-bold text-white tracking-tight mb-4">
                            My Bookings
                        </h1>
                        <p className="text-muted text-lg max-w-xl">
                            View and manage your upcoming and past consultation sessions.
                        </p>
                    </div>

                    {/* Bookings List */}
                    <div className="space-y-4">
                        {bookings.length === 0 ? (
                            <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-3xl">
                                <Calendar className="w-12 h-12 text-muted/30 mx-auto mb-4" />
                                <p className="text-muted text-lg">You have no booking history.</p>
                                <a href="/" className="inline-block mt-4 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors">
                                    Book a Session
                                </a>
                            </div>
                        ) : (
                            bookings.map((booking) => (
                                <div key={booking.id} className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 transition-colors">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            {getStatusBadge(booking.status)}
                                            <div className="text-xs text-muted font-medium bg-black/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                                <Calendar size={14} /> {new Date(booking.booking_date).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-muted font-medium bg-black/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                                <Clock size={14} /> {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{booking.sessions?.title || 'Unknown Session'}</h3>
                                            <p className="text-muted text-sm">{booking.sessions?.description || 'No description available for this session type.'}</p>
                                        </div>

                                        {booking.reason_notes && (
                                            <div className="bg-black/20 p-4 rounded-xl text-sm text-muted mt-4 border border-white/5 flex items-start gap-3">
                                                <Info size={16} className="text-muted/50 mt-0.5 shrink-0" />
                                                <p className="leading-relaxed">Your notes: "{booking.reason_notes}"</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="shrink-0 flex items-center justify-center">
                                        {booking.status === 'confirmed' ? (
                                            <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 h-full text-center min-w-[140px]">
                                                <Video className="text-primary" size={24} />
                                                <span className="text-xs text-primary font-bold uppercase tracking-widest">Meeting Link<br />Emailed</span>
                                            </div>
                                        ) : booking.status === 'pending' ? (
                                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 h-full text-center min-w-[140px] opacity-60">
                                                <Calendar className="text-white" size={24} />
                                                <span className="text-xs text-white font-bold uppercase tracking-widest">Awaiting<br />Approval</span>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
