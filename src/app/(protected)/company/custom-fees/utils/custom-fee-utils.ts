import { BadgeVariant } from "../_shared/types";

/**
 * Para formatı - currency ile birlikte
 */
export const formatCurrency = (
  amount: number | undefined,
  currency: string = "TRY"
): string => {
  if (amount === undefined || amount === null) return "-";

  const currencySymbols: Record<string, string> = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
    GBP: "£",
    CHF: "CHF",
    CAD: "CA$",
    AUD: "A$",
    JPY: "¥",
    CNY: "¥",
    RUB: "₽",
    SAR: "SR",
    AED: "AED",
    QAR: "QR",
    KWD: "KD",
    BHD: "BD",
  };

  const symbol = currencySymbols[currency] || currency;
  const formatted = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formatted} ${symbol}`;
};

/**
 * Status badge variant belirleme
 */
export const getStatusBadgeVariant = (
  status: string | undefined
): BadgeVariant => {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "DRAFT":
      return "warning";
    case "PENDING":
      return "info";
    case "ARCHIVED":
    case "INACTIVE":
      return "secondary";
    default:
      return "secondary";
  }
};

/**
 * Status display metni
 */
export const getStatusDisplay = (status: string | undefined): string => {
  switch (status) {
    case "ACTIVE":
      return "Aktif";
    case "DRAFT":
      return "Taslak";
    case "PENDING":
      return "Beklemede";
    case "ARCHIVED":
      return "Arşiv";
    case "INACTIVE":
      return "Pasif";
    default:
      return "Bilinmiyor";
  }
};

/**
 * Fee type display metni
 */
export const getFeeTypeDisplay = (feeType: string | undefined): string => {
  const feeTypeMap: Record<string, string> = {
    ACADEMIC: "Akademik",
    ADMINISTRATIVE: "İdari",
    FACILITY: "Tesis",
    TECHNOLOGY: "Teknoloji",
    EQUIPMENT: "Ekipman",
    SERVICE: "Hizmet",
    ACTIVITY: "Aktivite",
    CLUB: "Kulüp",
    TRANSPORTATION: "Ulaşım",
    MEAL: "Yemek",
    ACCOMMODATION: "Konaklama",
    INSURANCE: "Sigorta",
    SECURITY: "Güvenlik",
    MAINTENANCE: "Bakım",
    UTILITIES: "Kamu Hizmetleri",
    MATERIALS: "Malzemeler",
    EXAMINATION: "Sınav",
    CERTIFICATION: "Sertifika",
    GRADUATION: "Mezuniyet",
    PENALTY: "Ceza",
    DEPOSIT: "Depozito",
    REFUNDABLE_DEPOSIT: "İade Edilebilir Depozito",
    MEMBERSHIP: "Üyelik",
    REGISTRATION: "Kayıt",
    PROCESSING: "İşlem",
    LATE_FEE: "Gecikme Ücreti",
    CANCELLATION: "İptal",
    REPLACEMENT: "Değiştirme",
    DAMAGE: "Hasar",
    LOST_ITEM: "Kayıp Eşya",
    SPECIAL_EVENT: "Özel Etkinlik",
    FIELD_TRIP: "Gezi",
    SUMMER_PROGRAM: "Yaz Programı",
    WINTER_PROGRAM: "Kış Programı",
    TUTORING: "Özel Ders",
    COUNSELING: "Danışmanlık",
    HEALTH_SERVICE: "Sağlık Hizmeti",
    LIBRARY: "Kütüphane",
    LABORATORY: "Laboratuvar",
  };

  return feeTypeMap[feeType || ""] || feeType || "-";
};

/**
 * Fee type badge variant
 */
export const getFeeTypeBadgeVariant = (
  feeType: string | undefined
): BadgeVariant => {
  switch (feeType) {
    case "ACADEMIC":
    case "EXAMINATION":
    case "CERTIFICATION":
      return "success";
    case "ADMINISTRATIVE":
    case "REGISTRATION":
    case "PROCESSING":
      return "info";
    case "FACILITY":
    case "EQUIPMENT":
    case "MATERIALS":
      return "secondary";
    case "TECHNOLOGY":
    case "LABORATORY":
      return "info";
    case "SERVICE":
    case "HEALTH_SERVICE":
      return "success";
    case "ACTIVITY":
    case "CLUB":
    case "SPECIAL_EVENT":
    case "FIELD_TRIP":
      return "warning";
    case "PENALTY":
    case "LATE_FEE":
    case "DAMAGE":
      return "danger";
    default:
      return "secondary";
  }
};

/**
 * Billing period display metni
 */
export const getBillingPeriodDisplay = (
  billingPeriod: string | undefined
): string => {
  const periodMap: Record<string, string> = {
    ONE_TIME: "Tek Seferlik",
    MONTHLY: "Aylık",
    QUARTERLY: "Üç Aylık",
    SEMESTER: "Dönemlik",
    ANNUAL: "Yıllık",
    BIANNUAL: "Altı Aylık",
    WEEKLY: "Haftalık",
    BIWEEKLY: "İki Haftada Bir",
    BIMONTHLY: "İki Ayda Bir",
    DAILY: "Günlük",
    CUSTOM: "Özel",
  };

  return periodMap[billingPeriod || ""] || billingPeriod || "-";
};
