import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const SchoolBasicInfo: React.FC = () => {
  const { school, renderStars } = useInstitutionSidebarData();

  return (
    <div className="flex-center gap-10 flex-wrap my-20">
      <span className="text-neutral-500 text-md">
        ID: <span className="text-main-600 fw-medium">#{school.id}</span>
      </span>
      <span className="w-4 h-4 bg-main-600 rounded-circle" />
      <span className="text-neutral-500 text-md">
        Tür:{" "}
        <span className="text-main-600 fw-medium">
          {school.institutionType?.displayName}
        </span>
      </span>
      <span className="w-4 h-4 bg-main-600 rounded-circle" />
      <div className="flex-align gap-4">
        {renderStars(school.ratingAverage || 0)}
        <span className="text-md text-neutral-700 ms-8">
          {school.ratingAverage}
          <span className="text-neutral-100"> ({school.ratingCount})</span>
        </span>
      </div>
    </div>
  );
};
