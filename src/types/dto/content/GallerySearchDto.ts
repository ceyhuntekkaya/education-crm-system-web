export interface GallerySearchDto {
  searchTerm?: string;
  /** Format: int64 */
  brandId?: number;
  /** Format: int64 */
  campusId?: number;
  /** Format: int64 */
  schoolId?: number;
  /** @enum {string} */
  galleryType?:
    | "MIXED"
    | "PHOTOS"
    | "VIDEOS"
    | "SCHOOL_TOUR"
    | "EVENTS"
    | "FACILITIES"
    | "CLASSROOMS"
    | "OUTDOOR_AREAS"
    | "CAFETERIA"
    | "LIBRARY"
    | "LABORATORY"
    | "SPORTS_FACILITIES"
    | "TRANSPORTATION"
    | "ACHIEVEMENTS"
    | "GRADUATION"
    | "CEREMONIES"
    | "DAILY_ACTIVITIES"
    | "STUDENT_WORK"
    | "STAFF"
    | "CAMPUS_LIFE"
    | "BEFORE_AFTER";
  /** @enum {string} */
  visibility?: "PUBLIC" | "PRIVATE" | "REGISTERED_ONLY" | "PASSWORD_PROTECTED";
  isFeatured?: boolean;
  tags?: string;
  /** Format: int32 */
  page?: number;
  /** Format: int32 */
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}
