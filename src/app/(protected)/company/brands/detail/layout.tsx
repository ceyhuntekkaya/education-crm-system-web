"use client";

import React from "react";
import { BrandDetailProvider } from "./_shared/context/brand-detail-context";

const BrandDetailLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BrandDetailProvider>
      <>{children}</>
    </BrandDetailProvider>
  );
};

export default BrandDetailLayout;
