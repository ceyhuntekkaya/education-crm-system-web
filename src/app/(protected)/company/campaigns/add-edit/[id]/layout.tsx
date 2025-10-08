"use client";

import React from "react";
import { CampaignAddEditProvider } from "./_shared/context";

interface CampaignAddEditRootLayoutProps {
  children: React.ReactNode;
}

const CampaignAddEditRootLayout: React.FC<CampaignAddEditRootLayoutProps> = ({
  children,
}) => {
  return (
    <CampaignAddEditProvider>
      <div className="campaign-add-edit-layout">{children}</div>
    </CampaignAddEditProvider>
  );
};

export default CampaignAddEditRootLayout;
