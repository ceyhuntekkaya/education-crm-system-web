import type { EventType, DeliveryFormat, EventStatus } from "@/types";

export const getEventTypeBadgeVariant = (
  type: EventType,
):
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary"
  | "secondary"
  | "dark" => {
  switch (type) {
    case "WEBINAR":
      return "primary";
    case "SEMINAR":
      return "info";
    case "TRAINING":
      return "success";
    case "WORKSHOP":
      return "warning";
    default:
      return "secondary";
  }
};

export const getEventTypeDisplay = (type: EventType): string => {
  switch (type) {
    case "WEBINAR":
      return "Webinar";
    case "SEMINAR":
      return "Seminer";
    case "TRAINING":
      return "Eğitim";
    case "WORKSHOP":
      return "Atölye";
    default:
      return "Bilinmiyor";
  }
};

export const getEventTypeIcon = (type: EventType): string => {
  switch (type) {
    case "WEBINAR":
      return "ph-video-camera";
    case "SEMINAR":
      return "ph-presentation-chart";
    case "TRAINING":
      return "ph-books";
    case "WORKSHOP":
      return "ph-wrench";
    default:
      return "ph-calendar";
  }
};

export const getDeliveryFormatDisplay = (format: DeliveryFormat): string => {
  switch (format) {
    case "ONLINE":
      return "Online";
    case "IN_PERSON":
      return "Yüz Yüze";
    case "HYBRID":
      return "Hibrit";
    default:
      return "Bilinmiyor";
  }
};

export const getDeliveryFormatIcon = (format: DeliveryFormat): string => {
  switch (format) {
    case "ONLINE":
      return "ph-monitor";
    case "IN_PERSON":
      return "ph-map-pin";
    case "HYBRID":
      return "ph-intersect";
    default:
      return "ph-globe";
  }
};

export const getEventStatusBadgeVariant = (
  status: EventStatus,
):
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary"
  | "secondary"
  | "dark" => {
  switch (status) {
    case "PUBLISHED":
      return "success";
    case "DRAFT":
      return "warning";
    case "COMPLETED":
      return "info";
    case "CANCELLED":
      return "danger";
    default:
      return "secondary";
  }
};

export const getEventStatusDisplay = (status: EventStatus): string => {
  switch (status) {
    case "PUBLISHED":
      return "Yayında";
    case "DRAFT":
      return "Taslak";
    case "COMPLETED":
      return "Tamamlandı";
    case "CANCELLED":
      return "İptal";
    default:
      return "Bilinmiyor";
  }
};
