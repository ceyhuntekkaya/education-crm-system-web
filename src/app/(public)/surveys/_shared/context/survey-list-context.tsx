"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { SurveyListContextType } from "../types/survey.types";
import { useSurveys as useSurveysHook } from "../hooks/use-surveys";

const SurveyListContext = createContext<SurveyListContextType | undefined>(
  undefined
);

interface SurveyListProviderProps {
  children: ReactNode;
}

export const SurveyListProvider: React.FC<SurveyListProviderProps> = ({
  children,
}) => {
  // Use the surveys hook
  const {
    surveys,
    loading: surveyLoading,
    error: surveyError,
    refetch: refetchSurveys,
  } = useSurveysHook();

  const contextValue: SurveyListContextType = {
    surveys,
    surveyLoading,
    surveyError,
    refetchSurveys,
  };

  return (
    <SurveyListContext.Provider value={contextValue}>
      {children}
    </SurveyListContext.Provider>
  );
};

export const useSurveyList = (): SurveyListContextType => {
  const context = useContext(SurveyListContext);
  if (context === undefined) {
    throw new Error("useSurveyList must be used within a SurveyListProvider");
  }
  return context;
};
