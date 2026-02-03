
'use client'

import { useState } from "react"
import { logMaintenance } from "@/app/actions/maintenance"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, PenTool } from "lucide-react"

interface Machine {
    id: string
    name: string
    type: string
}

export default function MaintenanceForm({ machines }: { machines: Machine[] }) {
    const router = useRouter()
    const [machineId, setMachineId] = useState("")
    const [issue, setIssue] = useState("")
    const [actionTaken, setActionTaken] = useState("")
    const [cost, setCost] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await logMaintenance({
            machineId,
            issue,
            actionTaken,
            cost: cost ? parseFloat(cost) : undefined
        })

        setLoading(false)

        if (result.success) {
            setMachineId("")
            setIssue("")
            setActionTaken("")
            setCost("")
            router.refresh()
            alert("Maintenance logged successfully")
        } else {
            alert("Failed to log maintenance")
        }
    }

    return (
        <Card className="shadow-lg border-purple-100">
            <CardHeader className="bg-purple-50/50 pb-4">
                <CardTitle className="flex items-center gap-2 text-purple-800">
                    <PenTool className="h-5 w-5" />
                    Log Repair
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Machine / مشین</label>
                        <select
                            className="flex h-11 w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-background placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={machineId}
                            onChange={e => setMachineId(e.target.value)}
                            required
                        >
                            <option value="">Select Machine</option>
                            {machines.map(m => (
                                <option key={m.id} value={m.id}>{m.name} ({m.type})</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Issue / مسئلہ</label>
                        <Input value={issue} onChange={e => setIssue(e.target.value)} placeholder="e.g. Engine Overheating" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Action Taken / کیا مرمت کی</label>
                        <Input value={actionTaken} onChange={e => setActionTaken(e.target.value)} placeholder="e.g. Changed Coolant" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cost / خرچہ (Optional)</label>
                        <Input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="0" />
                    </div>

                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Log Maintenance"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
