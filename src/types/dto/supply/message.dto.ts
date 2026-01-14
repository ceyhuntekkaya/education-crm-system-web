/**
 * Mesaj tipi enum
 */
export type MessageType =
  | "PRODUCT_INQUIRY"
  | "QUOTATION_DISCUSSION"
  | "ORDER_COMMUNICATION"
  | "SUPPORT";

/**
 * Mesaj priority enum
 */
export type MessagePriority = "LOW" | "NORMAL" | "HIGH" | "URGENT" | "CRITICAL";

/**
 * Mesaj status enum
 */
export type MessageStatus =
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

/**
 * Mesaj oluşturma için gerekli veri (Basitleştirilmiş - Güncel API)
 */
export interface MessageCreateDto {
  /** @minLength 1 */
  content: string;
  attachmentUrl?: string;
}

/**
 * API Response wrapper - Tekil Message (Güncel)
 */
export interface ApiResponseMessageDto {
  success?: boolean;
  message?: string;
  data?: MessageDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * UserSummaryDto (Güncellenmiş)
 */
export interface UserSummaryDto {
  id?: number;
  fullName?: string;
  email?: string;
  phone?: string;
  userType?: UserSummaryDtoUserType;
  profileImageUrl?: string;
  isActive?: boolean;
}

export type UserSummaryDtoUserType =
  (typeof UserSummaryDtoUserType)[keyof typeof UserSummaryDtoUserType];

export const UserSummaryDtoUserType = {
  INSTITUTION_USER: "INSTITUTION_USER",
  PARENT: "PARENT",
} as const;

/**
 * SchoolSummaryDto (Yeni)
 */
export interface SchoolSummaryDto {
  id?: number;
  name?: string;
  slug?: string;
  logoUrl?: string;
  institutionTypeName?: string;
  minAge?: number;
  maxAge?: number;
  monthlyFee?: number;
  ratingAverage?: number;
  ratingCount?: number;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  hasActiveCampaigns?: boolean;
}

/**
 * Message DTO Type Enums (Güncellenmiş)
 */
export type MessageDtoMessageType =
  (typeof MessageDtoMessageType)[keyof typeof MessageDtoMessageType];

export const MessageDtoMessageType = {
  GENERAL_INQUIRY: "GENERAL_INQUIRY",
  ENROLLMENT_INQUIRY: "ENROLLMENT_INQUIRY",
  APPOINTMENT_REQUEST: "APPOINTMENT_REQUEST",
  COMPLAINT: "COMPLAINT",
  SUGGESTION: "SUGGESTION",
  TECHNICAL_SUPPORT: "TECHNICAL_SUPPORT",
  FINANCIAL_INQUIRY: "FINANCIAL_INQUIRY",
  TRANSPORTATION: "TRANSPORTATION",
  CAFETERIA: "CAFETERIA",
  EXTRACURRICULAR: "EXTRACURRICULAR",
  ACADEMIC_INQUIRY: "ACADEMIC_INQUIRY",
  FACILITIES_INQUIRY: "FACILITIES_INQUIRY",
  CALLBACK_REQUEST: "CALLBACK_REQUEST",
  BROCHURE_REQUEST: "BROCHURE_REQUEST",
  PARTNERSHIP: "PARTNERSHIP",
  MEDIA_INQUIRY: "MEDIA_INQUIRY",
  OTHER: "OTHER",
} as const;

export type MessageDtoPriority =
  (typeof MessageDtoPriority)[keyof typeof MessageDtoPriority];

export const MessageDtoPriority = {
  LOW: "LOW",
  NORMAL: "NORMAL",
  HIGH: "HIGH",
  URGENT: "URGENT",
  CRITICAL: "CRITICAL",
} as const;

export type MessageDtoStatus =
  (typeof MessageDtoStatus)[keyof typeof MessageDtoStatus];

export const MessageDtoStatus = {
  NEW: "NEW",
  READ: "read",
  IN_PROGRESS: "IN_PROGRESS",
  WAITING_RESPONSE: "WAITING_RESPONSE",
  RESPONDED: "RESPONDED",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
  ESCALATED: "ESCALATED",
  SPAM: "SPAM",
  ARCHIVED: "ARCHIVED",
} as const;

/**
 * Mesaj verisi (Güncellenmiş)
 */
export interface MessageDto {
  id?: number;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  content?: string;
  messageType?: MessageDtoMessageType;
  priority?: MessageDtoPriority;
  status?: MessageDtoStatus;
  referenceNumber?: string;
  studentName?: string;
  studentAge?: number;
  gradeInterested?: string;
  enrollmentYear?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  requestCallback?: boolean;
  requestAppointment?: boolean;
  readAt?: string;
  readBy?: UserSummaryDto;
  firstResponseAt?: string;
  lastResponseAt?: string;
  resolvedAt?: string;
  resolvedBy?: UserSummaryDto;
  responseTimeHours?: number;
  resolutionTimeHours?: number;
  followUpRequired?: boolean;
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
  satisfactionRating?: number;
  satisfactionFeedback?: string;
  satisfactionDate?: string;
  school?: SchoolSummaryDto;
  senderUser?: UserSummaryDto;
  assignedToUser?: UserSummaryDto;
  isActive?: boolean;
  createdAt?: string;
  // Legacy fields for backward compatibility
  conversationId?: number;
  senderId?: number;
  isRead?: boolean;
}

// Import common pagination types from conversation dto
import { PageableObject, SortObject } from "./conversation.dto";

/**
 * Page Message DTO (Yeni)
 */
export interface PageMessageDto {
  totalElements?: number;
  totalPages?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  content?: MessageDto[];
  number?: number;
  empty?: boolean;
}

/**
 * API Response wrapper - Tekil Message (Güncellenmiş)
 */
export interface ApiResponseMessage {
  success: boolean;
  data: MessageDto;
  message?: string;
}

/**
 * API Response wrapper - Paginated Messages (Güncellenmiş)
 */
export interface ApiResponsePageMessageDto {
  success?: boolean;
  message?: string;
  data?: PageMessageDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * API Response wrapper - Çoklu Messages (Eski format - backward compatibility)
 */
export interface ApiResponseMessages {
  success: boolean;
  data: {
    content: MessageDto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
  message?: string;
}
