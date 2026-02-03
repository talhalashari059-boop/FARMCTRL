
import { Router } from 'express';
import { getAllPivots, createPivot, updatePivotStatus } from '../controllers/pivot.controller';
import { authenticate, validateTenant } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, validateTenant, getAllPivots);
router.post('/', authenticate, validateTenant, createPivot);
router.patch('/:id/status', authenticate, validateTenant, updatePivotStatus);

export default router;
