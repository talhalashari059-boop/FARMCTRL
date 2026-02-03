
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';

/**
 * Add inventory or record transactions.
 */
export const manageInventory = async (req: AuthRequest, res: Response) => {
    const { name, category, quantity, unit, minStockLevel } = req.body;
    const { farmId } = req.user!;

    try {
        const item = await prisma.inventoryItem.upsert({
            where: { id: req.body.id || 'new' }, // Simplified
            update: { quantity: { increment: quantity } },
            create: { name, category, quantity, unit, minStockLevel, farmId: farmId as string }
        });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Inventory update failed' });
    }
};

/**
 * Log maintenance for machinery or pivots.
 */
export const logMaintenance = async (req: AuthRequest, res: Response) => {
    const { machineryId, pivotId, description, actionTaken, cost, technician, status } = req.body;
    const { farmId } = req.user!;

    try {
        const log = await prisma.maintenanceLog.create({
            data: {
                farmId: farmId as string, machineryId, pivotId, description, actionTaken, cost, technician,
                status: status || 'OPEN'
            }
        });
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Maintenance logging failed' });
    }
};

/**
 * Record a harvest.
 */
export const recordHarvest = async (req: AuthRequest, res: Response) => {
    const { pivotId, harvestDate, outputQuantity, outputUnit } = req.body;
    const { farmId } = req.user!;

    try {
        const record = await prisma.harvestRecord.create({
            data: {
                farmId: farmId as string, pivotId, harvestDate: new Date(harvestDate),
                outputQuantity, outputUnit
            }
        });
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ message: 'Harvest record failed' });
    }
};
