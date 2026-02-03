
import Link from "next/link"
import { getManagementStats } from "@/app/actions/dashboard"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardCheck, Users, Package, Fuel, Wrench, ArrowRight, ArrowUpRight } from "lucide-react"

export default async function ManagementDashboard() {
    const stats = await getManagementStats()

    const quickActions = [
        { href: "/management/attendance", label: "Attendance", sub: "Mark Daily", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
        { href: "/management/staff", label: "Staff", sub: "Labour & Wages", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" },
        { href: "/management/tasks", label: "Daily Work", sub: "Assign Tasks", icon: ClipboardCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
        { href: "/management/inventory", label: "Inventory", sub: "Stock In/Out", icon: Package, color: "text-amber-500", bg: "bg-amber-50" },
        { href: "/management/fuel", label: "Fuel Log", sub: "Issue Liters", icon: Fuel, color: "text-rose-500", bg: "bg-rose-50" },
        { href: "/management/maintenance", label: "Maintenance", sub: "Log Repair", icon: Wrench, color: "text-violet-500", bg: "bg-violet-50" },
    ]


    return (
        <div className="space-y-8">
            <PageHeader
                title="Management Hub"
                subtitle={`Overview for ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}
            />

            {/* Hero Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="relative overflow-hidden border-l-4 border-l-emerald-500 shadow-md">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-emerald-500/10 blur-xl" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Today</CardTitle>
                        <ClipboardCheck className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-700">{stats.todayTasks}</div>
                        <p className="text-xs text-muted-foreground mt-1">+2 from yesterday</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-l-4 border-l-amber-500 shadow-md">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-amber-500/10 blur-xl" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
                        <ClipboardCheck className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-amber-600">{stats.pendingTasks}</div>
                        <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-l-4 border-l-blue-500 shadow-md">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-blue-500/10 blur-xl" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-600">{stats.todayAttendance}</div>
                        <p className="text-xs text-muted-foreground mt-1">Workers present</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions Grid */}
            <div>
                <h2 className="text-xl font-semibold tracking-tight mb-4">Quick Actions / فوری اقدامات</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                    {quickActions.map((action) => {
                        const Icon = action.icon
                        return (
                            <Link key={action.href} href={action.href}>
                                <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02] border-0 ring-1 ring-slate-100 hover:ring-slate-200 bg-white/80 backdrop-blur-sm group">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
                                        <div className={`p-3 rounded-2xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                                            <Icon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-[var(--primary)] transition-colors">{action.label}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">{action.sub}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Recent Activity / Widgets Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-0 shadow-md">
                    <CardHeader>
                        <CardTitle>Recent Activity Stream</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary" className="h-8 w-8 flex items-center justify-center rounded-full p-0">✔️</Badge>
                                        <div>
                                            <p className="text-sm font-medium">Task "Repair Pivot 2" Completed</p>
                                            <p className="text-xs text-muted-foreground">by Ali Khan • 2 hours ago</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm"><ArrowRight size={16} /></Button>
                                </div>
                            ))}
                            <div className="pt-2 text-center">
                                <Button variant="ghost" className="text-xs text-muted-foreground">View All Logic Logs</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-white">System Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Server Status</span>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">Online</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Database</span>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">Healthy</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>GPS Sync</span>
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">Active</Badge>
                        </div>
                        <div className="pt-4 mt-4 border-t border-white/20">
                            <Button size="sm" className="w-full bg-white text-emerald-700 hover:bg-blue-50 font-semibold border-0">
                                System Diagnostics <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
