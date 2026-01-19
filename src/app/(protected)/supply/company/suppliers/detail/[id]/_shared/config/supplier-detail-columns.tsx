import React from "react";
import { Badge } from "@/components";
import { SupplierDto } from "@/types";
import { DetailColumn } from "@/components/layouts/detail-layout/types";
import {
  getSupplierStatusConfig,
  getStarRating,
} from "../utils/supplier-detail.utils";

// Column render helper functions
const renderBasicInfo = (supplier: SupplierDto) => {
  const statusConfig = getSupplierStatusConfig(supplier.isActive);
  const rating = getStarRating(supplier.averageRating);

  return (
    <div className="supplier-detail-page__info-section">
      {/* Başlık ve Durum */}
      <div className="supplier-detail-page__title-section">
        <div
          className="supplier-detail-page__badges"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Badge variant={statusConfig.variant} size="sm">
              <i className={`${statusConfig.icon} me-1`}></i>
              {statusConfig.text}
            </Badge>
            {supplier.averageRating && (
              <Badge variant="warning" size="sm">
                <i className="ph-fill ph-star me-1"></i>
                {rating}
              </Badge>
            )}
          </div>
        </div>

        <h1 className="supplier-detail-page__title mb-0">
          {supplier.companyName || "Tedarikçi Adı"}
        </h1>
      </div>
    </div>
  );
};

// Main column definitions
export const createSupplierDetailColumns = (): DetailColumn<SupplierDto>[] => [
  // Info Section - En üstte
  {
    field: "basicInfo",
    headerName: "Temel Bilgiler",
    section: "info",
    icon: "ph-bold ph-info",
    iconColor: "text-primary-700",
    order: 0, // En üstte olsun
    renderCell: renderBasicInfo,
  },

  // Meta Section - İletişim Bilgileri
  {
    field: "email",
    headerName: "E-posta",
    section: "meta",
    icon: "ph-bold ph-envelope",
    iconColor: "text-primary-700",
    width: 50,
    order: 1,
    url: (supplier) => (supplier.email ? `mailto:${supplier.email}` : null),
    condition: (supplier) => !!supplier.email,
  },
  {
    field: "phone",
    headerName: "Telefon",
    section: "meta",
    icon: "ph-bold ph-phone",
    iconColor: "text-success-700",
    width: 50,
    order: 2,
    url: (supplier) => (supplier.phone ? `tel:${supplier.phone}` : null),
    condition: (supplier) => !!supplier.phone,
  },
  {
    field: "taxNumber",
    headerName: "Vergi Numarası",
    section: "meta",
    icon: "ph-bold ph-identification-card",
    iconColor: "text-info-700",
    width: 50,
    order: 3,
    condition: (supplier) => !!supplier.taxNumber,
  },

  // Details Section
  {
    field: "description",
    headerName: "Firma Hakkında",
    section: "details",
    icon: "ph-bold ph-note",
    iconColor: "text-primary-700",
    order: 4,
    grid: 6,
    condition: (supplier) => !!supplier.description,
  },
  {
    field: "address",
    headerName: "Adres",
    section: "details",
    icon: "ph-bold ph-map-pin",
    iconColor: "text-warning-700",
    order: 5,
    grid: 6,
    condition: (supplier) => !!supplier.address,
  },
  // Dates Section
  {
    field: "createdAt",
    headerName: "Kayıt Tarihi",
    section: "dates",
    icon: "ph-bold ph-calendar",
    iconColor: "text-neutral-700",
    grid: 6,
    order: 6,
    condition: (supplier) => !!supplier.createdAt,
  },
  {
    field: "updatedAt",
    headerName: "Son Güncelleme",
    section: "dates",
    icon: "ph-bold ph-calendar-check",
    iconColor: "text-neutral-700",
    grid: 6,
    order: 7,
    condition: (supplier) => !!supplier.updatedAt,
  },
  // Rating Section
  {
    field: "averageRating",
    headerName: "Değerlendirme Puanı",
    section: "rating",
    icon: "ph-fill ph-star",
    iconColor: "text-warning-700",
    order: 8,
    condition: (supplier) => !!supplier.averageRating,
  },
];

// Helper function to get filtered columns based on Supplier data and section
export const getFilteredColumns = (
  supplier: SupplierDto,
  section?: DetailColumn<SupplierDto>["section"]
): DetailColumn<SupplierDto>[] => {
  const allColumns = createSupplierDetailColumns();

  let filteredColumns = allColumns.filter((column) => {
    if (section && column.section !== section) return false;
    if (column.condition && !column.condition(supplier)) return false;
    return true;
  });

  // Sort by order
  filteredColumns.sort((a, b) => (a.order || 0) - (b.order || 0));

  return filteredColumns;
};

// Helper function to get sections
export const getSections = (supplier: SupplierDto) => {
  const allColumns = createSupplierDetailColumns();
  const sections = new Set(
    allColumns
      .filter((column) => !column.condition || column.condition(supplier))
      .map((column) => column.section)
  );

  return Array.from(sections);
};
