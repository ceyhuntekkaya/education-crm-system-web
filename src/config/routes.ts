import { ROLES } from "@/types/roles";
import { MenuItem } from "@/types/menu";
import { ROUTES } from "@/constants/routes";

// Re-export for backward compatibility
export { ROUTES };

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
    href: ROUTES.DASHBOARD.INSTITUTION.HOME,
    label: "Kurum Paneli",
    icon: "🏢",
    allowedRoles: [ROLES.ADMIN, ROLES.INSTITUTION],
  },
  {
    href: ROUTES.DASHBOARD.USER.HOME,
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

