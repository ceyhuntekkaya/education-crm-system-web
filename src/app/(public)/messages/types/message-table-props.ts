import { MessageDto } from "@/types/dto/content/MessageDto";

export interface MessageTableProps {
  messages: MessageDto[];
  loading?: boolean;
  error?: string | null;
  onViewDetails?: (message: MessageDto) => void;
  onMarkAsRead?: (message: MessageDto) => void;
  onReply?: (message: MessageDto) => void;
  onArchive?: (message: MessageDto) => void;
  onDelete?: (message: MessageDto) => void;
}
