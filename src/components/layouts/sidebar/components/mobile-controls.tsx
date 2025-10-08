"use client";

import React from "react";
import { MobileControlsProps } from "../types";

const MobileControls: React.FC<MobileControlsProps> = ({
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay d-lg-none ${
          isMobileMenuOpen ? "show" : ""
        }`}
        onClick={() => onToggleMobileMenu(false)}
      />

      {/* Mobile Menu Toggle */}
      <button
        className="sidebar-mobile-toggle d-lg-none position-fixed z-4 top-20 start-20 w-48 h-48 bg-main-600 text-white rounded-8 flex-center shadow-md"
        onClick={() => onToggleMobileMenu(true)}
        type="button"
      >
        <i className="ph-bold ph-list text-xl" />
      </button>
    </>
  );
};

export default MobileControls;
