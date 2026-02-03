
import { PrismaClient, Role, EmploymentType, EmploymentStatus, MachineryStatus, TaskStatus, MaintenanceStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// --- Helpers ---

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const DEPARTMENTS = ['Irrigation', 'Machinery', 'Store', 'Management', 'Field', 'Security'];
const FIRST_NAMES = ['Ali', 'Ahmed', 'Muhammad', 'Bilal', 'Usman', 'Hassan', 'Hussain', 'Omar', 'Fatima', 'Ayesha', 'Zainab', 'Maryam', 'Sana', 'Sadia'];
const LAST_NAMES = ['Khan', 'Butt', 'Jutt', 'Cheema', 'Warraich', 'Gondal', 'Raja', 'Sheikh', 'Malik', 'Qureshi'];
const JOB_TITLES = ['Field Worker', 'Tractor Driver', 'Supervisor', 'Guard', 'Store Keeper', 'Mechanic', 'Assistant'];

async function main() {
    console.log('🌱 Starting Data Seeding...');

    // Cleanup existing data (optional, be careful in prod)
    // await prisma.auditLog.deleteMany();
    // await prisma.usageLog.deleteMany();
    // await prisma.fuelLog.deleteMany();
    // await prisma.task.deleteMany();
    // await prisma.attendance.deleteMany();
    // await prisma.machinery.deleteMany();
    // await prisma.staffProfile.deleteMany();
    // await prisma.user.deleteMany();
    // await prisma.farm.deleteMany();

    const hashedPassword = await bcrypt.hash('admin123', 12);

    // 1. Create Farm
    const farm = await prisma.farm.create({
        data: {
            name: 'Green Acres Model Farm',
            location: 'Rahim Yar Khan, Punjab',
            totalAcres: 2500
        }
    });

    // 2. Create Users (Admin, Owner, Manager)
    const superAdmin = await prisma.user.upsert({
        where: { username: 'superadmin' },
        update: {},
        create: { username: 'superadmin', password: hashedPassword, name: 'System Admin', role: 'SUPER_ADMIN' }
    });

    const owner = await prisma.user.create({
        data: {
            username: 'owner',
            password: hashedPassword,
            name: 'Chaudhry Nawaz',
            role: 'OWNER',
            farmId: farm.id
        }
    });

    const manager = await prisma.user.create({
        data: {
            username: 'manager',
            password: hashedPassword,
            name: 'Rashid Minhas',
            role: 'FARM_MANAGER',
            farmId: farm.id,
            staffProfile: {
                create: {
                    jobTitle: 'Farm Manager', department: 'Management', employmentType: 'MONTHLY',
                    dateOfJoining: new Date('2023-01-15'), monthlySalary: 300000,
                    contactNumber: '+923001234567'
                }
            }
        }
    });

    console.log('✅ Base users created');

    // 3. Create Staff (30 profiles)
    const staffIds: string[] = [];

    for (let i = 0; i < 30; i++) {
        const fName = getRandomElement(FIRST_NAMES);
        const lName = getRandomElement(LAST_NAMES);
        const dept = getRandomElement(DEPARTMENTS);

        const profile = await prisma.staffProfile.create({
            data: {
                user: {
                    create: {
                        username: `staff${i}`,
                        password: hashedPassword,
                        name: `${fName} ${lName}`,
                        role: dept === 'Management' ? 'SUPERVISOR' : 'LABOUR',
                        farmId: farm.id
                    }
                },
                jobTitle: getRandomElement(JOB_TITLES),
                department: dept,
                employmentType: Math.random() > 0.3 ? 'MONTHLY' : 'DAILY_WAGE',
                dateOfJoining: addDays(new Date(), -getRandomInt(100, 1000)),
                monthlySalary: Math.random() > 0.3 ? getRandomInt(25000, 80000) : null,
                dailyWage: Math.random() <= 0.3 ? getRandomInt(1000, 2500) : null,
                status: 'ACTIVE'
            }
        });
        staffIds.push(profile.id);
    }
    console.log('✅ 30 Staff profiles created');

    // 4. Create Machinery
    const machineryData = [
        { type: 'Tractor', model: 'MF 385', plate: 'RYK-1122' },
        { type: 'Tractor', model: 'John Deere 5105', plate: 'RYK-8899' },
        { type: 'Tractor', model: 'Fiat 640', plate: 'RYK-7766' },
        { type: 'Harvester', model: 'Kubota DC-70', plate: 'HVT-001' },
        { type: 'Harvester', model: 'Claas Dominator', plate: 'HVT-002' },
        { type: 'Bulldozer', model: 'Cat D6', plate: 'BZR-99' },
        { type: 'Pickup', model: 'Toyota Hilux', plate: 'LEA-5544' },
    ];

    const machineryIds: string[] = [];
    for (const m of machineryData) {
        const machin = await prisma.machinery.create({
            data: {
                farmId: farm.id,
                type: m.type,
                model: m.model,
                plateNumber: m.plate,
                status: 'ACTIVE'
            }
        });
        machineryIds.push(machin.id);
    }
    console.log('✅ Machinery created');

    // 5. Create Pivots
    const pivots = [];
    for (let i = 1; i <= 8; i++) {
        const pivot = await prisma.pivot.create({
            data: {
                farmId: farm.id,
                code: `PVT-0${i}`,
                cropType: getRandomElement(['Rhodes Grass', 'Alfalfa', 'Maize', 'Wheat', 'Cotton']),
                status: 'ACTIVE'
            }
        });
        pivots.push(pivot);
    }
    console.log('✅ Pivots created');

    // 6. Create Attendance (Last 180 days)
    const startDate = addDays(new Date(), -180);
    const today = new Date();

    // Bulk create is not supported for updates/complex logic easily, so we loop days but batch inserts if possible.
    // For simplicity in seed, simple loop is fine.

    let attendanceCount = 0;
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        // Skip Sundays sometimes
        if (d.getDay() === 0) continue;

        for (const sId of staffIds) {
            // 90% attendance rate
            if (Math.random() > 0.1) {
                await prisma.attendance.create({
                    data: {
                        farmId: farm.id,
                        staffProfileId: sId,
                        date: new Date(d),
                        isPresent: true,
                        markedBy: manager.id
                    }
                });
                attendanceCount++;
            }
        }
    }
    console.log(`✅ ${attendanceCount} Attendance records created`);

    // 7. Inventory Items
    const items = await Promise.all([
        prisma.inventoryItem.create({ data: { farmId: farm.id, name: 'DAP Fertilizer', category: 'CONSUMABLES', unit: 'Bags', quantity: 500, minStockLevel: 50 } }),
        prisma.inventoryItem.create({ data: { farmId: farm.id, name: 'Urea', category: 'CONSUMABLES', unit: 'Bags', quantity: 800, minStockLevel: 100 } }),
        prisma.inventoryItem.create({ data: { farmId: farm.id, name: 'Diesel', category: 'FUEL', unit: 'Litres', quantity: 5000, minStockLevel: 1000 } }),
        prisma.inventoryItem.create({ data: { farmId: farm.id, name: 'Rhodes Seeds', category: 'SEEDS', unit: 'Kg', quantity: 200, minStockLevel: 20 } }),
        prisma.inventoryItem.create({ data: { farmId: farm.id, name: 'Engine Oil', category: 'SPARE_PARTS', unit: 'Litres', quantity: 50, minStockLevel: 10 } }),
    ]);

    // 8. Tasks & Fuel Logs (Distributed over time)
    let taskCount = 0;
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + getRandomInt(1, 3))) {
        // Create 1-3 tasks per calculated day
        const numTasks = getRandomInt(1, 3);

        for (let t = 0; t < numTasks; t++) {
            const statusVal = d < addDays(today, -7) ? 'COMPLETED' : getRandomElement(['PENDING', 'IN_PROGRESS', 'COMPLETED']);

            await prisma.task.create({
                data: {
                    farmId: farm.id,
                    title: `${getRandomElement(['Ploughing', 'Seeding', 'Harvesting', 'Fertilizer Application', 'Pivot Maintenance'])} - Field ${getRandomInt(1, 10)}`,
                    description: 'Routine operation',
                    status: statusVal as TaskStatus,
                    assignedToId: getRandomElement(staffIds),
                    pivotId: Math.random() > 0.5 ? getRandomElement(pivots).id : null,
                    machineryId: Math.random() > 0.5 ? getRandomElement(machineryIds) : null,
                    progress: statusVal === 'COMPLETED' ? 100 : getRandomInt(0, 80),
                    createdBy: manager.id,
                    createdAt: d,
                    updatedAt: d
                }
            });
            taskCount++;

            // Fuel Log maybe
            if (Math.random() > 0.6) {
                await prisma.fuelLog.create({
                    data: {
                        farmId: farm.id,
                        machineryId: getRandomElement(machineryIds),
                        issuedToId: getRandomElement(staffIds),
                        litres: getRandomInt(20, 150),
                        purpose: 'Field Operations',
                        issuedBy: manager.id,
                        createdAt: d
                    }
                });
            }
        }
    }
    console.log(`✅ ${taskCount} Tasks created`);

    // 9. Harvest Records
    for (const pivot of pivots) {
        // 3-4 harvests per pivot in last year
        for (let h = 0; h < getRandomInt(3, 5); h++) {
            await prisma.harvestRecord.create({
                data: {
                    farmId: farm.id,
                    pivotId: pivot.id,
                    harvestDate: addDays(today, -getRandomInt(20, 300)),
                    outputQuantity: getRandomInt(80, 150), // Bales
                    outputUnit: 'BALES'
                }
            });
        }
    }
    console.log('✅ Harvest records created');

    console.log('🚀 SEEDING COMPLETE! Ready for deployment.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
