
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await hash('1234', 12)

    // Create Owner
    const owner = await prisma.user.upsert({
        where: { id: 'owner-1' },
        update: {},
        create: {
            id: 'owner-1',
            name: 'Farm Owner',
            role: 'OWNER',
            password,
        },
    })

    // Create Manager
    const manager = await prisma.user.upsert({
        where: { id: 'manager-1' },
        update: {},
        create: {
            id: 'manager-1',
            name: 'Farm Manager',
            role: 'MANAGEMENT',
            password,
        },
    })

    // Create Labour
    const labour = await prisma.user.upsert({
        where: { id: 'labour-1' },
        update: {},
        create: {
            id: 'labour-1',
            name: 'Labour Worker',
            role: 'LABOUR',
            password, // Simple PIN for now
        },
    })

    console.log({ owner, manager, labour })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
