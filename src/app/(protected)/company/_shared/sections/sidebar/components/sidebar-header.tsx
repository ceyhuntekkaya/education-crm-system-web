"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/layouts/header/sections/logo";
import { SidebarHeaderProps } from "../types";
import { Button } from "@/components/ui";

// Company context'i import et
import { useCompany } from "@/app/(protected)/company/_shared";
import { useAuth } from "@/contexts";

const SidebarHeader: React.FC<SidebarHeaderProps> = () => {
  // Company context'ten verileri al
  const { schools, selectedSchool, setSelectedSchool } = useCompany();
  // Auth context'ten kullanıcı bilgilerini al
  const { user, currentRole } = useAuth();

  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const schoolDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        schoolDropdownRef.current &&
        !schoolDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSchoolDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Kullanıcı değiştiğinde image error state'ini sıfırla
  useEffect(() => {
    setImageLoadError(false);
  }, [user?.profileImageUrl]);

  return (
    <div className="sidebar-header px-8 mt-16">
      <div className="border border-neutral-30 rounded-12 bg-white p-6 position-relative">
        <div className="border border-neutral-30 rounded-12 bg-main-25 px-8 py-12">
          {/* Logo Bölümü - Kompakt */}
          <div className="text-center mb-12">
            <div className="d-flex align-items-center justify-content-center gap-8 mb-8">
              <Logo />
            </div>
          </div>

          {/* Okul Seçimi Dropdown */}
          <div
            className="school-selection-section mb-12 position-relative"
            ref={schoolDropdownRef}
          >
            <button
              type="button"
              onClick={() => setIsSchoolDropdownOpen(!isSchoolDropdownOpen)}
              className="d-flex align-items-center justify-content-between p-8 bg-white rounded-8 border border-neutral-100 w-100 sidebar-link-animate"
              style={{ border: "1px solid #e5e7eb" }}
            >
              <div className="text-start">
                <p className="text-xs fw-semibold text-neutral-800 mb-0">
                  Okul Seçimi
                </p>
                <p
                  className="text-neutral-600 mb-0 fw-medium"
                  style={{ fontSize: "11px" }}
                >
                  {selectedSchool?.name || "Okul Seçiniz"}
                </p>
              </div>
              <div className="sidebar-dropdown-icon">
                <i
                  className={`ph-bold ph-caret-down sidebar-caret-animate ${
                    isSchoolDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* School Dropdown Menu */}
            {isSchoolDropdownOpen && (
              <div className="sidebar-school-dropdown-menu position-absolute top-100 start-0 w-100 mt-2 bg-white border border-neutral-100 rounded-8 shadow-sm z-3 sidebar-submenu-animate">
                <div className="p-2">
                  {schools.length === 0 ? (
                    <div className="p-8 text-center">
                      <i
                        className="ph-bold ph-warning-circle text-warning-600 d-block mb-8"
                        style={{ fontSize: "24px" }}
                      />
                      <p className="text-sm fw-medium text-neutral-800 mb-4">
                        Henüz Okul Bulunmuyor
                      </p>
                      <p className="text-xs text-neutral-600 mb-12">
                        Devam etmek için önce bir okul eklemeniz gerekmektedir.
                      </p>
                      <Link
                        href="/company/school-list"
                        onClick={() => setIsSchoolDropdownOpen(false)}
                      >
                        <Button
                          variant="inline"
                          size="sm"
                          leftIcon="ph-bold ph-plus"
                        >
                          Okul Ekle
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    schools.map((school) => (
                      <button
                        key={school.id}
                        type="button"
                        onClick={() => {
                          setSelectedSchool(school);
                          setIsSchoolDropdownOpen(false);
                        }}
                        className={`d-flex align-items-center gap-8 p-6 rounded-6 text-decoration-none w-100 border-0 bg-transparent transition-2 sidebar-link-animate ${
                          selectedSchool?.id === school.id
                            ? "bg-main-50 text-main-600"
                            : "text-neutral-700 hover-bg-neutral-25"
                        }`}
                      >
                        <span className="text-xs fw-medium">{school.name}</span>
                        {selectedSchool?.id === school.id && (
                          <i className="ph-bold ph-check text-main-600 ms-auto" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Kullanıcı Bilgileri */}
          <div className="user-info-section mb-8">
            <div className="d-flex align-items-center gap-6 p-6 bg-white rounded-6 border border-neutral-100">
              <div className="user-avatar w-30-px h-30-px rounded-circle bg-main-100 d-flex align-items-center justify-content-center flex-shrink-0 position-relative">
                {user?.profileImageUrl && !imageLoadError ? (
                  <Image
                    src={user.profileImageUrl}
                    alt={user?.fullName || "Kullanıcı"}
                    width={30}
                    height={30}
                    className="rounded-circle object-fit-cover"
                    onError={() => setImageLoadError(true)}
                  />
                ) : (
                  <i
                    className="ph-bold ph-user text-main-600"
                    style={{ fontSize: "16px" }}
                  />
                )}
              </div>
              <div className="flex-grow-1 text-start">
                <p className="text-xs fw-semibold text-neutral-800 mb-0">
                  {user?.fullName || "Kullanıcı"}
                </p>
                <p
                  className="text-neutral-600 mb-0"
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
