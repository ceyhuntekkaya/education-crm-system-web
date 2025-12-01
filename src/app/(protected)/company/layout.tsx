"use client";

import { Sidebar } from "./_shared";
import React, { useState, useEffect } from "react";
import { companyLayoutNavigation, CompanyProvider } from "./_shared";

const CompanyLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    <CompanyProvider>
      <div>
        {/* Mobile Overlay */}
        <div
          className={`sidebar-overlay ${isMobileMenuOpen ? "show" : ""}`}
          onClick={handleOverlayClick}
          style={{ zIndex: 1040 }}
        />

        {/* Sidebar with mobile state */}
        <Sidebar
          menuItems={companyLayoutNavigation}
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
    </CompanyProvider>
  );
};

export default CompanyLayout;
