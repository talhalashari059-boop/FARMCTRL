
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function getInventoryItems() {
    return await prisma.inventoryItem.findMany({
        orderBy: { name: 'asc' }
    })
}

export async function updateStock(data: { itemId: string, type: 'IN' | 'OUT', quantity: number, relatedTo?: string }) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" }
    }

    try {
        const item = await prisma.inventoryItem.findUnique({ where: { id: data.itemId } })
        if (!item) return { success: false, error: "Item not found" }

        const newQuantity = data.type === 'IN'
            ? item.quantity + data.quantity
            : item.quantity - data.quantity

        if (newQuantity < 0) {
            return { success: false, error: "Insufficient stock" }
        }

        // Transaction: Update Item + Create Log
        await prisma.$transaction([
            prisma.inventoryItem.update({
                where: { id: data.itemId },
                data: { quantity: newQuantity }
            }),
            prisma.inventoryTx.create({
                data: {
                    itemId: data.itemId,
                    type: data.type,
                    quantity: data.quantity,
                    relatedTo: data.relatedTo,
                    userId: session.user.id
                }
            })
        ])

        revalidatePath('/management/inventory')
        revalidatePath('/owner') // Alert owners
        return { success: true }
    } catch (error) {
        console.error("Failed to update stock:", error)
        return { success: false, error: "Failed to update stock" }
    }
}

export async function createItem(data: { name: string, category: string, unit: string, minLevel: number }) {
    try {
        await prisma.inventoryItem.create({
            data: data
        })
        revalidatePath('/management/inventory')
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to create item" }
    }
}
