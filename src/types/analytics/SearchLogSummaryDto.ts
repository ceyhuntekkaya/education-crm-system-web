export interface SearchLogSummaryDto {
  searchTime?: string;
  searchQuery?: string;
  searchType?: string;
  resultsCount?: number;
  zeroResults?: boolean;
  clickedSchoolName?: string;
  userLocation?: string;
  deviceType?: string;
}
