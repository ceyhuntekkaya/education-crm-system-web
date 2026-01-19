import { MenuItem } from "@/types/routes/menu";

/**
 * Aktif menü kontrolü
 */
export const isActive = (href: string, pathname: string): boolean => {
  return pathname === href;
};

/**
 * Alt menüde aktif öğe var mı kontrolü
 */
export const hasActiveChild = (
  children?: MenuItem[],
  pathname?: string
): boolean => {
  if (!children || !pathname) return false;
  return children.some((child) => isActive(child.href, pathname));
};

/**
 * Aktif menü öğelerinin parent'larını bul ve genişlet
 */
export const findActiveParents = (
  menuItems: MenuItem[],
  pathname: string
): Set<string> => {
  const expanded = new Set<string>();

  const checkItem = (item: MenuItem) => {
    if (item.children) {
      const hasActiveChildItem = item.children.some(
        (child) => pathname === child.href || pathname.startsWith(child.href)
      );

      if (hasActiveChildItem) {
        expanded.add(item.href);
      }

      item.children.forEach((child) => checkItem(child));
    }
  };

  menuItems.forEach((item) => checkItem(item));
  return expanded;
};

/**
 * Tab-style menü öğesi için CSS sınıfları
 */
export const getTabItemClasses = (level: number): string => {
  const classes = ["sidebar-tab-item", "mb-8"];
  if (level > 0) classes.push("sidebar-tab-item--sub", "ms-12");
  return classes.join(" ");
};

/**
 * Tab link için CSS sınıfları
 */
export const getTabLinkClasses = (
  itemIsActive: boolean,
  hasActiveChildItem: boolean,
  level: number
): string => {
  const baseClasses = [
    "sidebar-tab-link",
    "d-flex align-items-center gap-6 px-6 py-6 rounded-8 transition-3 text-decoration-none position-relative",
  ];

  if (itemIsActive) {
    baseClasses.push(
      "sidebar-tab-link--active bg-main-600 text-white shadow-sm"
    );
  } else if (hasActiveChildItem) {
    baseClasses.push("sidebar-tab-link--has-active text-main-600 bg-main-25");
  } else {
    baseClasses.push(
      "sidebar-tab-link--default text-neutral-700 hover-bg-neutral-25"
    );
  }

  if (level > 0) {
    baseClasses.push("sidebar-tab-link--sub text-xs");
  }

  return baseClasses.join(" ");
};

/**
 * Ana sidebar CSS sınıfları
 */
export const getSidebarClasses = (
  isMobileMenuOpen: boolean,
  className?: string
): string => {
  const sidebarClasses = [
    "sidebar",
    "bg-white border-end border-neutral-50",
    "d-flex flex-column",
    isMobileMenuOpen ? "sidebar--mobile-open" : "",
    className || "",
  ];

  return sidebarClasses.filter(Boolean).join(" ");
};
