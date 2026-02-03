
'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    ClipboardCheck,
    MapPin,
    User,
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowRight,
    FileText,
    AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const STAFF_LIST = [
    { id: '1', name: 'Zahid Mehmood', role: 'Farm Manager', status: 'PRESENT', time: '07:15 AM' },
    { id: '2', name: 'Ali Raza', role: 'Supervisor', status: 'PRESENT', time: '07:30 AM' },
    { id: '3', name: 'Saqlain Mushtaq', role: 'Labour', status: 'ABSENT', time: '-' },
    { id: '4', name: 'Kashif Ali', role: 'Labour', status: 'PENDING', time: '-' },
    { id: '5', name: 'Waleed Khan', role: 'Labour', status: 'PRESENT', time: '07:45 AM' },
];

export default function AttendancePage() {
    const [view, setView] = useState<'marking' | 'leaves'>('marking');

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header with Toggle */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Attendance & Workflow / حاضری</h1>
                        <p className="text-slate-500 mt-2">Mark daily presence with GPS location and manage staff leave requests.</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex shadow-sm">
                        <button
                            onClick={() => setView('marking')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${view === 'marking' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            DAILY LOGGING
                        </button>
                        <button
                            onClick={() => setView('leaves')}
                            className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${view === 'leaves' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            LEAVE REQUESTS
                        </button>
                    </div>
                </section>

                {view === 'marking' ? (
                    <div className="space-y-6">
                        {/* Verification Banner */}
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-emerald-500 p-2 rounded-xl text-white">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-emerald-800 dark:text-emerald-400">GPS VERIFIED SATELLITE LOCK</p>
                                    <p className="text-xs font-medium text-emerald-600/60 dark:text-emerald-400/60">Lat: 30.3753° N, Lng: 69.3451° E | Cholistan Farm Sector 4</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Live Sync Enabled</span>
                            </div>
                        </div>

                        {/* Marking List */}
                        <section className="glass-card overflow-hidden">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">Daily Presence List / حاضری کی فہرست</h3>
                                    <p className="text-xs text-slate-400 font-medium">Select a staff member to update their status for today.</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Present Today</p>
                                        <p className="text-lg font-black text-emerald-600">38/42</p>
                                    </div>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {STAFF_LIST.map((staff, i) => (
                                    <div key={staff.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-lg text-slate-500">
                                                {staff.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 dark:text-white uppercase tracking-tight">{staff.name}</p>
                                                <p className="text-xs font-medium text-slate-500">{staff.role}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {staff.status === 'PRESENT' && (
                                                <div className="flex items-center gap-2 mr-4">
                                                    <Clock size={14} className="text-emerald-500" />
                                                    <span className="text-xs font-black text-emerald-600">{staff.time}</span>
                                                </div>
                                            )}

                                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                                                <button className={`px-4 py-2 rounded-lg text-xs font-black flex items-center gap-2 transition-all ${staff.status === 'PRESENT' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
                                                    <CheckCircle2 size={16} />
                                                    PRESENT
                                                </button>
                                                <button className={`px-4 py-2 rounded-lg text-xs font-black flex items-center gap-2 transition-all ${staff.status === 'ABSENT' ? 'bg-white shadow-sm text-rose-600' : 'text-slate-400 hover:text-slate-600'}`}>
                                                    <XCircle size={16} />
                                                    ABSENT
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Leave Application */}
                        <div className="lg:col-span-1 space-y-6">
                            <section className="glass-card p-8 border-t-4 border-emerald-500">
                                <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-6 uppercase tracking-tight">Apply for Leave / چھٹی کی درخواست</h3>
                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Range</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="date" className="w-full" />
                                            <input type="date" className="w-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reason / وجہ</label>
                                        <textarea className="w-full min-h-[120px]" placeholder="Explain your reason for leave..."></textarea>
                                    </div>
                                    <button className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-900/20 hover:scale-[0.98] transition-all">
                                        SUBMIT REQUEST
                                    </button>
                                </form>
                            </section>
                        </div>

                        {/* Right: History */}
                        <div className="lg:col-span-2 space-y-6">
                            <section className="glass-card">
                                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                                    <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-tight">My Leave status / چھٹی کی صورتحال</h3>
                                </div>
                                <div className="p-6">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                                        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm mb-4">
                                            <FileText className="text-slate-400" size={32} />
                                        </div>
                                        <h4 className="font-black text-slate-800 dark:text-white uppercase">No Pending Requests</h4>
                                        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">You have not submitted any leave requests in the last 30 days.</p>
                                    </div>
                                </div>
                            </section>

                            <div className="bg-slate-900 p-6 rounded-3xl text-white relative overflow-hidden group">
                                <div className="absolute right-[-10px] bottom-[-10px] opacity-10 group-hover:scale-110 transition-transform duration-500">
                                    <AlertCircle size={100} />
                                </div>
                                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <AlertCircle className="text-amber-400" size={20} />
                                    Policy Reminder
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed">Please submit leave requests **48 hours in advance** for planned absences. Emergency leaves must be reported to supervisors immediately via phone.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
