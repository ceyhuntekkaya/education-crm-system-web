"use client";

import React from "react";
import { ModalHeaderProps } from "./types";

/**
 * Modal Header Component
 * Modal'ın başlık bölümünü render eder
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  children,
  showCloseButton = true,
  onClose,
  className = "",
  headingLevel = "h4",
}) => {
  const HeadingTag = headingLevel;

  return (
    <div
      className={`modal-header ${className}`}
      style={{
        padding: "24px 32px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "72px",
      }}
    >
      <div className="modal-header-content">
        {title ? (
          <HeadingTag
            className="modal-title text-heading mb-0"
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              margin: 0,
              color: "#1f2937",
            }}
          >
            {title}
          </HeadingTag>
        ) : (
          children
        )}
      </div>

      {showCloseButton && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="modal-close-button"
          aria-label="Modalı Kapat"
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            transition: "color 0.2s ease",
            minWidth: "40px",
            minHeight: "40px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#374151";
            e.currentTarget.style.backgroundColor = "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6b7280";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <i className="ph ph-x" />
        </button>
      )}
    </div>
  );
};
