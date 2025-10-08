"use client";

import React from "react";
import { ReportsProvider } from "./_shared/context/reports-context";

const ReportsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ReportsProvider>
      <>{children}</>
    </ReportsProvider>
  );
};

export default ReportsLayout;
