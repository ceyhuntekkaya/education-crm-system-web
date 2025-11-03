import { MessageDto } from "./MessageDto";

/**
 * Mesaj konuşma grubu DTO
 */
export interface MessageConversationGroupDto {
  groupType: string | null;
  conversations: MessageDto[];
  totalConversations: number;
  personName: string;
  userId: number;
  lastMessageDate: string;
}

/**
 * Mesaj listesi API yanıtı
 */
export interface MessageConversationsResponseDto {
  success: boolean;
  message: string;
  data: MessageConversationGroupDto[];
  errors: any | null;
  timestamp: string;
  path: string;
}
