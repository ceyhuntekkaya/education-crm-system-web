import { MenuItem } from "@/types/routes/menu";

export interface SidebarProps {
  menuItems: MenuItem[];
  className?: string;
}

export interface SidebarHeaderProps {}

export interface SidebarFooterProps {}

export interface SidebarMenuItemProps {
  item: MenuItem;
  level?: number;
  pathname: string;
  expandedItems: Set<string>;
  onToggleExpanded: (href: string) => void;
  isDisabled: boolean;
}
