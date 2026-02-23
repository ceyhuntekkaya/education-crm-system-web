import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components";
import type { EventDto } from "@/types";
import {
  getEventTypeBadgeVariant,
  getEventTypeDisplay,
  getEventTypeIcon,
  getEventStatusBadgeVariant,
  getEventStatusDisplay,
  getDeliveryFormatDisplay,
  getDeliveryFormatIcon,
} from "../utils/event-helpers";
import { formatDate } from "@/utils";

interface EventCardProps {
  event: EventDto;
  url?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, url }) => {
  const router = useRouter();
  const typeBadgeVariant = getEventTypeBadgeVariant(event.eventType);
  const typeIcon = getEventTypeIcon(event.eventType);

  const content = (
    <div
      className="bg-white rounded-16 h-100 overflow-hidden transition-all d-flex flex-column"
      style={{
        boxShadow:
          "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        border: "1.5px solid hsl(var(--neutral-40))",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Header */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: "160px" }}
      >
        {/* Background gradient */}
        <div
          className="w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: event.coverImageUrl
              ? `url(${event.coverImageUrl}) center/cover no-repeat`
              : "linear-gradient(135deg, hsl(var(--main-50)) 0%, hsl(var(--main-100)) 100%)",
          }}
        >
          {!event.coverImageUrl && (
            <i
              className={`ph-duotone ${typeIcon} text-main-600`}
              style={{ fontSize: "64px", opacity: 0.4 }}
            ></i>
          )}
        </div>

        {/* Event Type Badge - Overlay */}
        <div
          className="position-absolute"
          style={{ top: "12px", right: "12px", zIndex: 2 }}
        >
          <Badge variant={typeBadgeVariant} size="md">
            {getEventTypeDisplay(event.eventType)}
          </Badge>
        </div>

        {/* Status Badge */}
        <div
          className="position-absolute"
          style={{ top: "12px", left: "12px", zIndex: 2 }}
        >
          <Badge variant={getEventStatusBadgeVariant(event.status)} size="sm">
            {getEventStatusDisplay(event.status)}
          </Badge>
        </div>

        {/* Cancelled Overlay */}
        {event.status === "CANCELLED" && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.75)",
              backdropFilter: "blur(2px)",
              zIndex: 3,
            }}
          >
            <span className="text-white fw-bold fs-5">İptal Edildi</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-16 p-md-20 d-flex flex-column flex-grow-1">
        {/* Title */}
        <h5 className="mb-4 fw-semibold line-height-1-3 text-md text-neutral-900">
          {event.title || "İsimsiz Etkinlik"}
        </h5>

        {/* Organizer */}
        {event.organizer?.name && (
          <div className="text-xs text-neutral-400 mb-12">
            <i className="ph ph-buildings me-1"></i>
            {event.organizer.name}
          </div>
        )}

        {/* Delivery Format */}
        <div className="d-flex align-items-center gap-8 mb-8 text-sm text-neutral-600">
          <i
            className={`ph ${getDeliveryFormatIcon(event.deliveryFormat)}`}
          ></i>
          <span>{getDeliveryFormatDisplay(event.deliveryFormat)}</span>
        </div>

        {/* Date Range */}
        <div className="d-flex align-items-center gap-8 mb-8 text-sm text-neutral-600">
          <i className="ph ph-calendar"></i>
          <span>
            {event.startDateTime ? formatDate(event.startDateTime) : "-"}
          </span>
        </div>

        {/* Speaker */}
        {event.speakerName && (
          <div className="d-flex align-items-center gap-8 mb-8 text-sm text-neutral-600">
            <i className="ph ph-microphone"></i>
            <span className="text-truncate">{event.speakerName}</span>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow-1" />

        {/* Footer: Capacity & Registration */}
        <div className="d-flex align-items-center justify-content-between mt-12 pt-12 border-top border-neutral-100">
          <div className="d-flex align-items-center gap-4 text-xs text-neutral-500">
            <i className="ph ph-users text-primary"></i>
            <span>{event.registrationCount || 0} kayıt</span>
          </div>
          <div className="text-xs text-neutral-500">
            <i className="ph ph-ticket me-1"></i>
            {event.maxCapacity != null
              ? `${event.maxCapacity} kontenjan`
              : "Sınırsız"}
          </div>
        </div>
      </div>
    </div>
  );

  if (url) {
    return (
      <div
        onClick={() => router.push(url)}
        style={{ cursor: "pointer" }}
        className="h-100"
      >
        {content}
      </div>
    );
  }

  return <div className="h-100">{content}</div>;
};
