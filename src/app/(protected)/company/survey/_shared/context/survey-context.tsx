"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { SurveyDto } from "@/types/dto/survey/SurveyDto";
import { SurveyContextType } from "../types";
import { mockSurveys } from "../mock/survey-mock-data";

// Create context
const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

// Provider component
export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [surveys] = useState<SurveyDto[]>(mockSurveys);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyDto | null>(null);

  const refreshSurveys = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const value: SurveyContextType = {
    surveys,
    loading,
    selectedSurvey,
    setSelectedSurvey,
    refreshSurveys,
  };

  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  );
};

// Hook to use survey context
export const useSurvey = (): SurveyContextType => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};
