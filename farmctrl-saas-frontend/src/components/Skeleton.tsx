'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
    className?: string;
}

export const SkeletonCard: React.FC<SkeletonProps> = ({ className = '' }) => (
    <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`glass-card p-6 ${className}`}
    >
        <div className="space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-lg w-full"></div>
        </div>
    </motion.div>
);

export const SkeletonTable: React.FC<SkeletonProps> = ({ className = '' }) => (
    <div className={`glass-card overflow-hidden ${className}`}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/4"></div>
        </div>
        <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="flex items-center gap-4"
                >
                    <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2"></div>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

export const SkeletonGrid: React.FC<SkeletonProps> = ({ className = '' }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
        ))}
    </div>
);
