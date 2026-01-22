import React from "react";
import { Badge } from "@/components";
import { QuotationDto } from "@/types";
import { DetailColumn } from "@/components/layouts/detail-layout/types";
import {
  getStatusConfig,
  formatCurrency,
  formatQuotationDate,
} from "@/app/(protected)/supply/supplier/quotations/_shared/utils";

// Column render helper functions
const renderBasicInfo = (quotation: QuotationDto) => {
  return (
    <div className="quotation-detail-page__info-section">
      {/* Başlık ve Durum */}
      <div className="quotation-detail-page__title-section">
        <div
          className="quotation-detail-page__badges"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Badge
              variant={
                quotation.status === "DRAFT"
                  ? "secondary"
                  : quotation.status === "SUBMITTED"
                    ? "info"
                    : quotation.status === "UNDER_REVIEW"
                      ? "warning"
                      : quotation.status === "ACCEPTED"
                        ? "success"
                        : quotation.status === "REJECTED"
                          ? "danger"
                          : "secondary"
              }
              size="sm"
            >
              {getStatusConfig(quotation.status).text}
            </Badge>
            {quotation.versionNumber && (
              <Badge variant="secondary" size="sm">
                v{quotation.versionNumber}
              </Badge>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <h1 className="quotation-detail-page__title mb-0">
            {quotation.rfqTitle || "Teklif Başlığı"}
          </h1>
        </div>
      </div>
    </div>
  );
};

// Main column definitions
export const createQuotationDetailColumns =
  (): DetailColumn<QuotationDto>[] => [
    // Info Section - En üstte
    {
      field: "basicInfo",
      headerName: "Temel Bilgiler",
      section: "info",
      icon: "ph-bold ph-info",
      iconColor: "text-primary-700",
      width: 100,
      order: 0,
      renderCell: renderBasicInfo,
    },
    // Meta Section - Numeric metrics
    {
      field: "itemCount",
      headerName: "Kalem Sayısı",
      section: "meta",
      icon: "ph-bold ph-package",
      iconColor: "text-primary-700",
      width: 50,
      order: 1,
      url: (quotation) => `/supply/supplier/quotations/items/${quotation.id}`,
    },

    // Dates Section - Yan yana
    {
      field: "validUntil",
      headerName: "Geçerlilik Tarihi",
      section: "dates",
      icon: "ph-bold ph-calendar-check",
      iconColor: "text-warning-700",
      width: 100,
      grid: 6, // Yan yana göster
      order: 2,
      condition: (quotation) => !!quotation.validUntil,
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma Tarihi",
      section: "dates",
      icon: "ph-bold ph-clock",
      iconColor: "text-neutral-700",
      width: 100,
      grid: 6, // Yan yana göster
      order: 3,
      condition: (quotation) => !!quotation.createdAt,
    },

    // Details Section - En altta
    {
      field: "totalAmount",
      headerName: "Toplam Tutar",
      section: "details",
      icon: "ph-bold ph-currency-dollar",
      iconColor: "text-success-700",
      width: 100,
      order: 5,
      renderCell: (quotation) => (
        <span className="fw-bold text-success-700">
          {formatCurrency(quotation.totalAmount, quotation.currency)}
        </span>
      ),
    },
    {
      field: "deliveryDays",
      headerName: "Teslimat Süresi",
      section: "details",
      icon: "ph-bold ph-truck",
      iconColor: "text-info-700",
      width: 100,
      order: 6,
      renderCell: (quotation) => (
        <span>
          {quotation.deliveryDays ? `${quotation.deliveryDays} gün` : "-"}
        </span>
      ),
    },
    {
      field: "paymentTerms",
      headerName: "Ödeme Koşulları",
      section: "details",
      icon: "ph-bold ph-coins",
      iconColor: "text-success-700",
      width: 100,
      order: 7,
      condition: (quotation) => !!quotation.paymentTerms,
    },
    {
      field: "warrantyTerms",
      headerName: "Garanti Koşulları",
      section: "details",
      icon: "ph-bold ph-shield-check",
      iconColor: "text-info-700",
      width: 100,
      order: 8,
      condition: (quotation) => !!quotation.warrantyTerms,
    },
    {
      field: "notes",
      headerName: "Notlar",
      section: "details",
      icon: "ph-bold ph-note",
      iconColor: "text-neutral-700",
      width: 100,
      order: 9,
      condition: (quotation) => !!quotation.notes,
    },

    // Rating Section - En sonda
    {
      field: "averageRating",
      headerName: "Değerlendirme",
      section: "rating",
      icon: "ph-fill ph-star",
      iconColor: "text-warning-700",
      width: 100,
      grid: 12,
      order: 10,
      condition: (quotation) => !!quotation.averageRating,
    },
  ];

// Helper function to get filtered columns based on Quotation data and section
export const getFilteredColumns = (
  quotation: QuotationDto,
  section?: DetailColumn<QuotationDto>["section"],
): DetailColumn<QuotationDto>[] => {
  const allColumns = createQuotationDetailColumns();

  let filteredColumns = allColumns.filter((column) => {
    if (section && column.section !== section) return false;
    if (column.condition && !column.condition(quotation)) return false;
    return true;
  });

  // Sort by order
  filteredColumns.sort((a, b) => (a.order || 0) - (b.order || 0));

  return filteredColumns;
};

// Helper function to get sections
export const getSections = (quotation: QuotationDto) => {
  const allColumns = createQuotationDetailColumns();
  const sections = new Set(
    allColumns
      .filter((column) => !column.condition || column.condition(quotation))
      .map((column) => column.section),
  );

  return Array.from(sections);
};
