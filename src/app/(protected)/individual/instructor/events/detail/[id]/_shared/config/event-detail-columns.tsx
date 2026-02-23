import React from "react";
import Image from "next/image";
import { Badge } from "@/components";
import type { EventDto } from "@/types";
import type { DetailColumn } from "@/components/layouts/detail-layout/types";
import {
  getEventTypeBadgeVariant,
  getEventTypeDisplay,
  getEventTypeIcon,
  getEventStatusBadgeVariant,
  getEventStatusDisplay,
  getDeliveryFormatDisplay,
  getDeliveryFormatIcon,
} from "../../../../_shared/utils/event-helpers";

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

// ─── Info Section ─────────────────────────────────────────────────────────────

const renderBasicInfo = (event: EventDto) => (
  <div
    className="bg-white rounded-16 overflow-hidden"
    style={{ ...CARD_STYLE }}
    onMouseEnter={hoverIn}
    onMouseLeave={hoverOut}
  >
    {/* Renkli üst şerit */}
    <div
      style={{
        height: 5,
        background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
      }}
    />

    {/* Kapak görsel alanı */}
    <div className="position-relative overflow-hidden" style={{ height: 200 }}>
      {event.coverImageUrl ? (
        <Image
          src={event.coverImageUrl}
          alt={event.title}
          fill
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div
          className="w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--main-50)) 0%, hsl(var(--main-100)) 100%)",
          }}
        >
          <i
            className={`ph-duotone ${getEventTypeIcon(event.eventType)} text-main-600`}
            style={{ fontSize: "80px", opacity: 0.4 }}
          />
        </div>
      )}

      {/* Durum badge — sol üst */}
      <div
        className="position-absolute"
        style={{ top: 12, left: 12, zIndex: 2 }}
      >
        <Badge variant={getEventStatusBadgeVariant(event.status)} size="md">
          <i
            className="ph-bold ph-circle me-1"
            style={{ fontSize: "0.5rem" }}
          />
          {getEventStatusDisplay(event.status)}
        </Badge>
      </div>

      {/* Tür badge — sağ üst */}
      <div
        className="position-absolute"
        style={{ top: 12, right: 12, zIndex: 2 }}
      >
        <Badge variant={getEventTypeBadgeVariant(event.eventType)} size="md">
          <i className={`ph-bold ${getEventTypeIcon(event.eventType)} me-1`} />
          {getEventTypeDisplay(event.eventType)}
        </Badge>
      </div>
    </div>

    {/* Bilgi alanı */}
    <div className="p-20">
      <h1
        className="mb-8 fw-bold text-neutral-900"
        style={{ fontSize: "1.625rem", lineHeight: 1.25 }}
      >
        {event.title}
      </h1>

      {event.organizer && (
        <div
          className="d-flex align-items-center gap-12 flex-wrap pt-14 mt-14"
          style={{ borderTop: "1px solid rgba(17,24,39,0.07)" }}
        >
          {event.organizer.logoUrl ? (
            <div
              className="flex-shrink-0 overflow-hidden"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              <Image
                src={event.organizer.logoUrl}
                alt={event.organizer.name}
                width={28}
                height={28}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 fw-bold text-primary-600"
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)",
                fontSize: "0.75rem",
                border: "1px solid rgba(99,102,241,0.15)",
              }}
            >
              {event.organizer.name[0]?.toUpperCase()}
            </div>
          )}
          <span className="text-sm text-neutral-600 fw-medium">
            {event.organizer.name}
          </span>
        </div>
      )}
    </div>
  </div>
);

// ─── Details Section — render fonksiyonları ───────────────────────────────────

const renderDeliveryFormat = (event: EventDto) => (
  <div className="d-flex align-items-center gap-10">
    <div
      className="d-flex align-items-center justify-content-center bg-primary-50 text-primary-500 flex-shrink-0"
      style={{ width: 32, height: 32, borderRadius: 8 }}
    >
      <i
        className={`ph-bold ${getDeliveryFormatIcon(event.deliveryFormat)}`}
        style={{ fontSize: "0.9rem" }}
      />
    </div>
    <span className="fw-semibold text-neutral-800">
      {getDeliveryFormatDisplay(event.deliveryFormat)}
    </span>
  </div>
);

const renderLocation = (event: EventDto) => (
  <div className="d-flex align-items-center gap-10">
    <div
      className="d-flex align-items-center justify-content-center bg-primary-50 text-primary-500 flex-shrink-0"
      style={{ width: 32, height: 32, borderRadius: 8 }}
    >
      <i className="ph-bold ph-map-pin" style={{ fontSize: "0.9rem" }} />
    </div>
    <span className="fw-medium text-neutral-700">{event.location}</span>
  </div>
);

const renderOnlineLink = (event: EventDto) => (
  <div className="d-flex align-items-center gap-10">
    <div
      className="d-flex align-items-center justify-content-center bg-primary-50 text-primary-500 flex-shrink-0"
      style={{ width: 32, height: 32, borderRadius: 8 }}
    >
      <i className="ph-bold ph-link" style={{ fontSize: "0.9rem" }} />
    </div>
    <a
      href={event.onlineLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-600 fw-medium text-decoration-none text-truncate"
      style={{ fontSize: "0.875rem" }}
    >
      {event.onlineLink}
    </a>
  </div>
);

const renderSpeakerInfo = (event: EventDto) => {
  const initials =
    event.speakerName
      ?.split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() ?? "?";

  return (
    <div className="d-flex align-items-center gap-12">
      <div
        className="d-flex align-items-center justify-content-center flex-shrink-0 fw-bold text-warning-700"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
          fontSize: "1rem",
          border: "2px solid rgba(217,119,6,0.18)",
        }}
      >
        {initials}
      </div>

      <div className="min-w-0">
        <p
          className="mb-0 fw-semibold text-neutral-800"
          style={{ fontSize: "0.9375rem" }}
        >
          {event.speakerName}
        </p>
        {event.speakerBio && (
          <p
            className="mb-0 text-neutral-500"
            style={{ fontSize: "0.8125rem", marginTop: 4, lineHeight: 1.5 }}
          >
            {event.speakerBio}
          </p>
        )}
      </div>
    </div>
  );
};

const renderOrganizerCard = (event: EventDto) => {
  if (!event.organizer) return null;
  const { organizer } = event;
  const initials = organizer.name[0]?.toUpperCase() ?? "?";

  return (
    <div className="d-flex align-items-center gap-12">
      {organizer.logoUrl ? (
        <div
          className="flex-shrink-0 overflow-hidden"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            border: "2px solid rgba(99,102,241,0.15)",
          }}
        >
          <Image
            src={organizer.logoUrl}
            alt={organizer.name}
            width={44}
            height={44}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      ) : (
        <div
          className="d-flex align-items-center justify-content-center flex-shrink-0 fw-bold text-primary-600"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)",
            fontSize: "1.125rem",
            border: "2px solid rgba(99,102,241,0.18)",
          }}
        >
          {initials}
        </div>
      )}

      <div className="flex-grow-1 min-w-0">
        <p
          className="mb-6 fw-semibold text-neutral-800 text-truncate"
          style={{ fontSize: "0.9375rem" }}
        >
          {organizer.name}
        </p>
        <Badge variant="primary" size="sm">
          {organizer.type}
        </Badge>
      </div>
    </div>
  );
};

const renderCreatorInfo = (event: EventDto) => {
  const email = event.createdByUserEmail ?? "";
  const avatarLetter = email[0]?.toUpperCase() ?? "?";

  return (
    <div className="d-flex align-items-center gap-12">
      <div
        className="d-flex align-items-center justify-content-center flex-shrink-0 fw-bold text-primary-600"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)",
          fontSize: "1.125rem",
          border: "2px solid rgba(99,102,241,0.18)",
        }}
      >
        {avatarLetter}
      </div>

      <div className="flex-grow-1 min-w-0">
        <a
          href={`mailto:${email}`}
          className="text-primary-600 fw-semibold text-decoration-none text-truncate d-block"
          style={{ fontSize: "0.875rem" }}
        >
          {email}
        </a>
      </div>

      <a
        href={`mailto:${email}`}
        className="d-flex align-items-center justify-content-center bg-primary-50 text-primary-500 text-decoration-none flex-shrink-0"
        style={{ width: 32, height: 32, borderRadius: 8 }}
        title="E-posta gönder"
      >
        <i className="ph-bold ph-envelope" style={{ fontSize: "0.875rem" }} />
      </a>
    </div>
  );
};

// ─── Column Definitions ───────────────────────────────────────────────────────

export const createEventDetailColumns = (): DetailColumn<EventDto>[] => [
  // ─── INFO ────────────────────────────────────────────────────────────────
  {
    field: "basicInfo",
    headerName: "Etkinlik Bilgileri",
    section: "info",
    icon: "ph-bold ph-calendar",
    iconColor: "text-primary-700",
    grid: 12,
    order: 0,
    renderCell: renderBasicInfo,
  },

  // ─── META — valueGetter booleanlar için, native sayılar için ─────────────
  {
    field: "registrationCount",
    headerName: "Kayıt Sayısı",
    section: "meta",
    icon: "ph-bold ph-users",
    iconColor: "text-primary-700",
    order: 10,
  },
  {
    field: "maxCapacity",
    headerName: "Kontenjan",
    section: "meta",
    icon: "ph-bold ph-ticket",
    iconColor: "text-info-700",
    order: 20,
    valueGetter: (e) => (e.maxCapacity != null ? e.maxCapacity : "∞"),
  },
  {
    field: "remainingCapacity",
    headerName: "Kalan Kapasite",
    section: "meta",
    icon: "ph-bold ph-chair",
    iconColor: "text-success-700",
    order: 30,
    valueGetter: (e) =>
      e.remainingCapacity != null ? e.remainingCapacity : "∞",
  },
  {
    field: "autoApproveRegistration",
    headerName: "Kayıt Onayı",
    section: "meta",
    icon: "ph-bold ph-check-circle",
    iconColor: "text-success-700",
    order: 40,
    valueGetter: (e) => (e.autoApproveRegistration ? "Otomatik" : "Manuel"),
  },
  {
    field: "certificateEnabled",
    headerName: "Sertifika",
    section: "meta",
    icon: "ph-bold ph-certificate",
    iconColor: "text-warning-700",
    order: 50,
    valueGetter: (e) => (e.certificateEnabled ? "Aktif" : "Pasif"),
  },

  // ─── DATES — native renderer formatDate(data[field]) kullanır ────────────
  {
    field: "startDateTime",
    headerName: "Başlangıç Tarihi",
    section: "dates",
    icon: "ph-bold ph-calendar-blank",
    iconColor: "text-primary-600",
    grid: 6,
    order: 10,
  },
  {
    field: "endDateTime",
    headerName: "Bitiş Tarihi",
    section: "dates",
    icon: "ph-bold ph-calendar-check",
    iconColor: "text-warning-600",
    grid: 6,
    order: 20,
  },
  {
    field: "registrationDeadline",
    headerName: "Kayıt Son Tarihi",
    section: "dates",
    icon: "ph-bold ph-clock-countdown",
    iconColor: "text-danger-600",
    grid: 6,
    order: 30,
    condition: (e) => !!e.registrationDeadline,
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma Tarihi",
    section: "dates",
    icon: "ph-bold ph-calendar-plus",
    iconColor: "text-neutral-500",
    grid: 6,
    order: 40,
  },
  {
    field: "updatedAt",
    headerName: "Son Güncelleme",
    section: "dates",
    icon: "ph-bold ph-calendar-dots",
    iconColor: "text-neutral-400",
    grid: 6,
    order: 50,
  },

  // ─── DETAILS ─────────────────────────────────────────────────────────────
  // description: native — details renderer data.description metnini gösterir
  {
    field: "description",
    headerName: "Açıklama",
    section: "details",
    icon: "ph-bold ph-text-align-left",
    iconColor: "text-primary-700",
    grid: 12,
    order: 10,
    condition: (e) => !!e.description,
  },
  {
    field: "deliveryFormat",
    headerName: "Sunum Formatı",
    section: "details",
    icon: "ph-bold ph-presentation",
    iconColor: "text-primary-700",
    grid: 4,
    order: 20,
    renderCell: renderDeliveryFormat,
  },
  {
    field: "location",
    headerName: "Fiziksel Konum",
    section: "details",
    icon: "ph-bold ph-map-pin",
    iconColor: "text-primary-700",
    grid: 4,
    order: 30,
    condition: (e) => !!e.location,
    renderCell: renderLocation,
  },
  {
    field: "onlineLink",
    headerName: "Online Bağlantı",
    section: "details",
    icon: "ph-bold ph-link",
    iconColor: "text-primary-700",
    grid: 4,
    order: 40,
    condition: (e) => !!e.onlineLink,
    renderCell: renderOnlineLink,
  },
  {
    field: "targetAudience",
    headerName: "Hedef Kitle",
    section: "details",
    icon: "ph-bold ph-users-three",
    iconColor: "text-primary-700",
    grid: 6,
    order: 50,
    condition: (e) => !!e.targetAudience,
  },
  {
    field: "speakerInfo",
    headerName: "Konuşmacı",
    section: "details",
    icon: "ph-bold ph-microphone",
    iconColor: "text-warning-600",
    grid: 6,
    order: 60,
    condition: (e) => !!(e.speakerName || e.speakerBio),
    renderCell: renderSpeakerInfo,
  },
  {
    field: "organizer",
    headerName: "Organizatör",
    section: "details",
    icon: "ph-bold ph-buildings",
    iconColor: "text-primary-700",
    grid: 6,
    order: 70,
    condition: (e) => !!e.organizer,
    renderCell: renderOrganizerCard,
  },
  {
    field: "createdByUserEmail",
    headerName: "Kayıt Bilgileri",
    section: "details",
    icon: "ph-bold ph-user-circle",
    iconColor: "text-neutral-500",
    grid: 6,
    order: 80,
    condition: (e) => !!e.createdByUserEmail,
    renderCell: renderCreatorInfo,
  },
];
