"use client";

import React from "react";
import { BrandListProvider } from "./_shared/context/brand-list-context";

const BrandListLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BrandListProvider>
      <>{children}</>
    </BrandListProvider>
  );
};

export default BrandListLayout;
