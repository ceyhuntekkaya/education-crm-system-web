"use client";

import React from "react";
import { PricingAddEditProvider } from "./_shared";

interface PricingAddEditRootLayoutProps {
  children: React.ReactNode;
}

const PricingAddEditRootLayout: React.FC<PricingAddEditRootLayoutProps> = ({
  children,
}) => {
  return (
    <PricingAddEditProvider>
      <div>{children}</div>
    </PricingAddEditProvider>
  );
};

export default PricingAddEditRootLayout;
