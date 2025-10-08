import { MenuItem } from "@/types/routes/menu";

export interface SidebarProps {
  menuItems: MenuItem[];
  className?: string;
  companyName?: string;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  companyLogo?: string;
}

export interface SidebarHeaderProps {
  companyName: string;
  userName: string;
  userRole: string;
  userAvatar?: string;
  companyLogo?: string;
}

export interface SidebarFooterProps {
  onLogout: () => void;
}

export interface SidebarMenuItemProps {
  item: MenuItem;
  level?: number;
  pathname: string;
  expandedItems: Set<string>;
  onToggleExpanded: (href: string) => void;
}

export interface MobileControlsProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: (open: boolean) => void;
}
