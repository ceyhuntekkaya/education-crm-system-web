"use client";

import React from "react";
import { SchoolAddEditProvider } from "./_shared";

interface SchoolAddEditRootLayoutProps {
  children: React.ReactNode;
}

const SchoolAddEditRootLayout: React.FC<SchoolAddEditRootLayoutProps> = ({
  children,
}) => {
  return (
    <SchoolAddEditProvider>
      <div>{children}</div>
    </SchoolAddEditProvider>
  );
};

export default SchoolAddEditRootLayout;
