import type { OrganizerType } from "@/types";

/**
 * Düzenleyen türüne göre badge variant'ı döner
 */
export const getOrganizerTypeBadgeVariant = (
  type: OrganizerType,
): "success" | "warning" | "danger" | "info" | "primary" | "secondary" | "dark" => {
  switch (type) {
    case "UNIVERSITY":
      return "primary";
    case "EDUCATION_COMPANY":
      return "info";
    case "ASSOCIATION":
      return "success";
    case "GOVERNMENT":
      return "dark";
    case "INDIVIDUAL_TRAINER":
      return "warning";
    case "PLATFORM":
      return "secondary";
    case "OTHER":
    default:
      return "secondary";
  }
};

/**
 * Düzenleyen türünü Türkçe'ye çevirir
 */
export const getOrganizerTypeDisplay = (type: OrganizerType): string => {
  switch (type) {
    case "UNIVERSITY":
      return "Üniversite";
    case "EDUCATION_COMPANY":
      return "Eğitim Şirketi";
    case "ASSOCIATION":
      return "Dernek";
    case "GOVERNMENT":
      return "Devlet Kurumu";
    case "INDIVIDUAL_TRAINER":
      return "Bireysel Eğitmen";
    case "PLATFORM":
      return "Platform";
    case "OTHER":
    default:
      return "Diğer";
  }
};

/**
 * Düzenleyen türüne göre ikon döner
 */
export const getOrganizerTypeIcon = (type: OrganizerType): string => {
  switch (type) {
    case "UNIVERSITY":
      return "ph-graduation-cap";
    case "EDUCATION_COMPANY":
      return "ph-buildings";
    case "ASSOCIATION":
      return "ph-users-three";
    case "GOVERNMENT":
      return "ph-bank";
    case "INDIVIDUAL_TRAINER":
      return "ph-person";
    case "PLATFORM":
      return "ph-monitor";
    case "OTHER":
    default:
      return "ph-dots-three";
  }
};
