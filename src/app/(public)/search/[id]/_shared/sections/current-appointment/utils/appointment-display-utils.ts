/**
 * Appointment display utility functions
 * Handles status, type, and visual representation of appointments
 */

export interface StatusInfo {
  color: string;
  icon: string;
  text: string;
}

export interface TypeInfo {
  icon: string;
  text: string;
  color: string;
}

/**
 * Returns status information for appointment status display
 * @param status - Appointment status
 * @returns StatusInfo object with color, icon, and text
 */
export const getAppointmentStatusInfo = (status: string): StatusInfo => {
  switch (status) {
    case "CONFIRMED":
      return { color: "success", icon: "ph-check-circle", text: "Onaylandı" };
    case "PENDING":
      return { color: "warning", icon: "ph-clock", text: "Beklemede" };
    case "COMPLETED":
      return {
        color: "main",
        icon: "ph-check-circle-fill",
        text: "Tamamlandı",
      };
    case "CANCELLED":
      return { color: "danger", icon: "ph-x-circle", text: "İptal Edildi" };
    case "RESCHEDULED":
      return {
        color: "info",
        icon: "ph-arrow-clockwise",
        text: "Yeniden Planlandı",
      };
    case "IN_PROGRESS":
      return { color: "warning", icon: "ph-play", text: "Devam Ediyor" };
    case "APPROVED":
      return { color: "success", icon: "ph-check", text: "Onaylandı" };
    case "REJECTED":
      return { color: "danger", icon: "ph-x", text: "Reddedildi" };
    case "NO_SHOW":
      return { color: "danger", icon: "ph-user-x", text: "Gelmedi" };
    default:
      return { color: "neutral", icon: "ph-question", text: status };
  }
};

/**
 * Returns type information for appointment type display
 * @param type - Appointment type
 * @returns TypeInfo object with icon, text, and color
 */
export const getAppointmentTypeInfo = (type: string): TypeInfo => {
  switch (type) {
    case "INFORMATION_MEETING":
      return { icon: "ph-info", text: "Bilgi Toplantısı", color: "info" };
    case "SCHOOL_TOUR":
      return { icon: "ph-buildings", text: "Kurum Turu", color: "main" };
    case "ENROLLMENT_INTERVIEW":
      return {
        icon: "ph-user-plus",
        text: "Kayıt Görüşmesi",
        color: "success",
      };
    case "PARENT_MEETING":
      return { icon: "ph-users", text: "Veli Görüşmesi", color: "info" };
    case "CONSULTATION":
      return {
        icon: "ph-chat-circle-dots",
        text: "Danışmanlık",
        color: "warning",
      };
    case "ONLINE_MEETING":
      return {
        icon: "ph-video-camera",
        text: "Online Toplantı",
        color: "purple",
      };
    case "PHONE_CALL":
      return {
        icon: "ph-phone",
        text: "Telefon Görüşmesi",
        color: "secondary",
      };
    case "ASSESSMENT":
      return {
        icon: "ph-clipboard-text",
        text: "Değerlendirme",
        color: "danger",
      };
    case "ORIENTATION":
      return { icon: "ph-compass", text: "Oryantasyon", color: "info" };
    case "GROUP_MEETING":
      return { icon: "ph-users-three", text: "Grup Toplantısı", color: "info" };
    case "OTHER":
      return { icon: "ph-calendar", text: "Diğer", color: "neutral" };
    default:
      return { icon: "ph-calendar", text: "Randevu", color: "neutral" };
  }
};

/**
 * Formats countdown text for appointment
 * @param hoursUntil - Hours until appointment
 * @returns Formatted countdown text
 */
export const formatAppointmentCountdown = (hoursUntil: number): string => {
  if (hoursUntil < 1) {
    const minutes = Math.round(hoursUntil * 60);
    return `${minutes} dakika kaldı`;
  } else if (hoursUntil < 24) {
    return `${Math.round(hoursUntil)} saat kaldı`;
  } else {
    const days = Math.floor(hoursUntil / 24);
    return `${days} gün kaldı`;
  }
};

/**
 * Gets the appropriate countdown color based on time remaining
 * @param hoursUntil - Hours until appointment
 * @returns Color class name
 */
export const getCountdownColor = (hoursUntil: number): string => {
  if (hoursUntil < 2) return "danger"; // Less than 2 hours - red
  if (hoursUntil < 24) return "warning"; // Less than 24 hours - yellow
  return "info"; // More than 24 hours - blue
};

/**
 * Formats gender value for display
 * @param gender - Gender value (MALE, FEMALE, OTHER, Erkek, Kız, etc.)
 * @returns Formatted gender text
 */
export const formatGender = (gender?: string): string => {
  if (!gender) return "Belirtilmemiş";

  const normalized = gender.toUpperCase();

  switch (normalized) {
    case "MALE":
    case "ERKEK":
    case "M":
      return "Erkek";
    case "FEMALE":
    case "KIZ":
    case "KADIN":
    case "F":
      return "Kız";
    case "OTHER":
    case "DIGER":
      return "Diğer";
    default:
      return gender;
  }
};
