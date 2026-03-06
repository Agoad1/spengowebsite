"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Loader2, User, Mail, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ToastContext";

interface UserProfile {
    id: string;
    email: string;
    role: string;
    status: string;
}

export default function DashboardSettingsPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            fetchProfile(session.user.id);
        } else {
            window.location.href = "/";
            setLoading(false);
        }
    };

    const fetchProfile = async (id: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('users')
            .select(`
                id,
                email,
                role,
                status
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
            addToast("Failed to load profile", "error");
        } else {
            setProfile(data as any);
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

    if (!profile) {
        return null; // Next.js standard redirect handles the visual gap
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex">
            <DashboardSidebar
                currentPath="/dashboard/settings"
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
                            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Account</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-outfit font-bold text-white tracking-tight mb-4">
                            Settings
                        </h1>
                        <p className="text-muted text-lg max-w-xl">
                            Manage your personal credentials and view your security attributes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Profile Block */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <User className="text-primary" size={24} />
                                Profile Identity
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs text-muted uppercase tracking-widest font-bold mb-2 block">Email Address</label>
                                    <div className="flex items-center gap-4 bg-black/20 px-4 py-3 rounded-xl border border-white/5">
                                        <Mail size={18} className="text-muted" />
                                        <span className="text-white font-medium">{profile.email}</span>
                                    </div>
                                    <p className="text-xs text-muted mt-2">Your primary email token currently associated with your bookings.</p>
                                </div>
                                <button className="w-full py-4 text-sm font-bold bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-colors"
                                    onClick={() => addToast("Password reset flow simulated.", "success")}>
                                    Request Password Reset
                                </button>
                            </div>
                        </div>

                        {/* Security Block */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Shield className="text-primary" size={24} />
                                Access Policy
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs text-muted uppercase tracking-widest font-bold mb-2 block">System Role</label>
                                    <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-xl text-sm font-bold uppercase tracking-widest">
                                        {profile.role}
                                    </div>
                                </div>
                                <hr className="border-white/5" />
                                <div>
                                    <label className="text-xs text-muted uppercase tracking-widest font-bold mb-2 block">Account Status</label>
                                    <div className="inline-block px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl text-sm font-bold uppercase tracking-widest">
                                        {profile.status}
                                    </div>
                                    <p className="text-xs text-muted mt-4 flex items-start gap-2">
                                        <AlertTriangle size={14} className="mt-0.5" />
                                        If your account is ever restricted or marked as unauthorized, contact support to lift the restriction matrix.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
