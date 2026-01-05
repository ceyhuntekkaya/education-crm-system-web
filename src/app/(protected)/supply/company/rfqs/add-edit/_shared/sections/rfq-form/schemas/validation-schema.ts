import * as Yup from "yup";

/**
 * RFQ form validation schema
 * RFQCreateDto ve RFQUpdateDto'ya uygun
 */
export const validationSchema = Yup.object({
  // Required fields (CREATE için)

  title: Yup.string()
    .required("Başlık gereklidir")
    .min(1, "Başlık en az 1 karakter olmalıdır")
    .max(255, "Başlık en fazla 255 karakter olabilir"),

  submissionDeadline: Yup.string().required("Son başvuru tarihi gereklidir"),

  expectedDeliveryDate: Yup.string().required(
    "Beklenen teslimat tarihi gereklidir"
  ),

  // Optional fields (hem CREATE hem UPDATE için)
  description: Yup.string()
    .max(2000, "Açıklama en fazla 2000 karakter olabilir")
    .optional(),

  rfqType: Yup.string()
    .oneOf(["OPEN", "INVITED"], "Geçerli bir tip seçiniz")
    .optional(),

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
