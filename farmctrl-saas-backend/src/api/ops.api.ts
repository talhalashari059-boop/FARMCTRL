
import { Router } from 'express';
import {
    markAttendance,
    getAttendance,
    submitLeaveRequest,
    getLeaveRequests,
    reviewLeaveRequest,
    createTask,
    updateTask
} from '../controllers/ops.controller';
import { authenticate, authorize, validateTenant } from '../middlewares/auth.middleware';

const router = Router();

// Attendance: Supervisors and Managers
router.post('/attendance', authenticate, authorize(['SUPERVISOR', 'FARM_MANAGER']), validateTenant, markAttendance);
router.get('/attendance', authenticate, validateTenant, getAttendance);

// Leaves: Any staff can submit, only Management can review
router.post('/leaves', authenticate, submitLeaveRequest);
router.get('/leaves', authenticate, validateTenant, getLeaveRequests);
router.patch('/leaves/:id', authenticate, authorize(['GM_OPERATIONS', 'FARM_MANAGER']), validateTenant, reviewLeaveRequest);

// Tasks: Management creates, Supervisor/Staff updates
router.post('/tasks', authenticate, authorize(['GM_OPERATIONS', 'FARM_MANAGER']), validateTenant, createTask);
router.patch('/tasks/:id', authenticate, authorize(['SUPERVISOR', 'FARM_MANAGER', 'LABOUR']), validateTenant, updateTask);

export default router;
