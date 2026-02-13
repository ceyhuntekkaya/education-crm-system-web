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

// Generic Page interface for paginated responses
export interface Page<T> {
  totalElements?: number;
  totalPages?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  content?: T[];
  number?: number;
  empty?: boolean;
}
