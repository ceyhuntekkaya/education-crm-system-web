import { SchoolCreateDto } from "@/types";

/**
 * School form data type
 * Form'da propertyValues string array olarak kullanılır,
 * submit'te propertyTypeIds number array'e çevrilir
 */
export interface SchoolFormData extends SchoolCreateDto {
  propertyValues?: string[]; // Form'da checkbox değerleri string array olarak
}
