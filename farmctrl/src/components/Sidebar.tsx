
'use client'

import { usePathname } from "next/navigation"
import Link from 'next/link'
import { LayoutDashboard, Users, ClipboardCheck, Truck, Package, Wrench, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar({ role, isOpen, onClose }: { role: string, isOpen: boolean, onClose: () => void }) {
    const pathname = usePathname()

    const navItems = [
        { name: 'Overview', href: '/owner', icon: LayoutDashboard, roles: ['OWNER'] },
        { name: 'Staff', href: '/owner/users', icon: Users, roles: ['OWNER'] },
        { name: 'Management', href: '/management', icon: LayoutDashboard, roles: ['MANAGEMENT'] },
        { name: 'Staff', href: '/management/staff', icon: Users, roles: ['MANAGEMENT'] },
        { name: 'My Attendance', href: '/labour', icon: LayoutDashboard, roles: ['LABOUR'] },

        { name: 'Attendance', href: '/management/attendance', icon: Users, roles: ['MANAGEMENT', 'OWNER'] },

        { name: 'Daily Work', href: '/management/tasks', icon: ClipboardCheck, roles: ['MANAGEMENT', 'OWNER'] },
        { name: 'Fuel Log', href: '/management/fuel', icon: Truck, roles: ['MANAGEMENT', 'OWNER'] },
        { name: 'Inventory', href: '/management/inventory', icon: Package, roles: ['MANAGEMENT', 'OWNER'] },
        { name: 'Maintenance', href: '/management/maintenance', icon: Wrench, roles: ['MANAGEMENT', 'OWNER'] },
    ]

    const filteredItems = navItems.filter(item => item.roles.includes(role))

    return (
        <>
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    "glass-panel border-r border-[#e2e8f0]"
                )}
                style={{ backgroundColor: 'rgb(255 255 255 / 0.95)' }}
            >
                <div className="flex h-16 items-center justify-center border-b border-[#e2e8f0]/50">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        FARMCTRL
                    </h1>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    {filteredItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-200"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <Icon
                                    size={20}
                                    className={cn(
                                        "transition-colors",
                                        isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                                    )}
                                />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-[#e2e8f0]/50">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                            {role.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700">User: {role}</p>
                            <button onClick={() => window.location.href = '/api/auth/signout'} className="text-xs text-red-500 hover:underline flex items-center gap-1 mt-0.5">
                                <LogOut size={10} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}
        </>
    )
}
