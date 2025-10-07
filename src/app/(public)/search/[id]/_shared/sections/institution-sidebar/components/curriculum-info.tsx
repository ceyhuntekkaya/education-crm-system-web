import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const CurriculumInfo: React.FC = () => {
  const { school } = useInstitutionSidebarData();

  if (!school.curriculumType) return null;

  return (
    <div className="text-center mb-40">
      <div className="text-neutral-500 text-sm">
        <span className="fw-medium text-main-600">Müfredat:</span>{" "}
        {school.curriculumType}
      </div>
    </div>
  );
};
