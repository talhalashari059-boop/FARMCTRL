
import { getUsers } from "@/app/actions/users"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserForm } from "@/components/UserForm"
import { WageEditor } from "@/components/WageEditor"
import { format } from "date-fns"
import { Users } from "lucide-react"

export default async function ManagementStaffPage() {
    const users = await getUsers() // This already filters for 'LABOUR' if role is 'MANAGEMENT'

    return (
        <div className="space-y-8">
            <PageHeader
                title="Labour Management"
                subtitle="Assign daily wages and manage field staff."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Form */}
                <div className="lg:col-span-1">
                    <UserForm creatorRole="MANAGEMENT" />
                </div>

                {/* Right: List */}
                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-xl bg-white/40 backdrop-blur-md overflow-hidden">
                        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
                            <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-800">
                                <Users size={20} className="text-emerald-500" />
                                Current Labour / موجودہ لیبر
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/80">
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">ID</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Daily Wage (RS)</th>
                                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {(users as any[]).map((user) => (
                                            <tr key={user.id} className="hover:bg-emerald-50/30 transition-colors">
                                                <td className="p-4 text-sm font-mono font-medium text-slate-600">{user.id}</td>
                                                <td className="p-4 text-sm font-bold text-slate-800">{user.name}</td>
                                                <td className="p-4">
                                                    <WageEditor userId={user.id} currentWage={user.dailyWage} />
                                                </td>
                                                <td className="p-4 text-sm text-slate-500">
                                                    {format(new Date(user.createdAt), 'MMM dd, yyyy')}
                                                </td>
                                            </tr>
                                        ))}
                                        {users.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="p-8 text-center text-slate-500">
                                                    No labour staff found. / کوئی لیبر عملہ نہیں ملا۔
                                                </td>
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
