import { MessageDto } from "@/types/dto/content/MessageDto";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";

export interface MessageStats {
  total: number;
  unread: number;
  assigned: number;
  urgent: number;
}

export interface CustomStats {
  total: number;
  unread: number;
  urgent: number;
}

export interface StatCardData {
  key: string;
  icon: string;
  bgColor: string;
  textColor: string;
  value: number;
  label: string;
}

export interface MessageFilters {
  limit?: number;
  status?: string;
  priority?: string;
  assignedToUser?: boolean;
}

export interface MessageContextType {
  // Data
  messages: MessageDto[];
  conversationGroups: MessageConversationGroupDto[] | undefined;
  loading: boolean;
  error: string | null;

  // Selected Conversation
  selectedConversation: MessageConversationGroupDto | null;
  selectedMessageId: number | null;
  setSelectedConversation: (
    conversation: MessageConversationGroupDto | null
  ) => void;
  handleSelectMessage: (message: MessageDto) => void;

  // Statistics
  customStats: CustomStats;
  stats: MessageStats;
  statsData: StatCardData[];

  // Filters
  filters: MessageFilters;
  setFilters: (filters: MessageFilters) => void;

  // Actions
  refreshMessages: () => void;
}
