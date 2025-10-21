import { SchoolPricingCreateDto } from "@/types/dto/pricing/SchoolPricingCreateDto";

export interface SchoolPricingFormData
  extends Omit<SchoolPricingCreateDto, "schoolId" | "createdByUserId"> {
  // Form için ek alanlar eklenebilir
}
