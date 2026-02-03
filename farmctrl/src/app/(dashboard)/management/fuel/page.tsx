
import { getMachines, getRecentFuelLogs } from "@/app/actions/fuel"
import { getAssignableUsers } from "@/app/actions/tasks"
import FuelForm from "@/components/FuelForm"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Droplet } from "lucide-react"

export default async function FuelPage() {
    const machines = await getMachines()
    const users = await getAssignableUsers()
    const logs = await getRecentFuelLogs()

    return (
        <div className="space-y-6">
            <PageHeader
                title="Fuel Log & Issuance"
                subtitle="Track fuel consumption across machinery."
            />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <FuelForm machines={machines} users={users} />
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <CardHeader className="border-b border-gray-100 bg-slate-50/50">
                            <CardTitle className="text-base font-semibold">Recent Issuance Logs</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 text-muted-foreground font-medium border-b border-gray-100">
                                        <tr>
                                            <th className="text-left py-3 px-4">Machine</th>
                                            <th className="text-left py-3 px-4">Liters</th>
                                            <th className="text-left py-3 px-4">Purpose</th>
                                            <th className="text-left py-3 px-4">Operator</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {logs.map(log => (
                                            <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-3 px-4 font-medium text-gray-900">{log.machine.name}</td>
                                                <td className="py-3 px-4">
                                                    <Badge variant="secondary" className="font-mono">{log.liters.toFixed(1)} L</Badge>
                                                </td>
                                                <td className="py-3 px-4 text-muted-foreground">{log.purpose}</td>
                                                <td className="py-3 px-4 text-muted-foreground flex items-center gap-2">
                                                    {log.issuedTo?.name && <User size={14} className="opacity-50" />}
                                                    <span>{log.issuedTo?.name || '-'}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        {logs.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-8 text-center text-muted-foreground">No recent fuel logs found.</td>
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
