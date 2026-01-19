"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/layouts/header/sections/logo";
import { CustomImage } from "@/components/ui";
import { useAuth } from "@/contexts";

interface SidebarHeaderProps {
  onClose?: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => {
  // Auth context'ten kullanıcı bilgilerini al
  const { user, currentRole } = useAuth();

  return (
    <div className="sidebar-header">
      <div className="sidebar-header-outer">
        <div className="sidebar-header-inner">
          {/* Logo Bölümü - Kompakt */}
          <div className="text-center mb-8">
            <div className="d-flex align-items-center justify-content-center">
              <Logo />
            </div>
          </div>

          {/* Portal Bilgisi */}
          <div className="company-info-section mb-8">
            <div
              className="d-flex align-items-center p-8 bg-white rounded-8 w-100"
              style={{ border: "1px solid #e5e7eb" }}
            >
              <div className="text-start">
                <p className="text-xs fw-semibold text-neutral-800 mb-0">
                  Tedarikçi Portalı
                </p>
                <p
                  className="text-neutral-600 mb-0 fw-normal"
                  style={{ fontSize: "10px" }}
                >
                  Tedarik ve satış yönetimi
                </p>
              </div>
            </div>
          </div>

          {/* Kullanıcı Bilgileri */}
          <div className="user-info-section mb-8">
            <div className="d-flex align-items-center gap-6 p-6 bg-white rounded-6 ">
              <div className="user-avatar w-30-px h-30-px rounded-circle bg-main-100 d-flex align-items-center justify-content-center flex-shrink-0 position-relative">
                <CustomImage
                  src={user?.profileImageUrl}
                  alt={user?.fullName || "Kullanıcı"}
                  width={30}
                  height={30}
                  variant="circle"
                  className="object-fit-cover"
                />
              </div>
              <div className="flex-grow-1 text-start">
                <p className="text-xs fw-semibold text-neutral-800 mb-0">
                  {user?.fullName || "Kullanıcı"}
                </p>
                <p
                  className="text-neutral-600 mb-0 fw-normal"
                  style={{ fontSize: "9px" }}
                >
                  {currentRole || "Kullanıcı"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
