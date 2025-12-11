import React from "react";
import type { VideoStat } from "../types";

interface VideoStatsSectionProps {
  stats: readonly VideoStat[];
}

export const VideoStatsSection: React.FC<VideoStatsSectionProps> = ({
  stats,
}) => {
  return (
    <div className="row mb-40">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="col-6 col-lg-3 mb-3 mb-lg-0"
          data-aos="fade-up"
          data-aos-delay={100 * (index + 1)}
        >
          <div className="stat-card">
            <div className={`stat-card__icon bg-${stat.color}-100`}>
              <i
                className={`ph-bold ${stat.icon} text-${stat.color}-600`}
              ></i>
            </div>
            <h3 className="stat-card__value">{stat.value}</h3>
            <p className="stat-card__label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

