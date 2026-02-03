
import { getMachines } from "@/app/actions/fuel"
import { getMaintenanceLogs } from "@/app/actions/maintenance"
import MaintenanceForm from "@/components/MaintenanceForm"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench } from "lucide-react"

export default async function MaintenancePage() {
    const machines = await getMachines()
    const logs = await getMaintenanceLogs()

    return (
        <div className="space-y-6">
            <PageHeader
                title="Maintenance & Repairs"
                subtitle="Log repairs and track machine health."
            />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <MaintenanceForm machines={machines} />
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <CardHeader className="border-b border-gray-100 bg-slate-50/50">
                            <CardTitle className="text-base font-semibold">Maintenance History</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 text-muted-foreground font-medium border-b border-gray-100">
                                        <tr>
                                            <th className="text-left py-3 px-4">Machine</th>
                                            <th className="text-left py-3 px-4">Issue</th>
                                            <th className="text-left py-3 px-4">Action</th>
                                            <th className="text-left py-3 px-4">Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {logs.map(log => (
                                            <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-3 px-4 font-medium text-gray-900">{log.machine.name}</td>
                                                <td className="py-3 px-4 text-red-600 font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Wrench size={14} />
                                                        {log.issue}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-muted-foreground">{log.actionTaken}</td>
                                                <td className="py-3 px-4 font-mono font-medium">
                                                    {log.cost ? `Rs ${log.cost.toLocaleString()}` : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                        {logs.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-8 text-center text-muted-foreground">No maintenance records found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
