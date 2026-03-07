"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
    Plus,
    Edit3,
    Trash2,
    Eye,
    Globe,
    Zap,
    LogOut,
    ArrowLeft,
    Search,
    Clock,
    CheckCircle2,
    FileText,
    MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import { useRouter } from "next/navigation";

interface Post {
    id: string;
    title: string;
    slug: string;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    cover_image: string | null;
}

export default function BlogAdminPage() {
    const [session, setSession] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const [posts, setPosts] = useState<Post[]>([]);
    const [fetching, setFetching] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [userRole, setUserRole] = useState<string | null>(null);
    const [roleLoading, setRoleLoading] = useState(true);
    const router = useRouter();

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
                fetchPosts();
            }
        }
        setRoleLoading(false);
    };

    const fetchPosts = async () => {
        setFetching(true);
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setPosts(data || []);
        }
        setFetching(false);
    };

    const handleDelete = async (id: string, slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Error deleting post: " + error.message);
        } else {
            setPosts(prev => prev.filter(p => p.id !== id));
            fetch('/api/embed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: `/blog/${slug}`, action: 'delete' })
            }).catch(e => console.error('Failed to delete embedding', e));
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

    const filteredPosts = useMemo(() => {
        return posts.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.slug.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [posts, searchQuery]);

    if (!session) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-jakarta">
                <div className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl text-white">
                    <div className="flex justify-center mb-8">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                            <Zap className="text-primary w-6 h-6" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2 text-center font-outfit">Blog Admin</h1>
                    <p className="text-muted text-sm text-center mb-8">Sign in to manage your blog articles.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Email</label>
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
                            <label className="text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Password</label>
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
            <AdminSidebar currentPath="/admin/blog-admin" onLogout={handleLogout} />
            <div className="flex-1 p-4 md:p-8 lg:p-12 h-screen overflow-y-auto md:w-[calc(100%-16rem)]">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold font-outfit tracking-tight">Blog Management</h1>
                            <p className="text-muted text-sm mt-1">Create, edit, and publish your insights.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/admin/blog-admin/new"
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-95"
                            >
                                <Plus size={18} />
                                New Article
                            </Link>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Stats */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                <h3 className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] mb-4">Blog Overview</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted">Total Articles</span>
                                        <span className="text-lg font-bold text-white">{posts.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted">Published</span>
                                        <span className="text-lg font-bold text-emerald-400">{posts.filter(p => p.is_published).length}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted">Drafts</span>
                                        <span className="text-lg font-bold text-amber-400">{posts.filter(p => !p.is_published).length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Posts List */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Search */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search articles by title or slug..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted/30"
                                />
                            </div>

                            <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                                <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Article</th>
                                                <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Status</th>
                                                <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Published Date</th>
                                                <th className="px-6 py-5 text-[11px] font-bold text-muted uppercase tracking-[0.2em] text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.05]">
                                            {fetching ? (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-20 text-center">
                                                        <div className="flex flex-col items-center gap-3">
                                                            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                                            <p className="text-muted text-sm font-medium">Loading articles...</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : filteredPosts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-20 text-center text-muted font-medium">
                                                        {searchQuery ? "No articles matching your search." : "No articles yet."}
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredPosts.map((post) => (
                                                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-4">
                                                                {post.cover_image && (
                                                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                                                        <img src={post.cover_image} className="w-full h-full object-cover" alt="" />
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <div className="font-bold text-white mb-0.5">{post.title}</div>
                                                                    <div className="text-[10px] text-muted font-mono">{post.slug}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${post.is_published
                                                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                                                : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                                                                {post.is_published ? 'Published' : 'Draft'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-5 text-sm text-muted">
                                                            {post.published_at
                                                                ? new Date(post.published_at).toLocaleDateString()
                                                                : 'Not published'}
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Link
                                                                    href={`/blog/${post.slug}`}
                                                                    target="_blank"
                                                                    className="p-2 text-muted hover:text-white transition-colors"
                                                                >
                                                                    <Eye size={18} />
                                                                </Link>
                                                                <Link
                                                                    href={`/admin/blog-admin/${post.id}/edit`}
                                                                    className="p-2 text-muted hover:text-primary transition-colors"
                                                                >
                                                                    <Edit3 size={18} />
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDelete(post.id, post.slug)}
                                                                    className="p-2 text-muted hover:text-red-400 transition-colors"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
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
            </div>
        </div>
    );
}
