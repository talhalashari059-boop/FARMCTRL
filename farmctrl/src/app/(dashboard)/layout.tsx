
'use client'

import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import { useSession } from "next-auth/react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { data: session } = useSession()

    return (
        <div className="min-h-screen bg-[var(--background)] flex">
            {/* Sidebar passes role derived from session or defaults to simple styling */}
            <Sidebar
                role={session?.user?.role || 'GUEST'}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out md:ml-0">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="container mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
