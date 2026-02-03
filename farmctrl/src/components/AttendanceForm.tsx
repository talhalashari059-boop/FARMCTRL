
'use client'

import { useState } from "react"
import { markAttendance } from "@/app/actions/attendance"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Loader2 } from "lucide-react"

interface User {
    id: string
    name: string
}

export default function AttendanceForm({ users }: { users: User[] }) {
    const router = useRouter()
    const [attendance, setAttendance] = useState<Record<string, string>>({})
    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null)
    const [loading, setLoading] = useState(false)
    const [locating, setLocating] = useState(false)

    const handleStatusChange = (userId: string, status: string) => {
        setAttendance(prev => ({ ...prev, [userId]: status }))
    }

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser")
            return
        }
        setLocating(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
                setLocating(false)
            },
            () => {
                alert("Unable to retrieve your location")
                setLocating(false)
            }
        )
    }

    const handleSubmit = async () => {
        setLoading(true)
        const data = Object.entries(attendance).map(([userId, status]) => ({
            userId,
            status,
            latitude: location?.lat,
            longitude: location?.lng
        }))

        const result = await markAttendance(data)
        setLoading(false)

        if (result.success) {
            alert("Attendance marked successfully / حاضری لگ گئی")
            router.refresh()
        } else {
            alert("Error marking attendance")
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${location ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Location Tagging</h3>
                            {location ? (
                                <p className="text-sm text-emerald-600 font-medium">{location.lat.toFixed(5)}, {location.lng.toFixed(5)}</p>
                            ) : (
                                <p className="text-sm text-muted-foreground">Location not captured</p>
                            )}
                        </div>
                    </div>
                    <Button
                        variant={location ? "outline" : "secondary"}
                        onClick={getLocation}
                        disabled={locating}
                    >
                        {locating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {location ? "Update Location" : "Get Location"}
                    </Button>
                </CardContent>
            </Card>

            <Card className="divide-y divide-gray-100">
                {users.map(user => (
                    <div key={user.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                {user.name.charAt(0)}
                            </div>
                            <span className="font-medium text-lg">{user.name}</span>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant={attendance[user.id] === 'PRESENT' ? 'default' : 'outline'}
                                className={attendance[user.id] === 'PRESENT' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                                onClick={() => handleStatusChange(user.id, 'PRESENT')}
                            >
                                Present
                            </Button>
                            <Button
                                size="sm"
                                variant={attendance[user.id] === 'ABSENT' ? 'destructive' : 'outline'}
                                onClick={() => handleStatusChange(user.id, 'ABSENT')}
                            >
                                Absent
                            </Button>
                            <Button
                                size="sm"
                                variant={attendance[user.id] === 'LEAVE' ? 'secondary' : 'outline'}
                                className={attendance[user.id] === 'LEAVE' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                                onClick={() => handleStatusChange(user.id, 'LEAVE')}
                            >
                                Leave
                            </Button>
                        </div>
                    </div>
                ))}
            </Card>

            <div className="sticky bottom-4 z-10">
                <Button
                    size="lg"
                    className="w-full shadow-xl"
                    onClick={handleSubmit}
                    disabled={loading || Object.keys(attendance).length === 0}
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Daily Attendance
                </Button>
            </div>
        </div>
    )
}
