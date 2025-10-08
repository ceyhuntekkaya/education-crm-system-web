"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/routes/menu";
import { useAuth } from "@/contexts";
import { Button } from "../ui";
import { useGuardHook } from "@/hooks";

// SASS stilleri public/assets/sass/layout/_sidebar.scss içinde tanımlı

interface SidebarProps {
  menuItems: MenuItem[];
  isCollapsed?: boolean;
  className?: string;
  companyName?: string;
  userName?: string;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  isCollapsed = false,
  className = "",
  companyName = "EduAll",
  userName = "Henry",
  userRole = "Admin",
}) => {
  const { logout } = useAuth();
  const { filterMenuItems } = useGuardHook();
  const filteredMenuItems = filterMenuItems(menuItems);
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Aktif menü öğelerini otomatik genişlet
  useEffect(() => {
    const findActiveParents = () => {
      const expanded = new Set<string>();

      const checkItem = (item: MenuItem) => {
        if (item.children) {
          const hasActiveChild = item.children.some(
            (child) =>
              pathname === child.href || pathname.startsWith(child.href)
          );

          if (hasActiveChild) {
            expanded.add(item.href);
          }

          item.children.forEach((child) => checkItem(child));
        }
      };

      menuItems.forEach((item) => checkItem(item));
      return expanded;
    };

    setExpandedItems(findActiveParents());
  }, [pathname, menuItems]);

  // Menü genişletme/daraltma
  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(href)) {
        newSet.delete(href);
      } else {
        newSet.add(href);
      }
      return newSet;
    });
  };

  // Aktif menü kontrolü
  const isActive = (href: string) => {
    return pathname === href;
  };

  // Alt menüde aktif öğe var mı kontrolü
  const hasActiveChild = (children?: MenuItem[]) => {
    return children?.some((child) => isActive(child.href)) || false;
  };

  // Alt bileşenler
  const MenuItemLink = ({
    item,
    linkClasses,
    isCollapsed,
  }: {
    item: MenuItem;
    linkClasses: string;
    isCollapsed: boolean;
  }) => (
    <Link
      href={item.href}
      className={linkClasses}
      title={isCollapsed ? item.label : undefined}
    >
      <i className={`ph-bold ${item.icon} text-lg flex-shrink-0`} />
      <span
        className={`sidebar-menu__text${
          isCollapsed ? "--collapsed flex-grow-1 text-start ms-12" : ""
        }`}
      >
        {item.label}
      </span>
    </Link>
  );

  const MenuItemWithChildren = ({
    item,
    linkClasses,
    isExpanded,
    isCollapsed,
    onToggle,
    level,
    renderMenuItem,
  }: {
    item: MenuItem;
    linkClasses: string;
    isExpanded: boolean;
    isCollapsed: boolean;
    onToggle: () => void;
    level: number;
    renderMenuItem: (item: MenuItem, level: number) => React.ReactNode;
  }) => (
    <div>
      <button
        onClick={onToggle}
        className={linkClasses}
        type="button"
        title={isCollapsed ? item.label : undefined}
      >
        <i className={`ph-bold ${item.icon} text-lg flex-shrink-0`} />
        <span
          className={`sidebar-menu__text${
            isCollapsed
              ? "--collapsed flex-grow-1 text-start ms-12"
              : " flex-grow-1 text-start"
          }`}
        >
          {item.label}
        </span>
        <i
          className={`ph-bold ph-caret-down transition-3 flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <ul
        className={`sidebar-submenu list-unstyled mt-8 ${
          isExpanded ? "d-block" : "d-none"
        } ${isCollapsed ? "sidebar-submenu--collapsed" : ""}`}
      >
        {item.children?.map((child) => renderMenuItem(child, level + 1))}
      </ul>
    </div>
  );

  // CSS sınıflarını oluştur
  const getMenuItemClasses = (
    level: number,
    isActive: boolean,
    hasActiveChild: boolean,
    hasChildren: boolean
  ) => {
    const classes = ["sidebar-menu__item"];

    if (level > 0) classes.push("sidebar-menu__item--sub");
    if (isActive) classes.push("sidebar-menu__item--active");
    if (hasActiveChild) classes.push("sidebar-menu__item--has-active-child");
    if (hasChildren) classes.push("sidebar-menu__item--has-children");

    return classes.join(" ");
  };

  const getLinkClasses = (
    level: number,
    isActive: boolean,
    hasActiveChild: boolean
  ) => {
    const baseClasses = [
      "sidebar-menu__link",
      "flex-align gap-12 p-12 rounded-8 transition-2 mb-4 text-decoration-none",
    ];

    if (level > 0) baseClasses.push("sidebar-menu__link--sub ms-24 text-sm");
    if (isActive) baseClasses.push("bg-main-600 text-white");
    if (hasActiveChild && !isActive) baseClasses.push("text-main-600");
    if (isCollapsed && level === 0)
      baseClasses.push("sidebar-menu__link--collapsed");

    return baseClasses.join(" ");
  };

  // Menü öğesi render etme
  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = Boolean(item.children?.length);
    const isExpanded = expandedItems.has(item.href);
    const itemIsActive = isActive(item.href);
    const hasActiveChildItem = hasActiveChild(item.children);

    const menuItemClasses = getMenuItemClasses(
      level,
      itemIsActive,
      hasActiveChildItem,
      hasChildren
    );
    const linkClasses = getLinkClasses(level, itemIsActive, hasActiveChildItem);

    return (
      <li key={item.href} className={menuItemClasses}>
        {hasChildren ? (
          <MenuItemWithChildren
            item={item}
            linkClasses={linkClasses}
            isExpanded={isExpanded}
            isCollapsed={isCollapsed}
            onToggle={() => toggleExpanded(item.href)}
            level={level}
            renderMenuItem={renderMenuItem}
          />
        ) : (
          <MenuItemLink
            item={item}
            linkClasses={linkClasses}
            isCollapsed={isCollapsed}
          />
        )}
      </li>
    );
  };

  // Sidebar ana bileşenleri
  const SidebarHeader = () => (
    <div className="sidebar-header p-24 pb-16">
      <div className="sidebar-logo-container flex-align gap-12">
        <div className="company-logo w-40 h-40 rounded-8 flex-center text-white flex-shrink-0">
          <i className="ph-bold ph-graduation-cap text-xl" />
        </div>
        {!isCollapsed && (
          <div>
            <h4 className="text-main-600 mb-0 fw-bold">{companyName}</h4>
          </div>
        )}
      </div>
    </div>
  );

  const WelcomeSection = () =>
    !isCollapsed ? (
      <div className="sidebar-welcome px-24 py-16">
        <p className="text-neutral-600 mb-0 text-sm">Hoşgeldin {userName},</p>
      </div>
    ) : null;

  const AdminSection = () => (
    <div
      className={`sidebar-admin-section ${
        isCollapsed ? "mt-16" : "mt-32"
      } pt-16`}
    >
      {!isCollapsed && (
        <p className="admin-label text-xs px-12 mb-8 fw-semibold">{userRole}</p>
      )}
      <ul className="sidebar-menu list-unstyled">
        <li>
          <Link
            href="/settings"
            className={`sidebar-menu__link flex-align gap-12 p-12 rounded-8 transition-2 mb-4 text-decoration-none ${
              isCollapsed ? "sidebar-menu__link--collapsed" : ""
            }`}
            title={isCollapsed ? "Settings" : undefined}
          >
            <i className="ph-bold ph-gear text-lg flex-shrink-0" />
            <span
              className={`sidebar-menu__text${
                isCollapsed ? "--collapsed flex-grow-1 text-start ms-12" : ""
              }`}
            >
              Settings
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );

  const SidebarFooter = () => (
    <div className="sidebar-footer p-16">
      {!isCollapsed ? (
        <Button
          variant="error"
          onClick={logout}
          fullWidth
          leftIcon="ph-sign-out"
        >
          Çıkış Yap
        </Button>
      ) : (
        <button className="logout-button" title="Çıkış Yap" type="button">
          <i className="ph-bold ph-sign-out" />
        </button>
      )}
    </div>
  );

  const MobileControls = () => (
    <>
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay d-lg-none ${
          isMobileMenuOpen ? "show" : ""
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Toggle */}
      <button
        className="sidebar-mobile-toggle d-lg-none position-fixed z-4 top-20 start-20 w-48 h-48 bg-main-600 text-white rounded-8 flex-center shadow-md"
        onClick={() => setIsMobileMenuOpen(true)}
        type="button"
      >
        <i className="ph-bold ph-list text-xl" />
      </button>
    </>
  );

  // Ana CSS sınıfları
  const sidebarClasses = [
    "sidebar",
    "position-fixed h-100 bg-white border-end border-neutral-50",
    "d-flex flex-column z-3",
    isCollapsed ? "sidebar--collapsed" : "sidebar--expanded",
    isMobileMenuOpen ? "sidebar--mobile-open" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <MobileControls />

      {/* Ana Sidebar */}
      <aside
        className={sidebarClasses}
        style={{
          width: isCollapsed ? "280px" : "320px",
          left: isMobileMenuOpen ? "0" : "",
          transition: "all 0.3s ease",
        }}
      >
        <SidebarHeader />
        <WelcomeSection />

        {/* Ana Navigasyon */}
        <nav className="sidebar-nav flex-grow-1 px-16 py-8 overflow-y-auto scroll-sm">
          <ul className="sidebar-menu list-unstyled">
            {filteredMenuItems.map((item) => renderMenuItem(item))}
          </ul>
          {/* <AdminSection /> */}
        </nav>

        <SidebarFooter />
      </aside>
    </>
  );
};

export default Sidebar;
