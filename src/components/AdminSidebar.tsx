"use client";

import Link from "next/link";
import {
    Home,
    FileText,
    Calendar,
    Users,
    Folder,
    LogOut,
    CheckSquare,
    Clock,
    BarChart3,
    BookOpen,
    Layout
} from "lucide-react";

interface AdminSidebarProps {
    currentPath: string;
    onLogout: () => void;
}

export default function AdminSidebar({ currentPath, onLogout }: AdminSidebarProps) {
    const navLinks = [
        { name: "Analytics", href: "/admin", icon: <Home size={18} /> },
        { name: "Sessions", href: "/admin/sessions", icon: <Clock size={18} /> },
        { name: "Categories & Topics", href: "/admin/categories-topics", icon: <Folder size={18} /> },
        { name: "Bookings", href: "/admin/bookings", icon: <CheckSquare size={18} /> },
        { name: "Clients", href: "/admin/clients", icon: <Users size={18} /> },
        { name: "Calendar", href: "/admin/calendar", icon: <Calendar size={18} /> },
        { name: "Reports", href: "/admin/reports", icon: <BarChart3 size={18} /> },
        { name: "Blog Admin", href: "/admin/blog-admin", icon: <FileText size={18} /> },
        { name: "Section Builder", href: "/admin/fluxframe", icon: <Layout size={18} /> },
    ];

    return (
        <aside className="w-full md:w-64 bg-white/[0.02] border-r border-white/10 md:min-h-screen flex flex-col">
            <div className="p-6 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2" target="_blank">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <BookOpen size={16} className="text-white" />
                    </div>
                    <span className="font-outfit font-bold text-xl tracking-tight text-white">Spengo Admin</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <div className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-4 mt-2 px-2">
                    Menu
                </div>
                {navLinks.map((link) => {
                    const isActive = currentPath === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "text-muted hover:text-white hover:bg-white/[0.04]"
                                }`}
                        >
                            <span className={isActive ? "opacity-100" : "opacity-70"}>{link.icon}</span>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-colors"
                >
                    <span className="opacity-70"><LogOut size={18} /></span>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
