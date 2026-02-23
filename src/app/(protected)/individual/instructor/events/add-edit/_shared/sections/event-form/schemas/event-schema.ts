import * as yup from "yup";

export const eventSchema = yup.object().shape({
  organizerId: yup
    .number()
    .required("Organizatör zorunludur")
    .typeError("Geçerli bir organizatör seçiniz"),
  title: yup
    .string()
    .required("Etkinlik başlığı zorunludur")
    .max(200, "Başlık en fazla 200 karakter olabilir"),
  description: yup
    .string()
    .max(5000, "Açıklama en fazla 5000 karakter olabilir"),
  eventType: yup.string().required("Etkinlik türü zorunludur"),
  deliveryFormat: yup.string().required("Format zorunludur"),
  startDateTime: yup.string().required("Başlangıç tarihi zorunludur"),
  endDateTime: yup.string().required("Bitiş tarihi zorunludur"),
  maxCapacity: yup
    .number()
    .nullable()
    .transform((v, o) => (o === "" ? null : v))
    .min(1, "Kontenjan en az 1 olabilir"),
  location: yup.string().max(500, "Konum en fazla 500 karakter olabilir"),
  onlineLink: yup
    .string()
    .max(500, "Online bağlantı en fazla 500 karakter olabilir"),
  targetAudience: yup
    .string()
    .max(500, "Hedef kitle en fazla 500 karakter olabilir"),
  speakerName: yup
    .string()
    .max(200, "Konuşmacı adı en fazla 200 karakter olabilir"),
  speakerBio: yup
    .string()
    .max(2000, "Konuşmacı biyografisi en fazla 2000 karakter olabilir"),
  coverImageUrl: yup
    .string()
    .max(500, "Kapak görseli URL'i en fazla 500 karakter olabilir"),
  registrationDeadline: yup.string().nullable(),
  categoryId: yup
    .number()
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),
  autoApproveRegistration: yup.boolean(),
  certificateEnabled: yup.boolean(),
  certificateTemplateUrl: yup.string().max(500),
  status: yup.string(),
});

export type EventFormValues = yup.InferType<typeof eventSchema>;
