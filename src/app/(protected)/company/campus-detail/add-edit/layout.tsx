"use client";

import React from "react";
import { CampusAddEditProvider } from "./_shared";

interface CampusAddEditRootLayoutProps {
  children: React.ReactNode;
}

const CampusAddEditRootLayout: React.FC<CampusAddEditRootLayoutProps> = ({
  children,
}) => {
  return (
    <CampusAddEditProvider>
      <div>{children}</div>
    </CampusAddEditProvider>
  );
};

export default CampusAddEditRootLayout;
