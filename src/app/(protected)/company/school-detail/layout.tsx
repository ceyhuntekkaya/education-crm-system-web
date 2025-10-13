"use client";

import React from "react";
import { SchoolDetailProvider } from "./_shared/context/school-detail-context";

const SchoolDetailLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SchoolDetailProvider>
      <>{children}</>
    </SchoolDetailProvider>
  );
};

export default SchoolDetailLayout;
