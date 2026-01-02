import { MessageType } from "./message-dto";

/**
 * Konuşma oluşturma için gerekli veri
 */
export interface ConversationCreateDto {
  companyId: number;
  supplierId: number;
  productId?: number;
  quotationId?: number;
  orderId?: number;
  messageType?: MessageType;
  subject: string;
}

/**
 * Konuşma verisi
 */
export interface ConversationDto {
  id: number;
  companyId: number;
  supplierId: number;
  productId?: number;
  quotationId?: number;
  orderId?: number;
  subject: string;
  messageType?: MessageType;
  createdAt: string;
  updatedAt: string;
}
