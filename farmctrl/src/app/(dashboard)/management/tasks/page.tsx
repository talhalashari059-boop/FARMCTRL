
import { getTasks, getAssignableUsers } from "@/app/actions/tasks"
import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
import { PageHeader } from "@/components/ui/page-header"

export default async function TasksPage() {
    const tasks = await getTasks()
    const users = await getAssignableUsers()

    return (
        <div className="space-y-6">
            <PageHeader
                title="Daily Work Assignments"
                subtitle="Assign, track, and manage farm tasks."
            />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <TaskForm users={users} />
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold tracking-tight">Active Tasks ({tasks.length})</h2>
                    </div>
                    <TaskList tasks={tasks} />
                </div>
            </div>
        </div>
    )
}
