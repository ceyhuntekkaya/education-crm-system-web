import React from "react";
import { Badge } from "@/components";
import type { EventDto } from "@/types";
import type { DetailColumn } from "@/components/layouts/detail-layout/types";
import { formatDate } from "@/utils";
import {
  getEventTypeBadgeVariant,
  getEventTypeDisplay,
  getEventTypeIcon,
  getEventStatusBadgeVariant,
  getEventStatusDisplay,
  getDeliveryFormatDisplay,
  getDeliveryFormatIcon,
} from "../../../../_shared/utils/event-helpers";

// ─── Info Section ─────────────────────────────────────────────────────────────

const renderBasicInfo = (event: EventDto) => (
  <div>
    <div
      className="position-relative overflow-hidden rounded-12 mb-16"
      style={{ height: "200px" }}
    >
      {event.coverImageUrl ? (
        <div
          style={{
            background: `url(${event.coverImageUrl}) center/cover no-repeat`,
            height: "100%",
          }}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center h-100"
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
      <div className="position-absolute top-0 start-0 p-12">
        <Badge variant={getEventStatusBadgeVariant(event.status)} size="md">
          {getEventStatusDisplay(event.status)}
        </Badge>
      </div>
      <div className="position-absolute top-0 end-0 p-12">
        <Badge variant={getEventTypeBadgeVariant(event.eventType)} size="md">
          {getEventTypeDisplay(event.eventType)}
        </Badge>
      </div>
    </div>
    <h1
      className="mb-8 fw-bold text-neutral-900"
      style={{ fontSize: "1.75rem", lineHeight: 1.25 }}
    >
      {event.title}
    </h1>
    {event.organizer?.name && (
      <div className="d-flex align-items-center gap-8 text-neutral-500">
        <i className="ph ph-buildings text-primary-500"></i>
        <span className="text-sm">{event.organizer.name}</span>
      </div>
    )}
  </div>
);

const renderRegistrationCount = (event: EventDto) => {
  const count = event.registrationCount || 0;
  return (
    <div className="d-flex align-items-center gap-12">
      <div
        className={`d-flex align-items-center justify-content-center ${count > 0 ? "bg-primary-100" : "bg-neutral-100"}`}
        style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }}
      >
        <i
          className={`ph-bold ph-users ${count > 0 ? "text-primary-700" : "text-neutral-500"}`}
          style={{ fontSize: "1.75rem" }}
        />
      </div>
      <div>
        <p
          className="mb-2 text-neutral-600 fw-medium"
          style={{ fontSize: "0.8125rem" }}
        >
          Kayıt Sayısı
        </p>
        <p
          className={`mb-0 fw-bold ${count > 0 ? "text-primary-700" : "text-neutral-400"}`}
          style={{ fontSize: "1.5rem" }}
        >
          {count}
        </p>
      </div>
    </div>
  );
};

const renderCapacityMeta = (event: EventDto) => (
  <div className="d-flex align-items-center gap-12">
    <div
      className="d-flex align-items-center justify-content-center bg-info-100"
      style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }}
    >
      <i
        className="ph-bold ph-ticket text-info-700"
        style={{ fontSize: "1.75rem" }}
      />
    </div>
    <div>
      <p
        className="mb-2 text-neutral-600 fw-medium"
        style={{ fontSize: "0.8125rem" }}
      >
        Kontenjan
      </p>
      <p className="mb-0 fw-bold text-info-700" style={{ fontSize: "1.5rem" }}>
        {event.maxCapacity != null ? event.maxCapacity : "∞"}
      </p>
    </div>
  </div>
);

const renderAutoApproveMeta = (event: EventDto) => (
  <div className="d-flex align-items-center gap-12">
    <div
      className={`d-flex align-items-center justify-content-center ${event.autoApproveRegistration ? "bg-success-100" : "bg-neutral-100"}`}
      style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }}
    >
      <i
        className={`ph-bold ${event.autoApproveRegistration ? "ph-check-circle text-success-700" : "ph-clock text-neutral-500"}`}
        style={{ fontSize: "1.75rem" }}
      />
    </div>
    <div>
      <p
        className="mb-2 text-neutral-600 fw-medium"
        style={{ fontSize: "0.8125rem" }}
      >
        Kayıt Onayı
      </p>
      <p
        className={`mb-0 fw-semibold ${event.autoApproveRegistration ? "text-success-700" : "text-neutral-500"}`}
        style={{ fontSize: "1rem" }}
      >
        {event.autoApproveRegistration ? "Otomatik" : "Manuel"}
      </p>
    </div>
  </div>
);

const renderSpeakerInfo = (event: EventDto) => (
  <div className="d-flex flex-column gap-8">
    {event.speakerName && (
      <div className="fw-semibold text-neutral-900">{event.speakerName}</div>
    )}
    {event.speakerBio && (
      <p className="text-neutral-600 text-sm mb-0">{event.speakerBio}</p>
    )}
  </div>
);

export const createEventDetailColumns = (): DetailColumn<EventDto>[] => [
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
  {
    field: "registrationCount",
    headerName: "Kayıt Sayısı",
    section: "meta",
    icon: "ph-bold ph-users",
    iconColor: "text-primary-700",
    width: 50,
    order: 0,
    renderCell: renderRegistrationCount,
  },
  {
    field: "maxCapacity",
    headerName: "Kontenjan",
    section: "meta",
    icon: "ph-bold ph-ticket",
    iconColor: "text-info-700",
    width: 50,
    order: 10,
    renderCell: renderCapacityMeta,
  },
  {
    field: "autoApproveRegistration",
    headerName: "Kayıt Onayı",
    section: "meta",
    icon: "ph-bold ph-check-circle",
    iconColor: "text-success-700",
    width: 50,
    order: 20,
    renderCell: renderAutoApproveMeta,
  },
  {
    field: "description",
    headerName: "Açıklama",
    section: "details",
    icon: "ph-bold ph-text-align-left",
    iconColor: "text-primary-700",
    grid: 12,
    order: 0,
    condition: (e) => !!e.description,
    renderCell: (event: EventDto) => (
      <p className="text-neutral-600 mb-0" style={{ lineHeight: 1.7 }}>
        {event.description}
      </p>
    ),
  },
  {
    field: "deliveryFormat",
    headerName: "Sunum Formatı",
    section: "details",
    icon: "ph-bold ph-presentation",
    iconColor: "text-primary-700",
    grid: 6,
    order: 5,
    renderCell: (event: EventDto) => (
      <div className="d-flex align-items-center gap-8">
        <i
          className={`ph ${getDeliveryFormatIcon(event.deliveryFormat)} text-primary-500`}
        ></i>
        <span className="fw-semibold text-neutral-800">
          {getDeliveryFormatDisplay(event.deliveryFormat)}
        </span>
      </div>
    ),
  },
  {
    field: "dateTime",
    headerName: "Tarih & Saat",
    section: "details",
    icon: "ph-bold ph-clock",
    iconColor: "text-primary-700",
    grid: 6,
    order: 10,
    renderCell: (event: EventDto) => (
      <div className="d-flex flex-column gap-8">
        <div>
          <div className="text-xs text-neutral-400 mb-4">Başlangıç</div>
          <div className="fw-semibold text-neutral-800">
            {event.startDateTime ? formatDate(event.startDateTime) : "-"}
          </div>
        </div>
        <div>
          <div className="text-xs text-neutral-400 mb-4">Bitiş</div>
          <div className="fw-semibold text-neutral-800">
            {event.endDateTime ? formatDate(event.endDateTime) : "-"}
          </div>
        </div>
        {event.registrationDeadline && (
          <div>
            <div className="text-xs text-neutral-400 mb-4">
              Kayıt Son Tarihi
            </div>
            <div className="fw-semibold text-neutral-800">
              {formatDate(event.registrationDeadline)}
            </div>
          </div>
        )}
      </div>
    ),
  },
  {
    field: "location",
    headerName: "Fiziksel Konum",
    section: "details",
    icon: "ph-bold ph-map-pin",
    iconColor: "text-primary-700",
    grid: 6,
    order: 25,
    condition: (e) => !!e.location,
    renderCell: (event: EventDto) => (
      <span className="text-neutral-700">{event.location}</span>
    ),
  },
  {
    field: "onlineLink",
    headerName: "Online Bağlantı",
    section: "details",
    icon: "ph-bold ph-link",
    iconColor: "text-primary-700",
    grid: 6,
    order: 30,
    condition: (e) => !!e.onlineLink,
    renderCell: (event: EventDto) => (
      <a
        href={event.onlineLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 text-sm text-break"
      >
        {event.onlineLink}
      </a>
    ),
  },
  {
    field: "targetAudience",
    headerName: "Hedef Kitle",
    section: "details",
    icon: "ph-bold ph-users-three",
    iconColor: "text-primary-700",
    grid: 6,
    order: 35,
    condition: (e) => !!e.targetAudience,
    renderCell: (event: EventDto) => (
      <span className="text-neutral-700">{event.targetAudience}</span>
    ),
  },
  {
    field: "speakerInfo",
    headerName: "Konuşmacı",
    section: "details",
    icon: "ph-bold ph-microphone",
    iconColor: "text-primary-700",
    grid: 6,
    order: 40,
    condition: (e) => !!(e.speakerName || e.speakerBio),
    renderCell: renderSpeakerInfo,
  },
  {
    field: "createdAt",
    headerName: "Oluşturulma Tarihi",
    section: "dates",
    icon: "ph-bold ph-calendar-plus",
    iconColor: "text-neutral-500",
    renderCell: (event: EventDto) => (
      <span className="text-neutral-700 text-sm">
        {event.createdAt ? formatDate(event.createdAt) : "-"}
      </span>
    ),
  },
  {
    field: "updatedAt",
    headerName: "Son Güncelleme",
    section: "dates",
    icon: "ph-bold ph-calendar-check",
    iconColor: "text-neutral-500",
    renderCell: (event: EventDto) => (
      <span className="text-neutral-700 text-sm">
        {event.updatedAt ? formatDate(event.updatedAt) : "-"}
      </span>
    ),
  },
];
