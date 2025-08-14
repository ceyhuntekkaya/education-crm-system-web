import { ROLES } from "@/types/roles";

// Tüm route href'leri
export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT_US: "/about-us",
  CONTACT: "/contact",
  
  // Auth routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  
  // Protected routes
  DASHBOARD: {
    HOME: "/dashboard",
    ADMIN: "/dashboard/admin",
    INSTITUTION: "/dashboard/institution",
    USER: "/dashboard/user",
  },
  
  // Special routes
  UNAUTHORIZED: "/unauthorized",
} as const;

// Dashboard menü öğesi tanımı
export interface DashboardMenuItem {
  href: string;
  label: string;
  icon: string;
  allowedRoles: ROLES[];
}

// Dashboard menü öğeleri
export const DashboardRoutes: DashboardMenuItem[] = [
  {
    href: ROUTES.DASHBOARD.HOME,
    label: "Ana Sayfa",
    icon: "🏠",
    allowedRoles: [ROLES.ADMIN, ROLES.INSTITUTION, ROLES.USER],
  },
  {
    href: ROUTES.DASHBOARD.ADMIN,
    label: "Admin Paneli",
    icon: "🔧",
    allowedRoles: [ROLES.ADMIN],
  },
  {
    href: ROUTES.DASHBOARD.INSTITUTION,
    label: "Kurum Paneli",
    icon: "🏢",
    allowedRoles: [ROLES.ADMIN, ROLES.INSTITUTION],
  },
  {
    href: ROUTES.DASHBOARD.USER,
    label: "Kullanıcı Paneli",
    icon: "👤",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
  },
];

// Dashboard route'larını kullanıcının rolüne göre filtreleyen fonksiyon
export const getDashboardRoutes = (userRole: ROLES): DashboardMenuItem[] => {
  return DashboardRoutes.filter((item) =>
    item.allowedRoles.includes(userRole)
  );
};

