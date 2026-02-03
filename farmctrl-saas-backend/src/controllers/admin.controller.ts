
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';
import { hashPassword } from '../utils/auth.utils';

/**
 * Creates a new Farm and its first Management User.
 * Strictly Super Admin only.
 */
export const setupFarm = async (req: AuthRequest, res: Response) => {
    const { farmName, adminUsername, adminPassword, adminName } = req.body;

    try {
        const result = await prisma.$transaction(async (tx: any) => {
            // 1. Create the Farm
            const farm = await tx.farm.create({
                data: {
                    name: farmName
                }
            });

            // 2. Create the Initial Admin User
            const hashedPassword = await hashPassword(adminPassword);
            const user = await tx.user.create({
                data: {
                    username: adminUsername,
                    password: hashedPassword,
                    name: adminName,
                    role: 'GM_OPERATIONS',
                    farmId: farm.id
                }
            });

            return { farm, user };
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Setup farm error:', error);
        res.status(500).json({ message: 'Failed to setup farm' });
    }
};

/**
 * Lists all farms (Super Admin view).
 */
export const listAllFarms = async (req: AuthRequest, res: Response) => {
    try {
        const farms = await prisma.farm.findMany({
            include: {
                _count: { select: { users: true } }
            }
        });
        res.json(farms);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch farms' });
    }
};
/**
 * Get aggregated stats for the dashboard based on role.
 */
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
    const { farmId, role } = req.user!;

    try {
        if (role === 'SUPER_ADMIN') {
            const farmsCount = await prisma.farm.count();
            const usersCount = await prisma.user.count();
            return res.json({
                totalFarms: farmsCount,
                totalUsers: usersCount,
                activeUsers: usersCount // Simplified for now
            });
        }

        // Farm specific stats
        const [staffCount, machineryCount, pivotCount, fuelSum] = await Promise.all([
            prisma.user.count({ where: { farmId: farmId as string } }),
            prisma.machinery.count({ where: { farmId: farmId as string } }),
            prisma.pivot.count({ where: { farmId: farmId as string } }),
            prisma.fuelLog.aggregate({
                where: { farmId: farmId as string },
                _sum: { litres: true }
            })
        ]);

        const activeMachinery = await prisma.machinery.count({
            where: { farmId: farmId as string, status: 'ACTIVE' }
        });

        res.json({
            staffCount,
            machineryCount,
            activeMachinery,
            pivotCount,
            fuelUsage: fuelSum._sum.litres || 0,
            recentTasks: await prisma.task.findMany({
                where: { farmId: farmId as string },
                orderBy: { updatedAt: 'desc' },
                take: 5
            })
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dashboard stats' });
    }
};
