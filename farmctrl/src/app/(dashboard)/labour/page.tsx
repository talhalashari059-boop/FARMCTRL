
import { getLabourStats } from "@/app/actions/dashboard"

export default async function LabourDashboard() {
    const stats = await getLabourStats()

    if (!stats) return <div>Loading...</div>

    return (
        <div className="container">
            <h1>My Dashboard / میرا ڈیش بورڈ</h1>

            <div className="card">
                <h2>Attendance History / حاضری ریکارڈ</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {stats.history.map(record => (
                        <div key={record.id} style={{
                            display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border)',
                            backgroundColor: record.status === 'PRESENT' ? '#eff6ff' : (record.status === 'ABSENT' ? '#fef2f2' : '#fffbeb')
                        }}>
                            <div>
                                <span style={{ fontWeight: 'bold', display: 'block' }}>{new Date(record.date).toLocaleDateString()}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>
                                    {record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString() : '-'}
                                </span>
                            </div>
                            <div style={{
                                fontWeight: 'bold',
                                color: record.status === 'PRESENT' ? '#1d4ed8' : (record.status === 'ABSENT' ? '#dc2626' : '#d97706')
                            }}>
                                {record.status === 'PRESENT' && "Present / حاضر"}
                                {record.status === 'ABSENT' && "Absent / غیر حاضر"}
                                {record.status === 'LEAVE' && "Leave / چھٹی"}
                            </div>
                        </div>
                    ))}
                    {stats.history.length === 0 && <p>No history found / کوئی ریکارڈ نہیں ملا</p>}
                </div>
            </div>
        </div>
    )
}
