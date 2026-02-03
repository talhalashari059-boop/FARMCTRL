
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    try {
        const items = await prisma.inventoryItem.findMany({
            orderBy: { name: 'asc' }
        })
        return NextResponse.json(items)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    try {
        const body = await req.json()
        const { type, itemId, quantity, name, category, unit, minLevel } = body

        if (type === 'CREATE') {
            const newItem = await prisma.inventoryItem.create({
                data: { name, category, quantity, unit, minLevel }
            })
            return NextResponse.json(newItem)
        }

        if (type === 'TRANSACTION') {
            await prisma.$transaction([
                prisma.inventoryItem.update({
                    where: { id: itemId },
                    data: {
                        quantity: {
                            increment: body.txType === 'IN' ? quantity : -quantity
                        }
                    }
                }),
                prisma.inventoryTx.create({
                    data: {
                        itemId,
                        type: body.txType,
                        quantity,
                        userId: session.user.id,
                        relatedTo: body.relatedTo
                    }
                })
            ])
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: "Invalid operation" }, { status: 400 })

    } catch (error) {
        console.error("API Error (Inventory):", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
