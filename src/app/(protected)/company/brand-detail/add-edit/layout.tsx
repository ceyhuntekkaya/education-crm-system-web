"use client";

import React from "react";
import { BrandAddEditProvider } from "./_shared";

interface BrandAddEditRootLayoutProps {
  children: React.ReactNode;
}

const BrandAddEditRootLayout: React.FC<BrandAddEditRootLayoutProps> = ({
  children,
}) => {
  return (
    <BrandAddEditProvider>
      <div>{children}</div>
    </BrandAddEditProvider>
  );
};

export default BrandAddEditRootLayout;
