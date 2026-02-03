
'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getOwnerKPIs() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    // Parallel fetching
    const [labourPresent, fuelThisMonth, inventoryItems, openMaintenance] = await Promise.all([
        prisma.attendance.count({ where: { date: today, status: 'PRESENT' } }),
        prisma.fuelLog.aggregate({
            _sum: { liters: true },
            where: { createdAt: { gte: startOfMonth } }
        }),
        prisma.inventoryItem.findMany({
            select: { quantity: true, minLevel: true }
        }),
        prisma.maintenanceLog.count({ where: { actionTaken: 'Pending' } })
    ])

    const lowStockItems = inventoryItems.filter((item: { quantity: number; minLevel: number }) => item.quantity <= item.minLevel).length

    // Find highest cost machine (this month)
    const expensiveMachines = await prisma.maintenanceLog.groupBy({
        by: ['machineId'],
        _sum: { cost: true },
        where: { createdAt: { gte: startOfMonth } },
        orderBy: { _sum: { cost: 'desc' } },
        take: 1
    })

    let highestCostMachine = "N/A"
    if (expensiveMachines.length > 0) {
        const machine = await prisma.machine.findUnique({ where: { id: expensiveMachines[0].machineId } })
        highestCostMachine = machine?.name || "Unknown"
    }

    return {
        labourPresent,
        fuelThisMonth: fuelThisMonth._sum.liters || 0,
        lowStockItems,
        openMaintenance,
        highestCostMachine
    }
}

export async function getLabourStats() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return null

    const history = await prisma.attendance.findMany({
        where: { userId: session.user.id },
        orderBy: { date: 'desc' },
        take: 30
    })

    return { history }
}

export async function getManagementStats() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [todayTasks, pendingTasks, todayAttendance] = await Promise.all([
        prisma.task.count({ where: { createdAt: { gte: today } } }),
        prisma.task.count({ where: { status: 'PENDING' } }),
        prisma.attendance.count({ where: { date: today, status: 'PRESENT' } })
    ])

    return { todayTasks, pendingTasks, todayAttendance }
}
