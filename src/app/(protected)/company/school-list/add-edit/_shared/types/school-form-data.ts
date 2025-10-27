import { SchoolCreateDto } from "@/types";

export interface SchoolFormData
  extends Omit<SchoolCreateDto, "foreignLanguages"> {
  // Form için foreignLanguages array olarak kullanılır (multiple select için)
  // Submit sırasında string'e çevrilir
  foreignLanguages?: string[];
}
