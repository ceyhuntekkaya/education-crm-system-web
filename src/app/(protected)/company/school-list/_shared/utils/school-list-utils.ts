import { SchoolDto } from "@/types";
import { BadgeVariant, SchoolStats } from "../types";

/**
 * Get badge variant based on school status
 */
export const getStatusBadgeVariant = (isActive?: boolean): BadgeVariant => {
  return isActive ? "success" : "secondary";
};

/**
 * Get display text for institution type
 */
export const getInstitutionTypeDisplay = (
  institutionTypeName?: string
): string => {
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

  const stars =
    "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  return count ? `${rating.toFixed(1)} (${count})` : rating.toFixed(1);
};

/**
 * Filter active schools
 */
export const getActiveSchools = (schools: SchoolDto[]): SchoolDto[] => {
  return schools.filter((school) => school.isActive);
};

/**
 * Filter schools with active campaigns
 */
export const getSchoolsWithActiveCampaigns = (
  schools: SchoolDto[]
): SchoolDto[] => {
  return schools.filter(
    (school) => school.activeCampaigns && school.activeCampaigns.length > 0
  );
};

/**
 * Filter schools by institution type
 */
export const getSchoolsByInstitutionType = (
  schools: SchoolDto[],
  institutionType: string
): SchoolDto[] => {
  return schools.filter(
    (school) => school.institutionType?.name === institutionType
  );
};

/**
 * Get school by ID
 */
export const getSchoolById = (
  schools: SchoolDto[],
  id: number
): SchoolDto | undefined => {
  return schools.find((school) => school.id === id);
};

/**
 * Calculate school statistics
 */
export const calculateSchoolStats = (schools: SchoolDto[]): SchoolStats => {
  const total = schools.length;
  const withActiveAppointments = 0; // SchoolDto'da appointment yok
  const withActiveCampaigns = schools.filter(
    (s) => s.activeCampaigns && s.activeCampaigns.length > 0
  ).length;
  const subscribed = 0; // SchoolDto'da isSubscribed yok
  const favorites = 0; // SchoolDto'da isFavorite yok

  const totalRatings = schools.reduce(
    (sum, s) => sum + (s.ratingCount || 0),
    0
  );
  const totalRatingSum = schools.reduce(
    (sum, s) => sum + (s.ratingAverage || 0) * (s.ratingCount || 0),
    0
  );
  const averageRating = totalRatings > 0 ? totalRatingSum / totalRatings : 0;

  // Institution types count
  const institutionTypes: { [key: string]: number } = {};
  schools.forEach((school) => {
    const type = school.institutionType?.displayName || "Diğer";
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
