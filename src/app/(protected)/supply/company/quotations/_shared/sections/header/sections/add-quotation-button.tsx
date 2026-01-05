"use client";

import React from "react";
import Link from "next/link";

/**
 * ➕ ADD QUOTATION BUTTON
 * Yeni alım ilanı ekleme butonu
 */
export const AddQuotationButton: React.FC = () => {
  return (
    <Link
      href="/supply/company/quotations/add-edit/new"
      className="d-flex align-items-center gap-8 border-0 transition-all rounded-12 bg-primary-600 text-white text-decoration-none fw-semibold"
      style={{
        fontSize: "13px",
        height: "40px",
        padding: "0 16px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(99, 102, 241, 0.25)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "hsl(var(--primary-700))";
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "hsl(var(--primary-600))";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(99, 102, 241, 0.25)";
      }}
    >
      <i className="ph-bold ph-plus-circle" style={{ fontSize: "18px" }}></i>
      <span className="d-none d-lg-inline">Yeni İlan Ekle</span>
    </Link>
  );
};
