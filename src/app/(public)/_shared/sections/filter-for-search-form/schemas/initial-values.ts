import { FormValues } from "@/types";

export const initialValues: FormValues = {
  searchTerm: "",
  provinceId: "",
  districtId: "",
  institutionTypeId: "",
  feeRange: [0, 1000000] as any,
};
