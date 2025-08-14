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
    ADMIN: {
      HOME: "/dashboard/admin",
      USERS: "/dashboard/admin/users",
      INSTITUTIONS: "/dashboard/admin/institutions",
      SETTINGS: "/dashboard/admin/settings",
    },
    INSTITUTION: "/dashboard/institution",
    USER: "/dashboard/user",
  },
  
  // Special routes
  UNAUTHORIZED: "/unauthorized",
} as const;

// Menü öğesi tanımı
export interface MenuItem {
  href: string;
  label: string;
  icon: string;
  allowedRoles?: ROLES[];
  children?: MenuItem[];
}

// Public menü öğeleri
export const PublicRoutes: MenuItem[] = [
  {
    href: ROUTES.HOME,
    label: "Ana Sayfa",
    icon: "🏠",
  },
  {
    href: ROUTES.ABOUT_US,
    label: "Hakkımızda",
    icon: "ℹ️",
  },
  {
    href: ROUTES.CONTACT,
    label: "İletişim",
    icon: "📞",
  },
];

// Auth menü öğeleri
export const AuthRoutes: MenuItem[] = [
  {
    href: ROUTES.AUTH.LOGIN,
    label: "Giriş Yap",
    icon: "🔑",
  },
  {
    href: ROUTES.AUTH.REGISTER,
    label: "Kayıt Ol",
    icon: "📝",
  },
];

// Dashboard menü öğeleri
export const DashboardRoutes: MenuItem[] = [
  {
    href: ROUTES.DASHBOARD.HOME,
    label: "Ana Sayfa",
    icon: "🏠",
    allowedRoles: [ROLES.ADMIN, ROLES.INSTITUTION, ROLES.USER],
  },
  {
    href: ROUTES.DASHBOARD.ADMIN.HOME,
    label: "Admin Paneli",
    icon: "🔧",
    allowedRoles: [ROLES.ADMIN],
    children: [
      {
        href: ROUTES.DASHBOARD.ADMIN.USERS,
        label: "Kullanıcılar",
        icon: "👥",
        allowedRoles: [ROLES.ADMIN],
      },
      {
        href: ROUTES.DASHBOARD.ADMIN.INSTITUTIONS,
        label: "Kurumlar",
        icon: "🏢",
        allowedRoles: [ROLES.ADMIN],
      },
      {
        href: ROUTES.DASHBOARD.ADMIN.SETTINGS,
        label: "Ayarlar",
        icon: "⚙️",
        allowedRoles: [ROLES.ADMIN],
      },
    ],
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
export const getDashboardRoutes = (userRole: ROLES): MenuItem[] => {
  return DashboardRoutes.filter((item) =>
    item.allowedRoles?.includes(userRole)
  );
};

