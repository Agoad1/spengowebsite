"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "warning" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 5000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* Toast Container - Top Left */}
            <div className="fixed top-4 left-4 z-50 flex flex-col gap-3 pointer-events-none w-full max-w-sm">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

function ToastItem({ toast, onRemove }: { toast: Toast, onRemove: () => void }) {
    const icons = {
        success: <CheckCircle className="text-emerald-400 w-5 h-5" />,
        warning: <AlertTriangle className="text-yellow-400 w-5 h-5" />,
        error: <XCircle className="text-red-400 w-5 h-5" />,
        info: <div className="text-blue-400 w-5 h-5 rounded-full border-2 border-blue-400 font-bold flex items-center justify-center text-xs">i</div>
    };

    const colors = {
        success: "bg-emerald-500/10 border-emerald-500/20",
        warning: "bg-yellow-500/10 border-yellow-500/20",
        error: "bg-red-500/10 border-red-500/20",
        info: "bg-blue-500/10 border-blue-500/20"
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-xl ${colors[toast.type]} shadow-2xl relative overflow-hidden font-jakarta`}
        >
            <div className="mt-0.5">{icons[toast.type]}</div>
            <p className="text-white text-sm font-medium flex-1 pr-6 leading-relaxed">
                {toast.message}
            </p>
            <button
                onClick={onRemove}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
                <X size={16} />
            </button>
            <div className="absolute top-0 left-0 w-full h-full bg-white/[0.02] pointer-events-none" />
        </motion.div>
    );
}
