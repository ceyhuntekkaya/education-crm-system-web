import type { ConversationDto, MessageDto } from "@/types/dto/supply";

/**
 * Messages Context Value Type
 * Defines the shape of the messages context
 */
export interface MessagesContextValue {
  // Company & User Info
  companyId: number;

  // Conversations
  conversations: ConversationDto[];
  isLoadingConversations: boolean;
  conversationsError: string | null;
  refetchConversations: () => Promise<void>;

  // Selected Conversation
  selectedConversationId: number | null;
  selectedConversation: ConversationDto | null;
  selectConversation: (conversationId: number | null) => void;

  // Messages for Selected Conversation
  messages: MessageDto[];
  isLoadingMessages: boolean;
  messagesError: string | null;

  // Sending Messages
  isSendingMessage: boolean;
  sendMessage: (content: string) => Promise<boolean>;

  // Creating New Conversation
  isCreatingConversation: boolean;
  createNewConversation: (data: {
    supplierId: number;
    subject: string;
    messageType?: string;
    productId?: number;
  }) => Promise<number | null>;
}

/**
 * Messages Provider Props
 */
export interface MessagesProviderProps {
  children: React.ReactNode;
}
