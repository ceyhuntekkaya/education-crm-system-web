import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const QuickInfoStats: React.FC = () => {
  const { quickInfoStats } = useInstitutionSidebarData();

  return (
    <div className="row g-8 mb-20">
      {quickInfoStats.map((stat, index) => (
        <div key={index} className="col-6 mb-16">
          <div className="text-center p-12 bg-white rounded-8 border border-neutral-100">
            <div className={`text-lg fw-bold ${stat.colorClass} mb-4`}>
              {stat.value}
            </div>
            <p className="text-xs text-neutral-600 mb-0">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
