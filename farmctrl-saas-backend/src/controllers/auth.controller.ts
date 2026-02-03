
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { comparePassword, generateAccessToken, generateRefreshToken } from '../utils/auth.utils';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
            include: { farm: true }
        });

        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken({
            id: user.id,
            username: user.username,
            role: user.role,
            farmId: user.farmId
        });

        const refreshToken = generateRefreshToken({ id: user.id });

        // Store refresh token in DB
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });

        res.json({
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name,
                farm: user.farm
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) return res.status(401).json({ message: 'Refresh token required' });

    try {
        const user = await prisma.user.findFirst({
            where: { refreshToken: token }
        });

        if (!user) return res.status(403).json({ message: 'Invalid refresh token' });

        const accessToken = generateAccessToken({
            id: user.id,
            username: user.username,
            role: user.role,
            farmId: user.farmId
        });

        res.json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

export const logout = async (req: Request, res: Response) => {
    const { id } = (req as any).user;

    try {
        await prisma.user.update({
            where: { id },
            data: { refreshToken: null }
        });
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Logout failed' });
    }
};
