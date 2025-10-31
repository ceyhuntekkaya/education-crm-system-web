"use client";

import React from "react";
import { SurveyListProvider } from "./_shared/context";

const SurveyLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SurveyListProvider>
      <>{children}</>
    </SurveyListProvider>
  );
};

export default SurveyLayout;
