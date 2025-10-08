"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components";
import { AppointmentActionButtonsProps } from "../types";

export const AppointmentActionButtons: React.FC<
  AppointmentActionButtonsProps
> = ({
  appointment,
  onViewDetails,
  onEdit,
  onComplete,
  onCancel,
  onReschedule,
  onAddNote,
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
          onClick={() => onViewDetails?.(appointment)}
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
            style={{ minWidth: "200px" }}
          >
            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onEdit?.(appointment))
              }
            >
              <i className="ph ph-pencil-simple text-sm" />
              <span className="text-sm">Düzenle</span>
            </button>

            {appointment.canComplete && (
              <button
                type="button"
                className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2 text-success"
                onClick={() =>
                  handleDropdownItemClick(() => onComplete?.(appointment))
                }
              >
                <i className="ph ph-check-circle text-sm" />
                <span className="text-sm">Tamamla</span>
              </button>
            )}

            {appointment.canReschedule && (
              <button
                type="button"
                className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
                onClick={() =>
                  handleDropdownItemClick(() => onReschedule?.(appointment))
                }
              >
                <i className="ph ph-calendar-x text-sm" />
                <span className="text-sm">Yeniden Planla</span>
              </button>
            )}

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onAddNote?.(appointment))
              }
            >
              <i className="ph ph-note-pencil text-sm" />
              <span className="text-sm">Not Ekle</span>
            </button>

            <hr className="my-1 border-neutral-100" />

            {appointment.canCancel && (
              <button
                type="button"
                className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2 text-danger"
                onClick={() =>
                  handleDropdownItemClick(() => onCancel?.(appointment))
                }
              >
                <i className="ph ph-x-circle text-sm" />
                <span className="text-sm">İptal Et</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
