/**
 * Appointment utility functions for handling appointment types, icons, and display names
 */

/**
 * Returns the appropriate Phosphor icon class for a given appointment type
 * @param appointmentType - The appointment type enum value
 * @returns The Phosphor icon class name
 */
export const getSlotTypeIcon = (appointmentType?: string): string => {
  switch (appointmentType) {
    case "INFORMATION_MEETING":
      return "ph-info";
    case "SCHOOL_TOUR":
      return "ph-buildings";
    case "ENROLLMENT_INTERVIEW":
      return "ph-user-check";
    case "PARENT_MEETING":
      return "ph-users";
    case "CONSULTATION":
      return "ph-chat-circle";
    case "ASSESSMENT":
      return "ph-clipboard-text";
    case "ORIENTATION":
      return "ph-compass";
    case "ONLINE_MEETING":
      return "ph-video-camera";
    case "PHONE_CALL":
      return "ph-phone";
    case "GROUP_MEETING":
      return "ph-users-three";
    default:
      return "ph-calendar";
  }
};

/**
 * Returns the Turkish display name for a given appointment type
 * @param appointmentType - The appointment type enum value
 * @returns The localized display name in Turkish
 */
export const getTypeDisplayName = (appointmentType?: string): string => {
  switch (appointmentType) {
    case "INFORMATION_MEETING":
      return "Bilgi Toplantısı";
    case "SCHOOL_TOUR":
      return "Okul Turu";
    case "ENROLLMENT_INTERVIEW":
      return "Kayıt Görüşmesi";
    case "PARENT_MEETING":
      return "Veli Toplantısı";
    case "CONSULTATION":
      return "Danışmanlık";
    case "ASSESSMENT":
      return "Değerlendirme";
    case "ORIENTATION":
      return "Oryantasyon";
    case "ONLINE_MEETING":
      return "Online Görüşme";
    case "PHONE_CALL":
      return "Telefon Görüşmesi";
    case "GROUP_MEETING":
      return "Grup Toplantısı";
    default:
      return "Diğer";
  }
};
