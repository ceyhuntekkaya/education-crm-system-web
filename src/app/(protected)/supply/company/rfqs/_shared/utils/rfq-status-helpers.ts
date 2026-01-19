import type { RFQStatus, RFQType } from "@/types";

type RFQDtoStatus = RFQStatus;
type RFQDtoRfqType = RFQType;

// ================== STATUS HELPERS ==================

/**
 * RFQ status'ü için badge variant döndürür
 */
export function getRFQStatusBadgeVariant(
  status?: RFQDtoStatus
): "success" | "warning" | "danger" | "info" | "light" {
  switch (status) {
    case "PUBLISHED":
      return "success";
    case "DRAFT":
      return "warning";
    case "CLOSED":
      return "danger";
    case "CANCELLED":
      return "danger";
    default:
      return "light";
  }
}

/**
 * RFQ status'ü için display text döndürür
 */
export function getRFQStatusDisplay(status?: RFQDtoStatus): string {
  switch (status) {
    case "PUBLISHED":
      return "Yayınlandı";
    case "DRAFT":
      return "Taslak";
    case "CLOSED":
      return "Kapatıldı";
    case "CANCELLED":
      return "İptal Edildi";
    default:
      return "Bilinmiyor";
  }
}

/**
 * RFQ status'ü için renk bilgilerini döndürür
 */
export function getRFQStatusConfig(status?: RFQDtoStatus) {
  switch (status) {
    case "PUBLISHED":
      return {
        bgClass: "bg-success-100",
        textClass: "text-success-700",
        text: "Yayınlandı",
      };
    case "DRAFT":
      return {
        bgClass: "bg-warning-100",
        textClass: "text-warning-700",
        text: "Taslak",
      };
    case "CLOSED":
      return {
        bgClass: "bg-danger-100",
        textClass: "text-danger-700",
        text: "Kapatıldı",
      };
    case "CANCELLED":
      return {
        bgClass: "bg-danger-100",
        textClass: "text-danger-700",
        text: "İptal Edildi",
      };
    default:
      return {
        bgClass: "bg-neutral-100",
        textClass: "text-neutral-700",
        text: "Bilinmiyor",
      };
  }
}

// ================== RFQ TYPE HELPERS ==================

/**
 * RFQ type'ı için display text döndürür
 */
export function getRFQTypeDisplay(rfqType?: RFQDtoRfqType): string {
  switch (rfqType) {
    case "OPEN":
      return "Açık";
    case "INVITED":
      return "Davetli";
    default:
      return "Bilinmiyor";
  }
}

/**
 * RFQ type'ı için badge variant döndürür
 */
export function getRFQTypeBadgeVariant(
  rfqType?: RFQDtoRfqType
): "success" | "info" {
  switch (rfqType) {
    case "OPEN":
      return "success";
    case "INVITED":
      return "info";
    default:
      return "info";
  }
}

// ================== DATE HELPERS ==================

/**
 * RFQ'nun son başvuru tarihinin dolup dolmadığını kontrol eder
 */
export function isRFQExpired(submissionDeadline?: string): boolean {
  if (!submissionDeadline) return false;
  const deadline = new Date(submissionDeadline);
  const now = new Date();
  return deadline < now;
}

/**
 * Son başvuru tarihine kalan gün sayısını hesaplar
 */
export function calculateDaysUntilDeadline(
  submissionDeadline?: string
): number | null {
  if (!submissionDeadline) return null;

  const deadline = new Date(submissionDeadline);
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Son başvuru tarihi yaklaşıyor mu kontrol eder (7 gün ve altı)
 */
export function isRFQDeadlineApproaching(submissionDeadline?: string): boolean {
  const daysUntil = calculateDaysUntilDeadline(submissionDeadline);
  if (daysUntil === null) return false;
  return daysUntil > 0 && daysUntil <= 7;
}

/**
 * Son başvuru tarihi için renk sınıfı döndürür
 */
export function getDeadlineColorClass(submissionDeadline?: string): string {
  if (isRFQExpired(submissionDeadline)) {
    return "text-danger-600";
  }
  if (isRFQDeadlineApproaching(submissionDeadline)) {
    return "text-warning-600";
  }
  return "text-success-600";
}

/**
 * Son başvuru tarihi için icon box renk sınıfı döndürür
 */
export function getDeadlineIconBoxColor(submissionDeadline?: string): string {
  if (isRFQExpired(submissionDeadline)) {
    return "bg-danger-100";
  }
  if (isRFQDeadlineApproaching(submissionDeadline)) {
    return "bg-warning-100";
  }
  return "bg-success-100";
}
