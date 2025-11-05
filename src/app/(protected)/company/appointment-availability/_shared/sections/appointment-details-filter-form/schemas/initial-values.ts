import { AppointmentDetailsFilters } from "../types";

/**
 * Appointment details filter form initial values
 * Yeni AppointmentSlotDto yapısına göre güncellenmiş
 */
export const initialValues: AppointmentDetailsFilters = {
  // Slot temel bilgileri
  schoolName: "",
  staffUserName: "",
  dayOfWeekName: "",

  // Slot tarih ve zaman
  slotDate: "",
  slotDateStart: "",
  slotDateEnd: "",

  // Slot özellikleri
  appointmentType: "",
  durationMinutes: undefined,
  onlineMeetingAvailable: undefined,
  isAvailable: undefined,
  isActive: undefined,

  // Randevu bilgileri (appointment içinden)
  appointmentNumber: "",
  appointmentStatus: "",
  appointmentOutcome: "",
  parentName: "",
  studentName: "",
  appointmentDate: "",

  // Diğer
  requiresApproval: undefined,
};
