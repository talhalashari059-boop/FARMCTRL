
'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
    Users,
    UserPlus,
    Search,
    Filter,
    MoreVertical,
    BadgeCheck,
    Clock,
    Ban,
    Mail,
    Phone,
    ArrowUpDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const DUMMY_STAFF = [
    { id: '1', name: 'Zahid Mehmood', role: 'FARM_MANAGER', department: 'Operations', status: 'ACTIVE', phone: '+92 300 1234567', joindate: 'Jan 12, 2024' },
    { id: '2', name: 'Ali Raza', role: 'SUPERVISOR', department: 'Irrigation', status: 'ACTIVE', phone: '+92 301 7654321', joindate: 'Feb 05, 2024' },
    { id: '3', name: 'Muhammad Ahmed', role: 'LABOUR', department: 'Machinery', status: 'INACTIVE', phone: '+92 345 1122334', joindate: 'Dec 20, 2023' },
    { id: '4', name: 'Sajid Ali', role: 'SUPERVISOR', department: 'Store', status: 'ACTIVE', phone: '+92 322 9988776', joindate: 'Mar 15, 2024' },
];

export default function StaffPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Page Header */}
                <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Staff Management / عملہ کا انتظام</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage personnel lifecycle and operational assignments.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-900/20">
                        <UserPlus size={20} />
                        <span>Add New Staff / نیا عملہ شامل کریں</span>
                    </button>
                </section>

                {/* Control Bar */}
                <section className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center shadow-sm">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, role or department..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-transparent rounded-2xl text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-2xl text-sm font-bold border border-transparent hover:border-slate-200 transition-all">
                            <Filter size={18} />
                            <span>Filter</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-2xl text-sm font-bold border border-transparent hover:border-slate-200 transition-all">
                            <ArrowUpDown size={18} />
                            <span>Sort</span>
                        </button>
                    </div>
                </section>

                {/* Staff Table */}
                <section className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-xs font-black uppercase tracking-widest bg-slate-50/50 dark:bg-slate-800/50">
                                    <th className="px-6 py-5">Full Name / نام</th>
                                    <th className="px-6 py-5">Role / عہدہ</th>
                                    <th className="px-6 py-5">Department / شعبہ</th>
                                    <th className="px-6 py-5">Contact / رابطہ</th>
                                    <th className="px-6 py-5">Status / حالت</th>
                                    <th className="px-6 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {DUMMY_STAFF.map((staff, idx) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={staff.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                                                    {staff.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 dark:text-white">{staff.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">Emp ID: #{staff.id}002</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                                    <BadgeCheck size={14} />
                                                </div>
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-tighter uppercase">{staff.role.replace('_', ' ')}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-sm font-medium text-slate-500">{staff.department}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1">
                                                    <Phone size={10} className="text-emerald-500" />
                                                    {staff.phone}
                                                </p>
                                                <p className="text-[10px] text-slate-400 flex items-center gap-1 tracking-tighter">
                                                    <Clock size={10} />
                                                    Joined {staff.joindate}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${staff.status === 'ACTIVE'
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                                }`}>
                                                {staff.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                                <MoreVertical size={18} className="text-slate-500" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="p-6 bg-slate-50/50 dark:bg-slate-800/10 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-xs font-medium text-slate-500 tracking-wide uppercase">Showing 4 of 142 total staff members</p>
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg border border-slate-200 bg-white shadow-sm disabled:opacity-50">1</button>
                            <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg border border-transparent hover:bg-slate-100 transition-all">2</button>
                            <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg border border-transparent hover:bg-slate-100 transition-all text-slate-400">...</button>
                        </div>
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
