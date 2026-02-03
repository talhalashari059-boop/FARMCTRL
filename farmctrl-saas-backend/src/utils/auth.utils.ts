
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export const generateAccessToken = (payload: { id: string, username: string, role: Role, farmId: string | null }) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN || '15m') as any
    });
};

export const generateRefreshToken = (payload: { id: string }) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d') as any
    });
};
