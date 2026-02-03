
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    try {
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                assignedTo: { select: { name: true } },
                createdBy: { select: { name: true } }
            }
        })
        return NextResponse.json(tasks)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    try {
        const body = await req.json()
        const { title, description, assignedToUserId, taskId, status } = body

        if (taskId && status === 'COMPLETED') {
            await prisma.task.update({
                where: { id: taskId },
                data: { status: 'COMPLETED', completedAt: new Date() }
            })
            return NextResponse.json({ success: true })
        }

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                assignedToUserId,
                createdByUserId: session.user.id,
                status: 'PENDING'
            }
        })
        return NextResponse.json(newTask)

    } catch (error) {
        console.error("API Error (Tasks):", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
