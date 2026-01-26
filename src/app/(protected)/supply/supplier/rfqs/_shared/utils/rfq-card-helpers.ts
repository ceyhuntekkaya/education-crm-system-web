import type { RFQDto } from "@/types";
import {
  isRFQExpired,
  calculateDaysUntilDeadline,
  isRFQDeadlineApproaching,
} from "./rfq-status-helpers";

// ================== CARD BADGE HELPERS ==================

/**
 * RFQ kartı için deadline badge bilgilerini döndürür
 */
export function getDeadlineBadgeInfo(submissionDeadline?: string) {
  const isExpired = isRFQExpired(submissionDeadline);
  const daysUntil = calculateDaysUntilDeadline(submissionDeadline);
  const isApproaching = isRFQDeadlineApproaching(submissionDeadline);

  if (isExpired) {
    return {
      icon: "ph-fill ph-x-circle",
      text: "Süresi Doldu",
      bgColor: "#DC2626",
      textColor: "#FFFFFF",
    };
  }

  if (isApproaching && daysUntil !== null) {
    return {
      icon: "ph-fill ph-warning",
      text: `${daysUntil} Gün`,
      bgColor: "#F97316",
      textColor: "#FFFFFF",
    };
  }

  return {
    icon: "ph-fill ph-check-circle",
    text: daysUntil !== null && daysUntil > 7 ? `${daysUntil} Gün` : "Aktif",
    bgColor: "#059669",
    textColor: "#FFFFFF",
  };
}

// ================== CARD INFO HELPERS ==================

/**
 * RFQ kartı için özet bilgileri döndürür
 */
export function getRFQCardSummary(rfq: RFQDto) {
  return {
    itemCount: rfq.itemCount || 0,
    quotationCount: rfq.quotationCount || 0,
    invitationCount: rfq.invitationCount || 0,
  };
}
