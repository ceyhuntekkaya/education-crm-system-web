/**
 * Appointment Availability Utility Functions and Constants
 */

// Availability Status Definitions
export const AVAILABILITY_STATUS = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
  FULL: "full",
  EMPTY: "empty",
} as const;

// Turkish translations for availability status
export const AVAILABILITY_STATUS_LABELS = {
  HIGH: "Yüksek Müsaitlik",
  MEDIUM: "Orta Müsaitlik",
  LOW: "Düşük Müsaitlik",
  FULL: "Tamamen Dolu",
  EMPTY: "Boş",
} as const;

// API'den gelen İngilizce durumları Türkçe'ye çevir
export const API_AVAILABILITY_LABELS = {
  ABUNDANT: "Çok Müsait",
  HIGH: "Yüksek Müsaitlik",
  MEDIUM: "Orta Müsaitlik",
  LOW: "Düşük Müsaitlik",
  FULL: "Tamamen Dolu",
  FULLY_BOOKED: "Tamamen Dolu",
  EMPTY: "Boş",
  AVAILABLE: "Müsait",
  UNAVAILABLE: "Müsait Değil",
  LIMITED: "Sınırlı Müsaitlik",
} as const;

// API durumları için badge variant'ları
export const API_AVAILABILITY_VARIANTS = {
  ABUNDANT: "success" as const,
  HIGH: "success" as const,
  MEDIUM: "warning" as const,
  LOW: "danger" as const,
  FULL: "danger" as const,
  FULLY_BOOKED: "danger" as const,
  EMPTY: "secondary" as const,
  AVAILABLE: "success" as const,
  UNAVAILABLE: "danger" as const,
  LIMITED: "warning" as const,
} as const;

// Booking status labels
export const BOOKING_STATUS_LABELS = {
  available: "Müsait",
  booked: "Rezerve",
  full: "Dolu",
  empty: "Boş",
} as const;

// Slot status variants for badges
export const AVAILABILITY_VARIANTS = {
  HIGH: "success",
  MEDIUM: "warning",
  LOW: "danger",
  FULL: "danger",
  EMPTY: "secondary",
} as const;

/**
 * Calculate availability status based on available and total slots
 */
export const calculateAvailabilityStatus = (
  availableCount: number,
  totalSlots: number
): keyof typeof AVAILABILITY_STATUS => {
  if (totalSlots === 0) return "EMPTY";
  if (availableCount === 0) return "FULL";

  const ratio = availableCount / totalSlots;

  if (ratio > 0.7) return "HIGH";
  if (ratio > 0.3) return "MEDIUM";
  return "LOW";
};

/**
 * Get availability percentage
 */
export const getAvailabilityPercentage = (
  availableCount: number,
  totalSlots: number
): number => {
  if (totalSlots === 0) return 0;
  return Math.round((availableCount / totalSlots) * 100);
};

/**
 * Format slot time display
 */
export const formatSlotTime = (startTime: string, endTime: string): string => {
  return `${startTime} - ${endTime}`;
};

/**
 * Get booking ratio text
 */
export const getBookingRatioText = (
  bookedSlots: number,
  totalSlots: number
): string => {
  return `${bookedSlots}/${totalSlots}`;
};

/**
 * API'den gelen availability string'ini Türkçe'ye çevir ve variant döndür
 */
export const getApiAvailabilityDisplay = (apiAvailability?: string) => {
  if (!apiAvailability) {
    return {
      label: "Belirtilmemiş",
      variant: "secondary" as const,
    };
  }

  const upperCase = apiAvailability.toUpperCase();
  const label =
    API_AVAILABILITY_LABELS[
      upperCase as keyof typeof API_AVAILABILITY_LABELS
    ] || apiAvailability;
  const variant =
    API_AVAILABILITY_VARIANTS[
      upperCase as keyof typeof API_AVAILABILITY_VARIANTS
    ] || "secondary";

  return { label, variant };
};
