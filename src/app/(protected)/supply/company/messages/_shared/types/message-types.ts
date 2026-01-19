/**
 * Message Form Data
 * Used for message input form
 */
export interface MessageFormData {
  content: string;
}

/**
 * Conversation List Item Props
 */
export interface ConversationListItemProps {
  conversationId: number;
  supplierName: string;
  productName?: string;
  subject: string;
  lastMessageAt?: string;
  unreadCount?: number;
  messageCount?: number;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Message Bubble Props
 */
export interface MessageBubbleProps {
  message: {
    id?: number;
    content?: string;
    createdAt?: string;
    senderId?: number;
    senderName?: string;
  };
  isOwnMessage: boolean;
}
