import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components";
import type { EventRegistrationDto, RegistrationStatus } from "@/types";

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

const STATUS_ICON: Record<RegistrationStatus, string> = {
  PENDING: "ph-clock",
  APPROVED: "ph-check-circle",
  REJECTED: "ph-x-circle",
  CANCELLED: "ph-prohibit",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface RegistrationCardProps {
  registration: EventRegistrationDto;
  onStatusClick?: (reg: EventRegistrationDto) => void;
  onAttendanceClick?: (reg: EventRegistrationDto) => void;
  onDeleteClick?: (reg: EventRegistrationDto) => void;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  registration,
  onStatusClick,
  onAttendanceClick,
  onDeleteClick,
}) => {
  const router = useRouter();
  const status = registration.status as RegistrationStatus;
  const avatarLetter =
    registration.teacherName?.[0]?.toUpperCase() ??
    String(registration.teacherId)[0] ??
    "?";

  const detailHref = `/individual/instructor/events/detail/${registration.eventId}/registrations/${registration.id}`;

  return (
    <div
      className="bg-white rounded-16 h-100 overflow-hidden d-flex flex-column"
      style={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        border: "1.5px solid hsl(var(--neutral-40))",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        cursor: "pointer",
      }}
      onClick={() => router.push(detailHref)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)";
      }}
    >
      {/* ── Renkli üst şerit ── */}
      <div
        style={{
          height: 4,
          background:
            status === "APPROVED"
              ? "linear-gradient(90deg,#10b981,#34d399)"
              : status === "REJECTED"
                ? "linear-gradient(90deg,#ef4444,#f87171)"
                : status === "CANCELLED"
                  ? "linear-gradient(90deg,#6b7280,#9ca3af)"
                  : "linear-gradient(90deg,#f59e0b,#fbbf24)",
        }}
      />

      {/* ── Header ── */}
      <div className="px-16 pt-16 d-flex align-items-center gap-12">
        {/* Avatar */}
        <div
          className="d-flex align-items-center justify-content-center fw-bold text-primary-600 flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#e0e7ff 0%,#dbeafe 100%)",
            fontSize: "1.125rem",
            border: "2px solid rgba(99,102,241,0.18)",
          }}
        >
          {avatarLetter}
        </div>

        {/* İsim / E-posta */}
        <div className="flex-grow-1 min-w-0">
          <p className="mb-0 fw-semibold text-neutral-900 text-truncate">
            {registration.teacherName || `Öğretmen #${registration.teacherId}`}
          </p>
          {registration.teacherEmail && (
            <p className="mb-0 text-xs text-neutral-500 text-truncate">
              {registration.teacherEmail}
            </p>
          )}
        </div>

        {/* Durum badge */}
        <Badge variant={STATUS_VARIANT[status] ?? "secondary"} size="sm">
          <i className={`ph-bold ${STATUS_ICON[status]} me-4`} />
          {STATUS_LABEL[status] ?? status}
        </Badge>
      </div>

      {/* ── Body ── */}
      <div className="px-16 py-12 flex-grow-1 d-flex flex-column gap-8">
        {/* Katılım */}
        <div className="d-flex align-items-center gap-8 text-sm">
          {registration.attended ? (
            <>
              <i className="ph-bold ph-check-circle text-success-500" />
              <span className="text-success-600 fw-medium">Katıldı</span>
            </>
          ) : (
            <>
              <i className="ph-bold ph-minus-circle text-neutral-300" />
              <span className="text-neutral-400">Katılmadı</span>
            </>
          )}
        </div>

        {/* Kayıt Not */}
        {registration.registrationNote && (
          <div
            className="text-sm text-neutral-600 bg-neutral-25 rounded-8 px-10 py-8"
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            <i className="ph ph-note me-4 text-neutral-400" />
            {registration.registrationNote}
          </div>
        )}

        <div className="flex-grow-1" />

        {/* ── Footer ── */}
        <div
          className="d-flex align-items-center justify-content-between pt-10 mt-4"
          style={{ borderTop: "1px solid hsl(var(--neutral-40))" }}
        >
          <div className="d-flex align-items-center gap-4 text-xs text-neutral-500">
            <i className="ph ph-calendar text-neutral-400" />
            <span>{formatDate(registration.createdAt)}</span>
          </div>
          {registration.attendanceMarkedAt && (
            <div className="d-flex align-items-center gap-4 text-xs text-success-600">
              <i className="ph-bold ph-calendar-check" />
              <span>{formatDate(registration.attendanceMarkedAt)}</span>
            </div>
          )}
        </div>

        {/* ── Actions ── */}
        {(onStatusClick || onAttendanceClick || onDeleteClick) && (
          <div
            className="d-flex align-items-center gap-6 pt-10 mt-4"
            style={{ borderTop: "1px solid hsl(var(--neutral-40))" }}
          >
            {onStatusClick && (
              <button
                type="button"
                className="btn btn-sm btn-outline-primary px-8 py-4 flex-1"
                title="Durum Güncelle"
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusClick(registration);
                }}
              >
                <i className="ph ph-arrows-counter-clockwise me-4" />
                Durum
              </button>
            )}
            {onAttendanceClick && (
              <button
                type="button"
                className="btn btn-sm btn-outline-success px-8 py-4 flex-1"
                title="Katılım İşaretle"
                onClick={(e) => {
                  e.stopPropagation();
                  onAttendanceClick(registration);
                }}
              >
                <i className="ph ph-calendar-check me-4" />
                Katılım
              </button>
            )}
            {onDeleteClick && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger px-8 py-4"
                title="Kaydı Sil"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(registration);
                }}
              >
                <i className="ph ph-trash" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
