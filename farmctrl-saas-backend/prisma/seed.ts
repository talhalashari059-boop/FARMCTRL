
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // 1. Create Super Admin
    const superAdmin = await prisma.user.upsert({
        where: { username: 'superadmin' },
        update: {},
        create: {
            username: 'superadmin',
            password: hashedPassword,
            name: 'Platform Admin',
            role: 'SUPER_ADMIN',
        }
    });

    console.log('✅ Super Admin created:', superAdmin.username);

    // 2. Create a Test Farm
    const farm = await prisma.farm.create({
        data: {
            name: 'Corporate Farm Alpha',
            location: 'Cholistan, Punjab',
            totalAcres: 1500
        }
    });

    console.log('✅ Test Farm created:', farm.name);

    // 3. Create a Farm Owner
    await prisma.user.create({
        data: {
            username: 'owner-alpha',
            password: hashedPassword,
            name: 'Chaudhry Sahab',
            role: 'OWNER',
            farmId: farm.id
        }
    });

    // 4. Create a GM (Management)
    const gm = await prisma.user.create({
        data: {
            username: 'gm-alpha',
            password: hashedPassword,
            name: 'Imran Khan GM',
            role: 'GM_OPERATIONS',
            farmId: farm.id,
            staffProfile: {
                create: {
                    jobTitle: 'Head of Operations',
                    department: 'Management',
                    employmentType: 'MONTHLY',
                    dateOfJoining: new Date(),
                    monthlySalary: 250000
                }
            }
        }
    });

    // 5. Create a Supervisor
    await prisma.user.create({
        data: {
            username: 'supervisor-1',
            password: hashedPassword,
            name: 'Supervisor Ali',
            role: 'SUPERVISOR',
            farmId: farm.id,
            staffProfile: {
                create: {
                    jobTitle: 'Field Supervisor',
                    department: 'Irrigation',
                    employmentType: 'MONTHLY',
                    dateOfJoining: new Date(),
                    monthlySalary: 65000
                }
            }
        }
    });

    // 6. Create some Machinery
    await prisma.machinery.createMany({
        data: [
            { farmId: farm.id, type: 'Tractor', model: 'John Deere 6120M', plateNumber: 'PK-ABC-123', status: 'ACTIVE' },
            { farmId: farm.id, type: 'Pivot', model: 'Valley 8000 Series', plateNumber: 'PIVOT-01', status: 'ACTIVE' },
            { farmId: farm.id, type: 'Harvester', model: 'Claas Lexion', plateNumber: 'PK-HVT-786', status: 'MAINTENANCE' }
        ]
    });

    console.log('✅ Demo data seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
