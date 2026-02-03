
'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
    Tractor,
    Settings,
    Activity,
    AlertCircle,
    Calendar,
    Clock,
    MapPin,
    Plus,
    ArrowRight,
    History as HistoryIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const MACHINERY = [
    { id: '1', type: 'Tractor', model: 'John Deere 6120M', plate: 'PK-ABC-123', status: 'ACTIVE', hours: '1,240 hrs', assigned: 'Zahid M.' },
    { id: '2', type: 'Pivot', model: 'Valley 8000 Series', plate: 'PIVOT-01', status: 'ACTIVE', hours: '4,500 hrs', assigned: 'Auto-Run' },
    { id: '3', type: 'Harvester', model: 'Claas Lexion', plate: 'PK-HVT-786', status: 'MAINTENANCE', hours: '820 hrs', assigned: 'N/A' },
    { id: '4', type: 'Tractor', model: 'Massey Ferguson 385', plate: 'PK-LXZ-554', status: 'OUT_OF_SERVICE', hours: '3,100 hrs', assigned: 'N/A' },
];

export default function MachineryPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Machinery & Fleet / مشینری اور بیڑا</h1>
                        <p className="text-slate-500 mt-2">Track status, usage hours, and maintenance schedules for all farm equipment.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-3xl font-bold transition-all shadow-xl shadow-emerald-900/20 group">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        <span>Register Machine / مشین رجسٹر کریں</span>
                    </button>
                </section>

                {/* Global Fleet Status */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Fleet', value: '42', color: 'blue' },
                        { label: 'Operational', value: '38', color: 'emerald' },
                        { label: 'In Workshop', value: '3', color: 'amber' },
                        { label: 'Decommissioned', value: '1', color: 'rose' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                            <p className={`text-2xl font-black text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</p>
                        </div>
                    ))}
                </section>

                {/* Machinery Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {MACHINERY.map((machine, idx) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            key={machine.id}
                            className="glass-card p-6 border-b-4 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all">
                                    <Tractor size={32} />
                                </div>
                                <div className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${machine.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                                    machine.status === 'MAINTENANCE' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                                        'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'
                                    }`}>
                                    {machine.status.replace('_', ' ')}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">ID: {machine.plate}</p>
                                    <h3 className="text-xl font-black text-slate-800 dark:text-white mt-1 uppercase">{machine.model}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 dark:border-slate-800">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Total Runtime</p>
                                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                                            <Clock size={14} className="text-emerald-500" />
                                            <span>{machine.hours}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Current User</p>
                                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                                            <Activity size={14} className="text-blue-500" />
                                            <span>{machine.assigned}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <button className="text-xs font-black text-slate-400 hover:text-emerald-500 flex items-center gap-2 p-2 rounded-xl transition-all">
                                        <HistoryIcon size={16} />
                                        HISTORY
                                    </button>
                                    <button className="flex items-center gap-2 bg-slate-900 dark:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all">
                                        DETAILS
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </section>
            </div>
        </DashboardLayout>
    );
}
