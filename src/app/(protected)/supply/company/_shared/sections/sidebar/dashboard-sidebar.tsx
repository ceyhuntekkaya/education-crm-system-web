"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useGuardHook } from "@/hooks";
import { SidebarProps } from "./types";
import { findActiveParents, getSidebarClasses } from "./utils";
import {
  SidebarHeader,
  SidebarFooter,
  SidebarMenuItem,
  SidebarDashboardHeader,
} from "./components";

const DashboardSidebar: React.FC<SidebarProps> = ({
  menuItems,
  className = "",
  onClose,
  isMobileMenuOpen = false,
}) => {
  const { filterMenuItems } = useGuardHook();
  const filteredMenuItems = filterMenuItems(menuItems);
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Aktif menü öğelerini otomatik genişlet
  useEffect(() => {
    setExpandedItems(findActiveParents(menuItems, pathname));
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

  // Mobile'da menü öğesine tıklandığında sidebar'ı kapat
  const handleMenuItemClick = useCallback(() => {
    if (isMobileMenuOpen && onClose) {
      onClose();
    }
  }, [isMobileMenuOpen, onClose]);

  return (
    <>
      {/* Ana Sidebar */}
      <aside
        className={getSidebarClasses(isMobileMenuOpen, className)}
        style={{
          transform: isMobileMenuOpen ? "translateX(0)" : undefined,
          zIndex: 1050,
        }}
      >
        <SidebarHeader onClose={onClose} />

        <SidebarDashboardHeader />

        {/* Ana Navigasyon - Tab Style */}
        <nav className="sidebar-nav">
          <div className="sidebar-menu-container">
            <ul className="sidebar-tab-menu list-unstyled mb-0">
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  expandedItems={expandedItems}
                  onToggleExpanded={toggleExpanded}
                  isDisabled={false}
                  onItemClick={handleMenuItemClick}
                />
              ))}
            </ul>
          </div>
        </nav>

        <SidebarFooter />
      </aside>
    </>
  );
};

export default DashboardSidebar;
