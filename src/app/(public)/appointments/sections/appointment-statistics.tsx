import React from "react";
import { Icon } from "@/components/ui/icon";

interface StatItem {
  key: string;
  icon: string;
  bgColor: string;
  textColor: string;
  value: number;
  label: string;
}

interface AppointmentStatisticsProps {
  statsData: StatItem[];
}

export const AppointmentStatistics: React.FC<AppointmentStatisticsProps> = ({
  statsData,
}) => {
  return (
    <div className="row mb-32">
      <div className="col-12">
        <div className="stats-overview bg-white rounded-12 p-md-24 p-20 shadow-sm">
          {/* Desktop View: Horizontal Layout */}
          <div className="d-none d-md-flex gap-16 align-items-stretch">
            {statsData.map((stat) => (
              <div key={stat.key} className="flex-fill">
                <div
                  className={`stat-item d-flex align-items-center gap-16 p-16 rounded-12 ${stat.bgColor} h-100`}
                >
                  <div>
                    <Icon
                      icon={stat.icon}
                      size="md"
                      className={stat.textColor}
                      animate={false}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <div
                      className={`stat-number h4 mb-2 fw-bold ${stat.textColor}`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`stat-label fs-13 ${stat.textColor} opacity-80`}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View: Grid Layout 2x2 */}
          <div className="d-md-none d-flex flex-wrap row-gap-16 column-gap-16">
            {statsData.map((stat) => (
              <div key={stat.key} style={{ width: "calc(50% - 8px)" }}>
                <div
                  className={`stat-item d-flex flex-column align-items-center justify-content-center text-center p-12 rounded-12 ${stat.bgColor} h-100`}
                >
                  <div className="mb-12">
                    <Icon
                      icon={stat.icon}
                      size="md"
                      className={stat.textColor}
                      animate={false}
                    />
                  </div>
                  <div
                    className={`stat-number h4 mb-8 fw-bold ${stat.textColor}`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`stat-label fs-10 ${stat.textColor} opacity-80`}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
