
'use client';

import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import {
    Users,
    Tractor,
    Droplets,
    Fuel,
    Calendar,
    CheckCircle2,
    AlertTriangle,
    ArrowUpRight,
    TrendingUp,
    Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const { user } = useAuth();

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning / صبح بخیر';
        if (hour < 18) return 'Good Afternoon / سہ پہر بخیر';
        return 'Good Evening / شام بخیر';
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 pb-12">
                {/* Header Section */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-xs mb-2"
                        >
                            System Overview
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-black text-black dark:text-white"
                        >
                            {greeting()}, {user?.name}
                        </motion.h1>
                        <p className="text-slate-500 mt-2">Here is what is happening on **{user?.farm?.name || 'FARMCTRL Platform'}** today.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-3 font-medium text-slate-700 dark:text-slate-300">
                            <Calendar size={18} className="text-emerald-500" />
                            {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Personnel"
                        value="142"
                        subtitle="Current Staff"
                        icon={Users}
                        color="emerald"
                        trend={{ value: '+4', isUp: true }}
                    />
                    <StatCard
                        title="Active Machinery"
                        value="18"
                        subtitle="Engines Running"
                        icon={Tractor}
                        color="blue"
                    />
                    <StatCard
                        title="Pivot Operation"
                        value="92%"
                        subtitle="Performance"
                        icon={Droplets}
                        color="teal"
                        trend={{ value: '+1.2%', isUp: true }}
                    />
                    <StatCard
                        title="Fuel Reserves"
                        value="4,250L"
                        subtitle="Diesel (Main Tank)"
                        icon={Fuel}
                        color="amber"
                    />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Board */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Recent Tasks */}
                        <section className="glass-card overflow-hidden">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="font-bold text-lg text-black dark:text-white flex items-center gap-2">
                                    <Briefcase size={20} className="text-emerald-500" />
                                    Active Tasks & Operations
                                </h3>
                                <button className="text-xs font-bold text-emerald-600 flex items-center gap-1 uppercase tracking-wider">
                                    View All <ArrowUpRight size={14} />
                                </button>
                            </div>
                            <div className="p-2">
                                {[
                                    { title: 'Rhodes Grass Baling - Pivot 4', person: 'Supervisor Ali', status: 'IN_PROGRESS', progress: 65 },
                                    { title: 'Fertilizer Application', person: 'Admin Khan', status: 'PENDING', progress: 0 },
                                    { title: 'Machinery Routine Check', person: 'Mechanic Zahid', status: 'COMPLETED', progress: 100 },
                                ].map((task, i) => (
                                    <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all group">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <p className="font-bold text-black dark:text-white group-hover:text-emerald-500 transition-colors">{task.title}</p>
                                                <p className="text-xs text-slate-500 font-medium">Assigned to {task.person}</p>
                                            </div>
                                            <div className={`text-[10px] font-black px-2 py-1 rounded-md tracking-widest ${task.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                                                task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                {task.status}
                                            </div>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${task.progress}%` }}
                                                className={`h-full ${task.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        {/* Health & Status */}
                        <section className="glass-card p-6 border-t-4 border-emerald-500">
                            <h3 className="font-bold text-black dark:text-white mb-6 flex items-center gap-2">
                                <TrendingUp size={20} className="text-emerald-500" />
                                Farm Health
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                                        <span>Machinery Uptime</span>
                                        <span className="text-emerald-500">98%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[98%] bg-emerald-500 rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
                                        <span>Inventory Levels</span>
                                        <span className="text-amber-500">LOW</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full w-[45%] bg-amber-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Quick Tips / Info */}
                        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <Droplets size={120} />
                            </div>
                            <div className="relative z-10">
                                <AlertTriangle className="text-amber-400 mb-4" size={28} />
                                <h4 className="font-bold text-lg mb-2">Weather Alert</h4>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">High winds expected tomorrow (45 km/h). Please secure all pivots and temporary storage bales.</p>
                                <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-bold transition-all border border-white/5">
                                    Acknowledge Alert
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
