
'use client'

import { completeTask } from "@/app/actions/tasks"
import { useRouter } from "next/navigation"
import { CheckCircle, Clock, Calendar, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Temporary type definition
interface Task {
    id: string
    title: string
    description?: string | null
    status: string
    createdAt: Date
    assignedTo?: {
        name: string | null
    } | null
}

export default function TaskList({ tasks }: { tasks: Task[] }) {
    const router = useRouter()

    const handleComplete = async (taskId: string) => {
        if (confirm("Mark this task as completed?")) {
            await completeTask(taskId)
            router.refresh()
        }
    }

    if (tasks.length === 0) {
        return (
            <Card className="bg-slate-50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                    <AlertCircle className="h-10 w-10 mb-2 opacity-20" />
                    <p>No active tasks found.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-3">
            {tasks.map(task => (
                <Card key={task.id} className={`transition-all hover:shadow-md ${task.status === 'COMPLETED' ? 'opacity-70 bg-slate-50' : 'bg-white'}`}>
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h4 className={`font-semibold text-lg ${task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : 'text-gray-900'}`}>
                                    {task.title}
                                </h4>
                                <Badge variant={task.status === 'COMPLETED' ? 'success' : 'warning'}>
                                    {task.status}
                                </Badge>
                            </div>

                            {task.description && (
                                <p className="text-sm text-muted-foreground">{task.description}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-2">
                                <div className="flex items-center gap-1">
                                    <User size={14} />
                                    <span>{task.assignedTo?.name || 'Unassigned'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        {task.status === 'PENDING' && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                                onClick={() => handleComplete(task.id)}
                            >
                                <CheckCircle size={18} className="mr-1" />
                                Complete
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
