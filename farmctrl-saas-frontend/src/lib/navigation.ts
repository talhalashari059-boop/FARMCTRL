
import {
    LayoutDashboard,
    Users,
    Tractor,
    Droplets,
    Fuel,
    ClipboardCheck,
    Package,
    Ticket,
    Wrench,
    Calculator,
    UserCircle
} from 'lucide-react';
import { Role } from '@/lib/api';

export interface NavItem {
    title: string;
    href: string;
    icon: any;
    roles: Role[];
}

export const NAV_ITEMS: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        roles: ['OWNER', 'GM_OPERATIONS', 'FARM_MANAGER', 'BOOKKEEPER', 'SUPERVISOR', 'LABOUR']
    },
    {
        title: 'Staff Management',
        href: '/dashboard/staff',
        icon: Users,
        roles: ['OWNER', 'GM_OPERATIONS', 'FARM_MANAGER', 'BOOKKEEPER']
    },
    {
        title: 'Attendance',
        href: '/dashboard/attendance',
        icon: ClipboardCheck,
        roles: ['GM_OPERATIONS', 'FARM_MANAGER', 'SUPERVISOR', 'BOOKKEEPER']
    },
    {
        title: 'Machinery',
        href: '/dashboard/machinery',
        icon: Tractor,
        roles: ['OWNER', 'GM_OPERATIONS', 'FARM_MANAGER', 'SUPERVISOR']
    },
    {
        title: 'Pivot Controls',
        href: '/dashboard/pivots',
        icon: Droplets,
        roles: ['OWNER', 'GM_OPERATIONS', 'FARM_MANAGER', 'SUPERVISOR']
    },
    {
        title: 'Fuel Logs',
        href: '/dashboard/fuel',
        icon: Fuel,
        roles: ['OWNER', 'GM_OPERATIONS', 'FARM_MANAGER']
    },
    {
        title: 'Inventory',
        href: '/dashboard/inventory',
        icon: Package,
        roles: ['GM_OPERATIONS', 'FARM_MANAGER', 'SUPERVISOR']
    },
    {
        title: 'Maintenance',
        href: '/dashboard/maintenance',
        icon: Wrench,
        roles: ['GM_OPERATIONS', 'FARM_MANAGER']
    },
    {
        title: 'Payroll',
        href: '/dashboard/payroll',
        icon: Calculator,
        roles: ['OWNER', 'BOOKKEEPER']
    },
    {
        title: 'Tickets',
        href: '/dashboard/tickets',
        icon: Ticket,
        roles: ['GM_OPERATIONS', 'FARM_MANAGER', 'SUPERVISOR', 'LABOUR']
    }
];
