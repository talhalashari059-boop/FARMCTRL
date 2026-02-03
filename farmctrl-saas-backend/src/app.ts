
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './api/auth.api';
import staffRoutes from './api/staff.api';
import machineryRoutes from './api/machinery.api';
import opsRoutes from './api/ops.api';
import adminRoutes from './api/admin.api';
import supportRoutes from './api/support.api';
import pivotRoutes from './api/pivot.api';
import ticketRoutes from './api/ticket.api';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/machinery', machineryRoutes);
app.use('/api/ops', opsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/pivots', pivotRoutes);
app.use('/api/tickets', ticketRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({ message: 'FARMCTRL SaaS API v1.0.0' });
});

export default app;
