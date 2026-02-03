
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';

/**
 * Register new machinery for a farm.
 */
export const registerMachinery = async (req: AuthRequest, res: Response) => {
    const { type, model, plateNumber, farmId } = req.body;

    try {
        const machinery = await prisma.machinery.create({
            data: {
                type,
                model,
                plateNumber,
                farmId
            }
        });
        res.status(201).json(machinery);
    } catch (error) {
        res.status(500).json({ message: 'Failed to register machinery' });
    }
};

/**
 * Get all machinery for a farm.
 */
export const getAllMachinery = async (req: AuthRequest, res: Response) => {
    const { farmId } = req.user!;

    try {
        const machinery = await prisma.machinery.findMany({
            where: { farmId: farmId as string },
            include: {
                assignments: { where: { endTime: null }, include: { staffProfile: true } }
            }
        });
        res.json(machinery);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch machinery' });
    }
};

/**
 * Assign machinery to a staff member.
 * Supports primary and temporary assignments.
 */
export const assignMachinery = async (req: AuthRequest, res: Response) => {
    const { machineryId, staffProfileId, isPrimary, notes } = req.body;

    try {
        const result = await prisma.$transaction(async (tx: any) => {
            // End previous assignments if this is a primary assignment
            if (isPrimary) {
                await tx.machineryAssignment.updateMany({
                    where: { machineryId, endTime: null },
                    data: { endTime: new Date() }
                });
            }

            const assignment = await tx.machineryAssignment.create({
                data: {
                    machineryId,
                    staffProfileId,
                    isPrimary,
                    notes
                }
            });

            return assignment;
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Assignment failed' });
    }
};

/**
 * Log machinery usage.
 */
export const logUsage = async (req: AuthRequest, res: Response) => {
    const { machineryId, hoursLogged, purpose, startTime, endTime, taskId } = req.body;

    try {
        const log = await prisma.usageLog.create({
            data: {
                machineryId,
                userId: req.user!.id,
                hoursLogged,
                purpose,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                taskId
            }
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Usage logging failed' });
    }
};

/**
 * Issue Fuel to a machine/person.
 */
export const issueFuel = async (req: AuthRequest, res: Response) => {
    const { machineryId, issuedToId, litres, purpose, farmId } = req.body;

    try {
        const fuelLog = await prisma.fuelLog.create({
            data: {
                machineryId,
                issuedToId,
                litres,
                purpose,
                farmId: farmId as string,
                issuedBy: req.user!.id
            }
        });
        res.status(201).json(fuelLog);
    } catch (error) {
        res.status(500).json({ message: 'Fuel issuance failed' });
    }
};
/**
 * Get all fuel logs for a farm.
 */
export const getFuelLogs = async (req: AuthRequest, res: Response) => {
    const { farmId } = req.user!;
    try {
        const logs = await prisma.fuelLog.findMany({
            where: { farmId: farmId as string },
            include: { machinery: true, issuedTo: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch fuel logs' });
    }
};
