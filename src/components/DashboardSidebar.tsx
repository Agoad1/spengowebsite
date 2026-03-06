"use client";

import Link from "next/link";
import {
    CalendarRange,
    Settings,
    LogOut,
    Home
} from "lucide-react";

interface DashboardSidebarProps {
    currentPath: string;
    onLogout: () => void;
}

export default function DashboardSidebar({ currentPath, onLogout }: DashboardSidebarProps) {
    const navLinks = [
        { name: "My Bookings", href: "/dashboard/bookings", icon: <CalendarRange size={18} /> },
        { name: "Account Settings", href: "/dashboard/settings", icon: <Settings size={18} /> },
    ];

    return (
        <aside className="w-full md:w-64 bg-white/[0.02] border-r border-white/10 md:min-h-screen flex flex-col">
            <div className="p-6 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center">
                        <Home size={24} className="text-white hover:text-primary transition-colors" />
                    </div>
                    <span className="font-outfit font-bold text-xl tracking-tight text-white">Client Portal</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <div className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-4 mt-2 px-2">
                    Personal
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
