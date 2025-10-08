"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button, Icon } from "@/components";
import { ReportsActionButtonsProps } from "../types";

export const ReportsActionButtons: React.FC<ReportsActionButtonsProps> = ({
  report,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  onDuplicate,
  onViewReport,
  onExport,
  onRefresh,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDropdownItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      {/* Quick Actions */}
      <div title="Rapor Detayları">
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-eye"
          onClick={() => onViewDetails?.(report)}
        >
          {""}
        </Button>
      </div>

      <div title="Raporu Düzenle">
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-pencil-simple"
          onClick={() => onEdit?.(report)}
        >
          {""}
        </Button>
      </div>

      {/* Dropdown Menu */}
      <div className="position-relative" ref={dropdownRef}>
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-dots-three-vertical"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {""}
        </Button>

        {isDropdownOpen && (
          <div
            className="position-absolute end-0 mt-1 bg-white border border-neutral-30 rounded-8 shadow-sm py-2"
            style={{ minWidth: "200px", zIndex: 1000 }}
          >
            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25"
              onClick={() =>
                handleDropdownItemClick(() => onViewReport?.(report))
              }
            >
              <Icon name="ph-chart-line" className="me-2" />
              Raporu Görüntüle
            </button>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25"
              onClick={() => handleDropdownItemClick(() => onExport?.(report))}
            >
              <Icon name="ph-download" className="me-2" />
              Raporu İndir
            </button>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25"
              onClick={() => handleDropdownItemClick(() => onRefresh?.(report))}
            >
              <Icon name="ph-arrow-clockwise" className="me-2" />
              Raporu Yenile
            </button>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25"
              onClick={() =>
                handleDropdownItemClick(() => onDuplicate?.(report))
              }
            >
              <Icon name="ph-copy" className="me-2" />
              Raporu Kopyala
            </button>

            <div className="border-top border-neutral-30 my-1"></div>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25"
              onClick={() =>
                handleDropdownItemClick(() => onToggleStatus?.(report))
              }
            >
              <Icon
                name={report.isActive ? "ph-pause" : "ph-play"}
                className="me-2"
              />
              {report.isActive ? "Pasif Yap" : "Aktif Yap"}
            </button>

            <div className="border-top border-neutral-30 my-1"></div>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 text-danger"
              onClick={() => handleDropdownItemClick(() => onDelete?.(report))}
            >
              <Icon name="ph-trash" className="me-2" />
              Sil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
