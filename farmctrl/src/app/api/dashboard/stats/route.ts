
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const role = (session.user as any).role
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    try {
        if (role === 'MANAGEMENT' || role === 'OWNER') {
            const [todayTasks, pendingTasks, todayAttendance, inventoryItems, fuelThisMonth] = await Promise.all([
                prisma.task.count({ where: { createdAt: { gte: today } } }),
                prisma.task.count({ where: { status: 'PENDING' } }),
                prisma.attendance.count({ where: { date: today, status: 'PRESENT' } }),
                prisma.inventoryItem.findMany({ select: { quantity: true, minLevel: true } }),
                prisma.fuelLog.aggregate({
                    _sum: { liters: true },
                    where: { createdAt: { gte: startOfMonth } }
                })
            ])

            const lowStockItems = inventoryItems.filter(item => item.quantity <= item.minLevel).length

            return NextResponse.json({
                todayTasks,
                pendingTasks,
                todayAttendance,
                lowStockItems,
                fuelThisMonth: fuelThisMonth._sum.liters || 0,
            })
        }

        if (role === 'LABOUR') {
            const history = await prisma.attendance.findMany({
                where: { userId: session.user.id },
                orderBy: { date: 'desc' },
                take: 5
            })
            return NextResponse.json({ history })
        }

        return NextResponse.json({ error: "Forbidden" }, { status: 403 })

    } catch (error) {
        console.error("API Error (Dashboard):", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
