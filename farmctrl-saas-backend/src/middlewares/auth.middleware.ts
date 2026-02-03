
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        username: string;
        role: string;
        farmId: string | null;
    };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as any;
        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
            farmId: decoded.farmId
        };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

/**
 * RBAC Middleware
 * Allows access if the user's role is in the allowed roles list.
 */
export const authorize = (allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        next();
    };
};

/**
 * Multi-tenant Isolation Middleware
 * Ensures that for non-Super Admins, the farmId in the query/body matches the user's farmId.
 * Or strictly enforces isolation at the service level (preferred).
 */
export const validateTenant = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    // Super Admins can skip this
    if (req.user.role === 'SUPER_ADMIN') {
        return next();
    }

    // Capture farmId from params, query, or body
    const farmId = req.params.farmId || req.query.farmId || req.body.farmId;

    if (farmId && farmId !== req.user.farmId) {
        return res.status(403).json({ message: 'Access Denied: Cross-tenant data access detected' });
    }

    next();
};
