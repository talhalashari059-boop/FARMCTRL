
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getTasks() {
    return await prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            assignedTo: { select: { name: true } },
            createdBy: { select: { name: true } }
        }
    })
}

export async function getAssignableUsers() {
    return await prisma.user.findMany({
        where: {
            role: { in: ['LABOUR', 'MANAGEMENT'] }
        },
        select: { id: true, name: true, role: true }
    })
}

export async function createTask(data: { title: string, description?: string, assignedToUserId?: string }) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        await prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                assignedToUserId: data.assignedToUserId,
                createdByUserId: session.user.id,
                status: 'PENDING'
            }
        })
        revalidatePath('/management/tasks')
        return { success: true }
    } catch (error) {
        console.error("Failed to create task:", error)
        return { success: false, error: "Failed to create task" }
    }
}

export async function completeTask(taskId: string) {
    try {
        await prisma.task.update({
            where: { id: taskId },
            data: { status: 'COMPLETED', completedAt: new Date() }
        })
        revalidatePath('/management/tasks')
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to complete task" }
    }
}
