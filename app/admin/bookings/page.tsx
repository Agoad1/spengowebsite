"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/AdminSidebar";
import { Loader2, Calendar, Clock, User, CheckCircle2, XCircle, Search, FileText } from "lucide-react";
import { useToast } from "@/components/ToastContext";

interface Booking {
    id: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    status: string;
    reason_notes: string;
    created_at: string;
    users: { email: string } | null;
    sessions: { title: string, duration_minutes: number } | null;
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { addToast } = useToast();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            const { data } = await supabase
                .from('users')
                .select('role')
                .eq('id', session.user.id)
                .single();

            setUserRole(data?.role || null);
            if (data?.role === 'admin') {
                fetchBookings();
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const fetchBookings = async () => {
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
                users ( email ),
                sessions ( title, duration_minutes )
            `)
            .order('booking_date', { ascending: false })
            .order('start_time', { ascending: false });

        if (error) {
            addToast("Failed to load bookings", "error");
            console.error(error);
        } else {
            setBookings(data as any);
        }
        setLoading(false);
    };

    const updateBookingStatus = async (bookingId: string, newStatus: string) => {
        const { error } = await supabase
            .from('bookings')
            .update({ status: newStatus })
            .eq('id', bookingId);

        if (error) {
            addToast(`Failed to mark booking as ${newStatus}`, "error");
        } else {
            addToast(`Booking marked as ${newStatus}!`, "success");
            setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (userRole !== 'admin') {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-3xl font-outfit font-bold text-white mb-4">Access Denied</h1>
                <p className="text-muted">You do not have permission to view this page.</p>
            </div>
        );
    }

    const filteredBookings = bookings.filter(b =>
        (b.users?.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (b.sessions?.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        b.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <AdminSidebar
                currentPath="/admin/bookings"
                onLogout={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/admin";
                }}
            />

            <div className="flex-1 p-8 lg:p-12 h-screen overflow-y-auto w-full ml-0 md:ml-64 transition-all duration-300">
                <div className="max-w-6xl mx-auto space-y-10 mt-16 md:mt-0">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Management</span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-outfit font-bold text-white tracking-tight mb-4">
                                Bookings
                            </h1>
                            <p className="text-muted text-lg max-w-xl">
                                Approve, deny, or manage incoming client session bookings.
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                            <input
                                type="text"
                                placeholder="Search by user email, session title, or status..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Bookings List */}
                    <div className="space-y-4">
                        {filteredBookings.length === 0 ? (
                            <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-3xl">
                                <Calendar className="w-12 h-12 text-muted/30 mx-auto mb-4" />
                                <p className="text-muted text-lg">No bookings found.</p>
                            </div>
                        ) : (
                            filteredBookings.map((booking) => (
                                <div key={booking.id} className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col xl:flex-row xl:items-center gap-8 transition-colors">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center justify-between xl:justify-start gap-4 flex-wrap">
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
                                            <div className="flex items-center gap-2 text-primary text-sm font-medium">
                                                <User size={16} />
                                                {booking.users?.email || 'Unknown User'}
                                            </div>
                                        </div>

                                        {booking.reason_notes && (
                                            <div className="bg-black/20 p-4 rounded-xl text-sm text-muted mt-4 border border-white/5 flex items-start gap-3">
                                                <FileText size={16} className="text-muted/50 mt-0.5 shrink-0" />
                                                <p className="leading-relaxed">"{booking.reason_notes}"</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row xl:flex-col gap-3 shrink-0">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                    className="px-6 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors flex-1"
                                                >
                                                    <CheckCircle2 size={18} /> Approve
                                                </button>
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                                    className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors flex-1"
                                                >
                                                    <XCircle size={18} /> Deny
                                                </button>
                                            </>
                                        )}
                                        {booking.status === 'confirmed' && (
                                            <button
                                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                                className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <XCircle size={18} /> Cancel Booking
                                            </button>
                                        )}
                                        {booking.status === 'cancelled' && (
                                            <button
                                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                className="px-6 py-3 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <CheckCircle2 size={18} /> Restore to Confirmed
                                            </button>
                                        )}
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
