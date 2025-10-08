import { SchoolSearchResultDto } from "@/types";
import { BadgeVariant, SchoolStats } from "../types";

/**
 * Get badge variant based on school status
 */
export const getStatusBadgeVariant = (hasActiveAppointment?: boolean): BadgeVariant => {
  return hasActiveAppointment ? "success" : "secondary";
};

/**
 * Get display text for institution type
 */
export const getInstitutionTypeDisplay = (institutionTypeName?: string): string => {
  return institutionTypeName || "Bilinmiyor";
};

/**
 * Format distance display
 */
export const formatDistance = (distanceKm?: number): string => {
  if (!distanceKm) return "-";
  
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  
  return `${distanceKm.toFixed(1)}km`;
};

/**
 * Format rating display
 */
export const formatRating = (rating?: number, count?: number): string => {
  if (!rating) return "-";
  
  const stars = "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  return count ? `${rating.toFixed(1)} (${count})` : rating.toFixed(1);
};

/**
 * Filter schools with active appointments
 */
export const getSchoolsWithActiveAppointments = (schools: SchoolSearchResultDto[]): SchoolSearchResultDto[] => {
  return schools.filter(school => school.appointment?.isActiveAppointment);
};

/**
 * Filter schools with active campaigns
 */
export const getSchoolsWithActiveCampaigns = (schools: SchoolSearchResultDto[]): SchoolSearchResultDto[] => {
  return schools.filter(school => school.hasActiveCampaigns);
};

/**
 * Filter subscribed schools
 */
export const getSubscribedSchools = (schools: SchoolSearchResultDto[]): SchoolSearchResultDto[] => {
  return schools.filter(school => school.isSubscribed);
};

/**
 * Filter favorite schools
 */
export const getFavoriteSchools = (schools: SchoolSearchResultDto[]): SchoolSearchResultDto[] => {
  return schools.filter(school => school.isFavorite);
};

/**
 * Filter schools by institution type
 */
export const getSchoolsByInstitutionType = (schools: SchoolSearchResultDto[], institutionType: string): SchoolSearchResultDto[] => {
  return schools.filter(school => school.institutionTypeName === institutionType);
};

/**
 * Get school by ID
 */
export const getSchoolById = (schools: SchoolSearchResultDto[], id: number): SchoolSearchResultDto | undefined => {
  return schools.find(school => school.id === id);
};

/**
 * Calculate school statistics
 */
export const calculateSchoolStats = (schools: SchoolSearchResultDto[]): SchoolStats => {
  const total = schools.length;
  const withActiveAppointments = schools.filter(s => s.appointment?.isActiveAppointment).length;
  const withActiveCampaigns = schools.filter(s => s.hasActiveCampaigns).length;
  const subscribed = schools.filter(s => s.isSubscribed).length;
  const favorites = schools.filter(s => s.isFavorite).length;

  const totalRatings = schools.reduce((sum, s) => sum + (s.ratingCount || 0), 0);
  const totalRatingSum = schools.reduce((sum, s) => sum + ((s.ratingAverage || 0) * (s.ratingCount || 0)), 0);
  const averageRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;

  // Institution types count
  const institutionTypes: { [key: string]: number } = {};
  schools.forEach(school => {
    const type = school.institutionTypeName || "Diğer";
    institutionTypes[type] = (institutionTypes[type] || 0) + 1;
  });

  return {
    total,
    withActiveAppointments,
    withActiveCampaigns,
    subscribed,
    favorites,
    averageRating,
    totalRatings,
    institutionTypes,
  };
};
