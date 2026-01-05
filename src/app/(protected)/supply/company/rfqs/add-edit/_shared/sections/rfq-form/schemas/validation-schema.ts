import * as Yup from "yup";

/**
 * RFQ form validation schema
 * RFQCreateDto ve RFQUpdateDto'ya uygun
 */
export const validationSchema = Yup.object({
  // Required fields (CREATE için)
  companyId: Yup.number().when("$isEditing", {
    is: false,
    then: (schema) =>
      schema
        .required("Şirket ID gereklidir")
        .min(1, "Geçerli bir şirket seçiniz")
        .typeError("Geçerli bir sayı giriniz"),
    otherwise: (schema) => schema.optional(),
  }),

  title: Yup.string()
    .required("Başlık gereklidir")
    .min(1, "Başlık en az 1 karakter olmalıdır")
    .max(255, "Başlık en fazla 255 karakter olabilir"),

  submissionDeadline: Yup.string().when("$isEditing", {
    is: false,
    then: (schema) => schema.required("Son başvuru tarihi gereklidir"),
    otherwise: (schema) => schema.optional(),
  }),

  // Optional fields (hem CREATE hem UPDATE için)
  description: Yup.string()
    .max(2000, "Açıklama en fazla 2000 karakter olabilir")
    .optional(),

  rfqType: Yup.string()
    .oneOf(["OPEN", "INVITED"], "Geçerli bir tip seçiniz")
    .optional(),

  expectedDeliveryDate: Yup.string().optional(),

  paymentTerms: Yup.string()
    .max(500, "Ödeme koşulları en fazla 500 karakter olabilir")
    .optional(),

  evaluationCriteria: Yup.string()
    .max(500, "Değerlendirme kriterleri en fazla 500 karakter olabilir")
    .optional(),

  technicalRequirements: Yup.string()
    .max(1000, "Teknik gereksinimler en fazla 1000 karakter olabilir")
    .optional(),
});
