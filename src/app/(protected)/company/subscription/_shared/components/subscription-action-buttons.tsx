"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button, Icon } from "@/components";
import { SubscriptionActionButtonsProps } from "../types";

export const SubscriptionActionButtons: React.FC<
  SubscriptionActionButtonsProps
> = ({
  subscription,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  onDuplicate,
  onViewPlan,
  onToggleVisibility,
  onTogglePopular,
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
      <div title="Detayları Görüntüle">
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-eye"
          onClick={() => onViewDetails?.(subscription)}
        >
          {""}
        </Button>
      </div>

      <div title="Düzenle">
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-pencil-simple"
          onClick={() => onEdit?.(subscription)}
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
                handleDropdownItemClick(() => onViewPlan?.(subscription))
              }
            >
              <Icon icon="ph-info" className="me-2" />
              Plan Detayları
            </button>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25"
              onClick={() =>
                handleDropdownItemClick(() => onDuplicate?.(subscription))
              }
            >
              <Icon icon="ph-copy" className="me-2" />
              Planı Kopyala
            </button>

            <div className="border-top border-neutral-30 my-1"></div>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25"
              onClick={() =>
                handleDropdownItemClick(() =>
                  onToggleVisibility?.(subscription)
                )
              }
            >
              <Icon
                icon={subscription.isVisible ? "ph-eye-slash" : "ph-eye"}
                className="me-2"
              />
              {subscription.isVisible ? "Gizle" : "Göster"}
            </button>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25"
              onClick={() =>
                handleDropdownItemClick(() => onTogglePopular?.(subscription))
              }
            >
              <Icon
                icon={subscription.isPopular ? "ph-star-fill" : "ph-star"}
                className="me-2"
              />
              {subscription.isPopular ? "Popülerlikten Çıkar" : "Popüler Yap"}
            </button>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25"
              onClick={() =>
                handleDropdownItemClick(() => onToggleStatus?.(subscription))
              }
            >
              <Icon
                icon={subscription.isActive ? "ph-pause" : "ph-play"}
                className="me-2"
              />
              {subscription.isActive ? "Pasif Yap" : "Aktif Yap"}
            </button>

            <div className="border-top border-neutral-30 my-1"></div>

            <button
              className="d-flex align-items-center w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 text-danger"
              onClick={() =>
                handleDropdownItemClick(() => onDelete?.(subscription))
              }
            >
              <Icon icon="ph-trash" className="me-2" />
              Sil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
