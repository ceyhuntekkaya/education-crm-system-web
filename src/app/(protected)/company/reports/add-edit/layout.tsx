"use client";

import React from "react";

interface ReportsAddEditRootLayoutProps {
  children: React.ReactNode;
}

const ReportsAddEditRootLayout: React.FC<ReportsAddEditRootLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default ReportsAddEditRootLayout;
