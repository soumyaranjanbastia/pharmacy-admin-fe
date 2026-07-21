import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  Tags,
  Users,
  CreditCard,
  BarChart2,
  ShieldCheck,
  Settings,
  Store
} from 'lucide-react';

export const navConfig = [
  {
    translationKey: 'sidebar.dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['super_admin', 'admin', 'pharmacist'],
  },
  {
    translationKey: 'sidebar.branch',
    path: '/branch-management',
    icon: Store,
    roles: ['super_admin', 'admin'],
  },
  {
    translationKey: 'sidebar.pos_sale',
    path: '/pos',
    icon: ShoppingCart,
    roles: ['super_admin', 'pharmacist', 'cashier'],
  },
  {
    translationKey: 'sidebar.inventory',
    path: '/inventory',
    icon: Package,
    roles: ['super_admin', 'admin', 'pharmacist'],
  },
  {
    translationKey: 'sidebar.delivery',
    path: '/delivery',
    icon: Truck,
    roles: ['super_admin', 'admin', 'delivery_person'],
  },
  {
    translationKey: 'sidebar.discount_referral',
    path: '/discount',
    icon: Tags,
    roles: ['super_admin', 'admin'],
  },
  {
    translationKey: 'sidebar.user_mgmt',
    path: '/users',
    icon: Users,
    roles: ['super_admin', 'admin'],
  },
  {
    translationKey: 'sidebar.payments_revenue',
    path: '/payments',
    icon: CreditCard,
    roles: ['super_admin', 'admin', 'accountant'],
  },
  {
    translationKey: 'sidebar.reports',
    path: '/reports',
    icon: BarChart2,
    roles: ['super_admin', 'admin'],
  },
  {
    translationKey: 'sidebar.compliance',
    path: '/compliance',
    icon: ShieldCheck,
    roles: ['super_admin', 'admin'],
  }
];

export const bottomNavConfig = [
  {
    translationKey: 'sidebar.settings',
    path: '/settings',
    icon: Settings,
    roles: ['super_admin', 'admin'],
  }
];
