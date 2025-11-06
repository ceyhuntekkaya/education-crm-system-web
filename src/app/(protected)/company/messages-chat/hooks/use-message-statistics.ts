import { useMemo } from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";

interface MessageStats {
  total: number;
  unread: number;
  assigned: number;
  urgent: number;
}

interface StatCardData {
  key: string;
  icon: string;
  bgColor: string;
  textColor: string;
  value: number;
  label: string;
}

interface UseMessageStatisticsReturn {
  stats: MessageStats;
  statsData: StatCardData[];
}

export const useMessageStatistics = (
  messages: MessageDto[]
): UseMessageStatisticsReturn => {
  const stats = useMemo(
    () => ({
      total: messages.length,
      unread: messages.filter((msg) => !msg.readAt).length,
      assigned: messages.filter((msg) => msg.assignedToUser).length,
      urgent: messages.filter((msg) => msg.priority === "HIGH").length,
    }),
    [messages]
  );

  const statsData = useMemo(
    () => [
      {
        key: "total",
        icon: "ph-envelope",
        bgColor: "bg-primary-50",
        textColor: "text-primary-600",
        value: stats.total,
        label: "Toplam",
      },
      {
        key: "unread",
        icon: "ph-envelope-open",
        bgColor: "bg-warning-50",
        textColor: "text-warning-600",
        value: stats.unread,
        label: "Okunmamış",
      },
      {
        key: "assigned",
        icon: "ph-user-circle",
        bgColor: "bg-success-50",
        textColor: "text-success-600",
        value: stats.assigned,
        label: "Atanmış",
      },
      {
        key: "urgent",
        icon: "ph-warning-circle",
        bgColor: "bg-info-50",
        textColor: "text-info-600",
        value: stats.urgent,
        label: "Acil",
      },
    ],
    [stats]
  );

  return {
    stats,
    statsData,
  };
};
