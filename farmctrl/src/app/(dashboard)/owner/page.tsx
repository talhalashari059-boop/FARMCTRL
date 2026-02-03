
import Link from "next/link"
import { getOwnerKPIs } from "@/app/actions/dashboard"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Droplets, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"

export default async function OwnerDashboard() {
    const data = await getOwnerKPIs()

    return (
        <div className="space-y-8">
            <PageHeader
                title="Executive Overview"
                subtitle="High-level operational metrics and alerts."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                <Card className="relative overflow-hidden border-t-4 border-t-emerald-500 shadow-lg bg-white/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Workforce</CardTitle>
                        <Users className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-emerald-700">{data.labourPresent}</div>
                        <p className="text-xs text-muted-foreground mt-1">Staff on site today</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-t-4 border-t-blue-500 shadow-lg bg-white/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Fuel Consumption</CardTitle>
                        <Droplets className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-blue-700">{data.fuelThisMonth.toFixed(0)} <span className="text-lg text-muted-foreground font-normal">L</span></div>
                        <p className="text-xs text-muted-foreground mt-1">Total issued this month</p>
                    </CardContent>
                </Card>

                <Card className={`relative overflow-hidden border-t-4 shadow-lg bg-white/50 backdrop-blur-sm ${data.lowStockItems > 0 ? 'border-t-rose-500' : 'border-t-green-500'}`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Alerts</CardTitle>
                        <AlertTriangle className={`h-4 w-4 ${data.lowStockItems > 0 ? 'text-rose-500' : 'text-green-500'}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-4xl font-bold ${data.lowStockItems > 0 ? 'text-rose-700' : 'text-green-700'}`}>{data.lowStockItems}</div>
                        <p className="text-xs text-muted-foreground mt-1">Items below min stock</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-t-4 border-t-indigo-500 shadow-lg bg-white/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Cost Driver</CardTitle>
                        <DollarSign className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-indigo-700 truncate" title={data.highestCostMachine}>{data.highestCostMachine}</div>
                        <p className="text-xs text-muted-foreground mt-1">Highest maintenance cost</p>
                    </CardContent>
                </Card>

            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Link href="/owner/users" className="group">
                    <Card className="flex items-center gap-4 p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500 bg-white/50 backdrop-blur-sm">
                        <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Add Staff / عملہ شامل کریں</h3>
                            <p className="text-xs text-muted-foreground">Manage Managers and Labour</p>
                        </div>
                    </Card>
                </Link>
            </div>


            {/* Charts Placeholder - For visual completeness as requested in prompt "charts" */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-[300px] flex items-center justify-center border-dashed border-2 bg-slate-50/50">
                    <div className="text-center text-muted-foreground">
                        <TrendingUp size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Cost Analysis Chart</p>
                        <span className="text-xs">(Data integration pending)</span>
                    </div>
                </Card>
                <Card className="h-[300px] flex items-center justify-center border-dashed border-2 bg-slate-50/50">
                    <div className="text-center text-muted-foreground">
                        <Droplets size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Fuel Usage Trend</p>
                        <span className="text-xs">(Data integration pending)</span>
                    </div>
                </Card>
            </div>
        </div>
    )
}
