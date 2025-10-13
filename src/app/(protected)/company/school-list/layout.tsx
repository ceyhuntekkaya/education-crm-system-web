"use client";

import React from "react";
import { SchoolListProvider } from "./_shared/context/school-list-context";

const SchoolListLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SchoolListProvider>
      <>{children}</>
    </SchoolListProvider>
  );
};

export default SchoolListLayout;
