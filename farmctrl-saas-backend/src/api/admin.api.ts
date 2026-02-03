
import { Router } from 'express';
import { setupFarm, listAllFarms, getDashboardStats } from '../controllers/admin.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Dashboard Stats - Shared
router.get('/stats', authenticate, getDashboardStats);

// Platform level actions - Super Admin Only
router.post('/setup-farm', authenticate, authorize(['SUPER_ADMIN']), setupFarm);
router.get('/farms', authenticate, authorize(['SUPER_ADMIN']), listAllFarms);

export default router;
