import { RFQCreateDto } from "../../../hooks/api";

/**
 * RFQ Form Data Type
 */
export interface RFQFormData extends Omit<RFQCreateDto, "companyId"> {
  // Form için ek alanlar eklenebilir
}
