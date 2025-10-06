import { MessageDto } from "@/types/dto/content/MessageDto";
import { MessageColumnHandlers } from "@/app/(public)/messages/config";

export interface MessageStats {
  total: number;
  unread: number;
  assigned: number;
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
  loading: boolean;
  error: string | null;

  // Selected message
  selectedMessage: MessageDto | null;
  setSelectedMessage: (message: MessageDto | null) => void;

  // Modal
  detailModal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };

  // Info Modal
  infoModal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };

  // Statistics
  stats: MessageStats;
  statsData: StatCardData[];

  // Handlers
  handlers: MessageColumnHandlers;

  // Filters
  filters: MessageFilters;
  setFilters: (filters: MessageFilters) => void;

  // Actions
  refreshMessages: () => void;
}
