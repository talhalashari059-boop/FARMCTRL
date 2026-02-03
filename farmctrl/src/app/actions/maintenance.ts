
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function logMaintenance(data: { machineId: string, issue: string, actionTaken: string, cost?: number }) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        await prisma.maintenanceLog.create({
            data: {
                machineId: data.machineId,
                issue: data.issue,
                actionTaken: data.actionTaken,
                cost: data.cost,
                reportedByUserId: session.user.id
            }
        })

        // Update machine status if needed, or just leave it. 
        // Requirement says "Pivot registry... Maintenance issue logging".

        revalidatePath('/management/maintenance')
        revalidatePath('/owner') // Important for costs
        return { success: true }
    } catch (error) {
        console.error("Failed to log maintenance:", error)
        return { success: false, error: "Failed to log maintenance" }
    }
}

export async function getMaintenanceLogs() {
    return await prisma.maintenanceLog.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            machine: true,
            reportedBy: { select: { name: true } }
        }
    })
}
