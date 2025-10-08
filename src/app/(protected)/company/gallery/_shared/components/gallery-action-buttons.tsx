"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components";
import { GalleryActionButtonsProps } from "../types";

export const GalleryActionButtons: React.FC<GalleryActionButtonsProps> = ({
  gallery,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  onDuplicate,
  onViewGallery,
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
      <div title="Galeriyi Görüntüle">
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-eye"
          onClick={() => onViewGallery?.(gallery)}
        >
          <span className="d-none d-md-inline">Görüntüle</span>
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
                handleDropdownItemClick(() => onViewDetails?.(gallery))
              }
            >
              <i className="ph ph-info text-sm" />
              <span className="text-sm">Detayları Görüntüle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() => handleDropdownItemClick(() => onEdit?.(gallery))}
            >
              <i className="ph ph-pencil-simple text-sm" />
              <span className="text-sm">Düzenle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onDuplicate?.(gallery))
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
                handleDropdownItemClick(() => onToggleStatus?.(gallery))
              }
            >
              <i
                className={`ph ${
                  gallery.isActive ? "ph-pause" : "ph-play"
                } text-sm`}
              />
              <span className="text-sm">
                {gallery.isActive ? "Pasif Yap" : "Aktif Yap"}
              </span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2 text-danger"
              onClick={() => handleDropdownItemClick(() => onDelete?.(gallery))}
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
