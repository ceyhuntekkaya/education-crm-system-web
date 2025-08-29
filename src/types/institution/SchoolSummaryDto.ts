export interface SchoolSummaryDto {
  id?: number;
  name?: string;
  displayName?: string;
  description?: string;
  campusId?: number;
  campusName?: string;
  city?: string;
  country?: string;
  pageViews?: number;
  conversions?: number;
  institutionType?: string;
}
