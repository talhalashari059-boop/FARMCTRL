
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.inventoryItem.createMany({
        data: [
            { name: 'DAP Fertilizer', category: 'FERTILIZER', quantity: 50, unit: 'BAG', minLevel: 10 },
            { name: 'Urea', category: 'FERTILIZER', quantity: 100, unit: 'BAG', minLevel: 20 },
            { name: 'Rhodes Grass Seed', category: 'SEED', quantity: 200, unit: 'KG', minLevel: 50 },
            { name: 'Diesel', category: 'CHEMICAL', quantity: 1000, unit: 'LITRE', minLevel: 200 },
        ]
    })
    console.log('Inventory seeded')
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
