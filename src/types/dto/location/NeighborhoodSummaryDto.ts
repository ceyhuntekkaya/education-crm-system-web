export interface NeighborhoodSummaryDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  code?: string;
  /** @enum {string} */
  neighborhoodType?: "MAHALLE" | "KOYUNU" | "SEMT" | "VAROS" | "MERKEZ" | "OUTER_DISTRICT" | "INNER_DISTRICT" | "VILLAGE" | "TOWNSHIP" | "WARD" | "AREA";
  /** Format: int64 */
  schoolCount?: number;
  /** @enum {string} */
  incomeLevel?: "VERY_LOW" | "LOW" | "LOWER_MIDDLE" | "MIDDLE" | "UPPER_MIDDLE" | "HIGH" | "VERY_HIGH" | "LUXURY";
  /** Format: int32 */
  schoolPreferenceScore?: number;
};
