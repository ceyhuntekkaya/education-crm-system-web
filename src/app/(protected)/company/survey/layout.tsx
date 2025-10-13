"use client";

import React from "react";
import { SurveyProvider } from "./_shared/context/survey-context";

const SurveyLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SurveyProvider>
      <>{children}</>
    </SurveyProvider>
  );
};

export default SurveyLayout;
