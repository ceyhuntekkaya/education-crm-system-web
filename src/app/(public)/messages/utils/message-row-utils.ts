import { MessageDto } from "@/types/dto/content/MessageDto";

/**
 * Get the appropriate CSS classes for a message row based on its read status
 */
export const getMessageRowClasses = (
  message: MessageDto,
  options: {
    style?: "default" | "strong" | "animated";
    includeBaseClass?: boolean;
    clickable?: boolean;
  } = {}
) => {
  const {
    style = "default",
    includeBaseClass = true,
    clickable = false,
  } = options;

  const isUnread = !message.readAt;
  const baseClass = includeBaseClass ? "message-row" : "";
  const clickableClass = clickable ? "message-row--clickable" : "";

  let statusClass = "";

  switch (style) {
    case "strong":
      statusClass = isUnread
        ? "message-row-strong--unread"
        : "message-row--read";
      break;
    case "animated":
      statusClass = isUnread
        ? "message-row--unread message-row--unread-animated"
        : "message-row--read";
      break;
    default:
      statusClass = isUnread ? "message-row--unread" : "message-row--read";
      break;
  }

  return [baseClass, statusClass, clickableClass].filter(Boolean).join(" ");
};

/**
 * Get message priority visual indicator
 */
export const getMessagePriorityIndicator = (message: MessageDto) => {
  if (!message.priority) return null;

  const priorityConfig = {
    CRITICAL: { color: "#dc2626", text: "KRİTİK", pulse: true },
    URGENT: { color: "#ea580c", text: "ACİL", pulse: true },
    HIGH: { color: "#d97706", text: "YÜKSEK", pulse: false },
    NORMAL: { color: "#059669", text: "NORMAL", pulse: false },
    LOW: { color: "#6b7280", text: "DÜŞÜK", pulse: false },
  };

  return priorityConfig[message.priority] || null;
};

/**
 * Calculate time since message was created
 */
export const getMessageAge = (message: MessageDto): string => {
  if (!message.createdAt) return "";

  const created = new Date(message.createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `${diffMinutes}dk önce`;
  } else if (diffHours < 24) {
    return `${diffHours}sa önce`;
  } else if (diffDays < 7) {
    return `${diffDays}g önce`;
  } else {
    return created.toLocaleDateString("tr-TR");
  }
};

/**
 * Check if message is considered "fresh" (created within last hour)
 */
export const isMessageFresh = (message: MessageDto): boolean => {
  if (!message.createdAt) return false;

  const created = new Date(message.createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  return diffHours <= 1;
};
