/**
 * Get Turkish display text for appointment status
 * @param status - Appointment status string
 * @returns Turkish display text
 */
export const getStatusDisplay = (status: string): string => {
  switch (status?.toUpperCase()) {
    case "CONFIRMED":
      return "Onaylandı";
    case "APPROVED":
      return "Onaylandı";
    case "COMPLETED":
      return "Tamamlandı";
    case "PENDING":
      return "Beklemede";
    case "IN_PROGRESS":
      return "Devam Ediyor";
    case "CANCELLED":
      return "İptal Edildi";
    case "REJECTED":
      return "Reddedildi";
    case "NO_SHOW":
      return "Gelmedi";
    case "RESCHEDULED":
      return "Ertelendi";
    default:
      return status || "-";
  }
};
