"use client";

import { Sidebar } from "./_shared";
import React, { useState, useEffect } from "react";
import {
  supplySupplierLayoutNavigation,
  SupplySupplierProvider,
} from "./_shared";
import { useResponsive } from "@/hooks";

const SupplySupplierLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDesktop } = useResponsive();
  const isMobile = !isDesktop;

  // Close mobile menu when clicking overlay
  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when navigating (for mobile)
  useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      // Close menu when route changes
      const handleRouteChange = () => {
        setIsMobileMenuOpen(false);
      };

      window.addEventListener("popstate", handleRouteChange);
      return () => window.removeEventListener("popstate", handleRouteChange);
    }
  }, [isMobile, isMobileMenuOpen]);

  return (
    <SupplySupplierProvider>
      <div>
        {/* Mobile Overlay */}
        <div
          className={`sidebar-overlay ${isMobileMenuOpen ? "show" : ""}`}
          onClick={handleOverlayClick}
          style={{ zIndex: 1040 }}
        />

        {/* Sidebar with mobile state */}
        <Sidebar
          menuItems={supplySupplierLayoutNavigation}
          className={isMobileMenuOpen ? "sidebar--mobile-open" : ""}
          onClose={() => setIsMobileMenuOpen(false)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className={`sidebar-mobile-toggle ${
            isMobileMenuOpen ? "sidebar-mobile-toggle--active" : ""
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
        >
          <i className={`ph-bold ${isMobileMenuOpen ? "ph-x" : "ph-list"}`} />
        </button>

        {/* Main Content */}
        <div className="main-content-wrapper">
          <div className="content-padding">{children}</div>
        </div>
      </div>
    </SupplySupplierProvider>
  );
};

export default SupplySupplierLayout;
