import React from "react";
import { SurveyStats } from "../types";

interface StatCard {
  icon: string;
  value: string | number;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  subtitle?: string;
}

interface SurveyStatsCardsProps {
  stats: SurveyStats;
}

export const SurveyStatsCards: React.FC<SurveyStatsCardsProps> = ({
  stats,
}) => {
  const statCards: StatCard[] = [
    {
      icon: "ph ph-clipboard-text",
      value: stats.totalSurveys,
      label: "Farklı Anket",
      subtitle: `${stats.totalSent} toplam yanıt`,
      bgColor: "bg-primary-50",
      textColor: "text-primary-600",
      borderColor: "border-primary-200",
    },
    {
      icon: "ph ph-check-circle",
      value: stats.totalCompleted,
      label: "Tamamlanan",
      subtitle: `${stats.totalSent} gönderimden`,
      bgColor: "bg-success-50",
      textColor: "text-success-600",
      borderColor: "border-success-200",
    },
    {
      icon: "ph ph-chart-line-up",
      value: `%${stats.averageCompletionRate.toFixed(1)}`,
      label: "Tamamlanma Oranı",
      subtitle: "Ortalama",
      bgColor: "bg-info-50",
      textColor: "text-info-600",
      borderColor: "border-info-200",
    },
    {
      icon: "ph ph-star",
      value: stats.averageRating.toFixed(1),
      label: "Genel Puan",
      subtitle: "Tüm yanıtlar",
      bgColor: "bg-warning-50",
      textColor: "text-warning-600",
      borderColor: "border-warning-200",
    },
    {
      icon: "ph ph-users",
      value:
        stats.averageStaffRating > 0
          ? stats.averageStaffRating.toFixed(1)
          : "-",
      label: "Personel Puanı",
      subtitle: "Ortalama",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      icon: "ph ph-chat-circle-dots",
      value:
        stats.averageCommunicationRating > 0
          ? stats.averageCommunicationRating.toFixed(1)
          : "-",
      label: "İletişim Puanı",
      subtitle: "Ortalama",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200",
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
                {card.subtitle && (
                  <div
                    className={`${card.textColor.replace(
                      "-600",
                      "-400"
                    )} fs-12 mt-1`}
                  >
                    {card.subtitle}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyStatsCards;
