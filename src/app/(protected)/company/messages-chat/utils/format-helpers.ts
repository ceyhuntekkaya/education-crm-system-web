import { MessageDto } from "@/types/dto/content/MessageDto";

/**
 * Format date for conversation list display
 * Shows time if today, "Dün" if yesterday, weekday if this week, else full date
 */
export const formatConversationDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diffInHours < 48) {
    return "Dün";
  } else if (diffInHours < 168) {
    return date.toLocaleDateString("tr-TR", { weekday: "short" });
  } else {
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }
};

/**
 * Format date and time for message display
 */
export const formatMessageDateTime = (dateString?: string): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format time only for message display
 */
export const formatMessageTime = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get unread count from conversations
 */
export const getUnreadCount = (conversations: MessageDto[]): number => {
  return conversations.filter(
    (c) => c.status === "NEW" || c.status === "IN_PROGRESS"
  ).length;
};
