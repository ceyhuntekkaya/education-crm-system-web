import * as yup from "yup";

export const validationSchema = yup.object({
  provinceId: yup.string().required("Şehir bilgisi gereklidir"),
  institutionGroupId: yup.string().nullable(),
  institutionTypeId: yup.string().nullable(),
  districtId: yup.string().nullable(),
});
