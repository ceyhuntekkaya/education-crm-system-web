"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components";
import { PricingActionButtonsProps } from "../types";

export const PricingActionButtons: React.FC<PricingActionButtonsProps> = ({
  pricing,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  onDuplicate,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="d-flex align-items-center gap-1">
      <div title="Detayları Görüntüle">
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-eye"
          onClick={() => onViewDetails?.(pricing)}
        >
          <span className="d-none d-md-inline">Detay</span>
        </Button>
      </div>

      <div className="position-relative" ref={dropdownRef}>
        <div title="Daha Fazla İşlem">
          <Button
            variant="outline"
            size="xs"
            leftIcon="ph-dots-three-vertical"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {""}
          </Button>
        </div>

        {isDropdownOpen && (
          <div
            className="position-absolute top-100 end-0 mt-1 bg-white border border-neutral-100 rounded-8 shadow-sm z-3 py-1"
            style={{ minWidth: "180px" }}
          >
            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() => handleDropdownItemClick(() => onEdit?.(pricing))}
            >
              <i className="ph ph-pencil-simple text-sm" />
              <span className="text-sm">Düzenle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onDuplicate?.(pricing))
              }
            >
              <i className="ph ph-copy text-sm" />
              <span className="text-sm">Kopyala</span>
            </button>

            <hr className="my-1 border-neutral-100" />

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onToggleStatus?.(pricing))
              }
            >
              <i
                className={`ph ${
                  pricing.status === "ACTIVE" ? "ph-pause" : "ph-play"
                } text-sm`}
              />
              <span className="text-sm">
                {pricing.status === "ACTIVE" ? "Pasif Yap" : "Aktif Yap"}
              </span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2 text-danger"
              onClick={() => handleDropdownItemClick(() => onDelete?.(pricing))}
            >
              <i className="ph ph-trash text-sm" />
              <span className="text-sm">Sil</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
