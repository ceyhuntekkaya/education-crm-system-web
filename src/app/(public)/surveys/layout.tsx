"use client";

import React from "react";
import { SurveyListProvider } from "./_shared/context/survey-list-context";

const SurveyListLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SurveyListProvider>
      <>{children}</>
    </SurveyListProvider>
  );
};

export default SurveyListLayout;
