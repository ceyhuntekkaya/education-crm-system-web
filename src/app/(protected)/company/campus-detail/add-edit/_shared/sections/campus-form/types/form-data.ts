import { CampusCreateDto } from "@/types";

export interface CampusFormData
  extends Omit<
    CampusCreateDto,
    "brandId" | "country" | "province" | "district" | "neighborhood"
  > {
  // Form'da ID'ler string olarak kullanılıyor, submit'te number'a çevriliyor
  brandId?: string; // Autocomplete için string, submit'te number'a çevrilecek
  countryId?: string;
  provinceId?: string;
  districtId?: string;
  neighborhoodId?: string;
}
