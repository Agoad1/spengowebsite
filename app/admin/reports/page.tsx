"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/AdminSidebar";
import { Loader2, TrendingUp, Users, CalendarCheck, BarChart2 } from "lucide-react";
import { useToast } from "@/components/ToastContext";

interface Metrics {
    totalBookings: number;
    confirmedBookings: number;
    totalClients: number;
    totalUsers: number;
}

interface LogEntry {
    id: string;
    action_type: string;
    event_type: string;
    created_at: string;
    users: { email: string } | null;
}

export default function AdminReportsPage() {
    const [metrics, setMetrics] = useState<Metrics>({
        totalBookings: 0,
        confirmedBookings: 0,
        totalClients: 0,
        totalUsers: 0
    });
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);
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
                fetchData();
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // Aggregate Bookings
            const { data: bookingsData, error: bookingsError } = await supabase
                .from('bookings')
                .select('id, status');

            // Aggregate Users
            const { data: usersData, error: usersError } = await supabase
                .from('users')
                .select('id, role');

            // Fetch History Logs
            const { data: logsData, error: logsError } = await supabase
                .from('history_logs')
                .select('id, action_type, event_type, created_at, users(email)')
                .order('created_at', { ascending: false })
                .limit(20);

            if (bookingsError || usersError) throw new Error("Could not fetch metrics.");

            const totalBookings = bookingsData?.length || 0;
            const confirmedBookings = bookingsData?.filter(b => b.status === 'confirmed').length || 0;
            const totalClients = usersData?.filter(u => u.role === 'client').length || 0;
            const totalUsers = usersData?.filter(u => u.role === 'user').length || 0;

            setMetrics({
                totalBookings,
                confirmedBookings,
                totalClients,
                totalUsers
            });

            if (!logsError && logsData) {
                setLogs(logsData as any);
            }

        } catch (error) {
            console.error(error);
            addToast("Failed to load reporting data", "error");
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

    if (userRole !== 'admin') {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-3xl font-outfit font-bold text-white mb-4">Access Denied</h1>
                <p className="text-muted">You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex">
            <AdminSidebar
                currentPath="/admin/reports"
                onLogout={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/admin";
                }}
            />

            <div className="flex-1 p-8 lg:p-12 h-screen overflow-y-auto w-full ml-0 md:ml-64 transition-all duration-300">
                <div className="max-w-6xl mx-auto space-y-10 mt-16 md:mt-0">
                    {/* Header */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
                            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Analytics</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-outfit font-bold text-white tracking-tight mb-4">
                            System Reports
                        </h1>
                        <p className="text-muted text-lg max-w-xl">
                            High-level aggregation of platform usage, booking conversion, and client growth.
                        </p>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-muted uppercase tracking-widest">Total Bookings</span>
                                <div className="p-2 bg-primary/10 rounded-lg"><CalendarCheck size={18} className="text-primary" /></div>
                            </div>
                            <h3 className="text-4xl font-outfit font-bold text-white">{metrics.totalBookings}</h3>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-muted uppercase tracking-widest">Confirmed </span>
                                <div className="p-2 bg-green-500/10 rounded-lg"><TrendingUp size={18} className="text-green-500" /></div>
                            </div>
                            <h3 className="text-4xl font-outfit font-bold text-white">{metrics.confirmedBookings}</h3>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-muted uppercase tracking-widest">Active Clients</span>
                                <div className="p-2 bg-blue-500/10 rounded-lg"><Users size={18} className="text-blue-500" /></div>
                            </div>
                            <h3 className="text-4xl font-outfit font-bold text-white">{metrics.totalClients}</h3>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-muted uppercase tracking-widest">Base Users</span>
                                <div className="p-2 bg-gray-500/10 rounded-lg"><Users size={18} className="text-gray-400" /></div>
                            </div>
                            <h3 className="text-4xl font-outfit font-bold text-white">{metrics.totalUsers}</h3>
                        </div>
                    </div>

                    {/* Additional Data: Recent Logs */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <BarChart2 className="text-primary" size={24} />
                            Recent Activity Logs
                        </h2>
                        {logs.length === 0 ? (
                            <p className="text-muted italic">No activity logs recorded yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-muted text-xs uppercase tracking-widest">
                                            <th className="py-4 font-normal">Timestamp</th>
                                            <th className="py-4 font-normal">User</th>
                                            <th className="py-4 font-normal">Action Type</th>
                                            <th className="py-4 font-normal">Event Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {logs.map((log) => (
                                            <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                <td className="py-4 text-muted">{new Date(log.created_at).toLocaleString()}</td>
                                                <td className="py-4 text-white font-medium">{log.users?.email || 'System / Anonymous'}</td>
                                                <td className="py-4"><span className="px-2 py-1 bg-white/5 rounded text-xs text-white">{log.action_type || 'N/A'}</span></td>
                                                <td className="py-4 text-muted">{log.event_type || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
