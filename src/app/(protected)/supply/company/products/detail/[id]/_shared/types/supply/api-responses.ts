import { ConversationDto } from "./conversation-dto";
import { MessageDto } from "./message-dto";

/**
 * API Response wrapper - Tekil Conversation
 */
export interface ApiResponseConversation {
  success: boolean;
  data: ConversationDto;
  message?: string;
}

/**
 * API Response wrapper - Çoklu Conversations (Paginated)
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

/**
 * API Response wrapper - Tekil Message
 */
export interface ApiResponseMessage {
  success: boolean;
  data: MessageDto;
  message?: string;
}

/**
 * API Response wrapper - Çoklu Messages (Paginated)
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
