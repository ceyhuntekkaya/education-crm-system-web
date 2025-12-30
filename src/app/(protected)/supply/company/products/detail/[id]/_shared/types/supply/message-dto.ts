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
 * Mesaj oluşturma için gerekli veri (Backend DTO'suna uygun)
 */
export interface MessageCreateDto {
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  content: string; // Zorunlu
  messageType?: MessageType;
  priority?: MessagePriority;
  status?: MessageStatus;
  attachmentUrl?: string;
  referenceNumber?: string;
  studentName?: string;
  studentAge?: number;
  gradeInterested?: string;
  enrollmentYear?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  requestCallback?: boolean;
  requestAppointment?: boolean;
  internalNotes?: string;
  tags?: string;
}

/**
 * Mesaj verisi
 */
export interface MessageDto {
  id: number;
  conversationId: number;
  senderId: number;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  content: string;
  messageType?: MessageType;
  priority?: MessagePriority;
  status?: MessageStatus;
  attachmentUrl?: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  // Diğer alanlar backend'den geliyor ama şimdilik bunları kullanmıyoruz
}
