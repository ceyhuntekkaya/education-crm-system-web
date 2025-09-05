export interface MessageSummaryDto {
  id?: number;
  senderName?: string;
  senderEmail?: string;
  subject?: string;
  messageType?: string;
  priority?: string;
  status?: string;
  referenceNumber?: string;
  hasAttachments?: boolean;
  followUpRequired?: boolean;
  schoolName?: string;
  assignedToUserName?: string;
  createdAt?: string;
}
