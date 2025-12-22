import { Role } from "@/enums/Role";

export interface MenuLink {
  href: string;
  label: string;
  count?: number;
}

export interface MenuItem {
  label: string;
  href?: string;
  links?: MenuLink[];
  count?: number;
  hasNoData?: boolean; // Veri olmadığını belirten flag
  allowedRoles?: Role[]; // Hangi rollerin bu menüyü görebileceği
}
