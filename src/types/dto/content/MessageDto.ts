import { SchoolSummaryDto } from "../institution";
import { UserSummaryDto } from "../user";

export interface MessageDto {
  /** Format: int64 */
  id?: number;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  content?: string;
  /** @enum {string} */
  messageType?:
    | "GENERAL_INQUIRY"
    | "ENROLLMENT_INQUIRY"
    | "APPOINTMENT_REQUEST"
    | "COMPLAINT"
    | "SUGGESTION"
    | "TECHNICAL_SUPPORT"
    | "FINANCIAL_INQUIRY"
    | "TRANSPORTATION"
    | "CAFETERIA"
    | "EXTRACURRICULAR"
    | "ACADEMIC_INQUIRY"
    | "FACILITIES_INQUIRY"
    | "CALLBACK_REQUEST"
    | "BROCHURE_REQUEST"
    | "PARTNERSHIP"
    | "MEDIA_INQUIRY"
    | "OTHER";
  /** @enum {string} */
  priority?: "LOW" | "NORMAL" | "HIGH" | "URGENT" | "CRITICAL";
  /** @enum {string} */
  status?:
    | "NEW"
    | "READ"
    | "IN_PROGRESS"
    | "WAITING_RESPONSE"
    | "RESPONDED"
    | "RESOLVED"
    | "CLOSED"
    | "ESCALATED"
    | "SPAM"
    | "ARCHIVED";
  referenceNumber?: string;
  studentName?: string;
  /** Format: int32 */
  studentAge?: number;
  gradeInterested?: string;
  enrollmentYear?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  requestCallback?: boolean;
  requestAppointment?: boolean;
  /** Format: date-time */
  readAt?: string;
  readBy?: UserSummaryDto;
  /** Format: date-time */
  firstResponseAt?: string;
  /** Format: date-time */
  lastResponseAt?: string;
  /** Format: date-time */
  resolvedAt?: string;
  resolvedBy?: UserSummaryDto;
  /** Format: double */
  responseTimeHours?: number;
  /** Format: double */
  resolutionTimeHours?: number;
  followUpRequired?: boolean;
  /** Format: date-time */
  followUpDate?: string;
  followUpNotes?: string;
  internalNotes?: string;
  tags?: string;
  ipAddress?: string;
  userAgent?: string;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  hasAttachments?: boolean;
  attachments?: string;
  /** Format: int32 */
  satisfactionRating?: number;
  satisfactionFeedback?: string;
  /** Format: date-time */
  satisfactionDate?: string;
  school?: SchoolSummaryDto;
  senderUser?: UserSummaryDto;
  assignedToUser?: UserSummaryDto;
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
}
