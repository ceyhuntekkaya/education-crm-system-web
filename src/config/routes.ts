import { ROLES } from "@/types/roles";

// Dashboard menü öğesi tanımı
export interface DashboardMenuItem {
  href: string;
  label: string;
  icon: string;
  allowedRoles: ROLES[];
}

// Public navigation öğesi tanımı
export interface PublicMenuItem {
  href: string;
  label: string;
  icon?: string;
}

// Auth navigation öğesi tanımı (login/register için)
export interface AuthMenuItem {
  href: string;
  label: string;
  icon?: string;
}

// Authenticated user navigation öğesi tanımı
export interface AuthenticatedMenuItem {
  href: string;
  label: string;
  icon?: string;
}

// Dashboard menü öğeleri
export const DashboardRoutes: DashboardMenuItem[] = [
  {
    href: "/dashboard",
    label: "Ana Sayfa",
    icon: "🏠",
    allowedRoles: [ROLES.ADMIN, ROLES.INSTITUTION, ROLES.USER],
  },
  {
    href: "/dashboard/admin",
    label: "Admin Paneli",
    icon: "🔧",
    allowedRoles: [ROLES.ADMIN],
  },
  {
    href: "/dashboard/institution",
    label: "Kurum Paneli",
    icon: "🏢",
    allowedRoles: [ROLES.ADMIN, ROLES.INSTITUTION],
  },
  {
    href: "/dashboard/user",
    label: "Kullanıcı Paneli",
    icon: "👤",
    allowedRoles: [ROLES.ADMIN, ROLES.USER],
  },
];

// Public navigation öğeleri (giriş yapmamış kullanıcılar için)
export const PublicRoutes: PublicMenuItem[] = [

  {
    href: "/about-us",
    label: "Hakkımızda",
    icon: "ℹ️",
  },
  {
    href: "/contact",
    label: "İletişim",
    icon: "📞",
  },
];

// Guest authentication öğeleri (giriş yapmamış kullanıcılar için)
export const GuestAuthRoutes: AuthMenuItem[] = [
  {
    href: "/login",
    label: "Giriş Yap",
    icon: "🔑",
  },
  {
    href: "/register",
    label: "Kayıt Ol",
    icon: "📝",
  },
];

// Authenticated user navigation öğeleri
export const AuthenticatedRoutes: AuthenticatedMenuItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "📊",
  },
];