export interface ParentSchoolListResponse {
  /** Format: int64 */
  id?: number;
  listName?: string;
  description?: string;
  /** @enum {string} */
  status?: "ACTIVE" | "ARCHIVED" | "DELETED";
  isDefault?: boolean;
  colorCode?: string;
  icon?: string;
  notes?: string;
  /** Format: int32 */
  schoolCount?: number;
  /** Format: date-time */
  lastAccessedAt?: string;
  /** Format: date-time */
  createdAt?: string;
  /** Format: date-time */
  updatedAt?: string;
  /** Format: int32 */
  favoriteCount?: number;
  /** Format: int32 */
  blockedCount?: number;
  /** Format: int32 */
  visitPlannedCount?: number;
  /** Format: int32 */
  visitCompletedCount?: number;
}

export interface CreateParentSchoolListRequest {
  listName: string;
  description?: string;
  isDefault?: boolean;
  colorCode?: string;
  icon?: string;
  notes?: string;
}

export interface AddSchoolToListRequest {
  /** Format: int64 */
  schoolId?: number;
  /** Format: int64 */
  parentSchoolListId?: number;
  /** Format: int32 */
  starRating?: number;
  isFavorite?: boolean;
  /** Format: int32 */
  priorityOrder?: number;
  personalNotes?: string;
  pros?: string;
  cons?: string;
  tags?: string;
  addedFromSearch?: string;
  /** Format: date-time */
  visitPlannedDate?: string;
}

export interface ParentSchoolListItemResponse {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  schoolId?: number;
  schoolName?: string;
  schoolSlug?: string;
  schoolLogoUrl?: string;
  schoolPhone?: string;
  schoolEmail?: string;
  /** Format: double */
  schoolRatingAverage?: number;
  /** Format: int64 */
  schoolRatingCount?: number;
  /** Format: int32 */
  starRating?: number;
  isFavorite?: boolean;
  isBlocked?: boolean;
  /** Format: int32 */
  priorityOrder?: number;
  personalNotes?: string;
  pros?: string;
  cons?: string;
  tags?: string;
  /** Format: date-time */
  visitPlannedDate?: string;
  /** Format: date-time */
  visitCompletedDate?: string;
  addedFromSearch?: string;
  /** Format: int32 */
  appointmentCount?: number;
  /** Format: date-time */
  lastAppointmentDate?: string;
  /** Format: date-time */
  nextAppointmentDate?: string;
  /** Format: int32 */
  noteCount?: number;
  /** Format: int32 */
  importantNoteCount?: number;
  /** Format: date-time */
  addedAt?: string;
  /** Format: date-time */
  lastUpdatedAt?: string;
}

