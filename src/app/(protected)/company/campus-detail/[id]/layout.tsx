"use client";

import React from "react";
import { CampusDetailProvider } from "../_shared/context/campus-detail-context";

const CampusDetailLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CampusDetailProvider>
      <>{children}</>
    </CampusDetailProvider>
  );
};

export default CampusDetailLayout;
