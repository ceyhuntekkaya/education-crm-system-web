import * as Yup from "yup";

/**
 * Appointment Slot form validation schema
 */
export const validationSchema = Yup.object({
  schoolId: Yup.number().optional(), // Optional çünkü otomatik alınıyor
  staffUserId: Yup.string().required("Personel seçimi gereklidir"),
  durationMinutes: Yup.string().required("Süre seçimi gereklidir"),
  appointmentType: Yup.string().required("Randevu tipi gereklidir"),
  onlineMeetingAvailable: Yup.boolean().required(),
  slotDate: Yup.string().required("Slot tarihi gereklidir"),
});
