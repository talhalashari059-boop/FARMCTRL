
import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../lib/prisma';
import { Role, EmploymentStatus } from '@prisma/client';
import { hashPassword } from '../utils/auth.utils';

/**
 * Creates a new user and a linked Staff Profile.
 */
export const createStaff = async (req: AuthRequest, res: Response) => {
    const {
        username, password, name, role, farmId,
        jobTitle, department, employmentType, dateOfJoining,
        dailyWage, monthlySalary, contactNumber, cnic
    } = req.body;

    try {
        const hashedPassword = await hashPassword(password);

        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    name,
                    role,
                    farmId,
                    staffProfile: {
                        create: {
                            jobTitle,
                            department,
                            employmentType,
                            dateOfJoining: new Date(dateOfJoining),
                            dailyWage,
                            monthlySalary,
                            contactNumber,
                            cnic,
                        }
                    }
                },
                include: { staffProfile: true }
            });

            // Create Audit Log
            await tx.auditLog.create({
                data: {
                    userId: req.user!.id,
                    action: 'CREATE',
                    entity: 'User/StaffProfile',
                    entityId: user.id,
                    newValue: { role, jobTitle, department } as any
                }
            });

            return user;
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Create staff error:', error);
        res.status(500).json({ message: 'Failed to create staff' });
    }
};

/**
 * Gets all staff for a farm with field-level filtering.
 */
export const getAllStaff = async (req: AuthRequest, res: Response) => {
    const { farmId } = req.user!;

    try {
        const staff = await prisma.user.findMany({
            where: { farmId },
            include: { staffProfile: true },
            orderBy: { name: 'asc' }
        });

        // Field-level filtering based on roles
        const filtered = staff.map((u: any) => {
            const profile = u.staffProfile;

            // Default: Minimal Profile
            const base = {
                id: u.id,
                name: u.name,
                role: u.role,
                jobTitle: profile?.jobTitle,
                department: profile?.department,
                status: profile?.status
            };

            // Owner sees summary only
            if (req.user!.role === Role.OWNER) {
                return base;
            }

            // Bookkeeper sees payroll related fields
            if (req.user!.role === Role.BOOKKEEPER) {
                return {
                    ...base,
                    employmentType: profile?.employmentType,
                    dailyWage: profile?.dailyWage,
                    monthlySalary: profile?.monthlySalary
                };
            }

            // Management sees everything
            return {
                ...u,
                staffProfile: {
                    ...profile,
                    cnic: '********' // Always mask sensitive data link CNIC if needed
                }
            };
        });

        res.json(filtered);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch staff' });
    }
};

/**
 * Gets a single staff profile.
 * Labour can only see their own.
 */
export const getStaffProfile = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { id: loggedUserId, role } = req.user!;

    try {
        if (role === Role.LABOUR && id !== loggedUserId) {
            return res.status(403).json({ message: 'Forbidden: You can only view your own profile' });
        }

        const staff = await prisma.user.findUnique({
            where: { id: id as string },
            include: {
                staffProfile: {
                    include: {
                        machineryAssignments: { where: { endTime: null }, include: { machinery: true } }
                    }
                }
            }
        });

        if (!staff) return res.status(404).json({ message: 'Staff not found' });

        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
};

/**
 * Updates staff info and logs changes.
 */
export const updateStaff = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {
            const oldUser = await tx.user.findUnique({
                where: { id: id as string },
                include: { staffProfile: true }
            });

            if (!oldUser) throw new Error('Staff not found');

            const updated = await tx.user.update({
                where: { id: id as string },
                data: {
                    role: updateData.role,
                    staffProfile: {
                        update: {
                            jobTitle: updateData.jobTitle,
                            department: updateData.department,
                            status: updateData.status,
                            dailyWage: updateData.dailyWage,
                            monthlySalary: updateData.monthlySalary
                        }
                    }
                },
                include: { staffProfile: true }
            });

            // Log change
            await tx.auditLog.create({
                data: {
                    userId: req.user!.id,
                    action: 'UPDATE',
                    entity: 'User/StaffProfile',
                    entityId: id as string,
                    oldValue: oldUser as any,
                    newValue: updated as any
                }
            });

            return updated;
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Update failed' });
    }
};

/**
 * Soft deactivates a user.
 */
export const deactivateStaff = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.staffProfile.update({
            where: { userId: id as string },
            data: { status: EmploymentStatus.INACTIVE }
        });
        res.json({ message: 'Staff deactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Deactivation failed' });
    }
};
