"use client";

import React from "react";
import { FormProvider } from "@/contexts";
import {
  CampaignAddEditProvider,
  campaignValidationSchema,
  campaignInitialValues,
} from "./_shared";

interface CampaignAddEditRootLayoutProps {
  children: React.ReactNode;
}

const CampaignAddEditRootLayout: React.FC<CampaignAddEditRootLayoutProps> = ({
  children,
}) => {
  return (
    <FormProvider
      initialValues={campaignInitialValues}
      validationSchema={campaignValidationSchema}
    >
      <CampaignAddEditProvider>{children}</CampaignAddEditProvider>
    </FormProvider>
  );
};

export default CampaignAddEditRootLayout;
