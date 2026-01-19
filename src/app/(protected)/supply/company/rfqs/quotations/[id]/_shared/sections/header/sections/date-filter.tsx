"use client";

import React from "react";
import { useRFQQuotationsContext } from "../../../contexts";
import { Popover } from "@/components/ui/popover";
import { FilterButton } from "../components";

/**
 * 📅 DATE FILTER
 * Tarih aralığı filtresi bileşeni (Geçerlilik tarihi için)
 */
export const DateFilter: React.FC = () => {
  const { filters, filterHandlers } = useRFQQuotationsContext();
  const hasDateFilter = filters.validFrom || filters.validTo;

  const getDateLabel = () => {
    if (!hasDateFilter) return "Tarih Aralığı";

    if (filters.validFrom && filters.validTo) {
      const from = new Date(filters.validFrom).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
      });
      const to = new Date(filters.validTo).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
      });
      return `${from} - ${to}`;
    }

    if (filters.validFrom) {
      const from = new Date(filters.validFrom).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
      });
      return `${from}'dan itibaren`;
    }

    if (filters.validTo) {
      const to = new Date(filters.validTo).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "short",
      });
      return `${to}'e kadar`;
    }
  };

  const dropdownContent = (
    <div style={{ minWidth: "240px" }}>
      <div className="px-6 py-8">
        <label
          className="d-block text-neutral-700 mb-4"
          style={{ fontSize: "10px", fontWeight: 600 }}
        >
          Başlangıç Tarihi
        </label>
        <input
          type="date"
          className="form-control"
          value={filters.validFrom || ""}
          onChange={(e) =>
            filterHandlers.setValidFrom(e.target.value || undefined)
          }
          style={{
            padding: "4px 8px",
            fontSize: "11px",
            borderRadius: "6px",
            border: "1px solid hsl(var(--neutral-40))",
            height: "28px",
          }}
        />
      </div>

      <div className="px-6 pb-8">
        <label
          className="d-block text-neutral-700 mb-4"
          style={{ fontSize: "10px", fontWeight: 600 }}
        >
          Bitiş Tarihi
        </label>
        <input
          type="date"
          className="form-control"
          value={filters.validTo || ""}
          onChange={(e) =>
            filterHandlers.setValidTo(e.target.value || undefined)
          }
          min={filters.validFrom || undefined}
          style={{
            padding: "4px 8px",
            fontSize: "11px",
            borderRadius: "6px",
            border: "1px solid hsl(var(--neutral-40))",
            height: "28px",
          }}
        />
      </div>

      {hasDateFilter && (
        <div
          className="px-6 pb-6 pt-2"
          style={{ borderTop: "1px solid hsl(var(--neutral-40))" }}
        >
          <button
            type="button"
            className="w-100 d-flex align-items-center justify-content-center gap-6 transition-all rounded-8"
            onClick={() => {
              filterHandlers.setValidFrom(undefined);
              filterHandlers.setValidTo(undefined);
            }}
            style={{
              padding: "6px",
              background: "transparent",
              border: "1px solid hsl(var(--neutral-40))",
              color: "hsl(var(--neutral-700))",
              fontSize: "11px",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "hsl(var(--neutral-100))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <i className="ph-bold ph-x" style={{ fontSize: "12px" }} />
            <span>Temizle</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <Popover
      content={dropdownContent}
      placement="bottom-start"
      trigger="click"
      showArrow={false}
      offset={6}
    >
      <FilterButton
        label={getDateLabel() || "Tarih Aralığı"}
        icon="ph-calendar-blank"
        isActive={!!hasDateFilter}
        activeColor="#10b981"
        activeBackground="rgba(16, 185, 129, 0.1)"
        style={{ minWidth: "140px" }}
      />
    </Popover>
  );
};
