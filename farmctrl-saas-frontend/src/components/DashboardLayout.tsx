
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { NAV_ITEMS } from '@/lib/navigation';
import { LogOut, Menu, X, Bell, UserCircle, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    // Auto-close sidebar on mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredNav = NAV_ITEMS.filter(item => user && item.roles.includes(user.role));

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                animate={{ width: isSidebarOpen ? 280 : 0 }}
                className={`fixed lg:static inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300 shadow-xl lg:shadow-none`}
            >
                <div className="p-6 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="bg-emerald-600 p-2 rounded-xl text-white">
                            <Settings size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-black dark:text-white">FARM<span className="text-emerald-500">CTRL</span></span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-black">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {filteredNav.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white'
                                    }`}
                            >
                                <Icon size={20} className={`${isActive ? 'text-white' : 'group-hover:text-emerald-500'} transition-colors duration-200`} />
                                <span className="font-medium">{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            {user?.name?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-black dark:text-white truncate">{user?.name}</p>
                            <p className="text-xs text-slate-500 truncate uppercase tracking-tighter">{user?.role.replace('_', ' ')}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-4 px-4 py-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all font-medium"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 lg:hidden"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="hidden md:flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-slate-400 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all border border-transparent focus-within:border-emerald-500/50">
                            <Search size={18} />
                            <input type="text" placeholder="Search farm data..." className="bg-transparent border-none p-0 focus:ring-0 text-sm w-64 text-black dark:text-white placeholder:text-slate-500" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="text-right hidden sm:block mr-2">
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{user?.farm?.name || 'Platform Admin'}</p>
                            <p className="text-sm font-bold text-black dark:text-white">Active Session</p>
                        </div>
                        <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-emerald-500 relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>
                        <button className="p-1 border-2 border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                <UserCircle size={24} className="text-slate-500" />
                            </div>
                        </button>
                    </div>
                </header>

                {/* Dashboard Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
