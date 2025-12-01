import { MenuItem } from "@/types/routes/menu";

export interface SidebarProps {
  menuItems: MenuItem[];
  className?: string;
  onClose?: () => void;
  isMobileMenuOpen?: boolean;
}

export interface SidebarHeaderProps {
  onClose?: () => void;
}

export interface SidebarFooterProps {}

export interface SidebarMenuItemProps {
  item: MenuItem;
  level?: number;
  pathname: string;
  expandedItems: Set<string>;
  onToggleExpanded: (href: string) => void;
  isDisabled: boolean;
  onItemClick?: () => void;
}
