
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const role = (session.user as any).role
    if (role !== 'MANAGEMENT' && role !== 'OWNER') {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const body = await req.json()
        const { data } = body // Expected: [{ userId, status, latitude, longitude }]

        if (!Array.isArray(data)) {
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
        }

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        await prisma.$transaction(
            data.map((record: any) =>
                prisma.attendance.upsert({
                    where: {
                        userId_date: {
                            userId: record.userId,
                            date: today
                        }
                    },
                    update: {
                        status: record.status,
                        latitude: record.latitude,
                        longitude: record.longitude,
                        checkInTime: record.status === 'PRESENT' ? new Date() : undefined
                    },
                    create: {
                        userId: record.userId,
                        date: today,
                        status: record.status,
                        latitude: record.latitude,
                        longitude: record.longitude,
                        checkInTime: record.status === 'PRESENT' ? new Date() : undefined
                    }
                })
            )
        )

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error("API Error (Attendance):", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
