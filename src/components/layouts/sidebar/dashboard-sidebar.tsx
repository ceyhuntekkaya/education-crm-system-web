"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts";
import { useGuardHook } from "@/hooks";
import { SidebarProps } from "./types";
import { findActiveParents, getSidebarClasses } from "./utils";
import {
  SidebarHeader,
  SidebarFooter,
  SidebarMenuItem,
  SidebarDashboardHeader,
  MobileControls,
} from "./components";

// SASS stilleri public/assets/sass/layout/_sidebar.scss içinde tanımlı

const DashboardSidebar: React.FC<SidebarProps> = ({
  menuItems,
  className = "",
  companyName = "EduAll",
  userName = "Henry",
  userRole = "Admin",
  userAvatar,
  companyLogo,
}) => {
  const { logout } = useAuth();
  const { filterMenuItems } = useGuardHook();
  const filteredMenuItems = filterMenuItems(menuItems);
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Mobile menu toggle
  const handleMobileMenuToggle = (open: boolean) => {
    setIsMobileMenuOpen(open);
  };

  return (
    <>
      <MobileControls
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={handleMobileMenuToggle}
      />

      {/* Ana Sidebar */}
      <aside
        className={getSidebarClasses(isMobileMenuOpen, className)}
        style={{
          width: "280px",
          left: isMobileMenuOpen ? "0" : "",
          transition: "all 0.3s ease",
        }}
      >
        <SidebarHeader
          companyName={companyName}
          userName={userName}
          userRole={userRole}
          userAvatar={userAvatar}
          companyLogo={companyLogo}
        />

        <SidebarDashboardHeader />

        {/* Ana Navigasyon - Tab Style */}
        <nav className="sidebar-nav flex-grow-1 px-8 py-0 overflow-y-auto scroll-sm">
          <div className="border border-neutral-30 rounded-12 bg-white px-4 py-6 mb-8">
            <ul className="sidebar-tab-menu list-unstyled mb-0">
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  expandedItems={expandedItems}
                  onToggleExpanded={toggleExpanded}
                />
              ))}
            </ul>
          </div>
        </nav>

        <SidebarFooter onLogout={logout} />
      </aside>
    </>
  );
};

export default DashboardSidebar;
