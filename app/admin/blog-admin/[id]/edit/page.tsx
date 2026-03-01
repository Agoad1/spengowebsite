"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    ArrowLeft,
    Save,
    Eye,
    Type,
    Link as LinkIcon,
    Image as ImageIcon,
    FileText,
    CheckCircle2,
    Clock,
    Zap,
    AlertCircle,
    ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { use } from "react";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [previewMode, setPreviewMode] = useState(false);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        content: "",
        cover_image: "",
        is_published: false,
        published_at: null as string | null
    });

    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) router.push("/admin/blog-admin");
            setSession(session);
        });
    }, []);

    useEffect(() => {
        if (session) {
            fetchPost();
        }
    }, [session, id]);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            setError(error.message);
        } else if (data) {
            setForm({
                title: data.title,
                slug: data.slug,
                content: data.content,
                cover_image: data.cover_image || "",
                is_published: data.is_published,
                published_at: data.published_at
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Determine published_at
            let publishedAt = form.published_at;
            if (form.is_published && !publishedAt) {
                publishedAt = new Date().toISOString();
            } else if (!form.is_published) {
                publishedAt = null;
            }

            const { error: updateError } = await supabase
                .from("posts")
                .update({
                    ...form,
                    published_at: publishedAt,
                })
                .eq("id", id);

            if (updateError) throw updateError;

            router.push("/admin/blog-admin");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = () => {
        const slug = form.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        setForm(prev => ({ ...prev, slug }));
    };

    if (!session) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-jakarta p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/blog-admin" className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                            <ChevronLeft size={18} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold font-outfit tracking-tight">Edit Article</h1>
                            <p className="text-muted text-sm mt-1">Refine your engineering insight.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setPreviewMode(!previewMode)}
                            className={`flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-sm font-bold transition-all ${previewMode ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                            <Eye size={16} />
                            {previewMode ? "Exit Preview" : "Preview"}
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Save size={18} />
                            {loading ? "Saving Changes..." : "Save Changes"}
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {previewMode ? (
                            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-12 min-h-[600px] prose prose-invert prose-lg max-w-none prose-headings:font-outfit prose-headings:font-bold prose-headings:text-white prose-p:text-muted prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 transition-colors prose-strong:text-white prose-li:text-muted prose-img:rounded-3xl prose-img:border prose-img:border-white/10">
                                <h1 className="text-5xl font-outfit font-bold text-white mb-8 tracking-tight">{form.title || "Untitled Article"}</h1>
                                {form.cover_image && (
                                    <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 mb-12">
                                        <img src={form.cover_image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <ReactMarkdown>{form.content || "*No content yet...*"}</ReactMarkdown>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Title Input */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Title</label>
                                    <div className="relative group">
                                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={20} />
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-2xl font-bold placeholder:text-muted/20 focus:outline-none focus:border-primary/50 transition-all font-outfit"
                                            placeholder="Enter article title..."
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Content Editor */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-muted uppercase tracking-[0.2em] ml-1">Markdown Content</label>
                                    <div className="relative flex flex-col h-[600px] border border-white/10 rounded-2xl overflow-hidden bg-white/5 focus-within:border-primary/50 transition-all">
                                        <div className="bg-white/[0.02] border-b border-white/10 px-4 py-2 flex items-center justify-between">
                                            <div className="text-[10px] items-center gap-1 font-bold text-muted/50 uppercase flex">
                                                <FileText size={12} />
                                                standard markdown supported
                                            </div>
                                        </div>
                                        <textarea
                                            value={form.content}
                                            onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                                            className="flex-grow w-full bg-transparent p-6 text-white font-mono leading-relaxed focus:outline-none resize-none"
                                            placeholder="Start writing your article in markdown..."
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 backdrop-blur-sm space-y-8 sticky top-8">
                            {/* URL Slug */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-bold text-muted uppercase tracking-[0.2em]">URL Slug</label>
                                    <button
                                        onClick={generateSlug}
                                        className="text-[10px] font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
                                    >
                                        Auto-Generate
                                    </button>
                                </div>
                                <div className="relative group">
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={14} />
                                    <input
                                        type="text"
                                        value={form.slug}
                                        onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs font-mono text-muted focus:outline-none focus:border-primary/50 transition-all"
                                        placeholder="url-friendly-slug"
                                    />
                                </div>
                            </div>

                            {/* Cover Image */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Cover Image URL</label>
                                <div className="relative group">
                                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={14} />
                                    <input
                                        type="text"
                                        value={form.cover_image}
                                        onChange={(e) => setForm(prev => ({ ...prev, cover_image: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all"
                                        placeholder="https://images..."
                                    />
                                </div>
                                {form.cover_image && (
                                    <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-white/10">
                                        <img src={form.cover_image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            {/* Status */}
                            <div className="pt-6 border-t border-white/10 space-y-4">
                                <div
                                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${!form.is_published ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}
                                    onClick={() => setForm(prev => ({ ...prev, is_published: !prev.is_published }))}
                                >
                                    <div className="flex items-center gap-3">
                                        {!form.is_published ? <Clock size={20} /> : <CheckCircle2 size={20} />}
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">{!form.is_published ? "Draft Mode" : "Published"}</span>
                                            <span className="text-[10px] opacity-60 font-medium">{!form.is_published ? "Only visible to you" : "Live on site"}</span>
                                        </div>
                                    </div>
                                    <div className={`w-10 h-6 rounded-full relative transition-all duration-300 ${!form.is_published ? 'bg-amber-500 shadow-lg shadow-amber-500/20' : 'bg-white/10'}`}>
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${!form.is_published ? 'left-5' : 'left-1'}`} />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex gap-3">
                                        <AlertCircle size={16} className="shrink-0" />
                                        <p>{error}</p>
                                    </div>
                                )}

                                <p className="text-[10px] text-muted leading-relaxed px-1">
                                    Updating will reflect changes live if the article is published. ISR revalidation will clear the cache within 60 seconds.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
