"use client";

import React from "react";

interface SurveyAddEditRootLayoutProps {
  children: React.ReactNode;
}

const SurveyAddEditRootLayout: React.FC<SurveyAddEditRootLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default SurveyAddEditRootLayout;
