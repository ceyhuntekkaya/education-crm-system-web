import React from "react";
import { Badge } from "@/components";
import type { EventRegistrationDto, RegistrationStatus } from "@/types";
import type { DetailColumn } from "@/components/layouts/detail-layout/types";

// ─── Shared Styles ────────────────────────────────────────────────────────────

const CARD_STYLE: React.CSSProperties = {
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  border: "1px solid rgba(17,24,39,0.07)",
  transition: "transform 0.18s ease, box-shadow 0.18s ease",
};

const hoverIn = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.10)";
};
const hoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<RegistrationStatus, string> = {
  PENDING: "Onay Bekliyor",
  APPROVED: "Onaylandı",
  REJECTED: "Reddedildi",
  CANCELLED: "İptal Edildi",
};

const STATUS_VARIANT: Record<
  RegistrationStatus,
  "warning" | "success" | "danger" | "secondary"
> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "danger",
  CANCELLED: "secondary",
};

const STATUS_STRIP: Record<RegistrationStatus, string> = {
  APPROVED: "linear-gradient(90deg,#10b981,#34d399)",
  REJECTED: "linear-gradient(90deg,#ef4444,#f87171)",
  CANCELLED: "linear-gradient(90deg,#6b7280,#9ca3af)",
  PENDING: "linear-gradient(90deg,#f59e0b,#fbbf24)",
};

// ─── Info Section Renderer ────────────────────────────────────────────────────

const renderTeacherInfo = (reg: EventRegistrationDto) => {
  const status = reg.status as RegistrationStatus;
  const avatarLetter =
    reg.teacherName?.[0]?.toUpperCase() ?? String(reg.teacherId)[0] ?? "?";

  return (
    <div
      className="bg-white rounded-16 overflow-hidden"
      style={{ ...CARD_STYLE }}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
    >
      {/* Renkli üst şerit */}
      <div style={{ height: 5, background: STATUS_STRIP[status] }} />

      {/* İçerik */}
      <div className="p-20">
        <div className="d-flex align-items-center gap-16 mb-16">
          {/* Avatar */}
          <div
            className="d-flex align-items-center justify-content-center fw-bold text-primary-600 flex-shrink-0"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#e0e7ff 0%,#dbeafe 100%)",
              fontSize: "1.5rem",
              border: "3px solid rgba(99,102,241,0.18)",
            }}
          >
            {avatarLetter}
          </div>

          {/* İsim / E-posta */}
          <div className="flex-grow-1 min-w-0">
            <h2
              className="mb-4 fw-bold text-neutral-900"
              style={{ fontSize: "1.375rem", lineHeight: 1.25 }}
            >
              {reg.teacherName || `Öğretmen #${reg.teacherId}`}
            </h2>
            {reg.teacherEmail && (
              <p className="mb-0 text-neutral-500 text-sm">
                {reg.teacherEmail}
              </p>
            )}
          </div>
        </div>

        {/* Status */}
        <div
          className="d-flex align-items-center justify-content-between flex-wrap gap-10 pt-14"
          style={{ borderTop: "1px solid rgba(17,24,39,0.07)" }}
        >
          <div className="d-flex align-items-center gap-8">
            <Badge variant={STATUS_VARIANT[status] ?? "secondary"} size="md">
              {STATUS_LABEL[status] ?? status}
            </Badge>
          </div>

          {/* Katılım */}
          <div className="d-flex align-items-center gap-6">
            <i
              className={
                reg.attended
                  ? "ph-bold ph-check-circle text-success-600"
                  : "ph-bold ph-minus-circle text-neutral-400"
              }
              style={{ fontSize: 18 }}
            />
            <span
              className={`fw-medium text-sm ${reg.attended ? "text-success-700" : "text-neutral-400"}`}
            >
              {reg.attended ? "Katıldı" : "Katılmadı"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Details Section Renderers ────────────────────────────────────────────────

const renderEventInfo = (reg: EventRegistrationDto) => {
  const event = reg.event;
  if (!event) {
    return (
      <div className="text-neutral-400 text-sm">
        Etkinlik bilgisi bulunamadı
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center gap-12">
      <div
        className="d-flex align-items-center justify-content-center bg-primary-50 text-primary-500 flex-shrink-0"
        style={{ width: 40, height: 40, borderRadius: 10 }}
      >
        <i
          className="ph-bold ph-calendar-blank"
          style={{ fontSize: "1.1rem" }}
        />
      </div>
      <div className="min-w-0">
        <p
          className="mb-4 fw-semibold text-neutral-800 text-truncate"
          style={{ fontSize: "0.9375rem" }}
        >
          {event.title}
        </p>
        {event.startDateTime && (
          <p className="mb-0 text-neutral-500 text-sm">
            {new Date(event.startDateTime).toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
};

const renderCertificate = (reg: EventRegistrationDto) => (
  <div className="d-flex align-items-center gap-10">
    <div
      className="d-flex align-items-center justify-content-center bg-warning-50 text-warning-600 flex-shrink-0"
      style={{ width: 32, height: 32, borderRadius: 8 }}
    >
      <i className="ph-bold ph-certificate" style={{ fontSize: "0.9rem" }} />
    </div>
    <a
      href={reg.certificateUrl ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-600 fw-medium text-decoration-none text-truncate"
      style={{ fontSize: "0.875rem" }}
    >
      Sertifikayı Görüntüle
    </a>
  </div>
);

// ─── Columns Export ───────────────────────────────────────────────────────────

export const createRegistrationDetailColumns =
  (): DetailColumn<EventRegistrationDto>[] => [
    // ─── INFO ───────────────────────────────────────────────────────────────
    {
      field: "teacherInfo",
      headerName: "Kayıt Sahibi",
      section: "info",
      grid: 12,
      order: 10,
      renderCell: renderTeacherInfo,
    },

    // ─── META ───────────────────────────────────────────────────────────────
    {
      field: "id",
      headerName: "Kayıt ID",
      section: "meta",
      icon: "ph-bold ph-hash",
      iconColor: "text-neutral-500",
      order: 10,
      valueGetter: (reg) => String(reg.id),
    },
    {
      field: "eventId",
      headerName: "Etkinlik ID",
      section: "meta",
      icon: "ph-bold ph-calendar-blank",
      iconColor: "text-primary-600",
      order: 20,
      valueGetter: (reg) => String(reg.eventId),
    },
    {
      field: "teacherId",
      headerName: "Öğretmen ID",
      section: "meta",
      icon: "ph-bold ph-user",
      iconColor: "text-neutral-500",
      order: 30,
      valueGetter: (reg) => String(reg.teacherId),
    },

    // ─── DATES ──────────────────────────────────────────────────────────────
    {
      field: "createdAt",
      headerName: "Kayıt Tarihi",
      section: "dates",
      icon: "ph-bold ph-calendar-plus",
      iconColor: "text-primary-600",
      grid: 6,
      order: 10,
    },
    {
      field: "updatedAt",
      headerName: "Son Güncelleme",
      section: "dates",
      icon: "ph-bold ph-calendar-dots",
      iconColor: "text-neutral-400",
      grid: 6,
      order: 20,
    },
    {
      field: "attendanceMarkedAt",
      headerName: "Katılım İşaretlendi",
      section: "dates",
      icon: "ph-bold ph-check-square",
      iconColor: "text-success-600",
      grid: 6,
      order: 30,
      condition: (reg) => !!reg.attendanceMarkedAt,
    },
    {
      field: "certificateGeneratedAt",
      headerName: "Sertifika Oluşturuldu",
      section: "dates",
      icon: "ph-bold ph-certificate",
      iconColor: "text-warning-600",
      grid: 6,
      order: 40,
      condition: (reg) => !!reg.certificateGeneratedAt,
    },

    // ─── DETAILS ────────────────────────────────────────────────────────────
    {
      field: "event",
      headerName: "Etkinlik",
      section: "details",
      icon: "ph-bold ph-calendar-blank",
      iconColor: "text-primary-700",
      grid: 12,
      order: 10,
      condition: (reg) => !!reg.event,
      renderCell: renderEventInfo,
    },
    {
      field: "registrationNote",
      headerName: "Kayıt Notu",
      section: "details",
      icon: "ph-bold ph-note",
      iconColor: "text-neutral-500",
      grid: 12,
      order: 20,
      condition: (reg) => !!reg.registrationNote,
    },
    {
      field: "certificateUrl",
      headerName: "Sertifika",
      section: "details",
      icon: "ph-bold ph-certificate",
      iconColor: "text-warning-700",
      grid: 12,
      order: 30,
      condition: (reg) => !!reg.certificateUrl,
      renderCell: renderCertificate,
    },
  ];
