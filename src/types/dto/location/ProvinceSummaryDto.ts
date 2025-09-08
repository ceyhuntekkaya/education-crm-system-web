export interface ProvinceSummaryDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  code?: string;
  plateCode?: string;
  isMetropolitan?: boolean;
  /** Format: int64 */
  schoolCount?: number;
}
