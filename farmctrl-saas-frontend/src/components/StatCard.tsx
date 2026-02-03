
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    color: 'emerald' | 'teal' | 'amber' | 'blue' | 'rose' | 'slate';
    trend?: {
        value: string;
        isUp: boolean;
    };
}

const colorMaps = {
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    slate: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
};

export default function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-card p-6"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${colorMaps[color]}`}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <div className={`text-xs font-bold px-2 py-1 rounded-lg ${trend.isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {trend.value}
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-1">{value}</h3>
                {subtitle && <p className="text-xs text-slate-400 font-medium tracking-wide flex items-center gap-1 uppercase">{subtitle}</p>}
            </div>
        </motion.div>
    );
}
