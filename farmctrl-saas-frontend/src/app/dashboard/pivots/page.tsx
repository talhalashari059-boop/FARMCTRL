
'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
    Droplets,
    Activity,
    AlertTriangle,
    Wind,
    Thermometer,
    Settings,
    Zap,
    RefreshCw,
    Sprout
} from 'lucide-react';
import { motion } from 'framer-motion';

const PIVOTS = [
    { id: '1', name: 'Pivot Sector 01', crop: 'Rhodes Grass', status: 'RUNNING', pressure: '4.2 Bar', health: 98 },
    { id: '2', name: 'Pivot Sector 02', crop: 'Rhodes Grass', status: 'RUNNING', pressure: '4.1 Bar', health: 95 },
    { id: '3', name: 'Pivot Sector 03', crop: 'Alfalfa', status: 'STANDBY', pressure: '0.0 Bar', health: 100 },
    { id: '4', name: 'Pivot Sector 04', crop: 'Corn (Silage)', status: 'MAINTENANCE', pressure: '0.0 Bar', health: 65 },
];

export default function PivotsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight text-emerald-600">Irrigation & Pivots / آبپاشی</h1>
                        <p className="text-slate-500 mt-2">Manage all irrigation sectors and monitor real-time pressure and status.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/20">
                            <Settings size={18} />
                            <span>Sector Setup</span>
                        </button>
                    </div>
                </section>

                {/* Environmental Telemetry */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Wind Speed', value: '18 km/h', icon: Wind, color: 'emerald' },
                        { label: 'Soil Humidity', value: '42%', icon: Droplets, color: 'blue' },
                        { label: 'Ambient Temp', value: '38°C', icon: Thermometer, color: 'amber' },
                        { label: 'Pump Energy', value: '72 kW', icon: Zap, color: 'teal' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                <stat.icon size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                                <p className="text-lg font-black text-slate-800 dark:text-white">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Pivots Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PIVOTS.map((pivot, idx) => (
                        <motion.div
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={pivot.id}
                            className="glass-card overflow-hidden group border-l-4 border-l-emerald-500"
                        >
                            <div className="p-6 flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-4 rounded-2xl transition-all ${pivot.status === 'RUNNING' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' :
                                            pivot.status === 'MAINTENANCE' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' :
                                                'bg-slate-200 dark:bg-slate-800 text-slate-500'
                                        }`}>
                                        <RefreshCw size={24} className={pivot.status === 'RUNNING' ? 'animate-spin-slow' : ''} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase">{pivot.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Sprout size={14} className="text-emerald-500" />
                                            <span className="text-xs font-bold text-slate-500">{pivot.crop}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${pivot.status === 'RUNNING' ? 'bg-emerald-100 text-emerald-700' :
                                        pivot.status === 'MAINTENANCE' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {pivot.status}
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/30 grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Pressure</p>
                                    <p className="text-sm font-black text-slate-800 dark:text-white">{pivot.pressure}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Health Scan</p>
                                    <p className={`text-sm font-black ${pivot.health > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{pivot.health}%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Runtime</p>
                                    <p className="text-sm font-black text-slate-800 dark:text-white">12h 45m</p>
                                </div>
                            </div>

                            <div className="p-4 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {[1, 2].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold">
                                            {i === 1 ? 'S' : 'M'}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all">
                                        <Activity size={18} className="text-slate-500" />
                                    </button>
                                    <button className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${pivot.status === 'RUNNING' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                        }`}>
                                        {pivot.status === 'RUNNING' ? 'STOP PIVOT' : 'START PIVOT'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add Pivot Placeholder */}
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all cursor-pointer group">
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                            <Zap size={32} className="text-slate-400" />
                        </div>
                        <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tight">Expand Sector</h4>
                        <p className="text-xs text-slate-500 mt-1">Register a new irrigation unit or booster pump.</p>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
