"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
    Zap,
    Calendar as CalendarIcon,
    Clock,
    Check,
    Trash2,
    Plus,
    X,
    Loader2
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastContext";

interface Availability {
    id: string;
    day_of_week: number | null;
    start_time: string | null;
    end_time: string | null;
    is_exception: boolean;
    exception_date: string | null;
}

const DAYS_OF_WEEK = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 0, name: "Sunday" }
];

export default function CalendarPage() {
    const router = useRouter();
    const { addToast } = useToast();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [roleLoading, setRoleLoading] = useState(true);

    const [fetching, setFetching] = useState(true);
    const [saving, setSaving] = useState(false);

    const [weeklySchedule, setWeeklySchedule] = useState<{
        [key: number]: { id?: string; active: boolean; start_time: string; end_time: string }
    }>({});

    const [exceptions, setExceptions] = useState<Availability[]>([]);
    const [isCreatingException, setIsCreatingException] = useState(false);
    const [newExceptionDate, setNewExceptionDate] = useState("");

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
            fetchAvailability();
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

    const fetchAvailability = async () => {
        setFetching(true);
        const { data, error } = await supabase
            .from('calendar_availability')
            .select('*')
            .order('day_of_week', { ascending: true });

        if (!error && data) {
            // Organize weekly schedule
            const weeklyData = data.filter(d => !d.is_exception);

            const scheduleMap: any = {};
            DAYS_OF_WEEK.forEach(day => {
                const existing = weeklyData.find(d => d.day_of_week === day.id);
                if (existing) {
                    scheduleMap[day.id] = {
                        id: existing.id,
                        active: true,
                        start_time: existing.start_time?.substring(0, 5) || "09:00",
                        end_time: existing.end_time?.substring(0, 5) || "17:00"
                    };
                } else {
                    scheduleMap[day.id] = { active: false, start_time: "09:00", end_time: "17:00" };
                }
            });
            setWeeklySchedule(scheduleMap);

            // Organize exceptions
            const exceptionData = data.filter(d => d.is_exception).sort((a, b) => {
                if (!a.exception_date || !b.exception_date) return 0;
                return new Date(a.exception_date).getTime() - new Date(b.exception_date).getTime();
            });
            setExceptions(exceptionData);
        } else {
            addToast("Failed to fetch calendar data", "error");
        }
        setFetching(false);
    };

    const handleSaveWeekly = async () => {
        setSaving(true);

        // Prepare arrays for bulk operations
        const updates = [];
        const inserts = [];
        const deletes = [];

        for (const day of DAYS_OF_WEEK) {
            const state = weeklySchedule[day.id];

            if (state.active) {
                if (state.id) {
                    // Update
                    updates.push({
                        id: state.id,
                        day_of_week: day.id,
                        start_time: state.start_time,
                        end_time: state.end_time,
                        is_exception: false
                    });
                } else {
                    // Insert
                    inserts.push({
                        day_of_week: day.id,
                        start_time: state.start_time,
                        end_time: state.end_time,
                        is_exception: false
                    });
                }
            } else {
                if (state.id) {
                    // Delete
                    deletes.push(state.id);
                }
            }
        }

        try {
            if (inserts.length > 0) {
                await supabase.from('calendar_availability').insert(inserts);
            }
            if (updates.length > 0) {
                await supabase.from('calendar_availability').upsert(updates);
            }
            if (deletes.length > 0) {
                await supabase.from('calendar_availability').delete().in('id', deletes);
            }
            addToast("Weekly schedule saved successfully", "success");
            fetchAvailability();
        } catch (error) {
            console.error(error);
            addToast("Failed to save schedule", "error");
        }

        setSaving(false);
    };

    const handleCreateException = async () => {
        if (!newExceptionDate) return;
        setSaving(true);

        // Currently setting all exceptions as entire unavailable days
        const { error } = await supabase
            .from('calendar_availability')
            .insert([{
                is_exception: true,
                exception_date: newExceptionDate,
                start_time: null,
                end_time: null
            }]);

        if (!error) {
            addToast("Exception block created", "success");
            setNewExceptionDate("");
            setIsCreatingException(false);
            fetchAvailability();
        } else {
            console.error(error);
            addToast("Failed to create exception", "error");
        }
        setSaving(false);
    };

    const handleDeleteException = async (id: string) => {
        const { error } = await supabase
            .from('calendar_availability')
            .delete()
            .eq('id', id);

        if (!error) {
            addToast("Exception removed", "success");
            setExceptions(exceptions.filter(e => e.id !== id));
        } else {
            addToast("Error removing exception", "error");
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
            <AdminSidebar currentPath="/admin/calendar" onLogout={handleLogout} />
            <div className="flex-1 p-4 md:p-8 lg:p-12 h-screen overflow-y-auto md:w-[calc(100%-16rem)]">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Header */}
                    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold font-outfit tracking-tight">Calendar Availability</h1>
                            <p className="text-muted text-sm mt-1">Manage your weekly schedule and block off exception dates.</p>
                        </div>
                    </header>

                    {fetching ? (
                        <div className="py-20 flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <p className="text-muted text-sm font-medium">Loading schedule...</p>
                        </div>
                    ) : (
                        <>
                            {/* Weekly Regular Hours */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                            <Clock size={20} />
                                        </div>
                                        <h2 className="text-xl font-bold font-outfit">Weekly Schedule</h2>
                                    </div>
                                    <button
                                        onClick={handleSaveWeekly}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                        Save Schedule
                                    </button>
                                </div>

                                <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm">
                                    <div className="space-y-4">
                                        {DAYS_OF_WEEK.map(day => {
                                            const state = weeklySchedule[day.id];
                                            if (!state) return null;

                                            return (
                                                <div key={day.id} className="flex flex-col sm:flex-row sm:items-center gap-4 py-3 border-b border-white/5 last:border-0">
                                                    <label className="flex items-center gap-3 w-40 cursor-pointer">
                                                        <div className={`w-12 h-6 rounded-full transition-colors relative ${state.active ? 'bg-emerald-500' : 'bg-white/10'}`}>
                                                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${state.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                                        </div>
                                                        {/* Hidden checkbox for accessibility */}
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only"
                                                            checked={state.active}
                                                            onChange={(e) => setWeeklySchedule({ ...weeklySchedule, [day.id]: { ...state, active: e.target.checked } })}
                                                        />
                                                        <span className={`font-bold text-sm ${state.active ? 'text-white' : 'text-muted'}`}>{day.name}</span>
                                                    </label>

                                                    {state.active ? (
                                                        <div className="flex items-center gap-3 flex-1">
                                                            <input
                                                                type="time"
                                                                value={state.start_time}
                                                                onChange={(e) => setWeeklySchedule({ ...weeklySchedule, [day.id]: { ...state, start_time: e.target.value } })}
                                                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary/50 text-sm font-medium w-32 [color-scheme:dark]"
                                                            />
                                                            <span className="text-muted text-sm font-medium">to</span>
                                                            <input
                                                                type="time"
                                                                value={state.end_time}
                                                                onChange={(e) => setWeeklySchedule({ ...weeklySchedule, [day.id]: { ...state, end_time: e.target.value } })}
                                                                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary/50 text-sm font-medium w-32 [color-scheme:dark]"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted text-sm italic py-2">Unavailable</div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Exemptions Blocked Dates */}
                            <div className="space-y-6 pt-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400">
                                            <CalendarIcon size={20} />
                                        </div>
                                        <h2 className="text-xl font-bold font-outfit">Blocked Dates</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsCreatingException(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all active:scale-95"
                                    >
                                        <Plus size={16} />
                                        Block Date
                                    </button>
                                </div>

                                {(isCreatingException || exceptions.length > 0) && (
                                    <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/10 bg-white/[0.02]">
                                                    <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Date</th>
                                                    <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-[0.2em]">Status</th>
                                                    <th className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-[0.2em] w-24 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/[0.05]">
                                                {isCreatingException && (
                                                    <tr className="bg-primary/5">
                                                        <td className="px-6 py-4">
                                                            <input
                                                                type="date"
                                                                value={newExceptionDate}
                                                                onChange={(e) => setNewExceptionDate(e.target.value)}
                                                                className="bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-all text-sm [color-scheme:dark]"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-red-500/10 border-red-500/20 text-red-400">
                                                                Unavailable
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={handleCreateException}
                                                                    disabled={saving || !newExceptionDate}
                                                                    className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors disabled:opacity-50"
                                                                >
                                                                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                                                </button>
                                                                <button
                                                                    onClick={() => setIsCreatingException(false)}
                                                                    className="p-2 text-muted hover:text-white rounded-lg transition-colors"
                                                                >
                                                                    <X size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                                {exceptions.map(exc => (
                                                    <tr key={exc.id} className="group hover:bg-white/[0.02] transition-colors">
                                                        <td className="px-6 py-4">
                                                            <span className="font-bold text-sm text-white">
                                                                {new Date(exc.exception_date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-red-500/10 border-red-500/20 text-red-400">
                                                                Unavailable
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button
                                                                onClick={() => handleDeleteException(exc.id)}
                                                                className="p-2 text-muted hover:text-red-400 rounded-lg transition-colors bg-white/5 hover:bg-red-400/10 opacity-0 group-hover:opacity-100"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
