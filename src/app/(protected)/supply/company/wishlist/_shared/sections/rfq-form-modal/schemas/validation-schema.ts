import * as Yup from "yup";

/**
 * RFQ Form validation schema
 */
export const validationSchema = Yup.object({
  title: Yup.string()
    .required("Başlık gereklidir")
    .min(1, "Başlık en az 1 karakter olmalıdır")
    .max(200, "Başlık en fazla 200 karakter olabilir"),

  description: Yup.string()
    .optional()
    .max(2000, "Açıklama en fazla 2000 karakter olabilir"),

  rfqType: Yup.string()
    .required("RFQ tipi gereklidir")
    .oneOf(["OPEN", "INVITED"], "Geçersiz RFQ tipi"),

  submissionDeadline: Yup.string()
    .required("Teklif son tarihi gereklidir")
    .test(
      "is-future-date",
      "Teklif son tarihi gelecek bir tarih olmalıdır",
      function (value) {
        if (!value) return false;
        const selectedDate = new Date(value);
        const now = new Date();
        return selectedDate > now;
      }
    ),

  expectedDeliveryDate: Yup.string()
    .optional()
    .test(
      "is-after-submission",
      "Teslimat tarihi, teklif son tarihinden sonra olmalıdır",
      function (value) {
        if (!value) return true; // Optional olduğu için boş olabilir
        const { submissionDeadline } = this.parent;
        if (!submissionDeadline) return true;
        const deliveryDate = new Date(value);
        const submissionDate = new Date(submissionDeadline);
        return deliveryDate >= submissionDate;
      }
    ),

  paymentTerms: Yup.string()
    .optional()
    .max(1000, "Ödeme koşulları en fazla 1000 karakter olabilir"),

  evaluationCriteria: Yup.string()
    .optional()
    .max(1000, "Değerlendirme kriterleri en fazla 1000 karakter olabilir"),

  technicalRequirements: Yup.string()
    .optional()
    .max(2000, "Teknik gereksinimler en fazla 2000 karakter olabilir"),

  productIds: Yup.array()
    .of(Yup.number())
    .min(1, "En az bir ürün seçilmelidir")
    .required("Ürün seçimi gereklidir"),
});
