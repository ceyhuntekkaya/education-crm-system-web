/**
 * Conversation Create DTO Message Type (Güncellenmiş)
 */
export type ConversationCreateDtoMessageType =
  (typeof ConversationCreateDtoMessageType)[keyof typeof ConversationCreateDtoMessageType];

export const ConversationCreateDtoMessageType = {
  PRODUCT_INQUIRY: "PRODUCT_INQUIRY",
  QUOTATION_DISCUSSION: "QUOTATION_DISCUSSION",
  ORDER_COMMUNICATION: "ORDER_COMMUNICATION",
  SUPPORT: "SUPPORT",
} as const;

/**
 * Conversation DTO Message Type (Güncellenmiş)
 */
export type ConversationDtoMessageType =
  (typeof ConversationDtoMessageType)[keyof typeof ConversationDtoMessageType];

export const ConversationDtoMessageType = {
  PRODUCT_INQUIRY: "PRODUCT_INQUIRY",
  QUOTATION_DISCUSSION: "QUOTATION_DISCUSSION",
  ORDER_COMMUNICATION: "ORDER_COMMUNICATION",
  SUPPORT: "SUPPORT",
} as const;

/**
 * Konuşma oluşturma için gerekli veri (Güncellenmiş)
 */
export interface ConversationCreateDto {
  companyId: number;
  supplierId: number;
  productId?: number;
  quotationId?: number;
  orderId?: number;
  messageType?: ConversationCreateDtoMessageType;
  /** @minLength 1 */
  subject: string;
}

/**
 * Konuşma verisi (Güncellenmiş)
 */
export interface ConversationDto {
  id?: number;
  companyId?: number;
  companyName?: string;
  supplierId?: number;
  supplierCompanyName?: string;
  productId?: number;
  productName?: string;
  quotationId?: number;
  orderId?: number;
  orderNumber?: string;
  messageType?: ConversationDtoMessageType;
  subject?: string;
  createdAt?: string;
  updatedAt?: string;
  unreadCount?: number;
  messageCount?: number;
  lastMessageAt?: string;
}

import { PageableObject, SortObject } from "../../api/api-general.types";

/**
 * Page Conversation DTO (Güncellenmiş)
 */
export interface PageConversationDto {
  totalElements?: number;
  totalPages?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  content?: ConversationDto[];
  number?: number;
  empty?: boolean;
}

/**
 * API Response wrapper - Tekil Conversation (Güncellenmiş)
 */
export interface ApiResponseConversation {
  success: boolean;
  data: ConversationDto;
  message?: string;
}

/**
 * API Response wrapper - Tekil Conversation (Yeni Format)
 */
export interface ApiResponseConversationDto {
  success?: boolean;
  message?: string;
  data?: ConversationDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * API Response wrapper - Paginated Conversations (Güncellenmiş)
 */
export interface ApiResponsePageConversationDto {
  success?: boolean;
  message?: string;
  data?: PageConversationDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * API Response wrapper - Çoklu Conversations (Eski format)
 */
export interface ApiResponseConversations {
  success: boolean;
  data: {
    content: ConversationDto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
  message?: string;
}
