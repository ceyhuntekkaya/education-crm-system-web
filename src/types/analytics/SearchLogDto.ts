export interface SearchLogDto {
  id?: number;
  sessionId?: string;
  searchQuery?: string;
  cleanedQuery?: string;
  searchTime?: string;
  searchType?: string;
  resultsCount?: number;
  zeroResults?: boolean;
  responseTimeMs?: number;
  filtersApplied?: string;
  sortOrder?: string;
  pageNumber?: number;
  resultsPerPage?: number;
  clickedResultPosition?: number;
  clickedSchoolId?: number;
  clickedSchoolName?: string;
  timeToClickSeconds?: number;
  refinedSearch?: boolean;
  abandonedSearch?: boolean;
  userLocation?: string;
  searchRadiusKm?: number;
  ipAddress?: string;
  deviceType?: string;
  userAgent?: string;
}
