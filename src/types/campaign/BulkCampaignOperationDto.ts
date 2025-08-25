export interface BulkCampaignOperationDto {
  operation?: string;
  campaignIds?: number[];
  newStatus?: string;
  schoolIds?: number[];
  reason?: string;
  notifySchools?: boolean;
  notifyParents?: boolean;
}
