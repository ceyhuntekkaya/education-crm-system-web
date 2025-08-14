import { ROLES } from "./roles";

// Menü öğesi tanımı
export interface MenuItem {
  href: string;
  label: string;
  icon: string;
  allowedRoles?: ROLES[];
  children?: MenuItem[];
}
