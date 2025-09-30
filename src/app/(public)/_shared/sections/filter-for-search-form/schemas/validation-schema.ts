import * as yup from "yup";

export const validationSchema = yup.object({
  provinceId: yup.string().required("Şehir bilgisi gereklidir"),
  institutionTypeId: yup.string().required("Kurum türü seçimi gereklidir"),
  districtId: yup.string().nullable(),
});
