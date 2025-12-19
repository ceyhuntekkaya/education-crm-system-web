import { Role } from "@/enums/Role";

// Menü öğesi tanımı
export interface MenuItem {
  href: string;
  label: string;
  icon: string;
  allowedRoles?: Role[];
  departments?: string[];
  permissions?: string[];
  children?: MenuItem[];
  requiresSchool?: boolean; // Okul seçimi gerektiren menüler için
}
