
import { Router } from 'express';
import {
    createStaff,
    getAllStaff,
    getStaffProfile,
    updateStaff,
    deactivateStaff
} from '../controllers/staff.controller';
import { authenticate, authorize, validateTenant } from '../middlewares/auth.middleware';

const router = Router();

// Only Management roles can create or deactivate staff
const managementRoles = ['GM_OPERATIONS', 'FARM_MANAGER'];
const allManagementRoles = ['GM_OPERATIONS', 'FARM_MANAGER', 'BOOKKEEPER', 'OWNER'];

router.post('/', authenticate, authorize(managementRoles), validateTenant, createStaff);
router.get('/', authenticate, authorize(allManagementRoles), validateTenant, getAllStaff);
router.get('/:id', authenticate, validateTenant, getStaffProfile);
router.patch('/:id', authenticate, authorize(managementRoles), validateTenant, updateStaff);
router.delete('/:id', authenticate, authorize(managementRoles), validateTenant, deactivateStaff);

export default router;
