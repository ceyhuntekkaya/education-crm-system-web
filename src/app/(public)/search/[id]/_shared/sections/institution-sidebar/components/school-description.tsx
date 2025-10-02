import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const SchoolDescription: React.FC = () => {
  const { school } = useInstitutionSidebarData();

  if (!school.description) return null;

  return (
    <p className="text-neutral-600 text-sm text-center mb-20 px-16">
      {school.description}
    </p>
  );
};
