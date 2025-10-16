import * as Yup from "yup";

/**
 * Appointment details filter form validation schema
 * Columns'taki bilgilere göre güncellenmiş
 */
export const validationSchema = Yup.object({
  // Temel randevu bilgileri
  title: Yup.string()
    .optional()
    .max(200, "Randevu başlığı en fazla 200 karakter olabilir"),

  appointmentNumber: Yup.string()
    .optional()
    .max(50, "Randevu numarası en fazla 50 karakter olabilir"),

  // Kişi bilgileri
  parentName: Yup.string()
    .optional()
    .max(100, "Veli adı en fazla 100 karakter olabilir"),

  studentName: Yup.string()
    .optional()
    .max(100, "Öğrenci adı en fazla 100 karakter olabilir"),

  staffUserName: Yup.string()
    .optional()
    .max(100, "Personel adı en fazla 100 karakter olabilir"),

  // Durum bilgileri (string values, not arrays)
  appointmentType: Yup.string().optional(),

  status: Yup.string().optional(),

  outcome: Yup.string().optional(),

  // Tarih validasyonları
  appointmentDate: Yup.string().nullable().optional(),

  // Zaman alanları
  startTime: Yup.string()
    .optional()
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Geçerli bir saat formatı giriniz (HH:MM)"
    ),

  endTime: Yup.string()
    .optional()
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Geçerli bir saat formatı giriniz (HH:MM)"
    )
    .when("startTime", {
      is: (val: string) => val && val.length > 0,
      then: (schema) =>
        schema.test(
          "endTimeAfterStartTime",
          "Bitiş saati başlangıç saatinden sonra olmalıdır",
          function (value) {
            const { startTime } = this.parent;
            if (!value || !startTime) return true;

            const [startHour, startMinute] = startTime.split(":").map(Number);
            const [endHour, endMinute] = value.split(":").map(Number);

            const startTotalMinutes = startHour * 60 + startMinute;
            const endTotalMinutes = endHour * 60 + endMinute;

            return endTotalMinutes > startTotalMinutes;
          }
        ),
      otherwise: (schema) => schema,
    }),

  // Konum
  location: Yup.string()
    .optional()
    .max(200, "Konum en fazla 200 karakter olabilir"),

  // Boolean alanlar
  isOnline: Yup.boolean().optional().nullable(),

  followUpRequired: Yup.boolean().optional().nullable(),
});
