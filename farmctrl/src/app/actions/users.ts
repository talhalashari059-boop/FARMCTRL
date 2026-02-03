
'use server'

import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function createUser(data: { id: string, name: string, role: string, pin: string, dailyWage?: number }) {
    const session = await getServerSession(authOptions)

    if (!session || !['OWNER', 'MANAGEMENT'].includes((session.user as any).role)) {
        return { success: false, error: "Unauthorized" }
    }

    const creatorRole = (session.user as any).role

    // Security check: Managers can ONLY create LABOUR
    if (creatorRole === 'MANAGEMENT' && data.role !== 'LABOUR') {
        return { success: false, error: "Managers can only add Labour personnel." }
    }

    try {
        const existing = await prisma.user.findUnique({
            where: { id: data.id }
        })

        if (existing) {
            return { success: false, error: "User ID already exists." }
        }

        const hashedPassword = await hash(data.pin, 12)

        await prisma.user.create({
            data: {
                id: data.id,
                name: data.name,
                role: data.role,
                password: hashedPassword,
                dailyWage: data.dailyWage
            } as any
        })

        revalidatePath('/owner/users')
        revalidatePath('/management/staff')
        return { success: true }
    } catch (error) {
        console.error("Failed to create user:", error)
        return { success: false, error: "Failed to create user." }
    }
}

export async function updateWage(userId: string, newWage: number) {
    const session = await getServerSession(authOptions)
    if (!session) return { success: false, error: "Unauthorized" }

    const adminRole = (session.user as any).role

    try {
        const targetUser = await prisma.user.findUnique({ where: { id: userId } })
        if (!targetUser) return { success: false, error: "User not found" }

        // Owner can update anyone. Manager can only update LABOUR
        if (adminRole === 'MANAGEMENT' && targetUser.role !== 'LABOUR') {
            return { success: false, error: "Managers can only set wages for Labour." }
        }

        await prisma.user.update({
            where: { id: userId },
            data: { dailyWage: newWage } as any
        })

        revalidatePath('/owner/users')
        revalidatePath('/management/staff')
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to update wage" }
    }
}

export async function getUsers() {
    const session = await getServerSession(authOptions)
    if (!session) return []

    const role = (session.user as any).role

    // Owner sees everyone. Manager sees only Labour.
    const where = role === 'OWNER' ? {} : { role: 'LABOUR' }

    return await prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            role: true,
            dailyWage: true,
            createdAt: true
        }
    })
}

