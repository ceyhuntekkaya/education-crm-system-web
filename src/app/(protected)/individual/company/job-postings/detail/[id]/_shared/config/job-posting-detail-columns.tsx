import React from "react";
import Link from "next/link";
import { Badge } from "@/components";
import { JobPostingDto } from "@/types";
import { DetailColumn } from "@/components/layouts/detail-layout/types";
import { formatDate } from "@/utils";
import {
  getStatusBadgeVariant,
  getStatusDisplay,
  getEmploymentTypeDisplay,
  getEducationLevelDisplay,
  formatSalaryRange,
} from "../../../../_shared/utils";

// Column render helper functions
const renderBasicInfo = (jobPosting: JobPostingDto) => {
  return (
    <div className="job-posting-detail-page__info-section">
      <div
        className="bg-white rounded-16 p-20"
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(17, 24, 39, 0.06)",
        }}
      >
        {/* Header: Badge'ler ve Branch */}
        <div className="d-flex align-items-center justify-content-between mb-16">
          <div className="d-flex align-items-center gap-8">
            <Badge variant={getStatusBadgeVariant(jobPosting.status)} size="sm">
              {getStatusDisplay(jobPosting.status)}
            </Badge>
            {jobPosting.isPublic && (
              <Badge variant="info" size="sm">
                <i className="ph-bold ph-globe-simple me-1"></i>
                Herkese Açık
              </Badge>
            )}
          </div>
          <div
            className="d-flex align-items-center gap-8 px-12 py-6 bg-primary-50 rounded-8"
            style={{ flexShrink: 0 }}
          >
            <i
              className="ph-bold ph-briefcase text-primary-600"
              style={{ fontSize: "1.125rem" }}
            ></i>
            <span
              className="text-primary-700 fw-medium"
              style={{ fontSize: "0.9375rem" }}
            >
              {jobPosting.branch}
            </span>
          </div>
        </div>

        {/* Başlık */}
        <div>
          <h1
            className="mb-0 fw-bold text-neutral-900"
            style={{ fontSize: "2rem", lineHeight: "1.2" }}
          >
            {jobPosting.positionTitle}
          </h1>
        </div>
      </div>
    </div>
  );
};

// Main column definitions
export const createJobPostingDetailColumns =
  (): DetailColumn<JobPostingDto>[] => [
    // ═══════════════════════════════════════════════════════════════════════════
    // INFO SECTION - En üstte
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
    // META SECTION - İstatistikler (numeric metrics)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      field: "applicationCount",
      headerName: "Toplam Başvuru",
      section: "meta",
      icon: "ph-bold ph-users",
      iconColor: "text-primary-700",
      width: 50,
      order: 10,
      renderCell: (jobPosting) => {
        const count = jobPosting.applicationCount || 0;
        const hasApplications = count > 0;

        const cardContent = (
          <div className="d-flex align-items-center gap-12">
            <div
              className={`d-flex align-items-center justify-content-center ${hasApplications ? "bg-primary-100" : "bg-neutral-100"}`}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                flexShrink: 0,
              }}
            >
              <i
                className={`ph-bold ph-users ${hasApplications ? "text-primary-700" : "text-neutral-500"}`}
                style={{ fontSize: "1.75rem" }}
              ></i>
            </div>
            <div className="flex-grow-1">
              <p
                className="mb-2 text-neutral-600 fw-medium"
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Toplam Başvuru
              </p>
              <span
                className={`fw-bold ${hasApplications ? "text-primary-700" : "text-neutral-700"}`}
                style={{ fontSize: "1.5rem" }}
              >
                {count}
              </span>
            </div>
          </div>
        );

        if (hasApplications) {
          return (
            <Link
              href={`/individual/company/job-postings/detail/${jobPosting.id}/applications`}
              className="d-block text-decoration-none"
              style={{
                cursor: "pointer",
                transition: "transform 0.2s ease, opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.opacity = "1";
              }}
            >
              {cardContent}
            </Link>
          );
        }

        return cardContent;
      },
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DATES SECTION - Tarih bilgileri (yan yana)
    // ═══════════════════════════════════════════════════════════════════════════
    {
      field: "applicationDeadline",
      headerName: "Son Başvuru Tarihi",
      section: "dates",
      icon: "ph-bold ph-calendar-x",
      iconColor: "text-danger-700",
      grid: 6,
      order: 20,
      condition: (jobPosting) => !!jobPosting.applicationDeadline,
      renderCell: (jobPosting) => {
        const deadline = new Date(jobPosting.applicationDeadline);
        const now = new Date();
        const isExpired = deadline < now;
        const diffTime = deadline.getTime() - now.getTime();
        const daysUntilDeadline = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isApproaching =
          !isExpired && daysUntilDeadline > 0 && daysUntilDeadline <= 7;

        const getStatusColor = () => {
          if (isExpired) return "danger";
          if (isApproaching) return "warning";
          return "success";
        };

        const getStatusText = () => {
          if (isExpired) return "Süresi Doldu";
          if (isApproaching) return `${daysUntilDeadline} gün kaldı`;
          return "Aktif";
        };

        const statusColor = getStatusColor();

        return (
          <div
            className="bg-white rounded-12 p-12 h-100"
            style={{
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              border: "1px solid rgba(17, 24, 39, 0.06)",
              transition:
                "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(0, 0, 0, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
            }}
          >
            <div className="d-flex align-items-center gap-8 mb-8">
              <div
                className="d-flex align-items-center justify-content-center bg-danger-100 text-danger-700"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
              >
                <i className="ph-bold ph-calendar-x"></i>
              </div>
              <h5
                className="mb-0 fw-semibold text-neutral-900"
                style={{ fontSize: "0.875rem" }}
              >
                Son Başvuru Tarihi
              </h5>
            </div>
            <div style={{ paddingTop: "4px" }}>
              <div className="d-flex align-items-center gap-8 mb-8">
                <span
                  className={`fw-bold text-${statusColor}-700`}
                  style={{ fontSize: "1rem" }}
                >
                  {formatDate(jobPosting.applicationDeadline)}
                </span>
              </div>
              <div
                className={`d-inline-flex align-items-center gap-1 px-8 py-4 bg-${statusColor}-50 rounded-6`}
              >
                <i
                  className={`ph-fill ph-${isExpired ? "x-circle" : isApproaching ? "warning-circle" : "check-circle"} text-${statusColor}-600`}
                  style={{ fontSize: "0.875rem" }}
                ></i>
                <span
                  className={`text-${statusColor}-700 fw-medium`}
                  style={{ fontSize: "0.75rem" }}
                >
                  {getStatusText()}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma Tarihi",
      section: "dates",
      icon: "ph-bold ph-clock",
      iconColor: "text-neutral-700",
      grid: 6,
      order: 21,
      condition: (jobPosting) => !!jobPosting.createdAt,
      renderCell: (jobPosting) => (
        <div
          className="bg-white rounded-12 p-12 h-100"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
            transition:
              "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
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
              <i className="ph-bold ph-clock"></i>
            </div>
            <h5
              className="mb-0 fw-semibold text-neutral-900"
              style={{ fontSize: "0.875rem" }}
            >
              Oluşturulma Tarihi
            </h5>
          </div>
          <div style={{ paddingTop: "4px" }}>
            <span
              className="fw-bold text-neutral-900"
              style={{ fontSize: "1rem" }}
            >
              {formatDate(jobPosting.createdAt)}
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
      order: 22,
      condition: (jobPosting) => !!jobPosting.updatedAt,
      renderCell: (jobPosting) => (
        <div
          className="bg-white rounded-12 p-12 h-100"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(17, 24, 39, 0.06)",
            transition:
              "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
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
              {formatDate(jobPosting.updatedAt)}
            </span>
          </div>
        </div>
      ),
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DETAILS SECTION - Detaylı bilgiler
    // ═══════════════════════════════════════════════════════════════════════════

    // Açıklama - Full width
    {
      field: "description",
      headerName: "İlan Açıklaması",
      section: "details",
      icon: "ph-bold ph-article",
      iconColor: "text-primary-700",
      grid: 12,
      order: 30,
      condition: (jobPosting) => !!jobPosting.description,
      renderCell: (jobPosting) => (
        <div
          className="text-neutral-700"
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "0.9375rem",
            lineHeight: "1.7",
            letterSpacing: "0.01em",
          }}
        >
          {jobPosting.description}
        </div>
      ),
    },

    // Gereksinimler - Full width
    {
      field: "requirements",
      headerName: "Gereksinimler",
      section: "details",
      icon: "ph-bold ph-list-checks",
      iconColor: "text-info-700",
      grid: 12,
      order: 31,
      condition: (jobPosting) =>
        jobPosting.requiredExperienceYears !== undefined ||
        !!jobPosting.requiredEducationLevel,
      renderCell: (jobPosting) => (
        <div className="d-flex flex-wrap gap-16">
          {jobPosting.requiredExperienceYears !== undefined && (
            <div
              className="flex-grow-1 p-16 rounded-8"
              style={{
                minWidth: "200px",
                backgroundColor: "rgba(251, 191, 36, 0.08)",
                border: "1px solid rgba(251, 191, 36, 0.2)",
              }}
            >
              <div className="d-flex align-items-center gap-12">
                <div
                  className="d-flex align-items-center justify-content-center bg-warning-100"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className="ph-bold ph-medal text-warning-700"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <p
                    className="mb-4 text-warning-700 fw-medium"
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Deneyim
                  </p>
                  <span
                    className="fw-bold text-neutral-900"
                    style={{ fontSize: "1.125rem" }}
                  >
                    {jobPosting.requiredExperienceYears} Yıl
                  </span>
                </div>
              </div>
            </div>
          )}
          {jobPosting.requiredEducationLevel && (
            <div
              className="flex-grow-1 p-16 rounded-8"
              style={{
                minWidth: "200px",
                backgroundColor: "rgba(59, 130, 246, 0.08)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              <div className="d-flex align-items-center gap-12">
                <div
                  className="d-flex align-items-center justify-content-center bg-info-100"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className="ph-bold ph-graduation-cap text-info-700"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <p
                    className="mb-4 text-info-700 fw-medium"
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Eğitim Seviyesi
                  </p>
                  <span
                    className="fw-bold text-neutral-900"
                    style={{ fontSize: "1.125rem" }}
                  >
                    {getEducationLevelDisplay(
                      jobPosting.requiredEducationLevel,
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },

    // İstihdam Bilgileri - Yan yana
    {
      field: "employmentType",
      headerName: "İstihdam Tipi",
      section: "details",
      icon: "ph-bold ph-briefcase",
      iconColor: "text-primary-700",
      grid: 4,
      order: 32,
      condition: (jobPosting) => !!jobPosting.employmentType,
      renderCell: (jobPosting) => (
        <span className="fw-bold text-primary-700" style={{ fontSize: "1rem" }}>
          {getEmploymentTypeDisplay(jobPosting.employmentType)}
        </span>
      ),
    },
    {
      field: "startDate",
      headerName: "İşe Başlama Tarihi",
      section: "details",
      icon: "ph-bold ph-calendar-check",
      iconColor: "text-success-700",
      grid: 4,
      order: 33,
      condition: (jobPosting) => !!jobPosting.startDate,
      renderCell: (jobPosting) => (
        <span className="fw-bold text-neutral-900" style={{ fontSize: "1rem" }}>
          {formatDate(jobPosting.startDate)}
        </span>
      ),
    },
    {
      field: "contractDuration",
      headerName: "Sözleşme Süresi",
      section: "details",
      icon: "ph-bold ph-clock",
      iconColor: "text-info-700",
      grid: 4,
      order: 34,
      condition: (jobPosting) => !!jobPosting.contractDuration,
      renderCell: (jobPosting) => (
        <span className="fw-bold text-neutral-900" style={{ fontSize: "1rem" }}>
          {jobPosting.contractDuration}
        </span>
      ),
    },

    // Maaş Bilgisi - Full width (Önemli bilgi olduğu için vurgulu)
    {
      field: "salary",
      headerName: "Maaş Aralığı",
      section: "details",
      icon: "ph-bold ph-currency-dollar",
      iconColor: "text-success-700",
      grid: 12,
      order: 35,
      condition: (jobPosting) => jobPosting.showSalary,
      renderCell: (jobPosting) => (
        <div
          className="d-flex align-items-center gap-12 p-16 rounded-8"
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.08)",
            border: "1px solid rgba(34, 197, 94, 0.2)",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center bg-success-100"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              flexShrink: 0,
            }}
          >
            <i
              className="ph-bold ph-currency-dollar text-success-700"
              style={{ fontSize: "1.75rem" }}
            ></i>
          </div>
          <div>
            <p
              className="mb-4 text-success-700 fw-medium"
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Maaş Aralığı
            </p>
            <span
              className="fw-bold text-success-700"
              style={{ fontSize: "1.5rem" }}
            >
              {formatSalaryRange(
                jobPosting.salaryMin,
                jobPosting.salaryMax,
                jobPosting.showSalary,
              )}
            </span>
          </div>
        </div>
      ),
    },

    // İller - Full width
    {
      field: "provinces",
      headerName: "Çalışılacak İller",
      section: "details",
      icon: "ph-bold ph-map-pin",
      iconColor: "text-danger-700",
      grid: 12,
      order: 36,
      condition: (jobPosting) =>
        !!jobPosting.provinces && jobPosting.provinces.length > 0,
      renderCell: (jobPosting) => (
        <div className="d-flex flex-wrap gap-8">
          {jobPosting.provinces.map((province) => (
            <div
              key={province.id}
              className="d-inline-flex align-items-center gap-6 px-12 py-8 bg-neutral-100 rounded-8"
              style={{
                border: "1px solid rgba(17, 24, 39, 0.08)",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(239, 68, 68, 0.08)";
                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(245, 245, 245)";
                e.currentTarget.style.borderColor = "rgba(17, 24, 39, 0.08)";
              }}
            >
              <i
                className="ph-fill ph-map-pin text-danger-600"
                style={{ fontSize: "1rem" }}
              ></i>
              <span
                className="fw-medium text-neutral-900"
                style={{ fontSize: "0.875rem" }}
              >
                {province.name}
              </span>
            </div>
          ))}
        </div>
      ),
    },

    // Kampüs Bilgisi - Full width
    {
      field: "campus",
      headerName: "Kampüs Bilgileri",
      section: "details",
      icon: "ph-bold ph-building",
      iconColor: "text-primary-700",
      grid: 12,
      order: 37,
      condition: (jobPosting) => !!jobPosting.campus,
      renderCell: (jobPosting) => (
        <div
          className="d-flex align-items-center gap-16 p-16 rounded-8"
          style={{
            backgroundColor: "rgba(99, 102, 241, 0.04)",
            border: "1px solid rgba(99, 102, 241, 0.1)",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-center bg-primary-100"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              flexShrink: 0,
            }}
          >
            <i
              className="ph-bold ph-building text-primary-700"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
          <div className="flex-grow-1">
            <h6
              className="mb-4 fw-bold text-neutral-900"
              style={{ fontSize: "1.125rem" }}
            >
              {jobPosting.campus.name}
            </h6>
            <div className="d-flex align-items-center gap-6 text-neutral-600">
              <i
                className="ph-bold ph-envelope"
                style={{ fontSize: "1rem" }}
              ></i>
              <span style={{ fontSize: "0.9375rem" }}>
                {jobPosting.campus.email ?? "-"}
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

// Helper function to get filtered columns based on JobPosting data and section
export const getFilteredColumns = (
  jobPosting: JobPostingDto,
  section?: DetailColumn<JobPostingDto>["section"],
): DetailColumn<JobPostingDto>[] => {
  const allColumns = createJobPostingDetailColumns();

  let filteredColumns = allColumns.filter((column) => {
    if (section && column.section !== section) return false;
    if (column.condition && !column.condition(jobPosting)) return false;
    return true;
  });

  // Sort by order
  filteredColumns.sort((a, b) => (a.order || 0) - (b.order || 0));

  return filteredColumns;
};

// Helper function to get sections
export const getSections = (jobPosting: JobPostingDto) => {
  const allColumns = createJobPostingDetailColumns();
  const sections = new Set(
    allColumns
      .filter((column) => !column.condition || column.condition(jobPosting))
      .map((column) => column.section),
  );

  return Array.from(sections);
};
