"use client";

import React from "react";
import { ModalHeaderProps } from "../types";
import Icon from "../../icon";
import { useModalContext } from "../contexts";

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

  // Modal context'ten props'lara erişim
  const modalContext = useModalContext();

  // onClose önceliği: prop > context > undefined
  const handleClose = onClose || modalContext.onClose;

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

      {showCloseButton && handleClose && (
        <Icon
          icon="ph-x"
          variant="inline"
          size="md"
          onClick={handleClose}
          aria-label="Modalı Kapat"
          className="modal-close-button"
          style={{
            cursor: "pointer",
          }}
        />
      )}
    </div>
  );
};
