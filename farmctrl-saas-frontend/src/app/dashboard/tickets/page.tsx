
'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
    Ticket,
    Plus,
    Search,
    AlertCircle,
    MessageSquare,
    User,
    Clock,
    CheckCircle2,
    Wrench,
    AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

const TICKETS = [
    { id: 'TIC-102', title: 'Pivot 4 Motor Noise', priority: 'HIGH', status: 'OPEN', reporter: 'Ali Raza', time: '2h ago', category: 'Machinery' },
    { id: 'TIC-101', title: 'Fuel Pump Leak', priority: 'CRITICAL', status: 'ASSIGNED', reporter: 'Sajid Khan', time: '5h ago', category: 'Logistics' },
    { id: 'TIC-100', title: 'Staff ID Card Request', priority: 'LOW', status: 'RESOLVED', reporter: 'Waleed Ahmad', time: '1d ago', category: 'Admin' },
];

export default function TicketsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Ticketing & Issues / مسائل کا انتظام</h1>
                        <p className="text-slate-500 mt-2">Report technical breakdowns, operational issues, or resource requests.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-3xl font-bold transition-all shadow-xl shadow-emerald-900/20 group">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        <span>Raise Ticket / شکایت درج کریں</span>
                    </button>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar: Filters & Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <section className="glass-card p-6">
                            <h3 className="font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-tight text-sm">Overview</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Open', count: '12', color: 'rose' },
                                    { label: 'InProgress', count: '5', color: 'blue' },
                                    { label: 'Resolved', count: '142', color: 'emerald' },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full bg-${s.color}-500`} />
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">{s.label}</span>
                                        </div>
                                        <span className="text-sm font-black text-slate-800 dark:text-white">{s.count}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
                            <div className="absolute right-[-10px] top-[-10px] opacity-10">
                                <Wrench size={80} />
                            </div>
                            <h4 className="font-bold text-lg mb-2">Technicians</h4>
                            <p className="text-slate-400 text-xs mb-4">3 Technicians currently on duty at Farm Alpha.</p>
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">T{i}</div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Main: Ticket List */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input type="text" placeholder="Filter tickets..." className="w-full pl-10 pr-4 py-2 bg-transparent border-none text-sm focus:ring-0" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {TICKETS.map((ticket, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={ticket.id}
                                    className="glass-card hover:border-emerald-500/50 transition-all group overflow-hidden"
                                >
                                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black text-slate-400 tracking-widest">{ticket.id}</span>
                                                <div className={`px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase ${ticket.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                                                        ticket.priority === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                                                    }`}>
                                                    {ticket.priority}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight group-hover:text-emerald-500 transition-colors">
                                                {ticket.title}
                                            </h3>
                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                    <User size={14} className="text-emerald-500" />
                                                    {ticket.reporter}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                                    <Clock size={14} />
                                                    {ticket.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 italic">
                                                    <MessageSquare size={14} />
                                                    2 updates
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden md:block">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</p>
                                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{ticket.category}</p>
                                            </div>
                                            <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 text-xs font-black tracking-widest uppercase ${ticket.status === 'OPEN' ? 'border-rose-500/20 text-rose-500 bg-rose-500/5' :
                                                    ticket.status === 'ASSIGNED' ? 'border-blue-500/20 text-blue-500 bg-blue-500/5' :
                                                        'border-emerald-500/20 text-emerald-500 bg-emerald-500/5'
                                                }`}>
                                                {ticket.status === 'RESOLVED' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                                                {ticket.status}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
