"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    Zap,
    Plus,
    Edit2,
    Trash2,
    Calendar,
    Check,
    X,
    Loader2,
    Clock
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Category {
    id: string;
    name: string;
}

interface Session {
    id: string;
    category_id: string;
    title: string;
    description: string;
    duration_minutes: number;
    is_active: boolean;
    created_at: string;
    session_categories?: Category; // Joined data
}

export default function SessionsPage() {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [roleLoading, setRoleLoading] = useState(true);

    const [sessions, setSessions] = useState<Session[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [fetching, setFetching] = useState(true);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration_minutes: 60,
        category_id: ""
    });

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                checkUserRole(session.user.id);
            } else {
                setRoleLoading(false);
            }
        };
        checkSession();
    }, []);

    useEffect(() => {
        if (userRole === 'admin') {
            fetchCategoriesAndSessions();
        }
    }, [userRole]);

    const checkUserRole = async (userId: string) => {
        setRoleLoading(true);
        const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', userId)
            .single();

        if (!error && data) {
            setUserRole(data.role);
        }
        setRoleLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin");
    };

    const fetchCategoriesAndSessions = async () => {
        setFetching(true);

        // Fetch categories for the select dropdown
        const { data: catsData } = await supabase
            .from('session_categories')
            .select('id, name')
            .eq('is_active', true)
            .order('name');

        if (catsData) setCategories(catsData);

        // Fetch sessions with joined category data
        const { data: sessionsData, error } = await supabase
            .from('sessions')
            .select(`
                *,
                session_categories (id, name)
            `)
            .order('created_at', { ascending: false });

        if (!error && sessionsData) {
            setSessions(sessionsData as any);
        } else if (error) {
            console.error(error);
        }

        setFetching(false);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            duration_minutes: 60,
            category_id: categories.length > 0 ? categories[0].id : ""
        });
        setIsCreating(false);
        setEditingId(null);
    };

    const startCreate = () => {
        resetForm();
        if (categories.length > 0) {
            setFormData(prev => ({ ...prev, category_id: categories[0].id }));
        }
        setIsCreating(true);
    };

    const startEdit = (session: Session) => {
        setFormData({
            title: session.title,
            description: session.description || "",
            duration_minutes: session.duration_minutes,
            category_id: session.category_id
        });
        setEditingId(session.id);
        setIsCreating(false);
    };

    const handleSave = async () => {
        if (!formData.title.trim() || !formData.category_id) {
            alert("Title and Category are required.");
            return;
        }

        setSaving(true);

        const payload = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            duration_minutes: formData.duration_minutes,
            category_id: formData.category_id,
            is_active: true
        };

        if (editingId) {
            // Update
            const { error } = await supabase
                .from('sessions')
                .update(payload)
                .eq('id', editingId);

            if (!error) {
                fetchCategoriesAndSessions();
                resetForm();
            } else {
                console.error(error);
                alert("Error updating session.");
            }
        } else if (isCreating) {
            // Create
            const { error } = await supabase
                .from('sessions')
                .insert([payload]);

            if (!error) {
                fetchCategoriesAndSessions();
                resetForm();
            } else {
                console.error(error);
                alert("Error creating session.");
            }
        }

        setSaving(false);
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        const { data, error } = await supabase
            .from('sessions')
            .update({ is_active: !currentStatus })
            .eq('id', id)
            .select('*, session_categories(id, name)')
            .single();

        if (!error && data) {
            setSessions(sessions.map(s => s.id === id ? data as any : s));
        } else {
            console.error(error);
            alert("Error updating status.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this session?")) return;

        const { error } = await supabase
            .from('sessions')
            .delete()
            .eq('id', id);

        if (!error) {
            setSessions(sessions.filter(s => s.id !== id));
        } else {
            console.error(error);
            alert("Error deleting session.");
        }
    };

    if (roleLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-jakarta">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
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
            <AdminSidebar currentPath="/admin/sessions" onLogout={handleLogout} />
            <div className="flex-1 p-4 md:p-8 lg:p-12 h-screen overflow-y-auto md:w-[calc(100%-16rem)]">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold font-outfit tracking-tight">Session Blocks</h1>
                            <p className="text-muted text-sm mt-1">Manage and create the session blocks offered to clients.</p>
                        </div>
                        <button
                            onClick={startCreate}
                            disabled={isCreating || editingId !== null}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Plus size={18} />
                            Create Session
                        </button>
                    </header>

                    {/* Editor Form (Create/Edit) */}
                    {(isCreating || editingId) && (
                        <div className="bg-white/[0.03] border border-primary/30 rounded-[2rem] p-6 lg:p-8 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-400"></div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold font-outfit">
                                    {isCreating ? 'Create New Session' : 'Edit Session'}
                                </h2>
                                <button onClick={resetForm} className="text-muted hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Session Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g. 1-on-1 Coaching"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Category</label>
                                            <select
                                                value={formData.category_id}
                                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all font-medium appearance-none"
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id} className="bg-[#1a1a1a]">{cat.name}</option>
                                                ))}
                                                {categories.length === 0 && (
                                                    <option value="" disabled className="bg-[#1a1a1a]">No categories found</option>
                                                )}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Duration (Mins)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted">
                                                    <Clock size={16} />
                                                </div>
                                                <input
                                                    type="number"
                                                    min="5"
                                                    step="5"
                                                    value={formData.duration_minutes}
                                                    onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 0 })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="What will this session cover?"
                                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <button
                                    onClick={resetForm}
                                    className="px-6 py-2.5 rounded-xl font-bold text-white hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving || !formData.title || !formData.category_id}
                                    className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                    {isCreating ? 'Save Session' : 'Update Session'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Sessions List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {fetching ? (
                            <div className="col-span-full py-20 flex flex-col items-center gap-3">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                <p className="text-muted text-sm font-medium">Loading sessions...</p>
                            </div>
                        ) : sessions.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-muted font-medium bg-white/[0.02] border border-white/5 rounded-3xl">
                                No sessions found. Create your first session!
                            </div>
                        ) : (
                            sessions.map(session => (
                                <div key={session.id} className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm hover:border-white/20 transition-all group relative overflow-hidden flex flex-col">

                                    {!session.is_active && (
                                        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                                            <div className="absolute top-4 -right-8 w-32 py-1 bg-white/10 text-[10px] font-bold text-muted text-center uppercase tracking-widest rotate-45 backdrop-blur-md border-y border-white/5">
                                                Inactive
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start justify-between mb-4">
                                        <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-xs font-bold text-white/70 w-fit">
                                            {session.session_categories?.name || "Uncategorized"}
                                        </div>
                                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => startEdit(session)}
                                                className="p-1.5 text-muted hover:text-primary rounded-lg transition-colors bg-white/5 hover:bg-white/10"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(session.id)}
                                                className="p-1.5 text-muted hover:text-red-400 rounded-lg transition-colors bg-white/5 hover:bg-red-400/10"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className={`text-xl font-bold font-outfit mb-2 ${!session.is_active ? 'text-white/50' : 'text-white'}`}>
                                        {session.title}
                                    </h3>

                                    <p className={`text-sm mb-6 flex-1 line-clamp-3 ${!session.is_active ? 'text-white/30' : 'text-muted'}`}>
                                        {session.description || "No description provided."}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                                        <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                                            <Clock size={16} className="text-primary" />
                                            {session.duration_minutes} mins
                                        </div>

                                        <button
                                            onClick={() => handleToggleActive(session.id, session.is_active)}
                                            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-colors ${session.is_active
                                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                                                    : 'bg-white/5 border-white/10 text-muted hover:bg-white/10'
                                                }`}
                                        >
                                            {session.is_active ? 'Active' : 'Enable'}
                                        </button>
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
