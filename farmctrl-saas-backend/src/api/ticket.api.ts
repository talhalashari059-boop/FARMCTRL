
import { Router } from 'express';
import { getAllTickets, createTicket, updateTicket } from '../controllers/ticket.controller';
import { authenticate, validateTenant } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, validateTenant, getAllTickets);
router.post('/', authenticate, validateTenant, createTicket);
router.patch('/:id', authenticate, validateTenant, updateTicket);

export default router;
