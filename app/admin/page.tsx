"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
    Search,
    LogOut,
    MoreHorizontal,
    ChevronDown,
    ChevronUp,
    Users,
    Zap,
    MessageSquare,
    CheckCircle2,
    Calendar,
    Globe,
    Briefcase,
    Clock,
    Eye,
    BarChart3,
    Activity,
    MousePointer2,
    FileText
} from "lucide-react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";

interface Submission {
    id: string;
    created_at: string;
    name: string;
    email: string;
    website_url: string;
    business_type: string;
    message: string;
    status: 'new' | 'contacted' | 'in progress' | 'closed';
}

interface AnalyticsEvent {
    id: string;
    created_at: string;
    session_id: string;
    event_type: 'page_view' | 'click' | 'scroll' | 'time_on_site';
    event_data: any;
    page: string;
}

export default function AdminPage() {
    const [session, setSession] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [analyticsData, setAnalyticsData] = useState<AnalyticsEvent[]>([]);
    const [fetching, setFetching] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (session) {
            checkUserRole(session.user.id);
        } else {
            setUserRole(null);
            setRoleLoading(false);
        }
    }, [session]);

    const checkUserRole = async (userId: string) => {
        setRoleLoading(true);
        const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', userId)
            .single();

        if (!error && data) {
            setUserRole(data.role);
            if (data.role === 'admin') {
                fetchAllData();
            }
        }
        setRoleLoading(false);
    };

    const fetchAllData = async () => {
        setFetching(true);
        await Promise.all([fetchSubmissions(), fetchAnalytics()]);
        setFetching(false);
    };

    const fetchSubmissions = async () => {
        const { data, error } = await supabase
            .from("submissions")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setSubmissions(data || []);
        }
    };

    const fetchAnalytics = async () => {
        const { data, error } = await supabase
            .from('analytics')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setAnalyticsData(data || []);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('submissions')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error(error);
        } else {
            setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus as any } : s));
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError("");
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setAuthError(error.message);
        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const filteredSubmissions = useMemo(() => {
        return submissions.filter(s =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [submissions, searchQuery]);

    const leadStats = useMemo(() => {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        return {
            total: submissions.length,
            newThisWeek: submissions.filter(s =>
                new Date(s.created_at) >= weekAgo && s.status === 'new'
            ).length,
            contacted: submissions.filter(s =>
                s.status === 'contacted' || s.status === 'in progress'
            ).length,
            closed: submissions.filter(s => s.status === 'closed').length
        };
    }, [submissions]);

    const analyticsStats = useMemo(() => {
        const pageViews = analyticsData.filter(e => e.event_type === 'page_view').length;
        const uniqueVisitors = new Set(analyticsData.map(e => e.session_id)).size;

        // Avg Time on Site
        const timeEvents = analyticsData.filter(e => e.event_type === 'time_on_site');
        const totalSeconds = timeEvents.reduce((acc, e) => acc + (e.event_data?.seconds || 0), 0);
        const avgSeconds = timeEvents.length > 0 ? Math.round(totalSeconds / timeEvents.length) : 0;
        const avgTimeDisplay = `${Math.floor(avgSeconds / 60)}m ${avgSeconds % 60}s`;

        // Avg Scroll Depth
        const sessionMaxScroll = new Map<string, number>();
        analyticsData.filter(e => e.event_type === 'scroll').forEach(e => {
            const depth = e.event_data?.depth || 0;
            const currentMax = sessionMaxScroll.get(e.session_id) || 0;
            if (depth > currentMax) sessionMaxScroll.set(e.session_id, depth);
        });
        const scrollValues = Array.from(sessionMaxScroll.values());
        const avgScroll = scrollValues.length > 0
            ? Math.round(scrollValues.reduce((acc, v) => acc + v, 0) / scrollValues.length)
            : 0;

        return {
            pageViews,
            uniqueVisitors,
            avgTime: avgTimeDisplay,
            avgScroll: `${avgScroll}%`
        };
    }, [analyticsData]);

    const recentActivity = useMemo(() => analyticsData.slice(0, 20), [analyticsData]);

    const formatRelativeTime = (dateString: string) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMs = now.getTime() - past.getTime();
        const diffInMins = Math.floor(diffInMs / (1000 * 60));

        if (diffInMins < 1) return "Just now";
        if (diffInMins < 60) return `${diffInMins} min ago`;
        const diffInHours = Math.floor(diffInMins / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        return past.toLocaleDateString();
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-jakarta">
                <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <div className="flex justify-center mb-8">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                            <Zap className="text-primary w-6 h-6" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2 text-center font-outfit">Admin Access</h1>
                    <p className="text-muted text-sm text-center mb-8">Sign in to manage your conversion engine.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted/20"
                                placeholder="admin@spengo.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted/20"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {authError && <p className="text-red-400 text-sm text-center font-medium">{authError}</p>}
                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
                        >
                            {authLoading ? "Authenticating..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (roleLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-jakarta">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted text-sm font-medium">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (userRole !== 'admin') {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-jakarta">
                <div className="w-full max-w-md bg-white/[0.03] border border-red-500/10 rounded-2xl p-8 backdrop-blur-xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                            <Zap className="text-red-400 w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2 font-outfit">Access Denied</h1>
                    <p className="text-muted text-sm mb-8">You do not have permission to view the admin dashboard.</p>

                    <div className="flex flex-col gap-3">
                        <Link href="/" className="w-full bg-white/5 border border-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-colors">
                            Return Home
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500/10 text-red-400 font-bold py-3 rounded-xl hover:bg-red-500/20 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-jakarta flex flex-col md:flex-row">
            <AdminSidebar currentPath="/admin" onLogout={handleLogout} />
            <div className="flex-1 p-4 md:p-8 lg:p-12 h-screen overflow-y-auto md:w-[calc(100%-16rem)]">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold font-outfit tracking-tight">Analytics Dashboard</h1>
                            <p className="text-muted text-sm mt-1">Lead management and conversion metrics.</p>
                        </div>
                    </header>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Users className="text-primary" size={20} />
                            <h2 className="text-xl font-bold font-outfit">Leads Management</h2>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            <StatCard label="Total Leads" value={leadStats.total} icon={<Users size={20} />} color="text-white" />
                            <StatCard label="New This Week" value={leadStats.newThisWeek} icon={<Zap size={20} />} color="text-emerald-400" />
                            <StatCard label="Contacted" value={leadStats.contacted} icon={<MessageSquare size={20} />} color="text-blue-400" />
                            <StatCard label="Closed" value={leadStats.closed} icon={<CheckCircle2 size={20} />} color="text-muted" />
                        </div>

                        {/* Search & Actions */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search leads by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted/30"
                            />
                        </div>

                        {/* Leads Table */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-white/[0.02]">
                                            <th className="w-12 px-6 py-5"></th>
                                            <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Date</th>
                                            <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Name</th>
                                            <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Email</th>
                                            <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Business Type</th>
                                            <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.05]">
                                        {fetching ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-20 text-center">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                                        <p className="text-muted text-sm font-medium">Loading submissions...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : filteredSubmissions.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-20 text-center text-muted font-medium">
                                                    {searchQuery ? "No leads matching your search." : "No leads captured yet."}
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredSubmissions.map((sub) => (
                                                <SubmissionRow
                                                    key={sub.id}
                                                    sub={sub}
                                                    isExpanded={expandedId === sub.id}
                                                    onToggle={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                                                    onStatusChange={(status) => updateStatus(sub.id, status)}
                                                />
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Site Analytics Section */}
                    <section className="space-y-6 pt-8 border-t border-white/10">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="text-primary" size={20} />
                            <h2 className="text-xl font-bold font-outfit">Site Analytics</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            <StatCard label="Total Page Views" value={analyticsStats.pageViews} icon={<Eye size={20} />} color="text-cyan-400" />
                            <StatCard label="Unique Visitors" value={analyticsStats.uniqueVisitors} icon={<Users size={20} />} color="text-purple-400" />
                            <StatCard label="Avg Time on Site" value={analyticsStats.avgTime} icon={<Clock size={20} />} color="text-emerald-400" />
                            <StatCard label="Avg Scroll Depth" value={analyticsStats.avgScroll} icon={<BarChart3 size={20} />} color="text-amber-400" />
                        </div>

                        <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm">
                            <div className="px-6 py-5 border-b border-white/10 bg-white/[0.02] flex items-center gap-2">
                                <Activity size={16} className="text-primary" />
                                <h3 className="text-sm font-bold uppercase tracking-[0.1em]">Recent Activity</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-white/[0.01]">
                                            <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest whitespace-nowrap">Time</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest whitespace-nowrap">Event Type</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest whitespace-nowrap">Details</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest whitespace-nowrap">Session ID</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.03] text-sm">
                                        {fetching ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-muted">Loading activity...</td>
                                            </tr>
                                        ) : recentActivity.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-muted">No activity recorded yet.</td>
                                            </tr>
                                        ) : (
                                            recentActivity.map((event) => (
                                                <tr key={event.id} className="hover:bg-white/[0.01] transition-colors">
                                                    <td className="px-6 py-4 text-muted whitespace-nowrap">
                                                        {formatRelativeTime(event.created_at)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${event.event_type === 'page_view' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                                                            event.event_type === 'click' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                                                                event.event_type === 'scroll' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                                                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                            }`}>
                                                            {event.event_type.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-white font-medium">
                                                        {event.event_type === 'click' && `Clicked "${event.event_data?.button}"`}
                                                        {event.event_type === 'scroll' && `Reached ${event.event_data?.depth}% depth`}
                                                        {event.event_type === 'time_on_site' && `Spent ${event.event_data?.seconds}s on site`}
                                                        {event.event_type === 'page_view' && `Viewed ${event.page}`}
                                                    </td>
                                                    <td className="px-6 py-4 text-muted font-mono text-[10px] whitespace-nowrap">
                                                        {event.session_id.substring(0, 8)}...
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }: { label: string, value: string | number, icon: React.ReactNode, color: string }) {
    return (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-white/20 transition-all group">
            <div className="flex items-start justify-between mb-4">
                <span className="text-[11px] font-bold text-muted uppercase tracking-[0.15em]">{label}</span>
                <div className={`p-2 rounded-lg bg-white/5 border border-white/10 transition-colors group-hover:border-white/20 ${color}`}>
                    {icon}
                </div>
            </div>
            <div className="text-3xl font-bold font-outfit tracking-tight">{value}</div>
        </div>
    );
}

function SubmissionRow({ sub, isExpanded, onToggle, onStatusChange }: {
    sub: Submission,
    isExpanded: boolean,
    onToggle: () => void,
    onStatusChange: (status: string) => void
}) {
    const statusColors: any = {
        new: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        contacted: "bg-blue-500/10 border-blue-500/20 text-blue-400",
        "in progress": "bg-amber-500/10 border-amber-500/20 text-amber-400",
        closed: "bg-white/5 border-white/10 text-muted"
    };

    const truncateEmail = (email: string) => {
        return email.length > 25 ? email.substring(0, 22) + '...' : email;
    };

    return (
        <>
            <tr
                className={`group cursor-pointer transition-colors ${isExpanded ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
                onClick={onToggle}
            >
                <td className="px-6 py-5 text-center transition-transform duration-300">
                    {isExpanded ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-muted group-hover:text-white" />}
                </td>
                <td className="px-6 py-5 text-muted text-sm whitespace-nowrap">
                    {new Date(sub.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-5 font-bold text-white text-sm whitespace-nowrap">
                    {sub.name}
                </td>
                <td className="px-6 py-5 text-cyan text-sm whitespace-nowrap font-medium" title={sub.email}>
                    {truncateEmail(sub.email)}
                </td>
                <td className="px-6 py-5 text-sm whitespace-nowrap">
                    <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-white font-bold uppercase tracking-wider">
                        {sub.business_type || "N/A"}
                    </span>
                </td>
                <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                    <select
                        value={sub.status || 'new'}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all cursor-pointer outline-none ${statusColors[sub.status || 'new']}`}
                    >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </td>
            </tr>
            {isExpanded && (
                <tr className="bg-white/[0.04] border-l-2 border-primary">
                    <td colSpan={6} className="px-8 py-8 border-b border-white/10">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted text-[10px] font-bold uppercase tracking-widest">
                                        <Globe size={12} className="text-primary" />
                                        Website URL
                                    </div>
                                    <a
                                        href={sub.website_url.startsWith('http') ? sub.website_url : `https://${sub.website_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg font-bold text-cyan hover:text-cyan/80 transition-colors break-all flex items-center gap-2"
                                    >
                                        {sub.website_url}
                                        <Zap size={14} className="opacity-50" />
                                    </a>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted text-[10px] font-bold uppercase tracking-widest">
                                        <Clock size={12} className="text-primary" />
                                        Submission Date & Time
                                    </div>
                                    <p className="text-white font-medium">
                                        {new Date(sub.created_at).toLocaleString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted text-[10px] font-bold uppercase tracking-widest">
                                        <Briefcase size={12} className="text-primary" />
                                        Industry Segment
                                    </div>
                                    <p className="text-white font-medium">{sub.business_type || "No segment specified"}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-muted text-[10px] font-bold uppercase tracking-widest">
                                    <MessageSquare size={12} className="text-primary" />
                                    Pain Points & Project Details
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-muted leading-relaxed text-[15px] italic">
                                    "{sub.message}"
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}
