
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';

export const getAllPivots = async (req: AuthRequest, res: Response) => {
    const { farmId } = req.user!;
    try {
        const pivots = await prisma.pivot.findMany({
            where: { farmId: farmId as string }
        });
        res.json(pivots);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch pivots' });
    }
};

export const createPivot = async (req: AuthRequest, res: Response) => {
    const { code, cropType, farmId } = req.body;
    try {
        const pivot = await prisma.pivot.create({
            data: {
                code,
                cropType,
                farmId: farmId || req.user!.farmId
            }
        });
        res.status(201).json(pivot);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create pivot' });
    }
};

export const updatePivotStatus = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const pivot = await prisma.pivot.update({
            where: { id: id as string },
            data: { status }
        });
        res.json(pivot);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update pivot status' });
    }
};
