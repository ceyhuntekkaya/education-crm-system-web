import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";
import { getLanguageTypeLabel } from "@/utils";

export const EducationLanguages: React.FC = () => {
  const { school } = useInstitutionSidebarData();

  return (
    <div className="text-center mb-32">
      <div className="text-neutral-500 text-sm mb-8">
        <span className="fw-medium text-main-600">Eğitim Dili:</span>{" "}
        {school.languageOfInstruction
          ? getLanguageTypeLabel(school.languageOfInstruction)
          : "-"}
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
