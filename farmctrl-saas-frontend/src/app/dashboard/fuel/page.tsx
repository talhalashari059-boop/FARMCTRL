
'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
    Fuel,
    ArrowUpRight,
    User,
    Tractor,
    Calendar,
    Droplets,
    TrendingUp,
    Download,
    Filter,
    History as HistoryIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const FUEL_LOGS = [
    { id: '1', date: '2024-03-24', machine: 'Tractor PK-ABC', staff: 'Ali Raza', litres: '45.0 L', purpose: 'Land Preparation' },
    { id: '2', date: '2024-03-24', machine: 'GenSet G-02', staff: 'Sajid Khan', litres: '120.0 L', purpose: 'Irrigation' },
    { id: '3', date: '2024-03-23', machine: 'Harvester H-01', staff: 'Ahmed Ali', litres: '280.0 L', purpose: 'Harvesting' },
    { id: '4', date: '2024-03-23', machine: 'Tractor PK-LXZ', staff: 'Ali Raza', litres: '35.5 L', purpose: 'Transport' },
];

export default function FuelPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Fuel & Logistics / ایندھن اور رسد</h1>
                        <p className="text-slate-500 mt-2">Maintain strict accountability for every litre of diesel issued across the farm.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-slate-900 dark:bg-slate-800 text-white px-5 py-3 rounded-2xl font-bold transition-all border border-white/5">
                            <Download size={18} />
                            <span>Export / برآمد کریں</span>
                        </button>
                        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/20">
                            <Fuel size={20} />
                            <span>Issue Fuel / ایندھن نکالیں</span>
                        </button>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Logs */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="glass-card overflow-hidden">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                    <HistoryIcon className="text-emerald-500" size={20} />
                                    Recent Issuance Records
                                </h3>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    <Filter size={18} className="text-slate-500" />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest bg-slate-50/50 dark:bg-slate-800/30">
                                            <th className="px-6 py-4">Date & Time</th>
                                            <th className="px-6 py-4">Asset / Machine</th>
                                            <th className="px-6 py-4">Quantity</th>
                                            <th className="px-6 py-4">Purpose</th>
                                            <th className="px-6 py-4">Staff Member</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {FUEL_LOGS.map((log, i) => (
                                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-emerald-500/5 transition-colors">
                                                <td className="px-6 py-4 text-xs font-bold text-slate-500">{log.date}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Tractor size={14} className="text-emerald-500" />
                                                        <span className="text-sm font-black text-slate-800 dark:text-white uppercase">{log.machine}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{log.litres}</span>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium text-slate-500">{log.purpose}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                                            <User size={12} />
                                                        </div>
                                                        {log.staff}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* Right: Stats & Reservoirs */}
                    <div className="space-y-6">
                        <section className="glass-card p-6">
                            <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <Droplets className="text-emerald-500" size={20} />
                                Fuel Reservoirs
                            </h3>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-end mb-3">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Storage A</p>
                                            <h4 className="text-xl font-black text-slate-800 dark:text-white">4,250 Litres</h4>
                                        </div>
                                        <p className="text-xs font-black text-emerald-500">65% Full</p>
                                    </div>
                                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '65%' }}
                                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg shadow-emerald-500/20"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-3">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Bowzer B</p>
                                            <h4 className="text-xl font-black text-slate-800 dark:text-white">820 Litres</h4>
                                        </div>
                                        <p className="text-xs font-black text-rose-500">22% - LOW</p>
                                    </div>
                                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '22%' }}
                                            className="h-full bg-gradient-to-r from-rose-500 to-orange-500 rounded-full shadow-lg shadow-rose-500/20"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-emerald-600 p-6 rounded-3xl text-white shadow-xl shadow-emerald-900/30 overflow-hidden relative">
                            <div className="absolute top-[-20px] right-[-20px] opacity-10">
                                <TrendingUp size={140} />
                            </div>
                            <div className="relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-1">Weekly Efficiency</p>
                                <h3 className="text-3xl font-black mb-4">9.2 km/L</h3>
                                <p className="text-emerald-100 text-xs leading-relaxed opacity-80">Your fuel efficiency is **12% higher** than last month due to regular machinery maintenance and optimized routing.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
