"use client";

import React from "react";
import { PricingProvider } from "./_shared";

const PriceLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PricingProvider>
      <>{children}</>
    </PricingProvider>
  );
};

export default PriceLayout;
