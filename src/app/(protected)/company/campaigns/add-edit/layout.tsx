"use client";

import React from "react";

interface CampaignAddEditRootLayoutProps {
  children: React.ReactNode;
}

const CampaignAddEditRootLayout: React.FC<CampaignAddEditRootLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default CampaignAddEditRootLayout;
