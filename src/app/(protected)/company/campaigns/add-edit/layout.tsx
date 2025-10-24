"use client";

import React from "react";
import { CampaignAddEditProvider } from "./_shared";

interface CampaignAddEditLayoutProps {
  children: React.ReactNode;
}

const CampaignAddEditLayout: React.FC<CampaignAddEditLayoutProps> = ({
  children,
}) => {
  return <CampaignAddEditProvider>{children}</CampaignAddEditProvider>;
};

export default CampaignAddEditLayout;
