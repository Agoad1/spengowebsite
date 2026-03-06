"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    Zap,
    Plus,
    Edit2,
    Trash2,
    Folder,
    Tag,
    Check,
    X,
    Loader2
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Tab = 'categories' | 'topics';

interface DBItem {
    id: string;
    name: string;
    is_active: boolean;
    created_at: string;
}

export default function CategoriesTopicsPage() {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [roleLoading, setRoleLoading] = useState(true);

    const [activeTab, setActiveTab] = useState<Tab>('categories');
    const [items, setItems] = useState<DBItem[]>([]);
    const [fetching, setFetching] = useState(true);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    const [isCreating, setIsCreating] = useState(false);
    const [newName, setNewName] = useState("");
    const [saving, setSaving] = useState(false);

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
            fetchData(activeTab);
            setIsCreating(false);
            setEditingId(null);
            setNewName("");
        }
    }, [activeTab, userRole]);

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

    const getTableName = (tab: Tab) => {
        return tab === 'categories' ? 'session_categories' : 'booking_topics';
    };

    const fetchData = async (tab: Tab) => {
        setFetching(true);
        const { data, error } = await supabase
            .from(getTableName(tab))
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setItems(data);
        } else {
            console.error(error);
        }
        setFetching(false);
    };

    const handleCreate = async () => {
        if (!newName.trim()) return;
        setSaving(true);
        const { data, error } = await supabase
            .from(getTableName(activeTab))
            .insert([{ name: newName.trim(), is_active: true }])
            .select('*')
            .single();

        if (!error && data) {
            setItems([data, ...items]);
            setNewName("");
            setIsCreating(false);
        } else {
            alert("Error creating item.");
            console.error(error);
        }
        setSaving(false);
    };

    const handleUpdateName = async (id: string) => {
        if (!editName.trim()) return;
        setSaving(true);
        const { data, error } = await supabase
            .from(getTableName(activeTab))
            .update({ name: editName.trim() })
            .eq('id', id)
            .select('*')
            .single();

        if (!error && data) {
            setItems(items.map(item => item.id === id ? data : item));
            setEditingId(null);
        } else {
            alert("Error updating item.");
            console.error(error);
        }
        setSaving(false);
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        const { data, error } = await supabase
            .from(getTableName(activeTab))
            .update({ is_active: !currentStatus })
            .eq('id', id)
            .select('*')
            .single();

        if (!error && data) {
            setItems(items.map(item => item.id === id ? data : item));
        } else {
            console.error(error);
            alert("Error updating status.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item? This action may break existing references.")) return;

        const { error } = await supabase
            .from(getTableName(activeTab))
            .delete()
            .eq('id', id);

        if (!error) {
            setItems(items.filter(item => item.id !== id));
        } else {
            console.error(error);
            alert("Error deleting item.");
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
            <AdminSidebar currentPath="/admin/categories-topics" onLogout={handleLogout} />
            <div className="flex-1 p-4 md:p-8 lg:p-12 h-screen overflow-y-auto md:w-[calc(100%-16rem)]">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header */}
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold font-outfit tracking-tight">Lookup Tables</h1>
                            <p className="text-muted text-sm mt-1">Manage session categories and booking topics.</p>
                        </div>
                        <button
                            onClick={() => {
                                setIsCreating(true);
                                setNewName("");
                            }}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-95"
                        >
                            <Plus size={18} />
                            Create New
                        </button>
                    </header>

                    {/* Tabs */}
                    <div className="flex items-center gap-4 bg-white/[0.02] p-1.5 rounded-2xl border border-white/10 w-fit">
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'categories'
                                    ? 'bg-white/10 text-white shadow-lg'
                                    : 'text-muted hover:text-white'
                                }`}
                        >
                            <Folder size={16} />
                            Session Categories
                        </button>
                        <button
                            onClick={() => setActiveTab('topics')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'topics'
                                    ? 'bg-white/10 text-white shadow-lg'
                                    : 'text-muted hover:text-white'
                                }`}
                        >
                            <Tag size={16} />
                            Booking Topics
                        </button>
                    </div>

                    {/* Content */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/[0.02]">
                                        <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Name</th>
                                        <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em] w-32">Status</th>
                                        <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em] text-right w-32">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.05]">
                                    {isCreating && (
                                        <tr className="bg-primary/5">
                                            <td className="px-6 py-4">
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    value={newName}
                                                    onChange={e => setNewName(e.target.value)}
                                                    placeholder="Enter name..."
                                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-all"
                                                    onKeyDown={e => {
                                                        if (e.key === 'Enter') handleCreate();
                                                        if (e.key === 'Escape') setIsCreating(false);
                                                    }}
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={handleCreate}
                                                        disabled={saving}
                                                        className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors disabled:opacity-50"
                                                    >
                                                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                                    </button>
                                                    <button
                                                        onClick={() => setIsCreating(false)}
                                                        className="p-2 text-muted hover:text-white rounded-lg transition-colors"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                    {fetching ? (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                                    <p className="text-muted text-sm font-medium">Loading items...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : items.length === 0 && !isCreating ? (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-20 text-center text-muted font-medium">
                                                No {activeTab === 'categories' ? 'categories' : 'topics'} found. Create one to get started.
                                            </td>
                                        </tr>
                                    ) : (
                                        items.map(item => (
                                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-6 py-4">
                                                    {editingId === item.id ? (
                                                        <input
                                                            autoFocus
                                                            type="text"
                                                            value={editName}
                                                            onChange={e => setEditName(e.target.value)}
                                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-all text-sm font-medium"
                                                            onKeyDown={e => {
                                                                if (e.key === 'Enter') handleUpdateName(item.id);
                                                                if (e.key === 'Escape') setEditingId(null);
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="font-bold text-white text-sm">{item.name}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleToggleActive(item.id, item.is_active)}
                                                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-colors ${item.is_active
                                                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                                                                : 'bg-white/5 border-white/10 text-muted hover:bg-white/10'
                                                            }`}
                                                    >
                                                        {item.is_active ? 'Active' : 'Hidden'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {editingId === item.id ? (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleUpdateName(item.id)}
                                                                disabled={saving}
                                                                className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors disabled:opacity-50"
                                                            >
                                                                {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingId(null)}
                                                                disabled={saving}
                                                                className="p-2 text-muted hover:text-white rounded-lg transition-colors"
                                                            >
                                                                <X size={18} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingId(item.id);
                                                                    setEditName(item.name);
                                                                }}
                                                                className="p-2 text-muted hover:text-primary rounded-lg transition-colors bg-white/5 hover:bg-white/10"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                className="p-2 text-muted hover:text-red-400 rounded-lg transition-colors bg-white/5 hover:bg-red-400/10"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
