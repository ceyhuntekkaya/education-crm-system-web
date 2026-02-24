"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge, Button } from "@/components";
import type { EventDto } from "@/types";
import { useCompanyEventsContext } from "../contexts/events-context";
import {
  getEventTypeBadgeVariant,
  getEventTypeDisplay,
  getEventTypeIcon,
  getEventStatusBadgeVariant,
  getEventStatusDisplay,
  getDeliveryFormatDisplay,
  getDeliveryFormatIcon,
} from "../utils/event-helpers";

interface CompanyEventCardProps {
  event: EventDto;
}

function formatDateRange(start?: string | null, end?: string | null): string {
  if (!start) return "-";
  const s = new Date(start);
  const dateStr = s.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
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
  if (sameDay) return `${dateStr}, ${startTime} - ${endTime}`;
  const endDateStr = e.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${dateStr} - ${endDateStr}`;
}

export const CompanyEventCard: React.FC<CompanyEventCardProps> = ({ event }) => {
  const router = useRouter();

  const typeBadgeVariant = getEventTypeBadgeVariant(event.eventType);
  const typeIcon = getEventTypeIcon(event.eventType);
  const organizerInitial = event.organizer?.name?.[0]?.toUpperCase() ?? "?";

  const { registeredEventIds } = useCompanyEventsContext();

  const isFull =
    event.remainingCapacity !== null &&
    event.remainingCapacity !== undefined &&
    event.remainingCapacity <= 0;

  const isPast =
    !!event.endDateTime && new Date(event.endDateTime) < new Date();

  const isRegistered = registeredEventIds.has(event.id);

  return (
    <>
      <div
        className="bg-white rounded-16 h-100 overflow-hidden d-flex flex-column"
        style={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
          border: "1.5px solid hsl(var(--neutral-40))",
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
        }}
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
        {/* ── Header Image ── */}
        <div
          className="position-relative overflow-hidden flex-shrink-0"
          style={{ height: 160 }}
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
                style={{ fontSize: 64, opacity: 0.4 }}
              />
            </div>
          )}

          {/* Tür badge — sağ üst */}
          <div
            className="position-absolute"
            style={{ top: 12, right: 12, zIndex: 2 }}
          >
            <Badge variant={typeBadgeVariant} size="md">
              {getEventTypeDisplay(event.eventType)}
            </Badge>
          </div>

          {/* Durum badge — sol üst */}
          <div
            className="position-absolute"
            style={{ top: 12, left: 12, zIndex: 2 }}
          >
            <Badge variant={getEventStatusBadgeVariant(event.status)} size="sm">
              {getEventStatusDisplay(event.status)}
            </Badge>
          </div>

          {/* Sertifika rozeti */}
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
                  padding: "3px 8px",
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

        {/* ── Content ── */}
        <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
          {/* Organizatör */}
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
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
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
              <span className="text-xs text-neutral-500 fw-medium text-truncate">
                {event.organizer.name}
              </span>
            </div>
          )}

          {/* Başlık */}
          <h5
            className="mb-12 fw-semibold text-md text-neutral-900"
            style={{ lineHeight: 1.35 }}
          >
            {event.title || "İsimsiz Etkinlik"}
          </h5>

          {/* Format */}
          <div className="d-flex align-items-center gap-8 mb-8 text-sm text-neutral-600">
            <i
              className={`ph ${getDeliveryFormatIcon(event.deliveryFormat)} text-primary-400`}
            />
            <span>{getDeliveryFormatDisplay(event.deliveryFormat)}</span>
          </div>

          {/* Lokasyon */}
          {event.location && event.deliveryFormat === "IN_PERSON" && (
            <div className="d-flex align-items-center gap-8 mb-8 text-sm text-neutral-600">
              <i className="ph ph-map-pin text-danger-400" />
              <span className="text-truncate">{event.location}</span>
            </div>
          )}

          {/* Tarih aralığı */}
          <div className="d-flex align-items-center gap-8 mb-8 text-sm text-neutral-600">
            <i className="ph ph-calendar text-success-500" />
            <span>
              {formatDateRange(event.startDateTime, event.endDateTime)}
            </span>
          </div>

          {/* Konuşmacı */}
          {event.speakerName && (
            <div className="d-flex align-items-center gap-8 mb-8 text-sm text-neutral-600">
              <i className="ph ph-microphone text-warning-500" />
              <span className="text-truncate">{event.speakerName}</span>
            </div>
          )}

          <div className="flex-grow-1" />

          {/* ── Footer ── */}
          <div
            className="d-flex align-items-center justify-content-between mt-12 pt-12"
            style={{ borderTop: "1px solid hsl(var(--neutral-40))" }}
          >
            {/* Kayıt sayısı */}
            <div className="d-flex align-items-center gap-4 text-xs text-neutral-500">
              <i className="ph ph-users text-primary-400" />
              <span>
                <span className="fw-semibold text-neutral-700">
                  {event.registrationCount ?? 0}
                </span>
                {event.maxCapacity != null ? ` / ${event.maxCapacity}` : ""}
                {" kayıt"}
              </span>
            </div>

            {/* Kalan kontenjan */}
            <div className="d-flex align-items-center gap-4 text-xs text-neutral-500">
              <i className="ph ph-ticket text-primary-400" />
              <span>
                {event.remainingCapacity != null
                  ? `${event.remainingCapacity} kalan`
                  : "Sınırsız"}
              </span>
            </div>
          </div>

          {/* Katıl Butonu */}
          <div className="mt-12">
            {isRegistered ? (
              <div
                className="d-flex align-items-center justify-content-center gap-8 py-6 px-12 rounded-8 text-sm fw-semibold"
                style={{
                  background: "hsl(var(--success-50))",
                  color: "hsl(var(--success-600))",
                  border: "1.5px solid hsl(var(--success-200))",
                }}
              >
                <i className="ph-fill ph-check-circle" />
                Kayıt Yapıldı
              </div>
            ) : isPast ? (
              <Button
                variant="outline"
                size="sm"
                fullWidth
                disabled
                leftIcon="ph-calendar-x"
              >
                Etkinlik Sona Erdi
              </Button>
            ) : isFull ? (
              <Button
                variant="outline"
                size="sm"
                fullWidth
                disabled
                leftIcon="ph-x-circle"
              >
                Kontenjan Dolu
              </Button>
            ) : (
              <Button
                variant="inline"
                size="sm"
                fullWidth
                onClick={() =>
                  router.push(`/individual/company/events/register/${event.id}`)
                }
                leftIcon="ph-calendar-check"
              >
                Katıl
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

