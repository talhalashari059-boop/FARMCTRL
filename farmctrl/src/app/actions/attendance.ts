
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getLabourList() {
    return await prisma.user.findMany({
        where: { role: 'LABOUR' },
        select: { id: true, name: true }
    })
}

export async function markAttendance(data: { userId: string, status: string, latitude?: number, longitude?: number }[]) {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Normalize to midnight

    try {
        // Transaction to batch updates
        await prisma.$transaction(
            data.map((record) =>
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
        revalidatePath('/management/attendance')
        return { success: true }
    } catch (error) {
        console.error("Failed to mark attendance:", error)
        return { success: false, error: "Failed to save attendance" }
    }
}
