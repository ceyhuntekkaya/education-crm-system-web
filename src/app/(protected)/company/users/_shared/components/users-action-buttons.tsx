"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components";
import { UsersActionButtonsProps } from "../types";

export const UsersActionButtons: React.FC<UsersActionButtonsProps> = ({
  user,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  onResetPassword,
  onViewProfile,
  onSendInvitation,
  onManageRoles,
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
      <div title="Profili Görüntüle">
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-user"
          onClick={() => onViewProfile?.(user)}
        >
          <span className="d-none d-md-inline">Profil</span>
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
              onClick={() =>
                handleDropdownItemClick(() => onViewDetails?.(user))
              }
            >
              <i className="ph ph-info text-sm" />
              <span className="text-sm">Detayları Görüntüle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() => handleDropdownItemClick(() => onEdit?.(user))}
            >
              <i className="ph ph-pencil-simple text-sm" />
              <span className="text-sm">Düzenle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onManageRoles?.(user))
              }
            >
              <i className="ph ph-user-gear text-sm" />
              <span className="text-sm">Rolleri Yönet</span>
            </button>

            <hr className="my-1 border-neutral-100" />

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onResetPassword?.(user))
              }
            >
              <i className="ph ph-key text-sm" />
              <span className="text-sm">Şifre Sıfırla</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onSendInvitation?.(user))
              }
            >
              <i className="ph ph-envelope text-sm" />
              <span className="text-sm">Davetiye Gönder</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onToggleStatus?.(user))
              }
            >
              <i
                className={`ph ${
                  user.isActive ? "ph-pause" : "ph-play"
                } text-sm`}
              />
              <span className="text-sm">
                {user.isActive ? "Pasif Yap" : "Aktif Yap"}
              </span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2 text-danger"
              onClick={() => handleDropdownItemClick(() => onDelete?.(user))}
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
