export interface GallerySummaryDto {
  /** Format: int64 */
  id?: number;
  title?: string;
  slug?: string;
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
  coverImageUrl?: string;
  /** Format: int64 */
  itemCount?: number;
  /** Format: int64 */
  viewCount?: number;
  isFeatured?: boolean;
  institutionName?: string;
  /** Format: date-time */
  createdAt?: string;
}
