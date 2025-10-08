"use client";

import React from "react";

interface PricingAddEditRootLayoutProps {
  children: React.ReactNode;
}

const PricingAddEditRootLayout: React.FC<PricingAddEditRootLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default PricingAddEditRootLayout;
