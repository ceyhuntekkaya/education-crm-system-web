export interface SortObject {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}

export interface PageableObject {
  /** Format: int64 */
  offset?: number;
  sort?: SortObject;
  paged?: boolean;
  unpaged?: boolean;
  /** Format: int32 */
  pageNumber?: number;
  /** Format: int32 */
  pageSize?: number;
}
