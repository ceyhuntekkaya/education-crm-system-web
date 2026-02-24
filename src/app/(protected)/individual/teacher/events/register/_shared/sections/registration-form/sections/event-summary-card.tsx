"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components";
import { renderHtml } from "@/utils";
import { useEventRegistrationAdd } from "../../../context";
import {
  getEventTypeBadgeVariant,
  getEventTypeDisplay,
  getEventTypeIcon,
  getEventStatusBadgeVariant,
  getEventStatusDisplay,
  getDeliveryFormatDisplay,
  getDeliveryFormatIcon,
} from "@/app/(protected)/individual/teacher/events/_shared/utils/event-helpers";

function formatDateRange(start?: string | null, end?: string | null): string {
  if (!start) return "-";
  const s = new Date(start);
  const dateStr = s.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const startTime = s.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (!end) return `${dateStr}, ${startTime}`;
  const e = new Date(end);
  const sameDay =
    s.getFullYear() === e.getFullYear() &&
    s.getMonth() === e.getMonth() &&
    s.getDate() === e.getDate();
  const endTime = e.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (sameDay) return `${dateStr}, ${startTime} – ${endTime}`;
  const endDateStr = e.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${dateStr} – ${endDateStr}`;
}

/**
 * Etkinlik özet kartı — kayıt sayfasının sol kısmında sticky olarak durur
 */
export const EventSummaryCard: React.FC = () => {
  const { event } = useEventRegistrationAdd();

  if (!event) {
    return (
      <div className="bg-white rounded-12 shadow-sm">
        <div className="p-20 border-bottom border-neutral-100">
          <h6 className="mb-0 fw-semibold text-neutral-500">
            Etkinlik Yükleniyor...
          </h6>
        </div>
      </div>
    );
  }

  const organizerInitial = event.organizer?.name?.[0]?.toUpperCase() ?? "?";
  const typeIcon = getEventTypeIcon(event.eventType);

  const isFull =
    event.remainingCapacity !== null &&
    event.remainingCapacity !== undefined &&
    event.remainingCapacity <= 0;

  return (
    <div className="bg-white rounded-12 shadow-sm overflow-hidden">
      {/* Cover image */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: 180 }}
      >
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
              className={`ph-duotone ${typeIcon} text-main-600`}
              style={{ fontSize: 72, opacity: 0.4 }}
            />
          </div>
        )}
        {/* Badges */}
        <div
          className="position-absolute d-flex align-items-start justify-content-between w-100 p-12"
          style={{ top: 0, left: 0, zIndex: 2 }}
        >
          <Badge variant={getEventStatusBadgeVariant(event.status)} size="sm">
            {getEventStatusDisplay(event.status)}
          </Badge>
          <Badge variant={getEventTypeBadgeVariant(event.eventType)} size="md">
            {getEventTypeDisplay(event.eventType)}
          </Badge>
        </div>
        {/* Certificate badge */}
        {event.certificateEnabled && (
          <div
            className="position-absolute"
            style={{ bottom: 10, right: 10, zIndex: 2 }}
          >
            <span
              className="d-flex align-items-center gap-4 fw-semibold"
              style={{
                background: "rgba(255,255,255,0.92)",
                borderRadius: 8,
                padding: "3px 10px",
                fontSize: "0.6875rem",
                color: "#059669",
                backdropFilter: "blur(4px)",
              }}
            >
              <i
                className="ph-fill ph-certificate"
                style={{ fontSize: "0.75rem" }}
              />
              Sertifika
            </span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="p-20 border-bottom border-neutral-100">
        {event.organizer?.name && (
          <div className="d-flex align-items-center gap-8 mb-10">
            {event.organizer.logoUrl ? (
              <div
                className="overflow-hidden flex-shrink-0"
                style={{ width: 22, height: 22, borderRadius: 6 }}
              >
                <Image
                  src={event.organizer.logoUrl}
                  alt={event.organizer.name}
                  width={22}
                  height={22}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            ) : (
              <div
                className="d-flex align-items-center justify-content-center fw-bold text-primary-600 flex-shrink-0"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background:
                    "linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)",
                  fontSize: "0.625rem",
                }}
              >
                {organizerInitial}
              </div>
            )}
            <span className="text-xs text-neutral-500 fw-medium">
              {event.organizer.name}
            </span>
          </div>
        )}
        <h5
          className="mb-0 fw-bold text-neutral-900"
          style={{ lineHeight: 1.3 }}
        >
          {event.title}
        </h5>
      </div>

      {/* Details */}
      <div className="p-20">
        <div className="d-flex flex-column gap-14">
          {/* Tarih */}
          <div className="d-flex align-items-start gap-12">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-8"
              style={{
                width: 32,
                height: 32,
                background: "hsl(var(--success-50))",
              }}
            >
              <i
                className="ph ph-calendar text-success-600"
                style={{ fontSize: 16 }}
              />
            </div>
            <div>
              <p className="mb-0 text-xs text-neutral-500">Tarih &amp; Saat</p>
              <p className="mb-0 text-sm text-neutral-900 fw-medium">
                {formatDateRange(event.startDateTime, event.endDateTime)}
              </p>
            </div>
          </div>

          {/* Format */}
          <div className="d-flex align-items-start gap-12">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-8"
              style={{
                width: 32,
                height: 32,
                background: "hsl(var(--primary-50))",
              }}
            >
              <i
                className={`ph ${getDeliveryFormatIcon(event.deliveryFormat)} text-primary-600`}
                style={{ fontSize: 16 }}
              />
            </div>
            <div>
              <p className="mb-0 text-xs text-neutral-500">Format</p>
              <p className="mb-0 text-sm text-neutral-900 fw-medium">
                {getDeliveryFormatDisplay(event.deliveryFormat)}
              </p>
            </div>
          </div>

          {/* Konum */}
          {event.location && event.deliveryFormat === "IN_PERSON" && (
            <div className="d-flex align-items-start gap-12">
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-8"
                style={{
                  width: 32,
                  height: 32,
                  background: "hsl(var(--danger-50))",
                }}
              >
                <i
                  className="ph ph-map-pin text-danger-600"
                  style={{ fontSize: 16 }}
                />
              </div>
              <div>
                <p className="mb-0 text-xs text-neutral-500">Konum</p>
                <p className="mb-0 text-sm text-neutral-900 fw-medium">
                  {event.location}
                </p>
              </div>
            </div>
          )}

          {/* Online link */}
          {event.onlineLink && event.deliveryFormat === "ONLINE" && (
            <div className="d-flex align-items-start gap-12">
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-8"
                style={{
                  width: 32,
                  height: 32,
                  background: "hsl(var(--info-50))",
                }}
              >
                <i
                  className="ph ph-video-camera text-info-600"
                  style={{ fontSize: 16 }}
                />
              </div>
              <div>
                <p className="mb-0 text-xs text-neutral-500">Bağlantı</p>
                <a
                  href={event.onlineLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-0 text-sm text-primary-600 fw-medium"
                >
                  Katılım Bağlantısı
                </a>
              </div>
            </div>
          )}

          {/* Konuşmacı */}
          {event.speakerName && (
            <div className="d-flex align-items-start gap-12">
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-8"
                style={{
                  width: 32,
                  height: 32,
                  background: "hsl(var(--warning-50))",
                }}
              >
                <i
                  className="ph ph-microphone text-warning-600"
                  style={{ fontSize: 16 }}
                />
              </div>
              <div>
                <p className="mb-0 text-xs text-neutral-500">Konuşmacı</p>
                <p className="mb-0 text-sm text-neutral-900 fw-medium">
                  {event.speakerName}
                </p>
              </div>
            </div>
          )}

          {/* Kontenjan */}
          <div className="d-flex align-items-start gap-12">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-8"
              style={{
                width: 32,
                height: 32,
                background: "hsl(var(--neutral-50))",
              }}
            >
              <i
                className="ph ph-users text-neutral-600"
                style={{ fontSize: 16 }}
              />
            </div>
            <div>
              <p className="mb-0 text-xs text-neutral-500">Kontenjan</p>
              <p className="mb-0 text-sm text-neutral-900 fw-medium">
                <span className="fw-bold">{event.registrationCount ?? 0}</span>
                {event.maxCapacity != null && ` / ${event.maxCapacity}`} kayıt
                {event.remainingCapacity != null && (
                  <span
                    className={`ms-6 fw-semibold ${isFull ? "text-danger-600" : "text-success-600"}`}
                  >
                    ({isFull ? "Dolu" : `${event.remainingCapacity} yer kaldı`})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <div
            className="mt-16 pt-16"
            style={{ borderTop: "1px solid hsl(var(--neutral-40))" }}
          >
            <p className="mb-0 text-xs text-neutral-500 mb-6">Açıklama</p>
            <div
              className="mb-0 text-sm text-neutral-700 tiptap-content"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              {...renderHtml(event.description)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
