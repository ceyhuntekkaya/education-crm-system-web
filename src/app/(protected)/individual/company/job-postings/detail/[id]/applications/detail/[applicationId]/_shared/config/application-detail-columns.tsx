import React from "react";
import { Badge } from "@/components";
import { formatDate, renderHtml, isHtmlEmpty } from "@/utils";
import { DetailColumn } from "@/components/layouts/detail-layout/types";
import type { ApplicationDto } from "../../../../_shared/types";
import {
  getApplicationStatusBadgeVariant,
  getApplicationStatusDisplay,
  getApplicationStatusIcon,
  getEmploymentTypeDisplay,
} from "../../../../_shared/utils";

/**
 * ================================================================================
 * APPLICATION DETAIL COLUMNS (Company)
 * ================================================================================
 * Başvuru detay sayfası için kolon tanımları
 * DetailLayout bileşeni ile kullanılır
 */

// Helper function for education level display
const getEducationLevelDisplay = (level: string): string => {
  const levels: Record<string, string> = {
    HIGH_SCHOOL: "Lise",
    ASSOCIATE: "Ön Lisans",
    BACHELORS: "Lisans",
    MASTERS: "Yüksek Lisans",
    DOCTORATE: "Doktora",
  };
  return levels[level] || level;
};

// Column render helper functions
const renderBasicInfo = (application: ApplicationDto) => {
  return (
    <div className="application-detail-page__info-section">
      <div
        className="bg-white rounded-16 p-20"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(17, 24, 39, 0.06)",
        }}
      >
        {/* Header: Badge'ler */}
        <div className="d-flex align-items-start justify-content-between mb-16 gap-12 flex-wrap">
          <div className="d-flex align-items-center gap-8 flex-wrap">
            {application.isWithdrawn ? (
              <Badge variant="secondary" size="sm">
                <i className="ph-bold ph-arrow-u-up-left me-1"></i>
                Geri Çekildi
              </Badge>
            ) : (
              <Badge
                variant={getApplicationStatusBadgeVariant(application.status)}
                size="sm"
              >
                <i
                  className={`${getApplicationStatusIcon(application.status)} me-1`}
                ></i>
                {getApplicationStatusDisplay(application.status)}
              </Badge>
            )}
          </div>
          {application.jobPosting?.branch && (
            <div
              className="d-flex align-items-center gap-8 px-12 py-6 bg-primary-50 rounded-8"
              style={{ flexShrink: 0 }}
            >
              <i
                className="ph-bold ph-books text-primary-600"
                style={{ fontSize: "1.125rem" }}
              ></i>
              <span
                className="text-primary-700 fw-medium"
                style={{ fontSize: "0.9375rem" }}
              >
                {application.jobPosting.branch}
              </span>
            </div>
          )}
        </div>

        {/* Aday Bilgisi */}
        <div className="mb-12">
          <p className="text-neutral-500 text-sm mb-4">Başvuran Aday</p>
          <h1
            className="mb-0 fw-bold text-neutral-900"
            style={{ fontSize: "2rem", lineHeight: "1.2" }}
          >
            {application.teacher?.fullName || "Aday Bilgisi Yok"}
          </h1>
        </div>

        {/* Email & Branş */}
        <div className="d-flex flex-wrap gap-16">
          {application.teacher?.email && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-envelope text-neutral-600 fs-5"></i>
              <span className="text-neutral-700 fw-medium">
                {application.teacher.email}
              </span>
            </div>
          )}
          {application.teacher?.branch && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-graduation-cap text-neutral-600 fs-5"></i>
              <span className="text-neutral-700 fw-medium">
                {application.teacher.branch}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main column definitions
export const createApplicationDetailColumns = (
  documentCount?: number,
  noteCount?: number,
): DetailColumn<ApplicationDto>[] => [
  // ═══════════════════════════════════════════════════════════════════════════
  // INFO SECTION - Başvuru Bilgileri
  // ═══════════════════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════════════════
  // META SECTION - İstatistikler
  // ═══════════════════════════════════════════════════════════════════════════
  {
    field: "documentCount",
    headerName: "Belgeler",
    section: "meta",
    icon: "ph-bold ph-paperclip",
    iconColor: "text-primary-700",
    order: 10,
    renderCell: (application) => {
      const count = documentCount ?? application.documents?.length ?? 0;
      const hasDocuments = count > 0;

      return (
        <div className="d-flex align-items-center gap-12">
          <div
            className={`d-flex align-items-center justify-content-center ${hasDocuments ? "bg-primary-100" : "bg-neutral-100"}`}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              flexShrink: 0,
            }}
          >
            <i
              className={`ph-bold ph-paperclip ${hasDocuments ? "text-primary-700" : "text-neutral-500"}`}
              style={{ fontSize: "1.75rem" }}
            ></i>
          </div>
          <div>
            <p
              className="mb-2 text-neutral-600 fw-medium"
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Belgeler
            </p>
            <span
              className={`fw-bold ${hasDocuments ? "text-primary-700" : "text-neutral-700"}`}
              style={{ fontSize: "1.5rem" }}
            >
              {count}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    field: "noteCount",
    headerName: "Notlar",
    section: "meta",
    icon: "ph-bold ph-note",
    iconColor: "text-warning-700",
    order: 11,
    renderCell: (application) => {
      const count = noteCount ?? application.notes?.length ?? 0;
      const hasNotes = count > 0;

      return (
        <div className="d-flex align-items-center gap-12">
          <div
            className={`d-flex align-items-center justify-content-center ${hasNotes ? "bg-warning-100" : "bg-neutral-100"}`}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              flexShrink: 0,
            }}
          >
            <i
              className={`ph-bold ph-note ${hasNotes ? "text-warning-700" : "text-neutral-500"}`}
              style={{ fontSize: "1.75rem" }}
            ></i>
          </div>
          <div>
            <p
              className="mb-2 text-neutral-600 fw-medium"
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Notlar
            </p>
            <span
              className={`fw-bold ${hasNotes ? "text-warning-700" : "text-neutral-700"}`}
              style={{ fontSize: "1.5rem" }}
            >
              {count}
            </span>
          </div>
        </div>
      );
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DATES SECTION - Tarih bilgileri
  // ═══════════════════════════════════════════════════════════════════════════
  {
    field: "createdAt",
    headerName: "Başvuru Tarihi",
    section: "dates",
    icon: "ph-bold ph-calendar-check",
    iconColor: "text-success-700",
    grid: 6,
    order: 20,
    condition: (application) => !!application.createdAt,
    renderCell: (application) => (
      <div
        className="bg-white rounded-12 p-12 h-100"
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(17, 24, 39, 0.06)",
        }}
      >
        <div className="d-flex align-items-center gap-8 mb-8">
          <div
            className="d-flex align-items-center justify-content-center bg-success-100 text-success-700"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            <i className="ph-bold ph-calendar-check"></i>
          </div>
          <h5
            className="mb-0 fw-semibold text-neutral-900"
            style={{ fontSize: "0.875rem" }}
          >
            Başvuru Tarihi
          </h5>
        </div>
        <div style={{ paddingTop: "4px" }}>
          <span
            className="fw-bold text-neutral-900"
            style={{ fontSize: "1rem" }}
          >
            {formatDate(application.createdAt)}
          </span>
        </div>
      </div>
    ),
  },
  {
    field: "updatedAt",
    headerName: "Son Güncellenme",
    section: "dates",
    icon: "ph-bold ph-arrows-clockwise",
    iconColor: "text-neutral-700",
    grid: 6,
    order: 21,
    condition: (application) => !!application.updatedAt,
    renderCell: (application) => (
      <div
        className="bg-white rounded-12 p-12 h-100"
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(17, 24, 39, 0.06)",
        }}
      >
        <div className="d-flex align-items-center gap-8 mb-8">
          <div
            className="d-flex align-items-center justify-content-center bg-neutral-100 text-neutral-700"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            <i className="ph-bold ph-arrows-clockwise"></i>
          </div>
          <h5
            className="mb-0 fw-semibold text-neutral-900"
            style={{ fontSize: "0.875rem" }}
          >
            Son Güncellenme
          </h5>
        </div>
        <div style={{ paddingTop: "4px" }}>
          <span
            className="fw-bold text-neutral-900"
            style={{ fontSize: "1rem" }}
          >
            {formatDate(application.updatedAt)}
          </span>
        </div>
      </div>
    ),
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILS SECTION - Detaylı bilgiler
  // ═══════════════════════════════════════════════════════════════════════════

  // Pozisyon Bilgisi
  {
    field: "positionTitle",
    headerName: "Pozisyon",
    section: "details",
    icon: "ph-bold ph-briefcase",
    iconColor: "text-primary-700",
    grid: 12,
    order: 25,
    condition: (application) => !!application.jobPosting?.positionTitle,
    renderCell: (application) => (
      <span
        className="fw-bold text-primary-700"
        style={{ fontSize: "1.25rem" }}
      >
        {application.jobPosting.positionTitle}
      </span>
    ),
  },

  // Ön Yazı
  {
    field: "coverLetter",
    headerName: "Ön Yazı",
    section: "details",
    icon: "ph-bold ph-article",
    iconColor: "text-primary-700",
    grid: 12,
    order: 30,
    condition: (application) => !isHtmlEmpty(application.coverLetter),
    renderCell: (application) => (
      <div
        className="tiptap-content text-neutral-700"
        style={{
          fontSize: "0.9375rem",
          lineHeight: "1.7",
          letterSpacing: "0.01em",
        }}
        {...renderHtml(application.coverLetter)}
      />
    ),
  },

  // İstihdam Tipi
  {
    field: "employmentType",
    headerName: "İstihdam Tipi",
    section: "details",
    icon: "ph-bold ph-clock",
    iconColor: "text-info-700",
    grid: 6,
    order: 31,
    condition: (application) => !!application.jobPosting?.employmentType,
    renderCell: (application) => (
      <span className="fw-bold text-info-700" style={{ fontSize: "1rem" }}>
        {getEmploymentTypeDisplay(application.jobPosting.employmentType)}
      </span>
    ),
  },
];
