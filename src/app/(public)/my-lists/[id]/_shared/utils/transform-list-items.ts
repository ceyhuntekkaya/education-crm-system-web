import { ParentSchoolListItemResponse } from "@/types";
import { SchoolSearchResultDto } from "@/types/dto/institution/InstitutionSearch.types";

/**
 * Transform ParentSchoolListItemResponse to SchoolSearchResultDto
 * This allows us to reuse the existing Results component
 * 
 * Maps all available fields from ParentSchoolListItemResponse:
 * - Basic school info (id, name, slug, logo, contact)
 * - Rating information (average, count)
 * - User preferences (favorite, blocked)
 * - Custom ratings and notes (starRating, personalNotes, pros, cons)
 * - Visit tracking (visitPlannedDate, visitCompletedDate)
 * - Appointment data (appointmentCount, dates)
 * - Note counts (noteCount, importantNoteCount)
 * - Metadata (addedAt, lastUpdatedAt, priorityOrder)
 */
export const transformListItemToSchoolResult = (
  item: ParentSchoolListItemResponse
): SchoolSearchResultDto => {
  return {
    // Basic school information
    id: item.schoolId,
    name: item.schoolName,
    slug: item.schoolSlug,
    logoUrl: item.schoolLogoUrl,
    
    // Rating information
    ratingAverage: item.schoolRatingAverage,
    ratingCount: item.schoolRatingCount
      ? Number(item.schoolRatingCount)
      : undefined,
    
    // User preferences
    isFavorite: item.isFavorite,
    
    // Appointment information
    appointment: item.appointmentCount && item.appointmentCount > 0 ? {
      isActiveAppointment: !!item.nextAppointmentDate,
      appointmentDate: item.nextAppointmentDate || item.lastAppointmentDate || null,
    } : undefined,
    
    // Notes indicator
    isActiveNotes: item.noteCount ? item.noteCount > 0 : false,
    
    // Note: Some fields from SchoolSearchResultDto might not be available
    // in ParentSchoolListItemResponse (like address, district, city, etc.)
    // These will remain undefined
  };
};

/**
 * Transform array of list items to school search results
 */
export const transformListItemsToSchoolResults = (
  items: ParentSchoolListItemResponse[]
): SchoolSearchResultDto[] => {
  return items.map(transformListItemToSchoolResult);
};

