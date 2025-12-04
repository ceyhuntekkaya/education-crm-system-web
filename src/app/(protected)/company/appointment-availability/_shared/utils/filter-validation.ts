import {
  AppointmentAvailabilityFilters,
  AppointmentAvailabilityRangeFilters,
} from "../types";

/**
 * Filter objelerinin geçerli arama kriterlerine sahip olup olmadığını kontrol eder
 * @param filters - Arama filtreleri
 * @returns boolean - Geçerli arama kriterleri var mı?
 */
export const hasValidSearchCriteria = (
  filters?: AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters
): boolean => {
  // Filter yoksa veya boşsa false döndür
  if (!filters || Object.keys(filters).length === 0) return false;

  // Kurum ID'si kontrol et
  const hasSchoolId = "schoolId" in filters && !!filters.schoolId;

  // Tekli tarih kontrol et
  const hasDate = "date" in filters && !!filters.date;

  // Tarih aralığı kontrol et
  const hasDateRange =
    ("startDate" in filters && !!filters.startDate) ||
    ("endDate" in filters && !!filters.endDate);

  // Kurum ID'si ve en az bir tarih bilgisi gerekli
  return hasSchoolId && (hasDate || hasDateRange);
};

/**
 * Filter tipinin range filter olup olmadığını kontrol eder
 * @param filters - Kontrol edilecek filter objesi
 * @returns boolean - Range filter mi?
 */
export const isRangeFilter = (
  filters?: AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters
): filters is AppointmentAvailabilityRangeFilters => {
  return !!(filters && ("startDate" in filters || "endDate" in filters));
};

/**
 * Filter objesinin tamamen boş olup olmadığını kontrol eder
 * @param filters - Kontrol edilecek filter objesi
 * @returns boolean - Boş mu?
 */
export const isEmptyFilter = (
  filters?: AppointmentAvailabilityFilters | AppointmentAvailabilityRangeFilters
): boolean => {
  return !filters || Object.keys(filters).length === 0;
};
