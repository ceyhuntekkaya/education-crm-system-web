import React from "react";
import { Icon } from "@/components/ui/icon";
import { useMessageContext } from "../context";
import { StatCardData } from "../types";

export const MessageStatistics: React.FC = () => {
  const { statsData } = useMessageContext();

  return (
    <div className="row mb-32">
      <div className="col-12">
        <div className="stats-overview bg-white rounded-12 p-24 shadow-sm">
          <div className="d-flex align-items-center">
            {statsData.map((stat: StatCardData, index: number) => (
              <React.Fragment key={stat.key}>
                <div className="stat-item d-flex align-items-center flex-fill">
                  <div className="me-12">
                    <Icon
                      icon={stat.icon}
                      size="sm"
                      className={`${stat.bgColor} ${stat.textColor}`}
                      animate={false}
                    />
                  </div>
                  <div>
                    <div className="stat-number h5 text-heading mb-0">
                      {stat.value}
                    </div>
                    <div className="stat-label text-neutral-500 fs-14">
                      {stat.label}
                    </div>
                  </div>
                </div>
                {index < statsData.length - 1 && (
                  <div className="stat-divider mx-20"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
