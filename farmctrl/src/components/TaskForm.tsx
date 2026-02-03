
'use client'

import { useState } from "react"
import { createTask } from "@/app/actions/tasks"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, PlusCircle } from "lucide-react"

interface User {
    id: string
    name: string
    role: string
}

export default function TaskForm({ users }: { users: User[] }) {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await createTask({
            title,
            description,
            assignedToUserId: assignedTo || undefined
        })

        setLoading(false)

        if (result.success) {
            setTitle("")
            setDescription("")
            setAssignedTo("")
            router.refresh()
        } else {
            alert("Failed to create task")
        }
    }

    return (
        <Card className="shadow-lg border-emerald-100">
            <CardHeader className="bg-emerald-50/50 pb-4">
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                    <PlusCircle className="h-5 w-5" />
                    Assign New Task
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Task Title / عنوان</label>
                        <Input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. Repair Pivot 3"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description / تفصیل</label>
                        <Input
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Details..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Assign To / ذمہ داری</label>
                        <select
                            className="flex h-11 w-full rounded-lg border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-background placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={assignedTo}
                            onChange={e => setAssignedTo(e.target.value)}
                        >
                            <option value="">Select Staff / عملہ منتخب کریں</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>
                                    {u.name} ({u.role})
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Assign Task
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
