import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const AgeCapacityInfo: React.FC = () => {
  const { school } = useInstitutionSidebarData();

  return (
    <div className="flex-center gap-10 flex-wrap mb-20">
      <span className="text-neutral-500 text-sm">
        Yaş:{" "}
        <span className="text-main-600 fw-medium">
          {school.minAge}-{school.maxAge} yaş
        </span>
      </span>
      <span className="w-4 h-4 bg-main-600 rounded-circle" />
      <span className="text-neutral-500 text-sm">
        Kapasite:{" "}
        <span className="text-main-600 fw-medium">
          {school.currentStudentCount}/{school.capacity}
        </span>
      </span>
    </div>
  );
};
