
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';

/**
 * Marks attendance for a staff member.
 */
export const markAttendance = async (req: AuthRequest, res: Response) => {
    const { staffProfileId, date, isPresent, lat, lng } = req.body;
    const { farmId } = req.user!;

    try {
        const attendance = await prisma.attendance.create({
            data: {
                farmId: farmId as string,
                staffProfileId,
                date: new Date(date),
                isPresent,
                lat,
                lng,
                markedBy: req.user!.id
            }
        });
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Failed to mark attendance' });
    }
};

/**
 * Submits a leave request.
 */
export const submitLeaveRequest = async (req: AuthRequest, res: Response) => {
    const { startDate, endDate, reason } = req.body;

    // Find staff profile for the logged in user
    try {
        const profile = await prisma.staffProfile.findUnique({
            where: { userId: req.user!.id }
        });

        if (!profile) return res.status(404).json({ message: 'Staff profile not found' });

        const request = await prisma.leaveRequest.create({
            data: {
                staffProfileId: profile.id,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                reason,
                status: 'PENDING'
            }
        });
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit leave request' });
    }
};

/**
 * Approve or Reject a leave request.
 */
export const reviewLeaveRequest = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body; // APPROVED or REJECTED

    try {
        const request = await prisma.leaveRequest.update({
            where: { id: id as string },
            data: {
                status,
                approvedBy: req.user!.id
            }
        });
        res.json(request);
    } catch (error) {
        res.status(500).json({ message: 'Failed to review leave request' });
    }
};

/**
 * Create a new task.
 */
export const createTask = async (req: AuthRequest, res: Response) => {
    const { title, description, assignedToId, pivotId, machineryId } = req.body;
    const { farmId } = req.user!;

    try {
        const task = await prisma.task.create({
            data: {
                farmId: farmId as string,
                title,
                description,
                assignedToId,
                pivotId,
                machineryId,
                createdBy: req.user!.id
            }
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task' });
    }
};

/**
 * Update task progress.
 */
export const updateTask = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status, progress } = req.body;

    try {
        const task = await prisma.task.update({
            where: { id: id as string },
            data: {
                status: status || 'IN_PROGRESS',
                progress
            }
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
    }
};
/**
 * Get attendance logs for a farm.
 */
export const getAttendance = async (req: AuthRequest, res: Response) => {
    const { farmId } = req.user!;
    try {
        const attendance = await prisma.attendance.findMany({
            where: { farmId: farmId as string },
            include: { staffProfile: true },
            orderBy: { date: 'desc' }
        });
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch attendance' });
    }
};

/**
 * Get leave requests for a farm.
 */
export const getLeaveRequests = async (req: AuthRequest, res: Response) => {
    const { farmId } = req.user!;
    try {
        const requests = await prisma.leaveRequest.findMany({
            where: { staffProfile: { userId: { not: undefined }, user: { farmId: farmId as string } } },
            include: { staffProfile: { include: { user: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch leave requests' });
    }
};
