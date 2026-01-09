"use client";

import React from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * 📭 EMPTY STATE
 * Veri bulunamadı durumu
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Sonuç Bulunamadı",
  description = "Aradığınız kriterlere uygun sonuç bulunamadı.",
  icon = "bi-inbox",
  action,
}) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center bg-white rounded-16 py-64"
      style={{
        border: "1.5px solid hsl(var(--neutral-40))",
        minHeight: "400px",
      }}
    >
      <div
        className="d-flex align-items-center justify-content-center rounded-circle bg-neutral-50 mb-24"
        style={{
          width: "80px",
          height: "80px",
        }}
      >
        <i
          className={`bi ${icon} text-neutral-400`}
          style={{ fontSize: "40px" }}
        />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-8">{title}</h3>
      <p
        className="text-md text-neutral-600 mb-24 text-center"
        style={{ maxWidth: "400px" }}
      >
        {description}
      </p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="btn btn-primary px-24 py-12"
          style={{
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
