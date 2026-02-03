
import { getLabourList } from "@/app/actions/attendance"
import AttendanceForm from "@/components/AttendanceForm"
import { PageHeader } from "@/components/ui/page-header"

export default async function AttendancePage() {
    const users = await getLabourList()

    return (
        <div className="space-y-6">
            <PageHeader
                title="Mark Attendance"
                subtitle={new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            />
            <AttendanceForm users={users} />
        </div>
    )
}
