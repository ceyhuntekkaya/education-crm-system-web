"use client";

import React from "react";
import { QuotationAddEditProvider } from "./_shared";

interface QuotationAddEditRootLayoutProps {
  children: React.ReactNode;
}

const QuotationAddEditRootLayout: React.FC<QuotationAddEditRootLayoutProps> = ({
  children,
}) => {
  return (
    <QuotationAddEditProvider>
      <div>{children}</div>
    </QuotationAddEditProvider>
  );
};

export default QuotationAddEditRootLayout;
