
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';

export const getAllTickets = async (req: AuthRequest, res: Response) => {
    const { farmId } = req.user!;
    try {
        const tickets = await prisma.ticket.findMany({
            where: { farmId: farmId as string },
            orderBy: { createdAt: 'desc' }
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tickets' });
    }
};

export const createTicket = async (req: AuthRequest, res: Response) => {
    const { title, description, priority } = req.body;
    const { farmId, id: userId } = req.user!;
    try {
        const ticket = await prisma.ticket.create({
            data: {
                title,
                description,
                priority: priority || 'NORMAL',
                status: 'OPEN',
                farmId: farmId as string,
                raisedById: userId
            }
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create ticket' });
    }
};

export const updateTicket = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status, priority, resolutionNotes } = req.body;
    try {
        const ticket = await prisma.ticket.update({
            where: { id: id as string },
            data: {
                status,
                priority,
                resolutionNotes
            }
        });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update ticket' });
    }
};
