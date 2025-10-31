/**
 * Özel ücret yardımcı fonksiyonları
 * Custom fee helper functions
 */

/**
 * Özel ücret türü için ikon döndüren yardımcı fonksiyon
 */
export const getFeeTypeIcon = (feeType?: string): string => {
  const iconMap: Record<string, string> = {
    ACADEMIC: "ph-graduation-cap",
    ADMINISTRATIVE: "ph-briefcase",
    FACILITY: "ph-buildings",
    TECHNOLOGY: "ph-laptop",
    EQUIPMENT: "ph-toolbox",
    SERVICE: "ph-handshake",
    ACTIVITY: "ph-activity",
    TRANSPORTATION: "ph-bus",
    MEAL: "ph-fork-knife",
    ACCOMMODATION: "ph-bed",
    INSURANCE: "ph-shield-check",
    SECURITY: "ph-shield",
    MAINTENANCE: "ph-wrench",
    UTILITIES: "ph-lightning",
    MATERIALS: "ph-package",
    EXAMINATION: "ph-exam",
    CERTIFICATION: "ph-certificate",
    GRADUATION: "ph-graduation-cap",
    PENALTY: "ph-warning",
    DEPOSIT: "ph-piggy-bank",
    REFUNDABLE_DEPOSIT: "ph-piggy-bank",
    MEMBERSHIP: "ph-identification-card",
    REGISTRATION: "ph-clipboard-text",
    PROCESSING: "ph-gear",
    LATE_FEE: "ph-clock",
    CANCELLATION: "ph-x-circle",
    REPLACEMENT: "ph-arrows-clockwise",
    DAMAGE: "ph-warning-octagon",
    LOST_ITEM: "ph-magnifying-glass",
    SPECIAL_EVENT: "ph-confetti",
    FIELD_TRIP: "ph-map-trifold",
    SUMMER_PROGRAM: "ph-sun",
    WINTER_PROGRAM: "ph-snowflake",
    TUTORING: "ph-chalkboard-teacher",
    COUNSELING: "ph-chats-circle",
    HEALTH_SERVICE: "ph-first-aid",
    LIBRARY: "ph-books",
    LABORATORY: "ph-flask",
    WORKSHOP: "ph-hammer",
    CLUB: "ph-users-three",
    SPORTS: "ph-soccer-ball",
    ART: "ph-palette",
    MUSIC: "ph-music-note",
    DRAMA: "ph-masks-theater",
    LANGUAGE: "ph-translate",
    COMPETITION: "ph-trophy",
    AWARD_CEREMONY: "ph-medal",
    PARENT_MEETING: "ph-users",
    CONFERENCE: "ph-presentation",
    WORKSHOP_MATERIAL: "ph-pencil-ruler",
    SUBSCRIPTION: "ph-calendar-check",
    LICENSE: "ph-file-text",
    SOFTWARE: "ph-code",
    PLATFORM_ACCESS: "ph-desktop",
    ONLINE_CONTENT: "ph-globe",
    DIGITAL_RESOURCE: "ph-cloud",
    PRINTING: "ph-printer",
    SCANNING: "ph-scan",
    PHOTOCOPYING: "ph-copy",
    BINDING: "ph-book-open",
    LAMINATION: "ph-file",
    ID_CARD: "ph-identification-badge",
    UNIFORM: "ph-t-shirt",
    SHOES: "ph-sneaker",
    BAG: "ph-backpack",
    STATIONERY: "ph-pen",
    TEXTBOOK: "ph-book",
    WORKBOOK: "ph-notebook",
    NOTEBOOK: "ph-notebook",
    CALCULATOR: "ph-calculator",
    TABLET: "ph-device-tablet",
    LAPTOP: "ph-laptop",
    SOFTWARE_LICENSE: "ph-key",
    CLOUD_STORAGE: "ph-cloud-arrow-up",
    INTERNET_ACCESS: "ph-wifi-high",
    WIFI_ACCESS: "ph-wifi-high",
    PARKING: "ph-car",
    LOCKER: "ph-lock",
    KEY_REPLACEMENT: "ph-key",
    CARD_REPLACEMENT: "ph-credit-card",
    TRANSCRIPT: "ph-file-text",
    DIPLOMA: "ph-scroll",
    REFERENCE_LETTER: "ph-envelope",
    DOCUMENT_TRANSLATION: "ph-translate",
    NOTARIZATION: "ph-stamp",
    APOSTILLE: "ph-stamp",
    VISA_SUPPORT: "ph-passport",
    IMMIGRATION_SUPPORT: "ph-airplane",
    LEGAL_CONSULTATION: "ph-scales",
    FINANCIAL_AID_PROCESSING: "ph-hand-coins",
    SCHOLARSHIP_PROCESSING: "ph-student",
    LOAN_PROCESSING: "ph-bank",
    PAYMENT_PROCESSING: "ph-credit-card",
    BANK_TRANSFER: "ph-bank",
    CREDIT_CARD_FEE: "ph-credit-card",
    INSTALLMENT_FEE: "ph-calendar",
    INTEREST: "ph-percent",
    CURRENCY_EXCHANGE: "ph-currency-circle-dollar",
    TAX: "ph-receipt",
    GOVERNMENT_FEE: "ph-building",
    REGULATORY_FEE: "ph-shield-check",
    COMPLIANCE_FEE: "ph-check-circle",
    AUDIT_FEE: "ph-clipboard",
    ACCREDITATION_FEE: "ph-seal-check",
    CERTIFICATION_MAINTENANCE: "ph-wrench",
    QUALITY_ASSURANCE: "ph-seal-check",
    RISK_MANAGEMENT: "ph-shield-warning",
    EMERGENCY_FUND: "ph-first-aid-kit",
    DISASTER_RECOVERY: "ph-fire-extinguisher",
    BUSINESS_CONTINUITY: "ph-building",
    OTHER: "ph-dots-three",
  };

  return iconMap[feeType || "OTHER"] || "ph-currency-circle-dollar";
};

/**
 * Ücret frekansı için görünen isim döndüren yardımcı fonksiyon
 */
export const getFrequencyDisplayName = (frequency?: string): string => {
  const frequencyMap: Record<string, string> = {
    ONE_TIME: "Tek Seferlik",
    MONTHLY: "Aylık",
    QUARTERLY: "3 Aylık",
    SEMESTER: "Dönemlik",
    ANNUAL: "Yıllık",
    BIANNUAL: "6 Aylık",
    CUSTOM: "Özel",
  };

  return frequencyMap[frequency || "ONE_TIME"] || "Belirtilmemiş";
};

/**
 * Ücret durumu için badge rengi döndüren yardımcı fonksiyon
 */
export const getStatusBadgeColor = (status?: string): string => {
  const statusColorMap: Record<string, string> = {
    DRAFT: "secondary",
    PENDING_APPROVAL: "warning",
    APPROVED: "info",
    ACTIVE: "success",
    INACTIVE: "neutral",
    SUSPENDED: "danger",
    CANCELLED: "danger",
    EXPIRED: "neutral",
    ARCHIVED: "neutral",
  };

  return statusColorMap[status || "ACTIVE"] || "neutral";
};

/**
 * Ücret durumu için Türkçe isim döndüren yardımcı fonksiyon
 */
export const getStatusDisplayName = (status?: string): string => {
  const statusDisplayMap: Record<string, string> = {
    DRAFT: "Taslak",
    PENDING_APPROVAL: "Onay Bekliyor",
    APPROVED: "Onaylandı",
    ACTIVE: "Aktif",
    INACTIVE: "Pasif",
    SUSPENDED: "Askıya Alındı",
    CANCELLED: "İptal Edildi",
    EXPIRED: "Süresi Doldu",
    ARCHIVED: "Arşivlendi",
  };

  return statusDisplayMap[status || "ACTIVE"] || status || "Aktif";
};
