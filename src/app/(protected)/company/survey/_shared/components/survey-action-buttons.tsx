"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components";
import { SurveyActionButtonsProps } from "../types";

export const SurveyActionButtons: React.FC<SurveyActionButtonsProps> = ({
  survey,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete,
  onDuplicate,
  onViewSurvey,
  onViewResults,
  onSendSurvey,
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
      <div title="Anketi Görüntüle">
        <Button
          variant="outline"
          size="xs"
          leftIcon="ph-eye"
          onClick={() => onViewSurvey?.(survey)}
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
                handleDropdownItemClick(() => onViewDetails?.(survey))
              }
            >
              <i className="ph ph-info text-sm" />
              <span className="text-sm">Detayları Görüntüle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onViewResults?.(survey))
              }
            >
              <i className="ph ph-chart-bar text-sm" />
              <span className="text-sm">Sonuçları Görüntüle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() => handleDropdownItemClick(() => onEdit?.(survey))}
            >
              <i className="ph ph-pencil-simple text-sm" />
              <span className="text-sm">Düzenle</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onDuplicate?.(survey))
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
                handleDropdownItemClick(() => onSendSurvey?.(survey))
              }
            >
              <i className="ph ph-paper-plane-tilt text-sm" />
              <span className="text-sm">Anket Gönder</span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2"
              onClick={() =>
                handleDropdownItemClick(() => onToggleStatus?.(survey))
              }
            >
              <i
                className={`ph ${
                  survey.isActive ? "ph-pause" : "ph-play"
                } text-sm`}
              />
              <span className="text-sm">
                {survey.isActive ? "Pasif Yap" : "Aktif Yap"}
              </span>
            </button>

            <button
              type="button"
              className="d-flex align-items-center gap-2 w-100 px-3 py-2 border-0 bg-transparent text-start hover-bg-neutral-25 transition-2 text-danger"
              onClick={() => handleDropdownItemClick(() => onDelete?.(survey))}
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
