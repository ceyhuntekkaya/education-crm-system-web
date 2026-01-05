import React, { forwardRef } from "react";
import { useResponsive } from "@/hooks/use-responsive";

interface SortButtonProps {
  label: string;
  icon: string;
  sortOrder: "asc" | "desc";
  onToggleOrder: () => void;
  onReset: () => void;
  isActive: boolean;
}

/**
 * 🔽 SORT BUTTON
 * Sıralama butonu - dropdown trigger + order toggle + reset
 */
export const SortButton = forwardRef<HTMLDivElement, SortButtonProps>(
  (
    { label, icon, sortOrder, onToggleOrder, onReset, isActive, ...props },
    ref
  ) => {
    const { width } = useResponsive();
    const showLabel = width >= 1500; // MacBook Air ve küçük laptop ekranlarında sadece icon
    return (
      <div
        ref={ref}
        className="rounded-16 d-flex align-items-center"
        style={{
          padding: "2px",
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(17, 24, 39, 0.06)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          gap: "2px",
        }}
        {...props}
      >
        {/* Main Sort Dropdown Trigger */}
        <button
          type="button"
          className="d-flex align-items-center gap-8 transition-all rounded-12 bg-transparent text-neutral-700 fw-medium"
          style={{
            fontSize: "11px",
            height: "32px",
            padding: "0 8px",
            flex: showLabel ? 1 : "0 0 auto",
            border: "none",
            maxWidth: showLabel ? "160px" : "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "hsl(var(--neutral-100))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <i
            className={`ph-duotone ${icon}`}
            style={{ fontSize: "16px", flexShrink: 0 }}
          />
          {showLabel && (
            <span
              className="flex-grow-1 text-start"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          )}
          <i
            className="ph-bold ph-caret-down text-neutral-500"
            style={{ fontSize: "12px", flexShrink: 0 }}
          />
        </button>

        {/* Sort Order Toggle - Only visible when active */}
        {isActive && (
          <>
            <button
              type="button"
              className="d-flex align-items-center justify-content-center transition-all rounded-10"
              onClick={(e) => {
                e.stopPropagation();
                onToggleOrder();
              }}
              title={sortOrder === "asc" ? "Artan Sıralama" : "Azalan Sıralama"}
              style={{
                height: "24px",
                width: "24px",
                border: "1px solid rgba(17, 24, 39, 0.08)",
                background: "transparent",
                color: "hsl(var(--primary-600))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "hsl(var(--primary-50))";
                e.currentTarget.style.color = "hsl(var(--primary-700))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--primary-600))";
              }}
            >
              <i
                className={`ph-bold ${
                  sortOrder === "asc" ? "ph-arrow-up" : "ph-arrow-down"
                }`}
                style={{ fontSize: "12px" }}
              />
            </button>

            {/* Reset Button */}
            <button
              type="button"
              className="d-flex align-items-center justify-content-center transition-all rounded-10"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              title="Sıralamayı Sıfırla"
              style={{
                height: "24px",
                width: "24px",
                border: "1px solid rgba(17, 24, 39, 0.08)",
                background: "transparent",
                color: "hsl(var(--neutral-500))",
                marginRight: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(239, 68, 68, 0.08)";
                e.currentTarget.style.color = "#ef4444";
                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "hsl(var(--neutral-500))";
                e.currentTarget.style.borderColor = "rgba(17, 24, 39, 0.08)";
              }}
            >
              <i className="ph-bold ph-x" style={{ fontSize: "11px" }} />
            </button>
          </>
        )}
      </div>
    );
  }
);

SortButton.displayName = "SortButton";
