import type { EventType, DeliveryFormat, EventStatus } from "@/types";
import type { OrganizerType } from "@/types/dto/webinar/EventOrganizerDto";

/**
 * Etkinlik türüne göre badge variant döner
 */
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

/**
 * Etkinlik türünü Türkçe'ye çevirir
 */
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

/**
 * Etkinlik türüne göre ikon döner
 */
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

/**
 * Teslimat formatını Türkçe'ye çevirir
 */
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

/**
 * Teslimat formatı için ikon döner
 */
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

/**
 * Etkinlik durumu için badge variant döner
 */
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
      return "secondary";
    case "COMPLETED":
      return "info";
    case "CANCELLED":
      return "danger";
    default:
      return "secondary";
  }
};

/**
 * Etkinlik durumunu Türkçe'ye çevirir
 */
export const getEventStatusDisplay = (status: EventStatus): string => {
  switch (status) {
    case "DRAFT":
      return "Taslak";
    case "PUBLISHED":
      return "Yayında";
    case "COMPLETED":
      return "Tamamlandı";
    case "CANCELLED":
      return "İptal Edildi";
    default:
      return "Bilinmiyor";
  }
};

/**
 * Organizatör türünü Türkçe'ye çevirir
 */
export const getOrganizerTypeDisplay = (type: OrganizerType): string => {
  switch (type) {
    case "UNIVERSITY":
      return "Üniversite";
    case "EDUCATION_COMPANY":
      return "Eğitim Şirketi";
    case "ASSOCIATION":
      return "Dernek / Vakıf";
    case "GOVERNMENT":
      return "Kamu Kurumu";
    case "INDIVIDUAL_TRAINER":
      return "Bireysel Eğitmen";
    case "PLATFORM":
      return "Platform";
    case "OTHER":
      return "Diğer";
    default:
      return "Bilinmiyor";
  }
};
