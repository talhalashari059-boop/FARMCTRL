
import { Router } from 'express';
import {
    manageInventory,
    logMaintenance,
    recordHarvest
} from '../controllers/inventory.controller';
import { authenticate, authorize, validateTenant } from '../middlewares/auth.middleware';

const router = Router();

const managerRoles = ['GM_OPERATIONS', 'FARM_MANAGER'];

router.post('/store', authenticate, authorize([...managerRoles, 'SUPERVISOR']), validateTenant, manageInventory);
router.post('/maintenance', authenticate, authorize(managerRoles), validateTenant, logMaintenance);
router.post('/harvest', authenticate, authorize([...managerRoles, 'SUPERVISOR']), validateTenant, recordHarvest);

export default router;
