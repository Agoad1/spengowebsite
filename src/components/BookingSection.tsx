"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Clock, Calendar as CalendarIcon, ArrowRight, Loader2, CheckCircle2, ChevronLeft, User } from 'lucide-react';

interface Session {
    id: string;
    title: string;
    description: string;
    duration_minutes: number;
    category_id: string;
    session_categories: { name: string } | null;
}

interface AvailableDay {
    date: string;
    slots: string[];
}

export default function BookingSection() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loadingSessions, setLoadingSessions] = useState(true);

    // Step Tracking
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

    // Selection State
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [availableDays, setAvailableDays] = useState<AvailableDay[]>([]);
    const [loadingAvailability, setLoadingAvailability] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Auth & Info State
    const [userAuth, setUserAuth] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [reason, setReason] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchActiveSessions();
        checkUserSession();
    }, []);

    const checkUserSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setUserAuth(session.user);
            setEmail(session.user.email || '');
        }
    };

    const fetchActiveSessions = async () => {
        setLoadingSessions(true);
        const { data, error } = await supabase
            .from('sessions')
            .select(`
                id,
                title,
                description,
                duration_minutes,
                category_id,
                session_categories(name)
            `)
            .eq('is_active', true)
            .order('created_at', { ascending: true });

        if (!error && data) {
            setSessions(data as any);
        }
        setLoadingSessions(false);
    };

    const handleContinueToCalendar = async () => {
        if (!selectedSession) return;
        setStep(2);
        setLoadingAvailability(true);
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const res = await fetch(`/api/availability?session_id=${selectedSession.id}&timezone=${tz}`);
            const json = await res.json();
            if (json.data) {
                setAvailableDays(json.data);
                if (json.data.length > 0) {
                    setSelectedDate(json.data[0].date); // Default to first available day
                }
            }
        } catch (err) {
            console.error(err);
        }
        setLoadingAvailability(false);
    };

    const handleContinueToInfo = () => {
        if (!selectedDate || !selectedTime) return;
        setStep(3);
    };

    const handleBook = async () => {
        if (!selectedSession || !selectedDate || !selectedTime) return;
        setSubmitting(true);
        setError('');

        let finalUserId = userAuth?.id;

        if (!finalUserId) {
            if (isExistingUser) {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                    setError(error.message);
                    setSubmitting(false);
                    return;
                }
                finalUserId = data.user.id;
            } else {
                const { data, error } = await supabase.auth.signUp({ email, password });
                if (error) {
                    setError(error.message);
                    setSubmitting(false);
                    return;
                }
                finalUserId = data.user?.id;
            }
        }

        if (!finalUserId) {
            setError("Could not resolve user context.");
            setSubmitting(false);
            return;
        }

        const [hh, mm] = selectedTime.split(':').map(Number);
        const d = new Date();
        d.setHours(hh, mm + selectedSession.duration_minutes, 0);
        const endTimeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;

        const { error: insertError } = await supabase.from('bookings').insert([{
            user_id: finalUserId,
            session_id: selectedSession.id,
            booking_date: selectedDate,
            start_time: selectedTime,
            end_time: endTimeStr,
            status: 'pending',
            reason_notes: reason
        }]);

        setSubmitting(false);

        if (insertError) {
            setError(insertError.message);
        } else {
            setStep(4);
        }
    };

    const formatDateStr = (dateStr: string) => {
        const [y, m, d] = dateStr.split('-').map(Number);
        const dateObj = new Date(y, m - 1, d);
        return dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <section id="booking" className="relative py-24 md:py-32 overflow-hidden bg-white/[0.01]">
            <div className="max-w-7xl mx-auto px-6">

                {step === 1 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6">
                            <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Book A Session</span>
                        </div>
                        <h2 className="font-outfit font-bold text-white text-[clamp(2.5rem,4vw,3.5rem)] tracking-tight leading-[1.1] mb-6 max-w-2xl mx-auto">
                            Ready to elevate your <span className="opacity-40 italic">strategy?</span>
                        </h2>
                        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
                            Select a session block below to lock in time directly with our senior engineers and strategists.
                        </p>
                    </motion.div>
                )}

                <div className="max-w-5xl mx-auto min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                                {loadingSessions ? (
                                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                        <p className="text-muted text-sm">Loading available sessions...</p>
                                    </div>
                                ) : sessions.length === 0 ? (
                                    <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
                                        <p className="text-muted text-lg">No sessions are currently open for booking.</p>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {sessions.map((session, i) => (
                                            <motion.div
                                                key={session.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                onClick={() => setSelectedSession(session)}
                                                className={`relative p-8 rounded-3xl border transition-all duration-300 cursor-pointer group flex flex-col overflow-hidden ${selectedSession?.id === session.id
                                                        ? 'bg-primary/10 border-primary/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-[1.02]'
                                                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                                                    }`}
                                            >
                                                {selectedSession?.id === session.id && (
                                                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-[40px] pointer-events-none rounded-full" />
                                                )}
                                                <div className="mb-6 flex justify-between items-start">
                                                    <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-lg">
                                                        {session.session_categories?.name || 'Strategy'}
                                                    </span>
                                                    <div className="flex items-center gap-1.5 text-muted/70 text-sm font-medium">
                                                        <Clock size={16} />
                                                        {session.duration_minutes}m
                                                    </div>
                                                </div>
                                                <h3 className="text-2xl font-bold text-white font-outfit mb-3 pr-4">{session.title}</h3>
                                                <p className="text-muted text-sm leading-relaxed mb-8 flex-1">{session.description}</p>
                                                <div className={`mt-auto pt-6 border-t font-bold flex items-center justify-between transition-colors ${selectedSession?.id === session.id ? 'border-primary/20 text-white' : 'border-white/5 text-muted group-hover:text-white'
                                                    }`}>
                                                    <span className="text-sm uppercase tracking-widest">
                                                        {selectedSession?.id === session.id ? 'Selected' : 'Select Session'}
                                                    </span>
                                                    <ArrowRight size={18} className={`transition-transform duration-300 ${selectedSession?.id === session.id ? 'translate-x-1 text-primary' : 'group-hover:translate-x-1'
                                                        }`} />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {selectedSession && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex justify-end">
                                        <button
                                            onClick={handleContinueToCalendar}
                                            className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity active:scale-95 flex items-center gap-2 text-sm uppercase tracking-widest"
                                        >
                                            <CalendarIcon size={18} /> Continue to Calendar
                                        </button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="flex items-center gap-4 mb-8">
                                    <button onClick={() => setStep(1)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted hover:text-white">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white font-outfit">Select a Time</h3>
                                        <p className="text-muted text-sm">{selectedSession?.title} • {selectedSession?.duration_minutes} minutes</p>
                                    </div>
                                </div>

                                {loadingAvailability ? (
                                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                        <p className="text-muted text-sm">Finding available slots...</p>
                                    </div>
                                ) : availableDays.length === 0 ? (
                                    <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
                                        <p className="text-muted text-lg">No availability found for this session in the next 14 days.</p>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                                            <h4 className="text-sm font-bold text-muted uppercase tracking-widest mb-4">Available Days</h4>
                                            <div className="flex flex-col gap-2">
                                                {availableDays.map(day => (
                                                    <button
                                                        key={day.date}
                                                        onClick={() => { setSelectedDate(day.date); setSelectedTime(null); }}
                                                        className={`p-4 rounded-xl text-left transition-all flex items-center justify-between ${selectedDate === day.date
                                                                ? 'bg-primary/20 border border-primary/50 text-white font-bold shadow-inner'
                                                                : 'bg-white/[0.03] border border-transparent text-muted hover:bg-white/5'
                                                            }`}
                                                    >
                                                        {formatDateStr(day.date)}
                                                        <span className="text-xs bg-black/20 px-2 py-1 rounded-md">{day.slots.length} slots</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                                            <h4 className="text-sm font-bold text-muted uppercase tracking-widest mb-4">Available Times</h4>
                                            {selectedDate ? (
                                                <div className="grid grid-cols-2 gap-3">
                                                    {availableDays.find(d => d.date === selectedDate)?.slots.map(time => (
                                                        <button
                                                            key={time}
                                                            onClick={() => setSelectedTime(time)}
                                                            className={`p-3 rounded-xl border text-center transition-all ${selectedTime === time
                                                                    ? 'bg-primary text-white border-primary font-bold scale-[1.02]'
                                                                    : 'bg-white/[0.03] border-white/10 text-muted hover:border-primary/50 hover:text-white'
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-muted text-sm italic">Select a day first.</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={handleContinueToInfo}
                                        disabled={!selectedTime}
                                        className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity active:scale-95 flex items-center gap-2 text-sm uppercase tracking-widest"
                                    >
                                        Continue <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="flex items-center gap-4 mb-8">
                                    <button onClick={() => setStep(2)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-muted hover:text-white">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white font-outfit">Your Details</h3>
                                        <p className="text-muted text-sm">Locking in {formatDateStr(selectedDate!)} at {selectedTime}</p>
                                    </div>
                                </div>

                                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 max-w-2xl mx-auto space-y-6">
                                    {!userAuth && (
                                        <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl flex flex-col gap-4">
                                            <div className="flex items-center gap-3 text-primary mb-2">
                                                <User size={20} />
                                                <span className="font-bold">Account Access</span>
                                            </div>

                                            <div className="flex items-center justify-between bg-black/20 p-1 rounded-xl w-full mb-2">
                                                <button onClick={() => setIsExistingUser(false)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isExistingUser ? 'bg-primary text-white' : 'text-muted'}`}>New User</button>
                                                <button onClick={() => setIsExistingUser(true)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isExistingUser ? 'bg-primary text-white' : 'text-muted'}`}>Existing User</button>
                                            </div>

                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:border-primary/50 focus:outline-none"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/50 focus:border-primary/50 focus:outline-none"
                                            />
                                        </div>
                                    )}

                                    {userAuth && (
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                                            <div className="text-sm">
                                                <span className="text-muted">Booking as: </span>
                                                <span className="text-white font-bold">{email}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-muted uppercase tracking-widest ml-1">Notes / Reason for booking</label>
                                        <textarea
                                            rows={4}
                                            placeholder="What would you like to discuss?"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 resize-none"
                                        />
                                    </div>

                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm text-center">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleBook}
                                        disabled={submitting || (!userAuth && (!email || !password))}
                                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest mt-4"
                                    >
                                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full border border-primary/20 mb-6">
                                    <CheckCircle2 className="w-12 h-12 text-primary" />
                                </div>
                                <h3 className="text-4xl font-outfit font-bold text-white mb-4">Booking Confirmed!</h3>
                                <p className="text-muted text-lg max-w-md mx-auto leading-relaxed mb-8">
                                    We have secured your slot for {formatDateStr(selectedDate!)} at {selectedTime}. You'll receive a calendar invite shortly.
                                </p>
                                <button
                                    onClick={() => {
                                        setStep(1);
                                        setSelectedSession(null);
                                        setSelectedDate(null);
                                        setSelectedTime(null);
                                        setReason('');
                                    }}
                                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
                                >
                                    Book another session
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
