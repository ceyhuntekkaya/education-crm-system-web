import { FormValues } from "@/types";

export const initialValues: FormValues = {
  provinceId: "",
  districtId: "",
  institutionTypeId: "",
  feeRange: [0, 1000000] as any,
};
