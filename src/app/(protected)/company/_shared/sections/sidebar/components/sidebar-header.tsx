"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/layouts/header/sections/logo";
import { SidebarHeaderProps } from "../types";
import { Button, CustomImage } from "@/components/ui";

// Company context'i import et
import { useCompany } from "@/app/(protected)/company/_shared";
import { useAuth } from "@/contexts";

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => {
  // Company context'ten verileri al
  const { schools, selectedSchool, setSelectedSchool } = useCompany();
  // Auth context'ten kullanıcı bilgilerini al
  const { user, currentRole } = useAuth();

  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
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

  // Handle school selection
  const handleSchoolSelect = (school: NonNullable<typeof selectedSchool>) => {
    setSelectedSchool(school);
    setIsSchoolDropdownOpen(false);
  };

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

          {/* Kurum Seçimi Dropdown */}
          <div
            className="school-selection-section mb-8 position-relative"
            ref={schoolDropdownRef}
          >
            <button
              type="button"
              onClick={() => setIsSchoolDropdownOpen(!isSchoolDropdownOpen)}
              className="d-flex align-items-center justify-content-between p-8 bg-white rounded-8 w-100 sidebar-link-animate"
              style={{ border: "1px solid #e5e7eb" }}
            >
              <div className="text-start">
                <p className="text-xs fw-semibold text-neutral-800 mb-0">
                  Kurum Seçimi
                </p>
                <p
                  className="text-neutral-600 mb-0 fw-normal"
                  style={{ fontSize: "10px" }}
                >
                  {selectedSchool?.name || "Kurum Seçiniz"}
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
              <div className="sidebar-school-dropdown-menu position-absolute top-100 start-0 w-100 mt-2 bg-white  rounded-8 shadow-sm z-3 sidebar-submenu-animate">
                <div className="p-2">
                  {schools.length === 0 ? (
                    <div className="p-8 text-center">
                      <i
                        className="ph-bold ph-warning-circle text-warning-600 d-block mb-8"
                        style={{ fontSize: "24px" }}
                      />
                      <p className="text-sm fw-medium text-neutral-800 mb-4">
                        Henüz Kurum Bulunmuyor
                      </p>
                      <p className="text-xs text-neutral-600 mb-12">
                        Devam etmek için önce bir Kurum eklemeniz gerekmektedir.
                      </p>
                      <Link
                        href="/company/school-list/add-edit/new"
                        onClick={() => {
                          setIsSchoolDropdownOpen(false);
                          if (onClose) onClose();
                        }}
                      >
                        <Button
                          variant="inline"
                          size="sm"
                          leftIcon="ph-bold ph-plus"
                        >
                          Kurum Ekle
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    schools.map((school) => (
                      <button
                        key={school.id}
                        type="button"
                        onClick={() => handleSchoolSelect(school)}
                        className={`d-flex align-items-center gap-8 p-6 rounded-6 text-decoration-none w-100 border-0 bg-transparent transition-2 sidebar-link-animate ${
                          selectedSchool?.id === school.id
                            ? "bg-main-50 text-main-600"
                            : "text-neutral-700 hover-bg-neutral-25"
                        }`}
                      >
                        <span className="text-xs fw-medium text-start flex-grow-1">
                          {school.name}
                        </span>
                        {selectedSchool?.id === school.id && (
                          <i className="ph-bold ph-check text-main-600 flex-shrink-0" />
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
