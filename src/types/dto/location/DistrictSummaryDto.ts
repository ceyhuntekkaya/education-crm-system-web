export interface DistrictSummaryDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  code?: string;
  /** @enum {string} */
  districtType?:
    | "MERKEZ"
    | "ILCE"
    | "BELDE"
    | "BUCAK"
    | "KASABA"
    | "TOWN"
    | "BOROUGH"
    | "SUBURB";
  isCentral?: boolean;
  /** Format: int64 */
  schoolCount?: number;
  /** @enum {string} */
  socioeconomicLevel?:
    | "VERY_LOW"
    | "LOW"
    | "LOWER_MIDDLE"
    | "MIDDLE"
    | "UPPER_MIDDLE"
    | "HIGH"
    | "VERY_HIGH";
}
