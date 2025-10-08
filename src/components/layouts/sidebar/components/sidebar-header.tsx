"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../header/sections/logo";
import { SidebarHeaderProps } from "../types";

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  companyName,
  userName,
  userRole,
  userAvatar,
}) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="sidebar-header px-8">
      <div className="border border-neutral-30 rounded-12 bg-white p-6 position-relative">
        <div className="border border-neutral-30 rounded-12 bg-main-25 px-8 py-12">
          {/* Logo Bölümü - Kompakt */}
          <div className="text-center mb-12">
            <div className="d-flex align-items-center justify-content-center gap-8 mb-8">
              <Logo />
            </div>
          </div>

          {/* Kullanıcı Bilgileri - Dropdown */}
          <div
            className="user-info-section mb-8 position-relative"
            ref={dropdownRef}
          >
            <button
              type="button"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="d-flex align-items-center gap-6 p-6 bg-white rounded-6 border border-neutral-100 w-100 sidebar-profile-dropdown sidebar-link-animate"
              style={{ border: "none", background: "transparent" }}
            >
              <div className="user-avatar w-30-px h-30-px rounded-circle bg-main-100 flex-center flex-shrink-0">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt={userName}
                    width={20}
                    height={20}
                    className="rounded-circle"
                  />
                ) : (
                  <i
                    className="ph-bold ph-user text-main-600"
                    style={{ fontSize: "14px" }}
                  />
                )}
              </div>
              <div className="flex-grow-1 text-start">
                <p className="text-xs fw-semibold text-neutral-800 mb-0">
                  {userName}
                </p>
                <p
                  className="text-neutral-600 mb-0"
                  style={{ fontSize: "9px" }}
                >
                  {userRole}
                </p>
              </div>
              <div className="sidebar-dropdown-icon">
                <i
                  className={`ph-bold ph-caret-down sidebar-caret-animate ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="sidebar-profile-dropdown-menu position-absolute top-100 start-0 w-100 mt-2 bg-white border border-neutral-100 rounded-8 shadow-sm z-3 sidebar-submenu-animate">
                <div className="p-2">
                  <Link
                    href="/profile"
                    className="d-flex align-items-center gap-8 p-6 rounded-6 text-decoration-none text-neutral-700 hover-bg-neutral-25 transition-2 sidebar-link-animate"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <i className="ph-bold ph-user text-sm text-neutral-600" />
                    <span className="text-xs">Profilim</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="d-flex align-items-center gap-8 p-6 rounded-6 text-decoration-none text-neutral-700 hover-bg-neutral-25 transition-2 sidebar-link-animate"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <i className="ph-bold ph-gear text-sm text-neutral-600" />
                    <span className="text-xs">Ayarlar</span>
                  </Link>
                  <Link
                    href="/notifications"
                    className="d-flex align-items-center gap-8 p-6 rounded-6 text-decoration-none text-neutral-700 hover-bg-neutral-25 transition-2 sidebar-link-animate"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <i className="ph-bold ph-bell text-sm text-neutral-600" />
                    <span className="text-xs">Bildirimler</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
