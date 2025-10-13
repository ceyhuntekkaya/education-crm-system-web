"use client";

import React from "react";

interface SchoolAddEditRootLayoutProps {
  children: React.ReactNode;
}

const SchoolAddEditRootLayout: React.FC<SchoolAddEditRootLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default SchoolAddEditRootLayout;
