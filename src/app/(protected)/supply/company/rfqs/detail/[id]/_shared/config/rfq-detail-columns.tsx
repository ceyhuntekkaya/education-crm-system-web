import React from "react";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import { RFQDto } from "@/types/dto/supply/rfq.dto";
import { DetailColumn } from "@/components/layouts/detail-layout/types";
import { RFQActionButtons } from "../sections/rfq-action-buttons";
import { SendSupplierMessageSection } from "../sections/send-supplier-message-section/send-supplier-message-section";
import {
  getRFQStatusBadgeVariant,
  getRFQStatusConfig,
  getRFQTypeDisplay,
  getRFQTypeBadgeVariant,
} from "../../../../_shared/utils";

// Column render helper functions
const renderBasicInfo = (rfq: RFQDto) => (
  <div className="rfq-detail-page__info-section">
    {/* Başlık ve Durum */}
    <div className="rfq-detail-page__title-section">
      <div
        className="rfq-detail-page__badges"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Badge variant={getRFQTypeBadgeVariant(rfq.rfqType)} size="sm">
            {getRFQTypeDisplay(rfq.rfqType)}
          </Badge>
          <Badge variant={getRFQStatusBadgeVariant(rfq.status)} size="sm">
            {getRFQStatusConfig(rfq.status).text}
          </Badge>
        </div>
        <div className="d-flex gap-8">
          <RFQActionButtons />
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
        <h1 className="rfq-detail-page__title mb-0">
          {rfq.title || "Alım İlanı Başlığı"}
        </h1>

        {/* Tedarikçiye Mesaj Gönder */}
        <div style={{ flexShrink: 0 }}>
          <SendSupplierMessageSection variant="card" />
        </div>
      </div>
    </div>
  </div>
);

// Main column definitions
export const createRFQDetailColumns = (): DetailColumn<RFQDto>[] => [
  // Info Section - En üstte
  {
    field: "basicInfo",
    headerName: "Temel Bilgiler",
    section: "info",
    icon: "ph-bold ph-info",
    iconColor: "text-primary-700",
    width: 100,
    order: 0, // En üstte olsun
    renderCell: renderBasicInfo,
  },
  // Meta Section - Info'dan sonra
  {
    field: "itemCount",
    headerName: "Kalem Sayısı",
    section: "meta",
    icon: "ph-bold ph-package",
    iconColor: "text-primary-700",
    width: 50,
    order: 1,
    url: (rfq) => `/supply/company/rfqs/items/${rfq.id}`,
  },
  {
    field: "quotationCount",
    headerName: "Teklif Sayısı",
    section: "meta",
    icon: "ph-bold ph-file-text",
    iconColor: "text-success-700",
    width: 50,
    order: 2,
    url: (rfq) => `/supply/company/rfqs/quotations/${rfq.id}`,
  },
  {
    field: "invitationCount",
    headerName: "Davet Sayısı",
    section: "meta",
    icon: "ph-bold ph-users",
    iconColor: "text-info-700",
    width: 50,
    order: 3,
    url: (rfq) =>
      rfq.invitationCount && rfq.invitationCount > 0
        ? `/supply/company/rfqs/invited-suppliers/${rfq.id}`
        : null,
    condition: (rfq) =>
      rfq.rfqType === "INVITED" && (rfq.invitationCount ?? 0) > 0,
  },

  // Dates Section
  {
    field: "submissionDeadline",
    headerName: "Son Başvuru Tarihi",
    section: "dates",
    icon: "ph-bold ph-calendar-check",
    iconColor: "text-warning-700",
    width: 100,
    grid: 6, // Bootstrap grid: col-6
    order: 4,
    condition: (rfq) => !!rfq.submissionDeadline,
  },
  {
    field: "expectedDeliveryDate",
    headerName: "Beklenen Teslimat",
    section: "dates",
    icon: "ph-bold ph-truck",
    iconColor: "text-success-700",
    width: 100,
    grid: 6, // Bootstrap grid: col-6
    order: 5,
    condition: (rfq) => !!rfq.expectedDeliveryDate,
  },

  // Details Section - En altta
  {
    field: "description",
    headerName: "Açıklama",
    section: "details",
    icon: "ph-bold ph-note",
    iconColor: "text-primary-700",
    width: 100,
    order: 6,
    condition: (rfq) => !!rfq.description,
  },
  {
    field: "paymentTerms",
    headerName: "Ödeme Koşulları",
    section: "details",
    icon: "ph-bold ph-credit-card",
    iconColor: "text-success-700",
    width: 100,
    order: 7,
    condition: (rfq) => !!rfq.paymentTerms,
  },
  {
    field: "evaluationCriteria",
    headerName: "Değerlendirme Kriterleri",
    section: "details",
    icon: "ph-bold ph-check-square",
    iconColor: "text-warning-700",
    width: 100,
    order: 8,
    condition: (rfq) => !!rfq.evaluationCriteria,
  },
  {
    field: "technicalRequirements",
    headerName: "Teknik Gereksinimler",
    section: "details",
    icon: "ph-bold ph-wrench",
    iconColor: "text-danger-700",
    width: 100,
    order: 9,
    condition: (rfq) => !!rfq.technicalRequirements,
  },
];

// Helper function to get filtered columns based on RFQ data and section
export const getFilteredColumns = (
  rfq: RFQDto,
  section?: DetailColumn<RFQDto>["section"]
): DetailColumn<RFQDto>[] => {
  const allColumns = createRFQDetailColumns();

  let filteredColumns = allColumns.filter((column) => {
    if (section && column.section !== section) return false;
    if (column.condition && !column.condition(rfq)) return false;
    return true;
  });

  // Sort by order
  filteredColumns.sort((a, b) => (a.order || 0) - (b.order || 0));

  return filteredColumns;
};

// Helper function to get sections
export const getSections = (rfq: RFQDto) => {
  const allColumns = createRFQDetailColumns();
  const sections = new Set(
    allColumns
      .filter((column) => !column.condition || column.condition(rfq))
      .map((column) => column.section)
  );

  return Array.from(sections);
};
