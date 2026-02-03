
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getMachines() {
    return await prisma.machine.findMany({
        where: { status: 'ACTIVE' }
    })
}

export async function logFuel(data: { machineId: string, liters: number, purpose: string, issuedToUserId?: string }) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        await prisma.fuelLog.create({
            data: {
                machineId: data.machineId,
                liters: data.liters,
                purpose: data.purpose,
                issuedToUserId: data.issuedToUserId,
                issuedByUserId: session.user.id
            }
        })
        revalidatePath('/management/fuel')
        revalidatePath('/owner') // Update KPIs
        return { success: true }
    } catch (error) {
        console.error("Failed to log fuel:", error)
        return { success: false, error: "Failed to log fuel" }
    }
}

export async function getRecentFuelLogs() {
    return await prisma.fuelLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
            machine: true,
            issuedBy: { select: { name: true } },
            issuedTo: { select: { name: true } }
        }
    })
}
