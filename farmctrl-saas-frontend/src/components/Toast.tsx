'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const icons = {
        success: <CheckCircle size={20} className="text-emerald-500" />,
        error: <XCircle size={20} className="text-red-500" />,
        info: <AlertCircle size={20} className="text-blue-500" />
    };

    const backgrounds = {
        success: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
        error: 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800',
        info: 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800'
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="fixed top-4 right-4 z-[100] max-w-md"
                >
                    <div className={`flex items-center gap-3 p-4 rounded-2xl border-2 shadow-lg backdrop-blur-sm ${backgrounds[type]}`}>
                        {icons[type]}
                        <p className="flex-1 text-sm font-semibold text-black dark:text-white">{message}</p>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <X size={16} className="text-slate-500" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
