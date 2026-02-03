
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.machine.createMany({
        data: [
            { name: 'Tractor 480', type: 'TRACTOR', status: 'ACTIVE' },
            { name: 'Pivot 1 (North)', type: 'PIVOT', status: 'ACTIVE' },
            { name: 'Generator 50kVA', type: 'GENERATOR', status: 'ACTIVE' },
            { name: 'Baler Case', type: 'BALER', status: 'ACTIVE' },
        ]
    })
    console.log('Machines seeded')
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
