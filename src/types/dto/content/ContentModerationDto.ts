export interface ContentModerationDto {
  contentId?: number;
  contentType?: string;
  moderationAction?: string;
  moderationReason?: string;
  moderatorNotes?: string;
  moderationScore?: number;
  moderationLabels?: string;
}
