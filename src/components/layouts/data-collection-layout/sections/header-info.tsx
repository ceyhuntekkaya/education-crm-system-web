"use client";

import React from "react";
import type { ActionButton } from "../types";

interface HeaderLeftInfoProps {
  title: string;
  subtitle?: string;
  totalCount?: number;
  icon?: string;
}

/**
 * 📝 HEADER LEFT INFO
 * Header sol taraf bilgileri
 */
export const HeaderLeftInfo: React.FC<HeaderLeftInfoProps> = ({
  title,
  subtitle,
  totalCount,
  icon,
}) => {
  // Determine count label based on title
  const getCountLabel = () => {
    if (title?.includes("İlan")) return "ilan";
    if (title?.includes("Kalem")) return "kalem";
    return "kayıt";
  };

  const countLabel = getCountLabel();

  // Determine icon class based on icon format
  // Icon prop can come with prefix (bi-clipboard-check) or without (clipboard-check)
  const getIconClass = () => {
    if (!icon) return "";
    // If icon already has prefix, use it directly
    if (icon.startsWith("bi-")) {
      return icon; // Already has bi- prefix
    }
    if (icon.startsWith("ph-")) {
      return `ph-bold ${icon}`;
    }
    // If no prefix, assume it's phosphor and add ph-bold
    return `ph-bold ph-${icon}`;
  };

  const iconClass = getIconClass();
  const iconForCount = icon || "ph-package";

  return (
    <div className="d-flex align-items-center gap-12 flex-grow-1">
      {icon && (
        <div
          className="d-flex align-items-center justify-content-center rounded-8 bg-primary-100"
          style={{ width: "48px", height: "48px" }}
        >
          <i className={`${iconClass} text-primary-700`} style={{ fontSize: "24px" }} />
        </div>
      )}
      <div className="flex-grow-1 min-w-0">
        <h5 className="mb-4 fw-semibold text-neutral-900">{title}</h5>
        {typeof totalCount === "number" && (
          <div className="d-flex align-items-center gap-8">
            <span className="text-neutral-600 text-xs fw-medium">
              {subtitle || "Toplam"}
            </span>
            <span className="d-inline-flex align-items-center gap-6 text-xs text-neutral-700 bg-neutral-50 px-10 py-6 rounded-8 fw-medium">
              <i className={`${iconForCount.startsWith("bi-") ? iconForCount : iconForCount.startsWith("ph-") ? `ph-bold ${iconForCount}` : `ph-bold ph-${iconForCount}`} text-xs`} />
              {totalCount} {countLabel}
            </span>
          </div>
        )}
        {typeof totalCount !== "number" && subtitle && (
          <div className="d-flex align-items-center gap-8">
            <span className="text-neutral-600 text-xs fw-medium">{subtitle}</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface HeaderActionButtonsProps {
  buttons: ActionButton[];
}

/**
 * 🎯 HEADER ACTION BUTTONS
 * Header sağ taraf aksiyon butonları
 */
export const HeaderActionButtons: React.FC<HeaderActionButtonsProps> = ({
  buttons,
}) => {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className="d-flex align-items-center gap-8">
      {buttons.map((button, index) => {
        // Determine icon class based on icon format
        // Icon prop can come with prefix (bi-plus-lg) or without (plus-lg)
        const getIconClass = () => {
          if (!button.icon) return "";
          // If icon already has prefix, use it directly
          if (button.icon.startsWith("bi-")) {
            return button.icon; // Already has bi- prefix
          }
          if (button.icon.startsWith("ph-")) {
            return `ph-bold ${button.icon}`;
          }
          // If no prefix, assume it's phosphor and add ph-bold
          return `ph-bold ph-${button.icon}`;
        };

        const iconClass = getIconClass();
        const isPrimary = !button.variant || button.variant === "primary";

        return (
          <button
            key={index}
            type="button"
            onClick={button.onClick}
            disabled={button.disabled}
            className={`d-flex align-items-center gap-8 transition-all rounded-12 border-0 ${
              isPrimary
                ? "bg-primary-600 text-white fw-semibold"
                : `btn btn-${button.variant}`
            }`}
            style={{
              fontSize: "13px",
              height: "40px",
              padding: "0 16px",
              boxShadow: isPrimary
                ? "0 2px 8px rgba(99, 102, 241, 0.25)"
                : undefined,
              cursor: button.disabled ? "not-allowed" : "pointer",
              opacity: button.disabled ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!button.disabled && isPrimary) {
                e.currentTarget.style.backgroundColor = "hsl(var(--primary-700))";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(99, 102, 241, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (!button.disabled && isPrimary) {
                e.currentTarget.style.backgroundColor = "hsl(var(--primary-600))";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(99, 102, 241, 0.25)";
              }
            }}
            aria-label={button.label}
          >
            {button.icon && (
              <i className={iconClass} style={{ fontSize: "18px" }} />
            )}
            <span className="d-none d-lg-inline">{button.label}</span>
          </button>
        );
      })}
    </div>
  );
};
