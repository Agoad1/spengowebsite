"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/AdminSidebar";
import { Zap } from "lucide-react";

interface Section {
    id: string;
    icon: string;
    name: string;
    description: string;
}

const defaultSections: Section[] = [
    { id: 'hero', icon: '⚡', name: 'Hero Section', description: 'Welcome visitors with a compelling headline and call-to-action' },
    { id: 'how-it-works', icon: '🔄', name: 'How It Works', description: 'Show your 3-step process so visitors know what to expect' },
    { id: 'first-impression', icon: '👁️', name: 'First Impression', description: 'Prove visitors can find what they need in 30 seconds' },
    { id: 'faq', icon: '❓', name: 'FAQ', description: 'Answer common questions to reduce support load' },
    { id: 'risk-reversal', icon: '🛡️', name: 'Risk Reversal', description: 'Remove buying hesitation with guarantees and trust signals' },
    { id: 'contact', icon: '📋', name: 'Contact / Audit Form', description: 'Capture leads with a conversion-focused intake form' }
];

export default function FluxFrameAdmin() {
    const [session, setSession] = useState<any>(null);
    const [sections, setSections] = useState<Section[]>(defaultSections);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const SAVED_KEY = "fluxframe-sections";

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setAuthLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem(SAVED_KEY);
        if (saved) {
            try {
                const savedIds = JSON.parse(saved);
                let loaded = savedIds.map((id: string) => defaultSections.find(s => s.id === id)).filter(Boolean);
                const missing = defaultSections.filter(ds => !savedIds.includes(ds.id));
                setSections([...loaded, ...missing]);
            } catch (e) {
                setSections([...defaultSections]);
            }
        }
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const saveOrder = (newSections: Section[]) => {
        const order = newSections.map(s => s.id);
        localStorage.setItem(SAVED_KEY, JSON.stringify(order));
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.stopPropagation();
        if (draggedIndex === null) return;
        if (draggedIndex !== dropIndex) {
            const newSections = [...sections];
            const item = newSections.splice(draggedIndex, 1)[0];
            newSections.splice(dropIndex, 0, item);
            setSections(newSections);
            saveOrder(newSections);
        }
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const resetLayout = () => {
        localStorage.removeItem(SAVED_KEY);
        setSections([...defaultSections]);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-white font-jakarta">
                <div className="flex justify-center mb-8">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                        <Zap className="text-primary w-6 h-6" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold mb-4 font-outfit">Access Denied</h1>
                <p className="text-[#a0a0a0] mb-6">Please log in through the main admin portal.</p>
                <a href="/admin" className="px-6 py-3 bg-primary text-white rounded-xl font-bold">Go to Admin Login</a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-jakarta flex flex-col md:flex-row">
            <AdminSidebar currentPath="/admin/fluxframe" onLogout={handleLogout} />
            <div className="flex-1 p-4 md:p-8 lg:p-12 h-screen overflow-y-auto md:w-[calc(100%-16rem)] relative">
                
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-12">
                        <div className="text-4xl mb-2">✨</div>
                        <h1 className="text-4xl font-bold font-outfit" style={{ background: "linear-gradient(135deg, #a855f7, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            FluxFrame
                        </h1>
                        <p className="text-[#a0a0a0] max-w-2xl mx-auto mt-2">
                            Build stunning layouts with our futuristic drag-and-drop section builder. Reorder, visualize, and perfect your page structure in real-time.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        {/* Builder */}
                        <div>
                            <h2 className="text-[#06b6d4] text-center text-xl font-bold font-outfit mb-1">Section Builder</h2>
                            <p className="text-[#a0a0a0] text-center mb-6 text-sm">Drag and drop to reorder</p>
                            
                            <div className="space-y-4">
                                {sections.map((section, index) => {
                                    const isDragging = draggedIndex === index;
                                    const isDragOver = dragOverIndex === index && draggedIndex !== index;
                                    return (
                                        <div
                                            key={section.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDrop={(e) => handleDrop(e, index)}
                                            onDragEnd={handleDragEnd}
                                            onDragLeave={() => setDragOverIndex(null)}
                                            className={`
                                                flex items-center p-4 rounded-xl border transition-all duration-200 cursor-grab active:cursor-grabbing backdrop-blur-3xl
                                                ${isDragging ? 'opacity-50 scale-[1.02] border-[#a855f7] shadow-[0_8px_30px_rgba(168,85,247,0.15)] z-10' : 'border-white/5 bg-white/[0.015] hover:-translate-y-1 hover:border-[#a855f7]/30 hover:shadow-[0_4px_20px_rgba(168,85,247,0.15)]'}
                                                ${isDragOver ? 'border-t-2 border-t-[#a855f7]' : ''}
                                            `}
                                        >
                                            <div className="text-[#a0a0a0] text-xl mr-4 px-2 select-none">⠿</div>
                                            <div className="text-2xl mr-4 bg-white/5 rounded-lg p-2">{section.icon}</div>
                                            <div className="flex-1">
                                                <div className="font-bold text-white mb-1">{section.name}</div>
                                                <div className="text-sm text-[#a0a0a0] leading-tight">{section.description}</div>
                                            </div>
                                            <div className="ml-4 w-6 h-6 rounded-full bg-[#a855f7] shrink-0 flex items-center justify-center text-xs font-bold shadow-lg">
                                                {index + 1}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Preview */}
                        <div>
                            <h2 className="text-[#06b6d4] text-center text-xl font-bold font-outfit mb-1">Live Preview</h2>
                            <p className="text-[#a0a0a0] text-center mb-6 text-sm">Your page structure</p>
                            
                            <div className="space-y-4">
                                {sections.map((section, index) => (
                                    <div key={section.id} className="flex items-center p-4 rounded-xl border-l-4 border-l-[#06b6d4] bg-black/20 border-y border-r border-white/5 transition-all duration-300">
                                        <div className="font-bold text-[#06b6d4] min-w-[140px] mr-4 text-sm">
                                            {index + 1}. {section.name}
                                        </div>
                                        <div className="text-lg px-2 mr-2">{section.icon}</div>
                                        <div className="flex-1 text-xs text-[#a0a0a0]">
                                            {section.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button 
                            onClick={resetLayout}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-white font-bold hover:border-[#a855f7]/30 hover:shadow-[0_4px_15px_rgba(168,85,247,0.15)] hover:-translate-y-[2px] transition-all bg-transparent"
                        >
                            <span className="text-lg">🔄</span> Reset Layout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
