"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/AdminSidebar";
import { Loader2, Users, Search, ShieldAlert, ShieldCheck, Mail, Calendar, ArrowUpCircle } from "lucide-react";
import { useToast } from "@/components/ToastContext";

interface UserProfile {
    id: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
}

export default function AdminClientsPage() {
    const [clients, setClients] = useState<UserProfile[]>([]);
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
                fetchClients();
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const fetchClients = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('users')
            .select(`
                id,
                email,
                role,
                status,
                created_at
            `)
            .order('created_at', { ascending: false });

        if (error) {
            addToast("Failed to load clients", "error");
            console.error(error);
        } else {
            setClients(data as any);
        }
        setLoading(false);
    };

    const updateUserState = async (userId: string, updateData: { role?: string, status?: string }) => {
        const { error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', userId);

        if (error) {
            addToast(`Failed to update user profile`, "error");
            console.error(error)
        } else {
            addToast(`User profile updated successfully!`, "success");
            setClients(clients.map(c => c.id === userId ? { ...c, ...updateData } : c));
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

    const filteredClients = clients.filter(c =>
        (c.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin': return <span className="px-3 py-1 bg-purple-500/10 text-purple-500 border border-purple-500/20 rounded-full text-xs font-bold uppercase tracking-widest">Admin</span>;
            case 'client': return <span className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-widest">Client</span>;
            case 'user': return <span className="px-3 py-1 bg-gray-500/10 text-gray-500 border border-gray-500/20 rounded-full text-xs font-bold uppercase tracking-widest">User</span>;
            default: return <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest">{role}</span>;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-widest">Active</span>;
            case 'banned': return <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-xs font-bold uppercase tracking-widest">Banned</span>;
            case 'rejected': return <span className="px-3 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full text-xs font-bold uppercase tracking-widest">Rejected</span>;
            default: return <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest">{status}</span>;
        }
    };


    return (
        <div className="min-h-screen bg-[#0A0A0A] flex">
            <AdminSidebar
                currentPath="/admin/clients"
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
                                Clients & Users
                            </h1>
                            <p className="text-muted text-lg max-w-xl">
                                Browse all registered accounts, manipulate roles, or flag accounts with moderation tools.
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/50" />
                            <input
                                type="text"
                                placeholder="Search by email, role, or status..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Clients List */}
                    <div className="space-y-4">
                        {filteredClients.length === 0 ? (
                            <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-3xl">
                                <Users className="w-12 h-12 text-muted/30 mx-auto mb-4" />
                                <p className="text-muted text-lg">No clients or users found.</p>
                            </div>
                        ) : (
                            filteredClients.map((clientObj) => (
                                <div key={clientObj.id} className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col xl:flex-row xl:items-center justify-between gap-6 transition-colors">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {getRoleBadge(clientObj.role)}
                                            {getStatusBadge(clientObj.status)}
                                            <div className="text-xs text-muted font-medium bg-black/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                                <Calendar size={14} /> Joined {new Date(clientObj.created_at).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-1">
                                            <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/30">
                                                <Mail size={20} className="text-primary" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{clientObj.email}</h3>
                                        </div>
                                        <p className="text-xs text-muted font-mono bg-black/30 w-max px-2 py-1 rounded-md">ID: {clientObj.id}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-3 shrink-0">
                                        {clientObj.status === 'active' ? (
                                            <button
                                                onClick={() => updateUserState(clientObj.id, { status: 'banned' })}
                                                className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm"
                                            >
                                                <ShieldAlert size={16} /> Ban User
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => updateUserState(clientObj.id, { status: 'active' })}
                                                className="px-5 py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm"
                                            >
                                                <ShieldCheck size={16} /> Restore Access
                                            </button>
                                        )}

                                        {clientObj.role === 'user' && (
                                            <button
                                                onClick={() => updateUserState(clientObj.id, { role: 'client' })}
                                                className="px-5 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm"
                                            >
                                                <ArrowUpCircle size={16} /> Upgrade to Client
                                            </button>
                                        )}
                                        {clientObj.role !== 'admin' && (
                                            <button
                                                onClick={() => updateUserState(clientObj.id, { role: 'admin' })}
                                                className="px-5 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 border border-purple-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm"
                                            >
                                                <ArrowUpCircle size={16} /> Make Admin
                                            </button>
                                        )}
                                        {clientObj.role === 'admin' && (
                                            <button
                                                onClick={() => updateUserState(clientObj.id, { role: 'user' })}
                                                className="px-5 py-2.5 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 border border-gray-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm"
                                            >
                                                <ShieldAlert size={16} /> Revoke Admin
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
