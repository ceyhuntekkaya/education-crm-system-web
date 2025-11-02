/**
 * Appointment details filter parameters
 * Frontend tabanlı filtreleme için kullanılır
 * Yeni AppointmentSlotDto yapısına göre güncellenmiş
 */
export interface AppointmentDetailsFilters {
  // Slot temel bilgileri
  schoolName?: string;
  staffUserName?: string;
  dayOfWeekName?: string;

  // Slot tarih ve zaman bilgileri
  slotDate?: string;
  slotDateStart?: string;
  slotDateEnd?: string;

  // Slot özellikleri
  appointmentType?: string;
  durationMinutes?: number;
  onlineMeetingAvailable?: boolean;
  isAvailable?: boolean;
  isActive?: boolean;

  // Randevu bilgileri (appointment içinden)
  appointmentNumber?: string;
  appointmentStatus?: string;
  appointmentOutcome?: string;
  parentName?: string;
  studentName?: string;
  appointmentDate?: string;

  // Diğer
  requiresApproval?: boolean;
}

/**
 * Filter dropdown options
 */
export interface FilterOptions {
  statuses: Array<{ value: string; label: string }>;
  appointmentTypes: Array<{ value: string; label: string }>;
  outcomes: Array<{ value: string; label: string }>;
  booleanOptions: Array<{ value: string; label: string }>;
}
