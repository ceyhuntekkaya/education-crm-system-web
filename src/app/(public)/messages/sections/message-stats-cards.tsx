import React from "react";
import { CustomStats } from "../types";

interface StatCard {
  icon: string;
  value: number;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

interface MessageStatsCardsProps {
  stats: CustomStats;
}

export const MessageStatsCards: React.FC<MessageStatsCardsProps> = ({
  stats,
}) => {
  const statCards: StatCard[] = [
    {
      icon: "ph ph-chat-circle-text",
      value: stats.total,
      label: "Toplam",
      bgColor: "bg-primary-50",
      textColor: "text-primary-600",
      borderColor: "border-primary-200",
    },
    {
      icon: "ph ph-envelope",
      value: stats.unread,
      label: "Okunmamış",
      bgColor: "bg-warning-50",
      textColor: "text-warning-600",
      borderColor: "border-warning-200",
    },
    {
      icon: "ph ph-warning",
      value: stats.urgent,
      label: "Acil",
      bgColor: "bg-danger-50",
      textColor: "text-danger-600",
      borderColor: "border-danger-200",
    },
  ];

  return (
    <div className="d-flex gap-16 mb-20">
      {statCards.map((card, index) => (
        <div key={index} className="flex-fill">
          <div
            className={`${card.bgColor} rounded-12 px-20 py-16 border ${card.borderColor} position-relative overflow-hidden`}
            style={{ minHeight: "85px" }}
          >
            <div className="d-flex align-items-center gap-16">
              <div
                className={`${card.bgColor.replace(
                  "-50",
                  "-100"
                )} rounded-circle d-flex align-items-center justify-content-center`}
                style={{ width: "48px", height: "48px", flexShrink: 0 }}
              >
                <i className={`${card.icon} ${card.textColor} fs-22`}></i>
              </div>
              <div className="flex-grow-1">
                <div className={`${card.textColor} fw-bold fs-24 mb-1`}>
                  {card.value}
                </div>
                <div
                  className={`${card.textColor.replace(
                    "-600",
                    "-500"
                  )} fs-13 fw-medium`}
                >
                  {card.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageStatsCards;
