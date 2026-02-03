
# FARMCTRL SaaS Backend

Production-ready operations control platform for corporate agriculture farms in Pakistan. Built for accountability, auditability, and scale.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database

### Setup
1. **Clone & Install**
   ```bash
   cd farmctrl-saas-backend
   npm install
   ```

2. **Environment Variables**
   ```bash
   cp .env.example .env
   # Update DATABASE_URL with your PostgreSQL credentials
   ```

3. **Database Migration & Seeding**
   ```bash
   npx prisma generate
   npx prisma db push
   # Seed the Super Admin and test farm
   npx ts-node prisma/seed.ts
   ```

4. **Run Server**
   ```bash
   npm run dev
   ```

## 🔒 Authentication Flow
1. **Login**: `POST /api/auth/login` returns `accessToken` and `refreshToken`.
2. **Authorization**: Include `Bearer <accessToken>` in the `Authorization` header.
3. **Refresh**: `POST /api/auth/refresh` using the `refreshToken` when the access token expires.

## 👥 Role Based Access Control (RBAC)
- **SUPER_ADMIN**: Platform initialization (Farms/Admins).
- **OWNER**: View-only operational dashboards.
- **GM_OPERATIONS**: Approval authority & strategy.
- **FARM_MANAGER**: Execution, logs, and basic administration.
- **BOOKKEEPER**: Payroll & HR restricted access.
- **SUPERVISOR**: Daily logging (Attendance, Machinery, Tasks).
- **LABOUR**: View assignments & personal records.

## 🧱 Module Endpoints
| Component | Route Prefix | Primary Roles |
| :--- | :--- | :--- |
| **Auth** | `/api/auth` | All |
| **Farms/Global** | `/api/admin` | Super Admin |
| **Staff/Lifecycle**| `/api/staff` | Management |
| **Machinery** | `/api/machinery` | Management / Supervisor |
| **Field Ops** | `/api/ops` | Supervisor / Manager |
| **Inventory/Maint**| `/api/support` | Manager / Supervisor |

## 🏗️ Architecture Notes
- **Multi-tenancy**: Every transaction is isolated via `farmId`.
- **Audit Logs**: Every sensitive change (role updates, machinery assignments) is logged in the `AuditLog` table.
- **Scalability**: Express + Prisma + PostgreSQL provides a rock-solid foundation for thousands of acres and users.
