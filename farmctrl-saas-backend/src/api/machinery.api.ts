
import { Router } from 'express';
import {
    registerMachinery,
    getAllMachinery,
    assignMachinery,
    logUsage,
    issueFuel,
    getFuelLogs
} from '../controllers/machinery.controller';
import { authenticate, authorize, validateTenant } from '../middlewares/auth.middleware';

const router = Router();

// Only Management roles can register or assign machinery
const managementRoles = ['GM_OPERATIONS', 'FARM_MANAGER'];
const allOperationalRoles = ['GM_OPERATIONS', 'FARM_MANAGER', 'SUPERVISOR', 'OWNER'];

router.post('/', authenticate, authorize(managementRoles), validateTenant, registerMachinery);
router.get('/', authenticate, authorize(allOperationalRoles), validateTenant, getAllMachinery);
router.get('/all', authenticate, authorize(allOperationalRoles), validateTenant, getAllMachinery);
router.post('/assign', authenticate, authorize(managementRoles), validateTenant, assignMachinery);
router.post('/log-usage', authenticate, authorize(['SUPERVISOR', 'FARM_MANAGER']), validateTenant, logUsage);
router.post('/issue-fuel', authenticate, authorize(['FARM_MANAGER']), validateTenant, issueFuel);
router.get('/fuel/logs', authenticate, validateTenant, getFuelLogs);

export default router;
