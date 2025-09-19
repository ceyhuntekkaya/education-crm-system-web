import * as yup from "yup";

export const validationSchema = yup.object({
  searchTerm: yup.string(),
  provinceId: yup.mixed(),
  districtId: yup.mixed(),
  institutionTypeId: yup.mixed(),
  feeRange: yup.mixed(),
});
