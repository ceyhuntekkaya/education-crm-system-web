export interface BulkSurveyOperationDto {
  operation?: string;
  surveyIds?: number[];
  recipientEmails?: string[];
  customMessage?: string;
  scheduledSendTime?: string;
  exportFormat?: string;
  includePersonalData?: boolean;
}
