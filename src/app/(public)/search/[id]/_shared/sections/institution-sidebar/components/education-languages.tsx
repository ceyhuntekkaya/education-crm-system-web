import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const EducationLanguages: React.FC = () => {
  const { school } = useInstitutionSidebarData();

  return (
    <div className="text-center mb-20">
      <div className="text-neutral-500 text-sm mb-8">
        <span className="fw-medium text-main-600">Ana Dil:</span>{" "}
        {school.languageOfInstruction}
      </div>
      {school.foreignLanguages && (
        <div className="text-neutral-500 text-sm">
          <span className="fw-medium text-main-600">Yabancı Dil:</span>{" "}
          {school.foreignLanguages}
        </div>
      )}
    </div>
  );
};
