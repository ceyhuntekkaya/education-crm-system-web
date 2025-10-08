"use client";

import React from "react";
import { CampaignsProvider } from "./_shared";

const CampaignsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CampaignsProvider>
      <>{children}</>
    </CampaignsProvider>
  );
};

export default CampaignsLayout;
