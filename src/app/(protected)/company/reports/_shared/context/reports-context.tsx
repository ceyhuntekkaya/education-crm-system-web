"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnalyticsDto } from "@/types/dto/analytics/AnalyticsDto";
import { ReportsContextType } from "../types";
import { mockReports } from "../mock";

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const useReportsContext = (): ReportsContextType => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error("useReportsContext must be used within a ReportsProvider");
  }
  return context;
};

interface ReportsProviderProps {
  children: React.ReactNode;
}

export const ReportsProvider: React.FC<ReportsProviderProps> = ({
  children,
}) => {
  const [reports, setReports] = useState<AnalyticsDto[]>(mockReports);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState<AnalyticsDto | null>(
    null
  );

  const refreshReports = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setReports(mockReports);
    } catch (error) {
      console.error("Error refreshing reports:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value: ReportsContextType = {
    reports,
    loading,
    selectedReport,
    setSelectedReport,
    refreshReports,
  };

  return (
    <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
  );
};
