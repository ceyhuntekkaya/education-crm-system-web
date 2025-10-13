import { MessageDto } from "@/types/dto/content/MessageDto";

// Badge variant type
export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

// Messages column handlers
export interface MessagesColumnHandlers {
  onViewDetails?: (message: MessageDto) => void;
  onEdit?: (message: MessageDto) => void;
  onToggleStatus?: (message: MessageDto) => void;
  onDelete?: (message: MessageDto) => void;
  onReply?: (message: MessageDto) => void;
  onForward?: (message: MessageDto) => void;
  onMarkAsRead?: (message: MessageDto) => void;
  onMarkAsResolved?: (message: MessageDto) => void;
  onAssign?: (message: MessageDto) => void;
}

// Messages action buttons props
export interface MessagesActionButtonsProps {
  message: MessageDto;
  onViewDetails?: (message: MessageDto) => void;
  onEdit?: (message: MessageDto) => void;
  onToggleStatus?: (message: MessageDto) => void;
  onDelete?: (message: MessageDto) => void;
  onReply?: (message: MessageDto) => void;
  onForward?: (message: MessageDto) => void;
  onMarkAsRead?: (message: MessageDto) => void;
  onMarkAsResolved?: (message: MessageDto) => void;
  onAssign?: (message: MessageDto) => void;
}

// Messages table props
export interface MessagesTableProps {
  messages?: MessageDto[];
  loading?: boolean;
}

// Messages context type
export interface MessagesContextType {
  // Message data
  schoolMessages: MessageDto[];
  messagesLoading: boolean;
  messagesError: string | null;

  // Actions
  refetchMessages: () => void;
}

// Messages stats type
export interface MessagesStats {
  totalMessages: number;
  newMessages: number;
  inProgressMessages: number;
  resolvedMessages: number;
  totalResponseTime: number;
  averageResponseTime: number;
  unreadMessages: number;
  urgentMessages: number;
  criticalMessages: number;
}

// Message priority colors
export const MESSAGE_PRIORITY_COLORS: Record<string, BadgeVariant> = {
  LOW: "light",
  NORMAL: "info",
  HIGH: "warning",
  URGENT: "danger",
  CRITICAL: "danger",
};

// Message status colors
export const MESSAGE_STATUS_COLORS: Record<string, BadgeVariant> = {
  NEW: "primary",
  READ: "info",
  IN_PROGRESS: "warning",
  WAITING_RESPONSE: "secondary",
  RESPONDED: "success",
  RESOLVED: "success",
  CLOSED: "light",
  ESCALATED: "danger",
  SPAM: "dark",
  ARCHIVED: "light",
};

// Message type colors
export const MESSAGE_TYPE_COLORS: Record<string, BadgeVariant> = {
  GENERAL_INQUIRY: "info",
  ENROLLMENT_INQUIRY: "primary",
  APPOINTMENT_REQUEST: "warning",
  COMPLAINT: "danger",
  SUGGESTION: "success",
  TECHNICAL_SUPPORT: "dark",
  FINANCIAL_INQUIRY: "secondary",
  TRANSPORTATION: "light",
  CAFETERIA: "light",
  EXTRACURRICULAR: "info",
  ACADEMIC_INQUIRY: "primary",
  FACILITIES_INQUIRY: "secondary",
  CALLBACK_REQUEST: "warning",
  BROCHURE_REQUEST: "info",
  PARTNERSHIP: "success",
  MEDIA_INQUIRY: "primary",
  OTHER: "light",
};
