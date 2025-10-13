import { MessageDto } from "@/types/dto/content/MessageDto";
import {
  BadgeVariant,
  MessagesStats,
  MESSAGE_PRIORITY_COLORS,
  MESSAGE_STATUS_COLORS,
  MESSAGE_TYPE_COLORS,
} from "../types";

// Message status badge variant mapping
export const getMessageStatusBadgeVariant = (status: string): BadgeVariant => {
  return MESSAGE_STATUS_COLORS[status] || "secondary";
};

// Message priority badge variant mapping
export const getMessagePriorityBadgeVariant = (
  priority: string
): BadgeVariant => {
  return MESSAGE_PRIORITY_COLORS[priority] || "secondary";
};

// Message type badge variant mapping
export const getMessageTypeBadgeVariant = (
  messageType: string
): BadgeVariant => {
  return MESSAGE_TYPE_COLORS[messageType] || "secondary";
};

// Message type display mapping
export const getMessageTypeDisplay = (messageType: string): string => {
  const typeMap: Record<string, string> = {
    GENERAL_INQUIRY: "Genel Soru",
    ENROLLMENT_INQUIRY: "Kayıt Sorgulama",
    APPOINTMENT_REQUEST: "Randevu Talebi",
    COMPLAINT: "Şikayet",
    SUGGESTION: "Öneri",
    TECHNICAL_SUPPORT: "Teknik Destek",
    FINANCIAL_INQUIRY: "Mali Sorular",
    TRANSPORTATION: "Ulaşım",
    CAFETERIA: "Kantin",
    EXTRACURRICULAR: "Sosyal Aktivite",
    ACADEMIC_INQUIRY: "Akademik Soru",
    FACILITIES_INQUIRY: "Tesis Bilgileri",
    CALLBACK_REQUEST: "Geri Arama",
    BROCHURE_REQUEST: "Broşür Talebi",
    PARTNERSHIP: "Ortaklık",
    MEDIA_INQUIRY: "Medya Sorgusu",
    OTHER: "Diğer",
  };
  return typeMap[messageType] || messageType;
};

// Message status display mapping
export const getMessageStatusDisplay = (status: string): string => {
  const statusMap: Record<string, string> = {
    NEW: "Yeni",
    READ: "Okundu",
    IN_PROGRESS: "İşlemde",
    WAITING_RESPONSE: "Yanıt Bekleniyor",
    RESPONDED: "Yanıtlandı",
    RESOLVED: "Çözüldü",
    CLOSED: "Kapatıldı",
    ESCALATED: "Yükseltildi",
    SPAM: "Spam",
    ARCHIVED: "Arşivlendi",
  };
  return statusMap[status] || status;
};

// Message priority display mapping
export const getMessagePriorityDisplay = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    LOW: "Düşük",
    NORMAL: "Normal",
    HIGH: "Yüksek",
    URGENT: "Acil",
    CRITICAL: "Kritik",
  };
  return priorityMap[priority] || priority;
};

// Format response time in hours to readable format
export const formatResponseTime = (hours: number): string => {
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes}dk`;
  } else if (hours < 24) {
    return `${Math.round(hours)}sa`;
  } else {
    const days = Math.round(hours / 24);
    return `${days}g`;
  }
};

// Format numbers with thousand separators
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("tr-TR").format(num);
};

// Calculate messages statistics
export const calculateMessageStats = (
  messages: MessageDto[]
): MessagesStats => {
  const stats: MessagesStats = {
    totalMessages: messages.length,
    newMessages: messages.filter((m) => m.status === "NEW").length,
    inProgressMessages: messages.filter((m) => m.status === "IN_PROGRESS")
      .length,
    resolvedMessages: messages.filter((m) => m.status === "RESOLVED").length,
    unreadMessages: messages.filter((m) => !m.readAt).length,
    urgentMessages: messages.filter(
      (m) => m.priority === "URGENT" || m.priority === "CRITICAL"
    ).length,
    criticalMessages: messages.filter((m) => m.priority === "CRITICAL").length,
    totalResponseTime: messages.reduce(
      (sum, m) => sum + (m.responseTimeHours || 0),
      0
    ),
    averageResponseTime: 0,
  };

  // Calculate average response time
  const messagesWithResponse = messages.filter(
    (m) => m.responseTimeHours && m.responseTimeHours > 0
  );
  if (messagesWithResponse.length > 0) {
    stats.averageResponseTime =
      stats.totalResponseTime / messagesWithResponse.length;
  }

  return stats;
};

// Check if message needs urgent attention
export const isMessageUrgent = (message: MessageDto): boolean => {
  return message.priority === "URGENT" || message.priority === "CRITICAL";
};

// Check if message is overdue (no response in expected time)
export const isMessageOverdue = (message: MessageDto): boolean => {
  if (
    !message.createdAt ||
    message.status === "RESOLVED" ||
    message.status === "CLOSED"
  ) {
    return false;
  }

  const createdTime = new Date(message.createdAt).getTime();
  const now = new Date().getTime();
  const hoursElapsed = (now - createdTime) / (1000 * 60 * 60);

  // Expected response times based on priority
  const expectedResponseTimes: Record<string, number> = {
    CRITICAL: 1, // 1 hour
    URGENT: 4, // 4 hours
    HIGH: 8, // 8 hours
    NORMAL: 24, // 24 hours
    LOW: 48, // 48 hours
  };

  const expectedTime = expectedResponseTimes[message.priority || "NORMAL"];
  return hoursElapsed > expectedTime;
};

// Get message age in readable format
export const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "yıl", seconds: 31536000 },
    { label: "ay", seconds: 2592000 },
    { label: "gün", seconds: 86400 },
    { label: "saat", seconds: 3600 },
    { label: "dakika", seconds: 60 },
    { label: "saniye", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label} önce`;
    }
  }

  return "şimdi";
};

// Sort messages by different criteria
export const sortMessages = (
  messages: MessageDto[],
  sortBy:
    | "subject"
    | "createdAt"
    | "priority"
    | "status"
    | "responseTimeHours"
    | "senderName",
  order: "asc" | "desc" = "desc"
): MessageDto[] => {
  return [...messages].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case "subject":
        aValue = (a.subject || "").toLowerCase();
        bValue = (b.subject || "").toLowerCase();
        break;
      case "senderName":
        aValue = (a.senderName || "").toLowerCase();
        bValue = (b.senderName || "").toLowerCase();
        break;
      case "createdAt":
        aValue = new Date(a.createdAt || 0).getTime();
        bValue = new Date(b.createdAt || 0).getTime();
        break;
      case "responseTimeHours":
        aValue = a.responseTimeHours || 0;
        bValue = b.responseTimeHours || 0;
        break;
      case "priority":
        const priorityOrder = {
          CRITICAL: 5,
          URGENT: 4,
          HIGH: 3,
          NORMAL: 2,
          LOW: 1,
        };
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
        break;
      case "status":
        aValue = a.status || "";
        bValue = b.status || "";
        break;
      default:
        return 0;
    }

    if (order === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};

// Filter messages by different criteria
export const filterMessages = (
  messages: MessageDto[],
  filters: {
    status?: string[];
    priority?: string[];
    messageType?: string[];
    schoolId?: number;
    dateRange?: { start: Date; end: Date };
    searchTerm?: string;
  }
): MessageDto[] => {
  return messages.filter((message) => {
    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(message.status || "")) {
        return false;
      }
    }

    // Priority filter
    if (filters.priority && filters.priority.length > 0) {
      if (!filters.priority.includes(message.priority || "")) {
        return false;
      }
    }

    // Message type filter
    if (filters.messageType && filters.messageType.length > 0) {
      if (!filters.messageType.includes(message.messageType || "")) {
        return false;
      }
    }

    // School filter
    if (filters.schoolId && message.school?.id !== filters.schoolId) {
      return false;
    }

    // Date range filter
    if (filters.dateRange && message.createdAt) {
      const messageDate = new Date(message.createdAt);
      if (
        messageDate < filters.dateRange.start ||
        messageDate > filters.dateRange.end
      ) {
        return false;
      }
    }

    // Search term filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      const searchableFields = [
        message.subject,
        message.content,
        message.senderName,
        message.senderEmail,
        message.referenceNumber,
        message.studentName,
      ];

      const matches = searchableFields.some(
        (field) => field && field.toLowerCase().includes(searchTerm)
      );

      if (!matches) {
        return false;
      }
    }

    return true;
  });
};

// Get message summary for dashboard
export const getMessageSummary = (message: MessageDto): string => {
  const content = message.content || "";
  const maxLength = 150;

  if (content.length <= maxLength) {
    return content;
  }

  return content.substring(0, maxLength) + "...";
};
