
'use client'

import { useState } from "react"
import { logFuel } from "@/app/actions/fuel"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Fuel } from "lucide-react"

interface Machine {
    id: string
    name: string
    type: string
}

interface User {
    id: string
    name: string
}

export default function FuelForm({ machines, users }: { machines: Machine[], users: User[] }) {
    const router = useRouter()
    const [machineId, setMachineId] = useState("")
    const [liters, setLiters] = useState("")
    const [purpose, setPurpose] = useState("")
    const [issuedTo, setIssuedTo] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await logFuel({
            machineId,
            liters: parseFloat(liters),
            purpose,
            issuedToUserId: issuedTo || undefined
        })

        setLoading(false)

        if (result.success) {
            setMachineId("")
            setLiters("")
            setPurpose("")
            setIssuedTo("")
            router.refresh()
            alert("Fuel logged successfully")
        } else {
            alert("Failed to log fuel")
        }
    }

    return (
        <Card className="shadow-lg border-blue-100">
            <CardHeader className="bg-blue-50/50 pb-4">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Fuel className="h-5 w-5" />
                    New Fuel Entry
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
                        <label className="text-sm font-medium">Liters Issued / لیٹر</label>
                        <Input
                            type="number"
                            step="0.1"
                            value={liters}
                            onChange={e => setLiters(e.target.value)}
                            placeholder="0.0"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Purpose / مقصد</label>
                        <Input
                            value={purpose}
                            onChange={e => setPurpose(e.target.value)}
                            placeholder="e.g. Irrigation"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Issued To / کس کو دیا</label>
                        <select
                            className="flex h-11 w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-background placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={issuedTo}
                            onChange={e => setIssuedTo(e.target.value)}
                        >
                            <option value="">Select Person (Optional)</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Log Fuel
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
