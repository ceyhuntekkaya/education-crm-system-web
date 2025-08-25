export interface MessageDto {
  id?: number;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  content?: string;
  messageType?: string;
  priority?: string;
  status?: string;
  referenceNumber?: string;
  studentName?: string;
  studentAge?: number;
  gradeInterested?: string;
  enrollmentYear?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
}
