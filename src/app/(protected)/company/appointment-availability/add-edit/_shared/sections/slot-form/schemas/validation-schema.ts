import * as Yup from "yup";

/**
 * Appointment Slot form validation schema
 */
export const validationSchema = Yup.object({
  staffUserId: Yup.string().required("Personel seçimi gereklidir"),
  selectedDates: Yup.array()
    .of(Yup.string())
    .min(1, "En az bir tarih seçmelisiniz")
    .required("Tarih seçimi gereklidir"),
  selectedTimeSlots: Yup.array()
    .of(Yup.string())
    .min(1, "En az bir saat dilimi seçmelisiniz")
    .required("Saat dilimi seçimi gereklidir"),
});
